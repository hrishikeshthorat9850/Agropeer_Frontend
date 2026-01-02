"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useLanguage } from "@/Context/languagecontext";

export default function AuthCallback() {
  const router = useRouter();
  const { t } = useLanguage();
  const isNative = Capacitor.isNativePlatform();

  useEffect(() => {
    const finish = async () => {
      try {
        // Wait a moment for hash/query params to be available
        await new Promise(resolve => setTimeout(resolve, 300));

        // Get the current URL with hash/query params
        const currentUrl = window.location.href;
        console.log("Callback URL:", currentUrl);

        // Extract hash from URL if present (Supabase uses hash for tokens)
        const hashIndex = currentUrl.indexOf("#");
        let hash = "";
        if (hashIndex !== -1) {
          hash = currentUrl.substring(hashIndex + 1); // Remove the # symbol
        }

        // Extract query parameters if present
        const queryIndex = currentUrl.indexOf("?");
        let searchParams = "";
        if (queryIndex !== -1 && hashIndex === -1) {
          searchParams = currentUrl.substring(queryIndex + 1); // Remove the ? symbol
        }

        // Parse tokens from hash or query params
        let accessToken = null;
        let refreshToken = null;

        if (hash) {
          // Parse hash parameters (format: access_token=xxx&refresh_token=xxx&expires_in=xxx)
          const hashParams = new URLSearchParams(hash);
          accessToken = hashParams.get("access_token");
          refreshToken = hashParams.get("refresh_token");
        } else if (searchParams) {
          // Parse query parameters
          const queryParams = new URLSearchParams(searchParams);
          accessToken = queryParams.get("access_token");
          refreshToken = queryParams.get("refresh_token");
        }

        // If we have tokens, set the session manually
        if (accessToken && refreshToken) {
          // Set the session - this will persist it to localStorage
          const { data: sessionResult, error: setSessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (setSessionError) {
            console.error("Set session error:", setSessionError);
            router.replace("/login?error=" + encodeURIComponent(setSessionError.message || t("failed_set_session")));
            return;
          }

          // Verify session was set successfully
          if (!sessionResult?.session) {
            console.error("Session not created after setSession");
            router.replace("/login?error=" + encodeURIComponent(t("failed_create_session")));
            return;
          }
        } else {
          // If no tokens found, try to get session from hash (fallback)
          // Supabase should auto-parse the hash if it's in window.location.hash
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();

          if (sessionError || !session) {
            console.error("Session error:", sessionError);
            router.replace("/login?error=" + encodeURIComponent(sessionError?.message || t("failed_create_session")));
            return;
          }
        }

        // Verify session was created
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          console.error("Session error:", sessionError);
          router.replace("/login?error=" + encodeURIComponent(sessionError?.message || t("failed_create_session")));
          return;
        }

        // Check if user is authenticated
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("User error:", userError);
          router.replace("/login?error=" + encodeURIComponent(userError?.message || t("failed_get_user")));
          return;
        }

        // Success - redirect to home
        console.log("✅ OAuth callback successful");
        router.replace("/home");
      } catch (err) {
        console.error("Auth callback error:", err);
        router.replace("/login?error=" + encodeURIComponent(err.message || t("auth_failed")));
      }
    };

    finish();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600 dark:text-gray-400">{t("completing_sign_in")}</p>
      </div>
    </div>
  );
}
