"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import useSWR from "swr";
import { useLanguage } from "@/Context/languagecontext";
import BottomSelect from "../ui/BottomSelect";

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

  // Notify parent component of filter changes
  useEffect(() => {
    onFilterChange({
      state: selectedState,
      district: selectedDistrict,
      market: selectedMarket,
      search: searchQuery,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState, selectedDistrict, selectedMarket, searchQuery]);

  // Track previous values to detect actual changes (not initial mount)
  const [prevState, setPrevState] = useState("");
  const [prevDistrict, setPrevDistrict] = useState("");
  const [prevMarket, setPrevMarket] = useState("");

  // Auto-trigger search when state is selected (so results show immediately)
  useEffect(() => {
    if (selectedState && selectedState !== prevState && onSearch) {
      setPrevState(selectedState);
      // Small delay to ensure state is set
      const timer = setTimeout(() => {
        onSearch();
      }, 150);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedState]);

  // Auto-trigger search when district or market changes (if state is already selected)
  useEffect(() => {
    if (
      selectedState &&
      ((selectedDistrict && selectedDistrict !== prevDistrict) ||
        (selectedMarket && selectedMarket !== prevMarket)) &&
      onSearch
    ) {
      if (selectedDistrict !== prevDistrict) setPrevDistrict(selectedDistrict);
      if (selectedMarket !== prevMarket) setPrevMarket(selectedMarket);
      const timer = setTimeout(() => {
        onSearch();
      }, 150);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict, selectedMarket]);

  // Sync with external filter changes
  useEffect(() => {
    if (filters.state !== undefined) setSelectedState(filters.state || "");
    if (filters.district !== undefined)
      setSelectedDistrict(filters.district || "");
    if (filters.market !== undefined) setSelectedMarket(filters.market || "");
    if (filters.search !== undefined) setSearchQuery(filters.search || "");
  }, [filters]);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch();
    }
  };

  const handleClearFilters = () => {
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedMarket("");
    setSearchQuery("");
    setPrevState("");
    setPrevDistrict("");
    setPrevMarket("");
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
        {(selectedState || searchQuery) && (
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
