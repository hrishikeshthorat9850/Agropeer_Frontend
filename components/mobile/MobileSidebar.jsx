"use client";

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

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

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
    if (open) {
      // Sidebar OPEN → white text/icons
      StatusBar.setStyle({ style: Style.Dark });
    } else {
      // Sidebar CLOSED → black text/icons
      StatusBar.setStyle({ style: Style.Dark });
    }
  }, [open]);
  const MENU_ITEMS = [
    { href: "/about-us", label: "About Us", icon: <FaLeaf /> },
    {
      href: "/how-it-works",
      label: "How AgroPeer Works",
      icon: <FaSeedling />,
    },
    { href: "/help", label: "Help Center", icon: <FaQuestionCircle /> },
    { href: "/farming-tips", label: "Farming Tips", icon: <FaLeaf /> },
    { href: "/expert-advice", label: "Expert Advice", icon: <FaComments /> },
    // { href: "/reviews", label: "Reviews", icon: <FaStar /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* LEFT SIDEBAR - PREMIUM GLASS DESIGN */}
          <motion.div
            className="fixed left-0 top-0 w-[85%] max-w-[320px] h-[100dvh]
              bg-farm-700/90 backdrop-blur-3xl
              text-white z-[9999] 
              rounded-r-[40px] 
              shadow-[10px_0_40px_rgba(0,0,0,0.5)]
              border-r border-white/10
              flex flex-col 
              overflow-hidden
            "
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Gradient Orb Effects */}
            <div className="absolute top-[-10%] left-[-20%] w-[400px] h-[300px] bg-green-950/60 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[350px] bg-green-950/60 rounded-full blur-[60px] pointer-events-none" />

            {/* HEADER */}
            <div className="relative px-8 pt-12 pb-8 flex justify-between items-center z-10">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  AgroPeer
                </h2>
                <p className="text-xs text-white/50 tracking-wider uppercase mt-1">
                  Farming Companion
                </p>
              </div>
              {/* <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 active:scale-90 transition-transform"
              >
                <FaTimes size={14} />
              </button> */}
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-8 scrollbar-hide z-10">
              {/* Main Menu */}
              <nav className="space-y-2">
                {MENU_ITEMS.map((it, i) => (
                  <Link
                    key={it.href}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 py-3.5 px-4 rounded-2xl group hover:bg-white/5 active:bg-white/10 transition-colors"
                  >
                    <span
                      className="
                      w-10 h-10 rounded-xl bg-white/5 
                      flex items-center justify-center 
                      text-white/70 group-hover:text-white group-hover:bg-white/10
                      group-hover:scale-110 transition-all duration-300
                      shadow-sm
                    "
                    >
                      {it.icon}
                    </span>
                    <span className="text-[15px] font-medium text-white/90 group-hover:text-white tracking-wide">
                      {it.label}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Access Hub Items */}
              <div className="space-y-4">
                <div className="px-2">
                  <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
                    Quick Access
                  </h4>
                </div>

                <div className="grid gap-3">
                  <SidebarCard
                    href="/favorites"
                    icon={<FaHeart />}
                    label="Favorites"
                    sub="Saved Items"
                    color="from-rose-500/20 to-pink-500/20"
                    iconColor="text-rose-400"
                    setOpen={setOpen}
                  />
                  <SidebarCard
                    href="/settings"
                    icon={<FaCog />}
                    label="Settings"
                    sub="App Preferences"
                    color="from-indigo-500/20 to-violet-500/20"
                    iconColor="text-indigo-400"
                    setOpen={setOpen}
                  />
                  <SidebarCard
                    href="/profile"
                    icon={<FaUser />}
                    label="Profile"
                    sub="My Account"
                    color="from-emerald-500/20 to-teal-500/20"
                    iconColor="text-emerald-400"
                    setOpen={setOpen}
                  />
                </div>
              </div>
            </div>

            {/* FOOTER SOCIALS */}
            <div className="px-8 py-4 border-t border-white/5 bg-black/20 backdrop-blur-md z-10">
              <div className="flex justify-between items-center gap-4 px-2">
                <SocialIcon
                  href="https://www.facebook.com/profile.php?id=61584709015575"
                  icon={<FaFacebookF />}
                  hover="hover:text-[#1877F2]"
                />
                <SocialIcon
                  href="https://chat.whatsapp.com/HRVHJXmrX6Q6gv07wnw1e3?mode=wwt"
                  icon={<FaWhatsapp />}
                  hover="hover:text-[#25D366]"
                />
                <SocialIcon
                  href="https://www.instagram.com/agro_peer/"
                  icon={<FaInstagram />}
                  hover="hover:text-[#d62976]"
                />
                <SocialIcon
                  href="https://youtube.com/@agropeer"
                  icon={<FaYoutube />}
                  hover="hover:text-[#FF0000]"
                />
              </div>
              <div className="text-center mt-6">
                <p className="text-[10px] text-white/20 font-medium">
                  Made with ❤️ for Farmers
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
const SidebarCard = ({ href, icon, label, sub, color, iconColor, setOpen }) => (
  <Link
    href={href}
    onClick={() => setOpen(false)}
    className={`
        relative overflow-hidden group
        flex items-center justify-between
        p-4 rounded-3xl
        bg-gradient-to-br ${color}
        border border-white/5 hover:border-white/10
        transition-all duration-300
        active:scale-[0.98]
      `}
  >
    <div className="flex items-center gap-4 z-10">
      <div
        className={`
             w-10 h-10 rounded-full 
             bg-white/10 backdrop-blur-md 
             flex items-center justify-center 
             ${iconColor} text-lg
             shadow-inner
          `}
      >
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-white leading-tight">{label}</h4>
        <p className="text-[11px] text-white/50">{sub}</p>
      </div>
    </div>

    <FaChevronRight className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all text-xs z-10" />

    {/* Hover Glow */}
    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </Link>
);

const SocialIcon = ({ href, icon, hover }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`
       w-10 h-10 rounded-2xl 
       bg-white/5 border border-white/5
       flex items-center justify-center 
       text-white/40 transition-all duration-300
       hover:bg-white/10 hover:scale-110 hover:shadow-lg hover:shadow-white/5
       ${hover}
    `}
  >
    {icon}
  </a>
);
