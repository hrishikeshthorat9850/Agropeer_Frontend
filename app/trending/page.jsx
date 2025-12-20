"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { PostSkeleton } from "@/components/skeletons";
import { usePosts } from "@/hooks/usePosts";

const FeaturedPosts = dynamic(
  () => import("@/components/home/FeaturedPosts"),
  { loading: () => <PostSkeleton count={3} /> }
);

export default function TrendingPage() {
  const { posts, loading, error, refreshPosts } = usePosts();

  return (
    <div className="min-h-[calc(100vh-122px)] w-full max-w-2xl mx-auto p-4">
      <Suspense fallback={<PostSkeleton count={3} />}>
        <FeaturedPosts
          posts={posts || []}
          loading={loading}
          error={error}
          refreshPosts={refreshPosts}
        />
      </Suspense>
    </div>
  );
}
