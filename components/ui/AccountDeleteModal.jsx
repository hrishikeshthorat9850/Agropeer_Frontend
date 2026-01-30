"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, TriangleAlert, Trash2, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/Context/languagecontext";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";
import { apiRequest } from "@/utils/apiHelpers";
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
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

  // const handleDelete = async () => {
  //   if (step === 1) {
  //     // Move to confirmation step
  //     setStep(2);
  //     return;
  //   }

  //   if (!isConfirmed) {
  //     showToast("error", t("delete_mismatch_error"));
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     // Get session and access token for authentication
  //     const {
  //       data: { session },
  //       error: sessionError,
  //     } = await supabase.auth.getSession();

  //     if (sessionError || !session) {
  //       throw new Error(t("session_expired"));
  //     }

  //     // Get access token from session
  //     const accessToken = session?.access_token;
  //     if (!accessToken) {
  //       throw new Error(t("token_error"));
  //     }

  //     // Send request with Authorization header (Production standard)
  //     const response = await apiRequest(`${BASE_URL}/api/user/delete-account`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`, // Production standard: Bearer token in header
  //       },
  //       credentials: "include", // Include cookies as backup
  //     });
  //     // const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(response?.error || t("delete_failed"));
  //     }

  //     // Sign out and clear data
  //     await supabase.auth.signOut();
  //     if (typeof window !== "undefined") {
  //       localStorage.clear();
  //     }

  //     showToast("success", t("account_deleted"));
  //     setTimeout(() => {
  //       router.push("/login");
  //     }, 1500);
  //   } catch (error) {
  //     console.error("Error deleting account:", error);
  //     showToast("error", error.message || t("delete_failed"));
  //     setLoading(false);
  //   }
  // };
  
  const handleDelete = async () => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (!isConfirmed) {
      showToast("error", t("delete_mismatch_error"));
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Get session ONCE
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error(t("session_expired"));
      }

      const accessToken = session.access_token;

      // 2️⃣ CALL DELETE API
      const response = await apiRequest(
        `${BASE_URL}/api/user/delete-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (![200, 401, 403].includes(response.status)) {
        throw new Error(t("delete_failed"));
      }

      // 3️⃣ HARD RESET CLIENT SESSION (NO supabase.signOut)
      localStorage.clear();
      sessionStorage.clear();

      // Clear all cookies (including Supabase auth cookies)
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      showToast("success", t("account_deleted"));

      // 4️⃣ REDIRECT IMMEDIATELY
      router.replace("/login");
    } catch (error) {
      console.error("Delete account error:", error);

      // Even if backend complains after deletion, force logout UX
      localStorage.clear();
      sessionStorage.clear();

      setTimeout(() => {
        router.replace("/login");
      }, 300);
    }
  };



  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center pointer-events-none">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Card / Bottom Sheet */}
        <motion.div
          className="w-full max-w-md bg-white dark:bg-[#1C1C1E] rounded-t-[20px] sm:rounded-2xl shadow-2xl overflow-hidden pointer-events-auto relative max-h-[90vh] flex flex-col"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-[#2C2C2E]">
            {step === 2 ? (
              <button
                onClick={() => setStep(1)}
                className="p-2 -ml-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
            ) : (
              <div className="w-10"></div>
            )}

            {/* Drag Handle for mobile vibe (visual only) */}
            <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full sm:hidden absolute top-2 left-1/2 -translate-x-1/2" />

            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Warning */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <TriangleAlert
                      size={40}
                      className="text-red-600 dark:text-red-500"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {t("delete_account")}
                  </h2>

                  <div className="w-full bg-red-50 dark:bg-red-500/5 rounded-2xl p-5 mb-8 border border-red-100 dark:border-red-500/10">
                    <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-3 text-left w-full">
                      {t("confirm_delete") || "This action cannot be undone."}
                    </p>
                    <ul className="text-left space-y-3">
                      {[
                        t("delete_warning_1"),
                        t("delete_warning_2"),
                        t("delete_warning_3"),
                        t("delete_warning_4"),
                      ].map((warning, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-red-600/80 dark:text-red-400/80"
                        >
                          <div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full space-y-3">
                    <button
                      onClick={handleDelete}
                      className="w-full h-14 bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all text-white font-semibold rounded-xl text-lg shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                    >
                      {t("continue")}
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full h-14 bg-gray-100 dark:bg-[#2C2C2E] hover:bg-gray-200 dark:hover:bg-[#3A3A3C] active:scale-[0.98] transition-all text-gray-900 dark:text-white font-semibold rounded-xl"
                    >
                      {t("form_cancel")}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Final Confirmation */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
                    <Trash2
                      size={40}
                      className="text-red-600 dark:text-red-500"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {t("final_confirmation")}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-[80%]">
                    {t("delete_instruction_prefix")}{" "}
                    <span className="font-bold text-red-600 dark:text-red-500 select-all">
                      DELETE
                    </span>{" "}
                    {t("delete_instruction_suffix")}
                  </p>

                  <div className="w-full mb-8 relative">
                    <input
                      type="text"
                      value={confirmText}
                      onChange={(e) => setConfirmText(e.target.value)}
                      placeholder={t("type_delete_placeholder")}
                      className="w-full h-14 px-4 bg-gray-50 dark:bg-black border-2 border-gray-200 dark:border-[#2C2C2E] rounded-xl text-center text-lg font-bold tracking-widest text-gray-900 dark:text-white focus:outline-none focus:border-red-500 dark:focus:border-red-500 transition-colors uppercase placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400"
                      autoFocus
                    />
                    {confirmText && !isConfirmed && (
                      <div className="absolute -bottom-6 left-0 right-0 text-center">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-red-500">
                          {t("delete_mismatch_error")}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleDelete}
                    disabled={loading || !isConfirmed}
                    className="w-full h-14 bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all text-white font-semibold rounded-xl text-lg shadow-lg shadow-red-600/20 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Trash2 size={20} />
                        {t("delete_account")}
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
