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
  onEdit, // Using this as trigger from menu
  onDelete, // Using this as trigger from menu
  // New props
  onUpdateComment,
  onDeleteComment,
  currentUserId,
}) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Editing State
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.comment);
  const [isSaving, setIsSaving] = useState(false);

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
  const isOwner = currentUserId && comment.user_id === currentUserId;

  const handleSaveEdit = async () => {
    if (!editContent.trim() || isSaving) return;
    setIsSaving(true);
    if (onUpdateComment) {
      await onUpdateComment(comment.id, editContent);
    }
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.comment);
  };

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

            {/* Comment Text or Edit Input */}
            {isEditing ? (
              <div className="mt-1">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-zinc-800 border-none rounded-xl p-2 text-sm text-black focus:ring-1 focus:ring-green-500/50 resize-none"
                  rows={2}
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={handleCancelEdit}
                    className="text-xs font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {t("cancel") || "Cancel"}
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={!editContent.trim() || isSaving}
                    className="text-xs font-bold text-green-600 hover:text-green-700 disabled:opacity-50"
                  >
                    {isSaving
                      ? t("saving") || "Saving..."
                      : t("save") || "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-[14px] text-gray-900 dark:text-gray-200 whitespace-pre-wrap leading-snug">
                {comment.comment}
              </div>
            )}

            {/* Action Bar (Like, Reply, etc) - Hide when editing */}
            {!isEditing && (
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

                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 select-none">
                  <button
                    onClick={() => onReply(comment.id)}
                    className="hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-1.5 rounded-full transition-colors"
                  >
                    Reply
                  </button>
                </div>

                {/* Meatball Menu - Only show if own comment (for Edit/Delete) */}
                {isOwner && (
                  <div ref={menuRef} className="relative ml-auto">
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                      <FaEllipsisH className="w-3.5 h-3.5" />
                    </button>

                    {/* Menu Dropdown */}
                    <AnimatePresence>
                      {menuOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-full flex bg-white dark:bg-[#1e1e1e] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-[50]"
                        >
                          <button
                            onClick={() => {
                              setMenuOpen(false);
                              setIsEditing(true);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                          >
                            <FaEdit className="w-3 h-3" />
                            {/* {t("edit_btn") || "Edit"} */}
                          </button>
                          <button
                            onClick={() => {
                              setMenuOpen(false);
                              if (onDeleteComment) onDeleteComment(comment.id);
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
                )}
              </div>
            )}
          </div>

          {/* Reply Input Box */}
          <AnimatePresence>
            {showReplyBox === comment.id && !isEditing && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-3 pr-1"
              >
                <div className="flex items-center gap-3 w-full bg-gray-100 dark:bg-zinc-800/50 p-1.5 pr-3 rounded-[20px] transition-all focus-within:ring-1 focus-within:ring-green-500/50 focus-within:bg-white dark:focus-within:bg-black/40 border border-transparent focus-within:border-green-500/30">
                  <div className="w-7 h-7 bg-gray-200 dark:bg-zinc-700 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {/* Show Small User Avatar if available, else Initials or generic */}
                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                      Me
                    </span>
                  </div>

                  <input
                    type="text"
                    value={replyText}
                    onChange={onReplyTextChange}
                    onKeyPress={(e) => e.key === "Enter" && onSendReply()}
                    placeholder={t("write_reply_placeholder") || "Reply..."}
                    autoFocus
                    className="flex-1 bg-transparent text-xs sm:text-sm focus:outline-none min-w-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />

                  <button
                    onClick={onSendReply}
                    disabled={!replyText.trim()}
                    className={`
                       flex-shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all duration-200
                       ${
                         replyText.trim()
                           ? "bg-green-600 text-white shadow-md hover:bg-green-700 active:scale-95 transform"
                           : "bg-transparent text-gray-400 cursor-not-allowed"
                       }
                    `}
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
                  // Pass recursive handlers
                  onUpdateComment={onUpdateComment}
                  onDeleteComment={onDeleteComment}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
