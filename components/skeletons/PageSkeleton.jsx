import Skeleton from "@/components/ui/Skeleton";

export default function PageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)] py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <Skeleton className="h-10 w-64 mx-auto rounded-lg" />
          <Skeleton className="h-5 w-96 mx-auto rounded-lg" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-gray-100 dark:border-zinc-800 space-y-4"
            >
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
                <Skeleton className="h-4 w-4/6 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
