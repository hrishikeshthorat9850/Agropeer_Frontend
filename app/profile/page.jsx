"use client";
import { useLogin } from "@/Context/logincontext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FaUserCircle, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaArrowLeft } from "react-icons/fa";
import { formatName } from "@/utils/formatName";
import { useLanguage } from "@/Context/languagecontext";
import { ProfileSkeleton } from "@/components/skeletons";
import { supabase } from "@/lib/supabaseClient";

// Formatter: links, mentions, hashtags, line breaks
function formatBio(text) {
  if (!text) return "";

  let formatted = text.replace(/\n/g, "<br>");

  // STRICT URL REGEX (never touches text)
  const urlRegex = /\bhttps?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+/g;

  formatted = formatted.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-300 underline">${url}</a>`
  );

  // mentions
  formatted = formatted.replace(
    /@([a-zA-Z0-9_]+)/g,
    `<span class="text-blue-200">@$1</span>`
  );

  // hashtags
  formatted = formatted.replace(
    /#([a-zA-Z0-9_]+)/g,
    `<span class="text-green-200">#$1</span>`
  );

  return formatted;
}

export default function ProfilePage() {
  const { user, loading, userinfo } = useLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [infoLoading, setInfoLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Visitor profile state
  const visitorId = searchParams.get("id");
  const [visitorInfo, setVisitorInfo] = useState(null);
  const [visitorLoading, setVisitorLoading] = useState(false);
  const [visitorError, setVisitorError] = useState(null);

  useEffect(() => {
    if (!loading) setInfoLoading(false);
  }, [loading]);

  // Fetch visitor profile when id query param is present
  useEffect(() => {
    const fetchVisitorProfile = async () => {
      if (!visitorId) {
        setVisitorInfo(null);
        return;
      }

      setVisitorLoading(true);
      setVisitorError(null);
      try {
        const { data: userinfo, error: userinfoError } = await supabase
          .from("userinfo")
          .select("*")
          .eq("id", visitorId)
          .single();

        if (userinfoError) {
          if (userinfoError.code === 'PGRST116') {
            setVisitorError("User not found");
          } else {
            throw userinfoError;
          }
          setVisitorLoading(false);
          return;
        }

        setVisitorInfo(userinfo);
      } catch (err) {
        console.error("Error fetching visitor profile:", err);
        setVisitorError("Failed to load profile");
      } finally {
        setVisitorLoading(false);
      }
    };

    fetchVisitorProfile();
  }, [visitorId]);

  // Visitor profile view
  if (visitorId) {
    if (visitorLoading) {
      return <ProfileSkeleton />;
    }

    if (visitorError || !visitorInfo) {
      return (
        <div className="min-h-[calc(100vh-122px)] py-4 px-2 flex items-center justify-center">
          <div className="text-center">
            <FaUserCircle className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {visitorError || "User not found"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The profile you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 mx-auto px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
            >
              <FaArrowLeft /> Go Back
            </button>
          </div>
        </div>
      );
    }

    const displayName = formatName(visitorInfo) || visitorInfo?.display_name || "User";
    const avatarUrl = visitorInfo?.profile_url || visitorInfo?.avatar_url || null;
    const bioRaw = visitorInfo?.bio || "";
    const bioFormatted = formatBio(bioRaw);
    const bioTextOnly = bioRaw.replace(/(<([^>]+)>)/gi, "");
    const shortLimit = 150;
    const shouldShowToggle = bioTextOnly.length > shortLimit;
    const shortRaw = bioRaw.slice(0, shortLimit);
    const shortFormatted = formatBio(shortRaw);
    const isOwnProfile = user?.id === visitorId;

    return (
      <div className="min-h-[calc(100vh-122px)] py-4 px-2">
        <div className="max-w-4xl mx-auto bg-green-50 shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:bg-[#272727] dark:border-gray-600">
          <div className="px-6 pt-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition"
            >
              <FaArrowLeft /> Back
            </button>
          </div>

          <div className="bg-gradient-to-r from-green-700 to-green-500 relative px-6 pb-16 pt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:pb-4">
            <div className="absolute left-8 -bottom-14">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-green-100 flex items-center justify-center shadow-md">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    width={112}
                    height={112}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="text-7xl text-green-700" />
                )}
              </div>
            </div>

            <div className="text-white text-sm sm:w-1/2 ml-auto mt-4 sm:mt-0 leading-relaxed select-text">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-white/90">Bio</h2>
              </div>
              <div className="mt-1">
                {bioRaw ? (
                  <>
                    <div
                      className="whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html:
                          showMore || !shouldShowToggle
                            ? bioFormatted
                            : shortFormatted + (bioTextOnly.length > shortLimit ? "..." : "")
                      }}
                    />
                    {shouldShowToggle && (
                      <button
                        onClick={() => setShowMore(!showMore)}
                        className="mt-1 mb-[10px] text-xs underline text-gray-200"
                      >
                        {showMore ? "Show Less" : "Show More"}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-white/80 italic">{t ? t("not_added") : "Not added"}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 pb-10 px-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{displayName}</h1>
                <p className="text-gray-500 dark:text-gray-400 break-all">
                  {visitorInfo?.email || t("no_email")}
                </p>
              </div>

              {isOwnProfile && (
                <button
                  onClick={() => router.push("/profile/edit")}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition w-full sm:w-auto"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
                <FaEnvelope className="text-green-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("email")}</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {visitorInfo?.email || t("not_added")}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
                <FaPhone className="text-green-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("phone")}</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {visitorInfo?.mobile || t("not_added")}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
                <FaCalendarAlt className="text-green-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("member_since")}</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {visitorInfo?.created_at
                      ? new Date(visitorInfo.created_at).toLocaleDateString()
                      : t("not_added")}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
                <FaMapMarkerAlt className="text-green-600 text-xl" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{t("location")}</p>
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {visitorInfo?.country || t("not_specified")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Own profile view
  if (loading || infoLoading)
    return <ProfileSkeleton />;

  const displayName = formatName(userinfo) || userinfo?.display_name;

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.avatar ||
    userinfo?.avatar_url
    null;

  const bioRaw = user?.user_metadata?.bio || "";
  const bioFormatted = formatBio(bioRaw);

  const bioTextOnly = bioRaw.replace(/(<([^>]+)>)/gi, "");
  const shortLimit = 150;
  const shouldShowToggle = bioTextOnly.length > shortLimit;

  const shortRaw = bioRaw.slice(0, shortLimit);
  const shortFormatted = formatBio(shortRaw);

  return (
    <div className="min-h-[calc(100vh-122px)] py-4 px-2">
      <div className="max-w-4xl mx-auto bg-green-50 shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:bg-[#272727] dark:border-gray-600">

        {/* HEADER WITH BIO LABEL */}
        <div className="bg-gradient-to-r from-green-700 to-green-500 relative px-6 pb-16 pt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:pb-4">

          {/* Avatar */}
          <div className="absolute left-8 -bottom-14">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-green-100 flex items-center justify-center shadow-md">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="avatar"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-7xl text-green-700" />
              )}
            </div>
          </div>

          {/* BIO PANEL */}
          <div className="text-white text-sm sm:w-1/2 ml-auto mt-4 sm:mt-0 leading-relaxed select-text">

            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-white/90 cursor-pointer"
                onClick={() => router.push("/profile/edit")}
              >Bio</h2>
            </div>

            <div className="mt-1">
              {bioRaw ? (
                <>
                  <div
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{
                      __html:
                        showMore || !shouldShowToggle
                          ? bioFormatted
                          : shortFormatted + (bioTextOnly.length > shortLimit ? "..." : "")
                    }}
                  />
                  {shouldShowToggle && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="mt-1 mb-[10px] text-xs underline text-gray-200"
                    >
                      {showMore ? "Show Less" : "Show More"}
                    </button>
                  )}
                </>
              ) : (
                <p className="text-white/80 italic">{t ? t("not_added") : "Not added"}</p>
              )}
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="pt-20 pb-10 px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-800">{displayName}</h1>
              <p className="text-gray-500 break-all">{user?.email || t("no_email")}</p>
            </div>

            <button
              onClick={() => router.push("/profile/edit")}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition w-full sm:w-auto"
            >
              <FaEdit /> {t("edit_profile")}
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
              <FaEnvelope className="text-green-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">{t("email")}</p>
                <p className="font-medium text-gray-800">{user?.email}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
              <FaPhone className="text-green-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">{t("phone")}</p>
                <p className="font-medium text-gray-800">{user?.user_metadata?.phone || t("not_added")}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
              <FaCalendarAlt className="text-green-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">{t("member_since")}</p>
                <p className="font-medium text-gray-800">{new Date(user?.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 flex items-center gap-3 dark:bg-[#1E1E1E] dark:border-none">
              <FaMapMarkerAlt className="text-green-600 text-xl" />
              <div>
                <p className="text-sm text-gray-500">{t("location")}</p>
                <p className="font-medium text-gray-800">{user?.user_metadata?.location || t("not_specified")}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
