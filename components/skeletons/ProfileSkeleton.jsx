"use client";
import { motion } from "framer-motion";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)] py-4 px-2">
      <div className="max-w-4xl mx-auto bg-green-50 shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:bg-[#272727] animate-pulse">
        {/* Header */}
        <div className="bg-gradient-to-r from-farm-500 to-farm-600 p-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full"></div>
            <div className="flex-1">
              <div className="h-8 bg-white/20 rounded-lg w-48 mb-3"></div>
              <div className="h-5 bg-white/20 rounded-lg w-32"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Bio Section */}
          <div>
            <div className="h-6 bg-farm-200 rounded-lg w-24 mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-farm-100 rounded w-full"></div>
              <div className="h-4 bg-farm-100 rounded w-5/6"></div>
              <div className="h-4 bg-farm-100 rounded w-4/6"></div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-4 bg-white rounded-xl">
                <div className="h-5 bg-farm-100 rounded w-32 mb-2"></div>
                <div className="h-4 bg-farm-200 rounded w-24"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

