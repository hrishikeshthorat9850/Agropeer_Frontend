"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaLock, FaUser, FaEnvelope, FaMapMarkerAlt, FaEye, FaEyeSlash } from "react-icons/fa";
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
  const {showToast} = useToast();
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
      console.log("Saved privacy settings :",saved)
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
      showToast("success",t("privacy_settings_saved"))

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
    <div className="min-h-[calc(100vh-122px)] py-8 px-2 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white dark:bg-[#272727] shadow-lg rounded-2xl p-6 border border-green-100 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={() => router.push("/settings")}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 transition text-sm font-medium"
          >
            <FaArrowLeft /> {t("back_to_settings") || "Back to Settings"}
          </button>

          <h1 className="text-2xl font-semibold text-black dark:text-white flex items-center gap-2">
            <FaLock className="text-green-600" /> {t("privacy_settings") || "Privacy Settings"}
          </h1>
        </div>

        {/* Alert */}
        {alert.show && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              alert.type === "success"
                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* Profile Visibility */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FaUser /> {t("profile_visibility") || "Profile Visibility"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {t("profile_visibility_desc") || "Control who can see your profile information"}
          </p>
          <select
            value={privacySettings.profileVisibility}
            onChange={(e) => handleSettingChange("profileVisibility", e.target.value)}
            className="w-full border-2 border-green-300 dark:border-gray-700 rounded-lg px-3 py-2 text-black dark:text-white dark:bg-[#111] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="public">{t("public") || "Public"}</option>
            <option value="private">{t("private") || "Private"}</option>
          </select>
        </div>

        {/* Messages */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FaEnvelope /> {t("messages") || "Messages"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {t("messages_desc") || "Control who can send you messages"}
          </p>
          <select
            value={privacySettings.allowMessages}
            onChange={(e) => handleSettingChange("allowMessages", e.target.value)}
            className="w-full border-2 border-green-300 dark:border-gray-700 rounded-lg px-3 py-2 text-black dark:text-white dark:bg-[#111] focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="all">{t("everyone") || "Everyone"}</option>
            <option value="contacts">{t("contacts_only") || "Contacts Only"}</option>
            <option value="none">{t("nobody") || "Nobody"}</option>
          </select>
        </div>

        {/* Location Sharing */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            <FaMapMarkerAlt /> {t("location_sharing") || "Location Sharing"}
          </h2>
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-4 rounded-lg">
            <div>
              <p className="text-gray-700 dark:text-white font-medium">
                {t("share_location") || "Share Location"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("share_location_desc") || "Allow others to see your location"}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.shareLocation}
                onChange={(e) => handleSettingChange("shareLocation", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {/* Show Email */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            {privacySettings.showEmail ? <FaEye /> : <FaEyeSlash />} {t("email_visibility") || "Email Visibility"}
          </h2>
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-4 rounded-lg">
            <div>
              <p className="text-gray-700 dark:text-white font-medium">
                {t("show_email") || "Show Email"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("show_email_desc") || "Display your email on your profile"}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.showEmail}
                onChange={(e) => handleSettingChange("showEmail", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {/* Show Phone */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-4">
          <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2 mb-3">
            {privacySettings.showPhone ? <FaEye /> : <FaEyeSlash />} {t("phone_visibility") || "Phone Visibility"}
          </h2>
          <div className="flex items-center justify-between bg-gray-50 dark:bg-[#111] p-4 rounded-lg">
            <div>
              <p className="text-gray-700 dark:text-white font-medium">
                {t("show_phone") || "Show Phone"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("show_phone_desc") || "Display your phone number on your profile"}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacySettings.showPhone}
                onChange={(e) => handleSettingChange("showPhone", e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 dark:bg-gray-700 rounded-full peer peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white dark:after:bg-gray-200 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mt-6">
          <button
            onClick={handlePrivacyUpdate}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition"
          >
            {loading ? t("saving") || "Saving..." : t("save_changes") || "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

