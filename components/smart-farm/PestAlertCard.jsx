"use client";
import { FaExclamationTriangle, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";

const paletteBySeverity = {
  critical: {
    border: "border-red-500",
    pill: "bg-red-100 text-red-700",
    accent: "text-red-600",
  },
  high: {
    border: "border-orange-500",
    pill: "bg-orange-100 text-orange-700",
    accent: "text-orange-600",
  },
  elevated: {
    border: "border-amber-400",
    pill: "bg-amber-100 text-amber-700",
    accent: "text-amber-600",
  },
  low: {
    border: "border-yellow-400",
    pill: "bg-yellow-100 text-yellow-700",
    accent: "text-yellow-600",
  },
};

export default function PestAlertCard({ alert, onClick }) {
  if (!alert) return null;
  const severityKey = (alert.severity || "elevated").toLowerCase();
  const palette = paletteBySeverity[severityKey] || paletteBySeverity.elevated;
  const probability = Math.min(100, Math.max(0, alert.probability ?? 0));

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(alert)}
      className={`w-full text-left bg-white rounded-xl shadow-lg p-6 border-l-4 ${palette.border} cursor-pointer transition-all hover:shadow-xl`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="relative">
            <motion.div
              className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-3xl"
              animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 2.8, repeat: Infinity }}
            >
              <span>{alert.icon || "🪲"}</span>
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1.5 shadow-md"
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <FaExclamationTriangle className="w-4 h-4 text-white" />
            </motion.div>
          </div>
          <div>
            <p className={`text-sm font-semibold uppercase tracking-wide ${palette.accent}`}>
              {alert.pathogen}
            </p>
            <p className="text-gray-800 text-xl font-bold">{alert.crop}</p>
            <p className="text-sm text-gray-500">{alert.location}</p>
            <div className="mt-3">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${palette.pill}`}>
                {alert.severity} · {probability}%
              </span>
            </div>
          </div>
        </div>
        <motion.div whileHover={{ x: 5 }} className="p-2 hover:bg-rose-50 rounded-full transition">
          <FaChevronRight className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Outbreak probability</span>
          <span>{probability}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-red-500 to-orange-400 h-2 rounded-full"
            style={{ width: `${probability}%` }}
          />
        </div>
      </div>

      {alert.recommendedActions?.length > 0 && (
        <p className="mt-4 text-sm text-gray-600 line-clamp-2">
          Next: {alert.recommendedActions[0]}
        </p>
      )}
    </motion.button>
  );
}