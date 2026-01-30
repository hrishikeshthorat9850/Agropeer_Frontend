"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validatePassword,
  sanitizeInput,
} from "@/utils/validation";
import { motion } from "framer-motion";
import OAuthButtons from "./OAuthButtons";
import { useLanguage } from "@/Context/languagecontext";
import { AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const isEmailValid = !emailError && email.length > 0;
  const isPasswordValid = !passwordError && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (emailError) {
      setErrorMsg(emailError);
      return;
    }
    if (passwordError) {
      setErrorMsg(passwordError);
      return;
    }

    setLoading(true);

    try {
      if (!supabase?.auth?.signInWithPassword)
        throw new Error(t("auth_service_unavailable"));

      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizeInput(email),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials"))
          setErrorMsg(t("invalid_credentials"));
        else if (error.message.includes("Email not confirmed"))
          setErrorMsg(t("email_not_confirmed"));
        else if (error.message.includes("Too many requests"))
          setErrorMsg(t("too_many_attempts"));
        else setErrorMsg(error.message || t("login_failed"));
        return;
      }

      if (data?.user) router.push("/");
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.message || t("something_wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
            <Mail size={20} />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("enter_email_placeholder") || "Email address"}
            className="w-full h-14 pl-12 pr-4 bg-gray-50 dark:bg-[#1C1C1E] rounded-2xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
            <Lock size={20} />
          </div>
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("enter_password_placeholder") || "Password"}
            className="w-full h-14 pl-12 pr-12 bg-gray-50 dark:bg-[#1C1C1E] rounded-2xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors"
          >
            {t("forgot_password_q")}
          </Link>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl"
            >
              <p className="text-xs text-red-600 dark:text-red-400 font-medium text-center">
                {errorMsg}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all rounded-2xl text-white font-bold text-base shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
        >
          {loading ? (
            <LoadingSpinner size="xs" color="white" text="" />
          ) : (
            <>
              {t("sign_in")}
              <ArrowRight size={18} strokeWidth={2.5} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 py-2">
          <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-widest">
            {t("or") || "OR"}
          </span>
          <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
        </div>

        {/* OAuth Buttons */}
        <OAuthButtons mode="login" />

        {/* Sign Up Link */}
        <div className="text-center pt-2 pb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {t("dont_have_account")}{" "}
            <Link
              href="/signup"
              className="text-green-600 dark:text-green-500 font-bold hover:underline"
            >
              {t("sign_up_link")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
