"use client";
import { motion } from "framer-motion";

export default function MarketSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="h-10 bg-farm-200 rounded-lg w-64 mb-4 animate-pulse"></div>
          <div className="h-12 bg-farm-100 rounded-xl w-full max-w-md animate-pulse"></div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-10 bg-farm-100 rounded-full w-32 animate-pulse"></div>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="farm-card overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-farm-200"></div>
              <div className="p-4">
                <div className="h-5 bg-farm-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-farm-100 rounded w-full mb-2"></div>
                <div className="h-6 bg-farm-200 rounded w-24 mb-3"></div>
                <div className="h-10 bg-farm-200 rounded-xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

