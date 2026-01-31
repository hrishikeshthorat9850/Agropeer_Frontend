"use client";

import { useEffect } from "react";

export default function MobilePageContainer({
  children,
  className = "",
  fullWidth = false,
  noPadding = false,
  scrollOnMount = true,
}) {
  // Ensure page always opens at the top (skip when scrollOnMount=false for infinite-scroll pages)
  useEffect(() => {
    if (scrollOnMount) {
      window.scrollTo(0, 0);
    }
  }, [scrollOnMount]);

  return (
    <div
      className={`
        ${fullWidth ? "w-full" : "w-full max-w-full"}
        ${noPadding ? "" : "px-0"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
