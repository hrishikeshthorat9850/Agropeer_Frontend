"use client";
import { motion } from "framer-motion";
import { FaSeedling, FaTractor, FaFlask, FaBug, FaPaw, FaCarrot, FaAppleAlt, FaOilCan, FaTools, FaEllipsisH } from "react-icons/fa";

/**
 * CategorySelector Component
 * Displays product categories as clickable buttons
 * 
 * @param {string} selectedCategory - Currently selected category (null for "All")
 * @param {function} onCategoryChange - Callback when category is selected
 */
export default function CategorySelector({ selectedCategory, onCategoryChange }) {
  const categories = [
    { key: null, label: "All", icon: FaEllipsisH },
    { key: "seeds", label: "Seeds", icon: FaSeedling },
    { key: "fertilizers", label: "Fertilizers", icon: FaFlask },
    { key: "pesticides", label: "Pesticides", icon: FaBug },
    { key: "machinery", label: "Machinery", icon: FaTractor },
    { key: "livestock", label: "Livestock", icon: FaPaw },
    { key: "vegetables", label: "Vegetables", icon: FaCarrot },
    { key: "fruits", label: "Fruits", icon: FaAppleAlt },
    { key: "oil", label: "Oil", icon: FaOilCan },
    { key: "services", label: "Services", icon: FaTools },
    { key: "others", label: "Others", icon: FaEllipsisH },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.key;

          return (
            <motion.button
              key={cat.key || "all"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 shadow-sm ${
                isSelected
                  ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/30"
                  : "bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 border border-gray-200 dark:bg-[#272727] dark:border-gray-600 dark:text-gray-300 dark:hover:bg-[#0a0a0a]"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

