"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaMoon,
  FaBell,
  FaGlobe,
  FaLock,
  FaTrashAlt,
} from "react-icons/fa";
import { useTheme } from "@/Context/themecontext";
import { useLanguage } from "@/Context/languagecontext";
import { useLogin } from "@/Context/logincontext";
import { supabase } from "@/lib/supabaseClient";
import { LOCALE_NAMES } from "@/lib/locales";
import useToast from "@/hooks/useToast";
import AccountDeleteModal from "@/components/ui/AccountDeleteModal";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, SUPPORTED_LOCALES, t } = useLanguage();
  const { user } = useLogin();
  const { showToast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Load notification preference on mount
  useEffect(() => {
    if (user) {
      const saved = user.user_metadata?.notifications_enabled;
      setNotificationsEnabled(saved !== undefined ? saved : true);
    }
  }, [user]);

  // Handle notification toggle
  const handleNotificationToggle = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    
    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("notifications_enabled", String(newValue));
    }

    // Save to Supabase user metadata
    if (user) {
      try {
        await supabase.auth.updateUser({
          data: { notifications_enabled: newValue },
        });
        showToast("success", newValue ? "Notifications enabled 🔔" : "Notifications disabled 🔕");
      } catch (error) {
        console.error("Error updating notification preference:", error);
        // Revert on error
        setNotificationsEnabled(!newValue);
        showToast("error", "Failed to update notification settings");
      }
    }
  };

  // Handle delete account button click - opens modal
  const handleDeleteAccountClick = () => {
    setShowDeleteModal(true);
  };

  return (
    <MobilePageContainer>
      <div className="py-4">
        <div className="max-w-3xl w-full mx-auto bg-white dark:bg-[#272727] shadow-lg rounded-2xl p-4 md:p-6 border border-green-100 dark:border-gray-800">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 transition text-sm font-medium"
          >
            <FaArrowLeft /> {t("back_to_profile")}
          </button>

          <h1 className="text-2xl font-semibold text-black dark:text-white flex items-center gap-2">
            <FaGlobe className="text-green-600" /> {t("settings")}
          </h1>
        </div>

        {/* Theme */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FaMoon /> {t("appearance")}
          </h2>
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-4 rounded-lg">
            <div>
              <span className="text-gray-700 dark:text-white font-medium">
                {t("dark_mode")}
              </span>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("dark_mode_desc")}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() => {
                  toggleTheme();
                  showToast("info", theme === "dark" ? "Switched to light mode ☀️" : "Switched to dark mode 🌙");
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full relative"></div>
            </label>
          </div>
        </div>

        {/* Notifications */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FaBell /> {t("notifications")}
          </h2>
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-4 rounded-lg">
            <div>
              <p className="text-gray-700 dark:text-white font-medium">
                {t("enable_notifications")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("notifications_desc")}
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={handleNotificationToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {/* Language */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FaGlobe /> {t("language")}
          </h2>

          <select
            value={locale}
            onChange={(e) => {
              setLocale(e.target.value);
              showToast("success", `Language changed to ${LOCALE_NAMES[e.target.value] || e.target.value} 🌐`);
            }}
            className="w-full border-2 border-green-300 dark:border-gray-700 rounded-lg px-3 py-2 text-black dark:text-white dark:bg-[#111] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            {SUPPORTED_LOCALES.map((code) => (
              <option key={code} value={code}>
                {LOCALE_NAMES[code] || code}
              </option>
            ))}
          </select>
        </div>

        {/* Privacy */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FaLock /> {t("privacy")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {t("privacy_desc")}
          </p>
          <button
            onClick={() => router.push("/settings/privacy")}
            className="w-full border-2 border-green-600 text-green-700 dark:text-green-400 dark:border-green-700 hover:bg-green-600 dark:hover:bg-green-700 hover:text-white transition font-medium py-2 rounded-lg"
          >
            {t("manage_privacy")}
          </button>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
          <h2 className="text-lg font-semibold text-red-600 flex items-center gap-2 mb-3">
            <FaTrashAlt /> {t("danger_zone")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {t("delete_desc")}
          </p>

          <button
            onClick={handleDeleteAccountClick}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            <FaTrashAlt />
            {t("delete_account")}
          </button>
        </div>
        {/* Account Delete Modal */}
        <AccountDeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
      </div>
      </div>
    </MobilePageContainer>
);
}
