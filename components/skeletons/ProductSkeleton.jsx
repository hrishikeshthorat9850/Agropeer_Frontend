import Skeleton from "@/components/ui/Skeleton";

export default function ProductSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-[#1E1E1E] rounded-3xl border border-gray-100 dark:border-[#333] overflow-hidden"
        >
          {/* Image Skeleton */}
          <Skeleton className="w-full h-56 rounded-none" />

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Title & Price */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4 rounded-md" />
              <Skeleton className="h-8 w-1/2 rounded-md" />
            </div>

            {/* Seller user info with avatar */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-[#2C2C2C]">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-full" />
            </div>

            {/* Location */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-full rounded-lg" />
            </div>

            {/* Buttons */}
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-10 flex-1 rounded-xl" />
              <Skeleton className="h-10 w-12 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
