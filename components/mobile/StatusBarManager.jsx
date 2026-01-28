"use client";

import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useTheme } from "@/Context/themecontext";

export default function StatusBarManager() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const setStatusBarStyle = async () => {
      try {
        if (Capacitor.getPlatform() === "android") {
          // We use overlay: true globally for smooth sidebar transitions (green gradient).
          // Main layout must handle pt-safe-top.
          await StatusBar.setOverlaysWebView({ overlay: true });
        }

        // Delay slightly to ensure theme is resolved and native bridge is ready
        setTimeout(async () => {
          if (resolvedTheme === "dark") {
            // Dark Mode: Black Background, White Icons
            await StatusBar.setStyle({ style: Style.Dark });
            if (Capacitor.getPlatform() === "android") {
              await StatusBar.setBackgroundColor({ color: "#000000" });
            }
          } else {
            // Light Mode: White Background, Dark Icons
            await StatusBar.setStyle({ style: Style.Light });
            if (Capacitor.getPlatform() === "android") {
              await StatusBar.setBackgroundColor({ color: "#ffffff" });
            }
          }
        }, 100);
      } catch (error) {
        console.error("Error setting status bar style:", error);
      }
    };

    setStatusBarStyle();

    // Safety check sequence
    const t1 = setTimeout(setStatusBarStyle, 500);
    const t2 = setTimeout(setStatusBarStyle, 2000); // Final check

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [resolvedTheme]);

  return null;
}
