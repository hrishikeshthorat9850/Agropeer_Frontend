"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import useToast from "@/hooks/useToast";
import { Capacitor } from "@capacitor/core";
import { useLanguage } from "@/Context/languagecontext";

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage(t("valid_email_error"));
      showToast("error", t("valid_email_error"));
      return;
    }

    try {
      // Use the deep link scheme for Android

      // Use correct redirect based on platform
      const isNative = Capacitor.isNativePlatform();

      const redirectTo = isNative
        ? "agropeer://reset-password" // Android app (deep link)
        : `${window.location.origin}/reset-password`; // Web & localhost

      console.log("Reset password redirect URL:", redirectTo);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) throw error;

      setStatus("success");
      setMessage(t("reset_link_sent"));
      showToast("success", t("reset_link_sent"));
    } catch (err) {
      setStatus("error");
      setMessage(err.message || t("something_wrong"));
      showToast("error", err.message || t("something_wrong"));
    }
  };

  return (
    <div className="fixed inset-0 w-full overflow-hidden overscroll-none touch-none flex items-center justify-center bg-white dark:bg-black p-2 z-50">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[80%] bg-gradient-to-br from-green-600/10 to-transparent dark:from-green-900/20 rounded-b-[100%] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 mx-4 z-10 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-gray-100 dark:border-[#333]"
      >
        <div className="text-center mb-6">
          <div className="bg-green-100 dark:bg-green-900/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="text-2xl text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("forgot_password_title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            {t("forgot_password_desc")}
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {t("email_label")}
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_placeholder")}
                className="w-full h-12 px-4 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#333] rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-900 dark:text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center rounded-lg p-3 text-sm flex items-center justify-center gap-2 ${status === "success"
                ? "bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400"
                : "bg-red-50 border border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                }`}
            >
              {status === "success" && <FaCheckCircle />}
              {message}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full py-3 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/20 active:scale-95 transition-all ${status === "loading" ? "opacity-70 cursor-wait" : ""
              }`}
          >
            {status === "loading" ? t("sending") : t("send_reset_link")}
            {status !== "loading" && <FaArrowRight />}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            href="/login"
            className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 underline underline-offset-2 transition-all"
          >
            {t("back_to_login")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
