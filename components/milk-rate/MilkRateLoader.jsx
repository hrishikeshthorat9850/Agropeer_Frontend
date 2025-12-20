"use client";
import { motion } from "framer-motion";

export default function MilkRateLoader({ count = 6 }) {
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
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 bg-farm-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-farm-200 rounded-lg mb-2"></div>
              <div className="h-4 bg-farm-100 rounded-lg w-24"></div>
            </div>
          </div>

          {/* Rates Skeleton */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="h-16 bg-farm-100 rounded-xl"></div>
            <div className="h-16 bg-farm-100 rounded-xl"></div>
          </div>

          {/* Base Rate Skeleton */}
          <div className="h-16 bg-farm-100 rounded-xl mb-4"></div>

          {/* Footer Skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-4 bg-farm-100 rounded w-24"></div>
            <div className="h-4 bg-farm-100 rounded w-28"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

