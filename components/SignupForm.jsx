"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSeedling, FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import OAuthButtons from "@/components/login/OAuthButtons";
import useToast from "@/hooks/useToast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasUpper = (s) => /[A-Z]/.test(s);
const hasLower = (s) => /[a-z]/.test(s);
const hasNumber = (s) => /[0-9]/.test(s);
const hasSpecial = (s) => /[^A-Za-z0-9]/.test(s);

export default function SignupForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [signupFormData,setSignupFormData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    confirm : "",
    phone : "",
    country : "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const emailValid = emailRegex.test(signupFormData.email);
  const passLen = signupFormData.password.length >= 8;
  const passUpper = hasUpper(signupFormData.password);
  const passLower = hasLower(signupFormData.password);
  const passNum = hasNumber(signupFormData.password);
  const passSpec = hasSpecial(signupFormData.password);
  const passwordsMatch = signupFormData.password === signupFormData.confirm && signupFormData.password.length > 0;
  const allGood =
    emailValid &&
    passLen &&
    passUpper &&
    passLower &&
    passNum &&
    passSpec &&
    passwordsMatch;

    // const handleInputChange = (e)=>{
    //   const {id,value} = e.target;
    //   setSignupFormData((prev)=>({
    //     ...prev,[id]:value
    //   }))
    // }
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      if (id === "phone") {
        // Only digits and max 10
        const cleanValue = value.replace(/\D/g, "").slice(0, 10);
        setSignupFormData((prev) => ({ ...prev, [id]: cleanValue }));
      } else {
        setSignupFormData((prev) => ({ ...prev, [id]: value }));
      }
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMsg("");

      // Basic validations
      if (!emailValid) {
        setErrorMsg("Please enter a valid email");
        showToast("error", "Please enter a valid email");
        return;
      }
      if (!passLen) {
        setErrorMsg("Password must be at least 8 characters");
        showToast("error", "Password must be at least 8 characters");
        return;
      }
      if (!passUpper || !passLower || !passNum || !passSpec) {
        setErrorMsg("Password must contain uppercase, lowercase, number and special character");
        showToast("error", "Password must contain uppercase, lowercase, number and special character");
        return;
      }
      if (!passwordsMatch) {
        setErrorMsg("Passwords do not match");
        showToast("error", "Passwords do not match");
        return;
      }

      setLoading(true);

      try {
        // Sign up user with Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: signupFormData.email,
          password: signupFormData.password,
        });

        if (authError) {
          setErrorMsg(authError.message || "Sign up failed");
          showToast("error", authError.message || "Sign up failed");
          return;
        }

        const userId = authData?.user?.id;
        if (!userId) {
          setErrorMsg("Sign up failed: no user id returned");
          showToast("error", "Sign up failed: no user id returned");
          return;
        }

        // Insert user info into 'userinfo' table
        const { data: userInfoData, error: userInfoError } = await supabase
          .from("userinfo")
          .insert([
            {
              id: userId,
              firstName: signupFormData.firstName || null,
              lastName: signupFormData.lastName || null,
              mobile: signupFormData.phone || null,
              country : signupFormData.country || null,
            },
          ]);

        if (userInfoError) {
          console.error("Error inserting into userinfo:", userInfoError);
          setErrorMsg("Failed to save your profile info. Try again.");
          showToast("error", "Failed to save your profile info. Try again.");
          return;
        }

        // Redirect to login
        showToast("success", "Account created successfully! Redirecting to login... 🎉");
        setTimeout(() => router.push("/login"), 1500);
      } catch (err) {
        console.error(err);
        setErrorMsg(err.message || "Sign up failed");
        showToast("error", err.message || "Sign up failed");
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="w-full overflow-x-hidden">
      <div className="relative w-full min-h-[calc(100vh-122px)] flex items-center justify-center overflow-hidden">
        <div className="absolute w-80 h-80 bg-green-200/40 rounded-full blur-3xl top-[-60px] left-[-60px] animate-[float1_8s_ease-in-out_infinite]" />
        <div className="absolute w-96 h-96 bg-yellow-200/40 rounded-full blur-3xl bottom-[-100px] right-[-80px] animate-[float2_10s_ease-in-out_infinite]" />
        <div className="absolute w-[400px] h-[400px] bg-green-100/30 rounded-full blur-3xl top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 animate-[pulse_12s_ease-in-out_infinite]" />
        <div className="w-full max-w-md bg-white rounded-2xl py-4 px-12 m-2 border-farm-400 shadow-2xl dark:bg-black">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FaSeedling className="text-3xl text-green-500" />
              <span className="text-2xl font-bold tracking-tight text-green-800 dark:text-green-200">
                AgroPeer
              </span>
            </div>
            <h2 className="text-lg font-bold text-green-900">
              Create Your Account
            </h2>
            <p className="text-green-700 mt-1 text-sm">
              Sign up to start your journey
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-bold text-farm-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={signupFormData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    signupFormData.firstName.trim().length === 0
                      ? "border-red-400"
                      : "border-green-400"
                  }`}
                  placeholder="Your First Name"
                  required
                />

                {signupFormData.firstName.trim().length === 0 && (
                  <p className="text-xs text-red-500 mt-1 dark:text-red-500">First name is required</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-bold text-farm-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  value={signupFormData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    signupFormData.lastName.trim().length === 0
                      ? "border-red-400"
                      : "border-green-400"
                  }`}
                  placeholder="Your Last Name"
                  required
                />

                {signupFormData.lastName.trim().length === 0 && (
                  <p className="text-xs text-red-500 mt-1 dark:text-red-500">Last name is required</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-farm-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={signupFormData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    emailValid || signupFormData.email.length === 0
                      ? "border-green-400"
                      : "border-red-400"
                  }`}
                  placeholder="Enter your Email"
                  required
                />
                {!emailValid && signupFormData.email.length > 0 && (
                  <p className="text-xs text-red-500 mt-1 dark:text-red-500">Invalid email</p>
                )}
              </div>
              {/* 📱 Mobile Number + OTP Section (responsive & validated) */}
              <div className="space-y-3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-bold text-farm-700 mb-1"
                >
                  Mobile Number
                </label>

                {/* Mobile input row */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Country code */}
                  {/* <div className="flex items-center border-2 border-green-400 rounded-lg px-2">
                    <select
                      id="country"
                      value={signupFormData.country}
                      onChange={handleInputChange}
                      className="bg-transparent text-black py-2 pr-1 focus:outline-none text-sm font-medium"
                    >
                      <option value="+91">IN +91</option>
                    </select>
                  </div> */}

                  {/* Phone number */}
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    value={signupFormData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit number"
                    className={`flex-1 min-w-[130px] px-3 py-2 border-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-green-300 ${
                      /^[0-9]{10}$/.test(signupFormData.phone) || signupFormData.phone.length === 0
                        ? "border-green-400"
                        : "border-red-400"
                    }`}
                    required
                  />

                  {/* Send OTP button */}
                  {/* <button
                    type="button"
                    className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Send OTP
                  </button> */}
                </div>

                {/* ⚠️ Error message */}
                {!/^[0-9]{10}$/.test(signupFormData.phone) &&
                  signupFormData.phone.length > 0 && (
                    <p className="text-xs text-red-500 mt-1 dark:text-red-500">
                      Enter a valid 10-digit number
                    </p>
                  )}

                {/* OTP Section */}
                {/* <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-2 dark:bg-[#1E1E1E] dark:border-none">
                  <label
                    htmlFor="otp"
                    className="block text-sm font-bold text-green-700 mb-2"
                  >
                    Enter OTP
                  </label>

                  <div className="flex justify-between sm:justify-start sm:gap-3 gap-1 flex-wrap">
                    {[...Array(6)].map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength="1"
                        className="w-8 h-8 sm:w-10 sm:h-10 text-center text-base font-semibold border-2 border-green-400 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
                        onInput={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          e.target.value = value;

                          if (value && e.target.nextElementSibling) {
                            e.target.nextElementSibling.focus();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !e.target.value && e.target.previousElementSibling) {
                            e.target.previousElementSibling.focus();
                          }
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-3 text-xs sm:text-sm">
                    <button
                      type="button"
                      className="text-green-700 hover:text-green-900 font-medium"
                    >
                      Resend OTP
                    </button>
                    <div className="flex items-center gap-1 text-green-700 font-semibold">
                      <svg
                        className="w-3 h-3 animate-spin text-green-700"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                        ></path>
                      </svg>
                      <span>Verifying...</span>
                    </div>
                  </div>
                </div> */}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-farm-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={signupFormData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                      signupFormData.password.length === 0 || passLen
                        ? "border-green-400"
                        : "border-red-400"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-4 text-blue-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {signupFormData.password.length > 0 && (
                  <div className="text-xs mt-1 space-y-1">
                    <div
                      className={`transition-colors ${
                        passLen ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      • At least 8 characters
                    </div>
                    <div
                      className={`transition-colors ${
                        passUpper ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      • Uppercase letter
                    </div>
                    <div
                      className={`transition-colors ${
                        passLower ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      • Lowercase letter
                    </div>
                    <div
                      className={`transition-colors ${
                        passNum ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      • Number
                    </div>
                    <div
                      className={`transition-colors ${
                        passSpec ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      • Special character
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirm"
                  className="block text-sm font-bold text-green-700 mb-1"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    value={signupFormData.confirm}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border-2 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                      passwordsMatch || signupFormData.confirm.length === 0
                        ? "border-green-400"
                        : "border-red-400"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-2 top-4 text-blue-700"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {!passwordsMatch && signupFormData.confirm.length > 0 && (
                  <p className="text-xs text-red-500 mt-1 dark:text-red-500">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>

            {errorMsg && <div className="text-sm text-red-600">{errorMsg}</div>}

            <button
              type="submit"
              disabled={!allGood || loading}
              className={`w-full py-2 rounded text-white ${
                !allGood || loading
                  ? "bg-green-300 cursor-not-allowed dark:bg-green-700"
                  : "bg-green-700 hover:bg-green-800"
              }`}
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            {/* OAuth Buttons */}
            <OAuthButtons mode="signup" />

            <div className="text-center">
              <p className="text-sm text-green-700">
                Already have an account?{" "}
                <br/>
                <Link
                  href="/login"
                  className="font-medium text-green-700 hover:text-green-900 transition-colors"
                >
                  Log in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
