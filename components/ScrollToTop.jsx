"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Normalize path so "/posts" and "/posts/" are treated as same route
function normalizePath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

// Persists across remounts so we only scroll when route *actually* changed (not on remount with same route)
let lastPathnameScrolled = null;

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
    // Never scroll to top on /posts — infinite scroll page; prevents jump when loading more / reaching end
    if (stablePathname === "/posts") {
      lastPathnameScrolled = stablePathname;
      return;
    }
    // Skip if we're still on the same route (e.g. component remounted)
    if (lastPathnameScrolled === stablePathname) return;
    lastPathnameScrolled = stablePathname;

    window.scrollTo(0, 0);

    const t = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 100);

    const t2 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 300);

    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [stablePathname]);

  return null;
}
