"use client";

import { useEffect } from "react";
import { App } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export function MobileOAuthHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAppUrl = async ({ url }) => {
      console.log("🔥 appUrlOpen fired");
      console.log("URL:", url);

      // Check if this is an OAuth callback
      const isOAuthCallback =
        url.includes("auth/callback") ||
        url.includes("login-callback") ||
        url.includes("#access_token") ||
        url.includes("#code=") ||
        url.includes("?code=");

      // 🛑 Critical: Ignore reset-password links (handled by MobileResetPasswordHandler)
      if (url.includes("reset-password")) return;

      if (isOAuthCallback) {
        try {
          // Close the browser if it's open
          try {
            await Browser.close();
          } catch (e) {
            console.log("Browser already closed or not open");
          }

          // Wait a moment for the URL to be fully processed
          await new Promise(resolve => setTimeout(resolve, 300));

          // Parse the URL to extract hash/query parameters
          let cleanUrl = url;
          let hash = "";
          let searchParams = "";

          // Handle custom scheme URLs (agropeer://auth/callback#access_token=...)
          if (url.startsWith("agropeer://")) {
            cleanUrl = url.replace("agropeer://", "https://");
          } else if (url.startsWith("com.hrishikesh.agrogram://")) {
            cleanUrl = url.replace("com.hrishikesh.agrogram://", "https://");
          }

          // Extract hash from URL if present (Supabase uses hash for tokens)
          const hashIndex = cleanUrl.indexOf("#");
          if (hashIndex !== -1) {
            hash = cleanUrl.substring(hashIndex + 1); // Remove the # symbol
          }

          // Extract query parameters if present
          const queryIndex = cleanUrl.indexOf("?");
          if (queryIndex !== -1 && hashIndex === -1) {
            searchParams = cleanUrl.substring(queryIndex + 1); // Remove the ? symbol
          }

          // Parse tokens from hash or query params
          let accessToken = null;
          let refreshToken = null;
          let expiresIn = null;
          let tokenType = "bearer";

          if (hash) {
            // Parse hash parameters (format: access_token=xxx&refresh_token=xxx&expires_in=xxx)
            const hashParams = new URLSearchParams(hash);
            accessToken = hashParams.get("access_token");
            refreshToken = hashParams.get("refresh_token");
            expiresIn = hashParams.get("expires_in");
            tokenType = hashParams.get("token_type") || "bearer";
          } else if (searchParams) {
            // Parse query parameters
            const queryParams = new URLSearchParams(searchParams);
            accessToken = queryParams.get("access_token");
            refreshToken = queryParams.get("refresh_token");
            expiresIn = queryParams.get("expires_in");
            tokenType = queryParams.get("token_type") || "bearer";
          }

          // If we have tokens, set the session manually
          if (accessToken && refreshToken) {
            // Set the hash in window.location so Supabase can read it (include # symbol)
            if (hash) {
              window.location.hash = `#${hash}`;
              // Wait a moment for hash to be set
              await new Promise(resolve => setTimeout(resolve, 200));
            }

            // Set the session - this will persist it to localStorage
            const { data: sessionResult, error: setSessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (setSessionError) {
              console.error("Set session error:", setSessionError);
              router.push("/login?error=" + encodeURIComponent(setSessionError.message || "Failed to set session"));
              return;
            }

            // Verify session was set successfully
            if (!sessionResult?.session) {
              console.error("Session not created after setSession");
              router.push("/login?error=" + encodeURIComponent("Failed to create session"));
              return;
            }
          } else {
            // If no tokens found, try to get session from hash (fallback)
            if (hash) {
              window.location.hash = `#${hash}`;
              await new Promise(resolve => setTimeout(resolve, 300));
            }

            // Try to get session (Supabase might have auto-parsed the hash)
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session) {
              console.error("Session error:", sessionError);
              router.push("/login?error=" + encodeURIComponent(sessionError?.message || "Failed to create session"));
              return;
            }
          }

          // Verify session was created
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();

          if (sessionError || !session) {
            console.error("Session error:", sessionError);
            router.push("/login?error=" + encodeURIComponent(sessionError?.message || "Failed to create session"));
            return;
          }

          // Check if user is authenticated
          const { data: { user }, error: userError } = await supabase.auth.getUser();

          if (userError || !user) {
            console.error("User error:", userError);
            router.push("/login?error=" + encodeURIComponent(userError?.message || "Failed to get user"));
            return;
          }

          // Success - redirect to home
          console.log("✅ OAuth login successful, redirecting to home");
          router.push("/");
        } catch (err) {
          console.error("OAuth handler error:", err);
          router.push("/login?error=" + encodeURIComponent(err.message || "Authentication failed"));
        }
      }
    };

    // Add listener for app URL events
    const listenerPromise = App.addListener("appUrlOpen", handleAppUrl);

    // Cleanup function
    return () => {
      listenerPromise.then(listener => {
        if (listener && listener.remove) {
          listener.remove();
        }
      }).catch(err => {
        console.error("Error removing listener:", err);
      });
    };
  }, [router]);

  return null;
}
