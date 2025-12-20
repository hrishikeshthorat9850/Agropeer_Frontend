"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword, sanitizeInput } from "@/utils/validation";
import { motion } from "framer-motion";
import OAuthButtons from "./OAuthButtons";

export default function LoginForm() {
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
        throw new Error("Authentication service unavailable. Please try again later.");
      }

      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: sanitizeInput(email), 
        password 
      });

      if (error) {
        // Handle specific error types
        if (error.message.includes('Invalid login credentials')) {
          setErrorMsg("Invalid email or password. Please check your credentials and try again.");
        } else if (error.message.includes('Email not confirmed')) {
          setErrorMsg("Please check your email and click the confirmation link before signing in.");
        } else if (error.message.includes('Too many requests')) {
          setErrorMsg("Too many login attempts. Please wait a few minutes before trying again.");
        } else {
          setErrorMsg(error.message || "Login failed. Please try again.");
        }
        return;
      }

      if (data?.user) {
        // Success - redirect to home page
        router.push("/home");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="farm-pattern flex items-center justify-center relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md farm-card px-8 py-4 sm:m-2 relative z-10 border-farm-500 shadow-2xl"
      >

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-3"
          onSubmit={handleSubmit}
        >
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <label
                htmlFor="email"
                className="block font-semibold text-farm-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`farm-input text-farm-900 focus-farm ${
                  isEmailValid ? "border-farm-500" : "border-red-400"
                }`}
                placeholder="Enter your email"
                required
              />
              {emailError && email.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-2 flex items-center gap-1"
                >
                  <span>⚠️</span>
                  {emailError}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <label
                htmlFor="password"
                className="block font-semibold text-farm-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`farm-input text-farm-900 focus-farm pr-12 ${
                    isPasswordValid ? "border-farm-500" : "border-red-400"
                  }`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-farm-600 hover:text-farm-700 transition-colors"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordError && password.length > 0 && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 mt-2 flex items-center gap-1"
                >
                  <span>⚠️</span>
                  {passwordError}
                </motion.p>
              )}
            </motion.div>
          </div>

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-farm-600 hover:text-farm-700 underline underline-offset-2 hover:decoration-farm-500 transition-all"
            >
              Forgot Password?
            </Link>
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4 text-center"
            >
              <p className="text-red-600 font-medium">{errorMsg}</p>
            </motion.div>
          )}

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            type="submit"
            disabled={!isEmailValid || !isPasswordValid || loading}
            className={`w-full farm-button group ${
              !isEmailValid || !isPasswordValid || loading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            whileHover={{ scale: !loading && isEmailValid && isPasswordValid ? 1.02 : 1 }}
            whileTap={{ scale: !loading && isEmailValid && isPasswordValid ? 0.98 : 1 }}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                </>
              )}
            </span>
          </motion.button>

          {/* OAuth Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <OAuthButtons mode="login" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
            className="text-center"
          >
            <p className="text-farm-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-farm-600 hover:text-farm-700 transition-colors underline decoration-2 underline-offset-2 hover:decoration-farm-500"
              ><br />
                Sign up here
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}