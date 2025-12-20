"use client";
import { memo } from "react";
import Posts from "@/components/Posts";

/**
 * Optimized Post Card with React.memo
 * Prevents unnecessary re-renders when parent updates
 */
const OptimizedPostCard = memo(function OptimizedPostCard({ post, comment, idx }) {
  return <Posts post={post} comment={comment} idx={idx} />;
}, (prevProps, nextProps) => {
  // Custom comparison function
  // Only re-render if post data actually changed
  return (
    prevProps.post?.id === nextProps.post?.id &&
    prevProps.post?.updated_at === nextProps.post?.updated_at &&
    prevProps.comment?.length === nextProps.comment?.length
  );
});

OptimizedPostCard.displayName = "OptimizedPostCard";

export default OptimizedPostCard;

