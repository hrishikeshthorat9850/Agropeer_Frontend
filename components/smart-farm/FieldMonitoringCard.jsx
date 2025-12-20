"use client";
import { motion } from "framer-motion";
import { FaSun, FaCloud, FaLeaf, FaHeart } from "react-icons/fa";

export default function FieldMonitoringCard({ field, weather }) {
  if (!field) return null;

  const soilMoisture = Math.round(field.soilMoisture ?? 56);
  const temperature = Math.round(field.temperature ?? weather?.temperature ?? 24);
  const humidity = Math.round(field.humidity ?? weather?.humidity ?? 70);
  const ndvi = field.ndvi ?? 0.65;

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Living digital twin</p>
          <h3 className="text-gray-800 font-semibold">{field.name}</h3>
          <p className="text-sm text-gray-500">
            {field.crop} · {field.stage}
          </p>
        </div>
        <div className="text-3xl">{field.icon || "🌱"}</div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Soil moisture</span>
          <span className="text-lg font-bold text-gray-800">{soilMoisture}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${soilMoisture}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="bg-emerald-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-emerald-600 font-semibold">
            <FaLeaf />
            NDVI
          </div>
          <p className="text-2xl font-bold text-gray-800">{ndvi.toFixed(2)}</p>
        </div>
        <div className="bg-rose-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-rose-600 font-semibold">
            <FaHeart />
            Stress
          </div>
          <p className="text-lg font-bold text-gray-800">{field.stress}</p>
        </div>
      </div>

      <div className="relative bg-gradient-to-br from-green-200 via-green-300 to-green-400 rounded-lg h-40 overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="grid grid-cols-4 grid-rows-4 h-full w-full">
            {Array.from({ length: 16 }).map((_, index) => (
              <div key={index} className="border border-green-600" />
            ))}
          </div>
        </div>

        <div className="absolute top-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
          <FaSun className="w-4 h-4 text-yellow-500" />
          <span className="text-xs font-semibold text-gray-700">{temperature}°C</span>
        </div>

        <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
          <FaCloud className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-semibold text-gray-700">{humidity}%</span>
        </div>

        <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
          <span className="text-xs font-semibold text-gray-700">
            Twilight irrigation: {field.lastIrrigationHours}h ago
          </span>
        </div>
      </div>
    </motion.div>
  );
}
