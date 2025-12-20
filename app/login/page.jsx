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

export default function LoginPage() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [method, setMethod] = useState("email");
  const [otpMode, setOtpMode] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [oauthError, setOauthError] = useState("");

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

  return (
    <div className="login-page relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f8f6e8] via-[#f3f0df] to-[#f1edd5] dark:!bg-none">
      {/* 🌈 Floating background shapes */}
      <motion.div
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-80 h-80 bg-green-200/40 rounded-full blur-3xl top-[-60px] left-[-60px]"
      />
      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl bottom-[-100px] right-[-80px]"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] h-[400px] bg-green-100/30 rounded-full blur-3xl top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2"
      />

      {/* 🌿 AgroPeer Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 flex flex-col items-center my-4 text-center px-2"
      >
        <div className="flex items-center gap-3">
          <FaSeedling className="text-green-600 text-3xl animate-bounce-slow" />
          <h1 className="text-3xl font-extrabold text-green-700 tracking-tight">
            AgroPeer
          </h1>
        </div>
        <p className="text-gray-600 mt-2 text-base max-w-lg">
          Empowering farmers and growers with smart tools for a sustainable future 🌱
        </p>
      </motion.div>

      {/* OAuth Error Banner */}
      {oauthError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="z-30 max-w-md mx-auto mb-4 px-4"
        >
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center dark:bg-red-900/20 dark:border-red-800">
            <p className="text-red-600 font-medium text-sm dark:text-red-400">{oauthError}</p>
            <button
              onClick={() => setOauthError("")}
              className="mt-2 text-xs text-red-500 hover:text-red-700 underline"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      )}

      {/* 🌱 Login Cards Section */}
      <div className="relative w-full max-w-6xl px-4 md:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center gap-8 z-10">
        <AnimatePresence mode="wait">
          {method === "phone" ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm sm:max-w-md"
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
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm sm:max-w-md"
            >
              <div className="relative bg-white/90 backdrop-blur-xl border border-white/40 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] px-2 sm:px-6 py-2 mb-2 hover:shadow-[0_15px_45px_rgba(0,0,0,0.08)] transition-all dark:bg-[#272727] dark:border-white/20">
                <div className="absolute -top-3 -left-3 z-20 bg-gradient-to-br from-green-500 to-green-600 w-8 h-8 flex items-center justify-center rounded-full text-white shadow">
                  <FaUserTie size={15} />
                </div>

                {/* Toggle Buttons */}
                {/* <div className="flex justify-center gap-3 mb-5">
                  <button
                    onClick={() => setMethod("phone")}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-400 hover:bg-gray-200 transition"
                  >
                    📱 Phone
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[#e6f9e6] text-green-600 shadow-sm">
                    📧 Email
                  </button>
                </div> */}

                <LoginForm />
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
              className="w-full max-w-sm sm:max-w-md"
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