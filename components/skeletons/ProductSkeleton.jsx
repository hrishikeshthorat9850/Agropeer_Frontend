"use client";
import { motion } from "framer-motion";

export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="farm-card overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-farm-200"></div>

          {/* Content */}
          <div className="p-4">
            <div className="h-5 bg-farm-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-farm-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-farm-100 rounded w-5/6 mb-4"></div>
            
            {/* Price & Location */}
            <div className="flex items-center justify-between mb-3">
              <div className="h-6 bg-farm-200 rounded w-24"></div>
              <div className="h-4 bg-farm-100 rounded w-20"></div>
            </div>

            {/* Button */}
            <div className="h-10 bg-farm-200 rounded-xl"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

