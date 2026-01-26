"use client";

import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { useTheme } from "@/Context/themecontext";

export default function StatusBarManager() {
  const { theme } = useTheme();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const applyStatusStyle = async () => {
      try {
        // Transparent background to let the app layout (safe-area) show through
        if (Capacitor.getPlatform() === "android") {
          await StatusBar.setOverlaysWebView({ overlay: true });
          await StatusBar.setBackgroundColor({ color: "#00000000" }); // Transparent
        }

        // Set Style based on Theme
        // Light Theme (White bg) -> Light Style (Dark icons)
        // Dark Theme (Black bg) -> Dark Style (Light icons)
        if (theme === "dark") {
          await StatusBar.setStyle({ style: Style.Dark });
        } else {
          await StatusBar.setStyle({ style: Style.Light });
        }
      } catch (err) {
        console.error("StatusBarManager error:", err);
      }
    };

    applyStatusStyle();
  }, [theme]);

  return null;
}
