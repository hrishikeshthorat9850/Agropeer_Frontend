"use client";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState, useRef } from "react";
import { Toast } from "@capacitor/toast"; // Import Toast
// import ExitConfirmModal from "./ExitConfirmModal"; // Removed
import useToast from "@/hooks/useToast";

// Define the timeout duration for the double-tap (e.g., 2 seconds)
const DOUBLE_BACK_TIMEOUT = 2000;

export default function AppShell({ children }) {
  const backPressedOnce = useRef(false);
  const backButtonTimer = useRef(null);

  const { showToast } = useToast();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listener = App.addListener("backButton", ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back();
        return;
      }

      if (backPressedOnce.current) {
        App.exitApp();
        return;
      }

      backPressedOnce.current = true;

      // Show native toast "Press back again to exit"
      Toast.show({
        text: "Press back again to exit",
        duration: "short",
        position: "bottom",
      }).catch((e) => console.error("Toast error", e));

      // Clear any existing timer and set a new one
      if (backButtonTimer.current) {
        clearTimeout(backButtonTimer.current);
      }

      backButtonTimer.current = setTimeout(() => {
        backPressedOnce.current = false;
        backButtonTimer.current = null;
      }, DOUBLE_BACK_TIMEOUT);
    });

    return () => {
      listener.remove();
      // Clean up the timer when the component unmounts
      if (backButtonTimer.current) {
        clearTimeout(backButtonTimer.current);
      }
    };
  }, [showToast]);

  return <>{children}</>;
}
