"use client";
import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { FaUsers, FaPlus, FaArrowLeft } from "react-icons/fa";
import { useLogin } from "@/Context/logincontext";
import { usePostsPaginated } from "@/hooks/usePostsPaginated";
import Posts from "@/components/Posts";
import ErrorBoundary from "@/components/ErrorBoundary";
import PostCreation from "@/components/PostCreate";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PostSkeleton } from "@/components/skeletons";
import { supabase } from "@/lib/supabaseClient";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ClientModalWrapper = dynamic(() => import("@/components/ui/post/ClientModalWrapper"), {
  loading: () => null,
});

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { posts, loading, error, pagination, refreshPosts, hasMore, loadMore } = usePostsPaginated({
    initialPage: 1,
    limit: 10,
  });

  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: !!hasMore,
  });

  // Track if we are fetching subsequent pages
  const isFetchingMore = loading && posts.length > 0;

  const [isCreating, setIsCreating] = useState(false);

  // Detail view state
  const postId = searchParams.get("id");

  const [selectedPost, setSelectedPost] = useState(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState(null);

  const handlePageChange = (page) => {
    pagination.goToPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fetchPostById = async (postId) => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        user_id,
        caption,
        images,
        created_at,
        updated_at,
        userinfo(id, firstName, lastName, profile_url, avatar_url, display_name),
        post_comments(
          id,
          comment,
          created_at,
          user_id,
          userinfo(id, display_name, avatar_url),
          comment_likes(id, user_id)
        ),
        post_likes(id, user_id)
      `)
      .eq("id", postId.trim())
      .limit(1);

    if (error) throw error;
    return data?.[0] || null;
  };

  // Fetch post detail when id query param is present
  const { user, loading: authLoading } = useLogin();

  useEffect(() => {
    if (!postId) return;

    let isMounted = true;

    const loadPost = async () => {
      setPostLoading(true);
      setPostError(null);

      try {
        // 1️⃣ Try cache first (from feed)
        const cached = posts?.find(p => p.id === postId);
        if (cached && isMounted) {
          setSelectedPost(cached);
        }

        // 2️⃣ Fetch via Secure RPC (Database Function)
        // This runs the complex join safely on the DB side with SECURITY DEFINER
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_post_details_safe', { p_id: postId });

        if (rpcError) throw rpcError;

        if (!rpcData && !cached && isMounted) {
          setPostError("Post not found");
          return;
        }

        if (isMounted && rpcData) {
          // RPC returns JSON, compatible with our local state
          setSelectedPost(rpcData);
        }
      } catch (err) {
        console.error("Post fetch failed:", err);
        if (isMounted) setPostError("Failed to load post");
      } finally {
        if (isMounted) setPostLoading(false);
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [postId, posts]);


  const handlePostUpdated = (updatedData) => {
    if (selectedPost) {
      setSelectedPost({
        ...selectedPost,
        caption: updatedData.caption || selectedPost.caption,
        images: updatedData.images || selectedPost.images,
      });
    }
  };

  // Detail view
  if (postId) {
    if (postLoading) {
      return (
        <MobilePageContainer>
          <div className="min-h-screen flex items-center justify-center py-20">
            <LoadingSpinner />
          </div>
        </MobilePageContainer>
      );
    }

    if (postError || !selectedPost) {
      return (
        <MobilePageContainer>
          <div className="min-h-screen flex items-center justify-center py-20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-farm-800 dark:text-white mb-2">Post Not Found</h2>
              <p className="text-farm-600 dark:text-gray-300 mb-4">{postError || "The post you're looking for doesn't exist."}</p>
              <button
                onClick={() => router.push("/posts")}
                className="px-6 py-3 bg-farm-500 text-white rounded-lg hover:bg-farm-600 transition-colors font-semibold"
              >
                Back to Posts
              </button>
            </div>
          </div>
        </MobilePageContainer>
      );
    }

    return (
      <MobilePageContainer>
        <div className="py-4">
          <div className="w-full max-w-2xl mx-auto">
            <button
              onClick={() => router.push("/posts")}
              className="mb-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm text-farm-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium"
            >
              <FaArrowLeft className="w-4 h-4" />
              View All Posts
            </button>
            <Posts post={selectedPost} idx={0} refreshPosts={refreshPosts} />
            <Suspense fallback={null}>
              <ClientModalWrapper post={selectedPost} onUpdated={handlePostUpdated} />
            </Suspense>
          </div>
        </div>
      </MobilePageContainer>
    );
  }

  // List view
  return (
    <ErrorBoundary>
      <MobilePageContainer>
        <div className="py-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-farm-900 dark:text-white mb-2">
                  All Posts
                </h1>
                <p className="text-farm-600 dark:text-gray-300 text-base">
                  Discover posts from farmers across the community
                </p>
              </div>

              {/* Total Posts */}
              <div className="flex items-center gap-2 text-sm font-semibold text-farm-700 dark:text-farm-300 bg-farm-50 dark:bg-farm-900/30 px-4 py-2 rounded-full">
                <FaUsers className="w-4 h-4" />
                <span>{pagination.total} posts</span>
              </div>
            </div>

            {/* Add / Close Button */}
            <div className="mt-4 w-full">
              {!isCreating ? (
                <button
                  onClick={() => setIsCreating(true)}
                  className="w-full md:w-auto bg-farm-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-farm-800 transition flex items-center justify-center gap-2 font-semibold active:scale-95"
                >
                  <FaPlus className="w-4 h-4" /> Add Post
                </button>
              ) : (
                <button
                  onClick={() => setIsCreating(false)}
                  className="w-full md:w-auto bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition flex items-center justify-center gap-2 font-semibold active:scale-95"
                >
                  Close
                </button>
              )}
            </div>

            {/* Post Creation Form */}
            {isCreating && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 mb-6"
              >
                <PostCreation
                  onSuccess={() => {
                    setIsCreating(false);
                    refreshPosts();
                  }}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Loading State - Initial Load Only */}
          {loading && posts.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
              <PostSkeleton count={5} />
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center mb-6 shadow-lg"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-farm-700 dark:text-white mb-2">
                Something went wrong
              </h3>
              <p className="text-farm-600 dark:text-gray-300 mb-4">{error}</p>
              <button
                onClick={refreshPosts}
                className="px-6 py-3 bg-farm-500 text-white rounded-lg hover:bg-farm-600 transition-colors font-semibold active:scale-95"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {/* Posts List */}
          {!loading && !error && (
            <>
              {posts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-12 text-center shadow-lg"
                >
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-xl font-semibold text-farm-700 dark:text-white mb-2">
                    No posts yet
                  </h3>
                  <p className="text-farm-600 dark:text-gray-300">
                    Be the first to share something amazing from your farm!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4 mt-6">
                  {posts.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                    >
                      <Posts
                        post={post}
                        comment={post.post_comments || []}
                        idx={idx}
                      />
                    </motion.div>
                  ))}

                  {/* Infinite Scroll Sentinel */}
                  <div ref={loadMoreRef} className="h-20 flex justify-center items-center">
                    {isFetchingMore && hasMore && (
                      <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-farm-600"></div>
                        <span className="text-sm text-gray-500">Loading more...</span>
                      </div>
                    )}
                    {!hasMore && posts.length > 0 && (
                      <p className="text-gray-500 text-sm">You've reached the end!</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </MobilePageContainer>
    </ErrorBoundary>
  );
}
