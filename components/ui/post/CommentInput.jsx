"use client";
import { FaPaperPlane, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";

export default function CommentInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  isSubmitting = false,
  error = null,
  inputRef = null,
}) {
  const { t } = useLanguage();
  const inputPlaceholder = placeholder || t("share_thoughts_placeholder");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 py-4 relative"
      style={{
        background:
          typeof window !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "#272727"
            : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)",
        backdropFilter: "blur(20px)",
        borderTop:
          typeof window !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "none"
            : "1px solid rgba(255,255,255,0.2)",
        boxShadow:
          typeof window !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "inset 0 1px 0 rgba(255,255,255,0.06)"
            : "inset 0 1px 0 rgba(255,255,255,0.5)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
            boxShadow:
              "0 4px 16px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <FaLeaf className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={inputPlaceholder}
              className="w-full px-5 py-3 rounded-2xl border-0 text-slate-800 placeholder-slate-500 text-sm transition-all duration-300 focus:outline-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.7) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow:
                  "inset 0 2px 8px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              value={value}
              onChange={onChange}
              ref={inputRef}
              onKeyPress={(e) => e.key === "Enter" && onSubmit()}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubmit}
            disabled={!value.trim() || isSubmitting}
            className={`p-3 rounded-2xl transition-all duration-300 ${
              value.trim() && !isSubmitting
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            style={{
              boxShadow:
                value.trim() && !isSubmitting
                  ? "0 8px 25px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <FaPaperPlane className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-xs mt-1 ml-8"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
}
