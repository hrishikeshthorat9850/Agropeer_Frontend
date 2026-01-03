"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useLanguage } from "@/Context/languagecontext";

export default function ResetPasswordCallback() {
  const { t } = useLanguage();
  const router = useRouter();
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait a moment for hash/query params to be available
        await new Promise(resolve => setTimeout(resolve, 300));

        // Get the current URL with hash/query params
        const currentUrl = window.location.href;
        console.log("Reset password callback URL:", currentUrl);

        // Extract hash from URL if present (Supabase uses hash for tokens)
        const hashIndex = currentUrl.indexOf("#");
        let hash = "";
        if (hashIndex !== -1) {
          hash = currentUrl.substring(hashIndex);
        }

        // Extract query parameters if present
        const queryIndex = currentUrl.indexOf("?");
        let queryParams = "";
        if (queryIndex !== -1) {
          queryParams = currentUrl.substring(queryIndex);
        }

        // Check if we're on a mobile device (app or browser)
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
        const isAndroid = /android/i.test(userAgent);

        if (isNative) {
          // On mobile app (Capacitor), redirect to deep link with hash/query params
          // This allows the MobileResetPasswordHandler to process it
          const deepLinkUrl = `agropeer://reset-password${queryParams}${hash}`;
          console.log("Redirecting to deep link from app:", deepLinkUrl);

          // Try to close browser if open
          try {
            await Browser.close();
          } catch {
            console.log("Browser already closed or not open");
          }

          // Small delay to ensure browser closes before redirect
          await new Promise(resolve => setTimeout(resolve, 300));

          // Redirect to deep link - this will trigger appUrlOpen event
          window.location.replace(deepLinkUrl);
        } else if (isMobile) {
          // On mobile browser (not in app), redirect to deep link
          // This will open the app if installed
          const deepLinkUrl = `agropeer://reset-password${queryParams}${hash}`;
          console.log("Redirecting to deep link from mobile browser:", deepLinkUrl);

          if (isAndroid) {
            // Use Intent URL format for Android browsers (more reliable)
            // This will open the app if installed, or fallback to Play Store
            const intentUrl = `intent://reset-password${queryParams}${hash}#Intent;scheme=agropeer;package=com.hrishikesh.agrogram;end`;
            console.log("Using Android Intent URL:", intentUrl);
            window.location.replace(intentUrl);

            // Fallback: try direct deep link after a delay
            setTimeout(() => {
              window.location.replace(deepLinkUrl);
            }, 1000);
          } else {
            // For iOS or other platforms, try direct deep link
            window.location.replace(deepLinkUrl);
          }
        } else {
          // On web (desktop), extract tokens and set session, then redirect to reset password page
          if (hash) {
            // Set hash in window.location so Supabase can read it
            window.location.hash = hash;
            await new Promise(resolve => setTimeout(resolve, 200));
          }

          // Let Supabase read the session from hash
          const { data, error } = await supabase.auth.getSession();

          if (error || !data.session) {
            console.error("Reset password session error:", error);
            router.replace("/login?error=invalid_recovery_link");
            return;
          }

          // Redirect to reset password page
          router.replace("/reset-password");
        }
      } catch (err) {
        console.error("Reset password callback error:", err);
        router.replace("/login?error=" + encodeURIComponent(err.message || "Failed to process reset link"));
      }
    };

    handleCallback();
  }, [router, isNative]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {isNative ? t("opening_app") : t("processing_reset_link")}
        </p>
      </div>
    </div>
  );
}

