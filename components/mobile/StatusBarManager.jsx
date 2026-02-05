"use client";

import { useEffect, useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useTheme } from "@/Context/themecontext";

export default function StatusBarManager() {
  const { theme } = useTheme();
  const [isInitialized, setIsInitialized] = useState(false);

  // Native Android: Set status bar immediately on mount (no delay)
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const applyStatusBar = async () => {
      try {
        const platform = Capacitor.getPlatform();
        
        // Set overlay immediately for native feel
        if (platform === "android") {
          await StatusBar.setOverlaysWebView({ overlay: true });
        }

        // Determine theme: prioritize context theme, fallback to localStorage, then light (native Android default)
        let currentTheme = theme;
        if (!currentTheme && typeof window !== "undefined") {
          const savedTheme = localStorage.getItem("theme");
          currentTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
        }
        currentTheme = currentTheme || "light";

        if (currentTheme === "dark") {
          // Dark Mode: Black background, White icons
          await StatusBar.setStyle({ style: Style.Dark });
          if (platform === "android") {
            await StatusBar.setBackgroundColor({ color: "#000000" });
          }
        } else {
          // Light Mode: White background, Black icons (native Android default)
          await StatusBar.setStyle({ style: Style.Light });
          if (platform === "android") {
            await StatusBar.setBackgroundColor({ color: "#FFFFFF" });
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Error setting status bar style:", error);
        // Fallback: try again after a short delay if first attempt fails
        setTimeout(() => {
          applyStatusBar();
        }, 100);
      }
    };

    // Apply immediately (native Android behavior)
    applyStatusBar();

    // Safety re-apply after theme context is fully loaded (handles race conditions)
    const safetyTimer = setTimeout(() => {
      applyStatusBar();
    }, 200);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, [theme]);

  // Update status bar when theme changes (after initial load)
  useEffect(() => {
    if (!Capacitor.isNativePlatform() || !isInitialized) return;

    const updateStatusBar = async () => {
      try {
        const platform = Capacitor.getPlatform();
        const currentTheme = theme || "light";

        if (currentTheme === "dark") {
          await StatusBar.setStyle({ style: Style.Dark });
          if (platform === "android") {
            await StatusBar.setBackgroundColor({ color: "#000000" });
          }
        } else {
          await StatusBar.setStyle({ style: Style.Light });
          if (platform === "android") {
            await StatusBar.setBackgroundColor({ color: "#FFFFFF" });
          }
        }
      } catch (error) {
        console.error("Error updating status bar style:", error);
      }
    };

    updateStatusBar();
  }, [theme, isInitialized]);

  return null;
}
