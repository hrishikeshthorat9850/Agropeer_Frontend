"use client";

/**
 * Skeleton Primitive
 * A premium loading placeholder with shimmer effect.
 *
 * @param {string} className - Additional classes (width, height, rounding)
 * @param {boolean} show - Conditionally render (optional)
 */
export default function Skeleton({ className, show = true, ...props }) {
  if (!show) return null;

  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-zinc-800 rounded-md ${
        className || ""
      }`}
      {...props}
    />
  );
}
