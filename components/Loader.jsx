"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000); // ⏱️ Only 2 seconds now
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden
                     bg-white dark:bg-black/95 backdrop-blur-xl"
        >
          <LoadingSpinner size="lg" text="Welcome to AgroPeer" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
