"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
import { useLanguage } from "@/Context/languagecontext";

const ClientModalWrapper = dynamic(
  () => import("@/components/ui/post/ClientModalWrapper"),
  {
    loading: () => null,
  },
);

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  // Trigger rebuild
  const { posts, loading, error, pagination, refreshPosts, hasMore, loadMore } =
    usePostsPaginated({
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
      .select(
        `
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
      `,
      )
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
        const cached = posts?.find((p) => p.id === postId);
        if (cached && isMounted) {
          setSelectedPost(cached);
        }

        // 2️⃣ Fetch via Secure RPC (Database Function)
        // This runs the complex join safely on the DB side with SECURITY DEFINER
        const { data: rpcData, error: rpcError } = await supabase.rpc(
          "get_post_details_safe",
          { p_id: postId },
        );

        if (rpcError) throw rpcError;

        if (!rpcData && !cached && isMounted) {
          setPostError(t("post_not_found_error"));
          return;
        }

        if (isMounted && rpcData) {
          // RPC returns JSON, compatible with our local state
          setSelectedPost(rpcData);
        }
      } catch (err) {
        console.error("Post fetch failed:", err);
        if (isMounted) setPostError(t("post_load_error"));
      } finally {
        if (isMounted) setPostLoading(false);
      }
    };

    loadPost();

    return () => {
      isMounted = false;
    };
  }, [postId, posts, t]);

  const handlePostUpdated = (updatedData) => {
    if (selectedPost) {
      setSelectedPost({
        ...selectedPost,
        caption: updatedData.caption || selectedPost.caption,
        images: updatedData.images || selectedPost.images,
      });
    }
  };

  // 🟢 Deep link fix: Check if post exists in current page, scroll if found
  useEffect(() => {
    if (!postId || posts.length === 0) return;

    // Check if postId exists in current posts array
    const postExistsInList = posts.some((post) => post.id === postId);

    if (postExistsInList) {
      // Post is in current page, scroll to it
      const target = document.getElementById(`post-${postId}`);
      if (target) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.style.outline = "3px solid #4ade80"; // highlight
          setTimeout(() => (target.style.outline = "none"), 2000);
        }, 100);
      }
    }
    // If post is NOT in list, selectedPost will be rendered above (handled in render)
  }, [postId, posts]);

  const postExistsInList = posts?.some((post) => post.id === postId);
  const shouldShowSelectedPostAbove = selectedPost && !postExistsInList;

  return (
    <ErrorBoundary>
      <MobilePageContainer scrollOnMount={false}>
        <div className="py-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="mb-4 px-4">
              <div className="flex items-center justify-between gap-4 mb-2">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-farm-900 dark:text-white">
                  {t("all_posts_title")}
                </h1>
                {/* Total Posts */}
                <div className="flex-shrink-0 flex items-center gap-2 text-xs md:text-sm font-semibold text-farm-700 dark:text-farm-300 bg-farm-50 dark:bg-farm-900/30 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                  <FaUsers className="w-3 h-3 md:w-4 md:h-4" />
                  <span>
                    {pagination.total} {t("posts_count_suffix")}
                  </span>
                </div>
              </div>
              <p className="text-farm-600 dark:text-gray-300 text-sm md:text-base">
                {t("posts_subtitle")}
              </p>
            </div>

            {/* Add / Close Button - Premium Mobile Style */}
            <div className="mt-4 w-full px-4 md:px-0">
              {!isCreating ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreating(true)}
                  className="w-full md:w-auto bg-gradient-to-r from-farm-600 to-farm-500 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-farm-500/20 hover:shadow-xl hover:from-farm-700 hover:to-farm-600 transition-all duration-300 flex items-center justify-center gap-2.5 font-bold tracking-wide"
                >
                  <FaPlus className="w-4 h-4" /> {t("add_post_btn")}
                </motion.button>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCreating(false)}
                  className="w-full md:w-auto bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 active:bg-red-100 dark:active:bg-red-900/40"
                >
                  {t("close_btn")}
                </motion.button>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
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
                {t("something_wrong")}
              </h3>
              <p className="text-farm-600 dark:text-gray-300 mb-4">{error}</p>
              <button
                onClick={refreshPosts}
                className="px-6 py-3 bg-farm-500 text-white rounded-lg hover:bg-farm-600 transition-colors font-semibold active:scale-95"
              >
                {t("try_again_btn")}
              </button>
            </motion.div>
          )}

          {/* 🟢 Deep link fix: Show selectedPost detail if not in current page */}
          {postId && !loading && !error && (
            <>
              {postLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-6"
                >
                  <PostSkeleton count={1} />
                </motion.div>
              ) : postError ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center mb-6 shadow-lg"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-farm-700 dark:text-white mb-2">
                    {t("post_not_found_error")}
                  </h3>
                  <p className="text-farm-600 dark:text-gray-300 mb-4">
                    {postError}
                  </p>
                  <button
                    onClick={() => router.push("/posts")}
                    className="px-6 py-3 bg-farm-500 text-white rounded-lg hover:bg-farm-600 transition-colors font-semibold active:scale-95"
                  >
                    {t("view_all_posts")}
                  </button>
                </motion.div>
              ) : shouldShowSelectedPostAbove ? (
                // Render selectedPost above list if it's not in current page (only if posts are loaded)
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <motion.div
                    id={`post-${selectedPost.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-farm-500 rounded-2xl p-2"
                  >
                    <Posts
                      post={selectedPost}
                      comment={selectedPost.post_comments || []}
                      idx={0}
                      refreshPosts={refreshPosts}
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </>
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
                    {t("no_posts_yet")}
                  </h3>
                  <p className="text-farm-600 dark:text-gray-300">
                    {t("no_posts_desc")}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4 mt-6">
                  {posts.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      id={`post-${post.id}`}
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
                  <div
                    ref={loadMoreRef}
                    className="h-16 flex justify-center items-center"
                  >
                    {isFetchingMore && hasMore && (
                      <div className="flex flex-col items-center gap-2">
                        <LoadingSpinner size="sm" color="green" text="" />
                        <span className="text-sm text-gray-500">
                          {t("loading_more_posts")}
                        </span>
                      </div>
                    )}
                    {!hasMore && posts.length > 0 && (
                      <p className="text-gray-500 text-sm">
                        {t("reached_end_posts")}
                      </p>
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
