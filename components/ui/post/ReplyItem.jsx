"use client";
import React from "react";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import { FaRegHeart, FaHeart, FaEllipsisH } from "react-icons/fa";
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
}) {
  const { t } = useLanguage();
  const isLiked = replyLikes[reply?.id] === true;
  const likeCount = replyLikes[reply.id]?.length || 0;

  return (
    <div className={`mt-3 ${level > 0 ? "ml-8" : "ml-0"}`}>
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-3 items-start group/reply w-full"
      >
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
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
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col text-[14px] leading-snug">
              <span className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:underline mb-0.5">
                {reply?.userinfo?.display_name || formatName(reply?.userinfo)}
              </span>
              <span className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap font-normal">
                {reply.comment}
              </span>
            </div>

            {/* Like Icon */}
            <button
              onClick={() => onLike(reply.id)}
              className="pt-1 flex-shrink-0 focus:outline-none transition-transform active:scale-90"
            >
              {isLiked ? (
                <FaHeart className="w-3 h-3 text-red-500" />
              ) : (
                <FaRegHeart className="w-3 h-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300" />
              )}
            </button>
          </div>

          {/* Metadata Row */}
          <div className="flex items-center gap-4 mt-1 text-[11px] text-gray-500 dark:text-gray-400 font-medium select-none">
            <span>{timeAgo(reply.created_at)}</span>

            {likeCount > 0 && (
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </span>
            )}

            {level < 2 && (
              <button
                onClick={() => onReply(reply.id)}
                className="font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                {t("reply_btn")}
              </button>
            )}

            <button
              onClick={(e) => onMenuClick(reply.id, e)}
              className="opacity-0 group-hover/reply:opacity-100 transition-opacity p-0.5 text-gray-400 hover:text-gray-600"
            >
              <FaEllipsisH className="w-2.5 h-2.5" />
            </button>
          </div>

          {/* Nested Reply Input */}
          <AnimatePresence>
            {showReplyBox === reply.id && (
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
                    onKeyPress={(e) =>
                      e.key === "Enter" && onSendReply(reply?.id)
                    }
                    placeholder={t("write_reply_placeholder")}
                    autoFocus
                    className="flex-1 bg-gray-100 dark:bg-gray-800 text-xs px-4 py-2 rounded-full focus:outline-none focus:ring-1 focus:ring-green-500/50 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                  <button
                    onClick={() => onSendReply(reply?.id)}
                    disabled={!replyText.trim()}
                    className="text-blue-500 font-semibold text-xs disabled:opacity-50 hover:text-blue-600 transition-colors px-2"
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
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
