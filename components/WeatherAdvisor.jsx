"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  AlertTriangle,
  Thermometer,
  Gauge,
  Calendar,
  Lightbulb,
  Wheat,
  Sprout
} from "lucide-react";
import { useLanguage } from "@/Context/languagecontext";

const WeatherAdvisor = ({
  cropName = "Wheat",
  cropStage = "Growth Stage",
  weather = null,
  suggestions = []
}) => {
  const { t } = useLanguage();

  // Default weather data for preview
  const defaultWeather = {
    temperature: 24,
    humidity: 65,
    rainChance: 30,
    windSpeed: 12,
    forecast: [
      { day: t("day_today"), temp: 24, condition: "sunny", icon: Sun, rainChance: 20 },
      { day: t("day_tomorrow"), temp: 22, condition: "cloudy", icon: Cloud, rainChance: 40 },
      { day: "Day 3", temp: 18, condition: "rainy", icon: CloudRain, rainChance: 80 }
    ]
  };

  const defaultSuggestions = [
    { text: t("sample_suggestion_rain"), icon: CloudRain, type: "warning" },
    { text: t("sample_suggestion_growth"), icon: Sun, type: "success" },
    { text: t("sample_suggestion_wind"), icon: Wind, type: "info" },
    { text: t("sample_suggestion_humidity"), icon: Droplets, type: "success" },
    { text: t("sample_suggestion_moisture"), icon: Gauge, type: "info" }
  ];

  const currentWeather = weather || defaultWeather;
  const currentSuggestions = suggestions.length > 0 ? suggestions : defaultSuggestions;

  const getWeatherIcon = (condition) => {
    const iconMap = {
      sunny: Sun,
      cloudy: Cloud,
      rainy: CloudRain,
      windy: Wind
    };
    return iconMap[condition] || Sun;
  };

  const getSuggestionColor = (type) => {
    const colorMap = {
      warning: "from-orange-400 to-red-500",
      success: "from-green-400 to-emerald-500",
      info: "from-blue-400 to-sky-500",
      error: "from-red-400 to-pink-500"
    };
    return colorMap[type] || "from-gray-400 to-slate-500";
  };

  const getSuggestionBg = (type) => {
    const bgMap = {
      warning: "bg-orange-50 border-orange-200",
      success: "bg-green-50 border-green-200",
      info: "bg-blue-50 border-blue-200",
      error: "bg-red-50 border-red-200"
    };
    return bgMap[type] || "bg-gray-50 border-gray-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-6xl mx-auto mb-8"
    >
      {/* Main Weather Advisor Card */}
      <div
        className="relative overflow-hidden rounded-2xl shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 25%, #86efac 50%, #4ade80 75%, #22c55e 100%)',
          boxShadow: '0 25px 50px -12px rgba(34, 197, 94, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-5 -left-5 w-24 h-24 bg-white/15 rounded-full"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="relative z-10 p-8">
          {/* Crop Information Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-white/30 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-lg">
                <Wheat className="w-6 h-6 text-farm-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-farm-900">
                  🌾 {t("advisor_crop_label")}: {cropName}
                </h2>
                <p className="text-farm-700 font-medium">
                  {cropStage}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Weather Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Cloud className="w-6 h-6 text-farm-700" />
              <h3 className="text-xl font-bold text-farm-900">{t("advisor_weather_overview")}</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Temperature */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-semibold text-farm-700">{t("advisor_label_temp")}</span>
                </div>
                <div className="text-2xl font-bold text-farm-900">
                  {currentWeather.temperature}°C
                </div>
              </motion.div>

              {/* Humidity */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold text-farm-700">{t("advisor_label_humidity")}</span>
                </div>
                <div className="text-2xl font-bold text-farm-900">
                  {currentWeather.humidity}%
                </div>
              </motion.div>

              {/* Rain Chance */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <CloudRain className="w-5 h-5 text-sky-500" />
                  <span className="text-sm font-semibold text-farm-700">{t("advisor_label_rain")}</span>
                </div>
                <div className="text-2xl font-bold text-farm-900">
                  {currentWeather.rainChance}%
                </div>
              </motion.div>

              {/* Wind Speed */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Wind className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-semibold text-farm-700">{t("advisor_label_wind")}</span>
                </div>
                <div className="text-2xl font-bold text-farm-900">
                  {currentWeather.windSpeed} km/h
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 3-Day Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-farm-700" />
              <h3 className="text-xl font-bold text-farm-900">{t("advisor_3_day_forecast")}</h3>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {currentWeather.forecast.map((day, index) => {
                const IconComponent = day.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0 bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg min-w-[140px]"
                  >
                    <div className="text-center">
                      <IconComponent className="w-8 h-8 text-farm-700 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-farm-700 mb-1">
                        {day.day}
                      </div>
                      <div className="text-lg font-bold text-farm-900 mb-1">
                        {day.temp}°C
                      </div>
                      <div className="text-xs text-farm-600">
                        {day.rainChance}% rain
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Smart Farming Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-6 h-6 text-farm-700" />
              <h3 className="text-xl font-bold text-farm-900">{t("advisor_smart_suggestions")}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSuggestions.map((suggestion, index) => {
                const IconComponent = suggestion.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    whileHover={{
                      scale: 1.05,
                      y: -5
                    }}
                    className={`${getSuggestionBg(suggestion.type)} rounded-2xl p-4 border-2 shadow-lg hover:shadow-xl transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${getSuggestionColor(suggestion.type)} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-farm-800 leading-relaxed">
                          {suggestion.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Fallback UI for No Data */}
      <AnimatePresence>
        {!weather && suggestions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mt-4 text-center"
          >
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg">
              <div className="w-16 h-16 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-farm-600" />
              </div>
              <h3 className="text-lg font-bold text-farm-900 mb-2">
                {t("advisor_welcome_title")}
              </h3>
              <p className="text-farm-700 mb-4">
                {t("advisor_welcome_desc")}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("advisor_get_started")}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeatherAdvisor;
