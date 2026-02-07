"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  LayoutGroup,
} from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { Capacitor } from "@capacitor/core";
import { playBackAnimation } from "@/utils/backTransition";

// Normalize path so "/posts" and "/posts/" are the same key
function normalizePath(path) {
  if (!path) return "/";
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}

// IOS-STYLE VERTICAL MODAL (Sheet/Card) VARIANTS
// - Forward:
//   New Page (Enter): Slides Up from Bottom (100% -> 0%). zIndex 3.
//   Old Page (Exit): Scales down (1 -> 0.93). zIndex 1. (Overlay handles dimming).
// - Back:
//   New Page (Enter - background): Scales up (0.93 -> 1). zIndex 1. (Overlay fade out).
//   Old Page (Exit - foreground): Slides Down to Bottom (0% -> 100%). zIndex 3.

const variants = {
  enter: (direction) => ({
    y: direction === "forward" ? "100%" : "0%",
    scale: direction === "forward" ? 1 : 0.93,
    // filter: REMOVED for performance, using Overlay instead
    zIndex: direction === "forward" ? 3 : 1,
    borderRadius: direction === "forward" ? "0px" : "20px",
  }),
  center: {
    y: 0,
    scale: 1,
    zIndex: 2,
    borderRadius: "0px",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 25,
      mass: 0.8,
    },
  },
  exit: (direction) => ({
    y: direction === "forward" ? "0%" : "100%",
    scale: direction === "forward" ? 0.93 : 1,
    // filter: REMOVED for performance

    zIndex: direction === "forward" ? 1 : 3,
    borderRadius: direction === "forward" ? "20px" : "0px",
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 25,
      mass: 0.8,
    },
  }),
};

// Overlay Variants for Performance (Opacity fade is cheaper than Filter brightness)
const overlayVariants = {
  enter: (direction) => ({
    opacity: direction === "forward" ? 0 : 0.3, // If entering forward (new page), no overlay. If entering back (bg page), it's dark.
  }),
  center: {
    opacity: 0, // Foreground is bright
    transition: { duration: 0.3 },
  },
  exit: (direction) => ({
    opacity: direction === "forward" ? 0.3 : 0, // If exiting forward (becomes bg), dim it. If exiting back, clear it.
    transition: { duration: 0.3 },
  }),
};

export default function PageTransition({ children, showNavbar, keyboardOpen }) {
  const path = usePathname();
  const stablePath = normalizePath(path);
  const router = useRouter();

  // Directions: 'forward' (push), 'back' (pop)
  const [direction, setDirection] = useState("forward");
  const prevPath = useRef(stablePath);

  // Drag State
  const containerRef = useRef(null);
  const [canDrag, setCanDrag] = useState(true);

  // Check scroll position to enable/disable drag
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      // Only allow drag-to-dismiss if we are at the very top
      setCanDrag(el.scrollTop <= 0);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [stablePath]); // Re-attach on path change (new ref)

  useEffect(() => {
    const handleNavDirection = (e) => {
      if (e.detail?.direction) {
        setDirection(e.detail.direction);
      }
    };
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

  useEffect(() => {
    if (stablePath !== prevPath.current) {
      prevPath.current = stablePath;
    }
  }, [stablePath]);

  // SCROLL RESET: Ensure new page always starts at top
  // This is critical because we are reusing a window-height container
  React.useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [stablePath]);

  // Handle Drag End (Dismiss)
  const handleDragEnd = async (event, info) => {
    // Thresholds: Dragged down > 100px OR Velocity > 300
    if (info.offset.y > 100 || info.velocity.y > 300) {
      // Trigger Haptic
      if (Capacitor.isNativePlatform()) {
        await Haptics.impact({ style: ImpactStyle.Light });
      }

      // Trigger Back
      playBackAnimation(() => {
        router.back();
      });
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-white dark:bg-black">
      <LayoutGroup>
        {" "}
        {/* Enables Shared Layout Animations if we use layoutId later */}
        <AnimatePresence
          mode="popLayout"
          initial={false}
          custom={direction}
          onExitComplete={() => {
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
            // DRAG PROPERTIES
            drag={canDrag ? "y" : false}
            dragConstraints={{ top: 0, bottom: 0 }} // Snap back to 0
            dragElastic={{ top: 0.05, bottom: 0.8 }} // Hard stop on top, stretchy on bottom
            onDragEnd={handleDragEnd}
            dragListener={canDrag}
            //
            className={`
              absolute inset-0 w-full h-full bg-white dark:bg-black overflow-y-auto overflow-x-hidden touch-pan-y
              ${showNavbar ? "pt-mobile-layout" : ""} 
              ${showNavbar && !keyboardOpen ? "pb-mobile-layout" : ""}
            `}
            // Ref for scroll checking
            ref={containerRef}
          >
            {/* PERFORMANCE OVERLAY (Fades in/out to dim background) */}
            <motion.div
              variants={overlayVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 bg-black pointer-events-none z-10"
              // Removed display: none so opacity variants can work
            />

            {children}
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
