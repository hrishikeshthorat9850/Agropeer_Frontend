"use client";
import Link from "next/link";
import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa"; // Removed
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import OAuthButtons from "@/components/login/OAuthButtons";
import useToast from "@/hooks/useToast";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

/* ================= Helpers (Preserved Logic) ================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasUpper = (s) => /[A-Z]/.test(s);
const hasLower = (s) => /[a-z]/.test(s);
const hasNumber = (s) => /[0-9]/.test(s);
const hasSpecial = (s) => /[^A-Za-z0-9]/.test(s);

/* ================= Component ================= */
export default function SignupForm() {
  const { t } = useLanguage();
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

  /* ================= Validation (Preserved Logic) ================= */
  const emailValid = emailRegex.test(form.email);
  const passLen = form.password.length >= 8;
  const passUpper = hasUpper(form.password);
  const passLower = hasLower(form.password);
  const passNum = hasNumber(form.password);
  const passSpec = hasSpecial(form.password);
  const passwordsMatch =
    form.password === form.confirm && form.confirm.length > 0;

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

  /* ================= Handlers (Preserved Logic) ================= */
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
    console.log("Signup FOrmData is :",form);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      console.log("Error in signup is :",error);
      if (error) throw error;
      if (!data?.user?.id) throw new Error(t("user_id_missing"));

      const { error: profileError } = await supabase
        .from("userinfo")
        .update({
          firstName: form.firstName,
          lastName: form.lastName,
          mobile: form.phone,
          country: form.country || null,
        })
        .eq("id", data.user?.id);

      if (profileError) throw profileError;


      showToast("success", t("account_created_success"));
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
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("create_account")}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t("join_agropeer") || "Join our growing community"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
              <User size={18} />
            </div>
            <input
              id="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder={t("first_name")}
              className="w-full h-12 pl-10 pr-3 bg-gray-50 dark:bg-[#1C1C1E] rounded-xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
              required
            />
          </div>
          <div className="relative group">
            {/* No icon for last name to keep cleaner look or can reuse User */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
              <User size={18} />
            </div>
            <input
              id="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder={t("last_name")}
              className="w-full h-12 pl-10 pr-3 bg-gray-50 dark:bg-[#1C1C1E] rounded-xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
            <Mail size={18} />
          </div>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t("email_label")}
            className={`w-full h-12 pl-10 pr-4 bg-gray-50 dark:bg-[#1C1C1E] rounded-xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm ${
              form.email.length > 0 && !emailValid
                ? "ring-2 ring-red-500/20 bg-red-50/50"
                : ""
            }`}
            required
          />
        </div>

        {/* Phone */}
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
            <Phone size={18} />
          </div>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder={t("mobile_number")}
            className="w-full h-12 pl-10 pr-4 bg-gray-50 dark:bg-[#1C1C1E] rounded-xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
            maxLength={10}
            required
          />
        </div>

        {/* Passwords */}
        <div className="space-y-3">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
              <Lock size={18} />
            </div>
            <input
              id="password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder={t("password_label")}
              className="w-full h-12 pl-10 pr-10 bg-gray-50 dark:bg-[#1C1C1E] rounded-xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors pointer-events-none">
              <Lock size={18} />
            </div>
            <input
              id="confirm"
              type={showConfirm ? "text" : "password"}
              value={form.confirm}
              onChange={handleChange}
              placeholder={t("confirm_password")}
              className="w-full h-12 pl-10 pr-10 bg-gray-50 dark:bg-[#1C1C1E] rounded-xl border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 text-sm font-medium focus:ring-2 focus:ring-green-500/20 transition-all shadow-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Requirements Indicators (Compact) */}
        {form.password.length > 0 && (
          <div className="flex flex-wrap gap-2 text-[10px] items-center justify-center opacity-80">
            <span
              className={passLen ? "text-green-600 font-bold" : "text-gray-400"}
            >
              8+ Chars
            </span>{" "}
            •
            <span
              className={
                passUpper ? "text-green-600 font-bold" : "text-gray-400"
              }
            >
              Upper
            </span>{" "}
            •
            <span
              className={
                passLower ? "text-green-600 font-bold" : "text-gray-400"
              }
            >
              Lower
            </span>{" "}
            •
            <span
              className={passNum ? "text-green-600 font-bold" : "text-gray-400"}
            >
              Num
            </span>{" "}
            •
            <span
              className={
                passSpec ? "text-green-600 font-bold" : "text-gray-400"
              }
            >
              Special
            </span>
          </div>
        )}

        {/* Error Message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-xl text-center"
            >
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                {errorMsg}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!allGood || loading}
          className="w-full h-12 bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all rounded-xl text-white font-bold text-sm shadow-lg shadow-green-600/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100 mt-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              {t("create_account_btn")}
              <ArrowRight size={16} strokeWidth={2.5} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 py-1">
          <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            {t("or_continue_with")}
          </span>
          <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
        </div>

        {/* OAuth */}
        <OAuthButtons mode="signup" />

        {/* Login Link */}
        <div className="text-center pt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {t("already_have_account")}{" "}
            <Link
              href="/login"
              className="text-green-600 dark:text-green-500 font-bold hover:underline"
            >
              {t("sign_in")}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
