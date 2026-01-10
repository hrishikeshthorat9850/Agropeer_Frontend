"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaLock } from "react-icons/fa";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/lib/firebaseClient";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";

export default function OtpVerifyCard({
  phone,
  confirmationResult,
  onCodeResent,
  onEditNumber,
}) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const router = useRouter();
  const { showToast, ToastComponent } = useToast();
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleChange = (value, index) => {
    if (!/^[0-9]*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setError("");
    const code = otp.join("");
    if (code.length !== 6) {
      setError(t("enter_6_digit_otp"));
      return;
    }
    if (!confirmationResult) {
      setError(t("otp_expired"));
      return;
    }
    try {
      setVerifying(true);
      const result = await confirmationResult.confirm(code);
      const idToken = await result.user.getIdToken();

      const res = await fetch(`${BASE_URL}/api/auth/phone-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ idToken }),
      });

      const payload = await res.json();
      if (!res.ok || !payload.success) {
        throw new Error(payload?.error || t("failed_verify_otp"));
      }

<<<<<<< HEAD
      showToast("success", "Logged in successfully!");
      router.push("/");
=======
      showToast("success", t("logged_in_success"));
      router.push("/home");
>>>>>>> origin/translation
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError(err?.message || t("invalid_otp"));
    } finally {
      setVerifying(false);
    }
  };

  const getRecaptchaVerifier = () => {
    if (typeof window === "undefined") return null;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
    return window.recaptchaVerifier;
  };

  const handleResend = async () => {
    if (!phone) {
      setError(t("phone_missing"));
      onEditNumber?.();
      return;
    }
    try {
      setResending(true);
      setError("");

      const appVerifier = getRecaptchaVerifier();
      if (!appVerifier) {
        throw new Error(t("recaptcha_error"));
      }

      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      onCodeResent?.(confirmation);
      setOtp(["", "", "", "", "", ""]);
      showToast("success", t("otp_resent_success"));
    } catch (err) {
      console.error("Failed to resend OTP:", err);
      setError(err?.message || t("failed_resend_otp"));
    } finally {
      setResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-[90%] max-w-[420px] mx-auto backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_12px_45px_rgba(0,0,0,0.08)] p-5 sm:p-8 hover:shadow-[0_15px_60px_rgba(0,0,0,0.1)] dark:bg-[#272727] dark:border-white/20"
    >
      <div className="absolute -top-3 -left-3 bg-gradient-to-br from-green-500 to-green-600 w-9 h-9 flex items-center justify-center rounded-full text-white shadow-lg">
        <FaLock size={15} />
      </div>

      <div className="text-center mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{t("enter_otp_code")}</h2>
        <p className="text-gray-500 text-sm mt-1 leading-snug">
          {t("sent_6_digit_code")} <span className="font-semibold">{phone}</span>
        </p>
        <button
          type="button"
          onClick={onEditNumber}
          className="text-xs text-green-600 underline mt-2"
        >
          {t("edit_phone_number")}
        </button>
      </div>

      <div className="flex justify-between gap-[2vw] sm:gap-3 mb-4 px-1 sm:px-0">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="flex-1 min-w-0 text-center text-[18px] font-semibold text-gray-800 bg-gray-50 border border-gray-300 focus:border-green-500 rounded-xl outline-none transition-all focus:bg-white focus:shadow-[0_0_0_3px_rgba(34,197,94,0.2)] aspect-square"
          />
        ))}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-sm bg-red-50 p-2 rounded-xl border border-red-100 mb-4 dark:bg-[#272727] dark:border-none"
        >
          {error}
        </motion.p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <motion.button
          whileHover={{ scale: verifying ? 1 : 1.02 }}
          whileTap={{ scale: verifying ? 1 : 0.97 }}
          disabled={verifying}
          onClick={handleVerify}
          className={`w-full py-3 rounded-full font-semibold text-white text-[15px] sm:text-[16px] transition-all ${verifying
              ? "bg-green-300 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-green-500/30"
            }`}
        >
          {verifying ? t("verifying") : t("verify_code")}
        </motion.button>

        <motion.button
          whileHover={{ scale: resending ? 1 : 1.02 }}
          whileTap={{ scale: resending ? 1 : 0.97 }}
          disabled={resending}
          onClick={handleResend}
          className={`w-full py-3 rounded-full font-semibold text-green-700 text-[15px] sm:text-[16px] border border-green-300 transition-all ${resending ? "bg-green-100 cursor-not-allowed" : "bg-green-50 hover:bg-green-100"
            }`}
        >
          {resending ? t("resending") : t("resend_code")}
        </motion.button>
      </div>

      <div className="text-center text-xs sm:text-[13px] text-gray-500 mt-6 leading-tight">
        {t("secure_verification")}
      </div>

      {ToastComponent}
    </motion.div>
  );
}
