"use client";
import { FaRegHeart, FaHeart, FaEllipsisH, FaPaperPlane, FaLeaf } from "react-icons/fa";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import { motion } from "framer-motion";

export default function ReplyItem({
  reply,
  isLiked,
  nestedReplies = [],
  showReplyBox,
  replyText,
  onReplyTextChange,
  onLike,
  onReply,
  onSendReply,
  onMenuClick,
  menuOpen,
  replyLikes = {},
  nestedRepliesMap = {},
}) {
  return (
    <div className="flex items-start gap-2 p-2 rounded-xl bg-gray-50/80 border border-gray-100 hover:bg-gray-100/80 transition-colors relative dark:bg-[#272727] dark:border-gray-800">
      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 shadow-sm flex-shrink-0">
        <FaLeaf className="w-2.5 h-2.5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-slate-700 text-xs font-semibold dark:text-white">
            {reply?.userinfo?.display_name || formatName(reply.userinfo)}
          </span>
          <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
          <span className="text-slate-500 text-xs">{timeAgo(reply.created_at)}</span>
        </div>
        <p className="text-slate-600 text-xs leading-relaxed">{reply.comment}</p>
        
        {/* Reply Actions */}
        <div className="flex items-center justify-between mt-1 text-xs text-farm-500">
          {/* Left side: Like + Reply */}
          <div className="flex items-center gap-3">
            <button
              className={`relative flex items-center gap-1 transition ${isLiked ? "text-red-500" : "hover:text-red-500"}`}
              onClick={() => onLike(reply.id)}
            >
              {isLiked ? (
                <FaHeart className="w-3 h-3 text-red-500" />
              ) : (
                <FaRegHeart className="w-3 h-3" />
              )}
              <span>
                {reply.comment_likes?.length > 0 && (
                  <span className="ml-1">{reply.comment_likes.length}</span>
                )}
              </span>
            </button>
            
            <button
              className="hover:text-farm-700 transition"
              onClick={() => onReply(reply.id)}
            >
              Reply
            </button>
          </div>

          {/* Right side: 3-dot menu */}
          <button
            className="text-farm-400 hover:text-farm-700 transition relative"
            onClick={(e) => onMenuClick(reply.id, e)}
          >
            <FaEllipsisH className="w-3 h-3" />
            {menuOpen === reply.id && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-6 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[100px] z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 text-red-500">
                  Report
                </button>
              </motion.div>
            )}
          </button>
        </div>

        {/* Reply input box for nested replies */}
        {showReplyBox === reply.id && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Write a reply..."
              value={replyText}
              onChange={onReplyTextChange}
              onKeyPress={(e) => e.key === 'Enter' && onSendReply()}
              className="flex-1 text-sm border border-gray-300 rounded-full px-3 py-1 focus:outline-none focus:ring-1 text-gray-700 focus:ring-farm-500"
            />
            <button
              onClick={onSendReply}
              className="bg-farm-500 hover:bg-farm-600 text-white p-2 rounded-full transition"
            >
              <FaPaperPlane className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Recursively render nested replies */}
        {nestedReplies?.length > 0 && (
          <div className="ml-6 mt-2 space-y-2">
            {nestedReplies.map((nestedReply) => (
              <ReplyItem
                key={nestedReply.id}
                reply={nestedReply}
                isLiked={replyLikes[nestedReply.id] || false}
                nestedReplies={nestedRepliesMap[nestedReply.id] || []}
                showReplyBox={showReplyBox}
                replyText={replyText}
                onReplyTextChange={onReplyTextChange}
                onLike={onLike}
                onReply={onReply}
                onSendReply={onSendReply}
                onMenuClick={onMenuClick}
                menuOpen={menuOpen}
                replyLikes={replyLikes}
                nestedRepliesMap={nestedRepliesMap}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

