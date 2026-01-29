"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisH,
  FaEdit,
  FaTrash,
  FaLeaf,
} from "react-icons/fa";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import { motion, AnimatePresence } from "framer-motion";
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`relative w-full group/comment py-2 ${
        menuOpen ? "z-20" : "z-10"
      }`}
    >
      <div className="flex gap-3 items-start px-2 sm:px-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
            {comment?.userinfo?.avatar_url ? (
              <img
                src={comment.userinfo.avatar_url}
                alt={comment?.userinfo?.display_name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600">
                <span className="text-white text-xs font-bold">
                  {(
                    comment?.userinfo?.display_name ||
                    formatName(comment?.userinfo)
                  )?.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Block */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col text-[15px] leading-snug">
              <span className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline mb-0.5">
                {comment?.userinfo?.display_name
                  ? comment?.userinfo?.display_name
                  : formatName(comment?.userinfo)}
              </span>
              <span className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-normal">
                {comment.comment}
              </span>
            </div>

            {/* Like Icon */}
            <button
              onClick={() => onLike(comment?.id)}
              className="pt-1 flex-shrink-0 focus:outline-none transition-transform active:scale-90"
            >
              {isLiked ? (
                <FaHeart className="w-3.5 h-3.5 text-red-500" />
              ) : (
                <FaRegHeart className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
              )}
            </button>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium select-none relative">
            <span>{timeAgo(comment.created_at)}</span>

            {comment?.comment_likes?.length > 0 && (
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                {comment.comment_likes.length} {t("likes") || "likes"}
              </span>
            )}

            <button
              onClick={() => onReply(comment.id)}
              className="font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
            >
              {t("reply_btn")}
            </button>

            {/* Meatball Menu Trigger */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="opacity-0 group-hover/comment:opacity-100 transition-opacity p-1 text-gray-400 hover:text-gray-600"
              >
                <FaEllipsisH />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute left-0 top-full mt-1 w-32 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-[50]"
                  >
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        if (onEdit) onEdit(comment.id);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                      <FaEdit className="w-3 h-3" /> {t("edit_btn") || "Edit"}
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        if (onDelete) onDelete(comment.id);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <FaTrash className="w-3 h-3" />{" "}
                      {t("delete_btn") || "Delete"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Reply Input Box */}
          <AnimatePresence>
            {showReplyBox === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={onReplyTextChange}
                    onKeyPress={(e) => e.key === "Enter" && onSendReply()}
                    placeholder={t("write_reply_placeholder")}
                    autoFocus
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500/50 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  <button
                    onClick={onSendReply}
                    disabled={!replyText.trim()}
                    className="text-blue-500 font-semibold text-sm disabled:opacity-50 hover:text-blue-600 transition-colors px-2"
                  >
                    {t("post_btn") || "Post"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nested Replies */}
          {replies?.length > 0 && (
            <div className="mt-3">
              <button className="flex items-center gap-3 w-full group/toggle">
                <div className="w-8 h-[1px] bg-gray-300 dark:bg-gray-700 group-hover/toggle:bg-gray-400 transition-colors"></div>
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover/toggle:text-gray-600 dark:group-hover/toggle:text-gray-300 transition-colors">
                  View {replies.length}{" "}
                  {replies.length === 1 ? "reply" : "replies"}
                </span>
              </button>

              <div className="space-y-4 mt-3">
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
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
