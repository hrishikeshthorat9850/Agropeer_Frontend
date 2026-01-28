"use client";

import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useTheme } from "@/Context/themecontext";

export default function StatusBarManager() {
  const { theme } = useTheme();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const setStatusBarStyle = async () => {
      try {
        if (Capacitor.getPlatform() === "android") {
          // Ensure overlay is set correctly first
          await StatusBar.setOverlaysWebView({ overlay: true });
        }

        if (theme === "dark") {
          await StatusBar.setStyle({ style: Style.Dark });
          if (Capacitor.getPlatform() === "android") {
            await StatusBar.setBackgroundColor({ color: "#000000" });
          }
        } else {
          await StatusBar.setStyle({ style: Style.Light });
          if (Capacitor.getPlatform() === "android") {
            // Explicitly set white for light mode
            await StatusBar.setBackgroundColor({ color: "#ffffff" });
          }
        }
      } catch (error) {
        console.error("Error setting status bar style:", error);
      }
    };

    // Run immediately
    setStatusBarStyle();

    // Also set up a listener for app state changes if needed, but usually theme change is enough.
    // We add a small delay to ensure native webview is ready if this is mounting on app launch
    const timeoutId = setTimeout(setStatusBarStyle, 500);

    return () => clearTimeout(timeoutId);
  }, [theme]);

  return null;
}
