"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaUserTie } from "react-icons/fa";
import Link from "next/link";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/lib/firebaseClient";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";

export default function PhoneLogin({ onSwitchToEmail, onSendSuccess }) {
  const { t } = useLanguage();
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const { showToast, ToastComponent } = useToast();
  const fullPhone = (countryCode + phone).replace(/\s+/g, "");

  const getRecaptchaVerifier = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
    return window.recaptchaVerifier;
  }, []);

  async function handleSend(e) {
    e.preventDefault();
    setError("");

    if (!phone || phone.length !== 10) {
      setError(t("valid_mobile_error"));
      return;
    }
    try {
      setSending(true);

      const appVerifier = getRecaptchaVerifier();
      if (!appVerifier) {
        throw new Error(t("recaptcha_error"));
      }

      const confirmation = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      onSendSuccess?.(fullPhone, confirmation);
      showToast("success", t("otp_sent_success"));
    } catch (err) {
      console.error(err);
      const message =
        err?.message?.includes("too-many-requests")
          ? t("too_many_requests")
          : err?.message?.includes("invalid-phone-number")
            ? t("invalid_phone_number")
            : t("failed_send_otp");
      setError(message);
    } finally {
      setSending(false);
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) setPhone(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md mx-auto bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_12px_45px_rgba(0,0,0,0.08)] p-6 sm:p-8 dark:bg-[#272727] dark:border-white/20"
    >
      <div className="absolute -top-3 -left-3 bg-gradient-to-br from-green-500 to-green-600 w-9 h-9 flex items-center justify-center rounded-full text-white shadow-lg">
        <FaUserTie size={15} />
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <button className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200">
          <FaPhoneAlt /> {t("phone_btn")}
        </button>

        <button
          onClick={onSwitchToEmail}
          className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          <FaEnvelope /> {t("email_label")}
        </button>
      </div>

      <form onSubmit={handleSend} className="space-y-5">
        <div>
          <label className="text-[15px] font-semibold text-gray-800 mb-2 block dark:text-white">
            {t("enter_phone_number")}
          </label>

          {/* ⭐ ONLY FIXES ADDED: overflow-hidden + min-w-0 */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-3 py-2 sm:py-3 focus-within:border-green-400 dark:bg-[#363636] overflow-hidden">

            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="bg-transparent outline-none text-sm font-semibold text-gray-800 dark:text-gray-200 min-w-0"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+61">🇦🇺 +61</option>
            </select>

            <span className="text-gray-300 mx-2">|</span>

            <input
              type="tel"
              inputMode="numeric"
              className="flex-1 bg-transparent outline-none text-[16px] font-medium text-gray-800 placeholder-gray-400 px-2 min-w-0"
              placeholder="2320158974"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
            />
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-600 text-sm bg-red-50 p-2 rounded-xl border border-red-100 dark:bg-[#272727] dark:border-none dark:text-red-600 dark:p-0"
          >
            {error}
          </motion.p>
        )}

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: sending ? 1 : 1.02 }}
          whileTap={{ scale: sending ? 1 : 0.97 }}
          type="submit"
          disabled={sending}
          className={`w-full py-3.5 rounded-full font-semibold text-white text-[16px] transition-all ${sending
              ? "bg-green-300 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
            }`}
        >
          {sending ? t("sending") : t("send_code")}
        </motion.button>

        {/* Firebase reCAPTCHA container (required) */}
        {/* <div id="recaptcha-container"></div> */}
      </form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center mt-6"
      >
        <p className="text-gray-600">
          {t("dont_have_account")}{" "}
          <Link
            href="/signup"
            className="font-semibold text-green-600 hover:text-green-700 underline decoration-2 underline-offset-2"
          >
            {t("sign_up_here")}
          </Link>
        </p>
      </motion.div>

      <div id="recaptcha-container" className="hidden" />

      {ToastComponent}
    </motion.div>
  );
}
