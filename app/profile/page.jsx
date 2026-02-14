"use client";
import { useLogin } from "@/Context/logincontext";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  ArrowLeft,
  Share2,
  MoreVertical,
  BadgeCheck,
} from "lucide-react";
import { formatName } from "@/utils/formatName";
import { useLanguage } from "@/Context/languagecontext";
import { ProfileSkeleton } from "@/components/skeletons";
import { supabase } from "@/lib/supabaseClient";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import {shareContent} from "@/utils/shareHandler"
// ADDITIVE ENHANCEMENT: Import back transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { useBackTransition } from "@/hooks/useBackTransition";
// Formatter: links, mentions, hashtags, line breaks
function formatBio(text) {
  if (!text) return "";

  let formatted = text.replace(/\n/g, "<br>");

  // STRICT URL REGEX (never touches text)
  const urlRegex = /\bhttps?:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=%]+/g;

  formatted = formatted.replace(
    urlRegex,
    (url) =>
      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 dark:text-blue-400 font-medium hover:underline">${url}</a>`,
  );

  // mentions
  formatted = formatted.replace(
    /@([a-zA-Z0-9_]+)/g,
    `<span class="text-green-600 dark:text-green-400 font-medium">@$1</span>`,
  );

  // hashtags
  formatted = formatted.replace(
    /#([a-zA-Z0-9_]+)/g,
    `<span class="text-blue-600 dark:text-blue-400 font-medium">#$1</span>`,
  );

  return formatted;
}

export default function ProfilePage() {
  const { user, loading, userinfo } = useLogin();
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get back transition handler
  // Original router.back() still available, this adds smooth transitions
  const { routerBack } = useBackTransition();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [infoLoading, setInfoLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Visitor profile state
  const visitorId = searchParams.get("id");
  const [visitorInfo, setVisitorInfo] = useState(null);
  const [visitorLoading, setVisitorLoading] = useState(false);
  const [visitorError, setVisitorError] = useState(null);
  const [followClick,setFollowClick] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followed,setFollowed] = useState(false);
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
          if (userinfoError.code === "PGRST116") {
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

  // useEffect(() => {
  //   const checkFollowStatus = async () => {
  //     if (!user?.id || !visitorId) return;

  //     const { data } = await supabase
  //       .from("user_follows")
  //       .select("id")
  //       .eq("follower_id", user.id)
  //       .eq("following_id", visitorId)
  //       .maybeSingle();
  //     setFollowClick(!!data);
  //   };

  //   checkFollowStatus();
  // }, [user?.id, visitorId]);
  // const handleFollowClick = async () => {
  //   if (!user?.id || !visitorId) return;

  //   setFollowLoading(true);

  //   try {
  //     if (followClick) {
  //       await supabase
  //         .from("user_follows")
  //         .delete()
  //         .eq("follower_id", user.id)
  //         .eq("following_id", visitorId);

  //       setFollowClick(false);
  //     } else {
  //       await supabase
  //         .from("user_follows")
  //         .insert({
  //           follower_id: user.id,
  //           following_id: visitorId
  //         });

  //       setFollowClick(true);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setFollowLoading(false);
  //   }
  // };



  // Visitor profile view
  if (visitorId) {
    if (visitorLoading) {
      // Skeleton adjusted for mobile layout if needed, but keeping original skeleton component call
      return <ProfileSkeleton />;
    }

    if (visitorError || !visitorInfo) {
      return (
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-black flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-[#1C1C1E] rounded-full flex items-center justify-center mb-6">
            <User size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {visitorError || t("user_not_found")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
            {t("profile_not_found") ||
              "The user you are looking for might have removed their profile."}
          </p>
          <button
            onClick={() => routerBack()}
            className="px-6 py-3 bg-white dark:bg-[#1C1C1E] text-gray-900 dark:text-white font-medium rounded-xl shadow-sm border border-gray-200 dark:border-[#2C2C2E]"
          >
            {/* 
              ENHANCED: Changed router.back() to routerBack() for smooth transition
              PRESERVED: All other behavior unchanged
            */}
            {t("go_back")}
          </button>
        </div>
      );
    }

    const displayName =
      formatName(visitorInfo) || visitorInfo?.display_name || t("default_user");
    const avatarUrl =
      visitorInfo?.profile_url || visitorInfo?.avatar_url || null;
    const bioRaw = visitorInfo?.bio || "";
    const bioFormatted = formatBio(bioRaw);
    const bioTextOnly = bioRaw.replace(/(<([^>]+)>)/gi, "");
    const shortLimit = 150;
    const shouldShowToggle = bioTextOnly.length > shortLimit;
    const shortRaw = bioRaw.slice(0, shortLimit);
    const shortFormatted = formatBio(shortRaw);
    const isOwnProfile = user?.id === visitorId;

    return (
      <MobilePageContainer noPadding>
        <div className="bg-white dark:bg-black pb-4">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-[#2C2C2E] px-4 h-14 flex items-center justify-between">
            <button
              onClick={() => routerBack()}
              className="p-2 -ml-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              {/* 
                ENHANCED: Changed router.back() to routerBack() for smooth transition
                PRESERVED: All other behavior unchanged
              */}
              <ArrowLeft size={24} />
            </button>
            <span className="font-bold text-lg text-gray-900 dark:text-white truncate max-w-[200px]">
              {visitorInfo?.username || displayName}
            </span>
            <button className="p-2 -mr-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
              {/* <MoreVertical size={24} /> */}
            </button>
          </div>

          {/* Profile Header Info */}
          <div className="px-4 py-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 rounded-full border-2 border-gray-200 dark:border-[#2C2C2E] p-1 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-[#1C1C1E] relative">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User
                        size={40}
                        className="text-gray-300 dark:text-gray-600"
                      />
                    </div>
                  )}
                </div>
              </div>

              <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-1">
                {displayName}
              </h1>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                {visitorInfo?.title || t("default_role")}
              </p>

              {/* Bio Section */}
              <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 max-w-md w-full text-left px-2">
                {bioRaw ? (
                  <>
                    <div
                      className="whitespace-pre-wrap leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html:
                          showMore || !shouldShowToggle
                            ? bioFormatted
                            : shortFormatted +
                              (bioTextOnly.length > shortLimit ? "..." : ""),
                      }}
                    />
                    {shouldShowToggle && (
                      <button
                        onClick={() => setShowMore(!showMore)}
                        className="mt-1 text-gray-500 dark:text-gray-400 font-medium"
                      >
                        {showMore ? t("show_less") : t("show_more")}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-gray-400 italic text-center">
                    {t("not_added") || "No bio yet."}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full mt-6 px-2">
                {isOwnProfile ? (
                  <button
                    onClick={() => router.push("/profile/edit")}
                    className="flex-1 h-10 bg-gray-100 dark:bg-[#1C1C1E] rounded-lg font-semibold text-sm text-gray-900 dark:text-white active:scale-[0.98] transition-transform"
                  >
                    {t("edit_profile")}
                  </button>
                ) : (
                  <>
                    {/* <button
                      className={`flex-1 h-10 rounded-lg font-semibold text-sm text-white transition-all active:scale-[0.98] ${
                        followClick
                          ? "bg-gray-400"
                          : "bg-green-600 shadow-lg shadow-green-600/20"
                      } ${followLoading ? "opacity-80 cursor-not-allowed" : ""}`}
                      onClick={handleFollowClick}
                      disabled={followLoading}
                    >
                      {followLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      ) : (
                        followClick ? t("following") : t("follow")
                      )}
                    </button> */}
                    <button
                      disabled
                      className="flex-1 h-10 rounded-lg font-semibold text-sm text-white 
                                bg-green-600 shadow-lg shadow-green-600/20
                                opacity-60 cursor-not-allowed"
                    >
                      {t("follow")}
                    </button>

                    <button 
                      className="flex-1 h-10 bg-gray-100 dark:bg-[#1C1C1E] 
                                rounded-lg font-semibold text-sm 
                                text-gray-400 dark:text-gray-500 
                                cursor-not-allowed opacity-60"
                      disabled
                    >
                      {t("message_btn")}
                    </button>
                  </>
                )}
                <button className="h-10 w-10 bg-gray-100 dark:bg-[#1C1C1E] rounded-lg flex items-center justify-center text-gray-900 dark:text-white active:scale-[0.98] transition-transform">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          {isOwnProfile && followed && 
          <div className="px-4 mt-2 grid grid-cols-1 gap-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider ml-1 mt-4 mb-2">
              {t("about") || "About"}
            </h3>

            <div className="bg-gray-50 dark:bg-[#1C1C1E] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-[#2C2C2E]">
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    {t("email")}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {visitorInfo?.email || t("not_added")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    {t("phone")}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {visitorInfo?.mobile || t("not_added")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    {t("location")}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {visitorInfo?.country || t("not_specified")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                    {t("member_since")}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {visitorInfo?.created_at
                      ? new Date(visitorInfo.created_at).toLocaleDateString()
                      : t("not_added")}
                  </p>
                </div>
              </div>
            </div>
          </div>
          }
        </div>
      </MobilePageContainer>
    );
  }

  // Own profile view
  if (loading || infoLoading)
    return (
      <MobilePageContainer>
        <ProfileSkeleton />
      </MobilePageContainer>
    );

  const displayName =     user?.user_metadata?.full_name || formatName(userinfo) || userinfo?.display_name;
  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.avatar ||
    userinfo?.avatar_url ||
    null;

  const bioRaw = user?.user_metadata?.bio || "";
  const bioFormatted = formatBio(bioRaw);

  const bioTextOnly = bioRaw.replace(/(<([^>]+)>)/gi, "");
  const shortLimit = 150;
  const shouldShowToggle = bioTextOnly.length > shortLimit;

  const shortRaw = bioRaw.slice(0, shortLimit);
  const shortFormatted = formatBio(shortRaw);

  const handleProfileShare = async () => {
    const result = await shareContent({
      title: t("share_profile_title"),
      id: user?.id,
      text: t("share_profile_text"),
      route: "profile",
    });
    if (result.platform === "native") {
      console.log("✔ Shared via native bottom sheet");
    }

    if (result.platform === "web") {
      console.log("🌍 Shared via browser share dialog");
    }

    if (result.platform === "copy") {
      showToast("info", `📋 ${t("share_copy_success")}`);
    }

    if (!result.success) {
      return;
    }
    console.log("Share response is :", share);
  };

  return (
    <MobilePageContainer noPadding>
      <div className="bg-white dark:bg-black pb-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-[#2C2C2E] px-4 h-14 flex items-center justify-between">
          <span className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
            {user?.email ? user.email.split("@")[0] : t("profile")}
            <BadgeCheck size={16} className=" fill-green-500 text-white" />
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/profile/edit")}
              className="p-2 -mr-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              <Edit3 size={24} />
            </button>
            {/* <button className="p-2 -mr-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
              <MoreVertical size={24} />
            </button> */}
          </div>
        </div>

        {/* Profile Info */}
        <div className="px-4 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-24 h-24 rounded-full border-2 border-gray-200 dark:border-[#2C2C2E] p-1 mb-4">
              <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-[#1C1C1E] relative">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="avatar"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User
                      size={40}
                      className="text-gray-300 dark:text-gray-600"
                    />
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {displayName}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {/* Placeholder for role/title if available later */}
              {t("community_member")}
            </p>

            {/* Stats Row (Optional Instagram style feel) */}
            <div className="flex items-center gap-8 mt-4 mb-2">
                     <div className="text-center">
                        <span className="block font-bold text-gray-900 dark:text-white">0</span>
                        <span className="text-xs text-gray-500">Posts</span>
                     </div>
                     <div className="text-center">
                        <span className="block font-bold text-gray-900 dark:text-white">0</span>
                        <span className="text-xs text-gray-500">Followers</span>
                     </div>
                     <div className="text-center">
                        <span className="block font-bold text-gray-900 dark:text-white">0</span>
                        <span className="text-xs text-gray-500">Following</span>
                     </div>
            </div>

            {/* Bio Section */}
            <div className="mt-4 text-sm text-gray-700 dark:text-gray-300 max-w-md w-full text-left px-2">
              {bioRaw ? (
                <>
                  <div
                    className="whitespace-pre-wrap leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        showMore || !shouldShowToggle
                          ? bioFormatted
                          : shortFormatted +
                            (bioTextOnly.length > shortLimit ? "..." : ""),
                    }}
                  />
                  {shouldShowToggle && (
                    <button
                      onClick={() => setShowMore(!showMore)}
                      className="mt-1 text-gray-500 dark:text-gray-400 font-medium"
                    >
                      {showMore ? t("show_less") : t("show_more")}
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => router.push("/profile/edit")}
                  className="text-gray-400 italic hover:text-green-600 w-full text-center"
                >
                  {t("add_bio_placeholder") || "Add a bio to your profile"}
                </button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full mt-6 px-2">
              <button
                onClick={() => router.push("/profile/edit")}
                className="flex-1 h-10 bg-gray-100 dark:bg-[#1C1C1E] rounded-lg font-semibold text-sm text-gray-900 dark:text-white active:scale-[0.98] transition-transform"
              >
                {t("edit_profile")}
              </button>
              <button
                className="flex-1 h-10 bg-gray-100 dark:bg-[#1C1C1E] rounded-lg font-semibold text-sm text-gray-900 dark:text-white active:scale-[0.98] transition-transform"
                onClick={handleProfileShare}
              >
                {t("share_profile")}
              </button>
            </div>
          </div>
        </div>

        {/* Details Section */}

        <div className="px-4 mt-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider ml-1 mt-4 mb-2">
            {t("details") || "Details"}
          </h3>
          <div className="bg-gray-50 dark:bg-[#1C1C1E] rounded-2xl overflow-hidden divide-y divide-gray-100 dark:divide-[#2C2C2E]">
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                  {t("email")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                  {t("phone")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.user_metadata?.phone || t("not_added")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                  {t("location")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.user_metadata?.location || t("not_specified")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#2C2C2E] flex items-center justify-center text-gray-500 dark:text-gray-400">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wide">
                  {t("member_since")}
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobilePageContainer>
  );
}
