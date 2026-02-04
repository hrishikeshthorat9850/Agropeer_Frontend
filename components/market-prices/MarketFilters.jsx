"use client";

import { useState, useEffect, useRef } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import useSWR from "swr";
import { useLanguage } from "@/Context/languagecontext";
import BottomSelect from "../ui/BottomSelect";
import debounce from "lodash.debounce";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MarketFilters({
  data,
  onFilterChange,
  allStates = [],
  onSearch,
  onClear,
  filters = {},
}) {
  const { t } = useLanguage();
  const [selectedState, setSelectedState] = useState(filters.state || "");
  const [selectedDistrict, setSelectedDistrict] = useState(
    filters.district || "",
  );
  const [selectedMarket, setSelectedMarket] = useState(filters.market || "");
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Use allStates if provided, otherwise extract from current data
  const states =
    allStates.length > 0
      ? allStates
      : data && Array.isArray(data)
      ? [
          ...new Set(
            data.filter((item) => item && item.state).map((item) => item.state),
          ),
        ].sort()
      : [];

  // Fetch districts from database when state is selected
  const { data: districtsData } = useSWR(
    selectedState
      ? `${BASE_URL}/api/get-districts?state=${encodeURIComponent(
          selectedState,
        )}`
      : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const districts = districtsData?.districts || [];

  // Fetch markets from database when state and optionally district are selected
  const { data: marketsData } = useSWR(
    selectedState
      ? `${BASE_URL}/api/get-markets?state=${encodeURIComponent(
          selectedState,
        )}${
          selectedDistrict
            ? `&district=${encodeURIComponent(selectedDistrict)}`
            : ""
        }`
      : null,
    fetcher,
    { revalidateOnFocus: false },
  );

  const markets = marketsData?.markets || [];

  // Reset cascading dropdowns
  useEffect(() => {
    if (!selectedState) {
      setSelectedDistrict("");
      setSelectedMarket("");
    }
    if (!selectedDistrict) {
      setSelectedMarket("");
    }
  }, [selectedState, selectedDistrict]);

  // Track if component has mounted to avoid initial mount triggers
  const isInitialMount = useRef(true);
  const searchTimeoutRef = useRef(null);
  const prevFiltersRef = useRef({ state: "", district: "", market: "", search: "" });
  const onSearchRef = useRef(onSearch);
  const onFilterChangeRef = useRef(onFilterChange);
  const prevFilterChangeRef = useRef({ state: "", district: "", market: "", search: "" });

  // Keep refs updated
  useEffect(() => {
    onSearchRef.current = onSearch;
    onFilterChangeRef.current = onFilterChange;
  }, [onSearch, onFilterChange]);

  // Notify parent component of filter changes (only when values actually change)
  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      prevFilterChangeRef.current = {
        state: selectedState,
        district: selectedDistrict,
        market: selectedMarket,
        search: searchQuery,
      };
      return;
    }

    // Check if values actually changed
    const valuesChanged =
      prevFilterChangeRef.current.state !== selectedState ||
      prevFilterChangeRef.current.district !== selectedDistrict ||
      prevFilterChangeRef.current.market !== selectedMarket ||
      prevFilterChangeRef.current.search !== searchQuery;

    if (valuesChanged && onFilterChangeRef.current) {
      prevFilterChangeRef.current = {
        state: selectedState,
        district: selectedDistrict,
        market: selectedMarket,
        search: searchQuery,
      };
      onFilterChangeRef.current({
        state: selectedState,
        district: selectedDistrict,
        market: selectedMarket,
        search: searchQuery,
      });
    }
  }, [selectedState, selectedDistrict, selectedMarket, searchQuery]);

  // Trigger search when filters change (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevFiltersRef.current = {
        state: selectedState,
        district: selectedDistrict,
        market: selectedMarket,
        search: searchQuery,
      };
      return;
    }

    // Check if filters actually changed
    const filtersChanged =
      prevFiltersRef.current.state !== selectedState ||
      prevFiltersRef.current.district !== selectedDistrict ||
      prevFiltersRef.current.market !== selectedMarket ||
      prevFiltersRef.current.search !== searchQuery;

    if (!filtersChanged) {
      return;
    }

    // Update previous filters
    prevFiltersRef.current = {
      state: selectedState,
      district: selectedDistrict,
      market: selectedMarket,
      search: searchQuery,
    };

    // Clear any pending search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Trigger search with debounce
    searchTimeoutRef.current = setTimeout(() => {
      if (onSearchRef.current) {
        onSearchRef.current({
          state: selectedState,
          district: selectedDistrict,
          market: selectedMarket,
          search: searchQuery,
        });
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [selectedState, selectedDistrict, selectedMarket, searchQuery]);

  // Sync with external filter changes (e.g., when clear is called from parent)
  // Only update if filters prop actually changed and differs from current state
  useEffect(() => {
    let shouldUpdate = false;
    const updates = {};

    if (filters.state !== undefined && filters.state !== selectedState) {
      updates.state = filters.state || "";
      shouldUpdate = true;
    }
    if (filters.district !== undefined && filters.district !== selectedDistrict) {
      updates.district = filters.district || "";
      shouldUpdate = true;
    }
    if (filters.market !== undefined && filters.market !== selectedMarket) {
      updates.market = filters.market || "";
      shouldUpdate = true;
    }
    if (filters.search !== undefined && filters.search !== searchQuery) {
      updates.search = filters.search || "";
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      const newState = {
        state: updates.state !== undefined ? updates.state : selectedState,
        district: updates.district !== undefined ? updates.district : selectedDistrict,
        market: updates.market !== undefined ? updates.market : selectedMarket,
        search: updates.search !== undefined ? updates.search : searchQuery,
      };

      // Batch updates to avoid multiple re-renders
      if (updates.state !== undefined) setSelectedState(updates.state);
      if (updates.district !== undefined) setSelectedDistrict(updates.district);
      if (updates.market !== undefined) setSelectedMarket(updates.market);
      if (updates.search !== undefined) setSearchQuery(updates.search);
      
      // Update both refs to prevent search and onFilterChange triggers
      prevFiltersRef.current = newState;
      prevFilterChangeRef.current = newState;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  const handleClearFilters = () => {
    // Clear local state
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedMarket("");
    setSearchQuery("");
    // Clear any pending searches
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    // Trigger search with empty filters to show all results
    if (onSearch) {
      debouncedSearch({
        state: "",
        district: "",
        market: "",
        search: "",
      });
    }
    // Call parent clear handler
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="w-full bg-white dark:bg-[#121212] pb-2 transition-colors duration-300">
      {/* Search Bar - Minimalist & Modern */}
      <div className="px-4 pt-2 pb-3">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
          </div>
          <input
            type="text"
            placeholder={t("search_placeholder_commodity")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-[#1e1e1e] border-none rounded-2xl text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Horizontal Scrollable Chips Filter Row - STICKY NOW */}
      <div className="sticky top-[60px] z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-sm px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {/* Filter Icon Label (Static) */}
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
          <FaFilter className="text-gray-400 text-xs" />
        </div>

        {/* State Chip */}
        <div className="relative flex-shrink-0 min-w-[120px]">
          <BottomSelect
            value={selectedState}
            onChange={(val) => setSelectedState(val)}
            options={states}
            placeholder={t("all_states")}
            searchPlaceholder="Search State"
            className="w-auto"
            triggerClassName={`appearance-none pl-3 pr-8 py-2 rounded-full text-md font-semibold border transition-all cursor-pointer outline-none ${
              selectedState
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                : "bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
            }`}
          />
        </div>

        {/* District Chip */}
        <div className="relative flex-shrink-0 min-w-[140px]">
          <BottomSelect
            value={selectedDistrict}
            onChange={(val) => setSelectedDistrict(val)}
            options={districts}
            disabled={!selectedState}
            placeholder={t("all_districts")}
            searchPlaceholder="Search District"
            className="w-auto"
            triggerClassName={`appearance-none pl-3 pr-8 py-2 rounded-full text-md font-semibold border transition-all cursor-pointer outline-none ${
              selectedDistrict
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                : "bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          />
        </div>

        {/* Market Chip */}
        <div className="relative flex-shrink-0 min-w-[140px]">
          <BottomSelect
            value={selectedMarket}
            onChange={(val) => setSelectedMarket(val)}
            options={markets}
            disabled={!selectedState}
            placeholder={t("all_markets")}
            searchPlaceholder="Search Market"
            className="w-auto"
            triggerClassName={`appearance-none pl-3 pr-8 py-2 rounded-full text-md font-semibold border transition-all cursor-pointer outline-none ${
              selectedMarket
                ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                : "bg-white dark:bg-[#1e1e1e] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          />
        </div>

        {/* Clear Button (Only visible if filters active) */}
        {(selectedState || selectedDistrict || selectedMarket || searchQuery) && (
          <button
            onClick={handleClearFilters}
            className="flex-shrink-0 px-3 py-1.5 rounded-full bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 text-md font-bold border border-red-100 dark:border-red-800/30 whitespace-nowrap active:scale-95 transition-transform"
          >
            {t("clear_btn")}
          </button>
        )}
      </div>
    </div>
  );
}
