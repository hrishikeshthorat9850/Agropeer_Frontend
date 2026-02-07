"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function VideoSplash({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Force completion after 3 seconds as requested
    const timeout = setTimeout(() => {
      handleComplete();
    }, 3500);

    return () => clearTimeout(timeout);
  }, []);

  const handleComplete = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-sky-300 to-orange-300 overflow-hidden"
        >
          {/* Foreground Main Video (Constrained to 9:11 aspect ratio) */}
          <div className="relative w-full max-w-md aspect-[9/11] shadow-2xl rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              src="/splash_agropeer.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              onEnded={handleComplete}
              onError={(e) => {
                console.error("Splash video error:", e);
                handleComplete();
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
