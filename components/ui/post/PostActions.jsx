"use client";
import { FaRegHeart, FaHeart, FaRegComment, FaShare, FaLightbulb, FaBalanceScale } from "react-icons/fa";
import { motion } from "framer-motion";

export default function PostActions({
  isLike,
  likeCount,
  commentCount,
  onLikeClick,
  onCommentClick,
  onShareClick,
  onAdviceClick,
  onCompareClick,
}) {
  return (
    <div className="md:px-4 border-t border-farm-100 dark:bg-[#272727] dark:border-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLikeClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
              isLike 
                ? 'bg-red-50 text-red-600 shadow-red-100 dark:bg-[#272727]' 
                : 'text-farm-600 hover:bg-farm-50 dark:bg-none'
            }`}
          >
            <motion.div
              animate={{ scale: isLike ? 1.2 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {isLike ? (
                <FaHeart className="text-lg text-red-500" />
              ) : (
                <FaRegHeart className="text-lg" />
              )}
            </motion.div>
            <span className="font-medium">{likeCount}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCommentClick}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-farm-600 hover:bg-farm-50 transition-all duration-200"
          >
            <FaRegComment className="text-lg" />
            <span className="font-medium">{commentCount}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShareClick}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-farm-600 hover:bg-farm-50 transition-all duration-200"
          >
            <FaShare className="text-lg" />
            {/* <span className="font-medium">Share</span> */}
          </motion.button>
        </div>

        {/* ------------------- RIGHT SIDE BUTTONS ------------------- */}
        <div className="flex items-center pr-2 md:gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAdviceClick}
            className="flex items-center gap-1 px-2 py-2 rounded-full text-orange-600 hover:bg-farm-50 transition-all duration-200"
          >
            <FaLightbulb className="text-lg" />
            <span className="font-medium">Advice</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCompareClick}
            className="flex items-center gap-1 py-2 px-1 rounded-full text-orange-600 hover:bg-farm-50 transition-all duration-200"
          >
            <FaBalanceScale className="text-lg" />
            <span className="font-medium">Compare</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
