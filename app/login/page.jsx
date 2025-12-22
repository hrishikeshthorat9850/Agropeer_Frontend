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

export default function LoginPage() {
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
    <div className={`fixed inset-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden overflow-x-hidden overflow-y-hidden overscroll-none touch-none bg-gradient-to-br from-green-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${
      isMobile ? "pt-[calc(56px+env(safe-area-inset-top,0px))] pb-[calc(90px+env(safe-area-inset-bottom,0px))]" : ""
    }`}>
      {/* Modern Material Design Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-green-50/10 dark:from-green-900/10 dark:via-transparent dark:to-transparent" />
        
        {/* Material Design 3 subtle patterns */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-green-200/10 dark:bg-green-500/5 rounded-full blur-3xl -top-1/4 -left-1/4"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] bg-green-300/10 dark:bg-green-400/5 rounded-full blur-3xl -bottom-1/4 -right-1/4"
        />
      </div>

      {/* OAuth Error Banner */}
      {oauthError && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          className="z-30 max-w-md mx-auto mb-4 px-4 w-full flex justify-center"
        >
          <div className="bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-2xl p-4 shadow-lg w-full">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-red-700 dark:text-red-300 font-medium text-sm">{oauthError}</p>
                <button
                  onClick={() => setOauthError("")}
                  className="mt-2 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* 🌱 Login Cards Section */}
      <div className="relative w-full max-w-6xl px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 z-10 mx-auto overflow-y-auto" style={{ maxHeight: isMobile ? 'calc(100vh - 146px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px))' : '100%' }}>
        <AnimatePresence mode="wait">
          {method === "phone" ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm sm:max-w-md mx-auto"
            >
              <PhoneLogin
                onSwitchToEmail={() => {
                  setMethod("email");
                  setOtpMode(false);
                }}
                onSendSuccess={(fullPhone, confirmation) => {
                  setPhone(fullPhone);
                  setConfirmationResult(confirmation || null);
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
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="w-full max-w-sm sm:max-w-md mx-auto px-4"
            >
              <div 
                className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg dark:shadow-2xl overflow-hidden"
                style={{
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(255, 255, 255, 0.5) inset",
                }}
              >
                {/* Material Design 3 top accent */}
                <div className="h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500" />
                
                <div className="px-6 py-6 sm:px-8 sm:py-8">
                  <LoginForm />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OTP card appears only after Send Code */}
        <AnimatePresence>
          {otpMode && method === "phone" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm sm:max-w-md mx-auto"
            >
              <OtpVerifyCard
                phone={phone}
                confirmationResult={confirmationResult}
                onCodeResent={(confirmation) => setConfirmationResult(confirmation || null)}
                onEditNumber={() => setOtpMode(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}