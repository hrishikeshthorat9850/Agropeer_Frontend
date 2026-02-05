"use client";
import React, { useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Normalize path so "/posts" and "/posts/" are the same key
function normalizePath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

const variants = {
  enter: (direction) => ({
    x: direction === "forward" ? "100%" : "-30%", // Slide in from right (forward) or left (back)
    opacity: direction === "forward" ? 1 : 0.5,
    scale: direction === "forward" ? 1 : 0.95,
    zIndex: direction === "forward" ? 2 : 1,
    boxShadow:
      direction === "forward" ? "0px 0px 40px rgba(0,0,0,0.1)" : "none",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 2,
    boxShadow: "none",
  },
  exit: (direction) => ({
    x: direction === "forward" ? "-30%" : "100%", // Slide out to left (forward) or right (back)
    opacity: direction === "forward" ? 0.5 : 1,
    scale: direction === "forward" ? 0.95 : 1,
    zIndex: direction === "forward" ? 1 : 2, // The exiting page (if going back) stays on top
    boxShadow:
      direction === "forward" ? "none" : "0px 0px 40px rgba(0,0,0,0.1)",
  }),
};

// "Springy" but controlled transition
const transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

export default function PageTransition({ children }) {
  const path = usePathname();
  const stablePath = normalizePath(path);

  // Directions: 'forward' (default for new pages), 'back' (for returning)
  const [direction, setDirection] = useState("forward");

  // Track previous path to prevent same-route animations if needed
  const prevPath = useRef(stablePath);

  useEffect(() => {
    // Listener for Back Transition Utility
    const handleNavDirection = (e) => {
      if (e.detail?.direction) {
        setDirection(e.detail.direction);
      }
    };

    // Listener for browser back button (popstate)
    const handlePopState = () => {
      setDirection("back");
    };

    window.addEventListener("agropeer-nav-direction", handleNavDirection);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("agropeer-nav-direction", handleNavDirection);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Reset to default 'forward' after animation completes (cleanup)
  // This is tricky with React state, but the utility sends events *before* nav
  // so the state should be correct when 'key' changes.
  // We can default to 'forward' for generic clicks.
  useEffect(() => {
    if (stablePath !== prevPath.current) {
      // Path changed, animation starts with current 'direction' state
      prevPath.current = stablePath;
    }
  }, [stablePath]);

  return (
    <div className="w-full min-h-screen overflow-hidden relative bg-white dark:bg-black">
      <AnimatePresence
        mode="popLayout" // Allows overlapping for the "stack" feel
        initial={false} // Don't animate on first load
        custom={direction}
        onExitComplete={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }
          // Reset direction to forward (default) for next interaction
          // slight delay to ensure we don't flip mid-animation if re-renders happen
          setTimeout(() => setDirection("forward"), 500);
        }}
      >
        <motion.div
          key={stablePath}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full min-h-screen absolute top-0 left-0 bg-white dark:bg-black"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
