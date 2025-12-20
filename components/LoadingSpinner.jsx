"use client";
import { motion } from "framer-motion";
import { FaSeedling } from "react-icons/fa";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8", 
    lg: "h-12 w-12",
    xl: "h-16 w-16"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-8"
    >
      <div className="relative">
        {/* Animated background circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`rounded-full border-4 border-farm-200 ${sizeClasses[size]}`}
        />
        {/* Animated progress circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-full border-4 border-transparent border-t-farm-500 border-r-farm-400 ${sizeClasses[size]}`}
        />
        {/* Center icon */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <FaSeedling className="text-farm-500 text-xs" />
        </motion.div>
      </div>
      {text && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-4 text-farm-600 text-sm font-medium"
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
}
