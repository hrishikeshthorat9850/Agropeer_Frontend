import Skeleton from "@/components/ui/Skeleton";
import ProductSkeleton from "./ProductSkeleton";

export default function MarketSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-10 w-64 rounded-lg" />
          <Skeleton className="h-12 w-full max-w-md rounded-xl" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-32 rounded-full" />
          ))}
        </div>

        {/* Products Grid - Reusing ProductSkeleton logic manually or importing if needed */}
        {/* Since ProductSkeleton expects a count, we can just use the grid here directly or compose it */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-gray-100 dark:border-[#333] overflow-hidden"
            >
              <Skeleton className="w-full h-48 rounded-none" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-24 rounded-lg" />
                  <Skeleton className="h-8 w-16 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
