"use client";
import { motion } from "framer-motion";

export default function HomeSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)]">
      {/* Hero Section Skeleton */}
      <div className="bg-gradient-to-r from-farm-500 to-farm-600 py-16 px-4 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-12 bg-white/20 rounded-lg w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-white/20 rounded-lg w-80 mx-auto mb-6 animate-pulse"></div>
          <div className="h-12 bg-white/20 rounded-xl w-48 mx-auto animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Quick Actions Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="farm-card p-6 text-center animate-pulse">
              <div className="w-16 h-16 bg-farm-200 rounded-full mx-auto mb-4"></div>
              <div className="h-5 bg-farm-200 rounded w-24 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="farm-card p-6 animate-pulse">
              <div className="h-8 bg-farm-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-farm-100 rounded w-24"></div>
            </div>
          ))}
        </div>

        {/* Posts Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="farm-card p-6 animate-pulse"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-farm-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-5 bg-farm-200 rounded w-32 mb-2"></div>
                  <div className="h-4 bg-farm-100 rounded w-24"></div>
                </div>
              </div>
              <div className="h-48 bg-farm-200 rounded-xl mb-4"></div>
              <div className="flex items-center gap-6">
                <div className="h-6 bg-farm-100 rounded w-16"></div>
                <div className="h-6 bg-farm-100 rounded w-16"></div>
                <div className="h-6 bg-farm-100 rounded w-16"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

