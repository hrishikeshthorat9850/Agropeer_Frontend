"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaEllipsisH, FaEdit, FaTrash, FaComments, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import { formatName } from "@/utils/formatName";

export default function ProductCard({
  product,
  isFavorite = false,
  onFavoriteClick,
  onMenuClick,
  onEditClick,
  onDeleteClick,
  onChatClick,
  menuOpen = false,
  showChatButton = true,
  currentUserId,
}) {
  const [imageError, setImageError] = useState(false);
  const firstPhoto =
    product.photos?.length > 0 && !imageError
      ? product.photos[0]
      : "https://via.placeholder.com/400?text=No+Image";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.015,
        boxShadow: "0 14px 32px rgba(0,0,0,0.10)",
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative flex flex-col bg-white rounded-3xl border border-gray-100 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden dark:border-gray-600"
    >
      {/* IMAGE SECTION */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-3xl">
        <Image
          src={firstPhoto}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => setImageError(true)}
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

        {/* TOP RIGHT BUTTONS */}
        <div className="absolute top-3 right-3 flex gap-2 z-20">
          {/* Favorite */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onFavoriteClick?.(product)}
            className={`w-9 h-9 flex items-center justify-center rounded-full shadow-md backdrop-blur-md transition ${
              isFavorite
                ? "bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 text-white shadow-[0_4px_12px_rgba(244,63,94,0.4)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.5)]"
                : "bg-white/90 text-gray-700 hover:bg-white"
            }`}
          >
            <FaHeart className="w-4 h-4" />
          </motion.button>

          {/* Menu */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onMenuClick?.(product.id)}
              className="w-9 h-9 flex items-center justify-center bg-white/90 text-gray-700 rounded-full shadow-md hover:bg-white backdrop-blur-md"
            >
              <FaEllipsisH className="w-4 h-4" />
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-44 bg-white shadow-2xl rounded-xl overflow-hidden z-50 border border-gray-100"
                >
                  <motion.button
                    whileHover={{ backgroundColor: "#f0fdf4" }}
                    onClick={() => {
                      onEditClick?.(product);
                      onMenuClick?.(product.id);
                    }}
                    className="flex items-center gap-2 px-4 py-3 w-full hover:bg-green-50 text-green-900 font-medium transition-colors"
                  >
                    <FaEdit className="w-3.5 h-3.5" />
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "#fef2f2" }}
                    onClick={() => {
                      onDeleteClick?.(product.id);
                      onMenuClick?.(product.id);
                    }}
                    className="flex items-center gap-2 px-4 py-3 w-full text-red-600 hover:bg-red-50 font-medium transition-colors border-t border-gray-100"
                  >
                    <FaTrash className="w-3.5 h-3.5" />
                    Delete
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-4 flex flex-col flex-1 dark:bg-[#272727]">
        {/* Title */}
        <h3 className="text-[1.05rem] font-semibold text-gray-900 mb-3 leading-snug transition-colors dark:text-white">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <FaRupeeSign className="text-emerald-600 text-sm mt-[2px]" />
          <span className="text-2xl font-extrabold text-emerald-700">
            {product.price?.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Seller Info */}
        {product.userinfo && (
          <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors dark:bg-[#0a0a0a]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-sm font-bold shadow-md flex-shrink-0">
              {formatName(product.userinfo).charAt(0)}
            </div>
            <span className="text-sm text-gray-700 font-medium truncate flex-1">
              {formatName(product.userinfo)}
            </span>
          </div>
        )}

        {/* Category */}
        {/* {product.category && (
          <span className="inline-block px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[0.7rem] font-medium rounded-full shadow-sm">
            {product.category}
          </span>
        )} */}

        {/* Location */}
        {product.location &&
          (product.location.district ||
            product.location.taluka ||
            product.location.village) && (
            <div className="mt-3 flex items-start gap-2 p-2.5 bg-blue-50 rounded-lg border border-blue-100 dark:bg-[#0a0a0a] dark:border-none">
              <FaMapMarkerAlt className="text-blue-600 text-sm mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                {/* <p className="text-xs text-blue-600 font-semibold mb-0.5">
                  Location
                </p> */}
                <p className="text-xs text-gray-700 truncate">
                  {[product.location.village, product.location.taluka, product.location.district]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </div>
          )}

        {/* ACTION BUTTONS */}
        <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100 dark:border-none">
          <Link
            href={`/market?id=${product.id}`}
            className="flex-1 text-center px-5 py-2.5 
            bg-gradient-to-br from-[#4ba64a] via-[#3d8f40] to-[#2f7030] 
            text-white rounded-xl font-medium 
            hover:from-[#449843] hover:to-[#2a622b] 
            shadow-[0_4px_14px_rgba(47,112,48,0.3)] hover:shadow-[0_6px_20px_rgba(47,112,48,0.35)] 
            transition-all duration-300"
          >
            View Details
          </Link>

          {showChatButton &&
            currentUserId &&
            product.user_id !== currentUserId && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onChatClick?.(product)}
                className="w-11 h-11 flex items-center justify-center 
                bg-gradient-to-r from-blue-500 to-indigo-600 
                text-white rounded-xl 
                hover:from-sky-500 hover:to-blue-500 
                shadow-[0_4px_10px_rgba(56,189,248,0.4)] 
                hover:shadow-[0_6px_18px_rgba(37,99,235,0.4)] 
                transition-all duration-300"
                title="Chat with seller"
                aria-label="Chat with seller"
              >
                <FaComments className="w-4 h-4" />
              </motion.button>
            )}
        </div>
      </div>
    </motion.div>
  );
}
