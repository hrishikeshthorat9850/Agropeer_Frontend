"use client";

import { createContext, useContext, useMemo, useState, useCallback, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";
import { useSocket } from "@/Context/SocketContext";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const { user: loggedInUser } = useLogin();

  const {
    messages: socketMessages, // 🔥 SOURCE OF TRUTH
    joinConversation,
    sendMessage: sendSocketMessage,
    markAsRead,
    loadMessages,
  } = useSocket();

  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  // When current conversation is deleted, clear selected so UI can redirect/show empty state
  useEffect(() => {
    const handleDeleted = ({ conversation_id }) => {
      if (conversation_id == null) return;
      const cid = String(conversation_id);
      if (selectedRef.current?.conversation_id != null && String(selectedRef.current.conversation_id) === cid) {
        setSelected(null);
      }
    };
    const handleDeletedLocal = (e) => {
      const { conversation_id } = e.detail || {};
      handleDeleted({ conversation_id });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("conversationDeletedLocal", handleDeletedLocal);
      return () => window.removeEventListener("conversationDeletedLocal", handleDeletedLocal);
    }
  }, []);

  /* --------------------------------------------
    🔹 SELECT CONVERSATION
  --------------------------------------------- */
  const selectConversation = useCallback(
    async ({ conversationId, chatPartner }) => {
      if (!conversationId || !chatPartner || !loggedInUser?.id) return;

      setSelected({
        ...chatPartner,
        conversation_id: conversationId,
      });

      joinConversation(conversationId);
      markAsRead(conversationId);

      // Load existing messages from DB (exclude soft-deleted)
      const { data: msgs, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true });

      if (!error && msgs) {
        loadMessages(conversationId, msgs);
      }
    },
    [joinConversation, markAsRead, loggedInUser?.id, loadMessages]
  );

  /* --------------------------------------------
    🔹 LOAD CONVERSATION (deep link / refresh)
  --------------------------------------------- */
  const loadConversation = useCallback(
    async (conversationId) => {
      if (!conversationId || !loggedInUser?.id) return false;

      const { data: conv, error } = await supabase
        .from("conversations")
        .select(`
          id,
          user1:user1_id(id, firstName, lastName, display_name, profile_url, avatar_url),
          user2:user2_id(id, firstName, lastName, display_name, profile_url, avatar_url)
        `)
        .eq("id", conversationId)
        .is("deleted_at", null)
        .single();

      if (error || !conv) {
        console.error("Failed to load conversation (may be deleted)", error);
        return false;
      }

      const isUser1 = conv.user1?.id === loggedInUser.id;
      const otherUser = isUser1 ? conv.user2 : conv.user1;
      if (!otherUser) return false;

      selectConversation({
        conversationId,
        chatPartner: {
          id: otherUser.id,
          displayName: otherUser.display_name,
          firstName: otherUser.firstName || "",
          lastName: otherUser.lastName || "",
          profile_url: otherUser.profile_url || otherUser.avatar_url,
        },
      });
      return true;
    },
    [loggedInUser?.id, selectConversation]
  );

  /* --------------------------------------------
    🔹 DERIVE UI MESSAGES (IMPORTANT)
    SocketContext → UI-friendly format
  --------------------------------------------- */
  const messages = useMemo(() => {
    if (!selected?.conversation_id || !loggedInUser?.id) return [];

    const cid = String(selected.conversation_id);
    const raw = socketMessages[cid] || [];

    return raw.map((msg) => ({
      id: msg.id,
      from: msg.sender_id === loggedInUser.id ? "me" : msg.sender_id,
      text: msg.content,
      at: msg.created_at,
      seen: !!msg.read_at,
    }));
  }, [socketMessages, selected?.conversation_id, loggedInUser?.id]);

  /* --------------------------------------------
    🔹 SEND MESSAGE (Optimistic via socket)
  --------------------------------------------- */
  const sendMessage = useCallback(
    (text) => {
      if (!text || !selected?.conversation_id || !loggedInUser?.id) return;

      sendSocketMessage({
        content: text.trim(),
        sender_id: loggedInUser.id,
        conversation_id: selected.conversation_id,
        created_at: new Date().toISOString(),
      });
    },
    [sendSocketMessage, selected?.conversation_id, loggedInUser?.id]
  );

  /* --------------------------------------------
    🔹 PROVIDER
  --------------------------------------------- */
  return (
    <ChatContext.Provider
      value={{
        contacts,
        setContacts,
        selected,
        messages, // 🔥 UI always updates
        selectConversation,
        loadConversation,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

/* --------------------------------------------
  🔹 HOOK
--------------------------------------------- */
export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
};
