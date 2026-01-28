"use client";
import React, { useState } from "react";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisH,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";

export default function ReplyItem({
  reply, // current reply object
  currentUserId,
  replyLikes = {},
  onLike, // handle reply like
  onReply, // opens nested reply box
  onMenuClick, // opens reply menu
  showReplyBox, // ID of the reply currently being replied to
  replyText,
  onReplyTextChange,
  onSendReply, // function to send nested reply
  parentId, // ID of the parent comment
  level = 0, // nesting level
  nestedReplies = [], // nested replies for this reply
  nestedRepliesMap = {}, // map of all nested replies
}) {
  const { t } = useLanguage();

  // Determine if this reply is liked by the current user
  // const isLiked =
  //   replyLikes[reply.id]?.some((like) => like.user_id === currentUserId) ||
  //   false;

  const isLiked = replyLikes[reply?.id] === true;

  const likeCount = replyLikes[reply.id]?.length || 0;

  return (
    <div
      className={`mt-3 ${
        level > 0 ? "ml-4 pl-3 border-l-2 border-farm-200/50" : "ml-2"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-3 group/reply w-full pr-2"
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          }}
        >
          {reply?.userinfo?.avatar_url ? (
            <img
              src={reply.userinfo.avatar_url}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-white font-bold">
              {reply?.userinfo?.display_name
                ? reply.userinfo?.display_name.charAt(0)
                : formatName(reply.userinfo).charAt(0)}
            </span>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="text-sm leading-tight text-gray-900 dark:text-gray-100">
              <span className="font-semibold mr-2 cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                {reply?.userinfo?.display_name || formatName(reply?.userinfo)}
              </span>
              <span className="whitespace-pre-wrap break-words font-normal">
                {reply.comment}
              </span>
            </div>

            {/* Like Button (Far Right) */}
            <button
              onClick={() => onLike(reply.id)}
              className="mt-1 flex-shrink-0 focus:outline-none transform active:scale-75 transition-transform"
            >
              {isLiked ? (
                <FaHeart className="w-3 h-3 text-red-500" />
              ) : (
                <FaRegHeart className="w-3 h-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
              )}
            </button>
          </div>

          {/* Metadata Row: Time • Likes • Reply */}
          <div className="flex items-center gap-4 mt-1">
            <span className="text-xs text-gray-500 font-medium">
              {timeAgo(reply.created_at)}
            </span>

            {likeCount > 0 && (
              <span className="text-xs text-gray-500 font-semibold cursor-pointer">
                {likeCount} {likeCount === 1 ? "like" : "likes"}
              </span>
            )}

            {level < 2 && (
              <button
                onClick={() => onReply(reply.id)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"
              >
                {t("reply_btn")}
              </button>
            )}

            <button
              onClick={() => onMenuClick(reply.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors opacity-0 group-hover/reply:opacity-100 p-0.5"
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
                className="mt-3 flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={replyText}
                    onChange={onReplyTextChange}
                    onKeyPress={(e) =>
                      e.key === "Enter" && onSendReply(reply?.id)
                    }
                    placeholder={t("write_reply_placeholder")}
                    autoFocus
                    className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-full text-sm focus:border-gray-300 focus:bg-white focus:outline-none pr-10 dark:bg-[#272727] dark:border-gray-700 dark:text-white transition-all"
                  />
                  <button
                    onClick={() => onSendReply(reply?.id)}
                    disabled={!replyText.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-600"
                  >
                    {t("post_btn") || "Post"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recursively Render Nested Replies */}
          {nestedReplies.length > 0 && (
            <div className="mt-2">
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
