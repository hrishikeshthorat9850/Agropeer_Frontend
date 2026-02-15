"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import WeatherForecast from "@/components/Weather";
import PersonalizedWeatherGuide from "@/components/PersonalizedWeatherGuide";
import { motion, AnimatePresence } from "framer-motion";
import { FaSeedling, FaToggleOn, FaToggleOff } from "react-icons/fa";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { useWeather } from "@/Context/WeatherContext";
import useGeolocation from "@/hooks/useGeolocation";
import { useLanguage } from "@/Context/languagecontext";
import { useLocation, LOCATION } from "@/components/mobile/hooks/useLocation";
import { openAppSettings } from "@/components/mobile/utils/openAppSettings";
import WeatherSkeleton from "@/components/skeletons/WeatherSkeleton"; // Added Skeleton

export default function WeatherPage() {
  const {
    weather,
    loading: weatherLoading,
    getWeather,
    error: weatherError,
  } = useWeather();
  const { position } = useGeolocation();
  const { t } = useLanguage();
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  useEffect(() => {
    if (!position?.latitude || !position?.longitude) return;
    // Only fetch if we don't have weather data yet
    if (!weather && !weatherLoading) {
      getWeather(position.latitude, position.longitude);
    }
  }, [position, weather, weatherLoading, getWeather]);

  // ✅ memoized success handler
  const onLocationSuccess = useCallback(
    (lat, lng) => {
      getWeather(lat, lng);
    },
    [getWeather],
  );

  const { status, retry } = useLocation(onLocationSuccess);

  const cleanTemp =
    typeof weather?.temperature === "number"
      ? weather.temperature.toFixed(0)
      : "--";

  const rainChance =
    typeof weather?.forecast?.[0]?.rainChance === "number"
      ? weather.forecast[0].rainChance
      : "--";

  const humidity =
    typeof weather?.humidity === "number" ? weather?.humidity : "--";

  const windSpeed =
    typeof weather?.windspeed === "number"
      ? weather?.windspeed?.toFixed(0)
      : "--";
  // Load selected crop from localStorage
  useEffect(() => {
    const savedCrop = localStorage.getItem("selectedCrop");
    if (savedCrop) {
      setSelectedCrop(JSON.parse(savedCrop));
    }
  }, []);

  return (
    <>
      {weatherLoading && !weather ? (
        <WeatherSkeleton />
      ) : (
        <MobilePageContainer>
          <div className="py-6">
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-farm-900 dark:text-white mb-3">
                {t("weather_page_title")}
              </h1>
              <p className="text-base md:text-lg text-farm-700 dark:text-gray-300 mb-6">
                {t("weather_page_subtitle")}
              </p>
              {/* <div className="flex items-center gap-2">
            {status === LOCATION.LOADING && (
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full animate-pulse">
                Locating...
              </span>
            )}
            {status === LOCATION.DENIED && (
              <button
                onClick={retry}
                className="text-xs bg-red-500/90 hover:bg-red-500 px-3 py-1 rounded-full text-white font-medium transition-colors"
              >
                Enable Location
              </button>
            )}
            {status === LOCATION.GPS_OFF && (
              <button
                onClick={openAppSettings}
                className="text-xs bg-orange-500/90 hover:bg-orange-500 px-3 py-1 rounded-full text-white font-medium transition-colors"
              >
                Turn On GPS
              </button>
            )}
            {!weatherLoading && !weatherError && (
              <div className="w-0 h-0 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
            )}
          </div> */}
              {/* Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPersonalized(!showPersonalized)}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mx-auto active:scale-95"
              >
                {showPersonalized ? (
                  <FaToggleOn className="w-5 h-5" />
                ) : (
                  <FaToggleOff className="w-5 h-5" />
                )}
                <span className="text-sm md:text-base">
                  {showPersonalized
                    ? t("hide_personalized_guide")
                    : t("show_personalized_guide")}
                </span>
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {showPersonalized ? (
                <motion.div
                  key="personalized"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <PersonalizedWeatherGuide
                    selectedCrop={selectedCrop}
                    weatherData={weather}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="basic"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <WeatherForecast />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Access to Farmer Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg max-w-2xl mx-auto dark:bg-[#272727]">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-farm-500 to-farm-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSeedling className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-farm-900 dark:text-white mb-2">
                  {t("complete_farm_management")}
                </h3>
                <p className="text-sm md:text-base text-farm-700 dark:text-gray-300 mb-6">
                  {t("farm_management_desc")}
                </p>
                <Link href="/farmer-dashboard" passHref legacyBehavior>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
                  >
                    <FaSeedling className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="text-sm md:text-base">
                      {t("open_farmer_dashboard")}
                    </span>
                  </motion.a>
                </Link>
              </div>
            </motion.div>
          </div>
        </MobilePageContainer>
      )}
    </>
  );
}
