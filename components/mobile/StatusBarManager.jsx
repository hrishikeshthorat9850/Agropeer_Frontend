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
        if (Capacitor.getPlatform() === "android") {
          // Keep overlay true so content goes behind, but set color as requested
          // Note: If color is opaque, it might obscure content depending on OS version
          // User requested: Dark -> Black, Light -> White
          await StatusBar.setOverlaysWebView({ overlay: true });
        }

        if (theme === "dark") {
          // Dark Theme: Black Background, Light Icons
          await StatusBar.setStyle({ style: Style.Dark });
          if (Capacitor.getPlatform() === "android") {
             await StatusBar.setBackgroundColor({ color: "#000000" });
          }
        } else {
          // Light Theme: White Background, Dark Icons
          await StatusBar.setStyle({ style: Style.Light });
           if (Capacitor.getPlatform() === "android") {
             await StatusBar.setBackgroundColor({ color: "#ffffff" });
          }
        }
      } catch (err) {
        console.error("StatusBarManager error:", err);
      }
    };

    applyStatusStyle();
  }, [theme]);

  return null;
}
