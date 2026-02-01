"use client";
import { FaRegComment } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import CommentItem from "./CommentItem";
import { useLanguage } from "@/Context/languagecontext";

export default function CommentsSection({
  comments,
  showCommentsSection,
  showAllComments,
  commentReplies = {},
  nestedReplies = {},
  showReplyBox,
  replyText,
  onReplyTextChange,
  onCommentLike,
  onCommentReply,
  onSendReply,
  onCommentMenu,
  replyMenuOpen,
  onReplyMenu,
  replyLikes = {},
  onToggleComments,
  onToggleShowAll,
  totalCommentCount,
  currentUserId,
  loading = false,
  onUpdateComment,
  onDeleteComment,
}) {
  const { t } = useLanguage();
  if (!comments || comments.length === 0) return null;

  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <>
      {/* Comments Toggle Button */}
      <button
        onClick={onToggleComments}
        className="w-full px-4 py-3 border-t border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors bg-transparent dark:bg-transparent"
      >
        <div className="flex items-center justify-between">
          <span className="text-farm-900 font-medium text-sm dark:text-gray-300">
            {comments.length}{" "}
            {comments.length === 1
              ? t("comment_singular")
              : t("comment_plural")}
          </span>
          <FaRegComment
            className={`text-farm-900 dark:text-gray-300 transition-transform duration-300 ${
              showCommentsSection ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {/* Comments Section - Expandable */}
      <AnimatePresence>
        {showCommentsSection && comments.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 dark:border-gray-800/50 bg-white dark:bg-transparent"
          >
            <div className="px-4 py-3 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar bg-gray-50 dark:bg-transparent">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-farm-500"></div>
                </div>
              ) : (
                [...comments]
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at),
                  )
                  .map((comment) => {
                    // Check if user liked this comment
                    const isLiked =
                      (currentUserId &&
                        comment?.comment_likes?.some(
                          (like) => like.user_id === currentUserId,
                        )) ||
                      false;

                    return (
                      <CommentItem
                        key={comment.id}
                        comment={comment}
                        isLiked={isLiked}
                        replies={commentReplies[comment.id] || []}
                        nestedReplies={nestedReplies}
                        showReplyBox={showReplyBox}
                        replyText={replyText}
                        onReplyTextChange={onReplyTextChange}
                        onLike={onCommentLike}
                        onReply={onCommentReply}
                        onSendReply={onSendReply}
                        onMenuClick={onCommentMenu}
                        replyMenuOpen={replyMenuOpen}
                        replyLikes={replyLikes}
                        onReplyMenu={onReplyMenu}
                        onUpdateComment={onUpdateComment}
                        onDeleteComment={onDeleteComment}
                        currentUserId={currentUserId}
                      />
                    );
                  })
              )}

              {!loading && totalCommentCount > 2 && (
                <button
                  onClick={onToggleShowAll}
                  className="text-farm-500 text-xs font-medium hover:text-farm-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors ml-6"
                >
                  {showAllComments
                    ? t("show_less")
                    : t("view_all_comments", { count: totalCommentCount })}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
