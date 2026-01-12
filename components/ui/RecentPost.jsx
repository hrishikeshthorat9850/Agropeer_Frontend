"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import PostHeader from "./post/PostHeader";
import PostMedia from "./post/PostMedia";
import PostActions from "./post/PostActions";
import PostBackground from "./post/PostBackground";
import CommentInput from "./post/CommentInput";
import CommentsSection from "./post/CommentsSection";
import TextClamp from "./Text/TextClamp";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";
import { useLanguage } from "@/Context/languagecontext";
import useToast from "@/hooks/useToast";

export default function RecentPost({
  post,
  user,
  onLike,
  onAddComment,
  formatName,
}) {
  const [showCommentsSection, setShowCommentsSection] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [commentInfo, setCommentInfo] = useState([]);
  const [commentReplies, setCommentReplies] = useState({});
  const [nestedReplies, setNestedReplies] = useState({});
  const [replyLikes, setReplyLikes] = useState({});
  const [replyMenuOpen, setReplyMenuOpen] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const commentIconRef = useRef(null);
  const { t } = useLanguage();
  const { showToast } = useToast();

  // Initialize like state
  useEffect(() => {
    if (!user) return;
    const liked = post?.post_likes?.some((like) => like.user_id === user.id);
    setIsLike(liked);
    setLikeCount(post?.post_likes?.length || 0);
  }, [post, user]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      if (!post?.id) return;

      // Optimized: select specific fields to reduce egress
      const { data, error } = await supabase
        .from("post_comments")
        .select(
          `
          id,
          comment,
          created_at,
          user_id,
          post_id,
          parent_comment_id,
          userinfo(id, firstName, lastName, display_name, profile_url, avatar_url),
          comment_likes(id, user_id, comment_id)
        `
        )
        .eq("post_id", post.id)
        .order("created_at", { ascending: true })
        .limit(100); // Limit comments to reduce egress

      if (error) {
        console.error("Error fetching comments:", error);
        return;
      }

      // Separate main comments from replies
      const mainComments = data.filter((comment) => !comment.parent_comment_id);
      const replies = data.filter((comment) => comment.parent_comment_id);

      // Group replies by parent ID
      const repliesByParent = {};
      const nestedRepliesMap = {};

      replies.forEach((reply) => {
        const isParentComment = mainComments.some(
          (c) => c.id === reply.parent_comment_id
        );

        if (isParentComment) {
          if (!repliesByParent[reply.parent_comment_id]) {
            repliesByParent[reply.parent_comment_id] = [];
          }
          repliesByParent[reply.parent_comment_id].push(reply);
        } else {
          if (!nestedRepliesMap[reply.parent_comment_id]) {
            nestedRepliesMap[reply.parent_comment_id] = [];
          }
          nestedRepliesMap[reply.parent_comment_id].push(reply);
        }
      });

      // Track which replies the user has liked
      if (user) {
        const likedRepliesMap = {};
        replies.forEach((reply) => {
          const isLiked = reply.comment_likes?.some(
            (like) => like.user_id === user.id
          );
          likedRepliesMap[reply.id] = isLiked || false;
        });
        setReplyLikes(likedRepliesMap);
      }

      setCommentInfo(mainComments);
      setCommentReplies(repliesByParent);
      setNestedReplies(nestedRepliesMap);
    };

    fetchComments();
  }, [post?.id, user]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (replyMenuOpen) {
        setReplyMenuOpen(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [replyMenuOpen]);

  // Refresh comments function
  const refreshComments = async () => {
    if (!post?.id) return;

    const { data, error } = await supabase
      .from("post_comments")
      .select(
        `
        *,
        userinfo(*),
        comment_likes(*)
      `
      )
      .eq("post_id", post.id)
      .order("created_at", { ascending: true });

    if (!error) {
      const mainComments = data.filter((comment) => !comment.parent_comment_id);
      const replies = data.filter((comment) => comment.parent_comment_id);

      const repliesByParent = {};
      const nestedRepliesMap = {};

      replies.forEach((reply) => {
        const isParentComment = mainComments.some(
          (c) => c.id === reply.parent_comment_id
        );

        if (isParentComment) {
          if (!repliesByParent[reply.parent_comment_id]) {
            repliesByParent[reply.parent_comment_id] = [];
          }
          repliesByParent[reply.parent_comment_id].push(reply);
        } else {
          if (!nestedRepliesMap[reply.parent_comment_id]) {
            nestedRepliesMap[reply.parent_comment_id] = [];
          }
          nestedRepliesMap[reply.parent_comment_id].push(reply);
        }
      });

      if (user) {
        const likedRepliesMap = {};
        replies.forEach((reply) => {
          const isLiked = reply.comment_likes?.some(
            (like) => like.user_id === user.id
          );
          likedRepliesMap[reply.id] = isLiked || false;
        });
        setReplyLikes(likedRepliesMap);
      }

      setCommentInfo(mainComments);
      setCommentReplies(repliesByParent);
      setNestedReplies(nestedRepliesMap);
    }
  };

  // Handle like click - calls parent handler
  const handleLikeClick = async () => {
    const newLike = !isLike;
    setIsLike(newLike);
    setLikeCount((prev) => (newLike ? prev + 1 : prev - 1));
    onLike?.(post.id);
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!commentText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Call parent handler if provided
      if (onAddComment) {
        onAddComment(post.id, commentText.trim());
        setCommentText("");
        // Refresh comments after a short delay to allow parent to update
        setTimeout(() => {
          refreshComments();
        }, 500);
      } else {
        // Fallback: direct Supabase insertion
        const { data, error } = await supabase
          .from("post_comments")
          .insert([
            {
              post_id: post.id,
              user_id: user.id,
              comment: commentText.trim(),
            },
          ])
          .select()
          .single();

        if (error) throw error;

        setCommentText("");
        await refreshComments();
      }
    } catch (err) {
      setError(t("add_comment_failed"));
      console.error("Error adding comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentClick = () => {
    setShowCommentsSection(!showCommentsSection);
    if (commentIconRef.current) {
      commentIconRef.current.focus();
    }
  };

  const handleShareClick = async () => {
    if (Capacitor.isNativePlatform()) {
      const result = await shareContent({
        title: t("share_title"),
        text: post?.caption || post?.content || "",
        id: post?.id,
        route: "posts",
      });

      if (result.platform === "native") {
        console.log("✔ Shared via native bottom sheet");
      }

      if (result.platform === "web") {
        console.log("🌍 Shared via browser share dialog");
      }

      if (result.platform === "copy") {
        showToast("info", t("link_copied_toast"));
      }

      if (!result.success) {
        return;
      }
    }
  };

  // Reply handlers
  const handleSendReply = async () => {
    if (!replyText.trim()) return;
    if (!user) {
      alert(t("login_required_reply"));
      return;
    }
    if (!replyingTo) return;

    try {
      const { data, error } = await supabase
        .from("post_comments")
        .insert([
          {
            post_id: post.id,
            user_id: user.id,
            comment: replyText,
            parent_comment_id: replyingTo,
          },
        ])
        .select(
          `
          id,
          comment,
          created_at,
          user_id,
          post_id,
          parent_comment_id,
          userinfo(id, firstName, lastName, display_name, profile_url, avatar_url)
        `
        )
        .single();

      if (error) throw error;

      const isReplyingToComment = commentInfo.some((c) => c.id === replyingTo);

      if (isReplyingToComment) {
        setCommentReplies((prev) => ({
          ...prev,
          [replyingTo]: [...(prev[replyingTo] || []), data],
        }));
      } else {
        setNestedReplies((prev) => ({
          ...prev,
          [replyingTo]: [...(prev[replyingTo] || []), data],
        }));
      }

      setReplyText("");
      setShowReplyBox(null);
      setReplyingTo(null);
      await refreshComments();
    } catch (err) {
      console.error("Error sending reply:", err.message);
    }
  };

  const handleCommentLike = async (commentId) => {
    if (!user) {
      alert(t("login_required_like_comment"));
      return;
    }

    try {
      const { data: existingLike, error: fetchError } = await supabase
        .from("comment_likes")
        .select("id")
        .eq("comment_id", commentId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingLike) {
        const { error: deleteError } = await supabase
          .from("comment_likes")
          .delete()
          .eq("id", existingLike.id);

        if (deleteError) throw deleteError;
        await refreshComments();
      } else {
        const { error: insertError } = await supabase
          .from("comment_likes")
          .insert([{ comment_id: commentId }]);

        if (insertError) throw insertError;
        await refreshComments();
      }
    } catch (err) {
      console.error("Error toggling comment like:", err);
    }
  };

  const handleCommentReply = (parentId) => {
    if (!user) {
      alert(t("login_required_reply"));
      return;
    }
    setShowReplyBox((prev) => (prev === parentId ? null : parentId));
    setReplyingTo(parentId);
  };

  const handleReplyLike = async (replyId) => {
    if (!user) {
      alert(t("login_required_like_reply"));
      return;
    }

    try {
      const { data: existingLike, error: fetchError } = await supabase
        .from("comment_likes")
        .select("id")
        .eq("comment_id", replyId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (existingLike) {
        const { error: deleteError } = await supabase
          .from("comment_likes")
          .delete()
          .eq("id", existingLike.id);

        if (deleteError) throw deleteError;
        setReplyLikes((prev) => ({ ...prev, [replyId]: false }));
      } else {
        const { error: insertError } = await supabase
          .from("comment_likes")
          .insert([{ comment_id: replyId }]);

        if (insertError) throw insertError;
        setReplyLikes((prev) => ({ ...prev, [replyId]: true }));
      }
      await refreshComments();
    } catch (err) {
      console.error("Error toggling reply like:", err);
    }
  };

  const handleCommentMenu = () => {
    if (!user) return;
  };

  const handleReplyMenu = (replyId, event) => {
    event?.stopPropagation();
    setReplyMenuOpen((prev) => (prev === replyId ? null : replyId));
  };

  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-lg mx-auto mb-4 mt-6 bg-white dark:bg-black border-b md:border border-gray-200 dark:border-zinc-800 md:rounded-xl overflow-hidden"
      >

        <PostHeader
          post={post}
          idx={0}
          isBookmarked={isBookmarked}
          showOptions={showOptions}
          onBookmarkClick={() => setIsBookmarked((prev) => !prev)}
          onOptionsClick={() => setShowOptions(!showOptions)}
        />

        {/* Post Media */}
        {post.images && post.images.length > 0 && (
          <div className="dark:bg-[#272727]">
            <PostMedia images={post.images} />
          </div>
        )}

        {/* Action Buttons */}
        <PostActions
          isLike={isLike}
          likeCount={likeCount}
          commentCount={commentInfo.length}
          onLikeClick={handleLikeClick}
          onCommentClick={handleCommentClick}
          onShareClick={handleShareClick}
        />

        {/* Post Content */}
        {post.caption && (
          <div className="px-3 pb-2 pt-1 dark:bg-black">
            <div className="text-sm">
              <span className="font-bold text-gray-900 dark:text-white mr-2">
                {post?.userinfo?.display_name || "User"}
              </span>
              <span className="text-gray-800 dark:text-gray-200">
                <TextClamp
                  text={post.caption}
                  lines={2}
                  className="inline"
                />
              </span>
            </div>
          </div>
        )}

        {/* Comments Section */}
        <CommentsSection
          comments={commentInfo}
          showCommentsSection={showCommentsSection}
          showAllComments={showAllComments}
          commentReplies={commentReplies}
          nestedReplies={nestedReplies}
          showReplyBox={showReplyBox}
          replyText={replyText}
          onReplyTextChange={(e) => setReplyText(e.target.value)}
          onCommentLike={handleCommentLike}
          onCommentReply={handleCommentReply}
          onSendReply={handleSendReply}
          onCommentMenu={handleCommentMenu}
          replyMenuOpen={replyMenuOpen}
          onReplyMenu={handleReplyMenu}
          replyLikes={replyLikes}
          onToggleComments={() => setShowCommentsSection(!showCommentsSection)}
          onToggleShowAll={() => setShowAllComments(!showAllComments)}
          totalCommentCount={commentInfo.length}
          currentUserId={user?.id}
        />

        {/* Comment Input */}
        {user && (
          <CommentInput
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onSubmit={handleCommentSubmit}
            placeholder={t("add_comment_placeholder")}
            isSubmitting={isSubmitting}
            error={error}
            inputRef={commentIconRef}
          />
        )}
      </motion.article>
    </AnimatePresence>
  );
}
