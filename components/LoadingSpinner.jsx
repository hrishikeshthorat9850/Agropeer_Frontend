"use client";
import { motion } from "framer-motion";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  // Size mapping
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40",
  };

  // Hexagon SVG Path Definition (Flat-topped)
  // ViewBox 0 0 100 100. Center 50 50.
  // Points approx: 25,6.7 75,6.7 100,50 75,93.3 25,93.3 0,50
  const hexPath = "M25 5 L75 5 L100 50 L75 95 L25 95 L0 50 Z";

  return (
    <div className="flex flex-col items-center justify-center p-8 perspective-1000">
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
              "drop-shadow(0 0 5px #22c55e)",
              "drop-shadow(0 0 15px #22c55e)",
              "drop-shadow(0 0 5px #22c55e)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-1/2 h-1/2 text-green-500 fill-current opacity-80"
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
              stroke="#4ade80"
              strokeWidth="2"
              strokeDasharray="10 5"
              className="drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]"
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
              stroke="#15803d"
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
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80] transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80] transform -translate-x-1/2 translate-y-1/2" />
        </motion.div>
      </div>

      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex items-center gap-2"
        >
          <span className="text-green-600 font-mono tracking-[0.2em] text-sm font-bold uppercase drop-shadow-sm">
            {text}
          </span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-4 bg-green-500 block"
          />
        </motion.div>
      )}
    </div>
  );
}
