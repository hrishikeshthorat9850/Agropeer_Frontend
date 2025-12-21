"use client";
import React, { useState, useEffect } from "react";
import WeatherForecast from "@/components/Weather";
import PersonalizedWeatherGuide from "@/components/PersonalizedWeatherGuide";
import { motion, AnimatePresence } from "framer-motion";
import { FaSeedling, FaToggleOn, FaToggleOff } from "react-icons/fa";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function WeatherPage() {
  const [showPersonalized, setShowPersonalized] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Load selected crop from localStorage
  useEffect(() => {
    const savedCrop = localStorage.getItem("selectedCrop");
    if (savedCrop) {
      setSelectedCrop(JSON.parse(savedCrop));
    }
  }, []);


  return (
    <MobilePageContainer>
      <div className="py-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-farm-900 dark:text-white mb-3">
            Weather & Crop Guidance
          </h1>
          <p className="text-base md:text-lg text-farm-700 dark:text-gray-300 mb-6">
            Get personalized weather insights and farming recommendations
          </p>
          
          {/* Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPersonalized(!showPersonalized)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mx-auto active:scale-95"
          >
            {showPersonalized ? <FaToggleOn className="w-5 h-5" /> : <FaToggleOff className="w-5 h-5" />}
            <span className="text-sm md:text-base">
              {showPersonalized ? "Hide Personalized Guide" : "Show Personalized Guide"}
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
                weatherData={weatherData}
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
              Complete Farm Management
            </h3>
            <p className="text-sm md:text-base text-farm-700 dark:text-gray-300 mb-6">
              Access the full farmer dashboard to manage crops, get personalized guidance, and track your farm's progress.
            </p>
            <motion.a
              href="/farmer-dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
            >
              <FaSeedling className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Open Farmer Dashboard</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </MobilePageContainer>
  );
}
