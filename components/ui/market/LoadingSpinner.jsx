"use client";

import LoadingSpinner from "@/components/LoadingSpinner";

export default function MarketLoadingSpinner({
  message = "Loading, please wait...",
}) {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <LoadingSpinner text={message} size="lg" />
    </div>
  );
}
