// components/login/OAuthButtons.jsx
// OAuth login buttons for Google and Facebook
// Separate component - doesn't interfere with existing login forms

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function OAuthButtons({ mode = "login" }) {
  const router = useRouter();
  const [loading, setLoading] = useState({ google: false, facebook: false });
  const [error, setError] = useState("");

  const handleOAuthLogin = async (provider) => {
    setError("");
    setLoading((prev) => ({ ...prev, [provider]: true }));

    try {
      const redirectUrl = `${window.location.origin}/auth/callback`;

      // --- Start OAuth flow
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          queryParams: provider === "google" ? {
            access_type: "offline",
            prompt: "consent",
          } : {},
        },
      });

      if (error) throw error;

      // --- Supabase handles redirect automatically
      // No need to manually do window.location.href
      // Just log to confirm:
      console.log("Supabase OAuth redirect URL:", data.url);

    } catch (err) {
      console.error("OAuth error:", err);
      setError(err.message || "OAuth login failed");
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }
  };

  return (
  <div className="space-y-3">
    {/* Divider */}
    <div className="relative flex items-center justify-center my-2">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-farm-300"></div>
      </div>
      <div className="relative bg-white dark:bg-[#272727] px-4 text-sm text-farm-600">
        Or continue with
      </div>
    </div>

    {/* INLINE ICON-ONLY BUTTONS */}
    <div className="flex items-center justify-center gap-5">
      
      {/* Google */}
      <motion.button
        type="button"
        onClick={() => handleOAuthLogin("google")}
        disabled={loading.google || loading.facebook}
        whileHover={{ scale: loading.google || loading.facebook ? 1 : 1.1 }}
        whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.95 }}
        className="
          p-3 rounded-full border border-farm-300 bg-white/70 hover:bg-farm-50 transition duration-200
          dark:bg-[#272727] dark:border-farm-600 dark:hover:bg-farm-800
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading.google ? (
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-farm-600 border-t-transparent"></div>
        ) : (
          <FaGoogle className="text-2xl text-red-500" />
        )}
      </motion.button>

      {/* Facebook */}
      <motion.button
        type="button"
        onClick={() => handleOAuthLogin("facebook")}
        disabled={loading.google || loading.facebook}
        whileHover={{ scale: loading.google || loading.facebook ? 1 : 1.1 }}
        whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.95 }}
        className="
          p-3 rounded-full border border-farm-300 bg-white/70 hover:bg-farm-50 transition duration-200
          dark:bg-[#272727] dark:border-farm-600 dark:hover:bg-farm-800
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading.facebook ? (
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-farm-600 border-t-transparent"></div>
        ) : (
          <FaFacebook className="text-2xl text-blue-600" />
        )}
      </motion.button>

    </div>

    {/* Error Message */}
    {error && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-200 rounded-xl p-3 text-center dark:bg-red-900/20 dark:border-red-800"
      >
        <p className="text-red-600 text-sm font-medium dark:text-red-400">{error}</p>
      </motion.div>
    )}
  </div>
);

}

