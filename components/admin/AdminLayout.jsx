"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaNewspaper,
  FaLandmark,
  FaIndustry,
  FaFileAlt,
  FaBox,
  FaChartLine,
  FaUsers,
  FaComments,
  FaHeart,
  FaBookmark,
  FaBell,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaCog,
} from "react-icons/fa";

const adminMenuItems = [
  { path: "/admin", label: "Dashboard", icon: FaHome },
  { path: "/admin/news", label: "News", icon: FaNewspaper },
  { path: "/admin/government-schemes", label: "Government Schemes", icon: FaLandmark },
  { path: "/admin/milk-companies", label: "Milk Companies", icon: FaIndustry },
  { path: "/admin/posts", label: "Posts", icon: FaFileAlt },
  { path: "/admin/products", label: "Products", icon: FaBox },
  { path: "/admin/market-prices", label: "Market Prices", icon: FaChartLine },
  { path: "/admin/users", label: "Users & Farmers", icon: FaUsers },
  { path: "/admin/comments", label: "Comments", icon: FaComments },
  { path: "/admin/reviews", label: "Reviews", icon: FaHeart },
  { path: "/admin/favorites", label: "Favorites", icon: FaBookmark },
  { path: "/admin/notifications", label: "Notifications", icon: FaBell },
  { path: "/admin/send-notification", label: "Send Notification", icon: FaBell },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-green-700">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 h-screen z-40
            w-64 bg-white shadow-lg border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Logo/Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-green-700">AgroPeer Admin</h2>
              <p className="text-sm text-gray-500 mt-1">Management Portal</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {adminMenuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-green-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <Link
                href="/admin/settings"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <FaCog className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("adminUser");
                  window.location.href = "/admin/login";
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-2"
              >
                <FaSignOutAlt className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

