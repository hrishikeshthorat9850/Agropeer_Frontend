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

  // Detail view
  if (postId) {
    if (postLoading) {
      return (
        <div className="min-h-[calc(100vh-122px)] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    if (postError || !selectedPost) {
      return (
        <div className="min-h-[calc(100vh-122px)] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-farm-800 mb-2">Post Not Found</h2>
            <p className="text-farm-600 mb-4">{postError || "The post you're looking for doesn't exist."}</p>
            <button
              onClick={() => router.push("/posts")}
              className="px-4 py-2 bg-farm-500 text-white rounded-lg hover:bg-farm-600 transition-colors"
            >
              Back to Posts
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[calc(100vh-122px)] pt-8 pb-12">
        <div className="w-full max-w-2xl mx-auto px-4">
          <Posts post={selectedPost} idx={0} />
          <Suspense fallback={null}>
            <ClientModalWrapper post={selectedPost} onUpdated={handlePostUpdated} />
          </Suspense>
        </div>
      </div>
    );
  }

  // List view
  return (
    <ErrorBoundary>
      <div className="min-h-[calc(100vh-122px)] pt-8 pb-12">
        <div className="w-full max-w-4xl mx-auto">
          <div className="px-4">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-farm-900 mb-2">
                    All Posts
                  </h1>
                  <p className="text-farm-600 text-lg">
                    Discover posts from farmers across the community
                  </p>
                </div>

                {/* Total Posts */}
                <div className="flex items-center gap-2 text-sm font-semibold text-farm-700 bg-farm-50 px-4 py-2 rounded-full">
                  <FaUsers className="w-4 h-4" />
                  <span>{pagination.total} posts</span>
                </div>
              </div>

              {/* Add / Close Button BELOW TOTAL POSTS */}
              <div className="mt-4 w-full">
                {!isCreating ? (
                  <button
                    onClick={() => setIsCreating(true)}
                    className="w-full md:w-auto bg-farm-700 text-white px-4 py-3 rounded-full shadow hover:bg-farm-800 transition flex items-center justify-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" /> Add Post
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCreating(false)}
                    className="w-full md:w-auto bg-red-600 text-white px-4 py-3 rounded-full shadow hover:bg-red-700 transition flex items-center justify-center gap-2"
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
                  className="mt-6 mb-10"
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
          </div>

          {/* Loading State */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <PostSkeleton count={5} />
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="farm-card p-8 text-center mb-8"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-farm-700 mb-2">
                Something went wrong
              </h3>
              <p className="text-farm-600 mb-4">{error}</p>
              <button onClick={refreshPosts} className="farm-button">
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
                  className="farm-card p-12 text-center"
                >
                  <div className="text-6xl mb-4">🌱</div>
                  <h3 className="text-xl font-semibold text-farm-700 mb-2">
                    No posts yet
                  </h3>
                  <p className="text-farm-600">
                    Be the first to share something amazing from your farm!
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6 mb-8">
                  {posts.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                      className="hover-lift"
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
                  className="mt-8"
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
      </div>
    </ErrorBoundary>
  );
}
