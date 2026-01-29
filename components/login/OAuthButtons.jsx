"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function OAuthButtons() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState({ google: false, facebook: false });
  const [error, setError] = useState("");

  const isNative = Capacitor.isNativePlatform();

  const handleOAuthLogin = async (provider) => {
    setError("");
    setLoading((p) => ({ ...p, [provider]: true }));

    try {
      let redirectTo;
      if (isNative) {
        let baseUrl =
          process.env.NEXT_PUBLIC_APP_URL ||
          "https://agrogram-wheat.vercel.app";
        if (process.env.NEXT_PUBLIC_VERCEL_URL && !baseUrl.includes("://")) {
          baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        }
        if (!baseUrl.startsWith("http")) {
          baseUrl = `https://${baseUrl}`;
        }
        redirectTo = "agropeer://login-callback";
      } else {
        redirectTo = isNative
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
        await Browser.open({
          url: data.url,
          windowName: "_self",
          toolbarColor: "#2E7D32",
        });
      } else if (data?.url) {
        window.location.href = data.url;
        setLoading((p) => ({ ...p, [provider]: false }));
      }
    } catch (err) {
      console.error("OAuth error:", err);
      setError(err.message || t("oauth_failed"));
      setLoading((p) => ({ ...p, [provider]: false }));
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Google Button */}
        <button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading.google || loading.facebook}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-gray-50 dark:bg-[#1C1C1E] text-gray-900 dark:text-white font-semibold text-sm border border-transparent shadow-sm hover:bg-gray-100 dark:hover:bg-[#2C2C2E] transition-all disabled:opacity-50"
        >
          {loading.google ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaGoogle className="text-red-500 text-lg" />
              <span>Google</span>
            </>
          )}
        </button>

        {/* Facebook Button */}
        <button
          type="button"
          onClick={() => handleOAuthLogin("facebook")}
          disabled={true}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-gray-50 dark:bg-[#1C1C1E] text-gray-900 dark:text-white font-semibold text-sm border border-transparent shadow-sm hover:bg-gray-100 dark:hover:bg-[#2C2C2E] transition-all disabled:opacity-50"
        >
          {loading.facebook ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <FaFacebook className="text-blue-600 text-lg" />
              <span>Facebook</span>
            </>
          )}
        </button>
      </div>

      {error && <p className="text-xs text-red-500 text-center">{error}</p>}
    </div>
  );
}
