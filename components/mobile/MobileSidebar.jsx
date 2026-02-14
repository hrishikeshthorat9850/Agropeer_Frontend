"use client";

import { useTheme } from "@/Context/themecontext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLeaf,
  FaQuestionCircle,
  FaComments,
  FaStar,
  FaSeedling,
  FaHeart,
  FaCog,
  FaUser,
  FaChevronRight,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import { useLogin } from "@/Context/logincontext";
import { useLanguage } from "@/Context/languagecontext";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();

  // ✅ Handle Android Back Press
  useBackPress(
    () => {
      if (open) {
        setOpen(false);
        return true;
      }
      return false;
    },
    20,
    open,
  );

  const { theme } = useTheme();
  const { user } = useLogin();
  // Haptic Helper
  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {
      // Ignore on web
    }
  };

  // Logic preserved: Overlay styling for capacitor
  useEffect(() => {
    if (typeof window !== "undefined" && window.Capacitor) {
      StatusBar.setOverlaysWebView({ overlay: true });
    }
  }, []);

  // Listen for open event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-mobile-sidebar", handler);
    return () => window.removeEventListener("open-mobile-sidebar", handler);
  }, []);

  useEffect(() => {
    if (open) {
      // Lock scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.lockScrollY = scrollY;
    } else {
      // Unlock scroll
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    }

    // Cleanup (when component unmounts)
    return () => {
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    };
  }, [open]);

  useEffect(() => {
    // Only run on native platform
    if (!Capacitor.isNativePlatform()) return;

    const updateStatusBar = async () => {
      if (open) {
        // Sidebar OPEN:
        // We want the Green Gradient Header to show, so we match the green color or use transparent
        // User reported "full white", so explicit Green matches the header start color (green-600 is #16a34a)
        try {
          await StatusBar.setStyle({ style: Style.Dark }); // White Icons
          if (Capacitor.getPlatform() === "android") {
            // Set color to match from-green-600
            await StatusBar.setBackgroundColor({ color: "#16a34a" });
            await StatusBar.setOverlaysWebView({ overlay: true });
          }
        } catch (e) {
          console.error("StatusBar error:", e);
        }
      } else {
        // Sidebar CLOSED: Revert to theme
        try {
          if (theme === "dark") {
            // Dark Mode: Dark Background, White Icons (Style.Dark)
            await StatusBar.setStyle({ style: Style.Dark });
            if (Capacitor.getPlatform() === "android") {
              await StatusBar.setBackgroundColor({ color: "#000000" }); // Black
            }
          } else {
            // Light Mode: Light Background, Dark Icons (Style.Light)
            await StatusBar.setStyle({ style: Style.Light });
            if (Capacitor.getPlatform() === "android") {
              await StatusBar.setBackgroundColor({ color: "#ffffff" }); // White
            }
          }
        } catch (e) {
          console.error("StatusBar close error:", e);
        }
      }
    };

    updateStatusBar();
  }, [open, theme]);

  const MENU_ITEMS = [
    { href: "/about-us", label: t("about_us"), icon: <FaLeaf /> },
    {
      href: "/how-it-works",
      label: t("how_it_works"),
      icon: <FaSeedling />,
    },
    { href: "/help", label: t("help_center"), icon: <FaQuestionCircle /> },
    { href: "/farming-tips", label: t("farming_tips"), icon: <FaLeaf /> },
    { href: "/expert-advice", label: t("expert_advice"), icon: <FaComments /> },
    // { href: "/reviews", label: "Reviews", icon: <FaStar /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* LEFT SIDEBAR - MATCHING USER PROFILE SIDEBAR */}
          <motion.div
            className="fixed top-0 left-0 h-full w-[85%] max-w-[300px] 
              bg-white dark:bg-[#1C1C1E] z-[9999] shadow-2xl flex flex-col overflow-hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.2, ease: "easeOut" }}
          >
            {/* HEADER - GREEN GRADIENT */}
            <div className="relative px-8 h-[180px] pt-safe-top pb-8 flex justify-between items-end z-10 bg-gradient-to-br from-green-600 to-emerald-800 text-white">
              <div>
                <h2 className="text-2xl font-bold text-white">AgroPeer</h2>
                <p className="text-xs text-green-100/80 tracking-wider uppercase mt-1">
                  {t("sidebar_subtitle")}
                </p>
              </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide z-10">
              {/* Main Menu */}
              <nav className="space-y-1">
                {MENU_ITEMS.map((it, i) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => {
                      triggerHaptic();
                      setOpen(false);
                    }}
                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2C2C2E] transition-all group"
                  >
                    <span
                      className="
                      p-2 rounded-lg 
                      bg-gray-100 dark:bg-[#2C2C2E] 
                      flex items-center justify-center 
                      text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-500
                      group-hover:bg-white dark:group-hover:bg-[#3A3A3C] shadow-sm transition-colors
                    "
                    >
                      {it.icon}
                    </span>
                    <span className="text-[15px] font-medium">{it.label}</span>
                    <FaChevronRight
                      className="ml-auto text-gray-300 dark:text-gray-600 group-hover:text-gray-500"
                      size={12}
                    />
                  </Link>
                ))}
              </nav>

              {/* Access Hub Items */}
                <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-[#2C2C2E]">
                  <div className="px-2">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                      {t("quick_access")}
                    </h4>
                  </div>

                  <div className="grid gap-3">
                    {user && 
                    <SidebarCard
                      href="/favorites"
                      icon={<FaHeart />}
                      label={t("sidebar_favorites")}
                      sub={t("sidebar_favorites_sub")}
                      color="from-rose-500 to-pink-600"
                      iconColor="text-white"
                      setOpen={setOpen}
                      triggerHaptic={triggerHaptic}
                    />
                    }
                    <SidebarCard
                      href="/settings"
                      icon={<FaCog />}
                      label={t("sidebar_settings")}
                      sub={t("sidebar_settings_sub")}
                      color="from-indigo-500 to-violet-600"
                      iconColor="text-white"
                      setOpen={setOpen}
                      triggerHaptic={triggerHaptic}
                    />
                    {user && 
                    <SidebarCard
                      href="/profile"
                      icon={<FaUser />}
                      label={t("sidebar_profile")}
                      sub={t("sidebar_profile_sub")}
                      color="from-emerald-500 to-teal-600"
                      iconColor="text-white"
                      setOpen={setOpen}
                      triggerHaptic={triggerHaptic}
                    /> }
                  </div>
                </div>

            </div>

            {/* FOOTER SOCIALS */}
            <div className="px-8 py-6 border-t border-gray-100 dark:border-[#2C2C2E] bg-gray-50/50 dark:bg-black/20 z-10">
              <div className="flex justify-between items-center gap-4 px-2">
                <SocialIcon
                  href="https://www.facebook.com/profile.php?id=61584709015575"
                  icon={<FaFacebookF />}
                  hover="hover:text-[#1877F2]"
                  triggerHaptic={triggerHaptic}
                />
                <SocialIcon
                  href="https://chat.whatsapp.com/HRVHJXmrX6Q6gv07wnw1e3?mode=wwt"
                  icon={<FaWhatsapp />}
                  hover="hover:text-[#25D366]"
                  triggerHaptic={triggerHaptic}
                />
                <SocialIcon
                  href="https://www.instagram.com/agro_peer/"
                  icon={<FaInstagram />}
                  hover="hover:text-[#d62976]"
                  triggerHaptic={triggerHaptic}
                />
                <SocialIcon
                  href="https://youtube.com/@agropeer"
                  icon={<FaYoutube />}
                  hover="hover:text-[#FF0000]"
                  triggerHaptic={triggerHaptic}
                />
              </div>
              <div className="text-center mt-4">
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
                  {t("made_with_love")}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Sub-components for cleaner code
const SidebarCard = ({
  href,
  icon,
  label,
  sub,
  color,
  iconColor,
  setOpen,
  triggerHaptic,
}) => (
  <Link
    href={href}
    onClick={() => {
      if (triggerHaptic) triggerHaptic();
      setOpen(false);
    }}
    className={`
        relative overflow-hidden group
        flex items-center justify-between
        p-4 rounded-2xl
        bg-gradient-to-br ${color}
        shadow-md
        transition-all duration-300
        active:scale-[0.98]
      `}
  >
    <div className="flex items-center gap-4 z-10">
      <div
        className={`
             w-10 h-10 rounded-full 
             bg-white/20 backdrop-blur-sm 
             flex items-center justify-center 
             ${iconColor} text-lg
             shadow-inner
          `}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-white leading-tight">{label}</h4>
        <p className="text-[11px] text-white/80">{sub}</p>
      </div>
    </div>

    <FaChevronRight className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all text-xs z-10" />

    {/* Hover Glow */}
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Link>
);

const SocialIcon = ({ href, icon, hover, triggerHaptic }) => (
  <a
    href={href}
    onClick={triggerHaptic}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 flex items-center justify-center text-black dark:text-white/70 shadow-sm transition-all duration-300 hover:bg-white hover:scale-110 hover:shadow-md ${hover}`}
  >
    {icon}
  </a>
);
