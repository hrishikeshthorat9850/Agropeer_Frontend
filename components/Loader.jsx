"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000); // ⏱️ Only 2 seconds now
    return () => clearTimeout(timer);
  }, []);

  const letters = "Welcome to AgroPeer".split("");

  const letterVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -90, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden
                     bg-gradient-to-b from-orange-500 via-blue-950 to-green-800"
        >
          {/* ☀️ Orange glow */}
          <motion.div
            initial={{ opacity: 0.4, scale: 0.8 }}
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 
                       w-[35rem] h-[35rem] bg-orange-400/40 rounded-full blur-3xl"
          />

          {/* 🌱 Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1],
              y: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="text-6xl sm:text-7xl md:text-8xl text-green-300 drop-shadow-[0_0_35px_rgba(100,255,100,0.5)] mb-6"
          >
            🌱
          </motion.div>

          {/* ✨ Animated text */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center text-center"
          >
            {letters.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="inline-block mx-[2px] text-2xl sm:text-4xl md:text-5xl font-bold
                           bg-gradient-to-r from-green-200 via-orange-100 to-amber-500
                           text-transparent bg-clip-text tracking-wide"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>

          {/* 🌌 Overlay blend */}
          <motion.div
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-full h-full bg-gradient-to-t from-green-900/40 via-transparent to-orange-900/20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
