"use client";

/**
 * MobilePageContainer - Container for page content with consistent styling
 * 
 * Use this to wrap page content for consistent spacing and styling
 */
export default function MobilePageContainer({ 
  children, 
  className = "",
  fullWidth = false,
  noPadding = false 
}) {
  return (
    <div
      className={`
        ${fullWidth ? "w-full" : "w-full max-w-full"}
        ${noPadding ? "" : "px-4"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

