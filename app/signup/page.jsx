"use client";
import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import Signup from "@/components/SignupForm";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout } from "lucide-react";

export default function SignupPage() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Prevent scrolling on Android
  useEffect(() => {
    const isAndroid =
      Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";

    if (isAndroid) {
      document.body.classList.add("no-scroll");
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.height = "100vh";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";

      return () => {
        document.body.classList.remove("no-scroll");
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.height = "";
        document.body.style.width = "";
        document.documentElement.style.overflow = "";
        document.documentElement.style.height = "";
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full bg-[#FAF7F2] dark:bg-[#0d0d0d] font-sans">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[80%] bg-gradient-to-br from-green-200 to-transparent dark:from-green-950 rounded-b-[100%] pointer-events-none" />

      {/* Scrollable Container */}
      <div className="absolute inset-0 w-full h-full overflow-y-auto overscroll-none">
        <div className="min-h-full flex flex-col items-center justify-center p-6">
          {/* Top Section: Logo & Brand */}
          <div className="flex-none flex flex-col items-center justify-center relative z-10 mb-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg shadow-green-500/30 flex items-center justify-center text-white mb-3"
            >
              <Sprout size={32} fill="currentColor" />
            </motion.div>
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-gray-900 dark:text-white tracking-tight"
            >
              AgroPeer
            </motion.h1>
          </div>

          {/* Main Card Section */}
          <div className="w-full relative z-20 flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full sm:max-w-md"
            >
              <Signup />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
