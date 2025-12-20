"use client";
import { motion } from "framer-motion";
import { FaComments, FaShoppingCart } from "react-icons/fa";

export default function ProductButtons({
  userId,
  sellerId,
  onBuyNow,
  onChatClick,
}) {
  const canChat = userId && sellerId && userId !== sellerId;

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
      {/* Buy Now Button (Neem Green 3D) */}
      <motion.button
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.96, y: 0 }}
        onClick={onBuyNow}
        className="flex items-center justify-center gap-3 
        bg-gradient-to-b from-[#58b45a] via-[#3f8f3d] to-[#2f7030]
        text-white px-6 py-3 sm:py-4.5 rounded-full 
        font-semibold text-lg tracking-wide
        shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_6px_0_#29682a,0_10px_20px_rgba(63,143,61,0.3)]
        hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_3px_0_#29682a,0_14px_24px_rgba(47,112,48,0.4)]
        active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.3),0_0_0_#29682a]
        transition-all duration-300 ease-out"
      >
        <FaShoppingCart className="text-xl drop-shadow-[0_2px_1px_rgba(0,0,0,0.2)]" />
        <span>Buy Now</span>
      </motion.button>

      {/* Chat Button (Blue 3D) */}
      {canChat && (
        <motion.button
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.96, y: 0 }}
          onClick={onChatClick}
          className="flex items-center justify-center gap-3 
          bg-gradient-to-b from-[#3cbefc] via-[#3790f6] to-[#2563eb]
          text-white px-6 py-3 sm:py-4.5 rounded-full 
          font-semibold text-lg tracking-wide
          shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_6px_0_#1f56cc,0_10px_20px_rgba(37,99,235,0.3)]
          hover:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_3px_0_#1f56cc,0_14px_24px_rgba(37,99,235,0.45)]
          active:shadow-[inset_0_3px_4px_rgba(0,0,0,0.3),0_0_0_#1f56cc]
          transition-all duration-300 ease-out"
        >
          <FaComments className="text-xl drop-shadow-[0_2px_1px_rgba(0,0,0,0.2)]" />
          <span>Chat with Seller</span>
        </motion.button>
      )}
    </div>
  );
}
