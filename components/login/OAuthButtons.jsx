"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function OAuthButtons() {
  const [loading, setLoading] = useState({ google: false, facebook: false });
  const [error, setError] = useState("");

  const isNative = Capacitor.isNativePlatform();

  const handleOAuthLogin = async (provider) => {
    setError("");
    setLoading((p) => ({ ...p, [provider]: true }));

    try {
      // For Android native apps, use production URL instead of localhost
      // Supabase will redirect to this URL, and our callback page will handle the session
      // For web, use current origin
      let redirectTo;
      if (isNative) {
        // Use production URL for Android to avoid localhost connection issues
        let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://agrogram-wheat.vercel.app";
        
        // Handle Vercel URL format (might not include protocol)
        if (process.env.NEXT_PUBLIC_VERCEL_URL && !baseUrl.includes("://")) {
          baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        }
        
        // Ensure URL has protocol
        if (!baseUrl.startsWith("http")) {
          baseUrl = `https://${baseUrl}`;
        }
        
        // redirectTo = `${baseUrl}/auth/callback`;
        redirectTo = "agropeer://login-callback";
      } else {
        // For web, use current origin (handles localhost for dev)
        const redirectTo = isNative
          ? "agropeer://login-callback"
          : `${window.location.origin}/auth/callback`;
      }

      console.log("OAuth started. Native:", isNative);
      console.log("Redirect URL:", redirectTo);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          skipBrowserRedirect: isNative,
        },
      });

      if (error) throw error;

      if (isNative && data?.url) {
        // Open OAuth URL in in-app browser
        await Browser.open({ 
          url: data.url,
          windowName: '_self',
          toolbarColor: '#2E7D32'
        });
        // Don't set loading to false here - MobileOAuthHandler will handle the callback
      } else if (data?.url) {
        window.location.href = data.url;
        setLoading((p) => ({ ...p, [provider]: false }));
      }

    } catch (err) {
      console.error("OAuth error:", err);
      setError(err.message || "OAuth failed");
      setLoading((p) => ({ ...p, [provider]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Material Design 3 OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google Button */}
        <motion.button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading.google || loading.facebook}
          whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.96 }}
          className="
            flex items-center justify-center gap-2.5
            px-4 py-3 rounded-xl border-2
            bg-white dark:bg-gray-700
            border-gray-300 dark:border-gray-600
            hover:bg-gray-50 dark:hover:bg-gray-600
            active:bg-gray-100 dark:active:bg-gray-500
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md
          "
        >
          {loading.google ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
          ) : (
            <>
              <FaGoogle className="text-xl text-red-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                Google
              </span>
            </>
          )}
        </motion.button>

        {/* Facebook Button */}
        <motion.button
          type="button"
          onClick={() => handleOAuthLogin("facebook")}
          disabled={loading.google || loading.facebook}
          whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.96 }}
          className="
            flex items-center justify-center gap-2.5
            px-4 py-3 rounded-xl border-2
            bg-white dark:bg-gray-700
            border-gray-300 dark:border-gray-600
            hover:bg-gray-50 dark:hover:bg-gray-600
            active:bg-gray-100 dark:active:bg-gray-500
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md
          "
        >
          {loading.facebook ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
          ) : (
            <>
              <FaFacebook className="text-xl text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                Facebook
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-3"
        >
          <p className="text-red-700 dark:text-red-300 text-sm font-medium text-center">{error}</p>
        </motion.div>
      )}
    </div>
  );
}
