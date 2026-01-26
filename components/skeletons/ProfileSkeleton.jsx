import Skeleton from "@/components/ui/Skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-[calc(100vh-122px)] py-4 px-2">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1E1E1E] shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:border-[#333]">
        {/* Header / Banner */}
        <div className="h-48 bg-gray-100 dark:bg-[#2C2C2C] relative">
          <Skeleton className="w-full h-full rounded-none" />
        </div>

        <div className="px-8 pb-8">
          {/* Avatar Overlap */}
          <div className="-mt-12 mb-6">
            <Skeleton className="w-24 h-24 rounded-full border-4 border-white dark:border-[#1E1E1E]" />
          </div>

          {/* User Info */}
          <div className="space-y-4 mb-8">
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 rounded-lg" />
              <Skeleton className="h-4 w-32 rounded-lg" />
            </div>

            <div className="space-y-2 max-w-lg">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-4/6 rounded-md" />
            </div>
          </div>

          {/* Stats / Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 bg-gray-50 dark:bg-[#2C2C2C] rounded-xl border border-gray-100 dark:border-[#333]"
              >
                <Skeleton className="h-5 w-32 rounded mb-2" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
