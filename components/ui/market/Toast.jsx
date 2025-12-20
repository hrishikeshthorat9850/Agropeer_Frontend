"use client";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message, type = "success" }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] px-6 py-3 rounded-xl shadow-2xl text-white text-sm font-semibold ${
            type === "success"
              ? "bg-gradient-to-r from-blue-600 to-blue-700"
              : "bg-gradient-to-r from-red-600 to-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{type === "success" ? "✓" : "✕"}</span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

