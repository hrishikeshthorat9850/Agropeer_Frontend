import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function MessageInput({
  newMessage,
  handleTyping,
  handleKeyPress,
  sending,
  sendMessage,
}) {
  const { t } = useLanguage();
  return (
    <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={handleTyping}
          onKeyPress={handleKeyPress}
          placeholder={t("type_your_message_placeholder")}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={sending}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          disabled={!newMessage.trim() || sending}
          className={`p-2 rounded-full transition ${
            newMessage.trim() && !sending
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {sending ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FaPaperPlane />
          )}
        </motion.button>
      </div>
    </div>
  );
}
