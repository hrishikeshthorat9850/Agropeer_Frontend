"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Check } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

/**
 * Modern "Pill" PullToRefresh
 * Features:
 * - Glassmorphic Pill Design
 * - Smooth "Rubbery" Resistance
 * - Haptic Snap on Threshold
 * - Fluid Icon Morphs
 */
import { useLanguage } from "@/Context/languagecontext";

/**
 * Modern "Pill" PullToRefresh
 * Features:
 * - Glassmorphic Pill Design
 * - Smooth "Rubbery" Resistance
 * - Haptic Snap on Threshold
 * - Fluid Icon Morphs
 */
export default function PullToRefresh({ onRefresh, children }) {
  const { t } = useLanguage();
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [thresholdReached, setThresholdReached] = useState(false);
  const startY = useRef(0);

  // Configuration
  const MAX_PULL = 140; // Max visual pull (pixels)
  const THRESHOLD = 80; // Trigger point
  const INDICATOR_HEIGHT = 60; // resting-place for loader

  const handleTouchStart = (e) => {
    // Only enable if we are at the top of the scroll container
    const scrollContainer = e.target.closest(".overflow-y-auto");
    const scrollTop = scrollContainer
      ? scrollContainer.scrollTop
      : window.scrollY;

    if (scrollTop <= 0 && !refreshing) {
      startY.current = e.touches[0].clientY;
      setThresholdReached(false);
    } else {
      startY.current = -1; // Disable
    }
  };

  const handleTouchMove = (e) => {
    if (startY.current === -1 || refreshing) return;

    const currentY = e.touches[0].clientY;
    const delta = currentY - startY.current;

    if (delta > 0) {
      // Logarithmic damping for "rubber band" feel
      // y = ymax * (1 - e^(-x/ymax)) is a classic friction formula,
      // but simple sqrt or division works well too for mobile feel.
      // We'll use a custom damper:
      const damped = Math.min(delta * 0.45, MAX_PULL);
      setPullY(damped);

      // Check threshold for Haptic "Snap"
      if (damped >= THRESHOLD && !thresholdReached) {
        setThresholdReached(true);
        try {
          Haptics.impact({ style: ImpactStyle.Heavy });
        } catch (e) {}
      } else if (damped < THRESHOLD && thresholdReached) {
        setThresholdReached(false);
      }

      // Prevent native scroll only if we are significantly pulling
      if (damped > 10 && e.cancelable) {
        // e.preventDefault(); // Often better to let browser decide passive listeners
      }
    }
  };

  const handleTouchEnd = async () => {
    if (startY.current === -1 || refreshing) return;

    if (pullY >= THRESHOLD) {
      // Trigger Refresh
      setRefreshing(true);
      setPullY(INDICATOR_HEIGHT); // Snap to loading position

      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (err) {}

      if (onRefresh) {
        await onRefresh();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setRefreshing(false);
      setPullY(0);
      setThresholdReached(false);
    } else {
      // Cancel / Snap Back
      setPullY(0);
      setThresholdReached(false);
    }
    startY.current = 0;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-full transition-colors"
    >
      {/* 
        Dynamic Glass Pill Indicator 
        It floats *over* the content or pushes it? 
        Modern apps often float *over* to avoid layout jank, 
        but pushing content (custom implementation style) feels more "connected".
        We'll keep the "Push" behavior for the content, but the Indicator itself will look like a floating pill.
      */}

      {/* Indicator Wrapper - Absolute centered */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-20 overflow-hidden"
        style={{
          height: refreshing ? INDICATOR_HEIGHT + 20 : Math.max(0, pullY),
        }}
      >
        <motion.div
          className="relative mt-4"
          initial={false}
          animate={{
            y: refreshing ? 10 : Math.min(pullY - 40, 10),
            scale: refreshing ? 1 : Math.min(pullY / THRESHOLD, 1.1),
            opacity: Math.max(0, (pullY - 20) / 40),
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div
            className={`
              flex items-center gap-2.5 px-4 py-2 rounded-full shadow-lg border transition-all duration-300
              ${
                thresholdReached
                  ? "bg-black text-white dark:bg-white dark:text-black border-transparent scale-105"
                  : "bg-white/90 dark:bg-zinc-800/90 text-neutral-600 dark:text-neutral-300 border-black/5 backdrop-blur-xl"
              }
            `}
          >
            {/* Icon State Machine */}
            <div className="relative w-5 h-5 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {refreshing ? (
                  <motion.div
                    key="loader"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                  >
                    <LoadingSpinner size="tiny" text="" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="arrow"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: thresholdReached ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowDown size={18} strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Text Label (Optional, adds to the "Premium" pill feel) */}
            <span className="text-sm font-semibold tracking-wide">
              {refreshing
                ? t("pull_updating")
                : thresholdReached
                ? t("pull_release")
                : t("pull_pull")}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Content Container - Pushed down elastically */}
      <motion.div
        animate={{ y: refreshing ? INDICATOR_HEIGHT + 10 : pullY }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
