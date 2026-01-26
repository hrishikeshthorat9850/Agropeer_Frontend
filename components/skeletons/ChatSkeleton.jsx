import Skeleton from "@/components/ui/Skeleton";

export default function ChatSkeleton() {
  return (
    <div className="flex h-[calc(100vh-122px)] bg-white dark:bg-black">
      {/* Sidebar Skeleton */}
      <div className="hidden md:block w-80 border-r border-gray-100 dark:border-zinc-800 p-4 space-y-4">
        <Skeleton className="h-10 w-full rounded-lg" /> {/* Search */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-900"
            >
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/2 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-gray-100 dark:border-zinc-800 p-4 flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="h-5 w-32 rounded-md" />
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-6 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`flex ${
                i % 2 === 0 ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-2xl ${
                  i % 2 === 0 ? "rounded-tr-none" : "rounded-tl-none"
                }`}
              >
                <Skeleton
                  className={`h-12 w-48 rounded-2xl ${
                    i % 2 === 0 ? "bg-green-100/50 dark:bg-green-900/20" : ""
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
