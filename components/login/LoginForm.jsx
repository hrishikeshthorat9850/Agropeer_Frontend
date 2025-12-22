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
    <div className="w-full">
      {/* Material Design 3 Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Sign in to continue to AgroPeer
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
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 ${
                    isEmailValid && email.length > 0
                      ? "border-green-500 dark:border-green-400 bg-white dark:bg-gray-700"
                      : emailError && email.length > 0
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                  }`}
                  placeholder="your.email@example.com"
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
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-0 pr-12 ${
                    isPasswordValid && password.length > 0
                      ? "border-green-500 dark:border-green-400 bg-white dark:bg-gray-700"
                      : passwordError && password.length > 0
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-gray-600 focus:border-green-500 dark:focus:border-green-400"
                  }`}
                  placeholder="Enter your password"
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
              Forgot password?
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
            className={`w-full py-4 rounded-xl font-semibold text-white text-base transition-all duration-200 ${
              !isEmailValid || !isPasswordValid || loading
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 active:scale-[0.98] shadow-lg shadow-green-500/30 dark:shadow-green-500/20"
            }`}
            whileTap={!loading && isEmailValid && isPasswordValid ? { scale: 0.98 } : {}}
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
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
          <div>
            <OAuthButtons mode="login" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.form>
    </div>
  );
}

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import { validateEmail, validatePassword, sanitizeInput } from "@/utils/validation";
// import { motion } from "framer-motion";
// import OAuthButtons from "./OAuthButtons";
// import { Capacitor } from "@capacitor/core";

// export default function LoginForm() {
//   const router = useRouter();

//   // ✅ Android-only detection
//   const [isAndroid, setIsAndroid] = useState(false);

//   useEffect(() => {
//     setIsAndroid(
//       Capacitor.isNativePlatform() &&
//       Capacitor.getPlatform() === "android"
//     );
//   }, []);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const emailError = validateEmail(email);
//   const passwordError = validatePassword(password);

//   const isEmailValid = !emailError && email.length > 0;
//   const isPasswordValid = !passwordError && password.length > 0;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");

//     if (emailError) return setErrorMsg(emailError);
//     if (passwordError) return setErrorMsg(passwordError);

//     setLoading(true);

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email: sanitizeInput(email),
//         password,
//       });

//       if (error) {
//         if (error.message.includes("Invalid login credentials")) {
//           setErrorMsg("Invalid email or password.");
//         } else if (error.message.includes("Email not confirmed")) {
//           setErrorMsg("Please verify your email before login.");
//         } else if (error.message.includes("Too many requests")) {
//           setErrorMsg("Too many attempts. Please wait.");
//         } else {
//           setErrorMsg(error.message);
//         }
//         return;
//       }

//       if (data?.user) router.push("/home");
//     } catch (err) {
//       setErrorMsg(err.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`
//         farm-pattern
//         ${isAndroid
//           ? "min-h-[100dvh] flex items-center justify-center px-4 pt-safe-top pb-safe-bottom"
//           : "min-h-screen flex items-center justify-center"}
//       `}
//     >
//       <motion.div
//         initial={{ opacity: 0, scale: 0.96, y: 24 }}
//         animate={{ opacity: 1, scale: 1, y: 0 }}
//         transition={{ duration: 0.45 }}
//         className={`
//           w-full max-w-md farm-card shadow-2xl
//           ${isAndroid ? "px-6 py-6" : "px-8 py-5"}
//         `}
//       >
//         <motion.form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.15 }}
//         >
//           {/* Email */}
//           <div>
//             <label className="block font-semibold text-farm-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={`
//                 farm-input
//                 ${isEmailValid ? "border-farm-500" : "border-red-400"}
//               `}
//               placeholder="Enter your email"
//               required
//             />
//             {emailError && (
//               <p className="text-sm text-red-500 mt-1 animate-fade-in">
//                 ⚠️ {emailError}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block font-semibold text-farm-700 mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPass ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className={`
//                   farm-input pr-12
//                   ${isPasswordValid ? "border-farm-500" : "border-red-400"}
//                 `}
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPass((s) => !s)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-farm-600"
//                 aria-label="Toggle password visibility"
//               >
//                 {showPass ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {passwordError && (
//               <p className="text-sm text-red-500 mt-1 animate-fade-in">
//                 ⚠️ {passwordError}
//               </p>
//             )}
//           </div>

//           {/* Forgot password */}
//           <div className="text-right">
//             <Link
//               href="/forgot-password"
//               className="text-sm text-farm-600 underline underline-offset-2"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           {/* Error message */}
//           {errorMsg && (
//             <motion.div
//               initial={{ opacity: 0, y: -6 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-50 border border-red-200 rounded-xl p-3 text-center"
//             >
//               <p className="text-red-600 font-medium">{errorMsg}</p>
//             </motion.div>
//           )}

//           {/* Submit */}
//           <motion.button
//             type="submit"
//             disabled={!isEmailValid || !isPasswordValid || loading}
//             whileTap={{ scale: 0.97 }}
//             className={`
//               w-full farm-button
//               ${loading || !isEmailValid || !isPasswordValid
//                 ? "opacity-50 cursor-not-allowed"
//                 : ""}
//             `}
//           >
//             {loading ? "Signing in..." : "Sign in"}
//           </motion.button>

//           {/* OAuth */}
//           <OAuthButtons mode="login" />

//           {/* Signup */}
//           <p className="text-center text-farm-600">
//             Don&apos;t have an account?{" "}
//             <Link href="/signup" className="font-semibold underline">
//               Sign up
//             </Link>
//           </p>
//         </motion.form>
//       </motion.div>
//     </div>
//   );
// }
