"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "@/Context/WeatherContext";
import useGeolocation from "@/hooks/useGeolocation";
import { useLogin } from "@/Context/logincontext";
import { useLanguage } from "@/Context/languagecontext";
import {
  FaSeedling,
  FaCloudSun,
  FaTint,
  FaBug,
  FaCalendarAlt,
  FaChartLine,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import CropProfileManager from "./CropProfileManager";
import PersonalizedWeatherGuide from "./PersonalizedWeatherGuide";
import IrrigationTab from "./farmer-dashboard/IrrigationTab";
import AnalyticsTab from "./farmer-dashboard/AnalyticsTab";
import PestControlTab from "./farmer-dashboard/PestControlTab";
import ScheduleTab from "./farmer-dashboard/ScheduleTab";

const FarmerDashboard = () => {
  const { t, locale } = useLanguage();
  const {
    weather,
    loading: weatherLoading,
    getWeather,
    error: weatherError,
  } = useWeather();
  const { position } = useGeolocation();
  const { user, loading: authLoading, accessToken, session } = useLogin();
  const [activeTab, setActiveTab] = useState("crops");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [insightsData, setInsightsData] = useState(null);
  const [insightsLoading, setInsightsLoading] = useState(false);
  const [insightsError, setInsightsError] = useState(null);
  const [weatherFetched, setWeatherFetched] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const oldNavRef = useRef(null);
  const [showBottomNav, setShowBottomNav] = useState(false);

  /** 🔥 PREMIUM FAB MENU UI */
  const [fabOpen, setFabOpen] = useState(false);

  // Close FAB when tapping outside
  useEffect(() => {
    function handleClick(e) {
      if (!fabOpen) return;
      setFabOpen(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [fabOpen]);

  // ✅ Refactored to use global weather context directly (like MobileHome)
  useEffect(() => {
    if (!position?.latitude || !position?.longitude) return;
    // Only fetch if we don't have weather data yet
    if (!weather && !weatherLoading) {
      getWeather(position.latitude, position.longitude);
    }
  }, [position, weather, weatherLoading, getWeather]);

  // Insights fetch
  useEffect(() => {
    if (authLoading) return;

    if (!user?.id) {
      setInsightsData(null);
      setInsightsError(t("signin_insight_error"));
      setInsightsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchInsights() {
      setInsightsLoading(true);
      setInsightsError(null);
      try {
        const params = new URLSearchParams({ farmerId: user.id });
        if (position?.latitude != null && position?.longitude != null) {
          params.set("latitude", position.latitude);
          params.set("longitude", position.longitude);
        }
        params.set("language", locale || "en");
        params.set("summary", "1");

        const response = await fetch(
          `${BASE_URL}/api/smart-farm/insights?${params.toString()}`,
          {
            signal: controller.signal,
            cache: "no-store",
            headers: {
              ...(accessToken
                ? { Authorization: `Bearer ${accessToken}` }
                : {}),
            },
          },
        );

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.error || "Failed to load dashboard data");
        }

        const data = await response.json();
        setInsightsData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setInsightsError(error.message);
          setInsightsData(null);
        }
      } finally {
        setInsightsLoading(false);
      }
    }

    fetchInsights();
    return () => controller.abort();
  }, [user?.id, authLoading, position?.latitude, position?.longitude]);

  // Old nav visibility observer
  useEffect(() => {
    if (!oldNavRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBottomNav(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(oldNavRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    setActiveTab("weather");
  };

  const tabs = [
    { id: "crops", name: t("tab_my_crops"), icon: FaSeedling },
    { id: "weather", name: t("tab_weather"), icon: FaCloudSun },
    { id: "irrigation", name: t("tab_irrigation"), icon: FaTint },
    { id: "pests", name: t("tab_pest_control"), icon: FaBug },
    { id: "schedule", name: t("tab_schedule"), icon: FaCalendarAlt },
    { id: "analytics", name: t("tab_analytics"), icon: FaChartLine },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "crops":
        return (
          <CropProfileManager
            onSelectCrop={handleCropSelect}
            selectedCrop={selectedCrop}
          />
        );

      case "weather":
        return (
          <PersonalizedWeatherGuide
            selectedCrop={selectedCrop}
            weatherData={weather}
          />
        );

      case "irrigation":
        return (
          <IrrigationTab
            selectedCrop={selectedCrop}
            data={insightsData?.irrigation}
            loading={insightsLoading}
            error={insightsError}
          />
        );

      case "pests":
        return (
          <PestControlTab
            data={insightsData?.pests}
            loading={insightsLoading}
            error={insightsError}
          />
        );

      case "schedule":
        return (
          <ScheduleTab
            data={insightsData?.schedule}
            loading={insightsLoading}
            error={insightsError}
          />
        );

      case "analytics":
        return (
          <AnalyticsTab
            data={insightsData?.analytics}
            loading={insightsLoading}
            error={insightsError}
          />
        );

      default:
        return null;
    }
  };

  const cleanTemp =
    typeof weather?.temperature === "number"
      ? weather.temperature.toFixed(1)
      : "--";

  const rainChance =
    typeof weather?.forecast?.[0]?.rainChance === "number"
      ? weather.forecast[0].rainChance
      : "--";

  // UI Render
  return (
    <div className="bg-gray-50 dark:bg-black font-sans">
      {/* 📱 STICKY APP BAR (Header + Quick Stats) */}
      {/* 📱 STICKY APP BAR (Header Only) */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md border-b border-gray-100 dark:border-white/5 shadow-sm h-[60px] flex items-center">
        <div className="max-w-lg mx-auto px-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <FaHome className="text-lg" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold text-gray-900 dark:text-white leading-tight">
                  {t("dashboard_title")}
                </h1>
                <p className="text-[14px] font-medium text-gray-500 dark:text-gray-400 leading-none">
                  {t("dashboard_subtitle")}
                </p>
              </div>
            </div>

            {/* Notification / Profile Icon Placeholder if needed, or keep clean */}
          </div>
        </div>
      </header>

      {/* Quick Stats Row - MOVED OUT OF STICKY HEADER TO SCROLL */}
      <div className="bg-gray-50 dark:bg-black pt-3 pb-3">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-between bg-white dark:bg-[#1e1e1e] rounded-xl p-2.5 border border-gray-100 dark:border-[#333] shadow-sm">
            <div className="text-center px-2 border-r border-gray-200 dark:border-gray-700 w-1/3">
              <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">
                {t("active_crops")}
              </span>
              <span className="text-base font-black text-gray-900 dark:text-white">
                {insightsData?.meta?.totalCrops ?? "--"}
              </span>
            </div>
            <div className="text-center px-2 border-r border-gray-200 dark:border-gray-700 w-1/3">
              <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">
                {t("current_temp")}
              </span>
              <span className="text-base font-black text-gray-900 dark:text-white">
                {cleanTemp}°C
              </span>
            </div>
            <div className="text-center px-2 w-1/3">
              <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">
                {t("rain_chance")}
              </span>
              <span className="text-base font-black text-sky-500 dark:text-sky-400">
                {rainChance}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Daily Summary (weather + insights) */}
      {insightsData?.dailySummary && (
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/30 rounded-xl p-4">
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100 leading-relaxed">
              {insightsData.dailySummary}
            </p>
          </div>
        </div>
      )}

      {/* 📱 STICKY TABS */}
      <div className="sticky top-mobile-navbar-height z-40 bg-gray-50 dark:bg-black pb-2">
        <div className="max-w-lg mx-auto px-4">
          {/* Tabs Container with proper background to mask content behind */}
          <div className="bg-white dark:bg-[#121212] border border-gray-100 dark:border-[#333] rounded-2xl p-1 shadow-sm">
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap border ${
                      isActive
                        ? "bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-sm"
                        : "bg-transparent text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-[#1e1e1e]"
                    }`}
                  >
                    <tab.icon
                      className={
                        isActive
                          ? "text-white dark:text-black"
                          : "text-gray-500 dark:text-gray-500"
                      }
                    />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FEED CONTENT */}
      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Selected Crop Banner (if any) */}
        {selectedCrop && (
          <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-800/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {selectedCrop?.crop_info?.icon || "🌱"}
              </span>
              <div>
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100 leading-tight">
                  {selectedCrop?.crop_info?.name}
                </h3>
                <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
                  {selectedCrop?.growth_stage?.stage}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCrop(null)}
              className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-black/20 px-2 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/30"
            >
              {t("change_crop")}
            </button>
          </div>
        )}

        {/* Tab Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* HIDDEN NAV FOR OBSERVER (Legacy) */}
      <nav ref={oldNavRef} className="hidden"></nav>
    </div>
  );
};

export default FarmerDashboard;
