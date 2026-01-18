"use client";
import { motion } from "framer-motion";
import {
  FaThumbsUp,
  FaComments,
  FaClock,
  FaCrown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { formatName } from "@/utils/formatName";
import { timeAgo } from "@/utils/timeConverter";
import { useLanguage } from "@/Context/languagecontext";

const FeaturedPosts = ({ posts, loading, error, refreshPosts }) => {
  const { t } = useLanguage();
  const [currentIndices, setCurrentIndices] = useState({});

  const setCurrentIndex = (postId, index) => {
    setCurrentIndices((prev) => ({ ...prev, [postId]: index }));
  };

  const getCurrentIndex = (postId) => currentIndices[postId] || 0;

  // Sort posts by likes and take top 2
  const featuredPosts =
    posts
      ?.sort(
        (a, b) => (b.post_likes?.length || 0) - (a.post_likes?.length || 0)
      )
      ?.slice(0, 2) || [];

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center justify-center text-center gap-3 mb-6">
          <div className="w-8 h-8 bg-farm-100 dark:bg-farm-900/30 rounded-lg flex items-center justify-center">
            <FaCrown className="w-5 h-5 text-farm-600 dark:text-farm-400" />
          </div>
          <h2 className="text-2xl font-display font-bold text-farm-800 dark:text-white">
            {t("most_liked_posts")}
          </h2>
          <span className="bg-gradient-to-r from-farm-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {t("top_2")}
          </span>{" "}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="farm-card p-6 animate-pulse bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#333]">
              <div className="h-4 bg-farm-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-3 bg-farm-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-farm-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mb-12"
      >
        <div className="farm-card p-6 text-center bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#333]">
          <p className="text-farm-600 dark:text-gray-400">{t("error_loading_featured")}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="mb-4"
    >
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="w-8 h-8 bg-farm-100 dark:bg-farm-900/30 rounded-lg flex items-center justify-center">
          <FaCrown className="w-5 h-5 text-farm-600 dark:text-farm-400" />
        </div>
        <h2 className="text-2xl font-display font-bold text-farm-800 dark:text-white">
          {t("most_liked_posts")}
        </h2>
        <span className="bg-gradient-to-r from-farm-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {t("top_2")}
        </span>
      </div>

      {featuredPosts?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredPosts.map((post, index) => (
            <motion.div
              key={post?.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              className="farm-card p-4 hover-lift bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-[#333]"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-farm-400 to-farm-600 rounded-full flex items-center justify-center">
                  <Avatar
                    src={
                      post?.userinfo?.profile_url ||
                      post?.userinfo?.avatar_url ||
                      undefined
                    }
                    alt={formatName(post?.userinfo)}
                    sx={{
                      width: 48,
                      height: 48,
                      border: "2px solid #bbf7d0", // replace with your Tailwind color
                      boxShadow: "0 4px 14px rgba(34, 197, 94, 0.15)",
                    }}
                  ></Avatar>
                </div>
                <div>
                  <h4 className="font-bold text-farm-900 dark:text-white text-lg">
                    {post?.userinfo?.display_name || formatName(post?.userinfo)}
                  </h4>
                  <div className="flex items-center gap-2 text-farm-700 dark:text-gray-400 text-sm font-medium">
                    <FaClock className="w-3 h-3" />
                    <span>{timeAgo(post.created_at)}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-farm-900 dark:text-gray-100 text-base leading-relaxed font-medium">
                  {post.caption || t("no_content_available")}
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  {post?.images?.length > 0 ? (
                    <div className="relative w-full h-[320px] md:h-[420px] bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden dark:bg-[#1E1E1E]">
                      {/* 🎯 MOBILE SWIPE CONTAINER */}
                      <motion.div
                        className="w-full h-full"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => {
                          const threshold = 80; // swipe sensitivity
                          if (info.offset.x < -threshold) {
                            // swipe left → next
                            setCurrentIndex(
                              post.id,
                              (getCurrentIndex(post.id) + 1) %
                              post?.images.length
                            );
                          } else if (info.offset.x > threshold) {
                            // swipe right → previous
                            setCurrentIndex(
                              post.id,
                              (getCurrentIndex(post.id) -
                                1 +
                                post?.images.length) %
                              post?.images.length
                            );
                          }
                        }}
                      >
                        {/* IMAGE / VIDEO */}
                        {post?.images[getCurrentIndex(post.id)].type ===
                          "video" ? (
                          <video
                            src={post?.images[getCurrentIndex(post.id)].url}
                            className="object-contain w-full h-full p-1 rounded-lg pointer-events-auto"
                            controls
                            controlsList="nodownload nofullscreen noremoteplayback"
                            disablePictureInPicture
                            disableRemotePlayback
                          />
                        ) : (
                          <Image
                            src={post?.images[getCurrentIndex(post.id)].url}
                            alt="Post Image"
                            className="object-contain w-full h-full p-1 rounded-lg pointer-events-none md:pointer-events-auto"
                            width={401}
                            height={500}
                          />
                        )}
                      </motion.div>

                      {/* DESKTOP ARROWS ONLY */}
                      <div className="hidden md:block">
                        {post?.images.length > 1 && (
                          <>
                            <button
                              onClick={() =>
                                setCurrentIndex(
                                  post.id,
                                  (getCurrentIndex(post.id) -
                                    1 +
                                    post?.images.length) %
                                  post?.images.length
                                )
                              }
                              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                            >
                              <FaChevronLeft />
                            </button>

                            <button
                              onClick={() =>
                                setCurrentIndex(
                                  post.id,
                                  (getCurrentIndex(post.id) + 1) %
                                  post?.images.length
                                )
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
                            >
                              <FaChevronRight />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Counter */}
                      <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {getCurrentIndex(post.id) + 1}/{post?.images.length}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-farm-700 dark:text-gray-300 text-sm font-semibold">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-full border border-red-100 dark:border-red-900/30">
                    <FaThumbsUp className="w-4 h-4 text-red-500" />
                    <span className="text-red-600 dark:text-red-400 font-bold">
                      {post.post_likes?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded-full border border-blue-100 dark:border-blue-900/30">
                    <FaComments className="w-4 h-4 text-blue-500" />
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      {post.post_comments?.length || 0}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                  <FaCrown className="w-4 h-4" />
                  <span className="font-bold">{t("featured_badge")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : null}
    </motion.div>
  );
};

export default FeaturedPosts;
