"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import { FaFilter, FaTimes } from "react-icons/fa";
import BottomSelect from "@/components/ui/BottomSelect";

const CATEGORIES = [
  "All",
  "Agriculture",
  "Business",
  "Women",
  "Kisan Credit",
  "Insurance",
  "Subsidy",
  "Education",
  "Health",
  "Livestock",
];

const INDIAN_STATES = [
  "All States",
  "Maharashtra",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Punjab",
  "Haryana",
  "Rajasthan",
  "Uttar Pradesh",
  "Madhya Pradesh",
  "West Bengal",
  "Bihar",
  "Andhra Pradesh",
  "Telangana",
  "Kerala",
  "Odisha",
  "Assam",
  "Jharkhand",
  "Chhattisgarh",
  "Himachal Pradesh",
  "Uttarakhand",
  "Goa",
  "Tripura",
  "Manipur",
  "Meghalaya",
  "Nagaland",
  "Mizoram",
  "Sikkim",
  "Arunachal Pradesh",
];

export default function SchemeFilterBar({
  onCategoryChange,
  onStateChange,
  selectedCategory,
  selectedState,
}) {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-transparent py-0">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
        {/* All Chip */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
            !selectedCategory
              ? "bg-farm-600 text-white border-farm-600 shadow-lg shadow-farm-500/30"
              : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-farm-300"
          }`}
        >
          {t("all") || "All"}
        </button>

        {/* Category Chips */}
        {CATEGORIES.filter((c) => c !== "All").map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                isSelected
                  ? "bg-farm-600 text-white border-farm-600 shadow-lg shadow-farm-500/30"
                  : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-farm-300"
              }`}
            >
              {t(`scheme_cat_${category.replace(/\s+/g, "_")}`) || category}
            </button>
          );
        })}

        {/* Separator */}
        <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-1 flex-shrink-0" />

        {/* State Dropdown as Chip */}
        <div className="relative flex-shrink-0 min-w-[160px]">
          <BottomSelect
            value={selectedState || "All States"}
            onChange={(val) => onStateChange(val === "All States" ? null : val)}
            options={INDIAN_STATES.map((state) => ({
              label: t(`state_${state.replace(/\s+/g, "_")}`) || state,
              value: state,
            }))}
            className="!space-y-0"
            triggerClassName={`!py-2 !rounded-full !text-sm !font-bold !border ${
              selectedState
                ? "!bg-farm-600 !text-white !border-farm-600 !shadow-lg !shadow-farm-500/30"
                : "!bg-white dark:!bg-[#1E1E1E] !text-gray-600 dark:!text-gray-300 !border-gray-200 dark:!border-white/10 hover:!border-farm-300"
            }`}
            placeholder={t("select_state") || "Select State"}
          />
        </div>
      </div>
    </div>
  );
}
