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

    const scrollToTop = () => {
      // 1. Window
      window.scrollTo(0, 0);

      // 2. Document Body / HTML
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;

      // 3. Main Content Wrapper (if it exists and has overflow)
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    };

    // Immediate
    scrollToTop();

    // Safety timeouts to ensure it happens after layout shifts/rendering
    const t1 = setTimeout(scrollToTop, 10);
    const t2 = setTimeout(scrollToTop, 100);
    const t3 = setTimeout(scrollToTop, 300); // For slower mobile devices

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };

    // Update tracking
    lastPathnameScrolled = stablePathname;
    previousPathname = stablePathname;
    isInitialMount.current = false;
  }, [stablePathname]);

  return null;
}
