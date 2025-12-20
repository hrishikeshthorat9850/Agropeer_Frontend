"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWeather } from "@/Context/WeatherContext";
import useGeolocation from "@/hooks/useGeolocation";
import { useLogin } from "@/Context/logincontext";
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
  const { weather, loading: weatherLoading, getWeather, error: weatherError } = useWeather();
  const { position } = useGeolocation();
  const { user, loading: authLoading } = useLogin();
  const [activeTab, setActiveTab] = useState("crops");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
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

  // Weather fetch
  useEffect(() => {
    if (weatherLoading) return;
    if (!position) return;
    if (weatherFetched) return;
    if (weatherError && weatherError.includes("limit exceeded")) return;

    let isMounted = true;
    async function fetchWeather() {
      try {
        const data = await getWeather(position.latitude, position.longitude);
        if (isMounted && data) {
          setWeatherData(data);
          setWeatherFetched(true);
        }
      } catch (error) {
        if (error.message?.includes("limit exceeded")) {
          setWeatherFetched(true);
        }
      }
    }
    fetchWeather();
    return () => (isMounted = false);
  }, [position?.latitude, position?.longitude]);

  // Insights fetch
  useEffect(() => {
    if (authLoading) return;

    if (!user?.id) {
      setInsightsData(null);
      setInsightsError("Sign in to view your farm insights.");
      setInsightsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchInsights() {
      setInsightsLoading(true);
      setInsightsError(null);
      try {
        const response = await fetch(`${BASE_URL}/api/smart-farm/insights?farmerId=${user.id}`, {
          signal: controller.signal,
          cache: "no-store",
        });

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
  }, [user?.id, authLoading]);

  // Old nav visibility observer
  useEffect(() => {
    if (!oldNavRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBottomNav(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(oldNavRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCropSelect = (crop) => {
    setSelectedCrop(crop);
    setActiveTab("weather");
  };

  const tabs = [
    { id: "crops", name: "My Crops", icon: FaSeedling },
    { id: "weather", name: "Weather Guide", icon: FaCloudSun },
    { id: "irrigation", name: "Irrigation", icon: FaTint },
    { id: "pests", name: "Pest Control", icon: FaBug },
    { id: "schedule", name: "Schedule", icon: FaCalendarAlt },
    { id: "analytics", name: "Analytics", icon: FaChartLine },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "crops":
        return <CropProfileManager onSelectCrop={handleCropSelect} selectedCrop={selectedCrop} />;

      case "weather":
        return <PersonalizedWeatherGuide selectedCrop={selectedCrop} weatherData={weatherData || weather} />;

      case "irrigation":
        return <IrrigationTab selectedCrop={selectedCrop} data={insightsData?.irrigation} loading={insightsLoading} error={insightsError} />;

      case "pests":
        return <PestControlTab data={insightsData?.pests} loading={insightsLoading} error={insightsError} />;

      case "schedule":
        return <ScheduleTab data={insightsData?.schedule} loading={insightsLoading} error={insightsError} />;

      case "analytics":
        return <AnalyticsTab data={insightsData?.analytics} loading={insightsLoading} error={insightsError} />;

      default:
        return null;
    }
  };

  const cleanTemp =
    typeof weatherData?.temperature === "number" ? weatherData.temperature.toFixed(1) : "--";

  const rainChance =
    typeof weatherData?.forecast?.[0]?.rainChance === "number"
      ? weatherData.forecast[0].rainChance
      : "--";

  // UI Render
  return (
    <div className="min-h-[calc(100vh-122px)] pb-8">

      {/* HEADER */}
      <header className="bg-white/40 backdrop-blur-md border-b border-white/30 shadow-sm dark:bg-[#272727]">
        <div className="max-w-7xl mx-auto px-2 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-md">
              <FaHome className="w-6 h-6 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-farm-900">Farmer Dashboard</h1>
              <p className="text-farm-700 text-sm">Personalized farming guidance & weather insights</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-6">

            <div className="text-center">
              <div className="text-2xl font-bold text-green-900 dark:text-white">
                {insightsData?.meta?.totalCrops ?? "--"}
              </div>
              <div className="text-sm text-green-900 dark:text-white">Active Crops</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-900 dark:text-white">{cleanTemp}°C</div>
              <div className="text-sm text-green-900 dark:text-white">Current Temp</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-900 dark:text-white">{rainChance}%</div>
              <div className="text-sm text-green-900 dark:text-white">Rain Chance</div>
            </div>

          </div>
        </div>
      </header>

      {/* HIDDEN NAV FOR OBSERVER */}
      <nav ref={oldNavRef} className="hidden"></nav>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-2 py-8 flex flex-col lg:flex-row gap-8">

        {/* Sidebar */}
        <aside className="hidden lg:block lg:w-64 flex-shrink-0">
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-4 border border-white/30 shadow-md dark:bg-[#272727]">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition 
                    ${activeTab === tab.id ? "bg-green-600 text-white shadow-md" : "text-farm-700 hover:bg-farm-100"}
                  `}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.name}
                </button>
              ))}
            </nav>

            {selectedCrop && (
              <div className="mt-6 p-4 bg-farm-100 rounded-xl shadow-inner dark:bg-[#0a0a0a]">
                <h4 className="font-semibold mb-2 text-green-900">Selected Crop</h4>
                <div className="flex items-center">
                  <span className="text-2xl text-farm-600">{selectedCrop?.crop_info?.icon}</span>
                  <div>
                    <div className="font-medium text-farm-600">{selectedCrop?.crop_info?.name}</div>
                    <div className="text-sm text-farm-600">{selectedCrop?.growth_stage?.stage}</div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCrop(null)}
                  className="mt-2 text-xs underline text-farm-700"
                >
                  Change Crop
                </button>
              </div>
            )}

          </div>
        </aside>

        {/* TAB CONTENT */}
        <section className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.35 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </section>

      </main>

      {/** ⭐⭐⭐ PREMIUM FLOATING ACTION BUTTON (+) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFabOpen((p) => !p);
        }}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-farm-700 text-white flex items-center justify-center text-3xl shadow-xl hover:bg-farm-800 transition z-[90] lg:hidden"
      >
        {fabOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/** ⭐⭐⭐ PREMIUM FAB POPUP MENU */}
      <AnimatePresence>
        {fabOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed bottom-44 right-6 bg-white shadow-2xl rounded-2xl w-56 p-4 border border-gray-200 z-[89] dark:bg-gray-900"
          >
            <div className="flex flex-col gap-3">

              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setFabOpen(false);
                  }}
                  className={`flex items-center gap-3 p-3 rounded-xl border 
                    ${activeTab === tab.id
                      ? "bg-farm-600 text-white border-farm-700"
                      : "bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100"}
                  `}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.name}
                </motion.button>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default FarmerDashboard;
