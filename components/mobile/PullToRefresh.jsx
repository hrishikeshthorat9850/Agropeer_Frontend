"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSyncAlt } from "react-icons/fa";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

/**
 * PullToRefresh Component
 * Wraps content and adds pull-down-to-refresh functionality.
 *
 * @param {Function} onRefresh - Async function to call when refreshed
 * @param {React.ReactNode} children - Content to wrap
 */
export default function PullToRefresh({ onRefresh, children }) {
  const [pullY, setPullY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const maxPull = 120; // Max pixels to pull down
  const threshold = 80; // Pixels needed to trigger refresh

  const handleTouchStart = (e) => {
    // Only enable if we are at the top of the scroll container
    // Note: We rely on the parent or window scroll position.
    // For this specific 'Sandwich' layout, the parent (main) handles scrolling.
    // We can check e.target.closest scroll position or assume if pull happens, it's checked.
    // Simplified: Check if window.scrollY is 0 or container is at 0.
    const scrollContainer = e.target.closest(".overflow-y-auto");
    const scrollTop = scrollContainer
      ? scrollContainer.scrollTop
      : window.scrollY;

    if (scrollTop <= 0 && !refreshing) {
      startY.current = e.touches[0].clientY;
    } else {
      startY.current = -1; // Disable
    }
  };

  const handleTouchMove = (e) => {
    if (startY.current === -1 || refreshing) return;

    const currentY = e.touches[0].clientY;
    const delta = currentY - startY.current;

    // Only allow pulling down
    if (delta > 0) {
      // Add resistance
      const damped = Math.min(delta * 0.5, maxPull);
      setPullY(damped);

      // Prevent native scroll if we are pulling
      if (damped > 10 && e.cancelable) {
        // This might block normal scrolling if not careful, but usually okay at top 0
        // e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (startY.current === -1 || refreshing) return;

    if (pullY >= threshold) {
      // Trigger Refresh
      setRefreshing(true);
      setPullY(60); // Snap to loading position

      // Haptic Feedback
      try {
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (err) {
        // Ignore if not native
      }

      if (onRefresh) {
        await onRefresh();
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Demo delay
      }

      setRefreshing(false);
      setPullY(0);
    } else {
      // Cancel
      setPullY(0);
    }
    startY.current = 0;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-full"
    >
      {/* Loading Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none z-10"
        style={{ transform: `translateY(${pullY - 40}px)` }}
      >
        <div className="bg-white dark:bg-zinc-800 rounded-full p-2 shadow-lg border border-zinc-100 dark:border-zinc-700">
          <motion.div
            animate={{ rotate: refreshing ? 360 : pullY * 2 }}
            transition={{
              duration: refreshing ? 1 : 0,
              repeat: refreshing ? Infinity : 0,
              ease: "linear",
            }}
          >
            <FaSyncAlt
              className={`text-farm-600 dark:text-farm-400 ${
                refreshing ? "" : "opacity-80"
              }`}
              size={20}
            />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        animate={{ y: refreshing ? 60 : pullY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
