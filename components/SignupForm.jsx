"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSeedling, FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import OAuthButtons from "@/components/login/OAuthButtons";
import useToast from "@/hooks/useToast";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 dark:bg-neutral-900">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <FaSeedling className="text-4xl text-green-600 mb-2" />
          <h1 className="text-xl font-bold text-green-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-sm text-green-700 dark:text-green-400">
            Join AgroPeer today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <Input id="firstName" label="First name" value={form.firstName} onChange={handleChange} />
            <Input id="lastName" label="Last name" value={form.lastName} onChange={handleChange} />
          </div>

          <Input id="email" label="Email" type="email" value={form.email} onChange={handleChange} />

          <Input
            id="phone"
            label="Mobile number"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="10-digit number"
          />

          {/* Password */}
          <PasswordInput
            id="password"
            label="Password"
            show={showPass}
            toggle={() => setShowPass(!showPass)}
            value={form.password}
            onChange={handleChange}
          />

          <PasswordInput
            id="confirm"
            label="Confirm password"
            show={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
            value={form.confirm}
            onChange={handleChange}
          />

          {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}

          <button
            disabled={!allGood || loading}
            className="w-full h-12 rounded-xl bg-green-700 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <OAuthButtons mode="signup" />

          <p className="text-center text-sm text-green-700 mt-4">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

/* ================= Reusable Inputs ================= */

function Input({ label, id, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-green-700">{label}</label>
      <input
        id={id}
        {...props}
        className="w-full h-12 px-4 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none text-black"
        required
      />
    </div>
  );
}

function PasswordInput({ label, show, toggle, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-green-700">{label}</label>
      <div className="relative">
        <input
          {...props}
          type={show ? "text" : "password"}
          className="w-full h-12 px-4 rounded-xl border border-green-300 focus:ring-2 focus:ring-green-400 outline-none text-black"
          required
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-4 top-3 text-green-700"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}
