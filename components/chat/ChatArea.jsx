"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import ChatInputComposer from "./ChatInputComposer";
import DateSeparator from "./DateSeparator";
import { useLogin } from "@/Context/logincontext";
import { Capacitor } from "@capacitor/core";
import { useSocket } from "@/Context/SocketContext";

export default function ChatArea({ messages = [], selected, sendMessage }) {
  const { user } = useLogin();
  const { socket } = useSocket();
  const isNative = Capacitor.isNativePlatform();

  const hasRealMessages = Array.isArray(messages) && messages.length > 0;
  const allMessages = hasRealMessages ? messages : [];

  const messagesContainerRef = useRef(null);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }, []);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      setAutoScrollEnabled(distanceFromBottom < 20);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom("instant");
  }, [selected?.conversation_id, scrollToBottom]);

  useEffect(() => {
    if (autoScrollEnabled) {
      scrollToBottom("instant");
    }
  }, [allMessages, autoScrollEnabled, scrollToBottom]);

  useEffect(() => {
    socket.emit("user:conversation", {
      userId: user?.id,
      conversationId: selected?.conversation_id,
      active: true,
    });

    return () => {
      socket.emit("user:conversation", {
        userId: user?.id,
        conversationId: selected?.conversation_id,
        active: false,
      });
    };
  }, [selected?.conversation_id]);

  return (
    <main className="fixed inset-0 bg-white dark:bg-black z-40">
      <div className="flex flex-col w-full h-full overflow-hidden">
        <ChatHeader selected={selected} />

        <div
          ref={messagesContainerRef}
          className="flex-1 px-4 py-2 overflow-y-auto scroll-smooth space-y-2
          md:scrollbar-thin md:scrollbar-thumb-gray-300 dark:md:scrollbar-thumb-neutral-700"
          style={{
            paddingBottom: "20px",
          }}
        >
          {allMessages.map((m, i) => {
            const prev = allMessages[i - 1];
            const showDate =
              !prev ||
              new Date(prev.at).toDateString() !==
                new Date(m.at).toDateString();

            return (
              <React.Fragment key={m.id}>
                {showDate && <DateSeparator date={m.at} />}
                <MessageBubble message={m} />
              </React.Fragment>
            );
          })}

          {/* <div ref={endRef} /> */}
        </div>

        <ChatInputComposer sendMessage={sendMessage} />
      </div>
    </main>
  );
}
