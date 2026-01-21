"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useLogin } from "@/Context/logincontext";
import { motion } from "framer-motion";
import PostHeader from "./ui/post/PostHeader";
import PostMedia from "./ui/post/PostMedia";
import PostActions from "./ui/post/PostActions";
import PostBackground from "./ui/post/PostBackground";
import CommentInput from "./ui/post/CommentInput";
import CommentsSection from "./ui/post/CommentsSection";
import useToast from "@/hooks/useToast";
import { supabase } from "@/lib/supabaseClient";
import {
  apiRequest,
  validateComment,
  sanitizeComment,
} from "@/utils/apiHelpers";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";
import { useLanguage } from "@/Context/languagecontext";

export default function PostCard({ post, comment, idx, refreshPosts }) {
  const { user, accessToken } = useLogin();
  const { showToast } = useToast();
  const { t } = useLanguage();

  // State management
  const [postCaption, setPostCaption] = useState(post?.caption || "");
  const [showAllComments, setShowAllComments] = useState(false);
  const [error, setError] = useState(null);
  const [com, setCom] = useState("");
  const [isLike, setIsLike] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const commentIconRef = useRef(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentInfo, setcommentInfo] = useState([]);
  const [commentCount, setcommentCount] = useState(0);
  const [commentLike, setcommentLike] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [commentReplies, setCommentReplies] = useState({});
  const [replyLikes, setReplyLikes] = useState({});
  const [replyMenuOpen, setReplyMenuOpen] = useState(null);
  const [nestedReplies, setNestedReplies] = useState({});
  const [showCommentsSection, setShowCommentsSection] = useState(false);
  const [originalCommentCount, setOriginalCommentCount] = useState(0);
  const [edit, setEdit] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingBookmark, setLoadingBookmark] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  function sanitizeCaption(str) {
    if (!str) return "";
    return str
      .replace(/[`]/g, "'") // escape backticks
      .replace(/["]/g, "'") // escape quotes
      .replace(/\(/g, "&#40;") // escape (
      .replace(/\)/g, "&#41;") // escape )
      .replace(/→/g, "\u2192") // safe arrow
      .replace(/\n/g, "<br/>"); // safe line breaks
  }

  const copyToClipboard = useCallback(
    async (text) => {
      try {
        if (Capacitor.isNativePlatform()) {
          // Native clipboard for Capacitor Android
          const { Clipboard } = await import("@capacitor/clipboard");
          await Clipboard.write({ string: text });
          showToast("success", t("link_copied_success"));
          return;
        }

        // Browser clipboard
        await navigator.clipboard.writeText(text);
        showToast("success", t("link_copied_success"));
      } catch (err) {
        console.error("Clipboard error:", err);
        showToast("error", t("clipboard_blocked_error"));
      }
    },
    [showToast, t],
  );

  // Initialize post data - use stable references
  useEffect(() => {
    if (!user || !post) return;
    const liked = post?.post_likes?.some((like) => like.user_id === user.id);
    setIsLike(liked);
    setLikeCount(post?.post_likes?.length || 0);
    setcommentCount(post?.post_comments?.length || 0);
  }, [
    post?.id,
    user?.id,
    post?.post_likes?.length,
    post?.post_comments?.length,
  ]);

  // Check if post is bookmarked
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user || !post?.id) return;

      try {
        const { data, error } = await supabase
          .from("user_favorites")
          .select("id")
          .eq("post_id", post?.id)
          .eq("user_id", user?.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking bookmark status:", error);
          return;
        }

        setIsBookmarked(!!data);
      } catch (err) {
        console.error("Error checking bookmark status:", err);
      }
    };

    checkBookmarkStatus();
  }, [user?.id, post?.id]);

  // Process comments data (memoized)
  const processCommentsData = useCallback((data) => {
    if (!data || !Array.isArray(data))
      return { mainComments: [], repliesByParent: {}, nestedRepliesMap: {} };

    // Separate main comments from replies
    const mainComments = data.filter((comment) => !comment.parent_comment_id);
    const replies = data.filter((comment) => comment.parent_comment_id);

    // Group replies by parent ID
    const repliesByParent = {};
    const nestedRepliesMap = {};

    replies.forEach((reply) => {
      const isParentComment = mainComments.some(
        (c) => c.id === reply.parent_comment_id,
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

    return { mainComments, repliesByParent, nestedRepliesMap };
  }, []);

  // Fetch comments - use stable user.id instead of user object
  const fetchComments = useCallback(async () => {
    if (!post?.id) return;

    setLoadingComments(true);
    try {
      // Optimized: select specific fields and limit comments to reduce egress
      const { data, error } = await supabase
        .from("post_comments")
        .select(
          `
          id,
          comment,
          created_at,
          user_id,
          post_id,
          userinfo(id, firstName, lastName, display_name, profile_url, avatar_url),
          comment_likes(id, user_id, comment_id)
        `,
        )
        .eq("post_id", post?.id)
        .order("created_at", { ascending: true })
        .limit(100); // Limit comments to reduce egress

      if (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments");
        return;
      }

      const { mainComments, repliesByParent, nestedRepliesMap } =
        processCommentsData(data || []);

      // Track which replies the user has liked
      if (user?.id && data) {
        const likedRepliesMap = {};
        const replies = data.filter((comment) => comment.parent_comment_id);
        replies.forEach((reply) => {
          const isLiked = reply.comment_likes?.some(
            (like) => like.user_id === user.id,
          );
          likedRepliesMap[reply.id] = isLiked || false;
        });
        setReplyLikes(likedRepliesMap);
      }

      setcommentInfo(mainComments);
      setCommentReplies(repliesByParent);
      setNestedReplies(nestedRepliesMap);
      setError(null);
    } catch (err) {
      console.error("Unexpected error fetching comments:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoadingComments(false);
    }
  }, [post?.id, user?.id, processCommentsData]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Calculate top-level comment count
  useEffect(() => {
    const topLevelCommentsCount = commentInfo.filter(
      (comment) => comment.parent_comment_id === null,
    ).length;
    setOriginalCommentCount(topLevelCommentsCount);
  }, [commentInfo]);

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

  // Refresh comments function - remove showToast dependency to prevent rebuilds
  const refreshComments = useCallback(async () => {
    await fetchComments();
    // showToast("info", "Comments refreshed");
  }, [fetchComments]);

  // Comment handlers
  const handleComment = useCallback((e) => {
    setCom(e.target.value);
    setError(null);
  }, []);

  const saveComment = useCallback(async () => {
    if (!com.trim() || isSubmitting || !user) return;

    // Validate comment
    const validation = validateComment(com);
    if (!validation.valid) {
      setError(validation.error);
      showToast("error", validation.error);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const sanitizedComment = sanitizeComment(com);

      const { data, error: apiError } = await apiRequest(
        `${BASE_URL}/api/post-comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            post_id: post.id,
            comment: sanitizedComment,
            user_id: user.id,
          }),
        },
      );

      if (apiError) {
        setError(apiError.message || t("add_comment_failed"));
        showToast("error", apiError.message || t("add_comment_failed"));
        return;
      }

      // Optimistic update: add to local state immediately
      if (data?.data) {
        const newComment = Array.isArray(data.data) ? data.data[0] : data.data;
        if (newComment) {
          setcommentInfo((prev) => [...prev, newComment]);
          setcommentCount((prev) => prev + 1);
        }
      }

      setCom("");
      await refreshComments();
      showToast("success", t("add_comment_success"));
    } catch (e) {
      setError(t("network_error"));
      showToast("error", t("network_error") + " Please try again.");
      console.error("Error saving comment:", e);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    com,
    isSubmitting,
    user?.id,
    post?.id,
    refreshComments,
    accessToken,
    showToast,
    t,
  ]);

  const handleCommentClick = useCallback(() => {
    setShowCommentsSection((prev) => !prev);
    if (commentIconRef.current) {
      commentIconRef.current.focus();
    }
  }, []);

  // Like handlers with optimistic updates
  const handleLikeClick = useCallback(async () => {
    if (!user) {
      showToast("error", t("login_required_toast"));
      return;
    }

    if (loadingLike) return; // Prevent double clicks

    // Optimistic update
    const previousLike = isLike;
    const previousCount = likeCount;
    setIsLike(!isLike);
    setLikeCount((prev) => (previousLike ? Math.max(0, prev - 1) : prev + 1));
    setLoadingLike(true);

    try {
      const { data, error: apiError } = await apiRequest(
        `${BASE_URL}/api/posts/${post.id}/like`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ user_id: user.id }),
        },
      );

      if (apiError) {
        // Rollback on error
        setIsLike(previousLike);
        setLikeCount(previousCount);
        showToast("error", apiError.message || t("like_update_failed"));
        return;
      }

      // Update with server response
      if (data) {
        setIsLike(data.liked);
        setLikeCount(data.likeCount || likeCount);
      }
    } catch (err) {
      // Rollback on error
      setIsLike(previousLike);
      setLikeCount(previousCount);
      showToast("error", t("network_error") + " Please try again.");
      console.error("Unexpected error:", err);
    } finally {
      setLoadingLike(false);
    }
  }, [
    user?.id,
    isLike,
    likeCount,
    post?.id,
    loadingLike,
    accessToken,
    showToast,
    t,
  ]);

  const handleBookmarkClick = useCallback(async () => {
    if (!user) {
      showToast("warning", t("login_required_toast"));
      return;
    }

    if (loadingBookmark) return; // Prevent double clicks

    const originalStatus = isBookmarked;
    setIsBookmarked(!isBookmarked);
    setLoadingBookmark(true);

    try {
      const { data, error: apiError } = await apiRequest(
        `${BASE_URL}/api/posts/${post.id}/bookmark`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ user_id: user.id }),
        },
      );

      if (apiError) {
        // Rollback on error
        setIsBookmarked(originalStatus);
        showToast("error", apiError.message || t("network_error"));
        return;
      }

      if (data) {
        setIsBookmarked(data.bookmarked);
        showToast(
          data.bookmarked ? "success" : "info",
          data.bookmarked ? t("bookmark_added") : t("bookmark_removed"),
        );
      }
    } catch (err) {
      // Rollback on error
      setIsBookmarked(originalStatus);
      showToast("error", t("network_error"));
      console.error("Error while bookmarking:", err);
    } finally {
      setLoadingBookmark(false);
    }
  }, [
    user?.id,
    isBookmarked,
    post?.id,
    loadingBookmark,
    accessToken,
    showToast,
    t,
  ]);

  const handleShareClick = useCallback(async () => {
    const postId = post?.id;

    const result = await shareContent({
      title: t("share_title"),
      text: postCaption || post?.text,
      id: postId,
      route: "posts", // <--- this decides links like /post/ or /market/
    });

    // 📌 Utility returned results - you just respond:
    if (result.platform === "native") {
      console.log("✔ Shared via native bottom sheet");
    }

    if (result.platform === "web") {
      console.log("🌍 Shared via browser share dialog");
    }

    if (result.platform === "copy") {
      showToast("info", t("link_copied_success"));
    }

    if (!result.success) {
      return;
    }
  }, [postCaption, post?.text, post?.id, showToast, t]);

  // Reply handlers
  const handleSendReply = useCallback(async () => {
    if (!replyText.trim() || !user || !replyingTo) return;

    // Validate reply
    const validation = validateComment(replyText);
    if (!validation.valid) {
      showToast("error", validation.error);
      return;
    }

    try {
      const sanitizedReply = sanitizeComment(replyText);

      const { data, error: apiError } = await apiRequest(
        `${BASE_URL}/api/post-comment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            post_id: post.id,
            comment: sanitizedReply,
            user_id: user.id,
            parent_comment_id: replyingTo,
          }),
        },
      );

      if (apiError) {
        showToast("error", apiError.message || t("reply_send_failed"));
        return;
      }

      // Refresh comments to get the new reply with all data
      await refreshComments();

      setReplyText("");
      setShowReplyBox(null);
      setReplyingTo(null);
      showToast("success", t("reply_sent_success"));
    } catch (err) {
      console.error("Error sending reply:", err);
      showToast("error", t("reply_send_failed") + " Please try again.");
    }
  }, [
    replyText,
    user?.id,
    replyingTo,
    post?.id,
    refreshComments,
    accessToken,
    showToast,
    t,
  ]);

  const handleCommentLike = useCallback(
    async (commentId) => {
      if (!user) {
        showToast("error", t("login_required_like_comment"));
        return;
      }

      try {
        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/comments/${commentId}/like`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ user_id: user.id }),
          },
        );

        if (apiError) {
          showToast("error", apiError.message || t("like_comment_failed"));
          return;
        }

        // Refresh comments to get updated like counts
        await refreshComments();
      } catch (err) {
        console.error("Error toggling comment like:", err);
        showToast("error", t("network_error") + " Please try again.");
      }
    },
    [user?.id, refreshComments, accessToken, showToast, t],
  );

  const handleCommentReply = useCallback(
    (parentId) => {
      if (!user) {
        showToast("error", t("login_required_reply"));
        return;
      }
      setShowReplyBox((prev) => (prev === parentId ? null : parentId));
      setReplyingTo(parentId);
    },
    [user?.id, showToast, t],
  );

  const handleReplyToReply = useCallback(
    (replyId) => {
      if (!user) {
        showToast("error", t("login_required_reply"));
        return;
      }
      setShowReplyBox((prev) => (prev === replyId ? null : replyId));
      setReplyingTo(replyId);
    },
    [user?.id, showToast, t],
  );

  const handleReplyLike = useCallback(
    async (replyId) => {
      if (!user) {
        showToast("error", t("login_required_like_reply"));
        return;
      }

      try {
        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/comments/${replyId}/like`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ user_id: user.id }),
          },
        );

        if (apiError) {
          showToast("error", apiError.message || t("like_reply_failed"));
          return;
        }

        // Update local state optimistically
        setReplyLikes((prev) => ({ ...prev, [replyId]: data?.liked || false }));

        // Refresh to get accurate counts
        await refreshComments();
      } catch (err) {
        console.error("Error toggling reply like:", err);
        showToast("error", t("network_error") + " Please try again.");
      }
    },
    [user?.id, refreshComments, accessToken, showToast, t],
  );

  const handleCommentMenu = useCallback(() => {
    if (!user) return;
  }, [user?.id]);

  const handleReplyMenu = useCallback((replyId, event) => {
    event?.stopPropagation();
    setReplyMenuOpen((prev) => (prev === replyId ? null : replyId));
  }, []);

  const onOptionsClick = useCallback(() => {
    setShowOptions(!showOptions);
  }, [showOptions]);

  const onDelete = useCallback(async () => {
    onOptionsClick();

    if (!confirm(t("delete_post_confirm"))) {
      return;
    }

    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", post?.id)
        .eq("user_id", user?.id);

      if (error) {
        console.error("Error deleting post:", error);
        showToast("error", t("failed_delete_post"));
      } else {
        showToast("success", t("post_deleted_success"));
        // Optionally trigger a refresh in parent component
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Unexpected error deleting post:", err);
      showToast("error", t("error_deleting_post"));
    }
  }, [post?.id, user?.id, onOptionsClick, showToast, t]);

  const onPostUpdated = useCallback((newCaption) => {
    setPostCaption(newCaption);
  }, []);

  // Memoize handlers to prevent unnecessary re-renders
  const commentHandlers = useMemo(
    () => ({
      onCommentLike: handleCommentLike,
      onCommentReply: handleCommentReply,
      onSendReply: handleSendReply,
      onCommentMenu: handleCommentMenu,
      onReplyMenu: handleReplyMenu,
    }),
    [
      handleCommentLike,
      handleCommentReply,
      handleSendReply,
      handleCommentMenu,
      handleReplyMenu,
    ],
  );

  return (
    <motion.article
      id={`post-${post?.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative w-full max-w-lg mx-auto mb-4 bg-white dark:bg-black border-b md:border border-gray-200 dark:border-zinc-800 md:rounded-xl overflow-hidden"
    >
      <PostHeader
        post={post}
        idx={idx}
        isBookmarked={isBookmarked}
        showOptions={showOptions}
        onBookmarkClick={handleBookmarkClick}
        onOptionsClick={onOptionsClick}
        onPostUpdated={onPostUpdated}
        onDelete={onDelete}
        showToast={showToast}
      />

      {/* Post Content */}

      {/* Post Media */}
      {post.images && post.images.length > 0 && (
        <div className="dark:bg-[#272727]">
          <PostMedia images={post?.images} />
        </div>
      )}

      {/* Action Buttons */}
      <PostActions
        isLike={isLike}
        likeCount={likeCount}
        commentCount={originalCommentCount}
        onLikeClick={handleLikeClick}
        onCommentClick={handleCommentClick}
        onShareClick={handleShareClick}
      />

      {/* Post Content (Caption) - Instagram Style */}
      <div className="px-3 pb-2 pt-1 dark:bg-black">
        <div className="flex flex-col gap-1">
          {/* Like Count Text if needed, usually inside Actions or here */}

          <div className="text-sm">
            <span className="font-bold text-gray-900 dark:text-white mr-2">
              {post?.userinfo?.display_name || "User"}
            </span>
            <span
              className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: sanitizeCaption(postCaption) }}
            />
          </div>
        </div>
      </div>

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
        onCommentLike={commentHandlers.onCommentLike}
        onCommentReply={commentHandlers.onCommentReply}
        onSendReply={commentHandlers.onSendReply}
        onCommentMenu={commentHandlers.onCommentMenu}
        replyMenuOpen={replyMenuOpen}
        onReplyMenu={commentHandlers.onReplyMenu}
        replyLikes={replyLikes}
        onToggleComments={() => setShowCommentsSection(!showCommentsSection)}
        onToggleShowAll={() => setShowAllComments(!showAllComments)}
        totalCommentCount={commentInfo.length}
        currentUserId={user?.id}
        loading={loadingComments}
      />

      {/* Comment Input */}
      {user && (
        <CommentInput
          value={com}
          onChange={handleComment}
          onSubmit={saveComment}
          placeholder={t("share_thoughts_placeholder")}
          isSubmitting={isSubmitting}
          error={error}
          inputRef={commentIconRef}
        />
      )}
    </motion.article>
  );
}
