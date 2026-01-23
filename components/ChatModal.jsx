"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";
import { useSocket } from "@/Context/SocketContext";
import ChatHeader from "./ui/market/chat/ChatHeader";
import ProductInfo from "./ui/market/chat/ProductInfo";
import Messages from "./ui/market/chat/Messages";
import MessageInput from "./ui/market/chat/MesssageInput";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";

export default function ChatModal({
  isOpen,
  onClose,
  product,
  sellerId,
  sellerInfo,
}) {
  const { user } = useLogin();
  const { showToast } = useToast();
  const {
    socket,
    joinConversation,
    sendMessage,
    markAsRead,
    sendTyping,
    typingUsers,
    findOrCreateConversation,
  } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [otherUserInfo, setOtherUserInfo] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const conversationIdRef = useRef(null);
  const messageFallbackTimeoutRef = useRef(null);
  const { t } = useLanguage();

  const fetchMessages = async (convId) => {
    if (!convId || !user?.id) return;

    setLoading(false);
    try {
      // Optimized: select specific fields to reduce egress
      const { data, error } = await supabase
        .from("messages")
        .select(
          `
          id,
          conversation_id,
          sender_id,
          content,
          created_at,
          read_at,
          sender:userinfo(id, firstName, lastName, display_name, profile_url, avatar_url)
        `
        )
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
        return;
      }

      // Transform messages to match /chats page format: { id, from, text, at, seen }
      const transformedMessages = (data || []).map((msg) => ({
        id: msg.id,
        from: msg.sender_id === user.id ? "me" : msg.sender_id,
        text: msg.content || "",
        at: msg.created_at,
        seen: !!msg.read_at,
        // Keep original fields for compatibility
        sender_id: msg.sender_id,
        content: msg.content || "",
        created_at: msg.created_at,
        read_at: msg.read_at,
        conversation_id: msg.conversation_id,
      }));

      setMessages(transformedMessages);
    } catch (error) {
      console.error("Unexpected error fetching messages:", error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Find or create conversation when modal opens
  useEffect(() => {
    if (!isOpen || !user?.id || !sellerId || !product?.id || !socket) return;

    let isMounted = true;

    // Reset state when modal opens
    setMessages([]);
    setConversationId(null);
    setLoading(true);
    setIsTyping(false);

    // Clear any existing timeouts
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    if (messageFallbackTimeoutRef.current) {
      clearTimeout(messageFallbackTimeoutRef.current);
      messageFallbackTimeoutRef.current = null;
    }

    // Find or create conversation
    findOrCreateConversation({
      user1_id: user.id,
      user2_id: sellerId,
      product_id: product.id,
    })
      .then((response) => {
        if (!isMounted) return;

        if (response?.conversation_id) {
          const convId = response.conversation_id;
          setConversationId(convId);
          conversationIdRef.current = convId;

          // Join the conversation room using socket context
          joinConversation(convId);
          // Fetch messages after joining
          fetchMessages(convId);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        if (!isMounted) return;
        console.error("Error finding/creating conversation:", error);
        showToast("error", t("start_conv_error"));
        setLoading(false);
      });

    // Cleanup when modal closes
    return () => {
      isMounted = false;
      // Reset conversation ref when modal closes
      conversationIdRef.current = null;
      // Clear timeouts
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      if (messageFallbackTimeoutRef.current) {
        clearTimeout(messageFallbackTimeoutRef.current);
        messageFallbackTimeoutRef.current = null;
      }
    };
  }, [isOpen, user?.id, sellerId, product?.id, socket]);

  // Listen for incoming messages
  useEffect(() => {
    if (!conversationId || !user?.id || !socket) return;

    const handleReceiveMessage = (msg) => {
      if (!msg || !msg.conversation_id || !msg.sender_id) return;

      // Only add message if it belongs to current conversation
      if (msg.conversation_id === conversationId) {
        setMessages((prev) => {
          if (!Array.isArray(prev)) return prev;

          const isMyMessage = msg.sender_id === user.id;

          // If it's my message, replace the temp message with the real one (matches /chats page behavior)
          if (isMyMessage) {
            // Clear fallback timeout since message was received
            if (messageFallbackTimeoutRef.current) {
              clearTimeout(messageFallbackTimeoutRef.current);
              messageFallbackTimeoutRef.current = null;
            }

            // Find and replace the temp message that matches this content
            const tempIndex = prev.findIndex(
              (m) =>
                m &&
                m.id &&
                m.id.startsWith("temp-") &&
                m.from === "me" &&
                m.text === msg.content
            );

            if (tempIndex !== -1) {
              // Replace temp message with real one
              const newMessages = [...prev];
              newMessages[tempIndex] = {
                id: msg.id,
                from: "me",
                text: msg.content || "",
                at: msg.created_at,
                seen: !!msg.read_at,
                sender_id: msg.sender_id,
                content: msg.content || "",
                created_at: msg.created_at,
                read_at: msg.read_at,
                conversation_id: msg.conversation_id,
              };
              return newMessages;
            }

            // If temp message not found, check if real message already exists
            const exists = prev.some((m) => m && m.id === msg.id);
            if (exists) return prev;
          } else {
            // For messages from others, check if it already exists
            const exists = prev.some((m) => m && m.id === msg.id);
            if (exists) return prev;
          }

          // Transform message to match /chats page format
          const transformedMsg = {
            id: msg.id,
            from: msg.sender_id === user.id ? "me" : msg.sender_id,
            text: msg.content || "",
            at: msg.created_at,
            seen: !!msg.read_at,
            // Keep original fields for compatibility
            sender_id: msg.sender_id,
            content: msg.content || "",
            created_at: msg.created_at,
            read_at: msg.read_at,
            conversation_id: msg.conversation_id,
          };

          return [...prev, transformedMsg];
        });
      }
    };

    const handleMessagesSeen = ({
      conversation_id,
      reader_id,
      seen_message_ids,
    }) => {
      if (!conversation_id || !reader_id || !Array.isArray(seen_message_ids))
        return;

      // Only update if it's for current conversation and someone else read my messages
      if (
        conversation_id === conversationId &&
        reader_id !== user.id &&
        seen_message_ids.length > 0
      ) {
        setMessages((prev) => {
          if (!Array.isArray(prev)) return prev;

          return prev.map((msg) => {
            if (!msg) return msg;
            // Only mark MY messages as seen (messages from me that were read by someone else)
            if (msg.from === "me" && seen_message_ids.includes(msg.id)) {
              return { ...msg, seen: true, read_at: new Date().toISOString() };
            }
            return msg;
          });
        });
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messagesSeen", handleMessagesSeen);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messagesSeen", handleMessagesSeen);
    };
  }, [conversationId, user?.id, socket]);

  // Listen for typing indicators from socket context
  useEffect(() => {
    if (!conversationId || !sellerId) return;

    const conversationTyping = typingUsers[conversationId];
    const otherUserTyping = conversationTyping && conversationTyping[sellerId];
    setIsTyping(otherUserTyping || false);
  }, [typingUsers, conversationId, sellerId]);

  const addMessage = () => {
    if (!newMessage || !newMessage.trim()) {
      showToast("error", t("msg_empty_error"));
      return;
    }
    if (!user?.id || !socket) {
      showToast("error", t("send_msg_error"));
      return;
    }

    const messageContent = newMessage.trim();
    setSending(true);

    // Add optimistic message (matches /chats page behavior)
    const optimisticMsg = {
      id: "temp-" + Date.now(),
      from: "me",
      text: messageContent,
      at: new Date().toISOString(),
      seen: false,
      sender_id: user.id,
      content: messageContent,
      created_at: new Date().toISOString(),
      read_at: null,
      conversation_id: conversationId,
    };
    setMessages((prev) => {
      if (!Array.isArray(prev)) return [optimisticMsg];
      return [...prev, optimisticMsg];
    });

    // Ensure we're joined to the conversation room before sending
    joinConversation(conversationId);

    // Send message using socket context
    sendMessage({
      sender_id: user.id,
      conversation_id: conversationId,
      content: messageContent,
    });

    // Fallback: If message isn't received via socket within 2 seconds, refetch messages
    if (messageFallbackTimeoutRef.current) {
      clearTimeout(messageFallbackTimeoutRef.current);
    }

    messageFallbackTimeoutRef.current = setTimeout(() => {
      setMessages((prev) => {
        if (!Array.isArray(prev)) return prev;
        const tempMsgExists = prev.some(
          (m) => m && m.id === optimisticMsg.id && m.id.startsWith("temp-")
        );
        if (tempMsgExists) {
          fetchMessages(conversationId);
        }
        return prev;
      });
      messageFallbackTimeoutRef.current = null;
    }, 2000);

    setNewMessage("");
    setSending(false);
  };

  const handleTyping = (e) => {
    if (!e || !e.target) return;

    const value = e.target.value || "";
    setNewMessage(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    setIsTyping(true);

    // Send typing indicator using socket context
    if (conversationId && sendTyping) {
      sendTyping(conversationId, true);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      // Stop typing indicator
      if (conversationId && sendTyping) {
        sendTyping(conversationId, false);
      }
      typingTimeoutRef.current = null;
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addMessage();
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (Array.isArray(messages) && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const getMessageStatus = (message) => {
    // Support both formats: /chats format (from === "me") and raw format (sender_id)
    const isMyMessage = message.from === "me" || message.sender_id === user?.id;
    if (isMyMessage) {
      const isSeen = message.seen || !!message.read_at;
      return isSeen ? (
        <FaCheckDouble className="text-blue-500 text-xs" />
      ) : (
        <FaCheck className="text-gray-400 text-xs" />
      );
    }
    return null;
  };

  // Mark messages as read when conversation is active using socket context
  useEffect(() => {
    if (conversationId && user?.id && isOpen && markAsRead) {
      markAsRead(conversationId);
    }
  }, [conversationId, user?.id, isOpen, markAsRead]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear all timeouts on unmount
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      if (messageFallbackTimeoutRef.current) {
        clearTimeout(messageFallbackTimeoutRef.current);
        messageFallbackTimeoutRef.current = null;
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        // 💡 New background: no blur, just a clean gradient
        className="fixed left-0 right-0 top-[56px] bottom-[70px] flex items-center justify-end z-50 p-2 sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full sm:w-[420px] h-full flex flex-col overflow-hidden 
                     bg-white rounded-3xl shadow-[0_12px_45px_rgba(0,0,0,0.2)] 
                     border border-emerald-100 self-end dark:bg-[#1E1E1E] dark:border-[#333]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 shadow-sm rounded-t-3xl">
            <ChatHeader onClose={onClose} sellerUserInfo={sellerInfo} />
          </div>

          {/* Product Info */}
          {product && (
            <div className="p-4 bg-gradient-to-r from-sky-100 to-blue-200 border-b border-emerald-100 shadow-sm dark:from-[#2C2C2C] dark:to-[#222] dark:border-[#333]">
              <ProductInfo product={product} />
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 bg-gradient-to-b from-white to-gray-50 space-y-5 dark:from-[#1E1E1E] dark:to-[#0a0a0a]">
            <Messages
              loading={loading}
              user={user}
              messages={messages}
              messagesEndRef={messagesEndRef}
              isTyping={isTyping}
              getMessageStatus={getMessageStatus}
            />
          </div>

          {/* Input */}
          <div className="py-1 bg-blue-100 border-t border-gray-200 shadow-inner dark:bg-[#2C2C2C] dark:border-[#333]">
            <MessageInput
              newMessage={newMessage}
              handleTyping={handleTyping}
              handleKeyPress={handleKeyPress}
              sendMessage={addMessage}
              sending={sending}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
