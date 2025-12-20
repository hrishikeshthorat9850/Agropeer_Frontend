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
  const colorMap = {
    success: {
      bg: "bg-gradient-to-r from-green-600 to-green-700",
      border: "border-green-500",
      text: "text-white",
    },
    error: {
      bg: "bg-gradient-to-r from-red-600 to-red-700",
      border: "border-red-500",
      text: "text-white",
    },
    info: {
      bg: "bg-gradient-to-r from-blue-600 to-blue-700",
      border: "border-blue-500",
      text: "text-white",
    },
    warning: {
      bg: "bg-gradient-to-r from-amber-600 to-amber-700",
      border: "border-amber-500",
      text: "text-white",
    },
    network: {
      bg: "bg-gradient-to-r from-purple-600 to-purple-700",
      border: "border-purple-500",
      text: "text-white",
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
    }, 300); // Wait for exit animation
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
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          relative min-w-[300px] max-w-[400px] w-full
          ${colors.bg} ${colors.border} ${colors.text}
          rounded-xl shadow-2xl border-2
          overflow-hidden
          mb-3
        `}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Progress bar */}
        {!persistent && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/20">
            <motion.div
              className="h-full bg-white/50"
              initial={{ width: "100%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        )}

        <div className="px-4 py-3 flex items-start gap-3">
          {/* Icon */}
          {showIcon && (
            <div className="flex-shrink-0 pt-0.5">
              <ToastIcon type={type} />
            </div>
          )}

          {/* Message */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-relaxed break-words">
              {message}
            </p>

            {/* Action Button */}
            {action && (
              <button
                onClick={handleActionClick}
                className={`
                  mt-2 px-3 py-1 rounded-lg
                  bg-white/20 hover:bg-white/30
                  text-xs font-semibold
                  transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-white/50
                `}
                aria-label={action.label || "Action"}
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={handleDismiss}
              className={`
                flex-shrink-0 p-1 rounded-lg
                hover:bg-white/20
                transition-colors duration-200
                focus:outline-none focus:ring-2 focus:ring-white/50
              `}
              aria-label="Close notification"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

