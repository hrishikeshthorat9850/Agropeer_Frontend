"use client";
import { createContext, useContext, useState, useRef, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";
import { useSocket } from "@/Context/SocketContext";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { user: loggedInUser } = useLogin();
  const { socket, joinConversation, sendMessage: sendSocketMessage, markAsRead } = useSocket();
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);

  const selectedConversationRef = useRef(null);

  // Keep ref in sync
  const setSelectedSafe = (val) => {
    selectedConversationRef.current = val;
    setSelected(val);
  };

  // 🔹 Fetch messages
  const fetchConversationMessages = useCallback(async (conversationId) => {
    if (!conversationId || !loggedInUser?.id) return;

    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true });

    const transformed = (data || []).map(msg => ({
      id: msg.id,
      from: msg.sender_id === loggedInUser.id ? "me" : msg.sender_id,
      text: msg.content,
      at: msg.created_at,
      seen: !!msg.read_at,
    }));

    setMessages(transformed);
  }, [loggedInUser?.id]);

  // 🔹 Select conversation
  const selectConversation = useCallback(async ({ conversationId, chatPartner }) => {
    if (!conversationId || !chatPartner) return;

    setSelectedSafe({
      ...chatPartner,
      conversation_id: conversationId,
    });

    joinConversation(conversationId);
    markAsRead(conversationId);
    fetchConversationMessages(conversationId);
  }, [joinConversation, markAsRead, fetchConversationMessages]);

  // 🔹 Load conversation by ID (for reload/deep link)
  const loadConversation = useCallback(async (conversationId) => {
    if (!conversationId || !loggedInUser?.id) return;

    try {
      const { data: conv, error } = await supabase
        .from("conversations")
        .select(`
          id,
          user1:user1_id(id, firstName, lastName, profile_url, display_name, avatar_url, email),
          user2:user2_id(id, firstName, lastName, profile_url, display_name, avatar_url, email)
        `)
        .eq("id", conversationId)
        .single();

      if (error || !conv) {
        console.error("Error loading conversation:", error);
        return;
      }

      const isUser1 = conv.user1?.id === loggedInUser.id;
      const otherUser = isUser1 ? conv.user2 : conv.user1;

      if (!otherUser) return;

      const chatPartner = {
        id: otherUser.id,
        displayName: otherUser.display_name,
        firstName: otherUser.firstName || "",
        lastName: otherUser.lastName || "",
        profile_url: otherUser.profile_url || otherUser.avatar_url,
      };

      selectConversation({ conversationId, chatPartner });
    } catch (err) {
      console.error("Unexpected error loading conversation:", err);
    }
  }, [loggedInUser?.id, selectConversation]);

  // 🔹 Send message
  const sendMessage = useCallback((text) => {
    if (!text || !selected?.conversation_id || !loggedInUser?.id) return;

    const payload = {
      content: text.trim(),
      sender_id: loggedInUser.id,
      conversation_id: selected.conversation_id,
      created_at: new Date().toISOString(),
    };

    // Optimistic UI
    setMessages(prev => [
      ...prev,
      {
        id: "temp-" + Date.now(),
        from: "me",
        text,
        at: payload.created_at,
        seen: false,
      }
    ]);

    joinConversation(selected.conversation_id);
    sendSocketMessage(payload);
  }, [selected, loggedInUser?.id, joinConversation, sendSocketMessage]);

  return (
    <ChatContext.Provider
      value={{
        contacts,
        setContacts,
        selected,
        messages,
        selectConversation,
        loadConversation,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
};
