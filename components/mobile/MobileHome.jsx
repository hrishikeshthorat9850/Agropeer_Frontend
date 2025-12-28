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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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
      <div
        className="relative w-full transition-all duration-500 ease-out overflow-visible z-10"
        style={{
          transform: `translateY(${Math.min(scrollY * 0.5, 300)}px) scale(${Math.max(
            0.95,
            1 - scrollY / 800
          )})`,
          opacity: Math.max(1 - scrollY / 400, 0),
          filter: `blur(${Math.min(scrollY / 100, 2)}px)`,
        }}
      >
        {/* BACKGROUND IMAGE */}
        <div className="relative w-full h-[240px]">
          <Image
            src="/banners/FarmOld.jpg"
            alt="Farm Landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-transparent to-blue-900/30" />
        </div>

        {/* FLOATING CARD */}
        <div className="absolute w-[92%] left-1/2 -translate-x-1/2 -bottom-44 z-30">
          <div className="bg-white dark:bg-sky-950 rounded-3xl p-6 shadow-xl">
            <h2 className="text-[22px] font-bold bg-gradient-to-r from-green-600 via-green-500 to-blue-600 bg-clip-text text-transparent dark:from-green-400 dark:via-green-300 dark:to-blue-400">
              🚀 Smart Farm Tools & Calculators
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
              Plan smarter using seed, fertilizer, water & yield calculators.
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 mt-5 bg-green-600 text-white px-6 py-3 rounded-full mx-auto"
            >
              Use Tools ⚡
            </Link>
          </div>
        </div>
      </div>

      {/* 🔑 SPACER — REQUIRED */}
      <div className="h-56" />

      {/* ================= HOME BANNER (FULLY OPAQUE) ================= */}
      <div className="relative w-full overflow-hidden z-20 opacity-100">
        <HomeBanner />
      </div>

      {/* =============================================================== */}
      {/*                        PREMIUM WEATHER CARD                     */}
      {/* =============================================================== */}

      <div className="mt-6 px-4">
        <div className="
          relative overflow-hidden 
          rounded-3xl 
          p-5 
          bg-gradient-to-br 
          from-[#72c6ef] via-[#77ddf7] to-[#ffffff]
          dark:from-[#0f252d] dark:via-[#12343e] dark:to-[#0a1c22]
          shadow-[0_8px_25px_-5px_rgba(0,0,0,0.25)]
        ">

          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/30 blur-2xl dark:bg-white/10" />

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
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-lg animate-bounce" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl animate-ping" />
        </div>

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

      <div className="mt-14 px-4">
        <div className="
          bg-gradient-to-br from-white to-[#f9fafb] 
          dark:from-[#1a1a1a] dark:to-[#111]
          rounded-3xl p-5 
          shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
          dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]
          border border-[#f0f0f0] dark:border-[#333]
        ">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-2xl 
                bg-green-100 dark:bg-green-900/30 
                flex items-center justify-center shadow-inner">
              <FaUserClock size={24} className="text-green-700 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-bold text-green-800 dark:text-green-400">
              Recent Posts
            </h2>
          </div>

          <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
            See what farmers around you are posting right now — latest updates, photos & field progress.
          </p>

          <Link
            href="/recents"
            className="
              inline-block mt-4 mx-auto
              bg-gradient-to-r from-green-600 to-green-500 
              text-white px-5 py-2 rounded-full shadow-lg 
              active:scale-95 font-semibold
            "
          >
            View Latest Posts →
          </Link>
        </div>
      </div>

      {/* ================================================================= */}
      {/*                        MOST LIKED (PREMIUM)                      */}
      {/* ================================================================= */}

      <div className="mt-10 px-4 pb-10">
        <div className="
          bg-gradient-to-br from-white to-[#fff7f3]
          dark:from-[#1a1a1a] dark:to-[#190f0a]
          rounded-3xl p-5 
          shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]
          dark:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]
          border border-[#ffeede] dark:border-[#333]
        ">

          <div className="flex items-center gap-3 mb-3">
            <div className="
              w-12 h-12 rounded-2xl 
              bg-orange-100 dark:bg-orange-900/30 
              flex items-center justify-center shadow-inner
            ">
              <svg width="24" height="24" fill="orange" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                        2 6 4 4 6.5 4c1.74 0 3.41 1 4.13 2.44h.74C13.09 
                        5 14.76 4 16.5 4 19 4 21 6 21 8.5c0 
                        3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400">
              Most Liked Posts
            </h2>
          </div>

          <p className="text-[14px] text-gray-600 dark:text-gray-300 leading-relaxed">
            These posts are trending among farmers — most liked, shared and appreciated by the community.
          </p>

          <Link
            href="/trending"
            className="
              inline-block mt-4 mx-auto
              bg-gradient-to-r from-orange-500 to-orange-400 
              text-white px-5 py-2 rounded-full shadow-lg 
              active:scale-95 font-semibold
            "
          >
            View Trending Posts →
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
        p-4 rounded-2xl
        relative overflow-hidden
        bg-gradient-to-br from-white/90 via-white/95 to-white/80
        dark:from-[#1c1c1c] dark:via-[#0a0a0a] dark:to-[#272727]
        backdrop-blur-sm
        shadow-lg dark:shadow-[0_6px_20px_rgba(0,0,0,0.4)]
        border border-white/50 dark:border-gray-700/50
        flex flex-col items-center justify-center gap-2
        active:scale-95 transition-all duration-200
        hover:shadow-xl hover:scale-105
        group
      "
    >
      {/* ANIMATED BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* SUBTLE PATTERN OVERLAY */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
      </div>

      {/* GLOWING BORDER EFFECT */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />

      <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center ${bg} shadow-inner group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>

      <span className="relative z-10 font-semibold text-gray-800 dark:text-gray-200 text-[15px] group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200 text-center">
        {label}
      </span>
    </Link>
  );
}
