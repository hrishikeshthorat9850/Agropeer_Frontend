"use client";
import { useLogin } from "@/Context/logincontext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ArrowLeft, UserCog, Save, Check } from "lucide-react";
import { useLanguage } from "@/Context/languagecontext";
import useToast from "@/hooks/useToast";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import LoadingSpinner from "@/components/LoadingSpinner";
// ADDITIVE ENHANCEMENT: Import back transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { useBackTransition } from "@/hooks/useBackTransition";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function EditProfilePage() {
  const { user } = useLogin();
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get back transition handler
  // Original router.back() still available, this adds smooth transitions
  const { routerBack } = useBackTransition();
  const { t } = useLanguage();
  const { showToast } = useToast();

  useBackPress(
    () => {
      routerBack(); // Use the smooth transition version
      return true;
    },
    10,
    true,
  );
  // Import context differently if needed or just use require?
  // Wait, I can't add import in the middle of function.
  // I need to add import at top and hook usage here.
  // I will split this into two edits.

  const BIO_LIMIT = 500;
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    location: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Load user data in form
  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user?.user_metadata?.full_name || "",
        phone: user?.user_metadata?.phone || "",
        location: user?.user_metadata?.location || "",
        bio: user?.user_metadata?.bio || "",
      });
      // Set initial preview
      setPreviewUrl(
        user?.user_metadata?.avatar_url || user?.user_metadata?.avatar || null,
      );
    }
  }, [user]);

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setAvatarFile(compressedFile);

      const reader = new FileReader();
      reader.onload = (ev) => setPreviewUrl(ev.target.result);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Image error:", error);
      showToast("error", t("image_error") || "Failed to process image");
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let avatarUrl = previewUrl;

      // Upload new avatar if selected
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop();
        const fileName = `avatars/${user.id}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-photos")
          .upload(fileName, avatarFile, { upsert: true });

        if (uploadError) throw uploadError.message;

        const { data } = supabase.storage
          .from("profile-photos")
          .getPublicUrl(fileName);

        avatarUrl = data.publicUrl;
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.full_name,
          phone: formData.phone,
          location: formData.location,
          bio: formData.bio.slice(0, BIO_LIMIT),
          avatar_url: avatarUrl,
        },
      });
      // const {data,error} = await supabase
      //   .from("userinfo")
      //   .upsert({
      //     full_name: formData.full_name,
      //     phone: formData.phone,
      //     location: formData.location,
      //     bio: formData.bio.slice(0, BIO_LIMIT),
      //     avatar_url: avatarUrl,
      //   })
      //   .eq("user_id",user?.id)
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
    <MobilePageContainer noPadding>
      <div className="bg-white dark:bg-black font-sans">
        {/* Sticky Header with Action */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-[#2C2C2E]">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => routerBack()}
              disabled={loading}
              className="p-2 -ml-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              {/* 
                ENHANCED: Changed router.back() to routerBack() for smooth transition
                PRESERVED: All other behavior unchanged (disabled state, styling, etc.)
              */}
              <ArrowLeft size={24} />
            </button>

            <h1 className="text-base font-bold text-gray-900 dark:text-white">
              {t("edit_profile")}
            </h1>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="p-2 -mr-2 text-green-600 dark:text-green-500 font-semibold disabled:opacity-50"
            >
              {loading ? (
                <LoadingSpinner size="tiny" color="green" text="" />
              ) : (
                t("save_changes") || "Save"
              )}
            </button>
          </div>
        </header>

        {/* Form Content */}
        <div className="p-4 sm:p-6 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Picker */}
            <div className="flex flex-col items-center justify-center mb-8">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />
              <div
                onClick={handlePhotoClick}
                className="w-24 h-24 bg-gray-100 dark:bg-[#1C1C1E] rounded-full flex items-center justify-center mb-3 relative overflow-hidden ring-4 ring-white dark:ring-black shadow-lg cursor-pointer group"
              >
                {previewUrl ? (
                  <Image
                    src={previewUrl}
                    alt="Profile"
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <UserCog size={36} className="text-gray-400" />
                )}

                {/* Overlay Hint */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <UserCog size={24} className="text-white" />
                </div>
              </div>
              <button
                type="button"
                onClick={handlePhotoClick}
                className="text-green-600 dark:text-green-500 font-semibold text-sm hover:underline"
              >
                {t("change_photo") || "Change Profile Photo"}
              </button>
            </div>

            <div className="space-y-5">
              {[
                {
                  label: t("full_name"),
                  key: "full_name",
                  placeholder: t("ph_full_name"),
                },
                { label: t("phone"), key: "phone", placeholder: t("ph_phone") },
                {
                  label: t("location"),
                  key: "location",
                  placeholder: t("ph_location"),
                },
              ].map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={formData[field.key]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.key]: e.target.value })
                    }
                    className="w-full bg-gray-50 dark:bg-[#1C1C1E] border border-gray-200 dark:border-[#2C2C2E] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-medium"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              {/* BIO WITH LIMIT */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between ml-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {t("bio")}
                  </label>
                  <span
                    className={`text-[10px] font-medium ${
                      formData.bio.length >= BIO_LIMIT
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                  >
                    {formData.bio.length} / {BIO_LIMIT}
                  </span>
                </div>

                <textarea
                  rows="4"
                  maxLength={BIO_LIMIT}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bio: e.target.value.slice(0, BIO_LIMIT),
                    })
                  }
                  className="w-full bg-gray-50 dark:bg-[#1C1C1E] border border-gray-200 dark:border-[#2C2C2E] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-green-500 dark:focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all font-medium resize-none leading-relaxed"
                  placeholder={t("ph_bio")}
                />
                <p className="text-[10px] text-gray-400 dark:text-gray-500 ml-1">
                  {t("bio_hint") || "Write a short bio about yourself."}
                </p>
              </div>
            </div>

            {/* Additional Save Button for mobile ease */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-green-600 active:scale-[0.98] transition-all rounded-xl text-white font-semibold text-lg shadow-lg shadow-green-600/20 disabled:opacity-60 flex items-center justify-center gap-2 mt-8 sm:hidden"
            >
              {loading ? (
                <LoadingSpinner size="tiny" color="white" text="" />
              ) : (
                <>
                  <Check size={20} strokeWidth={3} />
                  {t("save_changes")}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </MobilePageContainer>
  );
}
