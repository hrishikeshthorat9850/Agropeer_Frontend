"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner({
  size = "md",
  text = "Loading...",
  color = "green",
  className = "",
}) {
  // Size mapping
  const sizeClasses = {
    tiny: "h-4 w-4",
    xxs: "h-6 w-6",
    xs: "h-8 w-8",
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40",
  };

  const isSmall = ["tiny", "xxs", "xs"].includes(size);

  const colors = {
    green: {
      core: "text-green-500",
      middle: "#4ade80",
      outer: "#15803d",
      particles: "bg-green-400",
      text: "text-green-600",
      middleShadow: "rgba(74,222,128,0.8)",
      glow: "#22c55e",
    },
    white: {
      core: "text-white",
      middle: "#ffffff",
      outer: "#f3f4f6", // gray-100
      particles: "bg-white",
      text: "text-white",
      middleShadow: "rgba(255,255,255,0.8)",
      glow: "#ffffff",
    },
    orange: {
      core: "text-orange-500",
      middle: "#fb923c",
      outer: "#c2410c",
      particles: "bg-orange-400",
      text: "text-orange-600",
      middleShadow: "rgba(251,146,60,0.8)",
      glow: "#f97316",
    },
  };

  const theme = colors[color] || colors.green;

  // Hexagon SVG Path Definition (Flat-topped)
  const hexPath = "M25 5 L75 5 L100 50 L75 95 L25 95 L0 50 Z";

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isSmall ? "p-0" : "p-8"
      } perspective-1000 ${className}`}
    >
      <div
        className={`relative flex items-center justify-center ${sizeClasses[size]}`}
      >
        {/* Layer 1: Core Pulse (Solid) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 0.9, 0.5],
            filter: [
              `drop-shadow(0 0 5px ${theme.glow})`,
              `drop-shadow(0 0 15px ${theme.glow})`,
              `drop-shadow(0 0 5px ${theme.glow})`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 100 100"
            className={`w-1/2 h-1/2 fill-current opacity-80 ${theme.core}`}
          >
            <path d={hexPath} />
          </svg>
        </motion.div>

        {/* Layer 2: Middle Data Ring (Dashed, Fast Spin) */}
        <motion.div
          className="absolute inset-0 z-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path
              d={hexPath}
              fill="none"
              stroke={theme.middle}
              strokeWidth="2"
              strokeDasharray="10 5"
              className="drop-shadow-md"
              style={{ filter: `drop-shadow(0 0 8px ${theme.middleShadow})` }}
            />
          </svg>
        </motion.div>

        {/* Layer 3: Outer Shell (Thin, Slow Counter-Spin, with Gaps) */}
        <motion.div
          className="absolute inset-[-10%] z-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full scale-110">
            <path
              d={hexPath}
              fill="none"
              stroke={theme.outer}
              strokeWidth="1"
              strokeDasharray="40 60"
              strokeLinecap="round"
              className="opacity-50"
            />
          </svg>
        </motion.div>

        {/* Layer 4: Orbital Particles */}
        <motion.div
          className="absolute w-full h-full"
          animate={{ rotate: 180 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className={`absolute top-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${theme.particles}`}
            style={{ boxShadow: `0 0 10px ${theme.middle}` }}
          />
          <div
            className={`absolute bottom-0 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2 translate-y-1/2 ${theme.particles}`}
            style={{ boxShadow: `0 0 10px ${theme.middle}` }}
          />
        </motion.div>
      </div>

      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-2"
        >
          <span
            className={`font-mono tracking-[0.2em] text-sm font-bold uppercase drop-shadow-sm ${theme.text}`}
          >
            {text}
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className={`w-2 h-4 block ${theme.particles.replace("bg-", "bg-")}`} // Reuse bg class or just hardcode if simple
            style={{ backgroundColor: theme.glow }}
          />
        </motion.div>
      )}
    </div>
  );
}
