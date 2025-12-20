"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBug,
  FaExclamationTriangle,
  FaCheckCircle,
  FaSprayCan,
  FaLeaf,
  FaClock,
  FaInfoCircle,
  FaSearch,
  FaTimes,
} from "react-icons/fa";

const PestControlTab = ({ data, loading, error }) => {
  const [selectedPest, setSelectedPest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const activeAlerts = data?.activeAlerts || [];
  const treatmentHistory = data?.treatmentHistory || [];
  const preventionTips = data?.preventionTips || [];

  // Generate pest database from active alerts
  const pestDatabase = activeAlerts.map((alert) => ({
    id: `${alert.id}-db`,
    name: alert.pest,
    type: alert.severity === "high" ? "Insect" : "Disease",
    crops: [alert.field],
    symptoms: alert.description,
    treatment: alert.recommendedTreatment,
    prevention: "Scout frequently and remove infected foliage promptly.",
    image: "🐛",
  }));

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-700 border-red-500 dark:bg-red-900/20 dark:text-red-300 dark:border-red-400";
      case "medium":
        return "bg-orange-100 text-orange-700 border-orange-500 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-400";
      case "low":
        return "bg-yellow-100 text-yellow-700 border-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-400";
      default:
        return "bg-gray-100 text-gray-700 border-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      case "treating":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "monitoring":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300";
      case "completed":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredPestDatabase = pestDatabase.filter((pest) =>
    pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pest.crops.some((crop) => crop.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <p className="text-farm-700 dark:text-gray-200">Loading pest intelligence...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
        {error}
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
              <FaBug className="text-orange-500" />
              Pest Control Management
            </h2>
            <p className="text-farm-700 dark:text-gray-300 mt-1">
              Monitor, identify, and manage pests in your fields
            </p>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
          <FaExclamationTriangle className="text-red-500" />
          Active Pest Alerts
        </h3>
        {activeAlerts.length === 0 ? (
          <p className="text-farm-700 dark:text-gray-300">
            No active pest alerts. Keep scouting regularly to stay ahead.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeAlerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPest(alert)}
              className={`bg-white/60 dark:bg-[#1a1a1a] rounded-xl p-5 border-l-4 cursor-pointer hover:shadow-lg transition-all ${
                selectedPest?.id === alert.id
                  ? "ring-2 ring-orange-500"
                  : ""
              } ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-bold text-lg text-farm-900 dark:text-white">{alert.pest}</h4>
                  <p className="text-sm text-farm-600 dark:text-gray-400">{alert.field}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                  {alert.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-farm-700 dark:text-gray-300">Severity:</span>
                  <span className="font-semibold text-farm-900 dark:text-white capitalize">{alert.severity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-farm-700 dark:text-gray-300">Affected Area:</span>
                  <span className="font-semibold text-farm-900 dark:text-white">{alert.affectedArea}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-farm-700 dark:text-gray-300">Detected:</span>
                  <span className="font-semibold text-farm-900 dark:text-white">{alert.detected}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-farm-200 dark:border-gray-700">
                <p className="text-xs text-farm-600 dark:text-gray-400 line-clamp-2">{alert.description}</p>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Pest Details */}
      {selectedPest && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-farm-900 dark:text-white">{selectedPest.pest}</h3>
              <p className="text-farm-600 dark:text-gray-400">{selectedPest.field}</p>
            </div>
            <button
              onClick={() => setSelectedPest(null)}
              className="text-farm-600 hover:text-farm-900 dark:text-gray-400 dark:hover:text-white"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-farm-900 dark:text-white mb-2">Description</h4>
              <p className="text-farm-700 dark:text-gray-300 mb-4">{selectedPest.description}</p>
              <h4 className="font-semibold text-farm-900 dark:text-white mb-2">Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-farm-600 dark:text-gray-400">Severity:</span>
                  <span className="font-medium text-farm-900 dark:text-white capitalize">{selectedPest.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-farm-600 dark:text-gray-400">Affected Area:</span>
                  <span className="font-medium text-farm-900 dark:text-white">{selectedPest.affectedArea}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-farm-600 dark:text-gray-400">Detected:</span>
                  <span className="font-medium text-farm-900 dark:text-white">{selectedPest.detected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-farm-600 dark:text-gray-400">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedPest.status)}`}>
                    {selectedPest.status}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-farm-900 dark:text-white mb-2 flex items-center gap-2">
                <FaSprayCan className="text-blue-500" />
                Recommended Treatment
              </h4>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <p className="text-farm-700 dark:text-gray-300">{selectedPest.recommendedTreatment}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pest Database */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
          <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
            <FaSearch className="text-green-500" />
            Pest Identification Database
          </h3>
          <div className="mb-4">
            <div className="relative">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-neutral-700">
                <FaSearch className="text-gray-400 dark:text-gray-500" />

                <input
                  type="text"
                  placeholder="Search pests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
          </div>
          {filteredPestDatabase.length === 0 ? (
            <p className="text-farm-700 dark:text-gray-400">No pest records from recent alerts.</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredPestDatabase.map((pest) => (
              <motion.div
                key={pest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/60 dark:bg-[#1a1a1a] rounded-lg p-4 border border-white/20 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{pest.image}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-farm-900 dark:text-white">{pest.name}</h4>
                      <span className="text-xs px-2 py-1 bg-farm-100 dark:bg-farm-800 rounded text-farm-700 dark:text-gray-300">
                        {pest.type}
                      </span>
                    </div>
                    <p className="text-sm text-farm-600 dark:text-gray-400 mb-2">
                      <span className="font-medium">Crops:</span> {pest.crops.join(", ")}
                    </p>
                    <p className="text-xs text-farm-700 dark:text-gray-300 mb-2">
                      <span className="font-medium">Symptoms:</span> {pest.symptoms}
                    </p>
                    <p className="text-xs text-farm-700 dark:text-gray-300">
                      <span className="font-medium">Treatment:</span> {pest.treatment}
                    </p>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Treatment History & Prevention */}
        <div className="space-y-6">
          {/* Treatment History */}
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
            <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
              <FaClock className="text-purple-500" />
              Treatment History
            </h3>
            {treatmentHistory.length === 0 ? (
              <p className="text-farm-700 dark:text-gray-400">No recorded treatments yet.</p>
            ) : (
              <div className="space-y-3">
                {treatmentHistory.map((treatment) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/60 dark:bg-[#1a1a1a] rounded-lg p-4 border border-white/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-farm-900 dark:text-white">{treatment.pest}</h4>
                      <p className="text-sm text-farm-600 dark:text-gray-400">{treatment.field}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(treatment.status)}`}>
                      {treatment.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-farm-600 dark:text-gray-400">Treatment:</span>
                      <span className="font-medium text-farm-900 dark:text-white">{treatment.treatment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-farm-600 dark:text-gray-400">Date:</span>
                      <span className="font-medium text-farm-900 dark:text-white">{treatment.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-farm-600 dark:text-gray-400">Effectiveness:</span>
                      <span className="font-medium text-green-600 dark:text-green-400">{treatment.effectiveness}</span>
                    </div>
                  </div>
                </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Prevention Tips */}
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
            <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
              <FaLeaf className="text-green-500" />
              Prevention Tips
            </h3>
            {preventionTips.length === 0 ? (
              <p className="text-farm-700 dark:text-gray-400">No prevention tips available.</p>
            ) : (
              <div className="space-y-3">
                {preventionTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/60 dark:bg-[#1a1a1a] rounded-lg p-4 border-l-4 border-green-500"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-farm-900 dark:text-white">{tip.title}</h4>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        tip.priority === "high"
                          ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      }`}
                    >
                      {tip.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-farm-700 dark:text-gray-300">{tip.description}</p>
                </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestControlTab;

