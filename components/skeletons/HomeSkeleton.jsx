import Skeleton from "@/components/ui/Skeleton";

export default function HomeSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)] pt-4 max-w-7xl mx-auto px-4 space-y-8">
      {/* 1. Hero / Header Skeleton */}
      <div className="bg-gradient-to-r from-farm-50/50 to-white dark:from-zinc-900 dark:to-zinc-950 p-6 rounded-3xl border border-farm-100 dark:border-zinc-800">
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-8 w-64 rounded-xl" />
          <div className="flex gap-4 mt-2">
            <Skeleton className="h-20 w-32 rounded-2xl" />
            <Skeleton className="h-20 w-32 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* 2. Feature Grid Skeleton (Small icons) */}
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <Skeleton className="h-14 w-14 rounded-2xl" />
            <Skeleton className="h-3 w-10 rounded-full" />
          </div>
        ))}
      </div>

      {/* 3. Feed Cards Skeleton */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>

        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-zinc-900 rounded-3xl p-4 border border-gray-100 dark:border-zinc-800 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="h-3 w-16 rounded-full" />
              </div>
            </div>
            {/* Image */}
            <Skeleton className="h-64 w-full rounded-2xl" />
            {/* Actions */}
            <div className="flex gap-3">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-16 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
