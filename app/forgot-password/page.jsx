"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import useToast from "@/hooks/useToast";

export default function ForgotPasswordPage() {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      showToast("error", "Please enter a valid email address.");
      return;
    }

    try {
      // Use the deep link scheme for Android
      const redirectTo = "agropeer://reset-password";
      console.log("Reset password redirect URL:", redirectTo);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) throw error;

      setStatus("success");
      setMessage("Reset link sent! Check your email.");
      showToast("success", "Reset link sent! Check your email.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
      showToast("error", err.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center farm-pattern p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md farm-card p-8 mx-4 border-farm-500 shadow-xl bg-white rounded-xl"
      >
        <div className="text-center mb-6">
          <div className="bg-farm-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="text-2xl text-farm-600" />
          </div>
          <h1 className="text-2xl font-bold text-farm-800">
            Forgot Password
          </h1>
          <p className="text-farm-600 mt-2 text-sm">
            Enter your registered email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-farm-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="farm-input w-full pl-4 text-farm-600"
                required
              />
            </div>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center rounded-lg p-3 text-sm flex items-center justify-center gap-2 ${status === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-600"
                }`}
            >
              {status === "success" && <FaCheckCircle />}
              {message}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full farm-button py-3 flex items-center justify-center gap-2 ${status === "loading" ? "opacity-70 cursor-wait" : ""
              }`}
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
            {status !== "loading" && <FaArrowRight />}
          </button>
        </form>

        <div className="text-center mt-8">
          <Link
            href="/login"
            className="text-sm font-medium text-farm-600 hover:text-farm-700 underline underline-offset-2 hover:decoration-farm-500 transition-all"
          >
            ← Back to Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
