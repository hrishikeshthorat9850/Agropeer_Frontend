"use client";

import { useState, useEffect } from "react";
import { FaHome, FaPlusCircle, FaTractor, FaImages } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

import { useLanguage } from "@/Context/languagecontext";
// ADDITIVE ENHANCEMENT: Import forward page transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { usePageTransition } from "@/hooks/usePageTransition";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function MobileBottomNav({ onAI }) {
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get forward transition handlers
  // Original router.push() still available, this adds smooth transitions
  const { push } = usePageTransition();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  const safeBottom = "env(safe-area-inset-bottom, 0px)";

  const openAI = () => {

    if (typeof onAI === "function") onAI();
    else window.dispatchEvent(new CustomEvent("open-ai"));
  };

  // ✅ Handle Android Back Press for FAB Menu
  useBackPress(() => {
    if (open) {
      setOpen(false);
      return true;
    }
    return false;
  }, 20, open);

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
              // ENHANCED: Use push() with smooth transition instead of router.push()
              // PRESERVED: All other behavior unchanged
              push("/sell/choose");
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
              {t("nav_sell")}
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
              // ENHANCED: Use push() with smooth transition instead of router.push()
              // PRESERVED: All other behavior unchanged
              push("/posts");
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
              {t("nav_post")}
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
      <div className="fixed bottom-0 left-0 right-0 w-full md:hidden z-50 bg-white/95 dark:bg-black/95 backdrop-blur-md pb-safe-bottom h-mobile-bottom-nav">
        <div className="flex items-center justify-between px-4 h-[56px]">
          {/* HOME */}
          <button
            onClick={() => {
              Haptics.impact({ style: ImpactStyle.Light });
              // ENHANCED: Use push() with smooth transition instead of router.push()
              // PRESERVED: All other behavior unchanged (haptics, styling, etc.)
              push("/");
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
                className={`text-earth-500 ${
                  pathname === "/" ? "" : "opacity-90"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                pathname === "/"
                  ? "text-farm-900 dark:text-farm-100"
                  : "text-surface-600 dark:text-surface-400"
              }`}
            >
              {t("nav_home")}
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
              {t("nav_ask_ai")}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
