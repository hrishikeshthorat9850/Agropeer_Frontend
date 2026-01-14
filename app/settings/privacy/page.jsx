"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Lock,
  User,
  Mail,
  MapPin,
  Eye,
  EyeOff,
  Phone,
  ChevronRight,
  Shield,
  MessageCircle,
  Check,
} from "lucide-react";
import { useLogin } from "@/Context/logincontext";
import { useLanguage } from "@/Context/languagecontext";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function PrivacySettingsPage() {
  const router = useRouter();
  const { user } = useLogin();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const { showToast } = useToast();

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public", // public, private
    allowMessages: "all", // all, contacts, none
    shareLocation: true,
    showEmail: false,
    showPhone: false,
  });

  // Load existing privacy settings
  useEffect(() => {
    if (user) {
      const saved = user.user_metadata?.privacy_settings;
      console.log("Saved privacy settings :", saved);
      if (saved) {
        setPrivacySettings({ ...privacySettings, ...saved });
      }
    }
  }, [user]);

  // Handle privacy settings update
  const handlePrivacyUpdate = async () => {
    if (!user) return;

    setLoading(true);
    setAlert({ show: false, type: "", message: "" });

    try {
      const { error } = await supabase.auth.updateUser({
        data: { privacy_settings: privacySettings },
      });

      if (error) throw error;

      // setAlert({
      //   show: true,
      //   type: "success",
      //   message: t("privacy_settings_saved") || "Privacy settings saved successfully!",
      // });
      showToast("success", t("privacy_settings_saved"));

      setTimeout(() => {
        setAlert({ show: false, type: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error updating privacy settings:", error);
      setAlert({
        show: true,
        type: "error",
        message: error.message || "Failed to save privacy settings",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (key, value) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-[#F2F2F7] dark:bg-black pb-6 font-sans safe-area-inset-bottom">
      {/* Premium Header with Blur */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between px-4 h-14">
          <button
            onClick={() => router.push("/settings")}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-black dark:text-white" />
          </button>
          <h1 className="text-lg font-semibold text-black dark:text-white">
            {t("privacy_settings") || "Privacy Settings"}
          </h1>
          <div className="w-10" /> {/* Spacer for optical centering */}
        </div>
      </header>

      <main className="max-w-md mx-auto sm:px-4 sm:pt-4">
        {/* Alert - Restored logic display if needed, though toast is primary now, keeping implementation for logic fidelity */}
        {alert.show && (
          <div
            className={`mb-4 mx-4 p-3 rounded-lg ${
              alert.type === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {alert.message}
          </div>
        )}
        {/* Account Privacy Section */}
        <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          {t("account_privacy") || "Account Privacy"}
        </h3>{" "}
        {/* Section Header Inline */}
        <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
          {/* Profile Visibility */}
          <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors border-b border-gray-100 dark:border-[#2C2C2E]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                  {privacySettings.profileVisibility === "private" ? (
                    <Lock size={20} strokeWidth={2} />
                  ) : (
                    <User size={20} strokeWidth={2} />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {t("profile_visibility") || "Profile Visibility"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {t("profile_visibility_desc") ||
                      "Control who can see your profile information"}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <select
                    value={privacySettings.profileVisibility}
                    onChange={(e) =>
                      handleSettingChange("profileVisibility", e.target.value)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 dark:bg-black dark:text-white"
                  >
                    <option
                      value="public"
                      className="text-black bg-white dark:bg-black dark:text-white"
                    >
                      {t("public") || "Public"}
                    </option>
                    <option
                      value="private"
                      className="text-black bg-white dark:bg-black dark:text-white"
                    >
                      {t("private") || "Private"}
                    </option>
                  </select>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {privacySettings.profileVisibility === "public"
                        ? t("public") || "Public"
                        : t("private") || "Private"}
                    </span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                  <MessageCircle size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {t("messages") || "Messages"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {t("messages_desc") || "Control who can send you messages"}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative">
                  <select
                    value={privacySettings.allowMessages}
                    onChange={(e) =>
                      handleSettingChange("allowMessages", e.target.value)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 dark:bg-black dark:text-white"
                  >
                    <option
                      value="all"
                      className="text-black bg-white dark:bg-black dark:text-white"
                    >
                      {t("everyone") || "Everyone"}
                    </option>
                    <option
                      value="contacts"
                      className="text-black bg-white dark:bg-black dark:text-white"
                    >
                      {t("contacts_only") || "Contacts Only"}
                    </option>
                    <option
                      value="none"
                      className="text-black bg-white dark:bg-black dark:text-white"
                    >
                      {t("nobody") || "Nobody"}
                    </option>
                  </select>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {privacySettings.allowMessages === "all"
                        ? t("everyone") || "Everyone"
                        : privacySettings.allowMessages === "contacts"
                        ? t("contacts_only") || "Contacts Only"
                        : t("nobody") || "Nobody"}
                    </span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Info Visibility Section */}
        <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          {t("contact_info") || "Contact Info"}
        </h3>
        <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
          {/* Location Sharing */}
          <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors border-b border-gray-100 dark:border-[#2C2C2E]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                  <MapPin size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {t("location_sharing") || "Location Sharing"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {t("share_location_desc") ||
                      "Allow others to see your location"}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.shareLocation}
                    onChange={(e) =>
                      handleSettingChange("shareLocation", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-[50px] h-[30px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[26px] after:w-[26px] after:transition-all dark:border-gray-600 peer-checked:bg-green-500 shadow-sm"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Show Email */}
          <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors border-b border-gray-100 dark:border-[#2C2C2E]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                  {privacySettings.showEmail ? (
                    <Eye size={20} strokeWidth={2} />
                  ) : (
                    <EyeOff size={20} strokeWidth={2} />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {t("email_visibility") || "Email Visibility"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {t("show_email_desc") ||
                      "Display your email on your profile"}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.showEmail}
                    onChange={(e) =>
                      handleSettingChange("showEmail", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-[50px] h-[30px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[26px] after:w-[26px] after:transition-all dark:border-gray-600 peer-checked:bg-green-500 shadow-sm"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Show Phone */}
          <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                  {privacySettings.showPhone ? (
                    <Phone size={20} strokeWidth={2} />
                  ) : (
                    <EyeOff size={20} strokeWidth={2} />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {t("phone_visibility") || "Phone Visibility"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {t("show_phone_desc") ||
                      "Display your phone number on your profile"}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings.showPhone}
                    onChange={(e) =>
                      handleSettingChange("showPhone", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-[50px] h-[30px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[26px] after:w-[26px] after:transition-all dark:border-gray-600 peer-checked:bg-green-500 shadow-sm"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Security / Extra Section */}
        {/* <h3 className="px-4 py-2 mt-6 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          {t("security") || "Security"}
        </h3> */}
        {/* <div className="overflow-hidden bg-white dark:bg-[#1C1C1E] sm:rounded-xl shadow-sm">
          <div className="flex flex-col p-4 bg-white dark:bg-[#1C1C1E] active:bg-gray-50 dark:active:bg-[#2C2C2E] transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="p-2 rounded-full bg-gray-100 dark:bg-[#2C2C2E] text-gray-600 dark:text-gray-300">
                  <Shield size={20} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-medium text-gray-900 dark:text-white truncate">
                    {t("blocked_accounts") || "Blocked Accounts"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                    {t("manage_blocked") || "Manage blocked users"}
                  </span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div> */}
        {/* Save/Action Button Area */}
        <div className="px-4 mt-8 mb-8">
          <button
            onClick={handlePrivacyUpdate}
            disabled={loading}
            className="w-full h-12 flex items-center justify-center gap-2 bg-green-600 active:scale-[0.98] transition-all rounded-xl text-white font-semibold text-lg shadow-lg shadow-green-600/20 disabled:opacity-70 disabled:active:scale-100"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Check size={20} strokeWidth={3} />
                {t("save_changes") || "Save Changes"}
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4 px-8">
            {t("privacy_policy_notice")}
          </p>
        </div>
      </main>
    </div>
  );
}
