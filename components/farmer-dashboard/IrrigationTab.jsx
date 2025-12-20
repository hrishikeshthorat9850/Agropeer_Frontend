//irrigation 
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaTint,
  FaClock,
  FaChartLine,
  FaCheckCircle,
  FaExclamationTriangle,
  FaWater,
  FaCalendarAlt,
  FaLeaf,
} from "react-icons/fa";

const IrrigationTab = ({ selectedCrop, data, loading, error }) => {
  const [selectedField, setSelectedField] = useState(null);
  const fields = data?.fields || [];
  const irrigationSchedule = data?.schedule || [];
  const waterUsageStats = data?.waterUsage || {
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    average: 0,
    efficiency: 0,
  };
  const recommendations = data?.recommendations || [];
  const currentField = fields.find((f) => f.id === selectedField) || fields[0];

  const getStatusColor = (status) => {
    switch (status) {
      case "optimal":
        return "text-green-600 bg-green-100";
      case "needs_water":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "optimal":
        return <FaCheckCircle className="text-green-600" />;
      case "needs_water":
        return <FaExclamationTriangle className="text-orange-600" />;
      default:
        return <FaClock className="text-gray-600" />;
    }
  };

  useEffect(() => {
    if (fields.length && !selectedField) {
      setSelectedField(fields[0].id);
    }
  }, [fields, selectedField]);

  if (loading) {
    return (
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <p className="text-farm-700 dark:text-gray-200">Loading irrigation data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6">
        {error}
      </div>
    );
  }

  if (!fields.length) {
    return (
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <p className="text-farm-700 dark:text-gray-200">
          Add a crop to see irrigation insights.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-farm-900 dark:text-white flex items-center gap-2">
              <FaTint className="text-cyan-500" />
              Irrigation Management
            </h2>
            <p className="text-farm-700 dark:text-gray-300 mt-1">
              Monitor and manage your irrigation systems
            </p>
          </div>
        </div>
      </div>

      {/* Field Selection & Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fields.map((field) => (
          <motion.div
            key={field.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedField(field.id)}
            className={`bg-white/40 backdrop-blur-lg rounded-xl p-5 border-2 cursor-pointer transition-all ${
              selectedField === field.id
                ? "border-cyan-500 shadow-lg"
                : "border-white/30 hover:border-cyan-300"
            } shadow-md dark:bg-[#272727]`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-farm-900 dark:text-white">{field.name}</h3>
                <p className="text-sm text-farm-600 dark:text-gray-400">{field.area}</p>
              </div>
              {getStatusIcon(field.status)}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-farm-700 dark:text-gray-300">Moisture Level</span>
                <span className="font-semibold text-farm-900 dark:text-white">{field.moistureLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div
                  className={`h-2 rounded-full ${
                    field.moistureLevel > 60 ? "bg-green-500" : field.moistureLevel > 40 ? "bg-yellow-500" : "bg-orange-500"
                  }`}
                  style={{ width: `${field.moistureLevel}%` }}
                ></div>
              </div>
              <div className="text-xs text-farm-600 dark:text-gray-400 mt-2">
                <div>Last: {field.lastIrrigated}</div>
                <div>Next: {field.nextIrrigation}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Water Usage Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaWater className="text-cyan-500" />
            <span className="text-sm text-farm-700 dark:text-gray-300">Today</span>
          </div>
          <div className="text-2xl font-bold text-farm-900 dark:text-white">
            {waterUsageStats.today.toLocaleString()}L
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaChartLine className="text-blue-500" />
            <span className="text-sm text-farm-700 dark:text-gray-300">This Week</span>
          </div>
          <div className="text-2xl font-bold text-farm-900 dark:text-white">
            {waterUsageStats.thisWeek.toLocaleString()}L
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaCalendarAlt className="text-purple-500" />
            <span className="text-sm text-farm-700 dark:text-gray-300">This Month</span>
          </div>
          <div className="text-2xl font-bold text-farm-900 dark:text-white">
            {waterUsageStats.thisMonth.toLocaleString()}L
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaWater className="text-green-500" />
            <span className="text-sm text-farm-700 dark:text-gray-300">Daily Avg</span>
          </div>
          <div className="text-2xl font-bold text-farm-900 dark:text-white">
            {waterUsageStats.average.toLocaleString()}L
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-2 mb-2">
            <FaLeaf className="text-emerald-500" />
            <span className="text-sm text-farm-700 dark:text-gray-300">Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-farm-900 dark:text-white">
            {waterUsageStats.efficiency}%
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Irrigation Schedule */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
          <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            Upcoming Schedule
          </h3>
          <div className="space-y-3">
            {irrigationSchedule.map((schedule) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/60 dark:bg-[#1a1a1a] rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-farm-900 dark:text-white">{schedule.field}</h4>
                    <p className="text-sm text-farm-600 dark:text-gray-400">{schedule.type}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      schedule.status === "scheduled"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
                    }`}
                  >
                    {schedule.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                  <div>
                    <span className="text-farm-600 dark:text-gray-400">Date & Time:</span>
                    <div className="font-medium text-farm-900 dark:text-white">
                      {schedule.date} at {schedule.time}
                    </div>
                  </div>
                  <div>
                    <span className="text-farm-600 dark:text-gray-400">Duration:</span>
                    <div className="font-medium text-farm-900 dark:text-white">{schedule.duration}</div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-farm-600 dark:text-gray-400">Water Amount:</span>
                    <div className="font-medium text-farm-900 dark:text-white">{schedule.waterAmount}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
          <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-500" />
            Recommendations
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-lg p-4 border-l-4 ${
                  rec.type === "warning"
                    ? "bg-orange-50 border-orange-500 dark:bg-orange-900/20 dark:border-orange-400"
                    : rec.type === "info"
                    ? "bg-blue-50 border-blue-500 dark:bg-blue-900/20 dark:border-blue-400"
                    : "bg-green-50 border-green-500 dark:bg-green-900/20 dark:border-green-400"
                }`}
              >
                <div className="flex items-start gap-3">
                  {rec.type === "warning" && (
                    <FaExclamationTriangle className="text-orange-500 mt-1 flex-shrink-0" />
                  )}
                  {rec.type === "info" && <FaClock className="text-blue-500 mt-1 flex-shrink-0" />}
                  {rec.type === "success" && (
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold text-farm-900 dark:text-white mb-1">{rec.title}</h4>
                    <p className="text-sm text-farm-700 dark:text-gray-300">{rec.message}</p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 rounded text-xs ${
                        rec.priority === "high"
                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          : rec.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {rec.priority} priority
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationTab;

