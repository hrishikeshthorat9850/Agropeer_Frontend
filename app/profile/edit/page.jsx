"use client";
import { useLogin } from "@/Context/logincontext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { FaArrowLeft, FaUserEdit } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";
import useToast from "@/hooks/useToast";

export default function EditProfilePage() {
  const { user } = useLogin();
  const router = useRouter();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const BIO_LIMIT = 500;

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);

  // Load user data in form
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user?.user_metadata?.full_name || "",
        phone: user?.user_metadata?.phone || "",
        location: user?.user_metadata?.location || "",
        bio: user?.user_metadata?.bio || "",
      });
    }
  }, [user]);

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio.slice(0, BIO_LIMIT), // Safety
        },
      });

      if (error) throw error;

      showToast("success", t("profile_update_success"));
      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (err) {
      console.error(err);
      showToast("error", t("profile_update_failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-122px)] py-8 px-4 flex flex-col items-center">
      {/* Edit Profile Card */}
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-6 border border-green-100 dark:bg-[#272727] dark:border-white/20">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 text-green-700 hover:text-green-900 transition text-sm font-medium"
          >
            <FaArrowLeft /> {t("go_back")}
          </button>

          <h1 className="text-2xl font-semibold text-green-700 flex items-center gap-2">
            <FaUserEdit className="text-green-600" /> {t("edit_profile")}
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: t("full_name"), key: "full_name", placeholder: t("ph_full_name") },
            { label: t("phone"), key: "phone", placeholder: t("ph_phone") },
            { label: t("location"), key: "location", placeholder: t("ph_location") },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-green-700 mb-1 dark:text-gray-200">
                {field.label}
              </label>
              <input
                type="text"
                value={formData[field.key]}
                onChange={(e) =>
                  setFormData({ ...formData, [field.key]: e.target.value })
                }
                className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* BIO WITH LIMIT */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-1 dark:text-gray-200">
              {t("bio")}<span className="text-gray-500 text-xs"> (You can add links, hashtags, mentions, emojis, text)</span>
            </label>

            <textarea
              rows="4"
              maxLength={BIO_LIMIT}
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value.slice(0, BIO_LIMIT) })
              }
              className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              placeholder={t("ph_bio")}
            />

            {/* Character Counter */}
            <p className="text-xs text-gray-600 mt-1">
              {formData.bio.length} / {BIO_LIMIT} characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {loading ? t("saving") : t("save_changes")}
          </button>
        </form>
      </div>
    </div>
  );
}
