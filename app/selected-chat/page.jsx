"use client";
import ChatArea from "@/components/chat/ChatArea";
import { useChat } from "@/Context/ChatContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSocket } from "@/Context/SocketContext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SelectedChat() {
  const { selected, messages, sendMessage, loadConversation } = useChat();
  const { socket } = useSocket();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  useEffect(() => {
    if (!selected && conversationId) {
      loadConversation(conversationId);
    }
  }, [selected, conversationId, loadConversation]);

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
