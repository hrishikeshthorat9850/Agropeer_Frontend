"use client";
import React from "react";

export default function LoadingSkeleton({ lines = 6 }) {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 bg-gray-200 dark:bg-neutral-800 rounded-md animate-pulse" />
      ))}
    </div>
  );
}
