"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import useSWR from "swr";
import { useLanguage } from "@/Context/languagecontext";

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
    filters.district || ""
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
            data.filter((item) => item && item.state).map((item) => item.state)
          ),
        ].sort()
      : [];

  // Fetch districts from database when state is selected
  const { data: districtsData } = useSWR(
    selectedState
      ? `${BASE_URL}/api/get-districts?state=${encodeURIComponent(
          selectedState
        )}`
      : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const districts = districtsData?.districts || [];

  // Fetch markets from database when state and optionally district are selected
  const { data: marketsData } = useSWR(
    selectedState
      ? `${BASE_URL}/api/get-markets?state=${encodeURIComponent(
          selectedState
        )}${
          selectedDistrict
            ? `&district=${encodeURIComponent(selectedDistrict)}`
            : ""
        }`
      : null,
    fetcher,
    { revalidateOnFocus: false }
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
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200 dark:bg-[#1E1E1E] dark:border-none">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <FaFilter className="text-green-600 text-xl" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {t("filter_market_prices")}
        </h2>
      </div>

      {/* Search Bar (Top Full Width) */}
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-neutral-700">
          <FaSearch className="text-gray-400 dark:text-gray-500" />
          {/* Input Field */}
          <input
            type="text"
            placeholder={t("search_placeholder_commodity")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent outline-none flex-1 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* All Filters Under Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* State Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t("state_label")}
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-[#363636]"
          >
            <option value="">{t("all_states")}</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t("district_label")}
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedState}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-[#363636]"
          >
            <option value="">{t("all_districts")}</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Market Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t("market_label")}
          </label>
          <select
            value={selectedMarket}
            onChange={(e) => setSelectedMarket(e.target.value)}
            disabled={!selectedState}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed dark:bg-[#363636]"
          >
            <option value="">{t("all_markets")}</option>
            {markets.map((market) => (
              <option key={market} value={market}>
                {market}
              </option>
            ))}
          </select>
        </div>

        {/* Search + Clear Buttons */}
        <div className="flex items-end gap-3">
          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-xl shadow-lg transform transition-transform hover:scale-105"
          >
            <FaSearch className="text-sm" />
            {t("search_btn")}
          </button>

          {/* Clear Filters */}
          <button
            onClick={handleClearFilters}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-black bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:text-white dark:bg-[#333] dark:hover:bg-[#444]"
          >
            {t("clear_btn")}
          </button>
        </div>
      </div>
    </div>
  );
}
