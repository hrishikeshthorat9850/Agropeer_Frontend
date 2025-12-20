"use client";
import { motion } from "framer-motion";

export default function TipSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="farm-card p-6 animate-pulse"
        >
          {/* Icon & Category */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-farm-200 rounded-xl"></div>
            <div className="h-4 bg-farm-100 rounded w-24"></div>
          </div>

          {/* Title */}
          <div className="h-6 bg-farm-200 rounded w-3/4 mb-3"></div>

          {/* Description */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-farm-100 rounded w-full"></div>
            <div className="h-4 bg-farm-100 rounded w-5/6"></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="h-4 bg-farm-100 rounded w-20"></div>
            <div className="h-8 bg-farm-200 rounded w-24"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

