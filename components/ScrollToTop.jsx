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

// Store scroll positions per route (in-memory)
const scrollPositions = new Map();

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

    // Continuously save scroll position as user scrolls (debounced)
    let scrollSaveTimer = null;
    const handleScroll = () => {
      clearTimeout(scrollSaveTimer);
      scrollSaveTimer = setTimeout(() => {
        const currentPath = window.location.pathname;
        const normalizedPath = normalizePath(currentPath);
        const scrollY = window.scrollY || window.pageYOffset || 0;
        
        if (scrollY > 0 && normalizedPath !== "/posts") {
          scrollPositions.set(normalizedPath, scrollY);
          sessionStorage.setItem(`scroll_${normalizedPath}`, scrollY.toString());
        }
      }, 150);
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollSaveTimer);
    };
  }, []);

  useEffect(() => {
    // Never scroll to top on /posts — infinite scroll page; prevents jump when loading more / reaching end
    if (stablePathname === "/posts") {
      lastPathnameScrolled = stablePathname;
      return;
    }

    // Skip if we're still on the same route (e.g. component remounted)
    if (lastPathnameScrolled === stablePathname) return;

    // Save scroll position of previous route before navigating
    if (previousPathname && previousPathname !== stablePathname) {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY > 0) {
        scrollPositions.set(previousPathname, scrollY);
        // Also save to sessionStorage for persistence
        sessionStorage.setItem(`scroll_${previousPathname}`, scrollY.toString());
      }
    }

    // Check if this is back navigation
    // Method 1: Check popstate flag (set by back button)
    // Method 2: Check if we have saved scroll position for this route
    const savedScroll = scrollPositions.get(stablePathname) || 
                       (typeof window !== "undefined" ? 
                        parseInt(sessionStorage.getItem(`scroll_${stablePathname}`) || "0") : 0);

    const isBackNavigation = isBackNav || 
                            (!isInitialMount.current && 
                             savedScroll > 0 && 
                             previousPathname !== null &&
                             previousPathname !== stablePathname);

    if (isBackNavigation) {
      // Restore scroll position (native Android behavior)
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScroll,
          left: 0,
          behavior: "instant",
        });
      });
    } else {
      // Forward navigation - scroll to top (viewport top = 0).
      // Layout uses pt-mobile-layout on main, so content starts below navbar.
      window.scrollTo(0, 0);
      
      const t = setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      }, 100);
      
      return () => clearTimeout(t);
    }

    // Update tracking
    lastPathnameScrolled = stablePathname;
    previousPathname = stablePathname;
    isInitialMount.current = false;
  }, [stablePathname]);

  return null;
}
