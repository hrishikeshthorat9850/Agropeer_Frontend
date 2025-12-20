"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdDashboard from "@/components/AdDashboard";
import AdCreate from "@/components/AdCreate";
import {
  FaClipboardList,
  FaPlusCircle,
  FaChartBar,
  FaBullhorn,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function AdsAdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const tabs = [
    { id: "dashboard", label: "All Ads", icon: FaClipboardList },
    { id: "create", label: "Create New", icon: FaPlusCircle },
    { id: "stats", label: "Statistics", icon: FaChartBar },
  ];

  // Example mock data (you can fetch from Supabase later)
  const adPerformanceData = [
    { month: "Jan", impressions: 12000, clicks: 350 },
    { month: "Feb", impressions: 18000, clicks: 540 },
    { month: "Mar", impressions: 22000, clicks: 730 },
    { month: "Apr", impressions: 16000, clicks: 410 },
    { month: "May", impressions: 25000, clicks: 880 },
    { month: "Jun", impressions: 27000, clicks: 950 },
  ];

  const adCategoryData = [
    { name: "Seeds", count: 18 },
    { name: "Fertilizers", count: 11 },
    { name: "Machinery", count: 8 },
    { name: "Crop Insurance", count: 5 },
  ];

  return (
    <div className="min-h-[calc(100vh-122px)] bg-gradient-to-br from-green-50 to-green-100">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b bg-white shadow-sm">
        <div className="flex items-center gap-3">
          <FaBullhorn className="text-green-700 text-3xl" />
          <h1 className="text-2xl md:text-3xl font-bold text-green-800">
            Ad Management Portal
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mt-4">
        <div className="bg-white shadow-lg rounded-full px-3 py-2 flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all ${
                  isActive
                    ? "bg-green-700 text-white font-semibold shadow-md"
                    : "text-green-800 hover:bg-green-100"
                }`}
              >
                <Icon /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <AnimatePresence mode="wait">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AdDashboard />
            </motion.div>
          )}

          {/* Create Tab */}
          {activeTab === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AdCreate />
            </motion.div>
          )}

          {/* Statistics Tab */}
          {activeTab === "stats" && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-2xl p-6 border border-green-200"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-4">
                📊 Ad Performance Analytics
              </h2>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm border border-green-100">
                  <h3 className="text-3xl font-bold text-green-800">42</h3>
                  <p className="text-green-700 mt-1 font-medium">
                    Active Campaigns
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm border border-green-100">
                  <h3 className="text-3xl font-bold text-green-800">158K</h3>
                  <p className="text-green-700 mt-1 font-medium">
                    Total Impressions
                  </p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl text-center shadow-sm border border-green-100">
                  <h3 className="text-3xl font-bold text-green-800">3.8%</h3>
                  <p className="text-green-700 mt-1 font-medium">
                    Click Through Rate
                  </p>
                </div>
              </div>

              {/* Line Chart - Impressions & Clicks */}
              <div className="bg-green-50 p-6 rounded-xl mb-8 shadow-sm">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  📈 Monthly Impressions & Clicks
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={adPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="impressions"
                      stroke="#16a34a"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="clicks"
                      stroke="#15803d"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart - Category Distribution */}
              <div className="bg-green-50 p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold text-green-800 mb-4">
                  🧩 Ads by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={adCategoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#16a34a" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
