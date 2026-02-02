"use client";
import { useState, useMemo } from "react";
import { useLanguage } from "@/Context/languagecontext";
import { motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

// Moved inside component for translation support

export default function MilkRateFilters({
  onMilkTypeChange,
  onRegionChange,
  selectedMilkType,
  selectedRegion,
}) {
  const { t } = useLanguage();

  const MILK_TYPES = useMemo(
    () => [
      { value: "All", label: t("milk_all") || "All Types" },
      { value: "Cow", label: t("milk_cow") || "Cow" },
      { value: "Buffalo", label: t("milk_buffalo") || "Buffalo" },
      { value: "Mixed", label: t("milk_mixed") || "Mixed" },
    ],
    [t],
  );

  const REGIONS = useMemo(
    () => [
      { value: "All Regions", label: t("region_all") || "All Regions" },
      { value: "Maharashtra", label: t("region_maharashtra") || "Maharashtra" },
      { value: "Gujarat", label: t("region_gujarat") || "Gujarat" },
      { value: "Karnataka", label: t("region_karnataka") || "Karnataka" },
      { value: "Tamil Nadu", label: t("region_tamil_nadu") || "Tamil Nadu" },
      { value: "Punjab", label: t("region_punjab") || "Punjab" },
      { value: "Haryana", label: t("region_haryana") || "Haryana" },
      { value: "Rajasthan", label: t("region_rajasthan") || "Rajasthan" },
      {
        value: "Uttar Pradesh",
        label: t("region_uttar_pradesh") || "Uttar Pradesh",
      },
      { value: "West Bengal", label: t("region_west_bengal") || "West Bengal" },
      { value: "Other", label: t("region_other") || "Other" },
    ],
    [t],
  );

  return (
    <div className="w-full sticky top-[60px] z-30 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-sm py-2">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
        {/* Milk Type Chips */}
        {MILK_TYPES.map((type) => {
          const isSelected =
            selectedMilkType === type.value ||
            (type.value === "All" && !selectedMilkType);
          return (
            <button
              key={type.value}
              onClick={() =>
                onMilkTypeChange(type.value === "All" ? null : type.value)
              }
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                isSelected
                  ? "bg-farm-600 text-white border-farm-600 shadow-lg shadow-farm-500/30"
                  : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-farm-300"
              }`}
            >
              {type.label}
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-1 flex-shrink-0" />

        {/* Region Dropdown as Chip */}
        <div className="relative flex-shrink-0">
          <select
            value={selectedRegion || "All Regions"}
            onChange={(e) =>
              onRegionChange(
                e.target.value === "All Regions" ? null : e.target.value,
              )
            }
            className={`appearance-none pl-4 pr-8 py-2 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer focus:outline-none ${
              selectedRegion
                ? "bg-farm-600 text-white border-farm-600 shadow-lg shadow-farm-500/30"
                : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-farm-300"
            }`}
          >
            {REGIONS.map((region) => (
              <option
                key={region.value}
                value={region.value}
                className="bg-white text-gray-900 dark:bg-[#1E1E1E] dark:text-gray-200"
              >
                {region.label}
              </option>
            ))}
          </select>
          <div
            className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${
              selectedRegion ? "text-white" : "text-gray-500"
            }`}
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
