"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, LOCATION } from "./hooks/useLocation";
import useGeolocation from "@/hooks/useGeolocation";
import {
  FaLeaf,
  FaTractor,
  FaImages,
  FaCloudSun,
  FaNewspaper,
  FaBullhorn,
  FaGlobe,
  FaVideo,
  FaUserClock
} from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useWeather } from "@/Context/WeatherContext";
import { openAppSettings } from "./utils/openAppSettings";
import HomeBanner from "./HomeBanner";

export default function MobileHome() {
  const { weather, loading: weatherLoading, getWeather, error: weatherError } = useWeather();
  const { position } = useGeolocation();
  /* Scroll logic removed for performance */
  // ✅ Refactored to use global weather context directly (like MobileHome)
  useEffect(() => {
    if (!position?.latitude || !position?.longitude) return;
    // Only fetch if we don't have weather data yet
    if (!weather && !weatherLoading) {
      getWeather(position.latitude, position.longitude);
    }
  }, [position, weather, weatherLoading, getWeather]);

  // ✅ memoized success handler
  const onLocationSuccess = useCallback((lat, lng) => {
    getWeather(lat, lng);
  }, [getWeather]);

  const { status, retry } = useLocation(onLocationSuccess);

  const cleanTemp =
    typeof weather?.temperature === "number" ? weather.temperature.toFixed(1) : "--";

  const rainChance =
    typeof weather?.forecast?.[0]?.rainChance === "number"
      ? weather.forecast[0].rainChance
      : "--";

  const humidity = typeof weather?.humidity === "number" ? weather?.humidity : "--";

  const windSpeed = typeof weather?.windspeed === "number" ? weather?.windspeed?.toFixed(1) : "--";

  return (
    <div className="md:hidden pb-1 min-h-screen bg-[#FAF7F2] dark:bg-[#0d0d0d] relative">

      {/* ================================================================= */}
      {/*                        TOP HEADER SECTION                         */}
      {/* ================================================================= */}

      {/* ================= TOP HEADER + FLOATING CARD ================= */}
      {/* ================= TOP HEADER ================= */}
      <div className="relative w-full z-10 pt-4 px-4 pb-2">
        <HomeBanner />
      </div>

      {/* 🔑 SPACER — REQUIRED */}
      {/* Spacer and HomeBanner removed (integrated above) */}

      {/* =============================================================== */}
      {/*                        PREMIUM WEATHER CARD                     */}
      {/* =============================================================== */}

      <div className="mt-6 px-4">
        <div className="
          relative overflow-hidden 
          rounded-[32px]
          p-5
          bg-mesh-sky dark:bg-sky-900
          border border-sky-200 dark:border-sky-800
          shadow-elevation-1
        ">

          {/* Blur circle removed */}

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              Today’s Weather
            </h2>
            {status === LOCATION.LOADING && <p>Detecting location…</p>}

            {status === LOCATION.DENIED && (
              <button onClick={retry} className="px-4 py-2 bg-red-600 text-white rounded-full">
                Allow Location
              </button>
            )}

            {status === LOCATION.GPS_OFF && (
              <button
                onClick={openAppSettings}
                className="px-4 py-2 bg-orange-600 text-white rounded-full"
              >
                Turn on Location
              </button>
            )}
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 animate-pulse">
                <svg viewBox="0 0 24 24" fill="none" stroke="orange" strokeWidth="1.4">
                  <circle cx="12" cy="12" r="5" fill="orange" stroke="orange" />
                  <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                </svg>
              </div>
            </div>
          </div>

          {/* MAIN WEATHER INFO */}
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-white">
                {cleanTemp}°C
              </h3>
            </div>

            <div className="text-right">
              <p className="text-[13px] text-slate-600 dark:text-slate-300">
                Humidity: {humidity}%
              </p>
              <p className="text-[13px] text-slate-600 dark:text-slate-300">
                Rain Chance:
                {rainChance}
              </p>
              <p className="text-[13px] text-slate-600 dark:text-slate-300">
                WindSpeed: {windSpeed} km/h
              </p>
            </div>
          </div>

          <Link
            href="/weather"
            className="
              inline-block mt-5 mx-auto
              bg-gradient-to-r from-blue-600 to-blue-500 
              text-white 
              px-5 py-2 rounded-full 
              shadow-lg 
              active:scale-95 
              font-semibold
            "
          >
            View 7-Day Forecast →
          </Link>
        </div>
      </div>

      {/* ================================================================= */}
      {/*                    MODERN WELCOME HERO SECTION                    */}
      {/* ================================================================= */}

      <div className="relative mt-8 px-4 sm:px-6 lg:px-8">
        {/* BACKGROUND DECORATIVE ELEMENTS */}
        {/* BACKGROUND DECORATIVE ELEMENTS */}
        <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-mesh-farm dark:bg-none opacity-60" />

        {/* MAIN WELCOME CONTENT */}
        <div className="relative z-10 text-center py-8 sm:py-12 lg:py-16">
          {/* ANIMATED ICON */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-2xl animate-bounce">
                <span className="text-2xl sm:text-3xl lg:text-4xl">🌱</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* GRADIENT TITLE */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 animate-fadeInUp">
            <span className="text-3xl bg-gradient-to-r from-green-600 via-green-500 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:via-green-300 dark:to-blue-400">
              Welcome to
            </span>&nbsp;
            <span className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-green-400 animate-pulse">
              AgroPeer
            </span>
            <span className="text-2xl sm:text-3xl lg:text-4xl ml-2 animate-bounce">🚀</span>
          </h1>

          {/* ENHANCED DESCRIPTION */}
          <div className="max-w-2xl mx-auto">
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 sm:mb-8 lg:mb-10 animate-fadeInUp animation-delay-200">
              🌾 <strong>Connect, share and grow</strong> with fellow farmers worldwide
              <br className="hidden sm:block" />
              — explore <span className="text-green-600 dark:text-green-400 font-semibold">AI-powered tools</span> and insights
            </p>
          </div>

          {/* DECORATIVE LINE */}
          <div className="flex justify-center items-center gap-4 animate-fadeInUp animation-delay-600">
            <div className="w-8 sm:w-12 lg:w-16 h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent" />
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="w-4 sm:w-6 lg:w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
            <div className="w-6 sm:w-8 lg:w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/*                        FEATURE GRID (10)                         */}
      {/* ================================================================= */}

      <div className="mt-4 px-4 space-y-4">
        <FeatureGrid />
      </div>

      {/* ================================================================= */}
      {/*                        RECENT POSTS (PREMIUM)                    */}
      {/* ================================================================= */}

      <div className="mt-6 px-4">
        <div className="
          bg-surface-50 dark:bg-surface-900
          rounded-[24px] p-5
          border border-surface-200 dark:border-surface-800
          shadow-elevation-1
        ">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-xl 
                bg-farm-100 dark:bg-farm-900
                flex items-center justify-center">
              <FaUserClock size={20} className="text-farm-700 dark:text-farm-400" />
            </div>
            <h2 className="text-lg font-bold text-surface-900 dark:text-white">
              Recent Posts
            </h2>
          </div>

          <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            See what farmers around you are posting right now.
          </p>

          <Link
            href="/recents"
            className="
              flex items-center justify-center w-full
              bg-farm-600 text-white px-5 py-3 rounded-xl shadow-elevation-1 
              active:scale-95 font-semibold text-sm
            "
          >
            View Latest Posts
          </Link>
        </div>
      </div>

      {/* ================================================================= */}
      {/*                        MOST LIKED (PREMIUM)                      */}
      {/* ================================================================= */}

      <div className="mt-4 px-4 pb-24">
        <div className="
          bg-surface-50 dark:bg-surface-900
          rounded-[24px] p-5
          border border-surface-200 dark:border-surface-800
          shadow-elevation-1
        ">

          <div className="flex items-center gap-3 mb-3">
            <div className="
              w-10 h-10 rounded-xl 
              bg-earth-100 dark:bg-earth-900 
              flex items-center justify-center
            ">
              <svg width="20" height="20" fill="#e65100" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                        2 6 4 4 6.5 4c1.74 0 3.41 1 4.13 2.44h.74C13.09 
                        5 14.76 4 16.5 4 19 4 21 6 21 8.5c0 
                        3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <h2 className="text-lg font-bold text-surface-900 dark:text-white">
              Most Liked
            </h2>
          </div>

          <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed mb-4">
            Trending among farmers — most liked and shared.
          </p>

          <Link
            href="/trending"
            className="
              flex items-center justify-center w-full
              bg-earth-500 text-white px-5 py-3 rounded-xl shadow-elevation-1 
              active:scale-95 font-semibold text-sm
            "
          >
            View Trending
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================================================================= */
/*                        FEATURE CARDS GRID                         */
/* ================================================================= */

function FeatureGrid() {
  const cards = [
    { href: "/farmer-dashboard", icon: <FaLeaf className="text-green-700 text-xl" />, bg: "bg-green-100", label: "Farmer Dashboard" },
    { href: "/market", icon: <FaTractor className="text-orange-600 text-xl" />, bg: "bg-orange-100", label: "Market" },
    { href: "/market-prices", icon: <FaIndianRupeeSign className="text-orange-600 text-xl" />, bg: "bg-orange-100", label: "Market Prices" },
    { href: "/posts", icon: <FaImages className="text-blue-600 text-xl" />, bg: "bg-blue-100", label: "Posts" },
    { href: "/weather", icon: <FaCloudSun className="text-yellow-600 text-xl" />, bg: "bg-yellow-100", label: "Weather" },
    { href: "/explore", icon: <FaLeaf className="text-pink-600 text-xl" />, bg: "bg-pink-100", label: "Explore" },
    { href: "/government-schemes", icon: <FaBullhorn className="text-purple-600 text-xl" />, bg: "bg-purple-100", label: "Schemes" },
    { href: "/news", icon: <FaNewspaper className="text-red-600 text-xl" />, bg: "bg-red-100", label: "News" },
    { href: "/milk-rate-calculator", icon: <FaGlobe className="text-teal-600 text-xl" />, bg: "bg-teal-100", label: "Milk Rate" },
    { href: "/reels", icon: <FaVideo className="text-indigo-600 text-xl" />, bg: "bg-indigo-100", label: "Reels" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {cards.map((c, i) => (
        <FeatureCard key={i} {...c} />
      ))}
    </div>
  );
}

/* ================================================================= */
/*                           FEATURE CARD                            */
/* ================================================================= */

function FeatureCard({ href, icon, bg, label }) {
  return (
    <Link
      href={href}
      className="
        p-4 rounded-3xl
        relative overflow-hidden
        bg-surface-50 dark:bg-surface-800
        border border-surface-200 dark:border-surface-700
        shadow-elevation-1
        flex flex-col items-center justify-center gap-3
        active:scale-95 transition-all duration-200
        hover:shadow-elevation-2 hover:bg-surface-100 dark:hover:bg-surface-700
        group
        h-32
      "
    >
      <div className={`
        relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center 
        ${bg} shadow-sm group-hover:scale-110 transition-transform duration-200
      `}>
        {icon}
      </div>

      <span className="relative z-10 font-semibold text-surface-800 dark:text-surface-100 text-[13px] text-center leading-tight">
        {label}
      </span>
    </Link>
  );
}
