"use client";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";

import { useLanguage } from "@/Context/languagecontext";

export default function ProductSearch({ products = [], onSelect }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Debounce search query (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [];
    }

    const query = debouncedQuery.toLowerCase().trim();
    return products.filter((product) => {
      const name = (product.name || product.title || "").toLowerCase();
      const category = (product.category || "").toLowerCase();
      const description = (product.description || "").toLowerCase();

      return (
        name.includes(query) ||
        category.includes(query) ||
        description.includes(query)
      );
    });
  }, [products, debouncedQuery]);

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setSelectedIndex(-1);
    setIsOpen(true);
  };

  // Handle input focus
  const handleFocus = () => {
    setFocused(true);
    if (searchQuery.trim() && filteredProducts.length > 0) {
      setIsOpen(true);
    }
  };

  // Handle input blur
  const handleBlur = () => {
    setFocused(false);
    // Delay closing to allow click events to fire
    setTimeout(() => setIsOpen(false), 200);
  };

  // Handle product selection
  const handleSelect = (product) => {
    onSelect?.(product);
    setSearchQuery("");
    setSelectedIndex(-1);
    setIsOpen(false);
    searchInputRef.current?.blur();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen || filteredProducts.length === 0) {
      if (e.key === "Enter" && searchQuery.trim()) {
        // Optionally trigger a search or show all results
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredProducts.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredProducts.length) {
          handleSelect(filteredProducts[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        searchInputRef.current?.blur();
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && dropdownRef.current) {
      const selectedElement = dropdownRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedIndex]);

  const showDropdown = isOpen && focused && searchQuery.trim().length > 0;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Input */}
      <div
        className={`relative flex items-center bg-white rounded-xl shadow-md border-2 transition-all duration-200 ${focused
          ? "border-green-500 shadow-lg ring-2 ring-green-500/20 dark:bg-[#1E1E1E]"
          : "border-gray-200 hover:border-gray-300 dark:bg-[#1E1E1E] dark:border-[#333]"
          }`}
      >
        {/* <div className="absolute left-4 flex items-center pointer-events-none">
          <Search className="text-gray-400 w-5 h-5" />
        </div> */}

        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder={t("product_search_placeholder")}
          className="w-full pl-12 pr-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 bg-transparent border-0 rounded-xl focus:outline-none text-base md:text-lg"
          aria-label="Search products"
          aria-expanded={showDropdown}
          aria-haspopup="listbox"
          role="combobox"
        />

        {/* Clear button */}
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              setIsOpen(false);
              searchInputRef.current?.focus();
            }}
            className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}

            className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-2xl border border-gray-200 dark:border-[#333] overflow-hidden"
            ref={dropdownRef}
            role="listbox"
          >
            {filteredProducts.length > 0 ? (
              <div className="max-h-[250px] overflow-y-auto custom-scrollbar">
                {filteredProducts.map((product, index) => {
                  const isSelected = index === selectedIndex;
                  const productName =
                    product.name || product.title || "Untitled";
                  const productImage =
                    product.image ||
                    product.photos?.[0] ||
                    "https://via.placeholder.com/100?text=No+Image";

                  return (
                    <motion.button
                      key={product.id}
                      whileHover={{ backgroundColor: "#f0fdf4" }}
                      whileTap={{ backgroundColor: "#dcfce7" }}
                      onClick={() => handleSelect(product)}
                      className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-colors border-b border-gray-100 last:border-b-0 ${isSelected
                        ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/30"
                        : "hover:bg-gray-50 dark:hover:bg-[#2C2C2C]"
                        }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 dark:bg-[#333] dark:border-[#444]">
                        <Image
                          src={productImage}
                          alt={productName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {productName}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {product.category && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">
                              {product.category}
                            </span>
                          )}
                          {product.price && (
                            <span className="text-xs text-gray-500 font-medium">
                              ₹{product.price?.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                        {product.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                            {product.description}
                          </p>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 dark:bg-[#333] rounded-full flex items-center justify-center">
                  <Search className="text-gray-400 w-6 h-6" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {t("product_no_results")}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {t("product_try_different")}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
