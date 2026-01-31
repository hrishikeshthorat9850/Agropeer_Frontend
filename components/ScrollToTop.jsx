"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Normalize path so "/posts" and "/posts/" are treated as same route
function normalizePath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

// Only scroll when pathname *changed* (not on remount with same route) — prevents posts/infinite-scroll jump
let lastPathnameScrolled = null;

/**
 * ScrollToTop - Ensures the page starts at the top on navigation
 *
 * Listens for pathname changes and scrolls to (0, 0). Only scrolls when the
 * pathname actually changes, so remounts (e.g. after loading more on posts) don't jump.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const stablePathname = normalizePath(pathname);

  useEffect(() => {
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Scroll only when we actually navigated to a different route (not on remount / same route)
    if (lastPathnameScrolled === stablePathname) return;
    lastPathnameScrolled = stablePathname;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [stablePathname]);

  return null;
}
