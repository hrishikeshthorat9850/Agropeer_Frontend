"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Normalize path so "/posts" and "/posts/" are treated as same route
function normalizePath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

// Only scroll when pathname *changed* (not on remount with same route) — prevents posts/infinite-scroll jump
export default function ScrollToTop() {
  const pathname = usePathname();
  const stablePathname = normalizePath(pathname);

  useEffect(() => {
    // Disable browser default scroll restoration
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // 1. Immediate scroll (optional, but good for "instant" feel if transition allows)
    window.scrollTo(0, 0);

    // 2. Delayed scroll to ensure we hit AFTER PageTransition (mode="wait" takes ~200ms)
    //    and after new content renders.
    const t = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 100); // Small delay to catch post-render

    const t2 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300); // Longer delay to match transition end

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [stablePathname]);

  return null;
}
