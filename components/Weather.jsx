"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useGeolocation from "@/hooks/useGeolocation";
import {
  FaCloudSun,
  FaTint,
  FaWind,
  FaLightbulb,
  FaSun,
  FaCloudRain,
  FaCloud,
  FaRegSun,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
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
} from "lucide-react";
import { useLanguage } from "@/Context/languagecontext";

export default function WeatherForecast() {
  const { t, currentLanguage } = useLanguage();
  const { position, error, loading } = useGeolocation();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [cropName] = useState("Wheat"); // This could be dynamic later
  const [cropStage] = useState("Growth Stage");
  const [weather, setWeatherData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const fetchedRef = useRef(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Cache key based on location
  const getCacheKey = (lat, lng) => `weather_${lat.toFixed(2)}_${lng.toFixed(2)}`;

  // Check if cached data is still valid (15 minutes)
  const isCacheValid = (cachedData) => {
    if (!cachedData || !cachedData.timestamp) return false;
    const cacheAge = Date.now() - cachedData.timestamp;
    return cacheAge < 15 * 60 * 1000; // 15 minutes
  };

  const fetchWeatherApi = async (latitude, longitude) => {
    // Prevent multiple simultaneous calls
    if (isFetching) return;

    const cacheKey = getCacheKey(latitude, longitude);

    // Check cache first
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        if (isCacheValid(cachedData)) {
          setWeatherData(cachedData.data);
          return;
        }
      }
    } catch (e) {
      // Ignore cache errors
    }

    try {
      setIsFetching(true);
      const res = await fetch(`${BASE_URL}/api/get-weather`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ latitude, longitude }),
      });

      const data = await res.json();

      if (data.error) return;
      if (!data.forecast || data.forecast.length === 0) return;

      const weatherdata = {
        temp: data.temperature ? `${data.temperature.toFixed(1)}°C` : "N/A",
        conditionKey:
          data.forecast?.[0]?.rainChance > 60
            ? "condition_rainy"
            : data.forecast?.[0]?.rainChance > 30
              ? "condition_partly_cloudy"
              : "condition_clear_sky",
        rain: data.forecast?.[0]?.rainChance
          ? `${data.forecast[0].rainChance}%` // Removed "chance" text, handle in UI or just % is fine
          : "0%",
        wind: data.windspeed ? `${data.windspeed.toFixed(1)} km/h` : "N/A",
        humidity: data.humidity ? `${data.humidity}%` : "N/A",
        sunrise: (() => {
          if (!data.sunrise) return "—";
          try {
            const date = new Date(data.sunrise);
            if (isNaN(date.getTime())) return "—";
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Kolkata",
            });
          } catch {
            return "—";
          }
        })(),
        sunset: (() => {
          if (!data.sunset) return "—";
          try {
            const date = new Date(data.sunset);
            if (isNaN(date.getTime())) return "—";
            return date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "Asia/Kolkata",
            });
          } catch {
            return "—";
          }
        })(),

        forecast: data.forecast.map((day) => {
          const [year, month, dayNum] = day.date.split("-").map(Number);
          const dateObj = new Date(Date.UTC(year, month - 1, dayNum));

          const now = new Date();
          const todayUTC = new Date(
            Date.UTC(
              now.getUTCFullYear(),
              now.getUTCMonth(),
              now.getUTCDate()
            )
          );

          const forecastDateUTC = new Date(
            Date.UTC(year, month - 1, dayNum)
          );

          const diff = Math.round(
            (forecastDateUTC - todayUTC) / (1000 * 60 * 60 * 24)
          );

          let labelKey = null;
          let dateString = null;

          if (diff === 0) labelKey = "day_today";
          else if (diff === 1) labelKey = "day_tomorrow";
          else {
            // We'll format this in render based on currentLanguage
            dateString = dateObj.toISOString();
          }

          // Store icon type instead of React element for serialization
          const iconType = day.rainChance > 60 ? "rain" : day.rainChance > 30 ? "cloud" : "sun";

          const tipKey = day.rainChance > 60
            ? "tip_heavy_rain"
            : day.rainChance > 30
              ? "tip_mild_rain"
              : "tip_field_work";

          return {
            labelKey,
            dateString,
            iconType, // Store type instead of React element
            temp: `${Math.round(day.maxTemp)}°C`,
            minTemp: `${Math.round(day.minTemp)}°C`,
            rain: `${day.rainChance}%`,
            tipKey,
          };
        }),

        tip: {
          textKey:
            data.forecast?.[0]?.rainChance > 60
              ? "tip_chance_rain"
              : data.temperature > 35
                ? "tip_high_temp"
                : "tip_favorable",
          type: data.forecast?.[0]?.rainChance > 60 ? "warning" : "good",
        },
      };

      setWeatherData(weatherdata);

      // Cache the weather data
      const cacheKey = getCacheKey(latitude, longitude);
      try {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: weatherdata,
          timestamp: Date.now(),
        }));
      } catch (e) {
        // Ignore cache errors
      }
    } catch (e) {
      console.error("Weather fetch error:", e);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    // Prevent multiple calls
    if (fetchedRef.current) return;
    if (isFetching) return;
    if (loading) return;
    if (error) return;
    if (!position) return;

    fetchedRef.current = true;
    fetchWeatherApi(position.latitude, position.longitude);
  }, [position?.latitude, position?.longitude, loading, error]);

  // Helper to format date based on language
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const locale = currentLanguage === 'hi' ? 'hi-IN' : currentLanguage === 'mr' ? 'mr-IN' : 'en-US';
    return date.toLocaleDateString(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) return <p className="text-center mt-10">{t('loading_location')}</p>;
  if (error)
    return (
      <p className="text-center text-red-600 mt-10">
        ⚠️ {error.message}
      </p>
    );
  if (!weather)
    return (
      <p className="text-center text-green-500 mt-10">{t('loading_weather')}</p>
    );

  const suggestions = [
    { text: t(weather.tip.textKey), icon: AlertTriangle, type: weather.tip.type },
    { text: t('suggestion_optimal_temp'), icon: Sun, type: "success" },
    { text: t('suggestion_monitor_moisture'), icon: Droplets, type: "info" },
    { text: t('suggestion_wind_favorable'), icon: Wind, type: "success" },
    { text: t('suggestion_irrigation_timing'), icon: Gauge, type: "info" },
  ];

  const getSuggestionColor = (type) => {
    const colorMap = {
      warning: "from-orange-400 to-red-500 dark:bg-[#0a0a0a] dark:border-none",
      success: "from-green-400 to-emerald-500 dark:bg-[#0a0a0a] dark:border-none",
      info: "from-blue-400 to-sky-500 dark:bg-[#0a0a0a] dark:border-none",
      good: "from-green-400 to-emerald-500 dark:bg-[#0a0a0a] dark:border-none",
    };
    return colorMap[type] || "from-gray-400 to-slate-500 dark:bg-[#0a0a0a] dark:border-none";
  };

  const getSuggestionBg = (type) => {
    const bgMap = {
      warning: "bg-orange-50 border-orange-200 dark:bg-[#0a0a0a] dark:border-none",
      success: "bg-green-50 border-green-200 dark:bg-[#0a0a0a] dark:border-none",
      info: "bg-blue-50 border-blue-200 dark:bg-[#0a0a0a] dark:border-none",
      good: "bg-green-50 border-green-200 dark:bg-[#0a0a0a] dark:border-none",
    };
    return bgMap[type] || "bg-gray-50 border-gray-200 dark:bg-[#0a0a0a] dark:border-none";
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* TOGGLE BUTTON */}
      <div className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {showAdvanced ? (
            <FaEyeSlash className="w-5 h-5" />
          ) : (
            <FaEye className="w-5 h-5" />
          )}
          {showAdvanced ? t('show_simple') : t('show_advanced')}
        </motion.button>
      </div>

      {/* =================== ADVANCED VIEW =================== */}
      <AnimatePresence mode="wait">
        {showAdvanced ? (
          <motion.div
            key="advanced"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="relative overflow-hidden rounded-2xl shadow-2xl 
                bg-[linear-gradient(135deg,#dcfce7_0%,#bbf7d0_25%,#86efac_50%,#4ade80_75%,#22c55e_100%)]
                dark:bg-none dark:bg-[#272727]"
            >
              <div className="relative z-10 p-6">
                {/* Crop Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-lg rounded-2xl flex items-center justify-center shadow-lg dark:bg-[#0a0a0a]">
                    <Wheat className="w-6 h-6 text-farm-700" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-farm-900">
                      {t('crop_label')}: {cropName}
                    </h2>
                    <p className="text-farm-700 font-medium">{cropStage}</p>
                  </div>
                </div>

                {/* ------------------ WEATHER OVERVIEW ------------------ */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <WeatherCard
                    label={t('label_temperature')}
                    value={weather.temp}
                    icon={
                      <Thermometer className="w-6 h-6 text-red-500" />
                    }
                  />
                  <WeatherCard
                    label={t('label_humidity')}
                    value={weather.humidity}
                    icon={<Droplets className="w-6 h-6 text-blue-500" />}
                  />
                  <WeatherCard
                    label={t('label_rain_chance')}
                    value={weather.rain}
                    icon={<CloudRain className="w-6 h-6 text-sky-500" />}
                  />
                  <WeatherCard
                    label={t('label_wind_speed')}
                    value={weather.wind}
                    icon={<Wind className="w-6 h-6 text-gray-500" />}
                  />
                </div>

                {/* ------------------ SUGGESTIONS ------------------ */}
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-6 h-6 text-farm-700" />
                    <h3 className="text-xl font-bold text-farm-900">
                      {t('smart_suggestions')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {suggestions.map((s, i) => {
                      const IconComponent = s.icon;
                      return (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className={`${getSuggestionBg(
                            s.type
                          )} rounded-2xl p-4 border-2 shadow-lg hover:shadow-xl`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 bg-gradient-to-r ${getSuggestionColor(
                                s.type
                              )} rounded-xl flex items-center justify-center shadow-lg`}
                            >
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-sm font-semibold text-farm-800 leading-relaxed">
                              {s.text}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* ------------------ 7 DAY FORECAST (ADVANCED) ------------------ */}
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-farm-700" />
                    <h3 className="text-xl font-bold text-farm-900">
                      {t('seven_day_forecast')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {weather.forecast.map((f, i) => {
                      // Recreate icon from type
                      const icon = f.iconType === "rain" ? (
                        <FaCloudRain className="text-blue-400 text-2xl" />
                      ) : f.iconType === "cloud" ? (
                        <FaCloud className="text-gray-400 text-2xl" />
                      ) : (
                        <FaSun className="text-yellow-400 text-2xl" />
                      );

                      const dayLabel = f.labelKey ? t(f.labelKey) : formatDate(f.dateString);

                      return (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className={`flex flex-col items-center rounded-xl p-4 shadow-lg transition-all border-2 ${parseInt(f.rain) >= 70
                            ? "bg-blue-100 border-blue-300 dark:bg-[#0a0a0a] dark:border-none"
                            : parseInt(f.rain) >= 40
                              ? "bg-gray-100 border-gray-300 dark:bg-[#0a0a0a] dark:border-none"
                              : "bg-yellow-100 border-yellow-300 dark:bg-[#0a0a0a] dark:border-none"
                            }`}
                        >
                          <div className="font-semibold text-farm-700 mb-2 text-sm dark:text-gray-200">
                            {dayLabel}
                          </div>
                          <div className="mb-2">{icon}</div>
                          <div className="text-farm-900 font-bold text-lg dark:text-gray-200">
                            {f.temp}
                          </div>
                          <div className="text-gray-600 text-xs mb-1">
                            {f.minTemp}
                          </div>
                          <div className="text-blue-600 text-xs font-medium mb-2">
                            {t('weather_rain')}: {f.rain}
                          </div>
                          <div className="text-xs text-farm-700 text-center leading-tight">
                            {t(f.tipKey)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* =================== SIMPLE VIEW =================== */
          <motion.div
            key="simple"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-xl shadow border border-green-100 p-4 mb-6 flex flex-col gap-3 dark:bg-none dark:bg-[#272727] dark:border-none">
              <div className="flex items-center gap-4 mb-2">
                <FaCloudSun className="text-5xl text-yellow-400" />
                <div>
                  <div className="text-4xl font-bold text-green-900 flex items-center gap-2 dark:text-gray-200">
                    {weather.temp}
                  </div>
                  <div className="text-green-700 text-lg font-semibold dark:text-gray-200">
                    {t(weather.conditionKey)}
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 mt-2 text-green-800 text-base">
                <div className="flex items-center gap-2 dark:text-gray-200">
                  <FaTint className="text-blue-400" /> {t('weather_rain')}: {weather.rain}
                </div>
                <div className="flex items-center gap-2 dark:text-gray-200">
                  <FaWind className="text-blue-600" /> {t('weather_wind')}: {weather.wind}
                </div>
                <div className="flex items-center gap-2 dark:text-gray-200">
                  <FaRegSun className="text-yellow-500" /> {t('weather_humidity')}:{" "}
                  {weather.humidity}
                </div>
              </div>

              {/* Sunrise / Sunset */}
              <div className="flex gap-6 mt-2 text-green-800 text-base">
                <div className="flex items-center gap-2 dark:text-gray-200">
                  <FaSun className="text-yellow-400" /> {t('weather_sunrise')}:{" "}
                  {weather.sunrise}
                </div>
                <div className="flex items-center gap-2 dark:text-gray-200">
                  <FaSun className="text-orange-500" /> {t('weather_sunset')}:{" "}
                  {weather.sunset}
                </div>
              </div>

              {/* Tip Box */}
              <div
                className={`flex items-center gap-2 mt-3 px-3 py-2 rounded font-medium ${weather.tip.type === "warning"
                  ? "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900"
                  : weather.tip.type === "good"
                    ? "bg-green-100 border-l-4 border-green-500 text-green-900"
                    : "bg-blue-50 border-l-4 border-blue-400 text-blue-900"
                  }`}
              >
                <FaLightbulb
                  className={
                    weather.tip.type === "warning"
                      ? "text-yellow-400"
                      : weather.tip.type === "good"
                        ? "text-green-500"
                        : "text-blue-400"
                  }
                />
                <span>{t(weather.tip.textKey)}</span>
              </div>

              {/* ============ FORECAST (SIMPLE VIEW) ============ */}
              <div className="bg-white rounded-xl shadow border border-green-100 p-4 flex flex-col gap-2 mt-4 dark:bg-[#0a0a0a] dark:border-none">
                <div className="text-green-800 font-semibold mb-3 text-lg">
                  {t('seven_day_forecast')}
                </div>

                {/* TOP 4 */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {weather.forecast.slice(0, 4).map((f, i) => {
                      // Recreate icon from type
                      const icon = f.iconType === "rain" ? (
                        <FaCloudRain className="text-blue-400 text-2xl" />
                      ) : f.iconType === "cloud" ? (
                        <FaCloud className="text-gray-400 text-2xl" />
                      ) : (
                        <FaSun className="text-yellow-400 text-2xl" />
                      );

                      const dayLabel = f.labelKey ? t(f.labelKey) : formatDate(f.dateString);

                      return (
                        <motion.div
                          key={`s-top-${i}`}
                          whileHover={{ scale: 1.05 }}
                          className={`flex flex-col items-center rounded-lg p-3 shadow transition-all ${parseInt(f.rain) >= 70
                            ? "bg-blue-100 border-2 border-blue-300 dark:bg-[#272727] dark:border-none"
                            : parseInt(f.rain) >= 40
                              ? "bg-gray-100 border-2 border-gray-300 dark:bg-[#272727] dark:border-none"
                              : "bg-yellow-100 border-2 border-yellow-300 dark:bg-[#272727] dark:border-none"
                            }`}
                        >
                          <div className="font-semibold text-green-700 mb-1 text-sm dark:text-gray-200">
                            {dayLabel}
                          </div>
                          <div className="text-3xl mb-1">{icon}</div>
                          <div className="text-green-900 font-bold mt-1 text-base dark:text-gray-200">
                            {f.temp}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {f.minTemp}
                          </div>
                          <div className="text-blue-600 text-xs font-medium mt-1">
                            {t('weather_rain')}: {f.rain}
                          </div>
                          <div className="text-xs text-green-700 mt-1 text-center leading-tight">
                            {t(f.tipKey)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* BOTTOM 3 */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center md:justify-items-start">
                    {weather.forecast.slice(4).map((f, i) => {
                      // Recreate icon from type
                      const icon = f.iconType === "rain" ? (
                        <FaCloudRain className="text-blue-400 text-2xl" />
                      ) : f.iconType === "cloud" ? (
                        <FaCloud className="text-gray-400 text-2xl" />
                      ) : (
                        <FaSun className="text-yellow-400 text-2xl" />
                      );

                      const dayLabel = f.labelKey ? t(f.labelKey) : formatDate(f.dateString);

                      return (
                        <motion.div
                          key={`s-bottom-${i}`}
                          whileHover={{ scale: 1.05 }}
                          className={`flex flex-col items-center rounded-lg p-3 shadow transition-all w-full sm:w-auto ${parseInt(f.rain) >= 70
                            ? "bg-blue-100 border-2 border-blue-300 dark:bg-[#272727] dark:border-none"
                            : parseInt(f.rain) >= 40
                              ? "bg-gray-100 border-2 border-gray-300 dark:bg-[#272727] dark:border-none"
                              : "bg-yellow-100 border-2 border-yellow-300 dark:bg-[#272727] dark:border-none"
                            }`}
                        >
                          <div className="font-semibold text-green-700 mb-1 text-sm dark:text-gray-200">
                            {dayLabel}
                          </div>
                          <div className="text-3xl mb-1">{icon}</div>
                          <div className="text-green-900 font-bold mt-1 text-base dark:text-gray-200">
                            {f.temp}
                          </div>
                          <div className="text-gray-600 text-xs">
                            {f.minTemp}
                          </div>
                          <div className="text-blue-600 text-xs font-medium mt-1">
                            {t('weather_rain')}: {f.rain}
                          </div>
                          <div className="text-xs text-green-700 mt-1 text-center leading-tight">
                            {t(f.tipKey)}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* REUSABLE WEATHER CARD */
function WeatherCard({ label, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/30 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg flex flex-col items-center justify-center text-center dark:bg-[#0a0a0a]"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-semibold text-farm-700 dark:text-gray-200">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold text-farm-900 dark:text-gray-200">{value}</div>
    </motion.div>
  );
}
