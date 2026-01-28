"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";
import { useLanguage } from "@/Context/languagecontext";
import useToast from "@/hooks/useToast";
import { FaRegBookmark, FaBox } from "react-icons/fa";
import SavedPosts from "@/components/favorites/SavedPosts";
import SavedProducts from "@/components/favorites/SavedProducts";
import { PostSkeleton, ProductSkeleton } from "@/components/skeletons";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function FavoritesPage() {
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [direction, setDirection] = useState("right");
  const { user } = useLogin();
  const { showToast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    if (user?.id) fetchFavorites();
  }, [user?.id]);

  const fetchFavorites = async () => {
    setLoading(true);
    // Optimized: select only needed fields
    const { data: savedItems, error } = await supabase
      .from("user_favorites")
      .select("id, post_id, product_id, created_at")
      .eq("user_id", user.id);
    if (error) {
      showToast("error", error.message);
      return;
    }

    const postIds = savedItems?.map((i) => i.post_id).filter(Boolean) || [];
    const productIds =
      savedItems?.map((i) => i.product_id).filter(Boolean) || [];

    const [postsData, productsData] = await Promise.all([
      postIds.length
        ? supabase
            .from("posts")
            .select(
              `
            id,
            user_id,
            caption,
            images,
            created_at,
            post_comments!post_id(id, comment, created_at, user_id, post_id),
            post_likes!post_id(id, user_id, post_id, created_at),
            userinfo!user_id(id, firstName, lastName, display_name, profile_url, avatar_url, email)
          `,
            )
            .in("id", postIds)
        : { data: [] },
      productIds.length
        ? supabase
            .from("agri_products")
            .select(
              `
              id,
              user_id,
              title,
              description,
              price,
              category,
              photos,
              location,
              date
            `,
            )
            .in("id", productIds)
        : { data: [] },
    ]);
    console.log("postsData are :", postsData);
    console.log("Products data are :", productsData);
    const combined = [
      ...(postsData.data || []).map((p) => ({ ...p, type: "post" })),
      ...(productsData.data || []).map((p) => ({ ...p, type: "product" })),
    ];
    console.log("Combined are :", combined);
    setFavorites(combined);
    setLoading(false);
  };

  const removeSaved = async (postId) => {
    const { error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("user_id", user?.id)
      .eq("post_id", postId);

    if (!error) setFavorites((prev) => prev.filter((f) => f.id !== postId));
  };

  const removeSavedProduct = async (prodID) => {
    const { data, error } = await supabase
      .from("user_favorites")
      .delete()
      .eq("user_id", user?.id)
      .eq("product_id", prodID);
    if (!error) setFavorites((prev) => prev.filter((f) => f.id !== prodID));
  };
  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setDirection(tab === "cards" ? "right" : "left");
    setActiveTab(tab);
  };

  const posts = favorites.filter((f) => f.type === "post");
  const products = favorites.filter((f) => f.type === "product");

  // Direction-based slide animation with "Fast Snap" feel
  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction === "right" ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      position: "absolute",
    }),
  };

  return (
    <MobilePageContainer>
      <div className="w-full pb-6 dark:bg-black">
        {/* 🌿 Modern Header */}
        <header className="sticky top-0 z-30 pt-4 pb-2 px-4 bg-surface-50/80 dark:bg-black/80 backdrop-blur-md border-b border-transparent transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t("Favorites") || "Saved Collection"}
            </h1>
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
              <FaRegBookmark className="text-green-600 dark:text-green-400 text-lg" />
            </div>
          </div>

          {/* 🌿 Floating Tab Switcher (Segmented Control) */}
          <div className="relative flex p-1 bg-gray-200/50 dark:bg-white/5 rounded-2xl">
            <motion.div
              layout
              className="absolute top-1 bottom-1 rounded-xl bg-white dark:bg-zinc-800 shadow-sm border border-black/5 dark:border-white/5"
              initial={false}
              animate={{
                left: activeTab === "posts" ? 4 : "50%",
                width: "calc(50% - 4px)",
                x: activeTab === "posts" ? 0 : 0,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />

            <button
              onClick={() => handleTabSwitch("posts")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${
                activeTab === "posts"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <FaRegBookmark className="text-base" />
              <span>{t("saved_posts")}</span>
            </button>

            <button
              onClick={() => handleTabSwitch("cards")}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${
                activeTab === "cards"
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              <FaBox className="text-lg" />
              <span>{t("saved_products")}</span>
            </button>
          </div>
        </header>

        {/* 💫 Animated Content Area */}
        <div className="px-4 mt-4 w-full max-w-5xl mx-auto min-h-[500px] overflow-hidden relative">
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
              className="w-full"
            >
              {loading ? (
                activeTab === "posts" ? (
                  <PostSkeleton count={3} />
                ) : (
                  <ProductSkeleton count={4} />
                )
              ) : activeTab === "posts" ? (
                <div className="pb-10">
                  <SavedPosts
                    posts={posts}
                    user={user}
                    removeSaved={removeSaved}
                  />
                </div>
              ) : (
                <div className="pb-10">
                  <SavedProducts
                    products={products}
                    user={user}
                    removeSaved={removeSavedProduct}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MobilePageContainer>
  );
}
