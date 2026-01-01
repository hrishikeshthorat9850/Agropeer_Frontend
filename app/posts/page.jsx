"use client";
import { motion } from "framer-motion";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { FaUsers, FaPlus } from "react-icons/fa";
import { usePostsPaginated } from "@/hooks/usePostsPaginated";
import Posts from "@/components/Posts";
import ErrorBoundary from "@/components/ErrorBoundary";
import PostCreation from "@/components/PostCreate";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PostSkeleton } from "@/components/skeletons";
import { supabase } from "@/lib/supabaseClient";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

const ClientModalWrapper = dynamic(() => import("@/components/ui/post/ClientModalWrapper"), {
  loading: () => null,
});

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { posts, loading, error, pagination, refreshPosts } = usePostsPaginated({
    initialPage: 1,
    limit: 10,
  });

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

  // Fetch post detail when id query param is present
  useEffect(() => {
    const fetchPostDetail = async () => {
      if (!postId) {
        setSelectedPost(null);
        return;
      }

      setPostLoading(true);
      setPostError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("posts")
          .select(`
            id,
            user_id,
            caption,
            images,
            created_at,
            updated_at,
            userinfo(id, firstName, lastName, profile_url, avatar_url, display_name, email),
            post_comments(
              id,
              comment,
              created_at,
              user_id,
              post_id,
              userinfo(id, firstName, lastName, display_name, profile_url, avatar_url),
              comment_likes(id, user_id, comment_id)
            ),
            post_likes(id, user_id, post_id, created_at)
          `)
          .eq("id", postId)
          .single();

        if (fetchError) {
          console.error("Error fetching post:", fetchError);
          setPostError("Failed to load post");
          return;
        }

        if (!data) {
          setPostError("Post not found");
          return;
        }

        setSelectedPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setPostError("An error occurred while loading the post");
      } finally {
        setPostLoading(false);
      }
    };

    fetchPostDetail();
  }, [postId]);

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

  // 🟢 Deep link fix: Pre-compute if post exists in current page (fixes Android WebView syntax error)
  const postExistsInCurrentPage = postId && posts.length > 0 
    ? posts.some((post) => post.id === postId) 
    : false;
  const shouldShowSelectedPostAbove = selectedPost && posts.length > 0 && !postExistsInCurrentPage;
  const shouldShowSelectedPostWhenEmpty = selectedPost && posts.length === 0;

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

          {/* Loading State */}
          {loading && (
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
                    Post not found
                  </h3>
                  <p className="text-farm-600 dark:text-gray-300 mb-4">{postError}</p>
                  <button
                    onClick={() => router.push("/posts")}
                    className="px-6 py-3 bg-farm-500 text-white rounded-lg hover:bg-farm-600 transition-colors font-semibold active:scale-95"
                  >
                    View All Posts
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
              ) : shouldShowSelectedPostWhenEmpty ? (
                // If no posts in list but selectedPost exists, show it
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
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 mb-4"
                >
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    hasNextPage={pagination.hasNextPage}
                    hasPreviousPage={pagination.hasPreviousPage}
                    onPageChange={handlePageChange}
                  />
                </motion.div>
              )}
            </>
          )}
        </div>
      </MobilePageContainer>
    </ErrorBoundary>
  );
}
