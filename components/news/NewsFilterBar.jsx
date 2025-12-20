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

export default function NewsFilterBar({ onCategoryChange, selectedCategory }) {
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

      {/* Mobile Toggle Button */}
      <div className="md:hidden mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-farm-100 text-farm-700 rounded-xl font-semibold"
        >
          <span className="flex items-center gap-2">
            <FaFilter className="w-4 h-4" />
            Categories
          </span>

          <span className="text-sm">
            {selectedCategory && selectedCategory !== "All" ? "•" : ""}
          </span>
        </motion.button>
      </div>

      {/* Filter Panel */}
      <div className={`${showFilters ? "block" : "hidden"} md:block w-full`}>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-farm-700 mb-3">
            Filter by Category
          </label>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category ||
                  (category === "All" && !selectedCategory)
                    ? "bg-farm-500 text-white shadow-farm"
                    : "bg-farm-100 text-farm-700 hover:bg-farm-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Clear Filter */}
        {selectedCategory && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onCategoryChange(null);

              if (window.innerWidth < 768) setShowFilters(false);
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm text-farm-600 hover:text-farm-700 font-medium"
          >
            <FaTimes className="w-4 h-4" /> Clear Filter
          </motion.button>
        )}
      </div>
    </div>
  );
}
