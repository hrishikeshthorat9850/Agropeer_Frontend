"use client";
import { useState, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function MilkRateSearch({ onSearch, placeholder = "Search companies..." }) {
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
      <div className="mb-4">
      <div className="flex items-center gap-3 bg-white/80 dark:bg-neutral-800 backdrop-blur-sm rounded-xl px-4 py-3 border-2 border-farm-200 
                      focus-within:border-farm-500 focus-within:ring-4 focus-within:ring-farm-100 transition-all duration-300">
        {/* Search Icon */}
        <FaSearch className="w-5 h-5 text-farm-500" />
        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-farm-900 dark:text-white
                    placeholder-farm-400 text-sm"
        />

        {/* Clear Button */}
        {query && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearSearch}
            className="p-1 rounded-full hover:bg-farm-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <FaTimes className="w-4 h-4 text-farm-500" />
          </motion.button>
        )}
      </div>
    </div>
    </form>
  );
}

