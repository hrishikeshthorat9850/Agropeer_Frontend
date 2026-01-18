"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout } from "lucide-react";
import PhoneLogin from "@/components/login/PhoneLogin";
import OtpVerifyCard from "@/components/login/OtpVerifyCard";
import LoginForm from "@/components/login/LoginForm";
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
    const isAndroid =
      Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";

    if (isAndroid) {
      document.body.classList.add("no-scroll");
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.height = "100vh";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";

      return () => {
        document.body.classList.remove("no-scroll");
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.height = "";
        document.body.style.width = "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.height = "";
      };
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center bg-[#FAF7F2] dark:bg-[#0d0d0d] font-sans relative overflow-hidden overscroll-none touch-none">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[80%] bg-gradient-to-br from-green-200 to-transparent dark:from-green-950 rounded-b-[100%] pointer-events-none" />

      {/* Top Section: Logo & Brand */}
      <div className="flex-none pb-6 flex flex-col items-center justify-center relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center text-white mb-4">
          <Sprout size={36} fill="currentColor" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          AgroPeer
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
          {t("welcome_back") || "Welcome back"}
        </p>
      </div>

      {/* Main Card Section (Bottom Sheet Style) */}
      <div className="w-full relative z-20 flex flex-col">
        <div className="w-full h-auto bg-transparent px-6 sm:max-w-md sm:mx-auto">
          {/* OAUTH ERROR ALERT */}
          <AnimatePresence>
            {oauthError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl text-center"
              >
                <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                  {oauthError}
                </p>
                <button
                  onClick={() => setOauthError("")}
                  className="text-[10px] underline text-red-500 mt-1"
                >
                  {t("dismiss")}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {method === "phone" ? (
              <motion.div
                key="phone"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <LoginForm />
              </motion.div>
            )}
          </AnimatePresence>

          {/* OTP verify Overlay */}
          <AnimatePresence>
            {otpMode && method === "phone" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-30 bg-white dark:bg-black px-6 pt-10"
              >
                <button
                  onClick={() => setOtpMode(false)}
                  className="mb-6 text-sm text-gray-500 font-medium"
                >
                  ← Back
                </button>
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
  );
}
