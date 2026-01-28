"use client";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const path = usePathname();

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }}
    >
      <motion.div
        key={path}
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 450, // Faster snap
          damping: 35, // Controlled stop (no wobble)
          mass: 0.8, // Lighter feel
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
