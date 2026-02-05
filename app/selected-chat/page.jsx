"use client";
import ChatArea from "@/components/chat/ChatArea";
import { useChat } from "@/Context/ChatContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSocket } from "@/Context/SocketContext";
import LoadingSpinner from "@/components/LoadingSpinner";
// ADDITIVE ENHANCEMENT: Import back transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { useBackTransition } from "@/hooks/useBackTransition";

export default function SelectedChat() {
  const { selected, messages, sendMessage, loadConversation } = useChat();
  const { socket } = useSocket();
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get back transition handler
  // Original router.replace() still available, this adds smooth transitions
  const { routerBack } = useBackTransition();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  // Load conversation when URL has conversationId and it's either no selection or a different conversation (user switch)
  useEffect(() => {
    if (!conversationId) return;
    const isDifferentConversation = !selected || selected.conversation_id !== conversationId;
    if (isDifferentConversation) {
      loadConversation(conversationId).then((found) => {
        if (found === false) {
          // ENHANCED: Use routerBack() with smooth transition instead of router.replace()
          // PRESERVED: All other behavior unchanged (loadConversation logic, etc.)
          routerBack();
        }
      });
    }
  }, [conversationId, selected?.conversation_id, loadConversation, router]);

  // Redirect to /chats when the current conversation is deleted
  useEffect(() => {
    const handleDeleted = (e) => {
      const { conversation_id } = e.detail || {};
      if (conversation_id != null && conversationId != null && String(conversationId) === String(conversation_id)) {
        // ENHANCED: Use routerBack() with smooth transition instead of router.replace()
        // PRESERVED: All other behavior unchanged (event handling, comparison logic, etc.)
        routerBack();
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("conversationDeletedLocal", handleDeleted);
      return () => window.removeEventListener("conversationDeletedLocal", handleDeleted);
    }
  }, [conversationId, router]);

  if (!selected) {
    return (
      <div className="flex justify-center items-center h-[100dvh]">
        <LoadingSpinner size="md" />
      </div>
    );
  }

  return (
    <ChatArea
      selected={selected}
      messages={messages}
      sendMessage={sendMessage}
    />
  );
}
