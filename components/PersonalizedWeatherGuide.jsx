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
import { useLanguage } from "@/Context/languagecontext";

const PersonalizedWeatherGuide = ({ selectedCrop, weatherData }) => {
  const { t, currentLanguage } = useLanguage();
  const [guidance, setGuidance] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [irrigationAdvice, setIrrigationAdvice] = useState(null);

  useEffect(() => {
    if (selectedCrop && weatherData) {
      generateGuidance();
    }
  }, [selectedCrop, weatherData, currentLanguage]);

  const generateGuidance = () => {
    if (!selectedCrop || !weatherData) return;

    const cropInfo = selectedCrop.cropInfo || {};
    const weather = weatherData;
    const newGuidance = [];
    const newAlerts = [];
    let irrigation = null;
    const cropName = cropInfo.name || "Crop";

    // ✅ Safe defaults for missing data
    const tempRange = cropInfo.temperatureRange || { min: 15, max: 35 };
    const humidityRange = cropInfo.humidityRange || { min: 40, max: 80 };
    const waterRange = cropInfo.watering || cropInfo.waterNeeds || { min: 300, max: 600 };
    const pests = Array.isArray(cropInfo.pests)
      ? cropInfo.pests
      : (cropInfo.pests ? [cropInfo.pests] : ["None listed"]);

    // 🌡️ Temperature-based guidance
    if (weather?.temperature < tempRange.min) {
      newAlerts.push({
        type: "warning",
        icon: FaThermometer,
        title: t('alert_low_temp_title'),
        message: t('alert_low_temp_msg').replace('{crop}', cropName),
        action: t('action_protect_frost'),
      });
    } else if (weather.temperature > tempRange.max) {
      newAlerts.push({
        type: "warning",
        icon: FaSun,
        title: t('alert_high_temp_title'),
        message: t('alert_high_temp_msg').replace('{crop}', cropName),
        action: t('action_increase_irrigation'),
      });
    } else {
      newGuidance.push({
        type: "success",
        icon: FaCheckCircle,
        title: t('guidance_optimal_temp_title'),
        message: t('guidance_optimal_temp_msg').replace('{crop}', cropName),
        action: t('action_continue_care'),
      });
    }

    // 💧 Humidity-based guidance
    if (weather.humidity < humidityRange.min) {
      newAlerts.push({
        type: "info",
        icon: FaWater,
        title: t('alert_low_humidity_title'),
        message: t('alert_low_humidity_msg').replace('{crop}', cropName),
        action: t('action_increase_humidity'),
      });
    } else if (weather.humidity > humidityRange.max) {
      newAlerts.push({
        type: "warning",
        icon: FaBug,
        title: t('alert_high_humidity_title'),
        message: t('alert_high_humidity_msg').replace('{crop}', cropName),
        action: t('action_preventive_fungicide'),
      });
    }

    // 🌧️ Rain-based guidance
    if (weather.rainChance > 70) {
      newAlerts.push({
        type: "warning",
        icon: FaCloudRain,
        title: t('alert_heavy_rain_title'),
        message: t('alert_heavy_rain_msg'),
        action: t('action_delay_pesticide'),
      });
    } else if (weather.rainChance < 20) {
      newGuidance.push({
        type: "info",
        icon: FaSun,
        title: t('guidance_dry_weather_title'),
        message: t('guidance_dry_weather_msg'),
        action: t('action_ideal_spraying'),
      });
    }

    // 🌬️ Wind-based guidance
    if (weather.windSpeed > 20) {
      newAlerts.push({
        type: "warning",
        icon: FaWind,
        title: t('alert_high_wind_title'),
        message: t('alert_high_wind_msg').replace('{crop}', cropName),
        action: t('action_postpone_fieldwork'),
      });
    }

    // 🌱 Growth stage specific
    const growthStage = selectedCrop.growthStage;
    if (growthStage) {
      newGuidance.push({
        type: "info",
        icon: FaLeaf,
        title: t('guidance_critical_stage_title'),
        message: t('guidance_critical_stage_msg').replace('{crop}', cropName).replace('{stage}', growthStage),
        action: t('action_maintain_optimal'),
      });
    }

    // 💧 Irrigation advice
    const daysSinceRain = calculateDaysSinceRain();
    const soilMoisture = calculateSoilMoisture(weather, daysSinceRain);

    if (soilMoisture < 30) {
      irrigation = {
        type: "urgent",
        icon: FaTint,
        title: t('irrigation_needed_title'),
        message: t('irrigation_needed_msg').replace('{crop}', cropName),
        action: t('action_water_immediately'),
        amount: calculateWaterAmount(waterRange, weather),
      };
    } else if (soilMoisture < 50) {
      irrigation = {
        type: "warning",
        icon: FaWater,
        title: t('irrigation_recommended_title'),
        message: t('irrigation_recommended_msg'),
        action: t('action_plan_irrigation'),
        amount: calculateWaterAmount(waterRange, weather),
      };
    } else {
      irrigation = {
        type: "success",
        icon: FaCheckCircle,
        title: t('irrigation_adequate_title'),
        message: t('irrigation_adequate_msg').replace('{crop}', cropName),
        action: t('action_continue_monitoring'),
        amount: t('amount_no_water'),
      };
    }

    // 🐛 Pest and disease alerts
    generatePestAlerts(cropInfo, weather, newAlerts, pests, cropName);

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

  const generatePestAlerts = (cropInfo, weather, alerts, pests, cropName) => {
    if (weather.humidity > 80 && weather.temperature > 25) {
      alerts.push({
        type: "warning",
        icon: FaBug,
        title: t('alert_disease_risk_title'),
        message: t('alert_disease_risk_msg').replace('{crop}', cropName),
        action: t('action_preventive_fungicide'),
      });
    }

    if (weather.humidity < 40 && weather.temperature > 25) {
      alerts.push({
        type: "info",
        icon: FaSprayCan,
        title: t('alert_pest_activity_title'),
        message: t('alert_pest_activity_msg').replace('{pests}', pests.join(", ")),
        action: t('action_check_pest'),
      });
    }
  };

  const getAlertColor = (type) => {
    const colors = {
      warning: "from-orange-400 to-red-500",
      info: "from-blue-400 to-sky-500",
      success: "from-green-400 to-emerald-500",
      urgent: "from-red-500 to-pink-600",
    };
    return colors[type] || "from-gray-400 to-slate-500";
  };

  const getAlertBg = (type) => {
    const bgs = {
      warning: "bg-orange-50 border-orange-200 dark:bg-[#2C2C2C] dark:border-orange-500/20",
      info: "bg-blue-50 border-blue-200 dark:bg-[#2C2C2C] dark:border-sky-500/20",
      success: "bg-green-50 border-green-200 dark:bg-[#2C2C2C] dark:border-emerald-500/20",
      urgent: "bg-red-50 border-red-200 dark:bg-[#2C2C2C] dark:border-red-500/20",
    };
    return bgs[type] || "bg-gray-50 border-gray-200 dark:bg-[#2C2C2C] dark:border-[#444]";
  };

  if (!selectedCrop) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 bg-farm-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaSeedling className="w-12 h-12 text-farm-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-2">{t('select_crop_title')}</h3>
        <p className="text-farm-700 dark:text-gray-400">
          {t('select_crop_desc')}
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
        className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg dark:bg-[#1E1E1E] dark:border-[#333]"
      >
        <div className="flex items-center gap-4">
          <div className="text-4xl">{selectedCrop?.crop_info?.icon}</div>
          <div>
            <h2 className="text-2xl font-bold text-farm-900 dark:text-white">
              {selectedCrop?.crop_info?.name} {t('weather_guidance_title')}
            </h2>
            <p className="text-farm-700 dark:text-gray-400">
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
          className={`${getAlertBg(irrigationAdvice.type)} rounded-2xl p-6 border shadow-lg`}
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
              <h3 className="text-lg font-bold text-farm-900 dark:text-white mb-2">
                💧 {irrigationAdvice.title}
              </h3>
              <p className="text-farm-800 dark:text-gray-200 mb-3">{irrigationAdvice.message}</p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-farm-700 dark:text-gray-300">
                  {t('action_label')}: {irrigationAdvice.action}
                </span>
                <span className="text-sm font-bold text-farm-600 dark:text-emerald-400">
                  {t('amount_label')}: {irrigationAdvice.amount}
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
          <h3 className="text-xl font-bold text-farm-900 dark:text-white flex items-center gap-2">
            <FaExclamationTriangle className="w-6 h-6 text-orange-500" />
            {t('weather_alerts_title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getAlertBg(alert.type)} rounded-2xl p-4 border shadow-lg`}
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
                    <h4 className="font-bold text-farm-900 dark:text-gray-100 mb-1">{alert.title}</h4>
                    <p className="text-sm text-farm-800 dark:text-gray-300 mb-2">{alert.message}</p>
                    <p className="text-xs font-bold text-farm-700 dark:text-gray-400">{alert.action}</p>
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
          <h3 className="text-xl font-bold text-farm-900 dark:text-white flex items-center gap-2">
            <FaInfoCircle className="w-6 h-6 text-blue-500" />
            {t('general_guidance_title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guidance.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${getAlertBg(item.type)} rounded-2xl p-4 border shadow-lg`}
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
                    <h4 className="font-bold text-farm-900 dark:text-gray-100 mb-1">{item.title}</h4>
                    <p className="text-sm text-farm-800 dark:text-gray-300 mb-2">{item.message}</p>
                    <p className="text-xs font-bold text-farm-700 dark:text-gray-400">{item.action}</p>
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
        className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg dark:bg-[#1E1E1E] dark:border-[#333]"
      >
        <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
          <FaLeaf className="w-6 h-6 text-green-500" />
          {cropInfo.name} {t('care_tips_title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-farm-800 dark:text-gray-200 mb-2">{t('optimal_conditions')}</h4>
            <ul className="text-sm text-farm-700 dark:text-gray-400 space-y-1">
              <li>• {t('temp_label')}: {tempRange.min}°C - {tempRange.max}°C</li>
              <li>• {t('humidity_label')}: {humidityRange.min}% - {humidityRange.max}%</li>
              <li>• {t('water_label')}: {waterRange.min}mm - {waterRange.max}mm per season</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-farm-800 dark:text-gray-200 mb-2">{t('common_pests')}</h4>
            <ul className="text-sm text-farm-700 dark:text-gray-400 space-y-1">
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
