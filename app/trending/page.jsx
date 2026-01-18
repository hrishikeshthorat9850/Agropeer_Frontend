"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { PostSkeleton } from "@/components/skeletons";
import { usePosts } from "@/hooks/usePosts";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

const FeaturedPosts = dynamic(
  () => import("@/components/home/FeaturedPosts"),
  { loading: () => <PostSkeleton count={3} /> }
);

export default function TrendingPage() {
  const { posts, loading, error, refreshPosts } = usePosts();

  return (
    <MobilePageContainer>
      <div className="pt-4">
        <div className="w-full max-w-2xl mx-auto">
          <Suspense fallback={<PostSkeleton count={3} />}>
            <FeaturedPosts
              posts={posts || []}
              loading={loading}
              error={error}
              refreshPosts={refreshPosts}
            />
          </Suspense>
        </div>
      </div>
    </MobilePageContainer>
  );
}
