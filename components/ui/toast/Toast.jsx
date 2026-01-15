"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import ToastIcon from "./ToastIcon";

export default function Toast({
  id,
  type = "info",
  message,
  duration = 3000,
  showIcon = true,
  showCloseButton = true,
  action,
  onDismiss,
  persistent = false,
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const timeoutRef = useRef(null);
  const progressRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Color scheme based on type
  // Premium Glassmorphism Color Scheme
  const colorMap = {
    success: {
      bg: "bg-emerald-950/90",
      border: "border-emerald-500/20",
      text: "text-emerald-50",
      progress: "bg-emerald-500",
      iconUser: "text-emerald-400"
    },
    error: {
      bg: "bg-red-950/90",
      border: "border-red-500/20",
      text: "text-red-50",
      progress: "bg-red-500",
      iconUser: "text-red-400"
    },
    info: {
      bg: "bg-blue-950/90",
      border: "border-blue-500/20",
      text: "text-blue-50",
      progress: "bg-blue-500",
      iconUser: "text-blue-400"
    },
    warning: {
      bg: "bg-amber-950/90",
      border: "border-amber-500/20",
      text: "text-amber-50",
      progress: "bg-amber-500",
      iconUser: "text-amber-400"
    },
    network: {
      bg: "bg-purple-950/90",
      border: "border-purple-500/20",
      text: "text-purple-50",
      progress: "bg-purple-500",
      iconUser: "text-purple-400"
    },
  };

  const colors = colorMap[type] || colorMap.info;

  // Auto-dismiss logic
  useEffect(() => {
    if (persistent) return;

    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, duration - elapsed);
      const progressPercent = (remaining / duration) * 100;
      setProgress(progressPercent);

      if (remaining > 0) {
        progressRef.current = requestAnimationFrame(updateProgress);
      }
    };

    progressRef.current = requestAnimationFrame(updateProgress);

    timeoutRef.current = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    };
  }, [duration, persistent]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.(id);
    }, 400); // Slightly longer for smooth exit
  };

  const handleActionClick = () => {
    if (action?.onClick) {
      action.onClick();
      if (action.dismissOnClick !== false) {
        handleDismiss();
      }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        layout
        initial={{ opacity: 0, y: -15, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          relative min-w-[340px] max-w-[420px] w-full
          ${colors.bg} ${colors.border} ${colors.text}
          backdrop-blur-xl
          rounded-2xl border
          shadow-[0_8px_32px_rgba(0,0,0,0.3)]
          overflow-hidden
          mb-3 select-none
        `}
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center p-4 gap-3.5">
          {/* Icon Area */}
          {showIcon && (
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full 
              flex items-center justify-center
              bg-white/5 backdrop-blur-sm
              ${colors.border} border
            `}>
              <ToastIcon type={type} className="" />
            </div>
          )}

          {/* Text Content */}
          <div className="flex-1 min-w-0 py-0.5">
            <p className="text-[15px] font-medium leading-snug tracking-wide text-white/90">
              {message}
            </p>

            {/* Optional Action Button */}
            {action && (
              <button
                onClick={handleActionClick}
                className={`
                  mt-2 text-xs font-bold px-3 py-1.5 rounded-lg
                  bg-white/10 hover:bg-white/20 active:scale-95
                  transition-all duration-200 ease-out
                  flex items-center gap-1.5
                `}
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={handleDismiss}
              className="
                flex-shrink-0 p-2 -mr-1
                text-white/40 hover:text-white 
                hover:bg-white/10 rounded-full
                transition-colors duration-200
              "
              aria-label="Close"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Premium Loading Bar (Bottom Glow) */}
        {!persistent && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/40">
            <motion.div
              className={`h-full ${colors.progress} shadow-[0_0_10px_currentColor]`}
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

