"use client";
import React, { useState } from "react";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import {
  FaRegHeart,
  FaHeart,
  FaEllipsisH,
  FaPaperPlane,
  FaReply,
  FaLeaf,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";

export default function ReplyItem({
  reply, // current reply object
  currentUserId,
  replyLikes = {},
  onLike, // handle reply like
  onReplyClick, // opens nested reply box
  onMenuClick, // opens reply menu
  showReplyBox, // ID of the reply currently being replied to
  replyText,
  onReplyTextChange,
  onSendReply, // function to send nested reply
  parentId, // ID of the parent comment
  level = 0, // nesting level
  allReplies = [], // flattened array of all replies for lookup
}) {
  const { t } = useLanguage();
  // Find nested replies (replies where parent_id matches this reply's id)
  const nestedReplies = allReplies
    .filter((r) => r.parent_id === reply.id)
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  // Determine if this reply is liked by the current user
  const isLiked =
    replyLikes[reply.id]?.some((like) => like.user_id === currentUserId) ||
    false;

  const likeCount = replyLikes[reply.id]?.length || 0;

  return (
    <div
      className={`mt-3 ${level > 0 ? "ml-4 pl-3 border-l-2 border-farm-200/50" : "ml-2"
        }`}
    >
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex gap-2.5 group/reply"
      >
        {/* Avatar */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #059669 0%, #047857 100%)",
          }}
        >
          <span className="text-[10px] text-white font-bold">
            {reply.userinfo?.display_name
              ? reply.userinfo.display_name.charAt(0)
              : formatName(reply.userinfo).charAt(0)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {/* Bubble */}
          <div className="bg-farm-50/80 rounded-2xl px-3 py-2 inline-block max-w-full hover:bg-farm-100/80 transition-colors border border-farm-100 dark:bg-[#1a1a1a] dark:border-gray-700">
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-farm-900 text-xs font-bold tracking-tight dark:text-gray-200">
                {reply.userinfo?.display_name || formatName(reply.userinfo)}
              </span>
              <span className="text-farm-400 text-[10px] font-medium">
                {timeAgo(reply.created_at)}
              </span>
            </div>
            <p className="text-farm-800 text-xs leading-relaxed dark:text-gray-300">
              {reply.comment}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-1 ml-1">
            <button
              onClick={() => onLike(reply.id)}
              className={`flex items-center gap-1 text-[10px] font-semibold transition-colors ${isLiked ? "text-red-500" : "text-farm-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                }`}
            >
              {isLiked ? (
                <FaHeart className="w-3 h-3" />
              ) : (
                <FaRegHeart className="w-3 h-3" />
              )}
              {likeCount > 0 && <span>{likeCount}</span>}
            </button>

            {level < 2 && (
              <button
                onClick={() => onReplyClick(reply.id)}
                className="text-[10px] font-semibold text-farm-500 hover:text-farm-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
              >
                {t("reply_btn")}
              </button>
            )}

            <button
              onClick={() => onMenuClick(reply.id)}
              className="text-farm-400 hover:text-farm-600 transition-colors opacity-0 group-hover/reply:opacity-100 p-0.5"
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
                className="mt-2 flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={replyText}
                    onChange={onReplyTextChange}
                    onKeyPress={(e) =>
                      e.key === "Enter" && onSendReply(reply.id)
                    }
                    placeholder={t("write_reply_placeholder")}
                    autoFocus
                    className="w-full px-3 py-1.5 bg-white border-2 border-farm-200 rounded-full text-xs focus:border-farm-400 focus:outline-none pr-8 dark:bg-[#272727] dark:border-gray-600 dark:text-white"
                  />
                  <button
                    onClick={() => onSendReply(reply.id)}
                    className="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-farm-500 text-white rounded-full hover:bg-farm-600 transition-colors"
                  >
                    <FaPaperPlane className="w-2.5 h-2.5" />
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
                  onReplyClick={onReplyClick}
                  onMenuClick={onMenuClick}
                  showReplyBox={showReplyBox}
                  replyText={replyText}
                  onReplyTextChange={onReplyTextChange}
                  onSendReply={onSendReply}
                  parentId={reply.id}
                  level={level + 1}
                  allReplies={allReplies}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
