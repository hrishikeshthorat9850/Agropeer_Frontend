"use client";
import { motion } from "framer-motion";

export default function ReviewSkeleton({ count = 3 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="farm-card p-6 animate-pulse"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-farm-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-5 bg-farm-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-farm-100 rounded w-24 mb-2"></div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-farm-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-farm-100 rounded w-full"></div>
            <div className="h-4 bg-farm-100 rounded w-5/6"></div>
            <div className="h-4 bg-farm-100 rounded w-4/6"></div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="h-4 bg-farm-100 rounded w-20"></div>
            <div className="flex gap-4">
              <div className="h-4 bg-farm-100 rounded w-16"></div>
              <div className="h-4 bg-farm-100 rounded w-16"></div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

