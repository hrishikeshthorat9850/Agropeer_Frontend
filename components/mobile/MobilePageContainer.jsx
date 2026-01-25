"use client";

import { useEffect } from "react";

/**
 * MobilePageContainer - Container for page content with consistent styling
 *
 * Use this to wrap page content for consistent spacing and styling
 */
export default function MobilePageContainer({
  children,
  className = "",
  fullWidth = false,
  noPadding = false,
}) {
  // Ensure page always opens at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
