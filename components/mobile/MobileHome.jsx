"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation, LOCATION } from "./hooks/useLocation";
import useGeolocation from "@/hooks/useGeolocation";
import PullToRefresh from "./PullToRefresh"; // Import
import {
  FaLeaf,
  FaTractor,
  FaImages,
  FaCloudSun,
  FaNewspaper,
  FaBullhorn,
  FaGlobe,
  FaVideo,
  FaUserClock,
} from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useWeather } from "@/Context/WeatherContext";
import { openAppSettings } from "./utils/openAppSettings";
import HomeBanner from "./HomeBanner";

export default function MobileHome() {
  const {
    weather,
    loading: weatherLoading,
    getWeather,
    error: weatherError,
  } = useWeather();
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

  // Handle Pull-to-Refresh
  const handleRefresh = async () => {
    if (position?.latitude && position?.longitude) {
      await getWeather(position.latitude, position.longitude);
    }
    // Simulate other data delays or real fetches
    await new Promise((r) => setTimeout(r, 800));
  };

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
      ? weather.temperature.toFixed(1)
      : "--";

  const rainChance =
    typeof weather?.forecast?.[0]?.rainChance === "number"
      ? weather.forecast[0].rainChance
      : "--";

  const humidity =
    typeof weather?.humidity === "number" ? weather?.humidity : "--";

  const windSpeed =
    typeof weather?.windspeed === "number"
      ? weather?.windspeed?.toFixed(1)
      : "--";

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="md:hidden min-h-screen bg-neutral-50 dark:bg-black font-sans pb-6">
        {/* ================================================================= */}
        {/*                        TOP HEADER SECTION                         */}
        {/* ================================================================= */}

        {/* ================= TOP HEADER + FLOATING CARD ================= */}
        <div className="relative w-full z-10 px-0 pb-0">
          <HomeBanner />
        </div>

        {/* =============================================================== */}
        {/*                        PREMIUM WEATHER CARD                     */}
        {/* =============================================================== */}

        <div className="mt-2 px-4">
          <div
            className="
          relative overflow-hidden 
          rounded-[30px]
          p-6
          bg-gradient-to-br from-blue-500 to-indigo-600
          dark:from-blue-900 dark:to-indigo-900
          shadow-lg shadow-blue-200/50 dark:shadow-none
          text-white
        "
          >
            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -ml-6 -mb-6 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-medium text-blue-50 dark:text-gray-300 tracking-wide opacity-90">
                  Today’s Weather
                </h2>
                <div className="flex items-center gap-2">
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
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
                  )}
                </div>
              </div>

              <div className="flex items-end justify-between mt-1">
                <div className="flex flex-col">
                  <h3 className="text-5xl font-light tracking-tighter text-white">
                    {cleanTemp}°
                  </h3>
                  <span className="text-sm text-blue-100 font-medium mt-1">
                    Mostly Sunny
                  </span>
                </div>

                <div className="flex flex-col items-end space-y-1.5 min-w-[100px]">
                  <WeatherDetailRow label="Humidity" value={`${humidity}%`} />
                  <WeatherDetailRow label="Rain" value={rainChance} />
                  <WeatherDetailRow label="Wind" value={`${windSpeed} km/h`} />
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex justify-center">
                <Link
                  href="/weather"
                  className="
                  text-sm font-semibold text-white/90 hover:text-white
                  flex items-center gap-2 transition-colors
                "
                >
                  See 7-Day Forecast <span className="opacity-70">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/*                    MODERN WELCOME HERO SECTION                    */}
        {/* ================================================================= */}

        <div className="relative mt-6 px-4 mb-4">
          <div className="text-center flex flex-col items-center space-y-2">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
              Welcome to{" "}
              <span className="text-green-600 dark:text-green-400">
                AgroPeer
              </span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-gray-400 max-w-[90%] leading-relaxed">
              Your smart farming companion. Connect, grow, and explore.
            </p>
          </div>
        </div>

        {/* ================================================================= */}
        {/*                        FEATURE GRID (10)                         */}
        {/* ================================================================= */}

        <div className="px-4">
          <FeatureGrid />
        </div>

        {/* ================================================================= */}
        {/*                        RECENT POSTS CARD                         */}
        {/* ================================================================= */}

        <div className="mt-8 px-4">
          <SectionHeader title="Community" subtitle="What's happening now" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <ActionCard
              href="/recents"
              title="Recent Posts"
              subtitle="Live updates"
              icon={<FaUserClock className="text-white text-lg" />}
              gradient="bg-gradient-to-br from-indigo-500 to-purple-600"
            />
            <ActionCard
              href="/trending"
              title="Trending"
              subtitle="Most liked"
              icon={
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1 4.13 2.44h.74C13.09 5 14.76 4 16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              }
              gradient="bg-gradient-to-br from-orange-500 to-pink-600"
            />
          </div>
        </div>
      </div>
    </PullToRefresh>
  );
}

const WeatherDetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between w-full text-xs text-blue-50">
    <span className="opacity-80">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="flex flex-col">
    <h3 className="text-lg font-bold text-slate-800 dark:text-white">
      {title}
    </h3>
    <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
  </div>
);

const ActionCard = ({ href, title, subtitle, icon, gradient }) => (
  <Link
    href={href}
    className={`
        group relative overflow-hidden rounded-[24px] p-4 h-32
        flex flex-col justify-between
        ${gradient}
        shadow-lg shadow-gray-200/50 dark:shadow-none
        active:scale-95 transition-transform duration-200
    `}
  >
    <div className="absolute top-0 right-0 p-3 opacity-20 transform group-hover:scale-110 transition-transform">
      {/* Decorative big icon */}
      <div className="scale-150">{icon}</div>
    </div>

    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
      {icon}
    </div>

    <div>
      <h4 className="text-white font-bold text-lg leading-tight">{title}</h4>
      <p className="text-white/80 text-xs font-medium">{subtitle}</p>
    </div>
  </Link>
);

/* ================================================================= */
/*                        FEATURE CARDS GRID                         */
/* ================================================================= */

function FeatureGrid() {
  const cards = [
    {
      href: "/farmer-dashboard",
      icon: <FaLeaf className="text-white text-xl" />,
      bg: "bg-green-500",
      label: "Dashboard",
    },
    {
      href: "/market",
      icon: <FaTractor className="text-white text-xl" />,
      bg: "bg-orange-500",
      label: "Market",
    },
    {
      href: "/market-prices",
      icon: <FaIndianRupeeSign className="text-white text-xl" />,
      bg: "bg-emerald-500",
      label: "Prices",
    },
    {
      href: "/posts",
      icon: <FaImages className="text-white text-xl" />,
      bg: "bg-blue-500",
      label: "Posts",
    },
    {
      href: "/weather",
      icon: <FaCloudSun className="text-white text-xl" />,
      bg: "bg-yellow-500",
      label: "Weather",
    },
    {
      href: "/explore",
      icon: <FaLeaf className="text-white text-xl" />,
      bg: "bg-pink-500",
      label: "Explore",
    },
    {
      href: "/government-schemes",
      icon: <FaBullhorn className="text-white text-xl" />,
      bg: "bg-purple-500",
      label: "Schemes",
    },
    {
      href: "/news",
      icon: <FaNewspaper className="text-white text-xl" />,
      bg: "bg-red-500",
      label: "News",
    },
    {
      href: "/milk-rate-calculator",
      icon: <FaGlobe className="text-white text-xl" />,
      bg: "bg-teal-500",
      label: "Milk Rate",
    },
    {
      href: "/reels",
      icon: <FaVideo className="text-white text-xl" />,
      bg: "bg-indigo-500",
      label: "Reels",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 sm:gap-6 mt-2">
      {cards.map((c, i) => (
        <FeatureItem key={i} {...c} />
      ))}
    </div>
  );
}

/* ================================================================= */
/*                           FEATURE ITEM                            */
/* ================================================================= */

const FeatureItem = ({ href, icon, bg, label }) => {
  return (
    <Link
      href={href}
      className="
        flex flex-col items-center gap-2
        group cursor-pointer
      "
    >
      <div
        className={`
        w-[60px] h-[60px] sm:w-[70px] sm:h-[70px]
        rounded-[22px] 
        ${bg}
        shadow-sm group-active:scale-90 transition-transform duration-200
        flex items-center justify-center
        text-white
      `}
      >
        {icon}
      </div>

      <span className="text-[11px] sm:text-xs font-medium text-slate-600 dark:text-slate-300 text-center leading-tight line-clamp-1 w-full">
        {label}
      </span>
    </Link>
  );
};
