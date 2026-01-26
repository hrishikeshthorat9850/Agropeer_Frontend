import Skeleton from "@/components/ui/Skeleton";

export default function TipSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm"
        >
          {/* Icon & Category */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-12 h-12 rounded-xl" />
            <Skeleton className="h-4 w-24 rounded-md" />
          </div>

          {/* Title */}
          <Skeleton className="h-6 w-3/4 rounded-md mb-3" />

          {/* Description */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}
