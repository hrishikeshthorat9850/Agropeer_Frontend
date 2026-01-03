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
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="w-full">

      {/* MOBILE FILTER BUTTON */}
      <div className="md:hidden mb-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-farm-100 text-farm-700 rounded-xl font-semibold"
        >
          <span className="flex items-center gap-2">
            <FaFilter className="w-4 h-4" />
            {t("filter_by_title")}
          </span>
          <span className="text-sm">
            {selectedCategory || selectedState ? "•" : ""}
          </span>
        </motion.button>
      </div>

      {/* FILTER PANEL */}
      <div className={`${showFilters ? "block" : "hidden"} md:block w-full`}>
        <div className="flex flex-col md:flex-row gap-4">

          {/* CATEGORY FILTER */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-farm-700 mb-2">
              {t("category_label")}
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    onCategoryChange(category === "All" ? null : category)
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category ||
                    (category === "All" && !selectedCategory)
                    ? "bg-farm-500 text-white shadow-farm"
                    : "bg-farm-100 text-farm-700 hover:bg-farm-200"
                    }`}
                >
                  {t(`scheme_cat_${category.replace(/\s+/g, "_")}`)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* STATE FILTER */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-farm-700 mb-2">
              {t("state_label")}
            </label>
            <select
              value={selectedState || "All States"}
              onChange={(e) =>
                onStateChange(
                  e.target.value === "All States" ? null : e.target.value
                )
              }
              className="w-full px-4 py-2 rounded-xl border-2 border-farm-200 focus:border-farm-500 focus:ring-4 focus:ring-farm-100 transition-all duration-300 bg-white text-farm-900 font-medium"
            >
              {INDIAN_STATES.map((state) => (
                <option key={state} value={state}>
                  {t(`state_${state.replace(/\s+/g, "_")}`)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CLEAR FILTERS BUTTON */}
        {(selectedCategory || selectedState) && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onCategoryChange(null);
              onStateChange(null);
            }}
            className="mt-4 flex items-center gap-2 px-4 py-2 text-sm text-farm-600 hover:text-farm-700 font-medium"
          >
            <FaTimes className="w-4 h-4" />
            {t("clear_filters")}
          </motion.button>
        )}
      </div>
    </div>
  );
}
