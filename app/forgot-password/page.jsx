"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      setStatus("success");
      setMessage("Reset link sent! Check your email.");
      showToast("success", "Reset link sent! Check your email. 📧");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Something went wrong.");
      showToast("error", err.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center farm-pattern">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md farm-card p-8 mx-4 border-farm-500 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-farm-800 text-center mb-4">
          Forgot Password
        </h1>
        <p className="text-center text-farm-600 mb-6">
          Enter your registered email to get a reset link.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-5">
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
                className="farm-input w-full text-farm-600"
                required
              />
              <FaEnvelope className="absolute right-3 top-1/2 -translate-y-1/2 text-farm-500" />
            </div>
          </div>

          {message && (
            <div
              className={`text-center rounded-lg p-3 text-sm ${
                status === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              {status === "success" && <FaCheckCircle className="inline mr-2" />}
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={`w-full farm-button ${
              status === "loading" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="text-center mt-6">
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
