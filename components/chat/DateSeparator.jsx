"use client";
import React from "react";

export default function DateSeparator({ date }) {
  if (!date) return null;

  const formatDate = (inputDate) => {
    const today = new Date();
    const msgDate = new Date(inputDate);
    const diffDays = Math.floor(
      (today.setHours(0, 0, 0, 0) - msgDate.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) {
      return msgDate.toLocaleDateString("en-US", { weekday: "long" });
    }
    return msgDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex justify-center my-4">
      <span className="bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
        {formatDate(date)}
      </span>
    </div>
  );
}
