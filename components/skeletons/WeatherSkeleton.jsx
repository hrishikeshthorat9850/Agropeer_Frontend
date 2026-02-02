import React from "react";
import Skeleton from "@/components/ui/Skeleton";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function WeatherSkeleton() {
  return (
    <MobilePageContainer>
      <div className="py-6">
        {/* Header Skeleton */}
        <div className="text-center mb-6 flex flex-col items-center">
          <Skeleton className="h-8 w-48 mb-3 rounded-lg" />
          <Skeleton className="h-6 w-64 mb-6 rounded-lg" />

          {/* Toggle Button Skeleton */}
          <Skeleton className="h-12 w-64 rounded-2xl" />
        </div>

        {/* Weather Card Placeholder */}
        <div className="bg-white/50 dark:bg-zinc-800/50 rounded-3xl p-6 mb-8 border border-gray-100 dark:border-zinc-700 space-y-6">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
            </div>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          <div className="flex justify-center py-4">
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-full rounded-xl" />
          </div>
        </div>

        {/* Farm Management Card Skeleton */}
        <div className="mt-8 text-center">
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg max-w-2xl mx-auto dark:bg-[#272727]">
            <div className="flex justify-center mb-4">
              <Skeleton className="w-14 h-14 md:w-16 md:h-16 rounded-full" />
            </div>
            <div className="space-y-3 flex flex-col items-center">
              <Skeleton className="h-8 w-56 rounded-lg" />
              <Skeleton className="h-4 w-full max-w-xs rounded-lg" />
              <Skeleton className="h-12 w-48 rounded-2xl mt-2" />
            </div>
          </div>
        </div>
      </div>
    </MobilePageContainer>
  );
}
