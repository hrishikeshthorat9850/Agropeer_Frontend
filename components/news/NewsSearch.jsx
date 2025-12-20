"use client";
import { useState, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

export default function NewsSearch({ onSearch, placeholder = "Search news articles..." }) {
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
        <div
          className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 
                    rounded-lg px-3 py-2 border border-gray-200 dark:border-neutral-700"
        >
          {/* Search Icon */}
          <FaSearch className="text-gray-400 dark:text-gray-500" />

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-sm 
                      text-gray-700 dark:text-gray-200 
                      placeholder-gray-400 dark:placeholder-gray-500"
          />

          {/* Clear Button */}
          {query && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            >
              <FaTimes className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            </motion.button>
          )}
        </div>
      </div>
    </form>
  );
}

