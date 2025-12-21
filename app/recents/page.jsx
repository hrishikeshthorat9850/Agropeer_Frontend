"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/Context/logincontext";
import PostCreation from "@/components/PostCreate";
import Posts from "@/components/Posts";
import { PostSkeleton } from "@/components/skeletons";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";
import useToast from "@/hooks/useToast";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function RecentsPage() {
  const { user } = useLogin();
  const { showToast } = useToast();
  const [allpost, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // 🔥 Fetch CURRENT USER posts
  useEffect(() => {
    if (!user?.id) return;

    const fetchUserPosts = async () => {
      try {
        const params = new URLSearchParams({
          userId: user.id,
          limit: "20",
          orderBy: "created_at",
          order: "desc",
        });

        const response = await fetch(`${BASE_URL}/api/posts?${params.toString()}`);
        const result = await response.json();

        if (response.ok && result.data) {
          setAllPosts(
            result.data.map((post) => ({
              ...post,
              userinfo: post.userinfo || {},
              post_comments: post.post_comments || [],
              post_likes: post.post_likes || [],
            }))
          );
        } else {
          setAllPosts([]);
        }
      } catch (e) {
        console.error(e);
        setError("Failed to load posts");
        showToast("error", "Failed to load recent posts");
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, [user?.id]);

  return (
    <MobilePageContainer>
      <div className="py-4">
        <div className="w-full max-w-2xl mx-auto mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-farm-900 dark:text-white">
            Recent Activity
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            See all your latest posts and updates in one place.
          </p>
        </div>
 
        <main className="flex flex-col justify-center w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">

          {/* Post Create */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="w-full mb-6"
            >
              <PostCreation onPosted={(newPost) => setAllPosts((prev) => [newPost, ...prev])} />
            </motion.div>
          )}

          {/* Loading */}
          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
              <PostSkeleton count={3} />
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center text-red-600 py-4">{error}</div>
          )}

          {/* Recent Posts */}
          {!loading && !error && (
            <div className="w-full max-w-2xl space-y-6 md:p-4">
              <div className="flex items-center justify-between mb-4 p-4">
                <h2 className="text-2xl font-display font-bold text-farm-900">
                  Your Recent Posts
                </h2>

                <div className="flex items-center gap-2 text-sm font-semibold text-farm-700">
                  <FaUsers className="w-4 h-4" />
                  <span>{allpost.length} posts</span>
                </div>
              </div>

              {/* No posts */}
              {allpost.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No posts yet. Create your first post!
                </div>
              )}

              {/* Render Posts */}
              {allpost.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hover-lift"
                >
                  <Posts post={post} comment={post.post_comments} idx={idx} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      </div>
    </MobilePageContainer>
  );
}
