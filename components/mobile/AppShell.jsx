"use client";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState, useRef } from "react";
import { Toast } from "@capacitor/toast"; // Import Toast
// import ExitConfirmModal from "./ExitConfirmModal"; // Removed
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";
import { useBackHandler } from "@/Context/BackHandlerContext";
// ADDITIVE ENHANCEMENT: Import smooth back transition utility
// This does NOT replace existing logic - it only enhances UI transitions
import { playBackAnimation } from "@/utils/backTransition";

// Define the timeout duration for the double-tap (e.g., 2 seconds)
const DOUBLE_BACK_TIMEOUT = 2000;

export default function AppShell({ children }) {
  const backPressedOnce = useRef(false);
  const backButtonTimer = useRef(null);

  const { showToast } = useToast();
  const { t } = useLanguage();
  const { handleBack } = useBackHandler();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    /**
     * EXISTING BACK BUTTON HANDLER (PRESERVED)
     *
     * Original logic remains unchanged:
     * - Checks canGoBack flag
     * - Implements double-tap-to-exit
     * - Shows toast for exit confirmation
     * - Manages timer state
     *
     * ENHANCEMENT (Additive):
     * - Wraps window.history.back() with smooth transition
     * - Does NOT modify decision logic
     * - Does NOT change exit app behavior
     * - Does NOT affect double-tap timing
     */
    const listener = App.addListener("backButton", async ({ canGoBack }) => {
      // 1. Check if any components (modals, etc.) want to handle the back press
      const handled = await handleBack();
      if (handled) {
        return;
      }

      if (canGoBack) {
        // ENHANCED: Wrap existing navigation with smooth transition
        // Original behavior: window.history.back()
        // Enhanced behavior: playBackAnimation(() => window.history.back())
        // This preserves ALL existing logic while adding UI transitions
        playBackAnimation(() => {
          window.history.back();
        });
        return;
      }

      // EXIT APP LOGIC (Unchanged - no transition needed for immediate exit)
      if (backPressedOnce.current) {
        App.exitApp();
        return;
      }

      backPressedOnce.current = true;

      // Show native toast "Press back again to exit"
      Toast.show({
        text: t("press_back_exit"),
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
  }, [showToast, t]);

  return <>{children}</>;
}
