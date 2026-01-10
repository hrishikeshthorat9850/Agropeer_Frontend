//market page
"use client";
import { useState, useEffect, Suspense, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabaseClient"; // Still needed for favorites and other operations
import { FaPlus, FaTimes } from "react-icons/fa";
import { ProductCard, ProductSearch, ProductImageSlider, ProductHeader, ProductActions, ProductDetailsSection, ProductButtons } from "@/components/ui/market";
import useToast from "@/hooks/useToast";
import CategorySelector from "@/components/ui/market/CategorySelector";
import ProductFilters from "@/components/ui/market/ProductFilters";
import { ads } from "@/lib/ads";
import { useLogin } from "@/Context/logincontext";
import { ProductSkeleton } from "@/components/skeletons";
import LoadingSpinner from "@/components/LoadingSpinner";
import PlantLoader from "@/components/PlantLoader";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
// Lazy load heavy components that are only shown on user interaction or below the fold
const SellForm = dynamic(() => import("@/components/SellForm"), {
  loading: () => <LoadingSpinner />,
});

const AdPost = dynamic(() => import("@/components/AdPost"), {
  loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />,
});

const AdBanner = dynamic(() => import("@/components/AdBanner"), {
  loading: () => <div className="w-full h-32 bg-gray-100 animate-pulse rounded-xl mb-6" />,
});

const ChatModal = dynamic(() => import("@/components/ChatModal"), {
  ssr: false, // Browser-only component with socket connections
  loading: () => null, // Modal handles its own loading state
});

const RelatedProducts = dynamic(() => import("@/components/ui/market/RelatedProducts"), {
  loading: () => (
    <div className="w-full mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl" />
        ))}
      </div>
    </div>
  ),
});

export default function AgriMarket() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userinfo, loading, error } = useLogin();
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
    sellerInfo: null
  });

  // Filter state - NEW (initialize from URL params if present)
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get("category") || null;
  });
  const [filters, setFilters] = useState(() => ({
    priceMin: searchParams.get("priceMin") ? parseFloat(searchParams.get("priceMin")) : null,
    priceMax: searchParams.get("priceMax") ? parseFloat(searchParams.get("priceMax")) : null,
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
    console.log("User in market page is :", user?.id)
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

      const response = await fetch(`${BASE_URL}/api/products?${params.toString()}`);
      const result = await response.json();

      if (response.ok && result.data) {
        // Ensure photos array exists
        const productsWithPhotos = result.data.map(product => ({
          ...product,
          photos: Array.isArray(product.photos) ? product.photos : [],
        }));

        setAllProducts(prev => {
          if (pageNum === 1 || forceReset) {
            return productsWithPhotos;
          }
          // Avoid duplicates by ID if possible
          const existingIds = new Set(prev.map(p => p.id));
          const newUnique = productsWithPhotos.filter(p => !existingIds.has(p.id));
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
      setPage(prev => prev + 1);
    }
  }, [productsLoading, hasMore]);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: !!hasMore
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
        return p.location?.district?.toLowerCase() === filters.district.toLowerCase();
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
        .sort()
    )
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
        .map(row => row.product_id)
        .filter(id => id !== null);

      setFavorites(favs);
    } catch (err) {
      console.error("Error in fetchFavorites:", err);
    }
  };


  const toggleFavorite = async (product) => {
    if (!user?.id) return showToast("Please log in to add favorites", "error");

    const isFav = favorites.includes(product.id);

    try {
      if (isFav) {
        const { data, error } = await supabase.from("user_favorites")
          .delete()
          .eq("user_id", user?.id)
          .eq("product_id", product.id)
        setFavorites(prev => prev.filter(id => id !== product.id));
        showToast("error", "Removed from Favorites ❌");

      } else {
        console.log("Product id is :", product?.id);
        console.log("Type of product id is :", typeof product?.id)
        const { data, error } = await supabase.from("user_favorites")
          .insert({ user_id: user?.id, product_id: product?.id })
        setFavorites(prev => [...prev, product.id]);
        showToast("success", "Added to Favorites ❤️");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "Something went wrong!");
    }
  };


  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("agri_products").delete().eq("id", id);
    if (error) return showToast("error", "Delete failed!");
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast("success", "Product deleted successfully 🗑️");
  };

  const handleEditClick = (product) => setEditingProduct(product);
  const handleEditClose = () => { setEditingProduct(null); fetchProducts(); };

  const handleChatClick = async (product) => {
    if (!user?.id) {
      showToast("error", "Please log in to start a conversation");
      return;
    }
    console.log("product is  :", product);

    if (product.user_id === user?.id) {
      showToast("error", "You cannot chat with yourself");
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
        sellerInfo: sellerInfo
      });
    } catch (error) {
      console.error("Error fetching seller info:", error);
      showToast("Error loading chat", "error");
    }
  };

  const handleChatClose = () => {
    setChatModal({ isOpen: false, product: null, sellerId: null, sellerInfo: null });
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
        showToast("error", "Removed from Favorites ❌");
      } else {
        await supabase.from("saved").insert({
          user_id: user.id,
          product_id: selectedProduct.id,
        });
        setProductFavorite(true);
        showToast("success", "Added to Favorites ❤️");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProductDetailShare = async () => {
    if (Capacitor.isNativePlatform()) {
      const result = shareContent({
        title: selectedProduct?.title || "Agri Product",
        text: `Check out this product: ${selectedProduct?.title} for ₹${selectedProduct?.price}`,
        id: selectedProduct?.id,
        route: "market"
      });

      // 📌 Utility returned results - you just respond:
      if (result.platform === "native") {
        console.log("✔ Shared via native bottom sheet");
      }

      if (result.platform === "web") {
        console.log("🌍 Shared via browser share dialog");
      }

      if (result.platform === "copy") {
        showToast("info", "📋 Link copied to clipboard!");
      }

      if (!result.success) {
        return;
      }
    }
  };

  const handleProductDetailChat = async () => {
    if (!user?.id) {
      showToast("error", "Please log in to start a conversation");
      return;
    }
    if (selectedProduct.user_id === user.id) {
      showToast("error", "You cannot chat with yourself");
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
        <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-white/80 backdrop-blur-sm z-50">
          <PlantLoader size="lg" text="Loading product..." variant="blinking" />
        </div>
      );
    }

    if (!selectedProduct) {
      return (
        <div className="flex items-center justify-center min-h-[calc(100vh-122px)]">
          <p className="text-center text-gray-600 text-lg">Product not found.</p>
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
          .sort()
      )
    );

    return (
      <MobilePageContainer noPadding>
        <div className="w-full min-h-screen flex flex-col items-center justify-start bg-[linear-gradient(145deg,_#e8f5e9cc_0%,_#c8e6c9cc_100%)] dark:bg-[#0a0a0a] py-6">
          <div className="w-full px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-farm-600 dark:text-green-400"
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
              <h1 className="text-3xl md:text-4xl font-bold text-farm-900">
                Product Details & Insights
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
                      onBuyNow={() => showToast("success", "Buy Now feature coming soon!")}
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
              <Suspense fallback={
                <div className="w-full mt-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
                    Related Products
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-3xl" />
                    ))}
                  </div>
                </div>
              }>
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
    <MobilePageContainer>
      <div className="py-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6 md:gap-8">
          <motion.div
            className="relative w-full flex flex-col items-center justify-center text-center px-4 py-2"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Center Text */}
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                🌾 AgriMarket
              </h1>
              <p className="text-gray-600 text-base sm:text-lg md:text-lg font-medium max-w-md sm:max-w-lg md:max-w-xl">
                Buy & Sell trusted agriculture products directly from farmers & dealers.
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
                <FaPlus /> Sell Product
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
            <Suspense fallback={<div className="w-full h-32 bg-gray-100 animate-pulse rounded-xl mb-6" />}>
              <AdBanner ads={ads} />
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
                    <Suspense key={`ad-${idx}`} fallback={<div className="w-full h-64 bg-gray-100 animate-pulse rounded-xl" />}>
                      <AdPost ad={item.ad} />
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
                    onMenuClick={(productId) => setMenuOpen(menuOpen === productId ? null : productId)}
                    onEditClick={handleEditClick}
                    onDeleteClick={handleDelete}
                    onChatClick={handleChatClick}
                  />
                );
              })}

              {/* Sentinel */}
              <div ref={loadMoreRef} className="col-span-full h-20 flex justify-center items-center">
                {productsLoading && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <span className="text-sm text-gray-500">Loading more products...</span>
                  </div>
                )}
                {!productsLoading && !hasMore && finalGridItems.length > 0 && (
                  <span className="text-gray-400 text-sm">No more products to show.</span>
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
                <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-800" onClick={handleEditClose}>
                  <FaTimes className="text-gray-600 text-lg" />
                </button>
                <h2 className="text-2xl font-semibold text-green-900 mb-4">Edit Product</h2>
                <Suspense fallback={<LoadingSpinner />}>
                  <SellForm category={editingProduct.category} productData={editingProduct} onClose={handleEditClose} />
                </Suspense>
              </div>
            </div>
          )}

          {/* Chat Modal */}
          <ChatModal
            isOpen={chatModal.isOpen}
            onClose={handleChatClose}
            product={chatModal.product}
            sellerId={chatModal.sellerId}
            sellerInfo={chatModal.sellerInfo}
          />
        </div>
      </div>
    </MobilePageContainer>
  );
}
