"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import useSWR from "swr";
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
import MarketFilters from "@/components/market-prices/MarketFilters";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useLanguage } from "@/Context/languagecontext";

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
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
            <p className="text-gray-600">{t("loading_list")}</p>
          </div>
        </div>
      );
    },
  }
);

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MarketPricesPage() {
  const { t } = useLanguage();
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
    }
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

  return (
    <MobilePageContainer>
      <div className="py-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-3">
              📊 {t("market_prices_page_title")}
            </h1>
            <p className="text-gray-600">
              {searchTriggered &&
              (activeFilters.state ||
                activeFilters.district ||
                activeFilters.market ||
                activeFilters.search) ? (
                <>{t("showing_results")}</>
              ) : (
                <>{t("latest_market_rates")}</>
              )}
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 bg-white rounded-2xl shadow p-4 border border-gray-200 dark:bg-[#272727] dark:border-white/20">
            {statesLoading && allStates.length === 0 && (
              <div className="mb-4 text-sm text-blue-600 flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span>{t("loading_states")}</span>
              </div>
            )}
            <MarketFilters
              data={displayRecords}
              onFilterChange={handleFilterChange}
              allStates={allStates}
              onSearch={handleSearch}
              onClear={handleClearFilters}
              filters={filters}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6 text-center">
              <p className="text-red-700 font-semibold">
                {t("generic_error")} {error.message}
              </p>
            </div>
          )}

          {/* Loading - only show full screen loader if we have no previous data */}
          {isLoading && displayRecords.length === 0 && (
            <div className="flex justify-center items-center py-20">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600">{t("loading_market_data")}</p>
              </div>
            </div>
          )}

          {/* Market List - always show if we have data */}
          {displayRecords.length > 0 && (
            <>
              {!error && filteredRecords.length > 0 && (
                <MarketList data={filteredRecords} />
              )}

              {/* Infinite Scroll Sentinel */}
              <div
                ref={loadMoreRef}
                className="h-24 flex justify-center items-center mt-4"
              >
                {isLoading && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <span className="text-sm text-gray-500">
                      {t("loading_more_prices")}
                    </span>
                  </div>
                )}
                {!hasMore && (
                  <p className="text-gray-400 text-sm">
                    {t("no_more_records")}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </MobilePageContainer>
  );
}
