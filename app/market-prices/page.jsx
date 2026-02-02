"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation"; // Added for Back button
import { FaArrowLeft } from "react-icons/fa"; // Added for Back button
import useSWR from "swr";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import MarketFilters from "@/components/market-prices/MarketFilters";
// MobilePageContainer removed for custom app layout
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useLanguage } from "@/Context/languagecontext";
import MarketPricesSkeleton from "@/components/skeletons/MarketPricesSkeleton"; // Added Skeleton

import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load MarketList to improve initial render
const MarketList = dynamic(
  () => import("@/components/market-prices/MarketList"),
  {
    ssr: false,
    loading: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useLanguage();
      return (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="sm" text={t("loading_list")} />
        </div>
      );
    },
  },
);

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MarketPricesPage() {
  const { t } = useLanguage();
  const router = useRouter(); // For back navigation
  const [page, setPage] = useState(1);
  const limit = 100;
  const [allStates, setAllStates] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [filters, setFilters] = useState({
    state: "",
    district: "",
    market: "",
    search: "",
    commodity: "",
    arrival_date: "",
  });

  // Active filters for API query (only applied when search is triggered)
  const [activeFilters, setActiveFilters] = useState({
    state: "",
    district: "",
    market: "",
    search: "",
  });

  // PRIORITY: Fetch all states FIRST before market prices
  const { data: statesData, isLoading: statesLoading } = useSWR(
    `${BASE_URL}/api/get-all-states`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    },
  );

  // Update allStates when statesData is loaded
  useEffect(() => {
    if (
      statesData?.success &&
      statesData?.states &&
      Array.isArray(statesData.states)
    ) {
      setAllStates(statesData.states);
      console.log(`✅ Loaded ${statesData.states.length} states`);
    } else if (statesData?.states && Array.isArray(statesData.states)) {
      // Fallback if success flag is missing
      setAllStates(statesData.states);
      console.log(`✅ Loaded ${statesData.states.length} states (fallback)`);
    }
  }, [statesData]);

  // Build API URL with filters
  const buildApiUrl = () => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Only add filters if search has been triggered or if no filters are set (initial load)
    if (
      searchTriggered ||
      (!activeFilters.state &&
        !activeFilters.district &&
        !activeFilters.market &&
        !activeFilters.search)
    ) {
      if (activeFilters.state) params.append("state", activeFilters.state);
      if (activeFilters.district)
        params.append("district", activeFilters.district);
      if (activeFilters.market) params.append("market", activeFilters.market);
      if (activeFilters.search) params.append("search", activeFilters.search);
    }

    return `${BASE_URL}/api/get-market-prices?${params.toString()}`;
  };

  // Fetch market prices (can load after states)
  const { data, error, isLoading } = useSWR(buildApiUrl(), fetcher, {
    revalidateOnFocus: false,
  });

  const records = data?.data || [];
  const total = data?.total || 0;

  // Accumulate records for infinite scroll
  const [allRecords, setAllRecords] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // Update accumulated records when data changes
  useEffect(() => {
    if (data?.data) {
      setAllRecords((prev) => {
        if (page === 1) {
          return data.data;
        }
        // Avoid duplicates unique key
        const newRecords = data.data;
        // Best effort de-dupe:
        return [...prev, ...newRecords];
      });

      setHasMore(data.data.length === limit);
    }
  }, [data, page, limit]);

  const displayRecords = allRecords.length > 0 ? allRecords : [];

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Handle search button click
  const handleSearch = () => {
    setActiveFilters({
      state: filters.state,
      district: filters.district,
      market: filters.market,
      search: filters.search,
    });
    setSearchTriggered(true);
    setAllRecords([]); // Clear current list
    setPage(1); // Reset to page 1
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setFilters({
      state: "",
      district: "",
      market: "",
      search: "",
      commodity: "",
      arrival_date: "",
    });
    setActiveFilters({
      state: "",
      district: "",
      market: "",
      search: "",
    });
    setSearchTriggered(false);
    setAllRecords([]); // Clear list
    setPage(1);
  };

  const filteredRecords = displayRecords;

  // Infinite scroll handler
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [isLoading, hasMore]);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: loadMore,
    enabled: !!hasMore,
  });

  if (isLoading && displayRecords.length === 0 && !error) {
    return <MarketPricesSkeleton />;
  }

  return (
    <div className="bg-gray-50 dark:bg-black font-sans">
      {/* 📱 STICKY APP BAR HEADER */}
      {/* 📱 STICKY APP BAR HEADER */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5 px-4 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-white/10 active:scale-90 transition-all text-gray-700 dark:text-white"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t("market_prices_page_title")}
          </h1>
        </div>
      </div>

      {/* 🟢 Main Content Area */}
      <div className="max-w-lg mx-auto w-full">
        {/* Market Filters (Internal Sticky) */}
        <div>
          <MarketFilters
            data={displayRecords}
            onFilterChange={handleFilterChange}
            allStates={allStates}
            onSearch={handleSearch}
            onClear={handleClearFilters}
            filters={filters}
          />
        </div>

        {/* Content Padding */}
        <div className="px-4 py-2">
          {/* Loading State for States */}
          {statesLoading && allStates.length === 0 && (
            <div className="mb-4 flex items-center justify-center gap-2 bg-emerald-50 py-2 rounded-lg">
              <LoadingSpinner size="tiny" text="" />
              <span className="text-xs text-emerald-600">
                {t("loading_states")}
              </span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-6 text-center">
              <p className="text-red-600 font-medium text-sm">
                {t("generic_error")} {error.message}
              </p>
            </div>
          )}

          {/* Full Screen Loading - REMOVED, using Skeleton now */}

          {/* 📄 Market List Feed */}
          {displayRecords.length > 0 && (
            <div className="animate-fade-in-up">
              {!error && filteredRecords.length > 0 && (
                <MarketList data={filteredRecords} />
              )}

              {/* Infinite Scroll Sentinel */}
              <div
                ref={loadMoreRef}
                className="h-16 flex justify-center items-center mt-6 mb-12"
              >
                {isLoading && (
                  <div className="scale-75">
                    <LoadingSpinner size="xxs" text="" />
                  </div>
                )}
                {!hasMore && (
                  <p className="text-gray-300 dark:text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                    {t("no_more_records")}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
