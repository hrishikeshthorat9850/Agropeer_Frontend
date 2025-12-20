"use client";
import { motion } from "framer-motion";

export default function SchemeLoader({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className="farm-card p-6 animate-pulse"
        >
          {/* Icon & Title Skeleton */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 bg-farm-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-farm-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-farm-100 rounded-lg w-24"></div>
            </div>
          </div>

          {/* Description Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-farm-100 rounded w-full"></div>
            <div className="h-4 bg-farm-100 rounded w-3/4"></div>
          </div>

          {/* Benefits Skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-farm-100 rounded w-full"></div>
            <div className="h-3 bg-farm-100 rounded w-5/6"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-10 bg-farm-200 rounded-xl"></div>
        </motion.div>
      ))}
    </div>
  );
}

