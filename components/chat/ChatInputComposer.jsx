"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { FaPaperPlane, FaSmile } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
  loading: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { t } = useLanguage();
    return (
      <div className="p-4 text-sm text-gray-500 dark:text-gray-300">
        {t("loading_emojis")}
      </div>
    );
  },
});

export default function ChatInputComposer({ sendMessage }) {
  const { t } = useLanguage();
  const [showEmoji, setShowEmoji] = useState(false);
  const [input, setInput] = useState("");
  const emojiRef = useRef(null);

  const inputRef = useRef(null); // <-- add this

  useEffect(() => {
    const handler = (e) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(e.target) &&
        !e.target.closest("#emoji-button")
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className="sticky bottom-0 left-0 right-0 p-3 border-t dark:border-neutral-800 
        bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        {/* Emoji Button */}
        <button
          id="emoji-button"
          onClick={() => setShowEmoji((v) => !v)}
          className="p-2 rounded-full text-orange-400 hover:bg-gray-100 dark:hover:bg-neutral-800"
        >
          <FaSmile className="text-xl" />
        </button>

        {/* Input */}
        <input
          ref={inputRef} // <-- attach here
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage(input);
              setInput("");
              setShowEmoji(false);
            }
          }}
          placeholder={t("type_message_placeholder")}
          className="flex-1 px-4 py-2 rounded-full border border-gray-500 outline-none 
          text-sm bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100"
        />

        {/* Send Button */}
        <button
          onClick={() => {
            sendMessage(input);
            setInput("");
            setShowEmoji(false);
          }}
          className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white rounded-full shadow"
        >
          <FaPaperPlane />
        </button>
      </div>

      {/* Emoji Picker */}
      <div
        ref={emojiRef}
        className={`
          absolute bottom-[70px] left-0 z-[500]
          transition-all duration-150 origin-bottom
          ${
            showEmoji
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }
        `}
      >
        <EmojiPicker
          theme={"dark"}
          emojiStyle="apple"
          height={380}
          width={330}
          previewConfig={{ showPreview: false }}
          onEmojiClick={(emoji) => {
            setInput((i) => i + emoji.emoji);
            inputRef.current?.focus(); // <-- MASTER FIX 💥
          }}
        />
      </div>
    </div>
  );
}
