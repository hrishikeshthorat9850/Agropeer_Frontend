"use client";
import { motion } from "framer-motion";

export default function PageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8 text-center">
          <div className="h-10 bg-farm-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-farm-100 rounded-lg w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="farm-card p-6 animate-pulse"
            >
              <div className="h-6 bg-farm-200 rounded-lg w-3/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-farm-100 rounded w-full"></div>
                <div className="h-4 bg-farm-100 rounded w-5/6"></div>
                <div className="h-4 bg-farm-100 rounded w-4/6"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

