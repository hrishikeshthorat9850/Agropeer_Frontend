"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function AccountDeleteModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [step, setStep] = useState(1); // 1: warning, 2: confirmation

  // Required confirmation text (case-insensitive)
  const requiredText = "DELETE";
  const isConfirmed = confirmText.toUpperCase().trim() === requiredText;

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.lockScrollY = scrollY;
    } else {
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
      // Reset state when closing
      setStep(1);
      setConfirmText("");
    }

    return () => {
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    };
  }, [isOpen]);

  const handleDelete = async () => {
    if (step === 1) {
      // Move to confirmation step
      setStep(2);
      return;
    }

    if (!isConfirmed) {
      showToast("error", t("delete_mismatch_error"));
      return;
    }

    setLoading(true);
    try {
      // Get session and access token for authentication
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error(t("session_expired"));
      }

      // Get access token from session
      const accessToken = session.access_token;
      if (!accessToken) {
        throw new Error(t("token_error"));
      }

      // Send request with Authorization header (Production standard)
      const response = await fetch("/api/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`, // Production standard: Bearer token in header
        },
        credentials: "include", // Include cookies as backup
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("delete_failed"));
      }

      // Sign out and clear data
      await supabase.auth.signOut();
      if (typeof window !== "undefined") {
        localStorage.clear();
      }

      showToast("success", t("account_deleted"));
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Error deleting account:", error);
      showToast("error", error.message || t("delete_failed"));
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white dark:bg-[#272727] rounded-2xl shadow-2xl border-2 border-red-200 dark:border-red-800 max-w-md w-full relative overflow-hidden"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
            aria-label="Close"
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="p-6">
            {/* Step 1: Warning */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="text-center"
              >
                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <FaExclamationTriangle className="text-3xl text-red-600 dark:text-red-400" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {t("delete_account")}
                </h2>

                {/* Warning Message */}
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-red-800 dark:text-red-300 mb-3 font-semibold">
                    ⚠️ {t("confirm_delete")}
                  </p>
                  <ul className="text-xs text-red-700 dark:text-red-400 space-y-2 list-disc list-inside">
                    <li>{t("delete_warning_1")}</li>
                    <li>{t("delete_warning_2")}</li>
                    <li>{t("delete_warning_3")}</li>
                    <li>{t("delete_warning_4")}</li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {t("form_cancel")}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <FaTrashAlt />
                    {t("continue")}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Final Confirmation */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center"
              >
                {/* Icon */}
                <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
                  <FaTrashAlt className="text-3xl text-red-600 dark:text-red-400" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t("final_confirmation")}
                </h2>

                {/* Warning */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {t("delete_instruction_prefix")} <span className="font-bold text-red-600 dark:text-red-400">DELETE</span> {t("delete_instruction_suffix")}
                </p>

                {/* Confirmation Input */}
                <div className="mb-6">
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder={t("type_delete_placeholder")}
                    disabled={loading}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-center font-mono text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 dark:bg-[#363636] dark:text-white disabled:opacity-50"
                    autoFocus
                  />
                  {confirmText && !isConfirmed && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                      {t("delete_mismatch_error")}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setStep(1);
                      setConfirmText("");
                    }}
                    disabled={loading}
                    className="flex-1 px-4 py-2.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {t("go_back")}
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={loading || !isConfirmed}
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t("deleting")}
                      </>
                    ) : (
                      <>
                        <FaTrashAlt />
                        {t("delete_account")}
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

