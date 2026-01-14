"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisH,
  FaPaperPlane,
  FaLeaf,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import { motion } from "framer-motion";
import ReplyItem from "./ReplyItem";
import { useLanguage } from "@/Context/languagecontext";

export default function CommentItem({
  comment,
  isLiked,
  replies = [],
  nestedReplies = {},
  showReplyBox,
  replyText,
  onReplyTextChange,
  onLike,
  onReply,
  onSendReply,
  onMenuClick,
  replyMenuOpen,
  replyLikes = {},
  onReplyMenu,
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-start gap-3 py-3 px-4 rounded-3xl hover:scale-[1.01] transition-all duration-300 group/comment shadow-lg ${menuOpen ? "z-[50] relative" : "relative"}`}
      style={{
        background:
          typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
            ? "transparent" // transparent in dark mode for cleaner look
            : "linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.45) 100%)",
        backdropFilter: "blur(20px)",
        border:
          typeof window !== "undefined" &&
            document.documentElement.classList.contains("dark")
            ? "none"
            : "1px solid rgba(255,255,255,0.25)",
        boxShadow: "none",
      }}
    >
      {/* 🌿 Avatar Icon */}
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover/comment:scale-110 transition-transform duration-300"
        style={{
          background:
            "linear-gradient(135deg, #10b981 0%, #0284c7 70%, #f97316 35%, #000000 100%)",
          boxShadow:
            "0 4px 10px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        <FaLeaf className="w-3.5 h-3.5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        {/* 🧾 Name + Time */}
        <div className="flex items-center gap-2">
          <span className="text-slate-800 text-[0.95rem] font-semibold tracking-tight dark:text-white">
            {comment?.userinfo?.display_name
              ? comment?.userinfo?.display_name
              : formatName(comment?.userinfo)}
          </span>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <span className="text-slate-400 text-[0.75rem] font-medium">
            {timeAgo(comment.created_at)}
          </span>
        </div>

        {/* 💬 Comment Text */}
        <p className="text-slate-700 dark:text-gray-200 text-[0.9rem] leading-relaxed font-normal">
          {comment.comment}
        </p>

        {/* ❤️ Like + Reply */}
        <div className="flex items-center justify-between text-xs text-farm-500 dark:text-gray-400 mt-2 select-none">
          <div className="flex items-center gap-5">
            {/* Like */}
            <button
              onClick={() => onLike(comment?.id)}
              className={`flex items-center gap-1 transition-all duration-300 ease-out 
              ${isLiked ? "text-red-500" : "text-farm-500 hover:text-red-500"}`}
            >
              {isLiked ? (
                <FaHeart className="w-4 h-4 text-red-500 animate-pulse drop-shadow-sm" />
              ) : (
                <FaRegHeart className="w-4 h-4" />
              )}
              {comment?.comment_likes?.length > 0 && (
                <span
                  className={`text-[0.8rem] font-medium transition-all duration-200 ${isLiked ? "text-red-500" : "text-slate-500"
                    }`}
                >
                  {comment.comment_likes.length}
                </span>
              )}
            </button>

            {/* Reply */}
            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-[0.8rem] font-semibold text-farm-700 hover:text-farm-800 dark:text-gray-300 dark:hover:text-white transition-all duration-200 active:scale-95"
            >
              {t("reply_btn")}
              {comment?.replies?.length > 0 && (
                <span className="text-[0.75rem] text-slate-400 font-medium">
                  ({comment.replies.length})
                </span>
              )}
            </button>
          </div>

          {/* ⋯ Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-slate-400 hover:text-slate-700 transition-all duration-200 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <FaEllipsisH className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
              <div className="absolute right-0 top-8 w-36 bg-white dark:bg-[#1C1C1E] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[9999] animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (onEdit) onEdit(comment.id);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-left border-b border-gray-100 dark:border-white/5"
                >
                  <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <FaEdit className="w-3.5 h-3.5" />
                  </div>
                  {t("edit_btn") || "Edit"}
                </button>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (onDelete) onDelete(comment.id);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                >
                  <div className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30">
                    <FaTrash className="w-3.5 h-3.5" />
                  </div>
                  {t("delete_btn") || "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ✏️ Reply Input (Premium Glass UI) */}
        {showReplyBox === comment.id && (
          <div className="mt-3 flex items-center gap-2">
            <div
              className="flex-1 flex items-center px-3 py-1.5 rounded-full border border-white/30 bg-white/30 
              backdrop-blur-xl shadow-inner transition focus-within:ring-2 focus-within:ring-farm-400"
            >
              <input
                type="text"
                placeholder={t("write_reply_placeholder")}
                value={replyText}
                onChange={onReplyTextChange}
                onKeyPress={(e) => e.key === "Enter" && onSendReply()}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-slate-400 
                focus:outline-none"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={onSendReply}
              className="p-2 rounded-full bg-gradient-to-r from-farm-500 to-farm-600 
              hover:from-farm-600 hover:to-farm-700 text-white shadow-md transition-all duration-300"
            >
              <motion.div
                animate={{ rotate: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
              </motion.div>
            </motion.button>
          </div>
        )}

        {/* 🪴 Replies */}
        {replies?.length > 0 && (
          <div className="ml-6 mt-3 space-y-2">
            {replies.map((reply) => (
              <ReplyItem
                key={reply.id}
                reply={reply}
                isLiked={replyLikes[reply.id] || false}
                nestedReplies={nestedReplies[reply.id] || []}
                showReplyBox={showReplyBox}
                replyText={replyText}
                onReplyTextChange={onReplyTextChange}
                onLike={onLike}
                onReply={onReply}
                onSendReply={onSendReply}
                onMenuClick={(replyId, e) => {
                  if (onReplyMenu) onReplyMenu(replyId, e);
                }}
                menuOpen={replyMenuOpen}
                replyLikes={replyLikes}
                nestedRepliesMap={nestedReplies}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
