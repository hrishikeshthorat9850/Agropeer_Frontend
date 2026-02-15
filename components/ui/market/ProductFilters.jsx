"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";

/**
 * ProductFilters Component
 * Provides price range and location filters (client-side filtering)
 *
 * @param {object} filters - Current filter values
 * @param {function} onFiltersChange - Callback when filters change
 * @param {array} availableDistricts - List of available districts from products
 */
import { useLanguage } from "@/Context/languagecontext";
// Ensure BackHandlerContext is imported correctly - trying relative path
import { useBackPress } from "../../../Context/BackHandlerContext";

export default function ProductFilters({
  filters,
  onFiltersChange,
  availableDistricts = [],
}) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useBackPress(
    () => {
      if (isOpen) {
        setIsOpen(false);
        return true;
      }
      return false;
    },
    30,
    isOpen,
  );

  const handlePriceChange = (field, value) => {
    const numValue = value === "" ? null : parseFloat(value);
    onFiltersChange({
      ...filters,
      priceMin: field === "min" ? numValue : filters.priceMin,
      priceMax: field === "max" ? numValue : filters.priceMax,
    });
  };

  const handleDistrictChange = (district) => {
    onFiltersChange({
      ...filters,
      district: filters.district === district ? null : district,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceMin: null,
      priceMax: null,
      district: null,
    });
  };

  const hasActiveFilters =
    filters.priceMin || filters.priceMax || filters.district;

  return (
    <div className="w-full">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors dark:bg-[#1E1E1E] dark:border-[#333] dark:hover:bg-[#2C2C2C]"
        >
          <FaFilter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {t("filters")}
          </span>
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              {t("active_status")}
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
          >
            <FaTimes className="w-3 h-3" />
            <span>{t("clear_all")}</span>
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border border-gray-200 rounded-xl p-4 mb-6 dark:bg-[#1E1E1E] dark:border-[#333]"
          >
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                  <FaRupeeSign className="w-4 h-4 text-green-600" />
                  {t("product_price_range")}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="number"
                      placeholder={t("product_price_min")}
                      value={filters.priceMin || ""}
                      onChange={(e) => handlePriceChange("min", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-[#0a0a0a] dark:border-[#333] dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder={t("product_price_max")}
                      value={filters.priceMax || ""}
                      onChange={(e) => handlePriceChange("max", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none dark:bg-[#0a0a0a] dark:border-[#333] dark:text-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              {availableDistricts.length > 0 && (
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    <FaMapMarkerAlt className="w-4 h-4 text-green-600" />
                    {t("filter_location")}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {availableDistricts.slice(0, 10).map((district) => (
                      <button
                        key={district}
                        onClick={() => handleDistrictChange(district)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          filters.district === district
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-[#0a0a0a] dark:text-gray-300 dark:hover:bg-[#2C2C2C]"
                        }`}
                      >
                        {district}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
