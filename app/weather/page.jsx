"use client";
import React, { useState, useEffect } from "react";
import WeatherForecast from "@/components/Weather";
import PersonalizedWeatherGuide from "@/components/PersonalizedWeatherGuide";
import { motion, AnimatePresence } from "framer-motion";
import { FaSeedling, FaToggleOn, FaToggleOff } from "react-icons/fa";

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
    <div className="min-h-[calc(100vh-122px)] py-10">
      <div className="max-w-7xl mx-auto px-2">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-farm-900 mb-4">
            Weather & Crop Guidance
          </h1>
          <p className="text-lg text-farm-700 mb-6">
            Get personalized weather insights and farming recommendations
          </p>
          
          {/* Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPersonalized(!showPersonalized)}
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mx-auto"
          >
            {showPersonalized ? <FaToggleOn className="w-5 h-5" /> : <FaToggleOff className="w-5 h-5" />}
            {showPersonalized ? "Hide Personalized Guide" : "Show Personalized Guide"}
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
          className="mt-12 text-center"
        >
          <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg max-w-2xl mx-auto dark:bg-[#272727]">
            <div className="w-16 h-16 bg-gradient-to-r from-farm-500 to-farm-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSeedling className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-farm-900 mb-2">
              Complete Farm Management
            </h3>
            <p className="text-farm-700 mb-6">
              Access the full farmer dashboard to manage crops, get personalized guidance, and track your farm's progress.
            </p>
            <motion.a
              href="/farmer-dashboard"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-farm-500 to-farm-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaSeedling className="w-5 h-5" />
              Open Farmer Dashboard
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
