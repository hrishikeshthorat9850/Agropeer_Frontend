"use client";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/**
 * Pagination Component
 * @param {object} props
 * @param {number} props.currentPage - Current page number
 * @param {number} props.totalPages - Total number of pages
 * @param {boolean} props.hasNextPage - Whether there's a next page
 * @param {boolean} props.hasPreviousPage - Whether there's a previous page
 * @param {function} props.onPageChange - Callback when page changes
 * @param {string} props.className - Additional CSS classes
 */
export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }
      
      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      
      // Show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
          hasPreviousPage
            ? "bg-farm-500 text-white hover:bg-farm-600"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <FaChevronLeft className="w-4 h-4" />
        Previous
      </motion.button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pageNumbers.map((pageNum, index) => {
          if (pageNum === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                ...
              </span>
            );
          }

          const isActive = pageNum === currentPage;

          return (
            <motion.button
              key={pageNum}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg font-medium transition-all ${
                isActive
                  ? "bg-farm-600 text-white shadow-lg"
                  : "bg-white text-farm-700 hover:bg-farm-50 border border-farm-200"
              }`}
            >
              {pageNum}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-all ${
          hasNextPage
            ? "bg-farm-500 text-white hover:bg-farm-600"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
        <FaChevronRight className="w-4 h-4" />
      </motion.button>
    </div>
  );
}

