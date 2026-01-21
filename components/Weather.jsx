"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
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
import { useLocation, LOCATION } from "./mobile/hooks/useLocation";
import { openAppSettings } from "./mobile/utils/openAppSettings";

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



  const onLocationSuccess = useCallback(
    (lat, lng) => {
      fetchWeatherApi(lat, lng);
    },
    []
  );

  const { status, retry } = useLocation(onLocationSuccess);

  // Cache key based on location
  const getCacheKey = (lat, lng) =>
    `weather_${lat.toFixed(2)}_${lng.toFixed(2)}`;

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
            Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
          );

          const forecastDateUTC = new Date(Date.UTC(year, month - 1, dayNum));

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
          const iconType =
            day.rainChance > 60
              ? "rain"
              : day.rainChance > 30
                ? "cloud"
                : "sun";

          const tipKey =
            day.rainChance > 60
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
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: weatherdata,
            timestamp: Date.now(),
          })
        );
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
    const locale =
      currentLanguage === "hi"
        ? "hi-IN"
        : currentLanguage === "mr"
          ? "mr-IN"
          : "en-US";
    return date.toLocaleDateString(locale, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Render loading/error states or the main UI
  if (!weather) {
    return (
      <div className="w-full max-w-6xl mx-auto mt-8 px-4 text-center">
        {/* Location Status Controls for missing weather/location */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]">
          {status === LOCATION.LOADING && (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-farm-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500">{t('loading_location') || "Locating..."}</p>
            </div>
          )}

          {status === LOCATION.DENIED && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-red-500 font-medium">Location access is required for local weather.</p>
              <button
                onClick={retry}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-red-200"
              >
                Enable Location
              </button>
            </div>
          )}

          {status === LOCATION.GPS_OFF && (
            <div className="flex flex-col items-center gap-3">
              <p className="text-orange-500 font-medium">Please turn on your GPS.</p>
              <button
                onClick={openAppSettings}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-colors shadow-lg shadow-orange-200"
              >
                Turn On GPS
              </button>
            </div>
          )}

          {!loading && !error && !weather && status !== LOCATION.LOADING && status !== LOCATION.DENIED && status !== LOCATION.GPS_OFF && (
            <p className="text-gray-400">{t('loading_weather')}</p>
          )}

          {error && status !== LOCATION.DENIED && status !== LOCATION.GPS_OFF && (
            <p className="text-red-500">{error.message}</p>
          )}
        </div>
      </div>
    );
  }

  const suggestions = [
    {
      text: t(weather.tip.textKey),
      icon: AlertTriangle,
      type: weather.tip.type,
    },
    { text: t("suggestion_optimal_temp"), icon: Sun, type: "success" },
    { text: t("suggestion_monitor_moisture"), icon: Droplets, type: "info" },
    { text: t("suggestion_wind_favorable"), icon: Wind, type: "success" },
    { text: t("suggestion_irrigation_timing"), icon: Gauge, type: "info" },
  ];

  const getSuggestionColor = (type) => {
    const colorMap = {
      warning: "from-orange-400 to-red-500 dark:bg-[#0a0a0a] dark:border-none",
      success:
        "from-green-400 to-emerald-500 dark:bg-[#0a0a0a] dark:border-none",
      info: "from-blue-400 to-sky-500 dark:bg-[#0a0a0a] dark:border-none",
      good: "from-green-400 to-emerald-500 dark:bg-[#0a0a0a] dark:border-none",
    };
    return (
      colorMap[type] ||
      "from-gray-400 to-slate-500 dark:bg-[#0a0a0a] dark:border-none"
    );
  };

  const getSuggestionBg = (type) => {
    const bgMap = {
      warning:
        "bg-orange-50 border-orange-200 dark:bg-[#0a0a0a] dark:border-none",
      success:
        "bg-green-50 border-green-200 dark:bg-[#0a0a0a] dark:border-none",
      info: "bg-blue-50 border-blue-200 dark:bg-[#0a0a0a] dark:border-none",
      good: "bg-green-50 border-green-200 dark:bg-[#0a0a0a] dark:border-none",
    };
    return (
      bgMap[type] ||
      "bg-gray-50 border-gray-200 dark:bg-[#0a0a0a] dark:border-none"
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* TOGGLE BUTTON */}
      <div className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-3 px-6 py-3 bg-farm-600 dark:bg-farm-700 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 border border-transparent dark:border-farm-600"
        >
          {showAdvanced ? (
            <FaEyeSlash className="w-5 h-5" />
          ) : (
            <FaEye className="w-5 h-5" />
          )}
          {showAdvanced ? t("show_simple") : t("show_advanced")}
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
              className="relative overflow-hidden rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]
                bg-white
                dark:bg-[#1E1E1E]"
            >
              <div className="relative z-10 p-6">
                {/* Crop Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-farm-100 dark:bg-farm-900/20 rounded-2xl flex items-center justify-center shadow-sm dark:shadow-none">
                    <Wheat className="w-6 h-6 text-farm-600 dark:text-farm-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-farm-900 dark:text-white">
                      {t("crop_label")}: {cropName}
                    </h2>
                    <p className="text-farm-600 dark:text-gray-400 font-medium">
                      {cropStage}
                    </p>
                  </div>
                </div>

                {/* ------------------ WEATHER OVERVIEW ------------------ */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <WeatherCard
                    label={t("label_temperature")}
                    value={weather.temp}
                    icon={<Thermometer className="w-6 h-6 text-red-500" />}
                  />
                  <WeatherCard
                    label={t("label_humidity")}
                    value={weather.humidity}
                    icon={<Droplets className="w-6 h-6 text-blue-500" />}
                  />
                  <WeatherCard
                    label={t("label_rain_chance")}
                    value={weather.rain}
                    icon={<CloudRain className="w-6 h-6 text-sky-500" />}
                  />
                  <WeatherCard
                    label={t("label_wind_speed")}
                    value={weather.wind}
                    icon={<Wind className="w-6 h-6 text-gray-500" />}
                  />
                </div>

                {/* ------------------ SUGGESTIONS ------------------ */}
                <div className="mt-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Lightbulb className="w-6 h-6 text-farm-600 dark:text-farm-400" />
                    <h3 className="text-xl font-bold text-farm-900 dark:text-white">
                      {t("smart_suggestions")}
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
                          )} rounded-2xl p-4 border border-gray-100 dark:border-[#333] shadow-sm hover:shadow-md dark:bg-[#2C2C2C]`}
                        >
                          <div className="flex items-center gap-3 h-full">
                            <div
                              className={`w-10 h-10 flex-shrink-0 ${getSuggestionColor(
                                s.type
                              )} rounded-xl flex items-center justify-center shadow-sm`}
                            >
                              <IconComponent className="w-5 h-5 text-farm-700 dark:text-white" />
                            </div>
                            <p className="text-sm font-semibold text-farm-800 leading-tight dark:text-white">
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
                    <Calendar className="w-6 h-6 text-farm-600 dark:text-farm-400" />
                    <h3 className="text-xl font-bold text-farm-900 dark:text-white">
                      {t("seven_day_forecast")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {weather.forecast.map((f, i) => {
                      const isRainy = parseInt(f.rain) >= 40;
                      const isSunny =
                        !isRainy &&
                        (f.iconType === "sunny" ||
                          f.iconType === "partly-sunny");

                      // Recreate icon from type
                      const icon =
                        f.iconType === "rain" ? (
                          <FaCloudRain className="text-blue-500 text-3xl drop-shadow-sm" />
                        ) : f.iconType === "cloud" ? (
                          <FaCloud className="text-slate-400 text-3xl drop-shadow-sm" />
                        ) : (
                          <FaSun className="text-amber-400 text-3xl drop-shadow-md" />
                        );

                      const dayLabel = f.labelKey
                        ? t(f.labelKey)
                        : formatDate(f.dateString);

                      return (
                        <motion.div
                          key={i}
                          whileHover={{ y: -5 }}
                          className={`
                            relative overflow-hidden rounded-3xl p-4 flex flex-col items-center justify-between
                            transition-all duration-300 backdrop-blur-md border
                            ${isRainy
                              ? "bg-gradient-to-br from-blue-50/80 to-cyan-50/50 dark:from-blue-950/40 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                              : isSunny
                                ? "bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-950/40 dark:to-orange-900/20 border-amber-200/50 dark:border-amber-700/30"
                                : "bg-gradient-to-br from-slate-50/80 to-gray-50/50 dark:from-slate-900/40 dark:to-gray-800/20 border-slate-200/50 dark:border-slate-700/30"
                            }
                          `}
                        >
                          {/* Top Highlight Gloss */}
                          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                          <div className="z-10 flex flex-col items-center gap-3 w-full">
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                              {dayLabel}
                            </span>

                            <div className="py-2 transform transition-transform group-hover:scale-110">
                              {icon}
                            </div>

                            <div className="flex flex-col items-center">
                              <span className="text-2xl font-black text-gray-900 dark:text-white leading-none">
                                {f.temp}
                              </span>
                              <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500">
                                {f.minTemp}
                              </span>
                            </div>

                            {/* Rain / Tip Pill */}
                            <div
                              className={`
                              mt-1 px-3 py-1.5 rounded-full text-[10px] font-bold w-full text-center truncate
                              ${isRainy
                                  ? "bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                                  : "bg-black/5 text-gray-600 dark:bg-white/5 dark:text-gray-400"
                                }
                            `}
                            >
                              {isRainy ? `${f.rain}` : t(f.tipKey)}
                            </div>
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
            <div className="flex flex-col gap-6 mb-6">
              {/* Premium Weather Card */}
              <div className="relative overflow-hidden rounded-[2rem] shadow-lg border border-gray-100 dark:border-gray-800 group">
                <div className="absolute inset-0 bg-white dark:bg-[#1a1a1a]" />

                {/* Decorative circles - subtle for white bg */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none opacity-60" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-50 dark:bg-yellow-900/10 rounded-full blur-3xl pointer-events-none opacity-60" />

                <div className="relative z-10 px-6 py-6 text-gray-800 dark:text-white text-center">
                  {/* Main Temp & Icon - Centered */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-gray-50 dark:bg-white/5 backdrop-blur-md p-4 rounded-full mb-3 shadow-sm border border-gray-100 dark:border-white/10">
                      <FaCloudSun className="text-5xl text-yellow-500 dark:text-yellow-400 drop-shadow-sm" />
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-6xl font-black tracking-tight text-gray-900 dark:text-white">
                        {weather.temp}
                      </span>
                      <span className="text-lg font-medium text-gray-500 dark:text-emerald-400 tracking-wide mt-1">
                        {t(weather.conditionKey)}
                      </span>
                    </div>
                  </div>
                  {/* Integrated Location Controls in Simple View */}
                  <div className="flex items-center gap-2 mt-2">
                    {status === LOCATION.LOADING && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full animate-pulse text-gray-500">
                        Included Locating...
                      </span>
                    )}
                    {status === LOCATION.DENIED && (
                      <button
                        onClick={retry}
                        className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-full font-medium transition-colors"
                      >
                        Enable Location
                      </button>
                    )}
                    {status === LOCATION.GPS_OFF && (
                      <button
                        onClick={openAppSettings}
                        className="text-xs bg-orange-100 text-orange-600 hover:bg-orange-200 px-3 py-1 rounded-full font-medium transition-colors"
                      >
                        Turn On GPS
                      </button>
                    )}
                  </div>
                  {/* Integrated Location Controls in Simple View */}
                  <div className="flex items-center gap-2 mt-2">
                    {status === LOCATION.LOADING && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full animate-pulse text-gray-500">
                        Included Locating...
                      </span>
                    )}
                    {status === LOCATION.DENIED && (
                      <button
                        onClick={retry}
                        className="text-xs bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-full font-medium transition-colors"
                      >
                        Enable Location
                      </button>
                    )}
                    {status === LOCATION.GPS_OFF && (
                      <button
                        onClick={openAppSettings}
                        className="text-xs bg-orange-100 text-orange-600 hover:bg-orange-200 px-3 py-1 rounded-full font-medium transition-colors"
                      >
                        Turn On GPS
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <div className="w-px h-8 bg-gray-100 dark:bg-white/10" />
                <div className="flex flex-col items-center gap-1">
                  <FaRegSun className="text-orange-500 dark:text-orange-400 text-lg" />
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider">
                    {t("weather_humidity")}
                  </span>
                  <span className="text-base font-bold text-gray-700 dark:text-gray-200">
                    {weather.humidity}
                  </span>
                </div>
              </div>

              {/* Sunrise / Sunset Pill - Explicit Labels */}
              <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-3 flex justify-around items-center max-w-xs mx-auto border border-gray-100 dark:border-white/5">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FaSun className="text-yellow-500 text-xs" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      {t("weather_sunrise")}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-white">
                    {weather.sunrise}
                  </span>
                </div>

                <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />

                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FaSun className="text-orange-500 text-xs" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      {t("weather_sunset")}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-700 dark:text-white">
                    {weather.sunset}
                  </span>
                </div>
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
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 p-5 flex flex-col gap-3 mt-6">
              <div className="text-gray-800 dark:text-gray-200 font-bold mb-2 text-xl ml-1">
                {t("seven_day_forecast")}
              </div>

              {/* TOP 4 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {weather.forecast.slice(0, 4).map((f, i) => {
                  const isRainy = parseInt(f.rain) >= 40;
                  const isSunny =
                    !isRainy &&
                    (f.iconType === "sunny" || f.iconType === "partly-sunny");

                  // Recreate icon from type
                  const icon =
                    f.iconType === "rain" ? (
                      <FaCloudRain className="text-blue-500 text-3xl drop-shadow-sm" />
                    ) : f.iconType === "cloud" ? (
                      <FaCloud className="text-slate-400 text-3xl drop-shadow-sm" />
                    ) : (
                      <FaSun className="text-amber-400 text-3xl drop-shadow-md" />
                    );

                  const dayLabel = f.labelKey
                    ? t(f.labelKey)
                    : formatDate(f.dateString);

                  return (
                    <motion.div
                      key={`s-top-${i}`}
                      whileHover={{ y: -5 }}
                      className={`
                            relative overflow-hidden rounded-3xl p-3 flex flex-col items-center justify-between
                            transition-all duration-300 backdrop-blur-md border
                            ${isRainy
                          ? "bg-gradient-to-br from-blue-50/80 to-cyan-50/50 dark:from-blue-950/40 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                          : isSunny
                            ? "bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-950/40 dark:to-orange-900/20 border-amber-200/50 dark:border-amber-700/30"
                            : "bg-gradient-to-br from-slate-50/80 to-gray-50/50 dark:from-slate-900/40 dark:to-gray-800/20 border-slate-200/50 dark:border-slate-700/30"
                        }
                          `}
                    >
                      {/* Top Highlight Gloss */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                      <div className="z-10 flex flex-col items-center gap-2 w-full">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                          {dayLabel}
                        </span>

                        <div className="py-1 transform transition-transform group-hover:scale-110">
                          {icon}
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-xl font-black text-gray-900 dark:text-white leading-none">
                            {f.temp}
                          </span>
                          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
                            {f.minTemp}
                          </span>
                        </div>

                        {/* Rain / Tip Pill */}
                        <div
                          className={`
                              mt-1 px-2 py-1 rounded-full text-[9px] font-bold w-full text-center truncate
                              ${isRainy
                              ? "bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-black/5 text-gray-600 dark:bg-white/5 dark:text-gray-400"
                            }
                            `}
                        >
                          {isRainy ? `${f.rain}` : t(f.tipKey)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* BOTTOM 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 justify-items-center md:justify-items-start">
                {weather.forecast.slice(4).map((f, i) => {
                  const isRainy = parseInt(f.rain) >= 40;
                  const isSunny =
                    !isRainy &&
                    (f.iconType === "sunny" || f.iconType === "partly-sunny");

                  // Recreate icon from type
                  const icon =
                    f.iconType === "rain" ? (
                      <FaCloudRain className="text-blue-500 text-3xl drop-shadow-sm" />
                    ) : f.iconType === "cloud" ? (
                      <FaCloud className="text-slate-400 text-3xl drop-shadow-sm" />
                    ) : (
                      <FaSun className="text-amber-400 text-3xl drop-shadow-md" />
                    );

                  const dayLabel = f.labelKey
                    ? t(f.labelKey)
                    : formatDate(f.dateString);

                  return (
                    <motion.div
                      key={`s-bottom-${i}`}
                      whileHover={{ y: -5 }}
                      className={`
                            relative overflow-hidden rounded-3xl p-3 flex flex-col items-center justify-between
                            transition-all duration-300 backdrop-blur-md border w-full sm:w-auto
                            ${isRainy
                          ? "bg-gradient-to-br from-blue-50/80 to-cyan-50/50 dark:from-blue-950/40 dark:to-cyan-900/20 border-blue-200/50 dark:border-blue-700/30"
                          : isSunny
                            ? "bg-gradient-to-br from-amber-50/80 to-orange-50/50 dark:from-amber-950/40 dark:to-orange-900/20 border-amber-200/50 dark:border-amber-700/30"
                            : "bg-gradient-to-br from-slate-50/80 to-gray-50/50 dark:from-slate-900/40 dark:to-gray-800/20 border-slate-200/50 dark:border-slate-700/30"
                        }
                          `}
                    >
                      {/* Top Highlight Gloss */}
                      <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

                      <div className="z-10 flex flex-col items-center gap-2 w-full">
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                          {dayLabel}
                        </span>

                        <div className="py-1 transform transition-transform group-hover:scale-110">
                          {icon}
                        </div>

                        <div className="flex flex-col items-center">
                          <span className="text-xl font-black text-gray-900 dark:text-white leading-none">
                            {f.temp}
                          </span>
                          <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500">
                            {f.minTemp}
                          </span>
                        </div>

                        {/* Rain / Tip Pill */}
                        <div
                          className={`
                              mt-1 px-2 py-1 rounded-full text-[9px] font-bold w-full text-center truncate
                              ${isRainy
                              ? "bg-blue-100/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-black/5 text-gray-600 dark:bg-white/5 dark:text-gray-400"
                            }
                            `}
                        >
                          {isRainy ? `${f.rain}` : t(f.tipKey)}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
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
      className="bg-gray-50 dark:bg-[#2C2C2C] rounded-2xl p-4 border border-gray-100 dark:border-[#333] shadow-sm flex flex-col items-center justify-center text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        {icon}
        <span className="text-sm font-semibold text-farm-600 dark:text-gray-400">
          {label}
        </span>
      </div>
      <div className="text-2xl font-bold text-farm-900 dark:text-white">
        {value}
      </div>
    </motion.div>
  );
}
