"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaSeedling } from "react-icons/fa";
import PhoneLogin from "@/components/login/PhoneLogin";
import OtpVerifyCard from "@/components/login/OtpVerifyCard";
import LoginForm from "@/components/login/LoginForm";
import { FaUserTie } from "react-icons/fa";
import useToast from "@/hooks/useToast";
import { Capacitor } from "@capacitor/core";
import { useLanguage } from "@/Context/languagecontext";

export default function LoginPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [method, setMethod] = useState("email");
  const [otpMode, setOtpMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [oauthError, setOauthError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Check for OAuth error in URL
  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      const decodedError = decodeURIComponent(error);
      setOauthError(decodedError);
      showToast("error", decodedError);
      // Clear error from URL
      window.history.replaceState({}, "", "/login");
    }
  }, [searchParams]);

  // Prevent scrolling on Android
  useEffect(() => {
    const isAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";

    if (isAndroid) {
      // Store original styles
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyHeight = document.body.style.height;
      const originalBodyWidth = document.body.style.width;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlHeight = document.documentElement.style.height;

      // Add no-scroll class for CSS support
      document.body.classList.add("no-scroll");

      // Prevent body scrolling using position fixed (most reliable method)
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.height = "100vh";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";

      return () => {
        // Remove no-scroll class
        document.body.classList.remove("no-scroll");

        // Restore original styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.height = originalBodyHeight;
        document.body.style.width = originalBodyWidth;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.documentElement.style.height = originalHtmlHeight;
      };
    }
  }, []);

  return (
    <div
      className="
      relative min-h-[100dvh] flex flex-col
      overflow-hidden
      bg-gradient-to-br from-green-50 via-white to-green-50/30
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
    "
    >
      {/* ================= STATUS BAR BACKGROUND ================= */}
      <div
        className="
        fixed top-0 left-0 right-0 z-40
        h-[env(safe-area-inset-top)]
        bg-white dark:bg-gray-900
      "
      />

      {/* ================= BACKGROUND (VISUAL ONLY) ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-green-50/10 dark:from-green-900/10" />

        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="
          absolute w-[600px] h-[600px]
          bg-green-200/10 dark:bg-green-500/5
          rounded-full blur-3xl
          top-0 left-0
          -translate-x-1/4 -translate-y-1/4
        "
        />

        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="
          absolute w-[500px] h-[500px]
          bg-green-300/10 dark:bg-green-400/5
          rounded-full blur-3xl
          bottom-0 right-0
          translate-x-1/4 translate-y-1/4
        "
        />
      </div>

      {/* ================= OAUTH ERROR ================= */}
      {oauthError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
          relative z-30 w-full max-w-md
          mx-auto mt-[env(safe-area-inset-top)]
          px-4 pt-4
        "
        >
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-xl p-4">
            <p className="text-sm text-red-700 dark:text-red-300">
              {oauthError}
            </p>
            <button
              onClick={() => setOauthError("")}
              className="mt-2 text-xs text-red-600 dark:text-red-400"
            >
              {t("dismiss")}
            </button>
          </div>
        </motion.div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="relative z-20 flex-1 w-full overflow-y-auto pt-[env(safe-area-inset-top)]">
        {/* Centering wrapper */}
        <div className="min-h-full flex items-center justify-center px-4">
          {/* Slight upward shift on mobile */}
          <div className="w-full max-w-6xl mx-auto translate-y-[-4vh] sm:translate-y-0">
            <AnimatePresence mode="wait">
              {method === "phone" ? (
                <motion.div
                  key="phone"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm mx-auto"
                >
                  <PhoneLogin
                    onSwitchToEmail={() => {
                      setMethod("email");
                      setOtpMode(false);
                    }}
                    onSendSuccess={(fullPhone, confirmation) => {
                      setPhone(fullPhone);
                      setConfirmationResult(confirmation);
                      setOtpMode(true);
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm mx-auto"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-green-500 to-green-400" />
                    <div className="px-6 py-6">
                      <LoginForm />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* OTP */}
            <AnimatePresence>
              {otpMode && method === "phone" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-sm mx-auto mt-4"
                >
                  <OtpVerifyCard
                    phone={phone}
                    confirmationResult={confirmationResult}
                    onCodeResent={setConfirmationResult}
                    onEditNumber={() => setOtpMode(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );

}