"use client";
import { motion, AnimatePresence } from "framer-motion";
import { PostHeader, PostMedia, PostActions, PostBackground } from "@/components/ui/post";
import { useLanguage } from "@/Context/languagecontext";

export default function SavedPosts({ posts, user, removeSaved }) {
  const { t } = useLanguage();

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20 bg-green-50 text-center rounded-xl shadow-inner dark:bg-[#272727]">
        <p className="text-green-700 font-medium text-lg">{t("no_saved_posts")}</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div className="space-y-10">
        {posts.map((item, idx) => (
          <motion.article
            key={`post-${item.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg mx-auto mb-4 bg-white dark:bg-black border-b md:border border-gray-200 dark:border-zinc-800 md:rounded-xl overflow-hidden"
          >
            <PostHeader
              post={item}
              idx={idx}
              isBookmarked={true}
              showOptions={false}
              onBookmarkClick={() => removeSaved(item.id)}
              onOptionsClick={() => { }}
              onPostUpdated={() => { }}
              onDelete={() => { }}
            />
            {item.images && item.images.length > 0 && (
              <div className="dark:bg-[#272727]">
                <PostMedia images={item.images} />
              </div>
            )}
            <PostActions
              isLike={
                item.post_likes?.some((like) => like.user_id === user?.id) ||
                false
              }
              likeCount={item.post_likes?.length || 0}
              commentCount={item.post_comments?.length || 0}
              onLikeClick={() => { }}
              onCommentClick={() => { }}
              onShareClick={() => { }}
            />
            {item.caption && (
              <div className="px-3 pb-2 pt-1 dark:bg-black">
                <div className="text-sm">
                  <span className="font-bold text-gray-900 dark:text-white mr-2">
                    {item.userinfo?.display_name || "User"}
                  </span>
                  <span className="text-gray-800 dark:text-gray-200">
                    {item.caption}
                  </span>
                </div>
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </AnimatePresence>
  );
}
