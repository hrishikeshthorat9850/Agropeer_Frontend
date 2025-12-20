"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTint, FaLeaf, FaClock } from "react-icons/fa";

export default function IrrigationDetailModal({ irrigation, onClose }) {
  if (!irrigation) return null;

  const { variant, payload } = irrigation;

  const renderNeeded = () => {
    const fields = Array.isArray(payload) ? payload : [];
    return (
      <div className="space-y-3">
        {fields.map((field) => (
          <div key={field.fieldId || field.field} className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{field.field}</p>
                <p className="text-sm text-gray-600">
                  Soil moisture {field.soilMoisture}% · deficit {field.deficit}mm
                </p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm">
                Start pulse
              </button>
            </div>
          </div>
        ))}
        {fields.length === 0 && <p className="text-sm text-gray-500">All fields hydrated.</p>}
      </div>
    );
  };

  const renderUsage = () => {
    const stats = payload || {};
    return (
      <div className="bg-blue-50 p-6 rounded-lg">
        <div className="text-center">
          <p className="text-4xl font-bold text-blue-600 mb-2">
            {stats.totalLiters ? `${stats.totalLiters} L` : "—"}
          </p>
          <p className="text-gray-600">Total water used today</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats.durationHours || "—"}</p>
            <p className="text-sm text-gray-600">Hours</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats.flowRate || "—"}</p>
            <p className="text-sm text-gray-600">L/min</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{stats.activeValves || "—"}</p>
            <p className="text-sm text-gray-600">Active valves</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Delta vs yesterday: {stats.change >= 0 ? "+" : ""}
          {stats.change || 0}%
        </p>
      </div>
    );
  };

  const renderSchedule = () => {
    const slots = Array.isArray(payload) ? payload : [];
    return (
      <div className="space-y-3">
        {slots.map((slot) => (
          <div key={slot.fieldId || slot.field} className="bg-lime-50 border border-lime-200 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">{slot.field}</p>
            <p className="text-sm text-gray-600">{slot.window || "Awaiting window"}</p>
          </div>
        ))}
        {slots.length === 0 && <p className="text-sm text-gray-500">No upcoming cycles.</p>}
      </div>
    );
  };

  const iconMap = {
    needed: FaTint,
    usage: FaLeaf,
    schedule: FaClock,
  };

  const titleMap = {
    needed: "Irrigation Needed",
    usage: "Flow Analytics",
    schedule: "Scheduled Cycles",
  };

  const Icon = iconMap[variant] || FaLeaf;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{titleMap[variant] || "Irrigation"}</h2>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {variant === "needed" && renderNeeded()}
            {variant === "usage" && renderUsage()}
            {variant === "schedule" && renderSchedule()}

            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
                Manage Irrigation
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                View Schedule
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
