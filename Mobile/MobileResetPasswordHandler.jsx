"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export function MobileResetPasswordHandler() {
  const router = useRouter();

  useEffect(() => {

    const handleResetPassword = async ({ url }) => {
      console.log("🔑 Deep link received:", url);

      // 1. Check if it's a reset password link (agropeer://reset-password OR agropeer://reset-password-callback)
      //    Supabase might redirect to the callback URL which then redirects to the app scheme
      const isRecovery = url.includes("reset-password");
      if (!isRecovery) return;

      try {
        // 2. Close Browser if open
        try {
          await Browser.close();
        } catch (e) { /* ignore */ }

        // 3. Parse the URL
        //    The URL might be agropeer://reset-password?code=... (PKCE)
        //    OR agropeer://reset-password#access_token=... (Implicit)

        // Convert to a URL object for easier parsing. 
        // We use a dummy base if protocol is custom, but we can just replace the scheme to https for parsing
        const parsingUrl = url.replace(/^[a-zA-Z0-9.-]+:\/\//, "https://");
        const urlObj = new URL(parsingUrl);

        const params = urlObj.searchParams;
        const hash = urlObj.hash; // includes #

        const code = params.get("code");
        const error = params.get("error");

        if (error) {
          console.error("Deep link contained error:", error, params.get("error_description"));
          router.push(`/login?error=${error}`);
          return;
        }

        let sessionData = null;

        if (code) {
          // 4a. Handle PKCE Flow
          console.log("🔄 Detected PKCE code. Exchanging for session...");
          const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;
          sessionData = data.session;
        } else if (hash && hash.includes("access_token")) {
          // 4b. Handle Implicit Flow
          console.log("🔄 Detected Implicit flow tokens in hash.");
          // Parse hash manually
          const hashParams = new URLSearchParams(hash.substring(1)); // remove #
          const access_token = hashParams.get("access_token");
          const refresh_token = hashParams.get("refresh_token");

          if (access_token && refresh_token) {
            const { data, error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (sessionError) throw sessionError;
            sessionData = data.session;
          }
        }

        // 5. Verify Session
        if (!sessionData) {
          // Fallback: Check if session already exists (maybe handled by auto-refresh?)
          const { data } = await supabase.auth.getSession();
          sessionData = data.session;
        }

        if (sessionData) {
          console.log("✅ Session established via Deep Link.");
          router.push("/reset-password");
        } else {
          console.warn("⚠️ No session established from link.");
          // If we have hash/search, we can try setting window location as a last resort fallback
          // but usually explicit exchange is better.
          router.push("/login?error=invalid_recovery_link");
        }

      } catch (err) {
        console.error("❌ Reset password handler failed:", err);
        router.push("/login?error=" + encodeURIComponent(err.message));
      }
    };

    const listener = App.addListener("appUrlOpen", handleResetPassword);

    return () => {
      listener.then(l => l.remove());
    };

  }, [router]);

  return null;
}
