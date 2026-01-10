import { motion } from "framer-motion";
import { timeAgo } from "@/utils/timeConverter";
import { useLanguage } from "@/Context/languagecontext";

export default function Messages({
  messages,
  user,
  messagesEndRef,
  isTyping,
  getMessageStatus,
  loading,
}) {
  const { t } = useLanguage();
  if (!user) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-blue-500 text-sm">{t("no_messages_start_conv")}</p>
        </div>
      ) : (
        messages.map((message) => {
          // Support both formats: /chats format (from, text, at) and raw format (sender_id, content, created_at)
          const isMyMessage =
            message.from === "me" || message.sender_id === user?.id;
          const messageText = message.text || message.content;
          const messageTime = message.at || message.created_at;

          return (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                isMyMessage ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  isMyMessage
                    ? "bg-green-500 text-white"
                    : "bg-blue-500 text-gray-900"
                }`}
              >
                <p className="text-sm">{messageText}</p>
                <div
                  className={`flex items-center justify-end gap-1 mt-1 ${
                    isMyMessage ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  <span className="text-xs">{timeAgo(messageTime)}</span>
                  {getMessageStatus && getMessageStatus(message)}
                </div>
              </div>
            </motion.div>
          );
        })
      )}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex justify-start">
          <div className="bg-gray-100 px-4 py-2 rounded-2xl">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
