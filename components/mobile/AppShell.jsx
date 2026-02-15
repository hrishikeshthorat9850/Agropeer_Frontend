"use client";
import { App } from "@capacitor/app";
import { useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { useEffect, useState, useRef } from "react";
import { Toast } from "@capacitor/toast";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";
import { useBackHandler } from "@/Context/BackHandlerContext";
import { playBackAnimation } from "@/utils/backTransition";

const DOUBLE_BACK_TIMEOUT = 2000;

export default function AppShell({ children }) {
  const router = useRouter(); // Initialize router
  const backPressedOnce = useRef(false);
  const backButtonTimer = useRef(null);

  const { showToast } = useToast();
  const { t } = useLanguage();
  const { handleBack } = useBackHandler();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const listener = App.addListener("backButton", async ({ canGoBack }) => {
      // 1. Check if any components (modals, etc.) want to handle the back press
      const handled = await handleBack();
      if (handled) {
        return;
      }

      if (canGoBack) {
        // ENHANCED: Wrap navigation with smooth transition
        // Use router.back() for better Next.js processing
        playBackAnimation(() => {
          router.back();
        });
        return;
      }
      // ... rest of logic

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
