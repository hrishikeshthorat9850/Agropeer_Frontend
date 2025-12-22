"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import OAuthButtons from "@/components/login/OAuthButtons";
import useToast from "@/hooks/useToast";
import { motion } from "framer-motion";

/* ================= Helpers ================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasUpper = (s) => /[A-Z]/.test(s);
const hasLower = (s) => /[a-z]/.test(s);
const hasNumber = (s) => /[0-9]/.test(s);
const hasSpecial = (s) => /[^A-Za-z0-9]/.test(s);

/* ================= Component ================= */
export default function SignupForm() {
  const router = useRouter();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
    country: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  /* ================= Validation ================= */
  const emailValid = emailRegex.test(form.email);
  const passLen = form.password.length >= 8;
  const passUpper = hasUpper(form.password);
  const passLower = hasLower(form.password);
  const passNum = hasNumber(form.password);
  const passSpec = hasSpecial(form.password);
  const passwordsMatch = form.password === form.confirm && form.confirm.length > 0;

  const allGood =
    emailValid &&
    passLen &&
    passUpper &&
    passLower &&
    passNum &&
    passSpec &&
    passwordsMatch &&
    form.firstName &&
    form.lastName &&
    /^[0-9]{10}$/.test(form.phone);

  /* ================= Handlers ================= */
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      setForm((p) => ({ ...p, phone: value.replace(/\D/g, "").slice(0, 10) }));
    } else {
      setForm((p) => ({ ...p, [id]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });

      if (error) throw error;
      if (!data?.user?.id) throw new Error("User ID not returned");

      const { error: profileError } = await supabase
        .from("userinfo")
        .insert({
          id: data.user.id,
          firstName: form.firstName,
          lastName: form.lastName,
          mobile: form.phone,
          country: form.country || null,
        });

      if (profileError) throw profileError;

      showToast("success", "Account created successfully 🎉");
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      setErrorMsg(err.message);
      showToast("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="w-full"
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
          {/* Material Design 3 Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 text-center"
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Join AgroPeer and start your farming journey
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input 
                id="firstName" 
                label="First name" 
                value={form.firstName} 
                onChange={handleChange}
                isValid={form.firstName.length > 0}
              />
              <Input 
                id="lastName" 
                label="Last name" 
                value={form.lastName} 
                onChange={handleChange}
                isValid={form.lastName.length > 0}
              />
            </div>

            {/* Email */}
            <Input 
              id="email" 
              label="Email" 
              type="email" 
              value={form.email} 
              onChange={handleChange}
              isValid={emailValid && form.email.length > 0}
              error={form.email.length > 0 && !emailValid ? "Please enter a valid email address" : ""}
            />

            {/* Phone */}
            <Input
              id="phone"
              label="Mobile number"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit number"
              isValid={/^[0-9]{10}$/.test(form.phone)}
              error={form.phone.length > 0 && !/^[0-9]{10}$/.test(form.phone) ? "Please enter a valid 10-digit number" : ""}
            />

            {/* Password */}
            <PasswordInput
              id="password"
              label="Password"
              show={showPass}
              toggle={() => setShowPass(!showPass)}
              value={form.password}
              onChange={handleChange}
              passwordStrength={{
                length: passLen,
                upper: passUpper,
                lower: passLower,
                number: passNum,
                special: passSpec,
              }}
            />

            {/* Confirm Password */}
            <PasswordInput
              id="confirm"
              label="Confirm password"
              show={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
              value={form.confirm}
              onChange={handleChange}
              isValid={passwordsMatch && form.confirm.length > 0}
              error={form.confirm.length > 0 && !passwordsMatch ? "Passwords do not match" : ""}
            />

            {/* Error Message */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4"
              >
                <p className="text-sm text-red-700 dark:text-red-300 font-medium text-center">
                  {errorMsg}
                </p>
              </motion.div>
            )}

            {/* Material Design 3 Button */}
            <motion.button
              type="submit"
              disabled={!allGood || loading}
              className={`w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-200 ${
                !allGood || loading
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-60"
                  : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 active:scale-[0.98] shadow-lg shadow-green-500/30 dark:shadow-green-500/20"
              }`}
              whileTap={!loading && allGood ? { scale: 0.98 } : {}}
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create account</span>
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
                  Or continue with
                </span>
              </div>
            </div>

            {/* OAuth Buttons */}
            <OAuthButtons mode="signup" />

            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
}

/* ================= Reusable Inputs ================= */

function Input({ label, id, isValid = false, error = "", ...props }) {
  const hasValue = props.value && props.value.length > 0;
  const showError = error && hasValue;
  
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          {...props}
          className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 ${
            isValid && hasValue
              ? "border-green-500 dark:border-green-400 bg-white dark:bg-gray-700"
              : showError
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
          }`}
          required
          style={{
            fontSize: "16px", // Prevents zoom on iOS
          }}
        />
        {isValid && hasValue && !showError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5"
        >
          <span className="text-red-500">•</span>
          {error}
        </motion.p>
      )}
    </div>
  );
}

function PasswordInput({ label, show, toggle, passwordStrength, isValid = false, error = "", ...props }) {
  const hasValue = props.value && props.value.length > 0;
  const showError = error && hasValue;
  const strength = passwordStrength || {};
  
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 pr-12 ${
            isValid && hasValue
              ? "border-green-500 dark:border-green-400 bg-white dark:bg-gray-700"
              : showError
              ? "border-red-500 dark:border-red-400"
              : "border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
          }`}
          required
          style={{
            fontSize: "16px", // Prevents zoom on iOS
          }}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 active:scale-95 transition-all p-1 rounded-lg"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
        </button>
      </div>
      
      {/* Password Strength Indicator */}
      {passwordStrength && hasValue && (
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center gap-2 text-xs">
            <div className={`flex-1 h-1.5 rounded-full ${
              strength.length && strength.upper && strength.lower && strength.number && strength.special
                ? "bg-green-500"
                : strength.length && (strength.upper || strength.lower) && strength.number
                ? "bg-yellow-500"
                : "bg-gray-300"
            }`} />
            <span className={`text-xs ${
              strength.length && strength.upper && strength.lower && strength.number && strength.special
                ? "text-green-600 dark:text-green-400"
                : strength.length && (strength.upper || strength.lower) && strength.number
                ? "text-yellow-600 dark:text-yellow-400"
                : "text-gray-500"
            }`}>
              {strength.length && strength.upper && strength.lower && strength.number && strength.special
                ? "Strong"
                : strength.length && (strength.upper || strength.lower) && strength.number
                ? "Medium"
                : "Weak"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <div className={`flex items-center gap-1.5 ${strength.length ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
              <span>{strength.length ? "✓" : "○"}</span>
              <span>8+ characters</span>
            </div>
            <div className={`flex items-center gap-1.5 ${strength.upper ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
              <span>{strength.upper ? "✓" : "○"}</span>
              <span>Uppercase</span>
            </div>
            <div className={`flex items-center gap-1.5 ${strength.lower ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
              <span>{strength.lower ? "✓" : "○"}</span>
              <span>Lowercase</span>
            </div>
            <div className={`flex items-center gap-1.5 ${strength.number ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
              <span>{strength.number ? "✓" : "○"}</span>
              <span>Number</span>
            </div>
            <div className={`flex items-center gap-1.5 col-span-2 ${strength.special ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
              <span>{strength.special ? "✓" : "○"}</span>
              <span>Special character</span>
            </div>
          </div>
        </div>
      )}
      
      {showError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5 mt-1"
        >
          <span className="text-red-500">•</span>
          {error}
        </motion.p>
      )}
    </div>
  );
}
