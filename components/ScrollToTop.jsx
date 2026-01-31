"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop - Ensures the page starts at the top on navigation
 *
 * This component listens for pathname changes and forces the window
 * to scroll to coordinates (0, 0). It also disables the browser's
 * automatic scroll restoration to prevent conflicts.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Disable native browser scroll restoration
    if (typeof window !== "undefined" && window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Force scroll to top on route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant to prevent weird smooth scrolling on page load
    });
  }, [pathname]);

  return null;
}
