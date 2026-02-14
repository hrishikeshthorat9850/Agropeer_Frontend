//market page
"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient"; // Still needed for favorites and other operations
import { FaPlus, FaTimes } from "react-icons/fa";
import {
  ProductCard,
  ProductSearch,
  ProductImageSlider,
  ProductHeader,
  ProductActions,
  ProductDetailsSection,
  ProductButtons,
} from "@/components/ui/market";
import useToast from "@/hooks/useToast";
import CategorySelector from "@/components/ui/market/CategorySelector";
import ProductFilters from "@/components/ui/market/ProductFilters";
import { ads } from "@/lib/ads";
import { useLogin } from "@/Context/logincontext";
import { useLanguage } from "@/Context/languagecontext";
import { ProductSkeleton } from "@/components/skeletons";
import LoadingSpinner from "@/components/LoadingSpinner";
import PlantLoader from "@/components/PlantLoader";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { apiRequest } from "@/utils/apiHelpers";
// Lazy load heavy components that are only shown on user interaction or below the fold
const SellForm = dynamic(() => import("@/components/SellForm"), {
  loading: () => <LoadingSpinner />,
});

// const AdPost = dynamic(() => import("@/components/AdPost"), {
//   loading: () => (
//     <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />
//   ),
// });

// const AdBanner = dynamic(() => import("@/components/AdBanner"), {
//   loading: () => (
//     <div className="w-full h-32 bg-gray-100 animate-pulse rounded-xl mb-6" />
//   ),
// });

const ChatModal = dynamic(() => import("@/components/ChatModal"), {
  ssr: false, // Browser-only component with socket connections
  loading: () => null, // Modal handles its own loading state
});

const RelatedProducts = dynamic(
  () => import("@/components/ui/market/RelatedProducts"),
  {
    loading: () => (
      <div className="w-full mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-80 bg-gray-100 animate-pulse rounded-3xl"
            />
          ))}
        </div>
      </div>
    ),
  },
);

export default function AgriMarket() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userinfo, loading, error, accessToken } = useLogin();
  const { t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all fetched products
  const [productsLoading, setProductsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { showToast } = useToast();
  const [clientLoaded, setClientLoaded] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Detail view state
  const productId = searchParams.get("id");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);
  const [productFavorite, setProductFavorite] = useState(false);
  const [productDetailChatModal, setProductDetailChatModal] = useState({
    isOpen: false,
    product: null,
    sellerId: null,
    sellerInfo: null,
  });

  const [chatModal, setChatModal] = useState({
    isOpen: false,
    product: null,
    sellerId: null,
    sellerInfo: null,
  });

  // Filter state - NEW (initialize from URL params if present)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get("category") || null;
  });
  const [filters, setFilters] = useState(() => ({
    priceMin: searchParams.get("priceMin")
      ? parseFloat(searchParams.get("priceMin"))
      : null,
    priceMax: searchParams.get("priceMax")
      ? parseFloat(searchParams.get("priceMax"))
      : null,
    district: searchParams.get("district") || null,
  }));

  // Infinite Scroll State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 50;

  useEffect(() => {
    setClientLoaded(true);
    // Initial fetch handled by effect on page/category
  }, []);

  // Reset when category changes
  useEffect(() => {
    setPage(1);
    setAllProducts([]);
    setHasMore(true);
    // We don't call fetch here, page change to 1 will trigger it if we dep on page
    // BUT initial render page is 1 wait.
  }, [selectedCategory]);

  // Fetch product on page change or category change
  // Note: changing category sets page to 1.
  // We need to trigger fetch when page changes.
  useEffect(() => {
    fetchProducts(page);
  }, [page, selectedCategory]); // Dependency on selectedCategory ensures we fetch if category changes but page stays 1 (e.g. was 1, set 1)
  // Actually if we set page 1->1 it won't trigger.
  // Let's rely on explicit call in the category effect?
  // Or just accept that if page is 1, and category changes, we fetch.

  // Revised approach:
  // 1. useEffect on [page].
  // 2. useEffect on [selectedCategory] -> setPage(1), setAllProducts([]).
  // If we setPage(1) and it was already 1, effect [page] won't fire?
  // So we should include selectedCategory in the fetch effect.

  // Apply client-side filters when filters or allProducts change
  useEffect(() => {
    applyFilters();
  }, [filters, allProducts]);

  useEffect(() => {
    // Loading should stop ONLY when API response arrives
    if (allProducts.length > 0) {
      setProductsLoading(false);
    }
  }, [allProducts]);

  useEffect(() => {
    console.log("User in market page is :", user?.id);
    if (!loading && user?.id) fetchFavorites();
  }, [user?.id]);

  // Fetch product detail when id query param is present
  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productId) {
        setSelectedProduct(null);
        return;
      }

      setProductLoading(true);
      try {
        const { data, error } = await supabase
          .from("agri_products")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) throw error;

        // Fetch seller info
        let userInfo = null;
        if (data.user_id) {
          const { data: userData } = await supabase
            .from("userinfo")
            .select("*")
            .eq("id", data.user_id)
            .single();
          userInfo = userData;
        }

        setSelectedProduct({ ...data, userinfo: userInfo });

        // Check if product is in favorites
        if (user?.id) {
          const { data: favData } = await supabase
            .from("saved")
            .select("id")
            .eq("user_id", user.id)
            .eq("product_id", data.id)
            .single();
          setProductFavorite(!!favData);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setSelectedProduct(null);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId, user?.id]);

  const fetchProducts = async (pageNum = 1, forceReset = false) => {
    setProductsLoading(true);
    try {
      // Build API URL with category filter (if selected)
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: LIMIT.toString(),
        orderBy: "date",
        order: "desc",
      });

      if (selectedCategory) {
        params.append("category", selectedCategory);
      }

      const response = await fetch(
        `${BASE_URL}/api/products?${params.toString()}`,
      );
      const result = await response.json();

      if (response.ok && result.data) {
        // Ensure photos array exists
        const productsWithPhotos = result.data.map((product) => ({
          ...product,
          photos: Array.isArray(product.photos) ? product.photos : [],
        }));

        setAllProducts((prev) => {
          if (pageNum === 1 || forceReset) {
            return productsWithPhotos;
          }
          // Avoid duplicates by ID if possible
          const existingIds = new Set(prev.map((p) => p.id));
          const newUnique = productsWithPhotos.filter(
            (p) => !existingIds.has(p.id),
          );
          return [...prev, ...newUnique];
        });

        // Update hasMore
        if (productsWithPhotos.length < LIMIT) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      } else {
        console.error("Failed to fetch products:", result);
        if (pageNum === 1) {
          setAllProducts([]);
          setProducts([]);
        }
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      if (pageNum === 1) {
        setAllProducts([]);
        setProducts([]);
      }
    } finally {
      setProductsLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!productsLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [productsLoading, hasMore]);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: !!hasMore,
  });

  // Apply client-side filters (price, location) - NEW
  const applyFilters = () => {
    let filtered = [...allProducts];

    // Price filter
    if (filters.priceMin !== null) {
      filtered = filtered.filter((p) => {
        const price = parseFloat(p.price) || 0;
        return price >= filters.priceMin;
      });
    }
    if (filters.priceMax !== null) {
      filtered = filtered.filter((p) => {
        const price = parseFloat(p.price) || 0;
        return price <= filters.priceMax;
      });
    }

    // District filter
    if (filters.district) {
      filtered = filtered.filter((p) => {
        return (
          p.location?.district?.toLowerCase() === filters.district.toLowerCase()
        );
      });
    }

    setProducts(filtered);
  };

  // Get unique districts from products for filter dropdown
  const availableDistricts = Array.from(
    new Set(
      allProducts
        .map((p) => p.location?.district)
        .filter(Boolean)
        .sort(),
    ),
  );

  const fetchFavorites = async () => {
    if (!user?.id) return;

    try {
      const { data, error } = await supabase
        .from("user_favorites")
        .select("product_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching favorites:", error);
        return;
      }

      // Filter nulls and extract product IDs
      const favs = (data || [])
        .map((row) => row.product_id)
        .filter((id) => id !== null);

      setFavorites(favs);
    } catch (err) {
      console.error("Error in fetchFavorites:", err);
    }
  };

  const toggleFavorite = async (product) => {
    if (!user?.id) return showToast(t("login_to_favorite_error"), "error");

    const isFav = favorites.includes(product.id);
    const newStatus = !isFav;

    // Optimistic update
    if (newStatus) {
      setFavorites((prev) => [...prev, product.id]);
      showToast("success", t("added_to_favorites"));
    } else {
      setFavorites((prev) => prev.filter((id) => id !== product.id));
      showToast("error", t("removed_from_favorites"));
    }

    try {
      if (BASE_URL && accessToken) {
        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/products/favorite`,
          {
            method: "POST",
            headers: {
              ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
            },
            body: JSON.stringify({
              product_id: product.id,
              user_id: user.id,
            }),
          },
        );
        if (apiError) {
          throw apiError;
        }
        // Reconciliation (optional)
        const nowFav = data?.is_favorite;
        if (nowFav !== undefined && nowFav !== newStatus) {
          // Server disagrees, revert to server state
          if (nowFav) {
            setFavorites((prev) => [...prev, product.id]);
          } else {
            setFavorites((prev) => prev.filter((id) => id !== product.id));
          }
        }
      } else {
        // Supabase direct fallback
        if (isFav) {
          // Was favorite, now removing (match optimistic) -> wait, logic above was toggle
          // We already updated UI to newStatus.
          // newStatus is !isFav.
          // if isFav was true, newStatus is false (remove).
          // if isFav was false, newStatus is true (add).

          if (newStatus) {
            const { error } = await supabase
              .from("user_favorites")
              .insert({ user_id: user?.id, product_id: product?.id });
            if (error) throw error;
          } else {
            const { error } = await supabase
              .from("user_favorites")
              .delete()
              .eq("user_id", user?.id)
              .eq("product_id", product.id);
            if (error) throw error;
          }
        } else {
          // Logic error in my thinking above for direct supabase fallback?
          // isFav is current state BEFORE toggle.
          // newStatus is TARGET state.

          if (newStatus) {
            const { error } = await supabase
              .from("user_favorites")
              .insert({ user_id: user?.id, product_id: product?.id });
            if (error) throw error;
          } else {
            const { error } = await supabase
              .from("user_favorites")
              .delete()
              .eq("user_id", user?.id)
              .eq("product_id", product.id);
            if (error) throw error;
          }
        }
      }
    } catch (err) {
      console.error(err);
      // Revert on error
      if (isFav) {
        setFavorites((prev) => [...prev, product.id]); // Re-add if we removed
      } else {
        setFavorites((prev) => prev.filter((id) => id !== product.id)); // Remove if we added
      }
      showToast("error", t("generic_error"));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t("delete_product_confirm"))) return;
    const { error } = await supabase
      .from("agri_products")
      .delete()
      .eq("id", id);
    if (error) return showToast("error", t("delete_failed"));
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("success", t("product_deleted_success"));
  };

  const handleEditClick = (product) => setEditingProduct(product);
  const handleEditClose = () => {
    setEditingProduct(null);
    fetchProducts();
  };

  const handleChatClick = async (product) => {
    if (!user?.id) {
      showToast("error", t("login_to_chat_error"));
      return;
    }
    console.log("product is  :", product);

    if (product.user_id === user?.id) {
      showToast("error", t("chat_with_self_error"));
      return;
    }
    try {
      // Fetch seller info
      const { data: sellerInfo, error } = await supabase
        .from("userinfo")
        .select("*")
        .eq("id", product.user_id)
        .single();
      if (error) throw error;
      console.log("Data of seller is :", sellerInfo);
      setChatModal({
        isOpen: true,
        product: product,
        sellerId: product.user_id,
        sellerInfo: sellerInfo,
      });
    } catch (error) {
      console.error("Error fetching seller info:", error);
      showToast(t("chat_load_error"), "error");
    }
  };

  const handleChatClose = () => {
    setChatModal({
      isOpen: false,
      product: null,
      sellerId: null,
      sellerInfo: null,
    });
  };

  // Handle product selection from search
  const handleProductSelect = (product) => {
    if (product?.id) {
      router.push(`/market?id=${product.id}`);
    }
  };

  // Product detail handlers
  const handleProductDetailFavorite = async () => {
    if (!user?.id || !selectedProduct) return;
    try {
      if (productFavorite) {
        await supabase
          .from("saved")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", selectedProduct.id);
        setProductFavorite(false);
        showToast("error", t("removed_from_favorites"));
      } else {
        await supabase.from("saved").insert({
          user_id: user.id,
          product_id: selectedProduct.id,
        });
        setProductFavorite(true);
        showToast("success", t("added_to_favorites"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductDetailShare = async () => {
    if (Capacitor.isNativePlatform()) {
      const result = shareContent({
        title: selectedProduct?.title || "Agri Product",
        text: t("share_product_text")
          .replace("{title}", selectedProduct?.title || "")
          .replace("{price}", selectedProduct?.price || ""),
        id: selectedProduct?.id,
        route: "market",
      });

      // 📌 Utility returned results - you just respond:
      if (result.platform === "native") {
        console.log("✔ Shared via native bottom sheet");
      }

      if (result.platform === "web") {
        console.log("🌍 Shared via browser share dialog");
      }

      if (result.platform === "copy") {
        showToast("info", t("link_copied"));
      }

      if (!result.success) {
        return;
      }
    }
  };

  const handleProductDetailChat = async () => {
    if (!user?.id) {
      showToast("error", t("login_to_chat_error"));
      return;
    }
    if (selectedProduct.user_id === user.id) {
      showToast("error", t("chat_with_self_error"));
      return;
    }
    setProductDetailChatModal({
      isOpen: true,
      product: selectedProduct,
      sellerId: selectedProduct.user_id,
      sellerInfo: selectedProduct.userinfo,
    });
  };

  const handleProductDetailChatClose = () => {
    setProductDetailChatModal({
      isOpen: false,
      product: null,
      sellerId: null,
      sellerInfo: null,
    });
  };

  const handleProductDetailCategoryChange = (category) => {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    router.push(`/market?${params.toString()}`);
  };

  const handleProductDetailFiltersChange = (newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.priceMin) params.append("priceMin", newFilters.priceMin);
    if (newFilters.priceMax) params.append("priceMax", newFilters.priceMax);
    if (newFilters.district) params.append("district", newFilters.district);
    router.push(`/market?${params.toString()}`);
  };

  // Prepare products for search component (normalize data structure)
  const searchProducts = products.map((product) => ({
    id: product.id,
    name: product.title || product.name || "",
    title: product.title || product.name || "",
    category: product.category || "",
    description: product.description || "",
    price: product.price,
    image: product.photos?.[0] || product.image || "",
    photos: product.photos || [],
    ...product, // Include all other product properties
  }));

  const renderProductsWithAds = () => {
    if (!clientLoaded) return products;
    const items = [];
    const adArray = [...ads];
    let adIndex = 0;

    products.forEach((product, index) => {
      items.push(product);
      if ((index + 1) % 5 === 0) {
        items.push({ isAd: true, ad: adArray[adIndex % adArray.length] });
        adIndex++;
      }
    });
    return items;
  };

  const finalGridItems = renderProductsWithAds();

  // Detail view
  if (productId) {
    if (productLoading) {
      return (
        <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-white/80 dark:bg-black/80 backdrop-blur-sm z-50">
          <PlantLoader
            size="lg"
            text={t("loading_product")}
            variant="blinking"
          />
        </div>
      );
    }

    if (!selectedProduct) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-122px)]">
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg">
            {t("product_not_found")}
          </p>
        </div>
      );
    }

    const productDetailSearchProducts = allProducts.map((p) => ({
      id: p.id,
      name: p.title || p.name || "",
      title: p.title || p.name || "",
      category: p.category || "",
      description: p.description || "",
      price: p.price,
      image: p.photos?.[0] || p.image || "",
      photos: p.photos || [],
      ...p,
    }));

    const productDetailAvailableDistricts = Array.from(
      new Set(
        allProducts
          .map((p) => p.location?.district)
          .filter(Boolean)
          .sort(),
      ),
    );

    return (
      <MobilePageContainer noPadding>
        <div className="w-full flex flex-col items-center justify-start dark:bg-[#0a0a0a] py-6">
          <div className="w-full px-1">
            <div className="flex items-center justify-center gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-farm-600 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 8m2-8l2 8m10-8l2 8M9 21h6"
                />
              </svg>
              <h1 className="text-2xl md:text-4xl font-bold text-farm-900 dark:text-white">
                {t("product_details_insights")}
              </h1>
            </div>

            <div className="w-full max-w-7xl mx-auto">
              <div className="w-full mb-6 space-y-4">
                <div className="w-full">
                  <ProductSearch
                    products={productDetailSearchProducts}
                    onSelect={handleProductSelect}
                  />
                </div>
                <div className="w-full">
                  <CategorySelector
                    selectedCategory={selectedProduct?.category || null}
                    onCategoryChange={handleProductDetailCategoryChange}
                  />
                </div>
                <div className="w-full">
                  <ProductFilters
                    filters={{ priceMin: null, priceMax: null, district: null }}
                    onFiltersChange={handleProductDetailFiltersChange}
                    availableDistricts={productDetailAvailableDistricts}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <div className="relative mb-6">
                    <ProductImageSlider photos={selectedProduct.photos || []} />
                    <ProductActions
                      favorite={productFavorite}
                      onFavoriteClick={handleProductDetailFavorite}
                      onShareClick={handleProductDetailShare}
                    />
                  </div>
                  <ProductHeader
                    product={selectedProduct}
                    sellerInfo={selectedProduct.userinfo}
                  />
                </div>
                <div className="flex flex-col justify-start">
                  <div className="">
                    <ProductDetailsSection product={selectedProduct} />
                  </div>
                  <div className="mt-4">
                    <ProductButtons
                      userId={user?.id}
                      sellerId={selectedProduct.user_id}
                      onBuyNow={() =>
                        showToast("success", t("buy_now_coming_soon"))
                      }
                      onChatClick={handleProductDetailChat}
                    />
                  </div>
                </div>
              </div>
            </div>

            {productDetailChatModal.isOpen && (
              <Suspense fallback={null}>
                <ChatModal
                  isOpen={productDetailChatModal.isOpen}
                  onClose={handleProductDetailChatClose}
                  product={productDetailChatModal.product}
                  sellerId={productDetailChatModal.sellerId}
                  sellerInfo={productDetailChatModal.sellerInfo}
                />
              </Suspense>
            )}

            {selectedProduct && (
              <Suspense
                fallback={
                  <div className="w-full mt-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                      {t("related_products")}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-80 bg-gray-100 animate-pulse rounded-3xl"
                        />
                      ))}
                    </div>
                  </div>
                }
              >
                <RelatedProducts
                  category={selectedProduct.category}
                  currentProductId={selectedProduct.id}
                  limit={6}
                />
              </Suspense>
            )}
          </div>
        </div>
      </MobilePageContainer>
    );
  }

  // List view
  return (
    <MobilePageContainer noPadding>
      <div className="w-full min-h-screen flex flex-col items-center justify-start dark:bg-[#0a0a0a] py-6">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
          <motion.div
            className="relative w-full flex flex-col items-center justify-center text-center px-4 py-2"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Center Text */}
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {t("market_page_title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-lg font-medium max-w-md sm:max-w-lg md:max-w-xl">
                {t("market_page_subtitle")}
              </p>
            </div>

            {/* Sell Button — Always Below Text on Mobile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6"
            >
              <Link
                href="/sell/choose"
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-base sm:text-lg font-semibold"
              >
                <FaPlus /> {t("sell_product_btn")}
              </Link>
            </motion.div>
          </motion.div>

          {/* Product Search - UNCHANGED */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full"
          >
            <ProductSearch
              products={searchProducts}
              onSelect={handleProductSelect}
            />
          </motion.div>

          {/* Category Selector - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </motion.div>

          {/* Product Filters - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableDistricts={availableDistricts}
            />
          </motion.div>

          {/* Ad Banner */}
          {clientLoaded && (
            <Suspense
              fallback={
                <div className="w-full h-32 bg-gray-100 animate-pulse rounded-xl mb-6" />
              }
            >
              {/* <AdBanner ads={ads} /> */}
            </Suspense>
          )}

          {/* <div className="flex gap-8"> */}
          {/* Product Grid */}
          {productsLoading ? (
            <ProductSkeleton count={8} />
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {finalGridItems.map((item, idx) => {
                if (item.isAd) {
                  return (
                    <Suspense
                      key={`ad-${idx}`}
                      fallback={
                        <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />
                      }
                    >
                      {/* <AdPost ad={item.ad} /> */}
                    </Suspense>
                  );
                }

                const product = item;
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
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDelete}
                    onChatClick={handleChatClick}
                  />
                );
              })}

              {/* Sentinel */}
              <div
                ref={loadMoreRef}
                className="col-span-full h-20 flex justify-center items-center"
              >
                {productsLoading && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <span className="text-sm text-gray-500">
                      {t("loading_more_products")}
                    </span>
                  </div>
                )}
                {!productsLoading && !hasMore && finalGridItems.length > 0 && (
                  <span className="text-gray-400 text-sm">
                    {t("no_more_products")}
                  </span>
                )}
              </div>
            </motion.div>
          )}

          {/* Sticky Ad */}
          {/* {clientLoaded && <AdSticky ads={ads} />} */}
          {/* </div> */}

          {/* Edit Modal */}
          {editingProduct && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 overflow-auto">
              <div className="bg-white rounded-2xl max-h-[90vh] w-full sm:w-3/4 md:w-1/2 lg:w-2/5 p-6 relative dark:bg-[#272727]">
                <button
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                  onClick={handleEditClose}
                >
                  <FaTimes className="text-gray-600 text-lg" />
                </button>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">
                  {t("edit_product_title")}
                </h2>
                <Suspense fallback={<LoadingSpinner />}>
                  <SellForm
                    category={editingProduct.category}
                    productData={editingProduct}
                    onClose={handleEditClose}
                  />
                </Suspense>
              </div>
            </div>
          )}

          {/* Chat Modal */}
          {clientLoaded && chatModal.isOpen && (
            <Suspense fallback={null}>
              <ChatModal
                isOpen={chatModal.isOpen}
                onClose={handleChatClose}
                product={chatModal.product}
                sellerId={chatModal.sellerId}
                sellerInfo={chatModal.sellerInfo}
              />
            </Suspense>
          )}
        </div>
      </div>
    </MobilePageContainer>
  );
}
