import React, { useState, useRef, useEffect } from "react";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisH,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";

export default function ReplyItem({
  reply,
  currentUserId,
  replyLikes = {},
  onLike,
  onReply,
  onMenuClick,
  showReplyBox,
  replyText,
  onReplyTextChange,
  onSendReply,
  parentId,
  level = 0,
  nestedReplies = [],
  nestedRepliesMap = {},
  onEdit,
  onDelete,
}) {
  const { t } = useLanguage();
  const isLiked = replyLikes[reply?.id] === true;
  const likeCount = replyLikes[reply.id]?.length || 0;

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
    <div className={`relative ${level > 0 ? "ml-0" : ""}`}>
      {/* Connector Curve for Level 0 Replies */}
      <div className="absolute -left-[23px] -top-3 w-[20px] h-[26px] border-b-[1.5px] border-l-[1.5px] border-gray-300 dark:border-zinc-700/80 rounded-bl-[16px] pointer-events-none select-none" />

      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-2.5 items-start group/reply w-full"
      >
        {/* Avatar */}
        <div className="flex-shrink-0 z-10">
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
            {reply?.userinfo?.avatar_url ? (
              <img
                src={reply.userinfo.avatar_url}
                alt={reply?.userinfo?.display_name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700">
                <span className="text-white text-[10px] font-bold">
                  {(
                    reply?.userinfo?.display_name || formatName(reply.userinfo)
                  )?.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Block */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-0.5">
            {/* Header: Name + Time */}
            <div className="flex items-center gap-2 text-[12px]">
              <span className="font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:underline">
                {reply?.userinfo?.display_name || formatName(reply?.userinfo)}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400">
                {timeAgo(reply.created_at)}
              </span>
            </div>

            {/* Content */}
            <div className="text-[13px] text-gray-900 dark:text-gray-200 whitespace-pre-wrap leading-snug">
              {reply.comment}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 dark:text-gray-400 font-medium select-none">
              {/* Like */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onLike(reply.id)}
                  className="flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
                >
                  {isLiked ? (
                    <FaHeart className="w-3 h-3 text-red-500" />
                  ) : (
                    <FaRegHeart className="w-3 h-3 text-gray-800 dark:text-white" />
                  )}
                </button>
                {likeCount > 0 && (
                  <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400">
                    {likeCount}
                  </span>
                )}
              </div>

              {/* Reply Button */}
              <button
                onClick={(e) => onReply(reply.id)}
                className="hover:bg-gray-100 dark:hover:bg-zinc-800 px-2 py-0.5 rounded-full transition-colors text-xs font-semibold text-gray-700 dark:text-gray-300"
              >
                Reply
              </button>

              {/* Meatball Menu */}
              <div ref={menuRef} className="relative ml-auto">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 transition-colors"
                >
                  <FaEllipsisH className="w-2.5 h-2.5" />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 top-full mt-1 flex bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-[50]"
                    >
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          if (onEdit) onEdit(reply.id);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                      >
                        <FaEdit className="w-3 h-3" /> 
                        {/* {t("edit_btn") || "Edit"} */}
                      </button>
                      <button
                        onClick={() => {
                          setMenuOpen(false);
                          if (onDelete) onDelete(reply.id);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10"
                      >
                        <FaTrash className="w-3 h-3" />{" "}
                        {/* {t("delete_btn") || "Delete"} */}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Nested Reply Input */}
          <AnimatePresence>
            {showReplyBox === reply.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={onReplyTextChange}
                    onKeyPress={(e) =>
                      e.key === "Enter" && onSendReply(reply?.id)
                    }
                    placeholder={t("write_reply_placeholder")}
                    autoFocus
                    className="flex-1 bg-gray-100 dark:bg-zinc-800 text-xs px-3 py-1.5 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500/50 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  <button
                    onClick={() => onSendReply(reply?.id)}
                    disabled={!replyText.trim()}
                    className="text-blue-700 font-semibold text-xs hover:text-blue-600 transition-colors px-2"
                  >
                    {t("post_btn") || "Post"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recursively Render Nested Replies */}
          {nestedReplies.length > 0 && (
            <div className="mt-2 space-y-3">
              {nestedReplies.map((nestedReply) => (
                <ReplyItem
                  key={nestedReply.id}
                  reply={nestedReply}
                  currentUserId={currentUserId}
                  replyLikes={replyLikes}
                  onLike={onLike}
                  onReply={onReply}
                  onMenuClick={onMenuClick}
                  showReplyBox={showReplyBox}
                  replyText={replyText}
                  onReplyTextChange={onReplyTextChange}
                  onSendReply={onSendReply}
                  parentId={reply.id}
                  level={level + 1}
                  nestedReplies={nestedRepliesMap[nestedReply.id] || []}
                  nestedRepliesMap={nestedRepliesMap}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
