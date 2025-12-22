"use client";
import { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes, FaFilter, FaHistory } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchBar({ inline = false }) {
  const [q, setQ] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchresults,setSearchResults] = useState([]);
  const router = useRouter();
  const inputRef = useRef(null);
  const searchRef = useRef(null);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const suggestions = [
    { type: "trending", text: "Organic farming tips", icon: "🌱" },
    { type: "trending", text: "Crop prices today", icon: "💰" },
    { type: "trending", text: "Weather forecast", icon: "☀️" },
    { type: "user", text: "John Farmer", icon: "👨‍🌾" },
    { type: "user", text: "Sarah Green", icon: "👩‍🌾" },
    { type: "tag", text: "#harvest2024", icon: "#" },
    { type: "tag", text: "#organic", icon: "#" },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;

    try {
      const res = await fetch(`${BASE_URL}/api/search?q=${encodeURIComponent(trimmed)}`);
      const result = await res.json();
      console.log("Search results are :",result);
      console.log("First result structure:", result.results?.[0]);
      setSearchResults(result.results || []);
      const newRecent = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, 5);
      setRecentSearches(newRecent);
      localStorage.setItem("recentSearches", JSON.stringify(newRecent));
      // Keep suggestions open to show results
      setShowSuggestions(true);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQ(suggestion.text);
    handleSubmit();
  };

  const clearSearch = () => {
    setQ("");
    inputRef.current?.focus();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };
  //mobile search
  // INLINE SEARCH BAR
  if (inline) {
    return (
      <div className="relative w-full" ref={searchRef}>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="relative">
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                // Delay to allow click events on suggestions
                setTimeout(() => setIsFocused(false), 200);
              }}
              type="text"
              placeholder="Search..."
              className={`w-full pl-9 pr-8 py-1.5 rounded-full border-0 focus:outline-none text-sm transition-all duration-300 ${
                isFocused ? 'shadow-lg' : 'shadow-sm'
              }`}
              style={{
                background: isFocused 
                  ? "rgba(255,255,255,0.98)" 
                  : "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                boxShadow: isFocused
                  ? "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.8)"
                  : "0 2px 6px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.6)",
                border: isFocused 
                  ? "1px solid rgba(72, 236, 80, 0.4)" 
                  : "1px solid rgba(255,255,255,0.5)",
                fontSize: "14px",
                fontWeight: "500",
                color: "#1a1a1a",
              }}
            />
            <button 
              type="button" 
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-green-700 opacity-80 active:opacity-100 transition-opacity"
              aria-label="Search"
            >
              <FaSearch className="w-3.5 h-3.5" />
            </button>
            {q && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 active:scale-95 transition-all p-0.5 rounded-full hover:bg-gray-100"
                aria-label="Clear search"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            )}
          </div>
        </form>

        {/* Inline Search Results Dropdown */}
        <AnimatePresence>
          {showSuggestions && (q || recentSearches.length > 0 || searchresults.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-700 overflow-hidden z-[200] max-h-[70vh] overflow-y-auto"
              style={{
                backdropFilter: "blur(20px)",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              {/* Search Results */}
              {searchresults.length > 0 && q && (
                <div className="p-4 border-b border-farm-100 dark:border-neutral-700">
                  <h3 className="text-sm font-semibold text-farm-700 dark:text-farm-300 mb-3">
                    Search Results ({searchresults.length})
                  </h3>
                  <div className="space-y-1">
                    {searchresults.map((result, index) => {
                      // Determine result type - handle all possible field names
                      const resultType = result.type || result.table_name || result.table || result.entity_type || 'unknown';
                      
                      // Determine result ID - handle all possible field names
                      const resultId = result.id || result.record_id || result.post_id || result.user_id || result.product_id || result.agri_product_id;
                      
                      // Get display title - handle all possible field names for different entity types
                      const getDisplayTitle = () => {
                        // For posts: caption, title, body, content
                        if (resultType === 'post' || resultType === 'posts') {
                          return result.caption || result.title || result.body || result.content || 'Untitled Post';
                        }
                        // For users: display_name, firstName+lastName, name, email
                        if (resultType === 'user' || resultType === 'userinfo' || resultType === 'users') {
                          if (result.display_name) return result.display_name;
                          if (result.firstName && result.lastName) return `${result.firstName} ${result.lastName}`;
                          if (result.firstName) return result.firstName;
                          if (result.name) return result.name;
                          if (result.email) return result.email;
                          return 'Unknown User';
                        }
                        // For products: title, name
                        if (resultType === 'product' || resultType === 'products' || resultType === 'agri_products' || resultType === 'agri_product') {
                          return result.title || result.name || 'Untitled Product';
                        }
                        // Fallback for other types
                        return result.title || result.name || result.firstName || result.display_name || result.caption || 'Untitled';
                      };

                      // Get display description - handle all possible field names
                      const getDisplayDescription = () => {
                        return result.description || result.body || result.summary || result.content || result.caption || null;
                      };

                      // Handle navigation based on result type
                      const handleResultClick = () => {
                        if (!resultId) {
                          console.warn('No ID found for result:', result);
                          return;
                        }

                        let path = '';
                        // Posts
                        if (resultType === 'post' || resultType === 'posts') {
                          path = `/posts?id=${resultId}`;
                        } 
                        // Users - navigate to visitor profile page
                        else if (resultType === 'user' || resultType === 'userinfo' || resultType === 'users') {
                          path = `/profile?id=${resultId}`;
                        } 
                        // Products
                        else if (resultType === 'product' || resultType === 'products' || resultType === 'agri_products' || resultType === 'agri_product') {
                          path = `/market?id=${resultId}`;
                        } 
                        // News (if exists)
                        else if (resultType === 'news' || resultType === 'news_article') {
                          path = `/news?id=${resultId}`;
                        }
                        // Government schemes (if exists)
                        else if (resultType === 'scheme' || resultType === 'government_scheme') {
                          path = `/government-schemes?id=${resultId}`;
                        }
                        // Milk companies (if exists)
                        else if (resultType === 'milk_company' || resultType === 'milk_company_rate') {
                          path = `/milk-rate-calculator?id=${resultId}`;
                        }
                        else {
                          console.warn('Unknown result type:', resultType, result);
                          return;
                        }

                        if (path) {
                          router.push(path);
                          setShowSuggestions(false);
                          setQ(''); // Clear search after navigation
                        }
                      };

                      const displayTitle = getDisplayTitle();
                      const displayDescription = getDisplayDescription();

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={handleResultClick}
                          className="w-full text-left p-2.5 rounded-lg active:bg-green-50 dark:active:bg-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2.5 cursor-pointer touch-manipulation"
                        >
                          <span className="text-lg flex-shrink-0">
                            {resultType === 'post' || resultType === 'posts' ? '📝' : 
                             resultType === 'user' || resultType === 'userinfo' || resultType === 'users' ? '👤' : 
                             resultType === 'product' || resultType === 'products' || resultType === 'agri_products' || resultType === 'agri_product' ? '🛒' : 
                             resultType === 'news' || resultType === 'news_article' ? '📰' :
                             resultType === 'scheme' || resultType === 'government_scheme' ? '🏛️' :
                             resultType === 'milk_company' || resultType === 'milk_company_rate' ? '🥛' : '🔍'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-farm-800 dark:text-farm-200 truncate">
                              {displayTitle}
                            </div>
                            {displayDescription && (
                              <div className="text-xs text-farm-500 dark:text-farm-400 truncate mt-1">
                                {displayDescription}
                              </div>
                            )}
                            {/* Show image count for products */}
                            {result.extra && Array.isArray(result.extra) && result.extra.length > 0 && (
                              <div className="text-xs text-farm-400 dark:text-farm-500 mt-1">
                                📷 {result.extra.length} photo{result.extra.length > 1 ? 's' : ''}
                              </div>
                            )}
                            {/* Show image count for posts */}
                            {result.images && Array.isArray(result.images) && result.images.length > 0 && (
                              <div className="text-xs text-farm-400 dark:text-farm-500 mt-1">
                                📷 {result.images.length} image{result.images.length > 1 ? 's' : ''}
                              </div>
                            )}
                            <div className="text-xs text-farm-400 dark:text-farm-500 capitalize mt-1">{resultType.replace(/_/g, ' ')}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && !q && (
                <div className="p-4 border-b border-farm-100 dark:border-neutral-700">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-farm-700 dark:text-farm-300 flex items-center gap-2">
                      <FaHistory className="w-4 h-4" />
                      Recent Searches
                    </h3>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-farm-500 dark:text-farm-400 hover:text-farm-700 dark:hover:text-farm-300 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick({ text: search })}
                        className="w-full text-left p-2.5 rounded-lg active:bg-green-50 dark:active:bg-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-sm text-gray-700 dark:text-gray-300 touch-manipulation"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {searchresults.length === 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-farm-700 dark:text-farm-300 mb-3">
                    {q ? "Suggestions" : "Popular Searches"}
                  </h3>
                  <div className="space-y-1">
                    {suggestions
                      .filter((s) => !q || s.text.toLowerCase().includes(q.toLowerCase()))
                      .slice(0, 6)
                      .map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSuggestionClick(s)}
                          className="w-full text-left p-2.5 rounded-lg active:bg-green-50 dark:active:bg-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 flex items-center gap-2.5 touch-manipulation transition-colors"
                        >
                          <span className="text-lg">{s.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-farm-800 dark:text-farm-200">{s.text}</div>
                            <div className="text-xs text-farm-500 dark:text-farm-400 capitalize">{s.type}</div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // EXPANDED SEARCH BAR
  return (
    <div className="max-w-2xl w-full mx-auto mb-6" ref={searchRef}>
      <motion.form
        onSubmit={(e) => {
          e.preventDefault(); // stop reload
          handleSubmit();
        }}
        className="relative"
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          type="text"
          placeholder="Search posts, farmers, or tags..."
          className={`w-full pl-14 pr-14 py-4 rounded-2xl border-0 focus:outline-none text-farm-800 placeholder-farm-500 transition-all duration-300 ${
            isFocused ? "shadow-2xl scale-105" : "shadow-lg"
          }`}
          style={{
            background: isFocused
              ? "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.8) 100%)",
            backdropFilter: "blur(20px)",
            boxShadow: isFocused
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(34, 197, 94, 0.2)"
              : "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        />

        <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2">
          <FaSearch className={`w-5 h-5 transition-colors duration-300 ${isFocused ? "text-farm-600" : "text-farm-400"}`} />
        </button>

        {q && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={clearSearch}
            className="absolute right-2 top-4 translate-y-1/2 p-1 rounded-full hover:bg-farm-100 transition-colors"
          >
            <FaTimes className="w-4 h-4 text-farm-500" />
          </motion.button>
        )}

        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-12 top-1/2 -translate-y-1/2 p-2 rounded-full bg-farm-100 hover:bg-farm-200 transition-colors"
        >
          <FaFilter className="w-4 h-4 text-farm-600" />
        </motion.button>

        <AnimatePresence>
          {showSuggestions && (q || recentSearches.length > 0) && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-farm-200 overflow-hidden z-50"
            >
              {/* Search Results */}
              {searchresults.length > 0 && q && (
                <div className="p-4 border-b border-farm-100">
                  <h3 className="text-sm font-semibold text-farm-700 mb-3">
                    Search Results ({searchresults.length})
                  </h3>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {searchresults.map((result, index) => {
                      // Determine result type and ID - handle different possible field names
                      const resultType = result.type || result.table_name || result.table || 'unknown';
                      const resultId = result.id || result.record_id || result.post_id || result.user_id || result.product_id;
                      
                      // Handle navigation based on result type
                      const handleResultClick = () => {
                        if (!resultId) {
                          console.warn('No ID found for result:', result);
                          return;
                        }

                        let path = '';
                        if (resultType === 'post' || resultType === 'posts') {
                          path = `/posts?id=${resultId}`;
                        } else if (resultType === 'user' || resultType === 'userinfo' || resultType === 'users') {
                          // For users, navigate to profile - check if it's current user's profile
                          path = `/profile?id=${resultId}`;
                        } else if (resultType === 'product' || resultType === 'products' || resultType === 'agri_products' || resultType === 'agri_product') {
                          path = `/market?id=${resultId}`;
                        } else {
                          console.warn('Unknown result type:', resultType, result);
                          return;
                        }

                        if (path) {
                          router.push(path);
                          setShowSuggestions(false);
                          setQ(''); // Clear search after navigation
                        }
                      };

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={handleResultClick}
                          className="w-full text-left p-3 rounded-lg hover:bg-farm-50 transition-colors flex items-center gap-3 cursor-pointer"
                        >
                          <span className="text-lg">
                            {resultType === 'post' || resultType === 'posts' ? '📝' : 
                             resultType === 'user' || resultType === 'userinfo' || resultType === 'users' ? '👤' : 
                             resultType === 'product' || resultType === 'products' || resultType === 'agri_products' || resultType === 'agri_product' ? '🛒' : '🔍'}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-farm-800 truncate">
                              {result.title || result.name || result.firstName || result.display_name || 'Untitled'}
                            </div>
                            {(result.body || result.description || result.summary) && (
                              <div className="text-xs text-farm-500 truncate mt-1">
                                {result.body || result.description || result.summary}
                              </div>
                            )}
                            <div className="text-xs text-farm-400 capitalize mt-1">{resultType}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {recentSearches.length > 0 && !q && (
                <div className="p-4 border-b border-farm-100">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-farm-700 flex items-center gap-2">
                      <FaHistory className="w-4 h-4" />
                      Recent Searches
                    </h3>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-farm-500 hover:text-farm-700 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSuggestionClick({ text: search })}
                        className="w-full text-left p-2 rounded-lg hover:bg-farm-50 transition-colors text-sm text-farm-700"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Show suggestions only if no search results */}
              {searchresults.length === 0 && (
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-farm-700 mb-3">
                    {q ? "Suggestions" : "Popular Searches"}
                  </h3>
                  <div className="space-y-1">
                    {suggestions
                      .filter((s) => !q || s.text.toLowerCase().includes(q.toLowerCase()))
                      .slice(0, 6)
                      .map((s, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSuggestionClick(s)}
                          className="w-full text-left p-3 rounded-lg hover:bg-farm-50 flex items-center gap-3"
                        >
                          <span className="text-lg">{s.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-farm-800">{s.text}</div>
                            <div className="text-xs text-farm-500 capitalize">{s.type}</div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
      </motion.form>
    </div>
  );
}
