"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Link from "next/link";

import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";

export default function ResetPasswordPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (password.length < 6) {
      setStatus("error");
      setMessage(t("password_length_error"));
      showToast("error", t("password_length_error"));
      return;
    }

    if (password !== confirmPassword) {
      setStatus("error");
      setMessage(t("password_mismatch_error"));
      showToast("error", t("password_mismatch_error"));
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      setStatus("success");
      setMessage(t("password_update_success"));
      showToast("success", t("password_update_toast"));
      setTimeout(() => (window.location.href = "/login"), 2500);
    } catch (err) {
      setStatus("error");
      setMessage(err.message || t("password_reset_failed"));
      showToast("error", err.message || t("password_reset_failed"));
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center farm-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md farm-card p-8 mx-4 shadow-xl border-farm-500"
      >
        <h1 className="text-2xl font-bold text-farm-800 text-center mb-4">
          {t("reset_password_title")}
        </h1>

        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-farm-700 mb-2">
              {t("new_password_label")}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="farm-input w-full text-farm-600"
              placeholder={t("new_password_placeholder")}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-farm-700 mb-2">
              {t("confirm_password_label")}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="farm-input w-full text-farm-600"
              placeholder={t("confirm_password_placeholder")}
              required
            />
          </div>

          {message && (
            <div
              className={`rounded-lg p-3 text-center text-sm ${status === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-red-50 border border-red-200 text-red-600"
                }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full farm-button ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {status === "loading" ? t("updating_btn") : t("update_password_btn")}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm font-medium text-farm-600 hover:text-farm-700 underline underline-offset-2 hover:decoration-farm-500 transition-all"
          >
            {t("back_to_login")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
