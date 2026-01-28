"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/Context/languagecontext";
import { Network } from "@capacitor/network";
import { Capacitor } from "@capacitor/core";
import { motion, AnimatePresence } from "framer-motion";
import { FaWifi, FaExclamationTriangle } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);
  const [justBack, setJustBack] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Handler for status changes
    const handleStatusChange = (status) => {
      const isConnected = status.connected;
      if (!isConnected) {
        setOffline(true);
        setJustBack(false);
      } else {
        // If we were offline, show "Back Online"
        setOffline((prev) => {
          if (prev) {
            setJustBack(true);
            setTimeout(() => setJustBack(false), 2000);
          }
          return false;
        });
      }
    };

    // Initialize
    const initNetwork = async () => {
      if (Capacitor.isNativePlatform()) {
        const status = await Network.getStatus();
        handleStatusChange(status);

        Network.addListener("networkStatusChange", handleStatusChange);
      } else {
        // Web Fallback
        window.addEventListener("offline", () =>
          handleStatusChange({ connected: false }),
        );
        window.addEventListener("online", () =>
          handleStatusChange({ connected: true }),
        );
        handleStatusChange({ connected: navigator.onLine });
      }
    };

    initNetwork();

    return () => {
      if (Capacitor.isNativePlatform()) {
        Network.removeAllListeners();
      } else {
        window.removeEventListener("offline", () => {});
        window.removeEventListener("online", () => {});
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {/* OFFLINE MODAL */}
      {offline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-xl p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center max-w-[320px] w-full border border-zinc-100 dark:border-zinc-800 relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Icon */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [1, 0.9, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-20 h-20 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-6 relative z-10 ring-4 ring-red-50 dark:ring-red-500/5"
            >
              <FaWifi className="text-3xl text-red-500" />
              <div className="absolute top-0 right-0 p-1.5 bg-white dark:bg-zinc-900 rounded-full shadow-sm">
                <FaExclamationTriangle className="text-xs text-red-500" />
              </div>
            </motion.div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 relative z-10 tracking-tight">
              {t("no_internet_title") || "No Connection"}
            </h3>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 leading-relaxed mb-8 relative z-10 px-2">
              {t("banner_offline") ||
                "Please check your internet settings and try again."}
            </p>

            {/* Button (Visual only as it auto-reconnects, but gives feedback) */}
            <button
              disabled
              className="w-full py-4 px-6 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2.5 transition-colors border border-zinc-100 dark:border-zinc-800"
            >
              <div className="w-4 h-4 border-[2px] border-current border-t-transparent rounded-full animate-spin opacity-70" />
              <span>{t("reconnecting") || "Reconnecting..."}</span>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* ONLINE SUCCESS MODAL */}
      {justBack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        >
          <motion.div
            initial={{ scale: 0.8, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -20, opacity: 0 }}
            className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 rounded-[28px] py-4 px-8 shadow-2xl flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 flex-shrink-0">
              <IoCheckmarkCircle className="text-xl" />
            </div>
            <div className="text-left">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight">
                {t("back_online_title") || "Connected"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                {t("banner_online") || "You are back online"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
