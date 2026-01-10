"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/ui/market/ProductCard";
import { ProductSkeleton } from "@/components/skeletons";
import { apiRequest } from "@/utils/apiHelpers";
import { useLogin } from "@/Context/logincontext";
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from "@/Context/languagecontext";

/**
 * RelatedProducts Component
 * Displays products from the same category, excluding the current product
 *
 * @param {string} category - Product category to filter by
 * @param {string|number} currentProductId - ID of the current product to exclude
 * @param {number} limit - Maximum number of related products to show (default: 6)
 */
export default function RelatedProducts({
  category,
  currentProductId,
  limit = 6,
}) {
  const router = useRouter();
  const { user } = useLogin();
  const { t } = useLanguage();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Fetch products from same category using existing API route
        const params = new URLSearchParams({
          category: category,
          limit: (limit + 2).toString(), // Fetch a few extra to account for filtering
          orderBy: "date",
          order: "desc",
        });

        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/products?${params.toString()}`
        );

        if (apiError) {
          console.error("Error fetching related products:", apiError);
          setError("failed_load_related");
          return;
        }

        // Filter out current product and limit results
        const filtered = (data?.data || [])
          .filter((product) => product.id !== currentProductId)
          .slice(0, limit);

        setRelatedProducts(filtered);
      } catch (err) {
        console.error("Error in fetchRelatedProducts:", err);
        setError("error_loading_related");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, currentProductId, limit]);

  // Fetch user favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?.id) {
        setFavorites([]);
        return;
      }

      try {
        const { data, error: favError } = await supabase
          .from("saved")
          .select("product_id")
          .eq("user_id", user.id);

        if (favError) {
          console.error("Error fetching favorites:", favError);
          return;
        }

        const favs = (data || [])
          .map((row) => row.product_id)
          .filter((id) => id !== null);

        setFavorites(favs);
      } catch (err) {
        console.error("Error in fetchFavorites:", err);
      }
    };

    fetchFavorites();
  }, [user?.id]);

  // Handle favorite toggle
  const toggleFavorite = async (product) => {
    if (!user?.id) {
      // Could show a toast here if needed
      return;
    }

    const isFav = favorites.includes(product.id);

    try {
      if (isFav) {
        await supabase
          .from("user_favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", product.id);
        setFavorites((prev) => prev.filter((id) => id !== product.id));
      } else {
        await supabase.from("user_favorites").insert({
          user_id: user.id,
          product_id: product.id,
        });
        setFavorites((prev) => [...prev, product.id]);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  // Handle chat click
  const handleChatClick = async (product) => {
    if (!user?.id) {
      return;
    }
    if (product.user_id === user.id) {
      return;
    }
    // Navigate to product detail page - chat modal will be handled there
    router.push(`/market?id=${product.id}`);
  };

  // Don't render if no category
  if (!category) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="w-full mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {t("related_products")}
        </h2>
        <ProductSkeleton count={Math.min(limit, 4)} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {t("related_products")}
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600">{t(error)}</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (relatedProducts.length === 0) {
    return (
      <div className="w-full mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          {t("related_products")}
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-600">{t("no_related_products")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-12">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center"
      >
        {t("related_products")}
      </motion.h2>

      {/* Products Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {relatedProducts.map((product) => {
          const isFav = favorites.includes(product.id);

          return (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={isFav}
              menuOpen={menuOpen === product.id}
              currentUserId={user?.id}
              showChatButton={true}
              onFavoriteClick={toggleFavorite}
              onMenuClick={(productId) =>
                setMenuOpen(menuOpen === productId ? null : productId)
              }
              onChatClick={handleChatClick}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
