"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaShieldAlt,
} from "react-icons/fa";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function PestDetailModal({ pest, onClose }) {
  useBackPress(
    () => {
      if (pest) {
        onClose();
        return true;
      }
      return false;
    },
    20,
    !!pest,
  );

  if (!pest) return null;

  const detectedAt = pest.detectedAt
    ? new Date(pest.detectedAt).toLocaleString()
    : "recent telemetry";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                {pest.icon || "🪲"}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{pest.pathogen}</h2>
                <p className="text-red-100">
                  {pest.crop} · {pest.location}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <FaExclamationTriangle className="text-red-600" />
                <span className="font-bold text-red-800 uppercase text-sm tracking-wide">
                  {pest.severity} · {pest.probability}% probability
                </span>
                <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                  Pressure index {pest.pressure}
                </span>
              </div>
              <p className="text-gray-700">
                Autonomous scouts detected pressure in {pest.location}.
                Recommended to intervene within next 6 hours.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaMapMarkerAlt />
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-gray-800">{pest.location}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FaCalendarAlt />
                  <span className="font-semibold">Detected</span>
                </div>
                <p className="text-gray-800">{detectedAt}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">
                Recommended Actions
              </h3>
              <ul className="space-y-2">
                {(
                  pest.recommendedActions || [
                    "Apply organic pesticide",
                    "Monitor for 48h",
                  ]
                ).map((action, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700"
                  >
                    <FaShieldAlt className="text-green-600 mt-1" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
                Mark as Resolved
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                Schedule Treatment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
