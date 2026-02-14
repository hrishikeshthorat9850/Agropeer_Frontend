"use client";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useLogin } from "@/Context/logincontext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Heart,
  Sprout,
  ChevronRight,
  X,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { formatName } from "@/utils/formatName";
import { useLanguage } from "@/Context/languagecontext";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { useTheme } from "@/Context/themecontext";
// ADDITIVE ENHANCEMENT: Import forward page transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
// NOTE: Logout redirect intentionally uses router.push() (no transition needed)
import { usePageTransition } from "@/hooks/usePageTransition";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function UserSidebar({ onClose } = {}) {
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get forward transition handlers
  // Original router.push() still available, this adds smooth transitions
  // NOTE: Logout redirect intentionally uses router.push() (no transition needed)
  const { push } = usePageTransition();
  const { user, loading, userinfo } = useLogin();
  const { t } = useLanguage();
  const [infoLoading, setInfoLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useBackPress(
    () => {
      // This component is mounted via portal only when open,
      // so we can just call onClose if it's mounted.
      if (typeof onClose === "function") {
        onClose();
        return true;
      }
      return false;
    },
    20,
    true,
  );

  useEffect(() => {
    console.log("User is :", user);
    console.log("Userinfo is :", userinfo);
    console.log(
      "Google Avatar Url is :",
      user?.identities[0]?.identity_data?.avatar_url,
    );
  });

  useEffect(() => {
    setMounted(true);
    if (!loading) setInfoLoading(false);
    return () => setMounted(false);
  }, [loading]);

  useEffect(() => {
    // Lock scroll on mount
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.dataset.lockScrollY = scrollY;

    // Cleanup (when component unmounts)
    return () => {
      // Unlock scroll
      const scrollY = document.body.dataset.lockScrollY || "0";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    };
  }, []);

  const { theme } = useTheme();

  // Haptic Helper
  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {
      // Ignore on web
    }
  };

  useEffect(() => {
    // Only run on native platform
    if (!Capacitor.isNativePlatform()) return;

    const updateStatusBar = async () => {
      // Sidebar always has a dark/green header at the top.
      // We want White Icons (Style.Dark).
      // Explicitly set Green background to match header and avoid "white status bar" glitch.
      try {
        await StatusBar.setStyle({ style: Style.Dark });
        if (Capacitor.getPlatform() === "android") {
          await StatusBar.setBackgroundColor({ color: "#16a34a" }); // Green-600
          await StatusBar.setOverlaysWebView({ overlay: true });
        }
      } catch (e) {
        console.error("StatusBar open error:", e);
      }
    };

    updateStatusBar();

    return () => {
      // Cleanup: Reset to theme defaults when unmounting
      const resetStatusBar = async () => {
        try {
          if (theme === "dark") {
            await StatusBar.setStyle({ style: Style.Dark });
            if (Capacitor.getPlatform() === "android") {
              await StatusBar.setBackgroundColor({ color: "#000000" });
            }
          } else {
            // Light Mode: Black Icons, White Background
            await StatusBar.setStyle({ style: Style.Light });
            if (Capacitor.getPlatform() === "android") {
              await StatusBar.setBackgroundColor({ color: "#ffffff" });
            }
          }
        } catch (e) {
          console.error("StatusBar cleanup error:", e);
        }
      };
      resetStatusBar();
    };
  }, [theme]);

  const handleLogout = async () => {
    triggerHaptic();
    try {
      if (supabase?.auth?.signOut) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/login");
      if (typeof onClose === "function") onClose();
    }
  };

  const displayName =
    user?.user_metadata?.full_name ||
    formatName(userinfo) ||
    userinfo?.display_name;

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.avatar ||
    userinfo?.avatar_url ||
    null;

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] overflow-hidden">
        {/* Backdrop (Blur) */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Sidebar Container */}
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white dark:bg-[#1C1C1E] shadow-2xl flex flex-col pointer-events-auto"
        >
          {/* Header Section */}
          <div className="relative h-[180px] bg-gradient-to-br from-green-600 to-emerald-800 p-6 pt-safe-top flex flex-col justify-end text-white">
            {/* <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button> */}

            {user?.id ? (
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border-4 border-white/20 shadow-lg overflow-hidden bg-white/10 shrink-0">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt="avatar"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/10">
                      <User size={32} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-lg leading-tight truncate">
                    {displayName || "User"}
                  </h3>
                  <p className="text-sm text-green-100 truncate opacity-90">
                    {user?.email || t("no_email")}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-2xl">AgroPeer</h3>
                {/* <p className="text-sm text-green-100 opacity-90">
                  {t("welcome_guest") || "Welcome, Guest!"}
                </p> */}
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 pb-24">
            {user?.id ? (
              <>
                <SidebarItem
                  icon={User}
                  label={t("my_profile")}
                  onClick={() => {
                    triggerHaptic();
                    // ENHANCED: Use push() with smooth transition instead of router.push()
                    // PRESERVED: All other behavior unchanged (haptics, onClose, etc.)
                    push("/profile");
                    if (typeof onClose === "function") onClose();
                  }}
                />
                <SidebarItem
                  icon={Settings}
                  label={t("settings")}
                  onClick={() => {
                    triggerHaptic();
                    // ENHANCED: Use push() with smooth transition instead of router.push()
                    // PRESERVED: All other behavior unchanged
                    push("/settings");
                    if (typeof onClose === "function") onClose();
                  }}
                />
              </>
            ) : null}

            <SidebarItem
              icon={HelpCircle}
              label={t("help_support")}
              onClick={() => {
                triggerHaptic();
                // ENHANCED: Use push() with smooth transition instead of router.push()
                // PRESERVED: All other behavior unchanged
                push("/help");
                if (typeof onClose === "function") onClose();
              }}
            />

            {!user?.id && (
              <div className="mt-8 px-4 space-y-3">
                <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20 text-center mb-6">
                  <p className="text-sm text-green-800 dark:text-green-400 mb-3 font-medium">
                    {t("join_community")}
                  </p>
                </div>
                <Link
                  href="/login"
                  onClick={() => {
                    triggerHaptic();
                    typeof onClose === "function" && onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/20 transition-all active:scale-[0.98]"
                >
                  <Heart size={18} fill="currentColor" />
                  {t("login")}
                </Link>
                <Link
                  href="/signup"
                  onClick={() => {
                    triggerHaptic();
                    typeof onClose === "function" && onClose();
                  }}
                  className="w-full flex items-center justify-center gap-2 h-12 bg-white dark:bg-[#2C2C2E] border-2 border-green-100 dark:border-[#3A3A3C] text-green-700 dark:text-green-400 font-semibold rounded-xl transition-all active:scale-[0.98]"
                >
                  <Sprout size={18} />
                  {t("signup")}
                </Link>
              </div>
            )}
          </div>

          {/* Footer / Logout */}
          {user?.id && (
            <div className="p-4 border-t border-gray-100 dark:border-[#2C2C2E] bg-gray-50/50 dark:bg-black/20 pb-safe-area-bottom">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
              >
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                  <LogOut size={20} />
                </div>
                <span className="font-semibold">
                  {t("logout_button") || "Sign Out"}
                </span>
              </button>
              {/* <div className="text-center mt-4">
                        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-widest font-semibold">
                            AgroPeer v1.0
                        </p>
                    </div> */}
            </div>
          )}
        </motion.aside>
      </div>
    </AnimatePresence>,
    document.body,
  );
}

function SidebarItem({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2C2C2E] transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gray-100 dark:bg-[#2C2C2E] rounded-lg group-hover:bg-white dark:group-hover:bg-[#3A3A3C] shadow-sm transition-colors text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500">
          <Icon size={20} strokeWidth={2} />
        </div>
        <span className="font-medium text-[15px]">{label}</span>
      </div>
      <ChevronRight
        size={16}
        className="text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400"
      />
    </button>
  );
}
