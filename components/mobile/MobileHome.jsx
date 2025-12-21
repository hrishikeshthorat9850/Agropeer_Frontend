"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useCallback } from "react";
import { useLocation, LOCATION } from "./hooks/useLocation";
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

export default function MobileHome() {
  const { weather, loading, getWeather } = useWeather();

  // ✅ memoized success handler
  const onLocationSuccess = useCallback((lat, lng) => {
    getWeather(lat, lng);
  }, [getWeather]);

  const { status, retry } = useLocation(onLocationSuccess);

  const todaysWeather = useMemo(() => {
    if (!weather) return null;
    return {
      rainChance: weather.forecast?.[0]?.rainChance ?? "--",
      wind: weather.windspeed?.toFixed(1) ?? "--",
      humidity: weather.humidity ?? "--",
      temp: weather.temperature?.toFixed(1) ?? "--",
    };
  }, [weather]);
  return (
    <div className="md:hidden pb-1 min-h-screen bg-[#FAF7F2] dark:bg-[#0d0d0d]">

      {/* ================================================================= */}
      {/*                        TOP HEADER SECTION                         */}
      {/* ================================================================= */}

      <div className="relative w-full">

        {/* BACKGROUND ILLUSTRATION */}
        <div className="relative w-full h-[220px]">
          <Image
            src="/banners/FarmOld.jpg"
            alt="Farm Landscape"
            fill
            className="object-cover dark:opacity-80"
          />
        </div>

        {/* FLOATING WHITE CARD */}
        <div className="absolute w-[90%] left-1/2 -translate-x-1/2 -bottom-40">
          <div className="
            bg-white dark:bg-[#1a1a1a]
            rounded-3xl p-5 
            shadow-[0_4px_20px_rgba(0,0,0,0.10)]
            dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]
            border border-white/70 dark:border-[#333]
          ">
            <h2 className="text-[20px] font-bold text-gray-900 dark:text-white">
              Smart Farm Tools & Calculators.
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              Plan smarter using seed, fertilizer, water & yield calculators.
            </p>

            <Link
              href="/explore"
              className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded-full shadow-md active:scale-95"
            >
              Use Tools
            </Link>

          </div>
        </div>
      </div>

      {/* SPACER */}
      <div className="h-40" />

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
                {loading
                  ? "..."
                  : todaysWeather?.temp
                  ? `${todaysWeather?.temp}°C`
                  : "--"}
              </h3>
            </div>

            <div className="text-right">
              <p className="text-[13px] text-slate-600 dark:text-slate-300">
                Humidity: {todaysWeather?.humidity ?? "--"}%
              </p>
              <p className="text-[13px] text-slate-600 dark:text-slate-300">
                Rain Chance: 
                {loading
                  ? "..."
                  : todaysWeather?.rainChance !== undefined
                    ? todaysWeather?.rainChance + "%"
                    : "--"}
              </p>
              <p className="text-[13px] text-slate-600 dark:text-slate-300">
                WindSpeed: {todaysWeather?.wind ?? "--"} km/h
              </p>
            </div>
          </div>

          <Link
            href="/weather"
            className="
              inline-block mt-5
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
      {/*                        WELCOME TITLE SECTION                      */}
      {/* ================================================================= */}

      <div className="text-center mt-4 px-6">
        <h1 className="text-2xl font-bold text-green-800 dark:text-green-400">
          Welcome to AgroPeer.
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 leading-relaxed">
          Connect, share and grow with fellow farmers — explore useful tools.
        </p>
      </div>

      {/* ================================================================= */}
      {/*                        FEATURE GRID (10)                         */}
      {/* ================================================================= */}

      <div className="mt-8 px-4 space-y-4">
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
              inline-block mt-4 
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
              inline-block mt-4 
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
        bg-white dark:bg-[#1c1c1c]
        border border-gray-200 dark:border-[#333]
        shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.6)]
        flex items-center gap-3 
        active:scale-95 transition
      "
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
        {icon}
      </div>

      <span className="font-semibold text-gray-800 dark:text-gray-200 text-[15px]">
        {label}
      </span>
    </Link>
  );
}

