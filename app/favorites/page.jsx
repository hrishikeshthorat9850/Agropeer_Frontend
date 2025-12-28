"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";
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
    const productIds = savedItems?.map((i) => i.product_id).filter(Boolean) || [];

    const [postsData, productsData] = await Promise.all([
      postIds.length
        ? supabase
            .from("posts")
            .select(`
              id,
              user_id,
              caption,
              images,
              created_at,
              updated_at,
              post_comments(id, comment, created_at, user_id, post_id),
              post_likes(id, user_id, post_id, created_at),
              userinfo(id, firstName, lastName, display_name, profile_url, avatar_url, email)
            `)
            .in("id", postIds)
        : { data: [] },
      productIds.length
        ? supabase
            .from("agri_products")
            .select(`
              id,
              user_id,
              title,
              description,
              price,
              category,
              photos,
              extra,
              location,
              date,
              created_at,
              updated_at
            `)
            .in("id", productIds)
        : { data: [] },
    ]);

    const combined = [
      ...(postsData.data || []).map((p) => ({ ...p, type: "post" })),
      ...(productsData.data || []).map((p) => ({ ...p, type: "product" })),
    ];

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

  const removeSavedProduct = async(prodID) =>{
    const {data,error} = await supabase
      .from("user_favorites")
      .delete()
      .eq("user_id",user?.id)
      .eq("product_id",prodID)
    if(!error) setFavorites((prev)=>prev.filter((f)=>f.id !== prodID));
  }
  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setDirection(tab === "cards" ? "right" : "left");
    setActiveTab(tab);
  };

  const posts = favorites.filter((f) => f.type === "post");
  const products = favorites.filter((f) => f.type === "product");

  // Direction-based slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
      position: "absolute",
    }),
  };

  return (
    <MobilePageContainer>
      <div className="w-full max-w-4xl mx-auto">
      {/* 🌿 Animated Navbar */}
      <div className="relative flex justify-center items-center mb-10 bg-white shadow-lg rounded-full px-2 py-1.5 sm:px-3 sm:py-2 w-full max-w-md dark:bg-[#272727]">
        <div className="flex relative w-full justify-between">
          <motion.div
            layout
            className="absolute top-0 bottom-0 rounded-full bg-green-600 shadow-md"
            initial={false}
            animate={{
              left: activeTab === "posts" ? 2 : "50%",
              width: "calc(50% - 4px)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />

          <button
            onClick={() => handleTabSwitch("posts")}
            className={`relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 w-1/2 py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
              activeTab === "posts"
                ? "text-white"
                : "text-green-700 hover:text-green-900"
            }`}
          >
            <FaRegBookmark className="text-lg sm:text-xl" />
            <span>Saved Posts</span>
          </button>

          <button
            onClick={() => handleTabSwitch("cards")}
            className={`relative z-10 flex items-center justify-center gap-1.5 sm:gap-2 w-1/2 py-2 sm:py-2.5 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 ${
              activeTab === "cards"
                ? "text-white"
                : "text-green-700 hover:text-green-900"
            }`}
          >
            <FaBox className="text-lg sm:text-xl" />
            <span>Saved Products</span>
          </button>
        </div>
      </div>

      {/* 💫 Animated Content */}
      <div className="relative w-full max-w-5xl min-h-[300px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            {loading ? (
              activeTab === "posts" ? (
                <PostSkeleton count={3} />
              ) : (
                <ProductSkeleton count={4} />
              )
            ) : activeTab === "posts" ? (
              <SavedPosts posts={posts} user={user} removeSaved={removeSaved} />
            ) : (
              <SavedProducts products={products} user={user} removeSaved={removeSavedProduct}/>
            )}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </MobilePageContainer>
  );
}
