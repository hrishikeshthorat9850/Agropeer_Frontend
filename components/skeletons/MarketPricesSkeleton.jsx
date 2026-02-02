import React from "react";
import Skeleton from "@/components/ui/Skeleton";

export default function MarketPricesSkeleton() {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen font-sans">
      {/* Sticky App Bar Skeleton */}
      <div className="relative z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-white/5 px-4 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-6 w-40 rounded-lg" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-lg mx-auto w-full">
        {/* Sticky Filters Block Skeleton */}
        <div className="sticky top-[60px] z-30 bg-gray-50 dark:bg-black pt-2 pb-2 px-4 space-y-3">
          {/* Search Bar */}
          <Skeleton className="h-12 w-full rounded-2xl" />
          {/* Filter Chips */}
          <div className="flex gap-2 overflow-hidden">
            <Skeleton className="h-9 w-24 rounded-full flex-shrink-0" />
            <Skeleton className="h-9 w-24 rounded-full flex-shrink-0" />
            <Skeleton className="h-9 w-24 rounded-full flex-shrink-0" />
            <Skeleton className="h-9 w-24 rounded-full flex-shrink-0" />
          </div>
        </div>

        {/* Content Padding */}
        <div className="px-4 py-2 space-y-4">
          {/* Loading State for States (optional mimic) */}
          <div className="flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-900/10 py-2 rounded-lg mb-4">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3 w-32 rounded-full" />
          </div>

          {/* Market List Items Skeleton */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-3 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40 rounded-md" />
                  <Skeleton className="h-3 w-24 rounded-md" />
                </div>
                <Skeleton className="h-8 w-20 rounded-lg" />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <Skeleton className="h-10 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
