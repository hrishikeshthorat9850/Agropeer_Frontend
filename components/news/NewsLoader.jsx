"use client";
import { motion } from "framer-motion";

export default function NewsLoader({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="farm-card overflow-hidden animate-pulse"
        >
          {/* Image Skeleton */}
          <div className="w-full h-48 bg-farm-200"></div>

          {/* Content Skeleton */}
          <div className="p-6">
            {/* Category Badge Skeleton */}
            <div className="h-6 bg-farm-100 rounded-full w-24 mb-3"></div>

            {/* Title Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-5 bg-farm-200 rounded w-full"></div>
              <div className="h-5 bg-farm-200 rounded w-3/4"></div>
            </div>

            {/* Summary Skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-farm-100 rounded w-full"></div>
              <div className="h-4 bg-farm-100 rounded w-5/6"></div>
              <div className="h-4 bg-farm-100 rounded w-4/6"></div>
            </div>

            {/* Footer Skeleton */}
            <div className="flex items-center justify-between">
              <div className="h-4 bg-farm-100 rounded w-20"></div>
              <div className="h-4 bg-farm-100 rounded w-24"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

