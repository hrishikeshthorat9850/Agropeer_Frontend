"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

const CATEGORIES = [
  "All",
  "Agriculture",
  "Market Rates",
  "Government Updates",
  "Industry News",
  "Weather",
  "Dairy",
  "Technology",
  "Crop Management",
  "Farming Tips",
];

import { useLanguage } from "@/Context/languagecontext";

export default function NewsFilterBar({ onCategoryChange, selectedCategory }) {
  const { t } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);

  // 👉 Close filters on mobile when category selected
  const handleCategoryClick = (cat) => {
    onCategoryChange(cat === "All" ? null : cat);

    // Only close on MOBILE
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-2">
        {/* All Chips */}
        {CATEGORIES.map((category) => {
          const isSelected =
            selectedCategory === category ||
            (category === "All" && !selectedCategory);
          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                isSelected
                  ? "bg-farm-600 text-white border-farm-600 shadow-lg shadow-farm-500/30"
                  : "bg-white dark:bg-[#1E1E1E] text-gray-600 dark:text-gray-300 border-gray-200 dark:border-white/10 hover:border-farm-300"
              }`}
            >
              {t(`news_cat_${category.replace(/\s+/g, "_")}`) || category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
