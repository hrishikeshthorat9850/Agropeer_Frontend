"use client";
import { useState, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

import { useLanguage } from "@/Context/languagecontext";

export default function MilkRateSearch({ onSearch, placeholder }) {
  const { t } = useLanguage();
  const displayPlaceholder = placeholder || t("search_companies_placeholder");
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <div className="flex items-center gap-3 bg-gray-100 dark:bg-white/10 rounded-full px-4 py-1.5 transition-all focus-within:ring-2 focus-within:ring-green-500/50">
          {/* Search Icon */}
          <FaSearch className="text-gray-400 dark:text-gray-500 text-sm" />
          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={displayPlaceholder}
            className="bg-transparent outline-none flex-1 text-sm text-gray-900 dark:text-white placeholder:text-gray-500"
          />

          {/* Clear Button */}
          {query && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="p-1 rounded-full bg-gray-200 dark:bg-white/20 hover:bg-gray-300 transition-colors"
            >
              <FaTimes className="w-3 h-3 text-gray-500 dark:text-gray-300" />
            </motion.button>
          )}
        </div>
      </div>
    </form>
  );
}

