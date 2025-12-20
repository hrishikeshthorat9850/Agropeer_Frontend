"use client";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

export default function ProductionChartCard({ series = [], projected = [] }) {
  const [timeRange, setTimeRange] = useState("30days");

  const normalizedSeries = useMemo(() => {
    if (series.length) return series;
    return Array.from({ length: 30 }, (_, index) => 10 + index * 0.3 + Math.sin(index * 0.2) * 2);
  }, [series]);

  const rangeMap = {
    "7days": 7,
    "30days": 30,
    "90days": 90,
  };

  const windowSize = rangeMap[timeRange] || 30;
  const baseSlice =
    normalizedSeries.length >= windowSize
      ? normalizedSeries.slice(-windowSize)
      : [
          ...Array(windowSize - normalizedSeries.length).fill(normalizedSeries[0] ?? 10),
          ...normalizedSeries,
        ];

  const productionData = baseSlice.map((value, index) => ({
    day: index + 1,
    value,
  }));

  const maxValue = Math.max(...productionData.map((entry) => entry.value));
  const minValue = Math.min(...productionData.map((entry) => entry.value));
  const range = maxValue - minValue || 1;
  const projectedData =
    projected.length > 0
      ? projected
      : [
          { value: +(productionData.at(-1).value + 0.6).toFixed(2), label: "Day +" },
          { value: +(productionData.at(-1).value + 0.95).toFixed(2), label: "Day ++" },
        ];

  const maxBarHeight = 120;

  return (
    <motion.div
      whileHover={{ scale: 1.01, y: -2 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">Temporal output</p>
          <h3 className="text-gray-800 font-semibold">Production Over Time</h3>
        </div>
        <div className="flex gap-2">
          {Object.keys(rangeMap).map((rangeKey) => (
            <button
              key={rangeKey}
              onClick={() => setTimeRange(rangeKey)}
              className={`px-3 py-1 text-xs rounded-lg transition ${
                timeRange === rangeKey
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {rangeKey}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <div className="h-48 relative bg-gray-50 rounded-lg p-2">
            <svg className="w-full h-full" viewBox="0 0 300 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>

              <line x1="30" y1="20" x2="30" y2="180" stroke="#e5e7eb" strokeWidth="1" />
              <line x1="30" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="1" />

              <polygon
                fill="url(#chartGradient)"
                points={`30,180 ${productionData
                  .map((entry, index) => {
                    const x = 30 + (index / (productionData.length - 1 || 1)) * 270;
                    const y = 180 - ((entry.value - minValue) / range) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")} 30,180`}
              />

              <polyline
                fill="none"
                stroke="#22c55e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={productionData
                  .map((entry, index) => {
                    const x = 30 + (index / (productionData.length - 1 || 1)) * 270;
                    const y = 180 - ((entry.value - minValue) / range) * 160;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />

              {productionData.map((entry, index) => {
                const x = 30 + (index / (productionData.length - 1 || 1)) * 270;
                const y = 180 - ((entry.value - minValue) / range) * 160;
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#22c55e"
                    className="hover:r-5 transition-all"
                  />
                );
              })}
            </svg>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2 font-medium">
            {timeRange} · adaptive smoothing
          </p>
        </div>

        <div className="w-24 flex flex-col justify-end gap-3">
          <p className="text-xs text-gray-500 mb-2 font-semibold text-center">Projected</p>
          {projectedData.map((item, index) => {
            const barHeight = Math.max(
              20,
              ((item.value - minValue) / range) * maxBarHeight || maxBarHeight / 2,
            );
            return (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: barHeight }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className="w-14 bg-gradient-to-t from-green-600 to-green-500 rounded-t-lg shadow-md transition-all hover:shadow-lg"
                  style={{ height: `${barHeight}px` }}
                />
                <span className="text-xs text-gray-600 font-medium">{item.value}</span>
                <span className="text-xs text-gray-400">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
