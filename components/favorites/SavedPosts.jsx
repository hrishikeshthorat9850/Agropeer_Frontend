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
            className="relative group hover-lift w-full max-w-2xl mx-auto mb-6 overflow-hidden rounded-3xl shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #f1f5f9 50%, #e2e8f0 75%, #cbd5e1 100%)',
              border: typeof window !== "undefined" &&
                document.documentElement.classList.contains("dark")
                ? "2px solid rgb(51 42 42)"
                : "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
            }}
          >
            <PostBackground />
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
            {item.caption && (
              <div className="px-4 pb-3 dark:bg-[#272727]">
                <p className="text-farm-700 text-base leading-relaxed font-sans">
                  {item.caption}
                </p>
              </div>
            )}
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
          </motion.article>
        ))}
      </div>
    </AnimatePresence>
  );
}
