"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import { FaFilter, FaTimes } from "react-icons/fa";

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
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
        {/* All Chip */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${!selectedCategory
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
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${isSelected
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
        <div className="relative flex-shrink-0">
          <select
            value={selectedState || "All States"}
            onChange={(e) =>
              onStateChange(
                e.target.value === "All States" ? null : e.target.value
              )
            }
            className={`appearance-none pl-4 pr-8 py-2 rounded-full text-sm font-bold transition-all duration-300 border cursor-pointer focus:outline-none ${selectedState
                ? "bg-farm-600 text-white border-farm-600 shadow-lg shadow-farm-500/30"
                : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-farm-300"
              }`}
          >
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state} className="bg-white text-gray-900 dark:bg-[#1E1E1E] dark:text-gray-200">
                {t(`state_${state.replace(/\s+/g, "_")}`) || state}
              </option>
            ))}
          </select>
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${selectedState ? 'text-white' : 'text-gray-500'}`}>
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
