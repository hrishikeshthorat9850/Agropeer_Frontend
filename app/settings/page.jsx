"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  Globe,
  Lock,
  Trash2,
  ChevronRight,
  ShieldAlert,
  Settings,
} from "lucide-react";
import { FaShieldAlt, FaFileContract, FaCookie } from "react-icons/fa";
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
  const [loading, setLoading] = useState(false); // Restored unused state if it was there
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
        showToast(
          "success",
          newValue ? "Notifications enabled 🔔" : "Notifications disabled 🔕"
        );
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
      <div className="min-h-screen bg-[#F2F2F7] dark:bg-black pb-6 font-sans safe-area-inset-bottom">
        {/* Premium Header with Blur */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => router.push("/profile")}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-black dark:text-white" />
            </button>
            <h1 className="text-lg font-semibold text-black dark:text-white">
              {t("settings")}
            </h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        <main className="max-w-md mx-auto sm:px-4 sm:pt-4">
          {/* Appearance Section */}
          <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("appearance")}
          </h3>
          <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
            <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                    {theme === "dark" ? (
                      <Moon size={20} strokeWidth={2} />
                    ) : (
                      <Sun size={20} strokeWidth={2} />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {t("dark_mode")}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {t("dark_mode_desc")}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={theme === "dark"}
                      onChange={() => {
                        toggleTheme();
                        showToast(
                          "info",
                          theme === "dark"
                            ? "Switched to light mode ☀️"
                            : "Switched to dark mode 🌙"
                        );
                      }}
                    />
                    <div className="w-[50px] h-[30px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[26px] after:w-[26px] after:transition-all dark:border-gray-600 peer-checked:bg-green-500 shadow-sm"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("preferences") || "Preferences"}
          </h3>
          <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
            {/* Notifications */}
            <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors border-b border-gray-100 dark:border-[#2C2C2E]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                    <Bell size={20} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {t("notifications")}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {t("enable_notifications")}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={notificationsEnabled}
                      onChange={handleNotificationToggle}
                    />
                    <div className="w-[50px] h-[30px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[26px] after:w-[26px] after:transition-all dark:border-gray-600 peer-checked:bg-green-500 shadow-sm"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Language */}
            <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                    <Globe size={20} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {t("language")}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="relative">
                    <select
                      value={locale}
                      onChange={(e) => {
                        setLocale(e.target.value);
                        showToast(
                          "success",
                          `Language changed to ${LOCALE_NAMES[e.target.value] || e.target.value
                          } 🌐`
                        );
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 dark:bg-black dark:text-white"
                    >
                      {SUPPORTED_LOCALES.map((code) => (
                        <option
                          key={code}
                          value={code}
                          className="text-black bg-white dark:bg-black dark:text-white"
                        >
                          {LOCALE_NAMES[code] || code}
                        </option>
                      ))}
                    </select>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {LOCALE_NAMES[locale] || locale}
                      </span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security Section */}
          <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("privacy") || "Privacy"}
          </h3>
          <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
            <div
              onClick={() => router.push("/settings/privacy")}
              className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                    <Lock size={20} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                      {t("privacy_settings") || "Privacy Settings"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {t("privacy_desc")}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Legal & Policies */}
          <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("legal") || "Legal & Policies"}
          </h3>
          <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
            <div className="flex flex-col bg-white dark:bg-[#1C1C1E]">
              {/* Privacy Policy */}
              <div
                onClick={() => router.push("/privacy-policy")}
                className="flex items-center justify-between gap-3 p-4 active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer border-b border-gray-100 dark:border-[#2C2C2E]"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <FaShieldAlt size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                      Privacy Policy
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>

              {/* Terms of Service */}
              <div
                onClick={() => router.push("/terms-of-service")}
                className="flex items-center justify-between gap-3 p-4 active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer border-b border-gray-100 dark:border-[#2C2C2E]"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                    <FaFileContract size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                      Terms of Service
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>

              {/* Cookie Policy */}
              <div
                onClick={() => router.push("/cookie-policy")}
                className="flex items-center justify-between gap-3 p-4 active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400">
                    <FaCookie size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                      Cookie Policy
                    </span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("danger_zone")}
          </h3>
          <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
            <div
              onClick={handleDeleteAccountClick}
              className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="p-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600">
                    <Trash2 size={20} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-medium text-red-600 truncate">
                      {t("delete_account")}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {t("delete_desc")}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <ChevronRight size={20} className="text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </main>

        <AccountDeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
        />
      </div>
    </MobilePageContainer>
  );
}
