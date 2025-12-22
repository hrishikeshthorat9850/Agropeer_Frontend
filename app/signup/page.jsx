"use client";
import { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import Signup from "@/components/SignupForm";
import { motion } from "framer-motion";

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
    const isAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === "android";
    
    if (isAndroid) {
      // Store original styles
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalBodyHeight = document.body.style.height;
      const originalBodyWidth = document.body.style.width;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalHtmlHeight = document.documentElement.style.height;
      
      // Add no-scroll class for CSS support
      document.body.classList.add("no-scroll");
      
      // Prevent body scrolling using position fixed (most reliable method)
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.height = "100vh";
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.height = "100vh";
      
      return () => {
        // Remove no-scroll class
        document.body.classList.remove("no-scroll");
        
        // Restore original styles
        document.body.style.overflow = originalBodyOverflow;
        document.body.style.position = originalBodyPosition;
        document.body.style.height = originalBodyHeight;
        document.body.style.width = originalBodyWidth;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.documentElement.style.height = originalHtmlHeight;
      };
    }
  }, []);

  return (
    <div className={`fixed inset-0 h-[100dvh] flex flex-col items-center justify-center overflow-hidden overflow-x-hidden overflow-y-hidden overscroll-none touch-none bg-gradient-to-br from-green-50 via-white to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${
      isMobile ? "pt-[calc(56px+env(safe-area-inset-top,0px))] pb-[calc(90px+env(safe-area-inset-bottom,0px))]" : ""
    }`}>
      {/* Modern Material Design Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-transparent to-green-50/10 dark:from-green-900/10 dark:via-transparent dark:to-transparent" />
        
        {/* Material Design 3 subtle patterns */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[600px] h-[600px] bg-green-200/10 dark:bg-green-500/5 rounded-full blur-3xl -top-1/4 -left-1/4"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[500px] h-[500px] bg-green-300/10 dark:bg-green-400/5 rounded-full blur-3xl -bottom-1/4 -right-1/4"
        />
      </div>

      {/* Signup Form */}
      <div className="relative w-full max-w-md mx-auto px-4 z-10 overflow-y-auto" style={{ maxHeight: isMobile ? 'calc(100vh - 146px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px))' : '100%' }}>
        <Signup />
      </div>
    </div>
  );
}