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
        // Overlay is critical for the full-screen feel
        if (Capacitor.getPlatform() === "android") {
          await StatusBar.setOverlaysWebView({ overlay: true });
        }

        // Small delay to ensure bridge is ready and theme is stable
        setTimeout(async () => {
          if (resolvedTheme === "dark") {
            // Dark Mode: Background is Black (or Dark), so we need WHITE Icons
            // Style.Dark => Light Content (White Text)
            await StatusBar.setStyle({ style: Style.Dark });

            // On Android with overlay, setting background color might be transparent/ignored depending on overlay,
            // but we set it just in case overlay is toggled off or for safe areas.
            if (Capacitor.getPlatform() === "android") {
              // We keep it transparent or match theme if needed, but overlay handles the look.
              // Just ensuring contrast.
            }
          } else {
            // Light Mode: Background is White, so we need BLACK Icons
            // Style.Light => Dark Content (Black Text)
            await StatusBar.setStyle({ style: Style.Light });
          }
        }, 50);
      } catch (error) {
        console.error("Error setting status bar style:", error);
      }
    };

    setStatusBarStyle();

    // Safety check: Re-apply after small delay to fix race conditions on app launch
    const t = setTimeout(setStatusBarStyle, 1000);

    return () => clearTimeout(t);
  }, [resolvedTheme]);

  return null;
}
