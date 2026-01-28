"use client";

import { useState, useEffect } from "react";
import { FaHome, FaPlusCircle, FaTractor, FaImages } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

import { Keyboard } from "@capacitor/keyboard";
import { Capacitor } from "@capacitor/core";

export default function MobileBottomNav({ onAI }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    Keyboard.addListener("keyboardWillShow", () => {
      setIsKeyboardOpen(true);
    });

    Keyboard.addListener("keyboardWillHide", () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);

  const safeBottom = "env(safe-area-inset-bottom, 0px)";

  if (isKeyboardOpen) return null;

  const openAI = () => {
    // ... existing openAI code

    if (typeof onAI === "function") onAI();
    else window.dispatchEvent(new CustomEvent("open-ai"));
  };

  useEffect(() => {
    if (!open) return;

    const closePopButtons = (e) => {
      if (!e.target.closest(".big-plus-btn")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closePopButtons);
    return () => document.removeEventListener("click", closePopButtons);
  }, [open]);

  const navItems = [
    { label: "Home", icon: FaHome, route: "/" },
    { label: "AI", icon: Sparkles, action: openAI, isActive: false }, // Action item
  ];

  return (
    <>
      {/* LEFT POP BUTTON (Sell) */}
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0, scale: 0, x: 60, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: 60, y: 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }} // Fast Pop
            onClick={() => {
              setOpen(false);
              router.push("/sell/choose");
            }}
            className="
              fixed left-[calc(50%-80px)] z-[998]
              flex flex-col items-center gap-2
              active:scale-95
            "
            style={{ bottom: `calc(${safeBottom} + 90px)` }}
          >
            <div className="w-12 h-12 rounded-full bg-earth-500 text-white shadow-elevation-3 flex items-center justify-center">
              <FaTractor size={20} />
            </div>
            <span className="text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-md">
              Sell
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* RIGHT POP BUTTON (Post) */}
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0, scale: 0, x: -60, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: -60, y: 20 }}
            transition={{ duration: 0.15, ease: "easeOut" }} // Fast Pop
            onClick={() => {
              setOpen(false);
              router.push("/posts");
            }}
            className="
              fixed right-[calc(50%-80px)] z-[998]
              flex flex-col items-center gap-2
              active:scale-95
            "
            style={{ bottom: `calc(${safeBottom} + 90px)` }}
          >
            <div className="w-12 h-12 rounded-full bg-farm-500 text-white shadow-elevation-3 flex items-center justify-center">
              <FaImages size={20} />
            </div>
            <span className="text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded-md backdrop-blur-md">
              Post
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* OVERLAY for FAB */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }} // Fast Overlay
            className="fixed inset-0 z-[997] bg-black/20 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* ⭐ MATERIAL 3 BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 w-full md:hidden z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md pb-safe-bottom h-mobile-bottom-nav border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 h-[56px]">
          {/* HOME */}
          <button
            onClick={() => {
              Haptics.impact({ style: ImpactStyle.Light });
              router.push("/");
            }}
            className="flex-1 flex flex-col items-center group"
          >
            <div
              className={`
              px-5 py-1.5 rounded-full transition-all duration-300
              ${
                pathname === "/"
                  ? "bg-farm-200 dark:bg-farm-800 text-farm-900 dark:text-farm-100"
                  : "text-surface-600 dark:text-surface-400 group-hover:bg-surface-100 dark:group-hover:bg-surface-800"
              }
            `}
            >
              <FaHome
                size={24}
                className={pathname === "/" ? "" : "opacity-90"}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                pathname === "/"
                  ? "text-farm-900 dark:text-farm-100"
                  : "text-surface-600 dark:text-surface-400"
              }`}
            >
              Home
            </span>
          </button>

          {/* FAB (Create) */}
          <div className="flex-1 flex justify-center -mt-8">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                Haptics.impact({ style: ImpactStyle.Medium });
                setOpen((p) => !p);
              }}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: open ? 45 : 0 }}
              transition={{ duration: 0.15, ease: "easeInOut" }} // Fast Rotate
              className="w-16 h-16 rounded-2xl bg-farm-500 text-white shadow-elevation-3 flex items-center justify-center transition-all duration-200 ease-out active:scale-95 hover:scale-105"
            >
              <FaPlusCircle size={32} className="bg-orange-500 rounded-full" />
            </motion.button>
          </div>

          {/* AI */}
          <button
            onClick={() => {
              Haptics.impact({ style: ImpactStyle.Light });
              openAI();
            }}
            className="flex-1 flex flex-col items-center group"
          >
            <div
              className={`
              px-5 py-1.5 rounded-full transition-all duration-300
              text-surface-600 dark:text-surface-400 group-hover:bg-surface-100 dark:group-hover:bg-surface-800
            `}
            >
              <Sparkles size={24} className="opacity-70 text-earth-500" />
            </div>
            <span className="text-xs font-medium text-surface-600 dark:text-surface-400">
              Ask AI
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
