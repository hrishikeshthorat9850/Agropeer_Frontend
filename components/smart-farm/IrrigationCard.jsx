"use client";
import { FaTint, FaLeaf, FaChevronRight, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const variantCopy = {
  needed: {
    title: "Hydration Needed",
    accent: "text-emerald-600",
    icon: FaTint,
    gradient: "from-emerald-500 to-green-600",
  },
  usage: {
    title: "Flow Analytics",
    accent: "text-teal-600",
    icon: FaLeaf,
    gradient: "from-teal-500 to-cyan-500",
  },
  schedule: {
    title: "Next Irrigation Window",
    accent: "text-green-700",
    icon: FaClock,
    gradient: "from-lime-500 to-emerald-500",
  },
};

export default function IrrigationCard({ variant = "needed", data, onClick }) {
  const copy = variantCopy[variant];
  if (!copy) return null;

  const list = Array.isArray(data) ? data : data?.list || data?.fields || [];
  const usage = data?.usage || data;
  const schedule = Array.isArray(data?.schedule) ? data.schedule : list;

  const Icon = copy.icon;
  const payload =
    variant === "usage" ? usage : variant === "schedule" ? schedule : list;

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.({ variant, payload })}
      className="w-full text-left bg-white rounded-2xl shadow-lg p-6 border border-white/70 hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${copy.gradient} flex items-center justify-center text-white text-xl shadow-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Smart Irrigation
            </p>
            <p className={`text-xl font-bold text-gray-800 ${copy.accent}`}>{copy.title}</p>

            {variant === "needed" && (
              <div className="mt-3 text-sm text-gray-600">
                <p className="font-semibold text-gray-900">
                  {list.length || 0} field{list.length === 1 ? "" : "s"} in deficit
                </p>
                {list[0] && (
                  <p>
                    {list[0].field}: {list[0].soilMoisture}% moisture
                  </p>
                )}
              </div>
            )}

            {variant === "usage" && (
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {usage?.totalLiters ? `${usage.totalLiters} L` : "—"}
                  </p>
                  <p>Today</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">
                    {usage?.change ? `${usage.change > 0 ? "+" : ""}${usage.change}%` : "0%"}
                  </p>
                  <p>vs yesterday</p>
                </div>
              </div>
            )}

            {variant === "schedule" && (
              <div className="mt-3 text-sm text-gray-600">
                {schedule?.[0] ? (
                  <>
                    <p className="font-semibold text-gray-900">{schedule[0].field}</p>
                    <p>{schedule[0].window || "Awaiting window"}</p>
                  </>
                ) : (
                  <p>No cycles scheduled</p>
                )}
              </div>
            )}
          </div>
        </div>
        <motion.div whileHover={{ x: 5 }} className="p-2 hover:bg-emerald-50 rounded-full transition">
          <FaChevronRight className="w-5 h-5 text-gray-400" />
        </motion.div>
      </div>
    </motion.button>
  );
}