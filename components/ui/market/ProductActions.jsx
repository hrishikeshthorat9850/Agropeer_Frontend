"use client";
import { motion } from "framer-motion";
import { FaShareAlt, FaHeart } from "react-icons/fa";

export default function ProductActions({
  favorite,
  onFavoriteClick,
  onShareClick
}) {
  return (
    <div className="absolute top-4 right-4 flex gap-3 z-20">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onShareClick}
        className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:shadow-xl dark:bg-[#333] dark:hover:bg-[#444]"
        aria-label="Share product"
      >
        <FaShareAlt className="text-gray-700 text-lg dark:text-white" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onFavoriteClick}
        className={`p-3 rounded-full shadow-lg transition-all hover:shadow-xl ${favorite
            ? "bg-red-500 text-white"
            : "bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white dark:bg-[#333] dark:text-white dark:hover:bg-[#444]"
          }`}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <FaHeart className={`text-lg ${favorite ? "animate-pulse" : ""}`} />
      </motion.button>
    </div>
  );
}

