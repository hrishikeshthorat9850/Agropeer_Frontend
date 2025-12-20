"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTint,
  FaBug,
  FaSun,
  FaCloudRain,
  FaThermometer,
  FaWind,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaWater,
  FaSprayCan,
  FaLeaf,
  FaSeedling,
} from "react-icons/fa";

const PersonalizedWeatherGuide = ({ selectedCrop, weatherData }) => {
  const [guidance, setGuidance] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [irrigationAdvice, setIrrigationAdvice] = useState(null);

  useEffect(()=>{
    console.log("Selected crop is :",selectedCrop);
  },[selectedCrop]);
  
  useEffect(() => {
    if (selectedCrop && weatherData) {
      generateGuidance();
    }
  }, [selectedCrop, weatherData]);

  const generateGuidance = () => {
    if (!selectedCrop || !weatherData) return;

    const cropInfo = selectedCrop.cropInfo || {};
    const weather = weatherData;
    const newGuidance = [];
    const newAlerts = [];
    let irrigation = null;

    // ✅ Safe defaults for missing data
    const tempRange = cropInfo.temperatureRange || { min: 15, max: 35 };
    const humidityRange = cropInfo.humidityRange || { min: 40, max: 80 };
    const waterRange = cropInfo.watering || cropInfo.waterNeeds || { min: 300, max: 600 };
    const pests = Array.isArray(cropInfo.pests)
      ? cropInfo.pests
      : (cropInfo.pests ? [cropInfo.pests] : ["None listed"]);

    // 🌡️ Temperature-based guidance
    if (weather.temperature < tempRange.min) {
      newAlerts.push({
        type: "warning",
        icon: FaThermometer,
        title: "Low Temperature Alert",
        message: `${cropInfo.name || "Crop"} is sensitive to cold. Consider covering crops or delaying planting.`,
        action: "Protect crops from frost damage",
      });
    } else if (weather.temperature > tempRange.max) {
      newAlerts.push({
        type: "warning",
        icon: FaSun,
        title: "High Temperature Alert",
        message: `Temperatures are above optimal range for ${cropInfo.name || "this crop"}. Monitor for heat stress.`,
        action: "Increase irrigation frequency",
      });
    } else {
      newGuidance.push({
        type: "success",
        icon: FaCheckCircle,
        title: "Optimal Temperature",
        message: `Temperature is perfect for ${cropInfo.name || "crop"} growth.`,
        action: "Continue normal care",
      });
    }

    // 💧 Humidity-based guidance
    if (weather.humidity < humidityRange.min) {
      newAlerts.push({
        type: "info",
        icon: FaWater,
        title: "Low Humidity",
        message: `Humidity is below optimal for ${cropInfo.name || "crop"}. Consider misting or irrigation.`,
        action: "Increase humidity around crops",
      });
    } else if (weather.humidity > humidityRange.max) {
      newAlerts.push({
        type: "warning",
        icon: FaBug,
        title: "High Humidity Alert",
        message: `High humidity increases disease risk for ${cropInfo.name || "crop"}. Monitor for fungal diseases.`,
        action: "Apply preventive fungicide",
      });
    }

    // 🌧️ Rain-based guidance
    if (weather.rainChance > 70) {
      newAlerts.push({
        type: "warning",
        icon: FaCloudRain,
        title: "Heavy Rain Expected",
        message: `High chance of rain. Avoid pesticide application and check drainage.`,
        action: "Delay pesticide spraying",
      });
    } else if (weather.rainChance < 20) {
      newGuidance.push({
        type: "info",
        icon: FaSun,
        title: "Dry Weather",
        message: `Low chance of rain. Good time for field work and pesticide application.`,
        action: "Ideal for spraying and field operations",
      });
    }

    // 🌬️ Wind-based guidance
    if (weather.windSpeed > 20) {
      newAlerts.push({
        type: "warning",
        icon: FaWind,
        title: "High Wind Alert",
        message: `Strong winds may damage ${cropInfo.name || "crop"}. Avoid pesticide application.`,
        action: "Postpone spraying and field work",
      });
    }

    // 🌱 Growth stage specific
    const growthStage = selectedCrop.growthStage;
    if (growthStage === "Flowering" || growthStage === "Fruit Setting") {
      newGuidance.push({
        type: "info",
        icon: FaLeaf,
        title: "Critical Growth Stage",
        message: `${cropInfo.name || "crop"} is in ${growthStage} stage. Avoid stress during this period.`,
        action: "Maintain optimal conditions",
      });
    }

    // 💧 Irrigation advice
    const daysSinceRain = calculateDaysSinceRain();
    const soilMoisture = calculateSoilMoisture(weather, daysSinceRain);

    if (soilMoisture < 30) {
      irrigation = {
        type: "urgent",
        icon: FaTint,
        title: "Irrigation Needed",
        message: `Soil moisture is low. ${cropInfo.name || "crop"} needs immediate watering.`,
        action: "Water immediately",
        amount: calculateWaterAmount(waterRange, weather),
      };
    } else if (soilMoisture < 50) {
      irrigation = {
        type: "warning",
        icon: FaWater,
        title: "Irrigation Recommended",
        message: `Soil moisture is getting low. Consider watering soon.`,
        action: "Plan irrigation within 2 days",
        amount: calculateWaterAmount(waterRange, weather),
      };
    } else {
      irrigation = {
        type: "success",
        icon: FaCheckCircle,
        title: "Adequate Moisture",
        message: `Soil moisture is good for ${cropInfo.name || "crop"}.`,
        action: "Continue monitoring",
        amount: "No additional water needed",
      };
    }

    // 🐛 Pest and disease alerts
    generatePestAlerts(cropInfo, weather, newAlerts, pests);

    setGuidance(newGuidance);
    setAlerts(newAlerts);
    setIrrigationAdvice(irrigation);
  };

  // --- Utility functions ---
  const calculateDaysSinceRain = () => Math.floor(Math.random() * 7);

  const calculateSoilMoisture = (weather, daysSinceRain) => {
    let moisture = 60;
    moisture -= daysSinceRain * 8;
    moisture -= (weather.temperature - 20) * 2;
    moisture += weather.humidity * 0.3;
    return Math.max(0, Math.min(100, moisture));
  };

  const calculateWaterAmount = (waterRange, weather) => {
    const baseAmount = (waterRange.min || 300) / 30;
    const adjustment = weather.temperature > 25 ? 1.5 : 1;
    return `${Math.round(baseAmount * adjustment)}mm per day`;
  };

  const generatePestAlerts = (cropInfo, weather, alerts, pests) => {
    if (weather.humidity > 80 && weather.temperature > 25) {
      alerts.push({
        type: "warning",
        icon: FaBug,
        title: "Disease Risk High",
        message: `Conditions favor fungal diseases in ${cropInfo.name || "crop"}. Apply preventive treatment.`,
        action: "Apply fungicide preventively",
      });
    }

    if (weather.humidity < 40 && weather.temperature > 25) {
      alerts.push({
        type: "info",
        icon: FaSprayCan,
        title: "Pest Activity Expected",
        message: `Dry conditions may increase pest activity. Monitor for ${pests.join(", ")}.`,
        action: "Check for pest damage",
      });
    }
  };

  const getAlertColor = (type) => {
    const colors = {
      warning: "from-orange-400 to-red-500 dark:bg-[#272727] dark:border-white/20",
      info: "from-blue-400 to-sky-500 dark:bg-[#272727] dark:border-white/20",
      success: "from-green-400 to-emerald-500 dark:bg-[#272727] dark:border-white/20",
      urgent: "from-red-500 to-pink-600 dark:bg-[#272727] dark:border-white/20",
    };
    return colors[type] || "from-gray-400 to-slate-500 dark:bg-[#272727] dark:border-white/20";
  };

  const getAlertBg = (type) => {
    const bgs = {
      warning: "bg-orange-50 border-orange-200 dark:bg-[#272727] dark:border-white/20",
      info: "bg-blue-50 border-blue-200 dark:bg-[#272727] dark:border-white/20",
      success: "bg-green-50 border-green-200 dark:bg-[#272727] dark:border-white/20",
      urgent: "bg-red-50 border-red-200 dark:bg-[#272727] dark:border-white/20",
    };
    return bgs[type] || "bg-gray-50 border-gray-200";
  };

  if (!selectedCrop) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaSeedling className="w-12 h-12 text-farm-600" />
        </div>
        <h3 className="text-xl font-bold text-farm-900 mb-2">Select a Crop</h3>
        <p className="text-farm-700">
          Choose a crop from your profile to get personalized weather guidance.
        </p>
      </motion.div>
    );
  }

  const cropInfo = selectedCrop.cropInfo || {};
  const tempRange = cropInfo.temperatureRange || { min: 15, max: 35 };
  const humidityRange = cropInfo.humidityRange || { min: 40, max: 80 };
  const waterRange = cropInfo.watering || cropInfo.waterNeeds || { min: 300, max: 600 };
  const pests = Array.isArray(cropInfo.pests)
    ? cropInfo.pests
    : (cropInfo.pests ? [cropInfo.pests] : ["No pests listed"]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Crop Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg dark:bg-[#272727]"
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl">{selectedCrop?.crop_info?.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-farm-900">
              {selectedCrop?.crop_info?.name} Weather Guidance
            </h2>
            <p className="text-farm-700">
              {selectedCrop.variety} • {selectedCrop.growthStage} • {selectedCrop.location}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Irrigation Advice */}
      {irrigationAdvice && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`${getAlertBg(irrigationAdvice.type)} rounded-2xl p-6 border-2 shadow-lg`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${getAlertColor(
                irrigationAdvice.type
              )} rounded-xl flex items-center justify-center flex-shrink-0`}
            >
              <irrigationAdvice.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-farm-900 mb-2">
                💧 {irrigationAdvice.title}
              </h3>
              <p className="text-farm-800 mb-3">{irrigationAdvice.message}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-farm-700">
                  Action: {irrigationAdvice.action}
                </span>
                <span className="text-sm font-semibold text-farm-600">
                  Amount: {irrigationAdvice.amount}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-farm-900 flex items-center gap-2">
            <FaExclamationTriangle className="w-6 h-6 text-orange-500" />
            Weather Alerts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getAlertBg(alert.type)} rounded-2xl p-4 border-2 shadow-lg`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${getAlertColor(
                      alert.type
                    )} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <alert.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-farm-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-farm-800 mb-2">{alert.message}</p>
                    <p className="text-xs font-semibold text-farm-700">{alert.action}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* General Guidance */}
      {guidance.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-farm-900 flex items-center gap-2">
            <FaInfoCircle className="w-6 h-6 text-blue-500" />
            General Guidance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guidance.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getAlertBg(item.type)} rounded-2xl p-4 border-2 shadow-lg`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${getAlertColor(
                      item.type
                    )} rounded-xl flex items-center justify-center flex-shrink-0`}
                  >
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-farm-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-farm-800 mb-2">{item.message}</p>
                    <p className="text-xs font-semibold text-farm-700">{item.action}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Crop-Specific Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg dark:bg-[#272727]"
      >
        <h3 className="text-xl font-bold text-farm-900 mb-4 flex items-center gap-2">
          <FaLeaf className="w-6 h-6 text-green-500" />
          {cropInfo.name} Care Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-farm-800 mb-2">Optimal Conditions</h4>
            <ul className="text-sm text-farm-700 space-y-1">
              <li>• Temperature: {tempRange.min}°C - {tempRange.max}°C</li>
              <li>• Humidity: {humidityRange.min}% - {humidityRange.max}%</li>
              <li>• Water: {waterRange.min}mm - {waterRange.max}mm per season</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-farm-800 mb-2">Common Pests & Diseases</h4>
            <ul className="text-sm text-farm-700 space-y-1">
              {pests.slice(0, 3).map((pest, index) => (
                <li key={index}>• {pest}</li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalizedWeatherGuide;
