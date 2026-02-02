import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function ExploreSkeleton() {
  return (
    <MobilePageContainer>
      <div className="pb-6 pt-2">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* Header Skeleton */}
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md py-4 -mx-4 px-4 mb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48 rounded-lg" />
                <Skeleton className="h-4 w-64 rounded-lg" />
              </div>
              <Skeleton className="w-10 h-10 rounded-full" />
            </div>

            {/* Search Bar Skeleton */}
            <Skeleton className="w-full h-12 rounded-2xl" />
          </div>

          <div className="space-y-8">
            {/* Tools Grid Skeleton */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32 rounded-lg" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-32 bg-gray-100 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 p-4 flex flex-col justify-between items-start animate-pulse"
                  >
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <Skeleton className="w-24 h-4 rounded-md" />
                  </div>
                ))}
              </div>
            </div>

            {/* Crop Discovery Section Skeleton */}
            <div className="space-y-4">
              {/* Categories */}
              <div className="flex gap-3 overflow-hidden pb-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-10 w-24 rounded-full flex-shrink-0"
                  />
                ))}
              </div>

              {/* Crops Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-gray-100 dark:border-zinc-800 shadow-sm space-y-3"
                  >
                    <div className="flex justify-center">
                      <Skeleton className="w-20 h-20 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="w-3/4 h-5 mx-auto rounded-md" />
                      <Skeleton className="w-1/2 h-4 mx-auto rounded-md" />
                    </div>
                    <div className="pt-2">
                      <Skeleton className="w-full h-10 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Section Skeleton */}
            <Skeleton className="w-full h-24 rounded-3xl" />
          </div>
        </div>
      </div>
    </MobilePageContainer>
  );
}
