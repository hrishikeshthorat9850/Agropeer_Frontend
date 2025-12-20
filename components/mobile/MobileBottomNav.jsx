"use client";

import { useState, useEffect } from "react";
import {
  FaHome,
  FaPlusCircle,
  FaTractor,
  FaImages,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function MobileBottomNav({ onAI }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const safeBottom = "env(safe-area-inset-bottom)";

  const openAI = () => {
    if (typeof onAI === "function") onAI();
    else window.dispatchEvent(new CustomEvent("open-ai"));
  };

  useEffect(() => {
    if (!open) return;

    const closePopButtons = (e) => {
      // If click is outside the big plus button → close
      if (!e.target.closest(".big-plus-btn")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", closePopButtons);

    return () => document.removeEventListener("click", closePopButtons);
  }, [open]);

  return (
    <>
      {/* LEFT POP BUTTON */}
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0, scale: 0, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 60 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            onClick={() => {
              setOpen(false);
              router.push("/sell/choose");
            }}
            className="
              fixed left-24 z-[998]
              w-12 h-12 rounded-2xl 
              bg-gradient-to-br from-orange-500 to-orange-400 
              text-white shadow-xl flex items-center justify-center
              active:scale-95
            "
            style={{ bottom: `calc(${safeBottom} + 100px)` }}
          >
            <FaTractor size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* RIGHT POP BUTTON */}
      <AnimatePresence>
        {open && (
          <motion.button
            initial={{ opacity: 0, scale: 0, x: -60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: -60 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            onClick={() => {
              setOpen(false);
              router.push("/posts");
            }}
            className="
              fixed right-24 z-[998]
              w-12 h-12 rounded-2xl 
              bg-gradient-to-br from-blue-600 to-blue-500 
              text-white shadow-xl flex items-center justify-center
              active:scale-95
            "
            style={{ bottom: `calc(${safeBottom} + 100px)` }}
          >
            <FaImages size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ⭐ FULL-WIDTH NAV — ZERO GAP, GUARANTEED */}
      <div
        className="fixed bottom-0 left-0 right-0 md:hidden z-[999] bg-gradient-to-r from-[#2E7D32] to-[#1B5E20]
          shadow-[0_-2px_20px_rgba(0,0,0,0.3)] rounded-tr-xl rounded-tl-xl"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom) + 6px)",
        }}
      >
        <div className="flex items-center justify-around py-2 px-6">

          {/* HOME */}
          <button
            onClick={() => router.push("/")}
            className="
              flex flex-col items-center gap-1 text-white active:scale-90 transition
            "
          >
            <FaHome className="text-orange-100" size={28} />
            <span className="text-[11px]">Home</span>
          </button>

          {/* BIG PLUS BUTTON */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setOpen((p) => !p);
            }}
            whileTap={{ scale: 0.9 }}
            className="big-plus-btn relative w-16 h-16 -mt-10
              bg-gradient-to-br from-orange-500 to-orange-400
              rounded-full text-white
              shadow-[0_12px_30px_rgba(0,0,0,0.35)]
              border border-white/20
              flex items-center justify-center
            "
          >
            <FaPlusCircle size={50} />
          </motion.button>

          {/* AI */}
          <button
            onClick={openAI}
            className="
              flex flex-col items-center gap-1 text-white active:scale-90 transition
            "
          >
            <Sparkles className="text-orange-100" size={28} />
            <span className="text-[11px]">AI</span>
          </button>
        </div>
      </div>
    </>
  );
}
