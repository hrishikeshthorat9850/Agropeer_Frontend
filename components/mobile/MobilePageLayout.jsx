"use client";

import { usePathname } from "next/navigation";
import { Capacitor } from "@capacitor/core";

/**
 * MobilePageLayout - Clean layout wrapper for all Android app pages
 * 
 * Features:
 * - Consistent padding for navbar and bottom nav
 * - Safe area insets support
 * - Scrollable content area
 * - No padding for auth pages
 * - Automatic background colors
 */
export default function MobilePageLayout({ children, className = "" }) {
  const pathname = usePathname();
  const isNative = Capacitor.isNativePlatform();
  
  // Routes that should have no padding (full screen)
  const noPaddingRoutes = [
    "/login",
    "/signup",
    "/register",
    "/admin/login",
    "/forgot-password",
    "/reset-password",
    "/auth/callback",
  ];

  // Routes that should hide navbar/bottom nav
  const noUIRoutes = [
    "/login",
    "/signup",
    "/register",
    "/admin/login",
    "/forgot-password",
    "/reset-password",
  ];

  const hasNoPadding = noPaddingRoutes.includes(pathname);
  const hasNoUI = noUIRoutes.includes(pathname);
  const isAdminRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";

  // Calculate padding based on whether UI elements are shown
  const getPaddingClasses = () => {
    if (hasNoPadding || hasNoUI) {
      return "";
    }

    // Standard mobile pages with navbar and bottom nav
    // Top padding for navbar, bottom padding for bottom nav
    return `
      pt-[calc(56px+env(safe-area-inset-top,0px))]
      pb-[calc(70px+env(safe-area-inset-bottom,0px))]
    `;
  };

  // Get background color based on route
  const getBackgroundColor = () => {
    if (hasNoPadding) {
      return ""; // Let page handle its own background
    }
    if (isAdminRoute) {
      return "bg-gray-50 dark:bg-gray-900";
    }
    return "bg-[#FAF7F2] dark:bg-[#0d0d0d]";
  };

  return (
    <div
      className={`
        w-full min-h-screen
        ${getBackgroundColor()}
        ${getPaddingClasses()}
        ${className}
      `}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
}

