"use client";
import React from "react";

export default function UnreadBadge({ count }) {
  if (!count || count < 1) return null;

  return (
    <div className="flex justify-center items-center bg-green-500 text-white text-xs font-semibold min-w-[20px] h-[20px] rounded-full px-1.5 shadow-md select-none">
      {count > 99 ? "99+" : count}
    </div>
  );
}
