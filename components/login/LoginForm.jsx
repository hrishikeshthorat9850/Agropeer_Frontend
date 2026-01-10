"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword, sanitizeInput } from "@/utils/validation";
import { motion } from "framer-motion";
import OAuthButtons from "./OAuthButtons";
import { useLanguage } from "@/Context/languagecontext";

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

    // Client-side validation
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
      if (!supabase?.auth?.signInWithPassword) {
        throw new Error(t("auth_service_unavailable"));
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizeInput(email),
        password
      });

      if (error) {
        // Handle specific error types
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg(t("invalid_credentials"));
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMsg(t("email_not_confirmed"));
        } else if (error.message.includes('Too many requests')) {
          setErrorMsg(t("too_many_attempts"));
        } else {
          setErrorMsg(error.message || t("login_failed"));
        }
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
      {/* Material Design 3 Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("welcome_back")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {t("signin_to_continue")}
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="space-y-5"
        onSubmit={handleSubmit}
      >
        {/* Material Design 3 Input Fields */}
        <div className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
<<<<<<< HEAD
              Email
=======
              {t("email_label")}
>>>>>>> origin/translation
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
<<<<<<< HEAD
                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-surface-900 dark:text-white bg-surface-50 dark:bg-surface-800/50 placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-0 ${isEmailValid && email.length > 0
                  ? "border-farm-500 dark:border-farm-400 bg-white dark:bg-surface-800"
                  : emailError && email.length > 0
                    ? "border-red-500 dark:border-red-400"
                    : "border-surface-200 dark:border-surface-700 focus:border-farm-500 dark:focus:border-farm-400"
                  }`}
                placeholder="your.email@example.com"
=======
                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 ${isEmailValid && email.length > 0
                  ? "border-green-500 dark:border-green-400 bg-white dark:bg-gray-700"
                  : emailError && email.length > 0
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                  }`}
                placeholder={t("enter_email_placeholder")}
>>>>>>> origin/translation
                required
                style={{
                  fontSize: "16px", // Prevents zoom on iOS
                }}
              />
              {isEmailValid && email.length > 0 && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
            {emailError && email.length > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1"
              >
                <span className="text-red-500">•</span>
                {emailError}
              </motion.p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
<<<<<<< HEAD
              Password
=======
              {t("password_label")}
>>>>>>> origin/translation
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
<<<<<<< HEAD
                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-surface-900 dark:text-white bg-surface-50 dark:bg-surface-800/50 placeholder-surface-400 dark:placeholder-surface-500 focus:outline-none focus:ring-0 pr-12 ${isPasswordValid && password.length > 0
                  ? "border-farm-500 dark:border-farm-400 bg-white dark:bg-surface-800"
                  : passwordError && password.length > 0
                    ? "border-red-500 dark:border-red-400"
                    : "border-surface-200 dark:border-surface-700 focus:border-farm-500 dark:focus:border-farm-400"
                  }`}
                placeholder="Enter your password"
=======
                className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 pr-12 ${isPasswordValid && password.length > 0
                  ? "border-green-500 dark:border-green-400 bg-white dark:bg-gray-700"
                  : passwordError && password.length > 0
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                  }`}
                placeholder={t("enter_password_placeholder")}
>>>>>>> origin/translation
                required
                style={{
                  fontSize: "16px", // Prevents zoom on iOS
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 active:scale-95 transition-all p-1 rounded-lg"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
              </button>
            </div>
            {passwordError && password.length > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1"
              >
                <span className="text-red-500">•</span>
                {passwordError}
              </motion.p>
            )}
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end -mt-2">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors active:opacity-70"
          >
<<<<<<< HEAD
            Forgot password?
=======
            {t("forgot_password_q")}
>>>>>>> origin/translation
          </Link>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4"
          >
            <p className="text-sm text-red-700 dark:text-red-400 font-medium text-center">
              {errorMsg}
            </p>
          </motion.div>
        )}

        {/* Material Design 3 Button */}
        <motion.button
          type="submit"
          disabled={!isEmailValid || !isPasswordValid || loading}
          className={`w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-200 ${!isEmailValid || !isPasswordValid || loading
            ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-60"
            : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 active:scale-[0.98] shadow-lg shadow-green-500/30 dark:shadow-green-500/20"
            }`}
          whileTap={!loading && isEmailValid && isPasswordValid ? { scale: 0.98 } : {}}
        >
          <span className="flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
<<<<<<< HEAD
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
=======
                <span>{t("signing_in")}</span>
              </>
            ) : (
              <span>{t("sign_in")}</span>
>>>>>>> origin/translation
            )}
          </span>
        </motion.button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
<<<<<<< HEAD
              Or continue with
=======
              {t("or_continue_with")}
>>>>>>> origin/translation
            </span>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div>
          <OAuthButtons mode="login" />
        </div>

        {/* Sign Up Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
<<<<<<< HEAD
            Don&apos;t have an account?{" "}
=======
            {t("dont_have_account")}{" "}
>>>>>>> origin/translation
            <Link
              href="/signup"
              className="font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
            >
<<<<<<< HEAD
              Sign up
=======
              {t("sign_up_link")}
>>>>>>> origin/translation
            </Link>
          </p>
        </div>
      </motion.form>
    </div>
  );
}


