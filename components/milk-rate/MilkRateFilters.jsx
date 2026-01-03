"use client";
import { useState, useMemo } from "react";
import { useLanguage } from "@/Context/languagecontext";
import { motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

// Moved inside component for translation support

export default function MilkRateFilters({ onMilkTypeChange, onRegionChange, selectedMilkType, selectedRegion }) {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);

  const MILK_TYPES = useMemo(() => [
    { value: "All", label: t("milk_all") },
    { value: "Cow", label: t("milk_cow") },
    { value: "Buffalo", label: t("milk_buffalo") },
    { value: "Mixed", label: t("milk_mixed") },
  ], [t]);

  const REGIONS = useMemo(() => [
    { value: "All Regions", label: t("region_all") },
    { value: "Maharashtra", label: t("region_maharashtra") },
    { value: "Gujarat", label: t("region_gujarat") },
    { value: "Karnataka", label: t("region_karnataka") },
    { value: "Tamil Nadu", label: t("region_tamil_nadu") },
    { value: "Punjab", label: t("region_punjab") },
    { value: "Haryana", label: t("region_haryana") },
    { value: "Rajasthan", label: t("region_rajasthan") },
    { value: "Uttar Pradesh", label: t("region_uttar_pradesh") },
    { value: "West Bengal", label: t("region_west_bengal") },
    { value: "Other", label: t("region_other") },
  ], [t]);

  return (
    <div className="w-full">
      {/* Filter Toggle Button (Mobile) */}
      <div className="md:hidden mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-farm-100 text-farm-700 rounded-xl font-semibold"
        >
          <span className="flex items-center gap-2">
            <FaFilter className="w-4 h-4" />
            {t("filters")}
          </span>
          <span className="text-sm">
            {(selectedMilkType && selectedMilkType !== "All") || (selectedRegion && selectedRegion !== "All Regions") ? "•" : ""}
          </span>
        </motion.button>
      </div>

      {/* Filter Panels */}
      <motion.div
        initial={false}
        animate={{
          height: showFilters ? "auto" : 0,
          opacity: showFilters ? 1 : 0
        }}
        className={`overflow-hidden ${showFilters ? "block" : "hidden md:block"}`}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Milk Type Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-farm-700 mb-2">
              {t("milk_type")}
            </label>
            <div className="flex flex-wrap gap-2">
              {MILK_TYPES.map((type) => (
                <motion.button
                  key={type.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onMilkTypeChange(type.value === "All" ? null : type.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedMilkType === type.value || (type.value === "All" && !selectedMilkType)
                      ? "bg-farm-500 text-white shadow-farm"
                      : "bg-farm-100 text-farm-700 hover:bg-farm-200"
                    }`}
                >
                  {type.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-farm-700 mb-2">
              {t("region")}
            </label>
            <select
              value={selectedRegion || "All Regions"}
              onChange={(e) => onRegionChange(e.target.value === "All Regions" ? null : e.target.value)}
              className="w-full px-4 py-2 rounded-xl border-2 border-farm-200 focus:border-farm-500 focus:ring-4 focus:ring-farm-100 transition-all duration-300 bg-white text-farm-900 font-medium"
            >
              {REGIONS.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        {(selectedMilkType || selectedRegion) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onMilkTypeChange(null);
              onRegionChange(null);
            }}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-farm-600 hover:text-farm-700 font-medium"
          >
            <FaTimes className="w-4 h-4" />
            {t("clear_filters")}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

