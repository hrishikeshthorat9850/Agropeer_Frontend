"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatArea from "@/components/chat/ChatArea";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";
import { useSocket } from "@/Context/SocketContext";
import { ChatSkeleton } from "@/components/skeletons";
import { Capacitor } from "@capacitor/core";

export default function ChatsPage() {
  const {user : loggedInUser,loading} = useLogin();
  const { socket, joinConversation, sendMessage: sendSocketMessage, markAsRead } = useSocket();
  const [conversations,setConversations] = useState([]);
  const [contactToConversationMap, setContactToConversationMap] = useState({});
  const [dark, setDark] = useState(false);
  const [contacts,setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showContacts, setShowContacts] = useState(true);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);
  const selectedConversationRef = useRef(null);
  const [unreadMessagesCount,setunreadMessagesCount] = useState(0);  
  const conversationsRef = useRef([]);
  const isNative = Capacitor.isNativePlatform();
  const isChatOpenRef = useRef(false);

  const fetchMessages = useCallback(async () => {
    if (!loggedInUser?.id) return;

    try {
      //id, firstName, lastName, profile_url
      const { data, error } = await supabase
        .from("conversations")
        .select(`
          id,
          user1:user1_id(id, firstName, lastName, profile_url,display_name,avatar_url,email),  
          user2:user2_id(id, firstName, lastName, profile_url,display_name,avatar_url,email),
          last_message_at,
          messages(
            id,
            conversation_id,
            sender_id,
            content,
            read_at,
            created_at,
            updated_at,
            message_type
          )
        `)
        .or(`user1_id.eq.${loggedInUser.id},user2_id.eq.${loggedInUser.id}`)
        .order("last_message_at", { ascending: false })
        .order("created_at", { ascending: false, foreignTable: "messages" })
        .order("content", { ascending: false, foreignTable: "messages" });

      if (error) {
        console.error("❌ Error fetching conversations:", error.message);
        return;
      }

      if (!data || !Array.isArray(data)) {
        setConversations([]);
        setContacts([]);
        setContactToConversationMap({});
        return;
      }

      const mappedContacts = await Promise.all(
        data.map(async (conv) => {
          if (!conv || !conv.id) return null;

          const isUser1 = conv.user1?.id === loggedInUser.id;
          const otherUser = isUser1 ? conv.user2 : conv.user1;
          
          if (!otherUser || !otherUser.id) return null;

          const last_message = (conv.messages && Array.isArray(conv.messages) && conv.messages.length > 0) 
            ? conv.messages[0].content || "" 
            : "";
          
          let unreadCount = 0;
          try {
            const { count, error: countError } = await supabase
              .from("messages")
              .select("*", { count: "exact", head: true })
              .eq("conversation_id", conv.id)
              .neq("sender_id", loggedInUser.id)
              .is("read_at", null);

            if (!countError && count !== null) {
              unreadCount = count;
            }
          } catch (countErr) {
            console.error("❌ Error fetching unread count:", countErr);
          }
          
          const lastMessageTime = (conv.messages && Array.isArray(conv.messages) && conv.messages.length > 0)
            ? conv.messages[0].created_at
            : conv.last_message_at;

          return {
            id: otherUser.id,
            displayName : otherUser?.display_name,
            firstName: otherUser.firstName || "",
            lastName: otherUser.lastName || "",
            profile_url: otherUser.profile_url || otherUser?.avatar_url,
            last_message_at: lastMessageTime || new Date().toISOString(),
            last_message: last_message,
            conversation_id: conv.id,
            unread_count: unreadCount,
            all_conversation_ids: [conv.id]
          };
        })
      );

      const validContacts = mappedContacts.filter(contact => contact !== null);

      const contactsByUserId = {};
      validContacts.forEach(contact => {
        if (!contact || !contact.id) return;
        
        if (contactsByUserId[contact.id]) {
          const existing = contactsByUserId[contact.id];
          const existingTime = new Date(existing.last_message_at || 0).getTime();
          const newTime = new Date(contact.last_message_at || 0).getTime();
          
          if (newTime > existingTime) {
            existing.last_message = contact.last_message;
            existing.last_message_at = contact.last_message_at;
            existing.conversation_id = contact.conversation_id;
          }
          
          existing.unread_count = Math.min(
            (existing.unread_count || 0) + (contact.unread_count || 0),
            999
          );
          
          const mergedIds = new Set([
            ...(existing.all_conversation_ids || []),
            ...(contact.all_conversation_ids || [])
          ]);
          existing.all_conversation_ids = Array.from(mergedIds);
        } else {
          contactsByUserId[contact.id] = { ...contact };
        }
      });

      const uniqueContacts = Object.values(contactsByUserId);

      const contactMap = {};
      data.forEach(conv => {
        if (!conv || !conv.id) return;

        const isUser1 = conv.user1?.id === loggedInUser.id;
        const otherUser = isUser1 ? conv.user2 : conv.user1;
        
        if (otherUser?.id) {
          const contact = contactsByUserId[otherUser.id];
          if (contact && contact.conversation_id === conv.id) {
            contactMap[otherUser.id] = conv;
          } else if (!contactMap[otherUser.id]) {
            contactMap[otherUser.id] = conv;
          }
        }
      });

      const sortedContacts = uniqueContacts.sort((a, b) => {
        const timeA = new Date(a.last_message_at || 0).getTime();
        const timeB = new Date(b.last_message_at || 0).getTime();
        return timeB - timeA;
      });

      setConversations(data);
      setContacts(sortedContacts);
      setContactToConversationMap(contactMap);
    } catch (err) {
      setConversations([]);
      setContacts([]);
      setContactToConversationMap({});
    }
  }, [loggedInUser?.id]);

  useEffect(() => {
    selectedConversationRef.current = selected;
  }, [selected]);

  useEffect(() => {
    conversationsRef.current = conversations;
  }, [conversations]);

  useEffect(() => {
    if (!loggedInUser?.id || !socket) {
      return;
    }

    const handleReceiveMessage = (msgg) => {
      if (!msgg || !msgg.conversation_id || !msgg.sender_id) return;

      // 🧠 Check if this is my message
      const isMyMessage = msgg.sender_id === loggedInUser.id;
      
      // 🧩 Always update sidebar for both users
      setContacts((prevContacts) => {
        if (!Array.isArray(prevContacts)) return prevContacts;

        // Find the contact by checking if conversation_id matches any of their conversations
        const updatedContacts = prevContacts.map((contact) => {
          if (!contact || !contact.id) return contact;

          // Check if this message belongs to any conversation with this user
          const belongsToThisUser = 
            (contact.all_conversation_ids && Array.isArray(contact.all_conversation_ids) && contact.all_conversation_ids.includes(msgg.conversation_id)) ||
            contact.conversation_id === msgg.conversation_id;
          
          if (belongsToThisUser) {
            const currentSelected = selectedConversationRef.current;
            const isCurrentConversation = currentSelected && 
              (currentSelected.conversation_id === msgg.conversation_id || 
               currentSelected.id === contact.id);
            
            // Increment unread count if message is from someone else and conversation is not currently selected
            const shouldIncrementUnread = !isMyMessage && !isCurrentConversation;
            
            // Update to most recent conversation if this one is newer
            const currentTime = new Date(contact.last_message_at || 0).getTime();
            const newTime = new Date(msgg.created_at || 0).getTime();
            
            const updatedContact = {
              ...contact,
              last_message: msgg.content || contact.last_message,
              last_message_at: msgg.created_at || contact.last_message_at,
              conversation_id: newTime > currentTime ? msgg.conversation_id : contact.conversation_id,
              unread_count: shouldIncrementUnread 
                ? Math.max(0, (contact.unread_count || 0) + 1)
                : (contact.unread_count || 0),
            };

            // Update conversation IDs list if needed
            if (msgg.conversation_id) {
              const existingIds = contact.all_conversation_ids || [];
              if (!existingIds.includes(msgg.conversation_id)) {
                updatedContact.all_conversation_ids = [...existingIds, msgg.conversation_id];
              } else {
                updatedContact.all_conversation_ids = existingIds;
              }
            }

            return updatedContact;
          }
          return contact;
        });
        
        // Remove duplicates based on user ID (group by user) - simplified logic
        const contactsByUserId = {};
        updatedContacts.forEach(contact => {
          if (!contact || !contact.id) return;
          
          if (contactsByUserId[contact.id]) {
            // Merge: keep most recent
            const existing = contactsByUserId[contact.id];
            const existingTime = new Date(existing.last_message_at || 0).getTime();
            const newTime = new Date(contact.last_message_at || 0).getTime();
            
            if (newTime > existingTime) {
              existing.last_message = contact.last_message;
              existing.last_message_at = contact.last_message_at;
              existing.conversation_id = contact.conversation_id;
            }
            // Sum unread counts (but cap at reasonable number to prevent overflow)
            existing.unread_count = Math.min(
              (existing.unread_count || 0) + (contact.unread_count || 0),
              999
            );
            // Merge conversation IDs
            const mergedIds = new Set([
              ...(existing.all_conversation_ids || []),
              ...(contact.all_conversation_ids || [])
            ]);
            existing.all_conversation_ids = Array.from(mergedIds);
          } else {
            contactsByUserId[contact.id] = { ...contact };
          }
        });
        
        const uniqueContacts = Object.values(contactsByUserId);
        
        // Sort contacts by last_message_at (most recent first) after update
        return uniqueContacts.sort((a, b) => {
          const timeA = new Date(a.last_message_at || 0).getTime();
          const timeB = new Date(b.last_message_at || 0).getTime();
          return timeB - timeA; // Descending order (most recent first)
        });
      });

      // 🧠 Update chat window if conversation is open
      const currentSelected = selectedConversationRef.current;
      if (currentSelected && msgg.conversation_id === currentSelected?.conversation_id) {
        setMessages((prev) => {
          if (!Array.isArray(prev)) return prev;

          // If it's my message, replace the temp message with the real one
          if (isMyMessage) {
            // Find and replace the temp message that matches this content
            const tempIndex = prev.findIndex(
              (m) => m && m.id && m.id.startsWith("temp-") && m.from === "me" && m.text === msgg.content
            );
            
            if (tempIndex !== -1) {
              // Replace temp message with real one
              const newMessages = [...prev];
              newMessages[tempIndex] = {
                id: msgg.id,
                from: "me",
                text: msgg.content,
                at: msgg.created_at,
                seen: !!msgg.read_at,
              };
              return newMessages;
            }
            
            // If temp message not found, check if real message already exists
            const exists = prev.some((m) => m && m.id === msgg.id);
            if (exists) return prev;
          } else {
            // For messages from others, check if it already exists
            const exists = prev.some((m) => m && m.id === msgg.id);
            if (exists) return prev;
          }

          // Add new message
          const newMessage = {
            id: msgg.id,
            from: msgg.sender_id === loggedInUser.id ? "me" : msgg.sender_id,
            text: msgg.content,
            at: msgg.created_at,
            seen: !!msgg.read_at,
          };

          return [...prev, newMessage];
        });
      }

      const conversationExists = conversationsRef.current?.some(
        (conv) => conv && conv.id === msgg.conversation_id
      );
      if (!conversationExists) {
        fetchMessages();
      }
    };
    const handleMessagesSeen = ({ conversation_id, reader_id, seen_message_ids, unread_count }) => {
      if (!conversation_id || !reader_id || !Array.isArray(seen_message_ids)) return;      
      const currentSelected = selectedConversationRef.current;
      const isCurrentConversation = currentSelected && currentSelected.conversation_id === conversation_id;
      
      // Update unread count if I'm the one who read the messages
      if (reader_id === loggedInUser?.id) {
        setContacts((prevContacts) => {
          if (!Array.isArray(prevContacts)) return prevContacts;

          return prevContacts.map((contact) => {
            if (!contact) return contact;

            // Check if this conversation belongs to this contact
            const belongsToContact = 
              (contact.all_conversation_ids && Array.isArray(contact.all_conversation_ids) && contact.all_conversation_ids.includes(conversation_id)) ||
              contact.conversation_id === conversation_id;

            if (belongsToContact) {
              // Safely subtract unread count
              const currentUnread = contact.unread_count || 0;
              const toSubtract = unread_count || 0;
              return { 
                ...contact, 
                unread_count: Math.max(0, currentUnread - toSubtract)
              };
            }
            return contact;
          });
        });
      }
      
      // Update seen status of MY messages when someone else reads them
      // Only update if someone else (not me) read the messages, and they contain message IDs
      // Only update if this is the current conversation (so we're updating the right messages)
      if (reader_id !== loggedInUser?.id && seen_message_ids.length > 0 && isCurrentConversation) {
        setMessages((prev) => {
          if (!Array.isArray(prev)) return prev;

          const updated = prev.map((msg) => {
            if (!msg) return msg;
            // Only mark MY messages as seen (messages from me that were read by someone else)
            if (msg.from === "me" && seen_message_ids.includes(msg.id)) {
              return { ...msg, seen: true };
            }
            return msg;
          });
          
          return updated;
        });
      }
    };
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messagesSeen", handleMessagesSeen);
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messagesSeen", handleMessagesSeen);
    };
  }, [loggedInUser?.id, socket, fetchMessages]);

  const fetchConversationMessages = useCallback(async (conversationId) => {
    if (!conversationId || !loggedInUser?.id) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("❌ Error fetching messages:", error);
        return;
      }

      // Transform messages to the format expected by MessageBubble
      const transformedMessages = (data || []).map(msg => ({
        id: msg.id,
        from: msg.sender_id === loggedInUser.id ? "me" : msg.sender_id,
        text: msg.content || "",
        at: msg.created_at,
        seen: !!msg.read_at
      }));
      setMessages(transformedMessages);
    } catch (err) {
      console.error("❌ Unexpected error fetching messages:", err);
    }
  }, [loggedInUser?.id]);

useEffect(() => {
  const onPopState = (e) => {
    // 🔒 Intercept ONLY if chat is open
    if (isChatOpenRef.current) {
      e.preventDefault?.(); // safe guard

      isChatOpenRef.current = false;
      setShowContacts(true);
      setSelected(null);

      // 🚫 STOP further navigation
      window.history.pushState({}, "");
    }
  };

  window.addEventListener("popstate", onPopState);
  return () => window.removeEventListener("popstate", onPopState);
}, []);


  const handleSelectUser = useCallback((contact) => {
    if (!contact || !contact.id) return;

    // Find the conversation for this contact (use the most recent one)
    const conversation = contactToConversationMap[contact.id];
    
    if (!conversation) {
      console.error("No conversation found for contact:", contact);
      return;
    }

    const currentUserId = loggedInUser?.id;
    if (!currentUserId) return;

    const chatPartner =
      conversation.user1?.id === currentUserId
        ? conversation.user2
        : conversation.user1;

    if (!chatPartner) {
      console.error("No chat partner found for conversation:", conversation);
      return;
    }

    // Use the contact's conversation_id (which is the most recent one)
    const conversationId = contact.conversation_id || conversation.id;

    if (!conversationId) {
      console.error("No conversation ID found");
      return;
    }

    setSelected({
      ...chatPartner,
      conversation_id: conversationId,
      id: contact.id, // Ensure ID is set for matching
    });

    window.history.pushState({ chatOpen: true }, "");
    isChatOpenRef.current = true;
    setShowContacts(false);


    // Optimistically reset unread count when selecting conversation
    setContacts((prevContacts) => {
      if (!Array.isArray(prevContacts)) return prevContacts;
      return prevContacts.map((c) =>
        c && c.id === contact.id
          ? { ...c, unread_count: 0 }
          : c
      );
    });
    
    // Join conversation and mark as read using socket context
    if (socket) {
      joinConversation(conversationId);
      markAsRead(conversationId);
    }

    // Fetch messages for this conversation
    fetchConversationMessages(conversationId);
  }, [contactToConversationMap, loggedInUser?.id, fetchConversationMessages, socket, joinConversation, markAsRead]);

  useEffect(() => {
    if (loading) return; 
    if (!loggedInUser?.id) return; 
    fetchMessages();
  }, [loading, loggedInUser?.id, fetchMessages]);

  // Remove auto-selection of first contact - let user click to open chat
  // useEffect(() => {
  //   if (!selected && Array.isArray(contacts) && contacts.length > 0 && Object.keys(contactToConversationMap).length > 0) {
  //     const firstContact = contacts[0];
  //     if (firstContact && firstContact.id) {
  //       handleSelectUser(firstContact);
  //     }
  //   }
  // }, [contacts, contactToConversationMap, selected, handleSelectUser]);

  const handleFaTimesClick = () => {
    setShowContacts(false);
  };

  useEffect(() => {
    socket.emit("user:page", {
      userId: loggedInUser?.id,
      page: "chats"
    });

    return () => {
      socket.emit("user:page", {
        userId: loggedInUser?.id,
        page: "none"
      });
  };
}, []);

  const sendMessage = (msg) => {
    if (!msg || !msg.trim() || !selected?.conversation_id || !loggedInUser?.id || !socket) {
      return;
    }

    const messagePayload = {
      content: msg.trim(),
      sender_id: loggedInUser.id,
      conversation_id: selected.conversation_id,
      created_at: new Date().toISOString(),
    };

    // Add optimistic message
    const optimisticMsg = {
      id: "temp-" + Date.now(),
      from: "me",
      text: msg.trim(),
      at: new Date().toISOString(),
      seen: false,
    };
    setMessages((prev) => {
      if (!Array.isArray(prev)) return [optimisticMsg];
      return [...prev, optimisticMsg];
    });

    // Join conversation and send message using socket context
    joinConversation(selected.conversation_id);
    sendSocketMessage(messagePayload);

    // Immediately update your own sidebar preview and re-sort
    setContacts((prevContacts) => {
      if (!Array.isArray(prevContacts)) return prevContacts;

      const updated = prevContacts.map((contact) => {
        if (!contact) return contact;
        return (contact.id === selected?.id || contact.conversation_id === selected?.conversation_id)
          ? {
              ...contact,
              last_message: msg.trim(),
              last_message_at: new Date().toISOString(),
              conversation_id: selected?.conversation_id || contact.conversation_id,
            }
          : contact;
      });
      
      // Remove duplicates based on user ID (group by user) - simplified
      const contactsByUserId = {};
      updated.forEach(contact => {
        if (!contact || !contact.id) return;
        
        if (contactsByUserId[contact.id]) {
          const existing = contactsByUserId[contact.id];
          const existingTime = new Date(existing.last_message_at || 0).getTime();
          const newTime = new Date(contact.last_message_at || 0).getTime();
          
          if (newTime > existingTime) {
            existing.last_message = contact.last_message;
            existing.last_message_at = contact.last_message_at;
            existing.conversation_id = contact.conversation_id;
          }
          // Preserve unread count (don't add, just keep max)
          existing.unread_count = Math.max(existing.unread_count || 0, contact.unread_count || 0);
          // Merge conversation IDs
          const mergedIds = new Set([
            ...(existing.all_conversation_ids || []),
            ...(contact.all_conversation_ids || [])
          ]);
          existing.all_conversation_ids = Array.from(mergedIds);
        } else {
          contactsByUserId[contact.id] = { ...contact };
        }
      });
      
      const uniqueContacts = Object.values(contactsByUserId);
      
      // Sort contacts by last_message_at (most recent first)
      return uniqueContacts.sort((a, b) => {
        const timeA = new Date(a.last_message_at || 0).getTime();
        const timeB = new Date(b.last_message_at || 0).getTime();
        return timeB - timeA; // Descending order (most recent first)
      });
    });

    // Clear input
    setMsg("");
  };


  if (loading) {
    return <ChatSkeleton />;
  }

  if (!loggedInUser?.id) {
    return <div className="flex justify-center items-center h-screen text-gray-500">
      No user logged in.
    </div>;
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="bg-gradient-to-b from-sky-50 to-white dark:from-neutral-900 dark:to-neutral-800 flex justify-center items-start ">
        <div
          className="
            w-full mx-auto px-0.5 sm:px-4 md:px-6 
            flex flex-col md:flex-row gap-4 md:gap-6
            relative
          "
          style={{
            paddingTop: isNative
              ? "calc(20px + env(safe-area-inset-top))"
              : "56px",

            height: isNative
              ? "calc(100dvh - 20px - 70px - env(safe-area-inset-top) - env(safe-area-inset-bottom))"
              : "calc(100vh - 56px - 70px)",
          }}
        >
          {/* Sidebar */}
          <ChatSidebar 
            showContacts={showContacts}
            handleFaTimesClick={handleFaTimesClick}
            contacts={contacts}
            SAMPLE_USERS={contacts}
            onSelectUser={handleSelectUser}
            selected={selected}
          />
          {/* Chat Area */}
          <ChatArea selected={selected} messages={messages} sendMessage={sendMessage} endRef={endRef} />
        </div>
      </div>
    </div>
  );
}
