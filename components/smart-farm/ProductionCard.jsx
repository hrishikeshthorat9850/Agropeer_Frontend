"use client";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import { useState, useMemo } from "react";

export default function ProductionCard({ data }) {
  const [showDetails, setShowDetails] = useState(false);

  const productionData = useMemo(() => {
    const trend = data?.trend?.length ? data.trend : [1.1, 1.15, 1.18, 1.22, 1.25, 1.3];
    const value = data?.value ?? trend.at(-1) ?? 1.28;
    return {
      value,
      unit: data?.unit || "tons / day",
      change: data?.change ?? +(value - (trend.at(-2) ?? value)).toFixed(2),
      trend,
    };
  }, [data]);

  const maxValue = Math.max(...productionData.trend);
  const minValue = Math.min(...productionData.trend);
  const range = maxValue - minValue || 1;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Bio-Factory Output</p>
          <h3 className="text-gray-800 font-semibold text-lg">Today's Production</h3>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <FaInfoCircle className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-800">
            {productionData.value?.toFixed ? productionData.value.toFixed(2) : productionData.value}
          </span>
          <span className="text-gray-500 text-lg">{productionData.unit}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-sm font-semibold ${
              productionData.change >= 0 ? "text-green-600" : "text-red-500"
            }`}
          >
            {productionData.change >= 0 ? "+" : ""}
            {productionData.change} trend
          </span>
        </div>
      </div>

      <div className="h-16 relative bg-gray-50 rounded-lg p-2 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
          <defs>
            <linearGradient id="productionGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            fill="url(#productionGradient)"
            points={`0,60 ${productionData.trend
              .map((val, i) => {
                const x = (i / (productionData.trend.length - 1 || 1)) * 200;
                const y = 60 - ((val - minValue) / range) * 50;
                return `${x},${y}`;
              })
              .join(" ")} 200,60`}
          />
          <polyline
            fill="none"
            stroke="#22c55e"
            strokeWidth="2.5"
            points={productionData.trend
              .map((val, i) => {
                const x = (i / (productionData.trend.length - 1 || 1)) * 200;
                const y = 60 - ((val - minValue) / range) * 50;
                return `${x},${y}`;
              })
              .join(" ")}
          />
        </svg>
      </div>

      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-gray-200 text-sm text-gray-600 space-y-1"
        >
          <p>
            Weekly average:{" "}
            {(
              productionData.trend.slice(-7).reduce((sum, val) => sum + val, 0) /
              Math.min(7, productionData.trend.length)
            ).toFixed(2)}{" "}
            {productionData.unit}
          </p>
          <p>
            Next 24h target: {(productionData.value + 0.65).toFixed(2)} {productionData.unit}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}