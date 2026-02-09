"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Normalize path so "/posts" and "/posts/" are treated as same route
function normalizePath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

// Persists across remounts so we only scroll when route *actually* changed (not on remount with same route)
let lastPathnameScrolled = null;
let previousPathname = null;

// Track if we're navigating back (set by popstate listener)
let isBackNav = false;

// Only scroll when pathname *changed* (not on remount with same route) — prevents posts/infinite-scroll jump
export default function ScrollToTop() {
  const pathname = usePathname();
  const stablePathname = normalizePath(pathname);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Disable browser default scroll restoration
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Listen for popstate (back/forward navigation) to mark as back navigation
    const handlePopState = () => {
      isBackNav = true;
      // Reset flag after navigation completes
      setTimeout(() => {
        isBackNav = false;
      }, 100);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      // window.removeEventListener("scroll", handleScroll); // Removed scroll listener
    };
  }, []);

  useEffect(() => {
    // FORCE SCROLL TO TOP on every navigation
    // This satisfies the requirement: "always page open on top"
    window.scrollTo(0, 0);

    // Safety timeout to ensure it happens after layout shifts
    const t = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 100);

    return () => clearTimeout(t);

    // Update tracking
    lastPathnameScrolled = stablePathname;
    previousPathname = stablePathname;
    isInitialMount.current = false;
  }, [stablePathname]);

  return null;
}
