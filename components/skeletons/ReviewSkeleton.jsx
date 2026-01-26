import Skeleton from "@/components/ui/Skeleton";

export default function ReviewSkeleton({ count = 3 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-6 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-32 rounded-md" />
              <Skeleton className="h-4 w-24 rounded-md" />
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="w-4 h-4 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2 mb-4">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-4/6 rounded-md" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-20 rounded-md" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
