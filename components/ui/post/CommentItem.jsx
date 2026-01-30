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

  const hasReplies = replies && replies.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`relative w-full group/comment py-3 ${
        menuOpen ? "z-20" : "z-10"
      }`}
    >
      <div className="flex gap-3 px-3">
        {/* Left Column: Avatar + Thread Line */}
        <div className="flex flex-col items-center shrink-0 relative">
          {/* Avatar */}
          <div className="z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
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

          {/* Thread Vertical Line - Only if there are replies */}
          {hasReplies && (
            <div className="absolute top-10 bottom-0 w-[1.5px] bg-gray-300 dark:bg-zinc-700/80 -z-0" />
          )}
        </div>

        {/* Right Column: Content + Replies */}
        <div className="flex-1 min-w-0">
          {/* Comment Header & Content */}
          <div className="flex flex-col gap-0.5">
            {/* Header Line: Name + Time */}
            <div className="flex items-center gap-2 text-[13px]">
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {comment?.userinfo?.display_name
                  ? comment?.userinfo?.display_name
                  : formatName(comment?.userinfo)}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-gray-400">
                {timeAgo(comment.created_at)}
              </span>
            </div>

            {/* Comment Text */}
            <div className="text-[14px] text-gray-900 dark:text-gray-200 whitespace-pre-wrap leading-snug">
              {comment.comment}
            </div>

            {/* Action Bar (Like, Reply, etc) */}
            <div className="flex items-center gap-4 mt-2">
              {/* Like Button */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onLike(comment?.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
                >
                  {isLiked ? (
                    <FaHeart className="w-4 h-4 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-4 h-4 text-gray-800 dark:text-white" />
                  )}
                </button>
                {comment?.comment_likes?.length > 0 && (
                  <span className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {comment.comment_likes.length}
                  </span>
                )}
              </div>
              {/* <button
                onClick={() => onReply(comment.id)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-800 dark:text-white"
              >
              </button> */}
              {/* Re-implementing the Action Row to match screenshot more exactly */}
              {/* Screenshot shows: LikeIcon [Count] | DislikeIcon | ReplyIcon/Text */}
              {/* I will use the previous structure but styled cleaner */}
              <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 select-none">
                <button
                  onClick={() => onReply(comment.id)}
                  className="hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-full transition-colors"
                >
                  Reply
                </button>
              </div>
              {/* Meatball Menu */}
              <div ref={menuRef} className="relative ml-auto">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <FaEllipsisH className="w-3.5 h-3.5" />
                </button>

                {/* Menu Dropdown - Same as before */}
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-[50]"
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
          </div>

          {/* Reply Input Box */}
          <AnimatePresence>
            {showReplyBox === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-2 mb-2"
              >
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-2xl px-2 py-1">
                  <input
                    type="text"
                    value={replyText}
                    onChange={onReplyTextChange}
                    onKeyPress={(e) => e.key === "Enter" && onSendReply()}
                    placeholder={t("write_reply_placeholder")}
                    autoFocus
                    className="flex-1 bg-transparent text-sm px-2 py-2 focus:outline-none text-gray-900 dark:text-white placeholder-gray-500"
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

          {/* Nested Replies Rendering */}
          {hasReplies && (
            <div className="mt-2 flex flex-col gap-4">
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
                  onEdit={onEdit}
                  onDelete={onDelete}
                  menuOpen={replyMenuOpen}
                  replyLikes={replyLikes}
                  nestedRepliesMap={nestedReplies}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
