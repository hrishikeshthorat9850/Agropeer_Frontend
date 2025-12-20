"use client";
import { FaSearch, FaUserCircle, FaMapMarkerAlt, FaSync } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmartFarmHeader({ meta, refreshing, onRefresh }) {
  const [farmLocation, setFarmLocation] = useState(meta?.region || "Farm Location");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (meta?.region) {
      setFarmLocation(meta.region);
    }
  }, [meta?.region]);

  const locations = [
    meta?.region || "Command Farm",
    "Main Farm - Field A",
    "Main Farm - Field B",
    "Secondary Farm",
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-gray-400 tracking-wide">
            {meta?.seasonPhase || "Hyperlocal control"}
          </p>
          <h1 className="text-2xl font-bold text-gray-800">{meta?.missionTagline || "SMART FARM"}</h1>
          <p className="text-sm text-gray-500">
            Sunrise {meta?.sunriseAt ? new Date(meta.sunriseAt).toLocaleTimeString() : "—"} ·{" "}
            {meta?.farmerName || "AgroPeer Collective"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-60"
            disabled={refreshing}
          >
            <FaSync className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            {refreshing ? "Syncing…" : "Sync digital twin"}
          </button>

          <div className="relative">
            <div
              className={`flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2 transition-all ${
                isSearchFocused ? "ring-2 ring-green-500 bg-white" : ""
              }`}
            >
              <FaSearch className="text-gray-500 w-4 h-4" />
              <input
                type="text"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="bg-transparent border-none outline-none text-sm text-gray-700 w-40"
                placeholder="Farm Location"
              />
              <FaMapMarkerAlt className="text-gray-400 w-3 h-3" />
            </div>

            <AnimatePresence>
              {isSearchFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                >
                  <div className="p-2">
                    {locations.map((loc, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setFarmLocation(loc);
                          setIsSearchFocused(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded hover:bg-green-50 text-sm text-gray-700"
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <FaUserCircle className="w-6 h-6 text-gray-600" />
            </button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                >
                  <div className="p-2">
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm text-gray-700">
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm text-gray-700">
                      Farm Settings
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-50 text-sm text-gray-700">
                      Notifications
                    </button>
                    <hr className="my-1" />
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-red-50 text-sm text-red-600">
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
