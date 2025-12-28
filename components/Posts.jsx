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
import { apiRequest, validateComment, sanitizeComment } from "@/utils/apiHelpers";
import { Capacitor } from "@capacitor/core";



export default function PostCard({ post, comment, idx , refreshPosts }) {
  const { user,accessToken} = useLogin();
  const { showToast } = useToast();
  
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


  const copyToClipboard = useCallback(async (text) => {
    try {
      if (Capacitor.isNativePlatform()) {
        // Native clipboard for Capacitor Android
        const { Clipboard } = await import("@capacitor/clipboard");
        await Clipboard.write({ string: text });
        showToast("success", "Link copied");
        return;
      }

      // Browser clipboard
      await navigator.clipboard.writeText(text);
      showToast("success", "Link copied");

    } catch (err) {
      console.error("Clipboard error:", err);
      showToast("error", "Clipboard blocked. Try again.");
    }
  }, [showToast]);



  // Initialize post data - use stable references
  useEffect(() => {
    if (!user || !post) return;
    const liked = post?.post_likes?.some((like) => like.user_id === user.id);
    setIsLike(liked);
    setLikeCount(post?.post_likes?.length || 0);
    setcommentCount(post?.post_comments?.length || 0);
  }, [post?.id, user?.id, post?.post_likes?.length, post?.post_comments?.length]);

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
    if (!data || !Array.isArray(data)) return { mainComments: [], repliesByParent: {}, nestedRepliesMap: {} };

    // Separate main comments from replies
    const mainComments = data.filter(comment => !comment.parent_comment_id);
    const replies = data.filter(comment => comment.parent_comment_id);
    
    // Group replies by parent ID
    const repliesByParent = {};
    const nestedRepliesMap = {};
    
    replies.forEach(reply => {
      const isParentComment = mainComments.some(c => c.id === reply.parent_comment_id);
      
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
        .select(`
          id,
          comment,
          created_at,
          user_id,
          post_id,
          userinfo(id, firstName, lastName, display_name, profile_url, avatar_url),
          comment_likes(id, user_id, comment_id)
        `)
        .eq("post_id", post?.id)
        .order('created_at', { ascending: true })
        .limit(100); // Limit comments to reduce egress

      if (error) {
        console.error("Error fetching comments:", error);
        setError("Failed to load comments");
        return;
      }

      const { mainComments, repliesByParent, nestedRepliesMap } = processCommentsData(data || []);
      
      // Track which replies the user has liked
      if (user?.id && data) {
        const likedRepliesMap = {};
        const replies = data.filter(comment => comment.parent_comment_id);
        replies.forEach(reply => {
          const isLiked = reply.comment_likes?.some(like => like.user_id === user.id);
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
    const topLevelCommentsCount = commentInfo.filter(comment => comment.parent_comment_id === null).length;
    setOriginalCommentCount(topLevelCommentsCount);
  }, [commentInfo]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (replyMenuOpen) {
        setReplyMenuOpen(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
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
      
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/post-comment`, {
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          post_id: post.id,
          comment: sanitizedComment,
          user_id: user.id
        })
      });

      if (apiError) {
        setError(apiError.message || "Failed to save comment");
        showToast("error", apiError.message || "Failed to save comment");
        return;
      }

      // Optimistic update: add to local state immediately
      if (data?.data) {
        const newComment = Array.isArray(data.data) ? data.data[0] : data.data;
        if (newComment) {
          setcommentInfo(prev => [...prev, newComment]);
          setcommentCount(prev => prev + 1);
        }
      }

      setCom("");
      await refreshComments();
      // showToast("success", "Comment saved successfully");
    } catch (e) {
      setError("Network error occurred");
      showToast("error", "Network error. Please try again.");
      console.error("Error saving comment:", e);
    } finally {
      setIsSubmitting(false);
    }
  }, [com, isSubmitting, user?.id, post?.id, refreshComments]);

  const handleCommentClick = useCallback(() => {
    setShowCommentsSection((prev) => !prev);
    if (commentIconRef.current) {
      commentIconRef.current.focus();
    }
  }, []);

  // Like handlers with optimistic updates
  const handleLikeClick = useCallback(async () => {
    if (!user) {
      showToast("error", "Please login first");
      return;
    }

    if (loadingLike) return; // Prevent double clicks

    // Optimistic update
    const previousLike = isLike;
    const previousCount = likeCount;
    setIsLike(!isLike);
    setLikeCount(prev => previousLike ? Math.max(0, prev - 1) : prev + 1);
    setLoadingLike(true);

    try {
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/posts/${post.id}/like`, {
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${accessToken}`
        },
        body: JSON.stringify({ user_id: user.id })
      });

      if (apiError) {
        // Rollback on error
        setIsLike(previousLike);
        setLikeCount(previousCount);
        showToast("error", apiError.message || "Failed to update like");
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
      showToast("error", "An error occurred. Please try again.");
      console.error("Unexpected error:", err);
    } finally {
      setLoadingLike(false);
    }
  }, [user?.id, isLike, likeCount, post?.id, loadingLike]);

  const handleBookmarkClick = useCallback(async () => {
    if (!user) {
      showToast("warning", "You are not logged in...");
      return;
    }

    if (loadingBookmark) return; // Prevent double clicks

    const originalStatus = isBookmarked;
    setIsBookmarked(!isBookmarked);
    setLoadingBookmark(true);

    try {
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/posts/${post.id}/bookmark`, {
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${accessToken}`
        },
        body: JSON.stringify({ user_id: user.id })
      });

      if (apiError) {
        // Rollback on error
        setIsBookmarked(originalStatus);
        showToast("error", apiError.message || "Something went wrong");
        return;
      }

      if (data) {
        setIsBookmarked(data.bookmarked);
        showToast(
          data.bookmarked ? "success" : "info",
          data.bookmarked ? "Post saved in favorites" : "Post removed from bookmarks"
        );
      }
    } catch (err) {
      // Rollback on error
      setIsBookmarked(originalStatus);
      showToast("error", "An unexpected error occurred");
      console.error("Error while bookmarking:", err);
    } finally {
      setLoadingBookmark(false);
    }
  }, [user?.id, isBookmarked, post?.id, loadingBookmark]);

  const handleShareClick = useCallback(async () => {
    const postId = post?.id;
    const appLink = `agropeer://post/${postId}`;
    const webLink = `https://agrogram-wheat.vercel.app/post/${postId}`;
    const shareUrl = `${appLink}\n\nIf app doesn't open, try:\n${webLink}`;

    // 1️⃣ Native Share (Capacitor App)
    try {
      const { Share } = await import("@capacitor/share");
      await Share.share({
        title: "Farm Post",
        text: postCaption || post?.text,
        url: shareUrl
      });
      return; // STOP HERE if successful
    } catch (err) {
      console.log("Capacitor Share not available", err);
    }

    // 2️⃣ Web Share API (Chrome mobile / browsers that support it)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Farm Post",
          text: postCaption || post?.text,
          url: webLink
        });
        return;
      } catch (err) {
        console.log("Web share cancelled", err);
      }
    }

    // 3️⃣ LAST RESORT → copy link
    await copyToClipboard(webLink);
    showToast("info", "Link copied to clipboard");
  }, [postCaption, post?.text, post?.id]);



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
      
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/post-comment`, {
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          post_id: post.id,
          comment: sanitizedReply,
          user_id: user.id,
          parent_comment_id: replyingTo
        })
      });

      if (apiError) {
        showToast("error", apiError.message || "Failed to send reply");
        return;
      }

      // Refresh comments to get the new reply with all data
      await refreshComments();
      
      setReplyText("");
      setShowReplyBox(null);
      setReplyingTo(null);
      showToast("success", "Reply sent successfully");
    } catch (err) {
      console.error("Error sending reply:", err);
      showToast("error", "Failed to send reply. Please try again.");
    }
  }, [replyText, user?.id, replyingTo, post?.id, refreshComments]);

  const handleCommentLike = useCallback(async (commentId) => {
    if (!user) {
      showToast("error", "You must be logged in to like comments");
      return;
    }

    try {
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/comments/${commentId}/like`, {
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${accessToken}`
        },
        body: JSON.stringify({ user_id: user.id })
      });

      if (apiError) {
        showToast("error", apiError.message || "Failed to like comment");
        return;
      }

      // Refresh comments to get updated like counts
      await refreshComments();
    } catch (err) {
      console.error("Error toggling comment like:", err);
      showToast("error", "An error occurred. Please try again.");
    }
  }, [user?.id, refreshComments]);

  const handleCommentReply = useCallback((parentId) => {
    if (!user) {
      showToast("error", "You have to login to reply");
      return;
    }
    setShowReplyBox((prev) => prev === parentId ? null : parentId);
    setReplyingTo(parentId);
  }, [user?.id]);

  const handleReplyToReply = useCallback((replyId) => {
    if (!user) {
      showToast("error", "You have to login to reply");
      return;
    }
    setShowReplyBox((prev) => prev === replyId ? null : replyId);
    setReplyingTo(replyId);
  }, [user?.id]);

  const handleReplyLike = useCallback(async (replyId) => {
    if (!user) {
      showToast("error", "You must be logged in to like replies");
      return;
    }

    try {
      const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/comments/${replyId}/like`, {
        method: "POST",
        headers : {
          "Authorization" : `Bearer ${accessToken}`
        },
        body: JSON.stringify({ user_id: user.id })
      });

      if (apiError) {
        showToast("error", apiError.message || "Failed to like reply");
        return;
      }

      // Update local state optimistically
      setReplyLikes(prev => ({ ...prev, [replyId]: data?.liked || false }));
      
      // Refresh to get accurate counts
      await refreshComments();
    } catch (err) {
      console.error("Error toggling reply like:", err);
      showToast("error", "An error occurred. Please try again.");
    }
  }, [user?.id, refreshComments]);

  const handleCommentMenu = useCallback(() => {
    if (!user) return;
  }, [user?.id]);

  const handleReplyMenu = useCallback((replyId, event) => {
    event?.stopPropagation();
    setReplyMenuOpen((prev) => prev === replyId ? null : replyId);
  }, []);

  const onOptionsClick = useCallback(() => {
    setShowOptions(!showOptions);
  }, [showOptions]);

  const onDelete = useCallback(async () => {
    onOptionsClick();
    
    if (!confirm("Are you sure you want to delete this post?")) {
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
        showToast("error", "Failed to delete post");
      } else {
        showToast("success", "Post deleted successfully");
        // Optionally trigger a refresh in parent component
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
      }
    } catch (err) {
      console.error("Unexpected error deleting post:", err);
      showToast("error", "An error occurred while deleting the post");
    }
  }, [post?.id, user?.id, onOptionsClick]);

  const onPostUpdated = useCallback((newCaption) => {
    setPostCaption(newCaption);
  }, []);

  // Memoize handlers to prevent unnecessary re-renders
  const commentHandlers = useMemo(() => ({
    onCommentLike: handleCommentLike,
    onCommentReply: handleCommentReply,
    onSendReply: handleSendReply,
    onCommentMenu: handleCommentMenu,
    onReplyMenu: handleReplyMenu,
  }), [handleCommentLike, handleCommentReply, handleSendReply, handleCommentMenu, handleReplyMenu]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative group hover-lift w-full max-w-2xl mx-auto mb-6 overflow-hidden rounded-3xl shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #cbd5e1 100%)',
        border: typeof window !== "undefined" &&
          document.documentElement.classList.contains("dark")
            ? "none"
            : "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      }}
    >
      <PostBackground />

      <PostHeader
        post={post}
        idx={idx}
        isBookmarked={isBookmarked}
        showOptions={showOptions}
        onBookmarkClick={handleBookmarkClick}
        onOptionsClick={onOptionsClick}
        onPostUpdated={onPostUpdated}
        onDelete={onDelete}
      />

      {/* Post Content */}
      <div className="px-4 pb-3 dark:bg-[#272727]">
        <p className="text-farm-700 text-base leading-relaxed font-sans">
          {postCaption}
        </p>
      </div>

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
          placeholder="Share your thoughts..."
          isSubmitting={isSubmitting}
          error={error}
          inputRef={commentIconRef}
        />
      )}
    </motion.article>
  );
}
