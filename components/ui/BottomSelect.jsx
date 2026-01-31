"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, X, Check } from "lucide-react";
import { createPortal } from "react-dom";

export default function BottomSelect({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  disabled = false,
  loading = false,
  error = "",
  className = "",
  triggerClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper to get display label
  const getLabel = (option) => {
    if (typeof option === "object" && option !== null && "label" in option) {
      return option.label;
    }
    return String(option);
  };

  // Helper to get value for comparison
  const getValue = (option) => {
    if (typeof option === "object" && option !== null && "value" in option) {
      return option.value;
    }
    return option;
  };

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      getLabel(option).toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  // Handle selection
  const handleSelect = (option) => {
    // If option is object, return its value property if strictly expected,
    // BUT usually custom selects return the value.
    // However, to keep it simple and compatible with simple arrays:
    // If input is simple array -> return item.
    // If input is Object array -> return item.value (to mimic e.target.value).

    if (typeof option === "object" && option !== null && "value" in option) {
      onChange(option.value);
    } else {
      onChange(option);
    }

    setIsOpen(false);
    setSearchQuery(""); // Reset search on close
  };

  // Find display label for current value
  const displayValue = useMemo(() => {
    if (!value) return null;
    // Iterate options to find match
    const match = options.find((opt) => getValue(opt) === value);
    return match ? getLabel(match) : value; // Fallback to value if no match found (or if value is string)
  }, [value, options]);

  // Prevent scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Render the trigger button
  return (
    <div className={`w-full space-y-1.5 direction-ltr ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && !loading && setIsOpen(true)}
        disabled={disabled || loading}
        className={`
          relative w-full text-left bg-white dark:bg-[#1E1E1E] 
          border border-gray-200 dark:border-gray-700 
          text-gray-900 dark:text-white 
          rounded-2xl px-3 py-2 
          transition-all duration-200 active:scale-[0.98]
          flex items-center justify-between
          shadow-sm focus:ring-2 focus:ring-green-500/50 focus:border-green-500
          ${
            disabled
              ? "opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-900"
              : ""
          }
          ${error ? "border-red-500 focus:ring-red-500" : ""}
          ${triggerClassName}
        `}
      >
        <span className={`block truncate ${!value ? "text-gray-400" : ""}`}>
          {loading ? "Loading..." : displayValue || placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {error && <p className="text-red-500 text-xs ml-1">{error}</p>}

      {/* Portal for the Bottom Sheet to ensure it's on top of everything */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm"
                />

                {/* Sheet */}
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed bottom-0 left-0 right-0 z-[9999] 
                           bg-white dark:bg-gray-900 
                           rounded-t-[32px] shadow-2xl 
                           max-h-[85vh] flex flex-col
                           overscroll-contain"
                >
                  {/* Drag Handle */}
                  <div
                    className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  </div>

                  {/* Header */}
                  <div className="px-6 pb-4 pt-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {label || placeholder}
                      </h3>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 -mr-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 bg-gray-50 dark:bg-gray-800 
                                 border-none rounded-xl text-gray-900 dark:text-white 
                                 placeholder-gray-400 focus:ring-2 focus:ring-green-500/20"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Options List */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-1 min-h-[30vh]">
                    {filteredOptions.length > 0 ? (
                      filteredOptions.map((option, index) => {
                        const optionValue = getValue(option);
                        const isSelected = value === optionValue;
                        return (
                          <button
                            key={index}
                            onClick={() => handleSelect(option)}
                            className={`
                            w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-all duration-200
                            ${
                              isSelected
                                ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-medium"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                            }
                          `}
                          >
                            <span className="text-base">
                              {getLabel(option)}
                            </span>
                            {isSelected && (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                        <Search className="w-10 h-10 mb-2 opacity-20" />
                        <p>No options found</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
