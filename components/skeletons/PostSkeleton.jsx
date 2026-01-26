import Skeleton from "@/components/ui/Skeleton";

export default function PostSkeleton({ count = 3 }) {
  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-sm"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-3 w-20 rounded-md" />
            </div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>

          {/* Image Skeleton - Square aspect ratio */}
          <Skeleton className="w-full aspect-square sm:aspect-video rounded-2xl mb-4" />

          {/* Action Bar */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex gap-4">
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>

          {/* Content Lines */}
          <div className="space-y-2 px-1">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-5/6 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
