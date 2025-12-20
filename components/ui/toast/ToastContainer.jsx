"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "./Toast";
import { useToast } from "@/Context/ToastContext";

const POSITION_STYLES = {
  "top": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

export default function ToastContainer({ position = "top-right", maxToasts = 5 }) {
  const { toasts, removeToast } = useToast();
  const [visibleToasts, setVisibleToasts] = useState([]);

  // Limit visible toasts
  useEffect(() => {
    setVisibleToasts(toasts.slice(0, maxToasts));
  }, [toasts, maxToasts]);

  if (visibleToasts.length === 0) return null;

  const positionClass = POSITION_STYLES[position] || POSITION_STYLES["top-right"];

  return (
    <div
      className={`
        fixed ${positionClass}
        z-[9999]
        pointer-events-none
        w-full max-w-[calc(100vw-2rem)]
        sm:max-w-md
      `}
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="flex flex-col pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {visibleToasts.map((toast) => (
            <Toast
              key={toast.id}
              {...toast}
              onDismiss={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

