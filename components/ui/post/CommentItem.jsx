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
      className={`flex items-start gap-4 px-3 py-3 w-full group/comment ${
        menuOpen ? "z-[50] relative" : "relative"
      }`}
    >
      {/* 🌿 Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #0284c7 100%)",
        }}
      >
        {comment?.userinfo?.avatar_url ? (
          <img
            src={comment.userinfo.avatar_url}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <FaLeaf className="w-4 h-4 text-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          {/* Text Content */}
          <div className="text-sm leading-tight text-gray-900 dark:text-gray-100">
            <span className="font-semibold mr-2 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              {comment?.userinfo?.display_name
                ? comment?.userinfo?.display_name
                : formatName(comment?.userinfo)}
            </span>
            <span className="whitespace-pre-wrap break-words font-normal">
              {comment.comment}
            </span>
          </div>

          {/* Like Button (Far Right) */}
          <button
            onClick={() => onLike(comment?.id)}
            className="mt-1 flex-shrink-0 focus:outline-none transform active:scale-75 transition-transform"
          >
            {isLiked ? (
              <FaHeart className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            ) : (
              <FaRegHeart className="w-3.5 h-3.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            )}
          </button>
        </div>

        {/* Metadata Row: Time • Likes • Reply */}
        <div
          className="flex items-center gap-4 mt-1.5 select-none relative"
          ref={menuRef}
        >
          <span className="text-xs text-gray-500 font-medium">
            {timeAgo(comment.created_at)}
          </span>

          {comment?.comment_likes?.length > 0 && (
            <span className="text-xs text-gray-500 font-semibold cursor-pointer">
              {comment.comment_likes.length}{" "}
              {comment.comment_likes.length === 1 ? "like" : "likes"}
            </span>
          )}

          <button
            onClick={() => onReply(comment.id)}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
          >
            {t("reply_btn")}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors opacity-0 group-hover/comment:opacity-100 p-0.5"
          >
            <FaEllipsisH className="w-3 h-3" />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute left-0 top-6 w-32 bg-white dark:bg-[#1C1C1E] rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-[9999] animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onEdit) onEdit(comment.id);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
              >
                <FaEdit className="w-3 h-3" />
                {t("edit_btn") || "Edit"}
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  if (onDelete) onDelete(comment.id);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-left"
              >
                <FaTrash className="w-3 h-3" />
                {t("delete_btn") || "Delete"}
              </button>
            </div>
          )}
        </div>

        {/* ✏️ Reply Input (Pill Style) */}
        {showReplyBox === comment.id && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={replyText}
                onChange={onReplyTextChange}
                onKeyPress={(e) => e.key === "Enter" && onSendReply()}
                placeholder={t("write_reply_placeholder")}
                autoFocus
                className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:border-gray-300 focus:bg-white focus:outline-none pr-12 dark:bg-[#272727] dark:border-gray-700 dark:text-white transition-all"
              />
              <button
                onClick={onSendReply}
                disabled={!replyText.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-600"
              >
                {t("post_btn") || "Post"}
              </button>
            </div>
          </div>
        )}

        {/* 🪴 Nested Replies */}
        {replies?.length > 0 && (
          <div className="ml-2 mt-2 space-y-3">
            <button className="flex items-center gap-2 py-2">
              <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700"></div>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                View {replies.length}{" "}
                {replies.length === 1 ? "reply" : "replies"}
              </span>
            </button>

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
