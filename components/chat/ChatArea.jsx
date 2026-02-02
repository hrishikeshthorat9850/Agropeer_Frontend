"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import ChatInputComposer from "./ChatInputComposer";
import DateSeparator from "./DateSeparator";
import { useLogin } from "@/Context/logincontext";
import { Capacitor } from "@capacitor/core";
import { useSocket } from "@/Context/SocketContext";
import { useLanguage } from "@/Context/languagecontext";
import { FaCommentSlash } from "react-icons/fa";

export default function ChatArea({ messages = [], selected, sendMessage }) {
  const { user } = useLogin();
  const { socket } = useSocket();
  const { t } = useLanguage();
  const isNative = Capacitor.isNativePlatform();

  const hasRealMessages = Array.isArray(messages) && messages.length > 0;
  const allMessages = hasRealMessages ? messages : [];
  const showClearedEmptyState = selected && !hasRealMessages;

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
          md:scrollbar-thin md:scrollbar-thumb-gray-300 dark:md:scrollbar-thumb-neutral-700
          flex flex-col"
          style={{
            paddingBottom: "20px",
          }}
        >
          {showClearedEmptyState ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center mb-4">
                <FaCommentSlash className="w-7 h-7 text-sky-600 dark:text-sky-400" />
              </div>
              <p className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                {t("chat_cleared_empty_title")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-[280px]">
                {t("chat_cleared_empty_hint")}
              </p>
            </div>
          ) : (
            allMessages.map((m, i) => {
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
            })
          )}
        </div>

        <ChatInputComposer sendMessage={sendMessage} />
      </div>
    </main>
  );
}
