"use client";
import { motion } from "framer-motion";

export default function ChatSkeleton() {
  return (
    <div className="flex h-[calc(100vh-122px)]">
      {/* Sidebar Skeleton */}
      <div className="w-full md:w-80 border-r border-farm-200 p-4 space-y-4 animate-pulse">
        <div className="h-12 bg-farm-200 rounded-lg mb-4"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3">
            <div className="w-12 h-12 bg-farm-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-farm-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-farm-100 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area Skeleton */}
      <div className="flex-1 flex flex-col animate-pulse">
        <div className="h-16 bg-farm-100 border-b border-farm-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-farm-200 rounded-full"></div>
            <div className="h-5 bg-farm-200 rounded w-32"></div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs p-3 rounded-lg ${i % 2 === 0 ? 'bg-farm-200' : 'bg-farm-100'}`}>
                <div className="h-4 bg-white/50 rounded w-48 mb-2"></div>
                <div className="h-3 bg-white/50 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-16 bg-farm-100 border-t border-farm-200 p-4">
          <div className="h-10 bg-farm-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}

