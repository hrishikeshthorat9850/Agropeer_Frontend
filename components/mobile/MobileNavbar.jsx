"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaBell,
  FaComments,
  FaSeedling,
  FaLanguage,
} from "react-icons/fa";
import Link from "next/link";
import NotificationBadge from "../chat/NotificationBadge";
import { useLogin } from "@/Context/logincontext";
import { useNotifications } from "@/hooks/useNotifications";
import { useUnreadMessagesCount } from "@/hooks/useUnreadMessagesCount";
import { useLanguage } from "@/Context/languagecontext";
import ProfileModal from "@/components/ProfileModal";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNavbar() {
  const { user } = useLogin();
  const unreadChats = useUnreadMessagesCount();
  const { unreadCount: unreadNotifications } = useNotifications(user?.id, 5);

  const { locale, setLocale, LOCALE_NAMES, SUPPORTED_LOCALES } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const locales =
    SUPPORTED_LOCALES?.length > 0
      ? SUPPORTED_LOCALES
      : Object.keys(LOCALE_NAMES || {});

  const openSidebar = () =>
    window.dispatchEvent(new CustomEvent("open-mobile-sidebar"));

  return (
    <div
      className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-[#2E7D32] to-[#E8F5E9]
      dark:bg-white/10 backdrop-blur-2xl dark:border-white/10"
      style={{
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div
        className="
          flex items-center justify-between 
          py-2 px-2
        "
      >
        {/* MENU / SIDEBAR BUTTON */}
        <button 
          onClick={openSidebar} 
          className="p-2 active:scale-95 transition"
        >
          <FaBars className="text-[22px] text-green-700 dark:text-white" />
        </button>

        {/* LOGO + TITLE */}
        <div className="flex items-center gap-1">
          <div className="
            w-7 h-7 rounded-xl 
            bg-gradient-to-br from-green-500 to-green-700 
            flex items-center justify-center text-white shadow-md
          ">
            <FaSeedling className="text-sm" />
          </div>

          <span className="text-green-800 dark:text-white font-bold text-xl tracking-tight">
            AgroPeer
          </span>
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-1.5">

          {/* Notifications */}
          {user && (
            <Link href="/notifications" className="relative p-2 active:scale-95">
              <FaBell className="text-[20px] text-green-700 dark:text-white" />
              {unreadNotifications > 0 && (
                <div className="absolute -top-2 -right-1">
                  <NotificationBadge unreadCount={unreadNotifications} />
                </div>
              )}
            </Link>
          )}

          {/* Chats */}
          <Link href="/chats" className="relative p-2 active:scale-95">
            <FaComments className="text-[20px] text-green-700 dark:text-white" />
            {unreadChats > 0 && (
              <div className="absolute -top-2 -right-1">
                <NotificationBadge unreadCount={unreadChats} />
              </div>
            )}
          </Link>

          {/* LANGUAGE DROPDOWN */}
          <div ref={langRef} className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 active:scale-95"
            >
              <FaLanguage className="text-[27px] text-green-700 dark:text-white" />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="
                    absolute right-0 mt-2 w-44 p-2 
                    rounded-xl shadow-xl border 
                    bg-green-700 dark:bg-[#1a1a1a]/90 
                    backdrop-blur-xl 
                    border-gray-200 dark:border-white/10
                  "
                >
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLocale(l);
                        setLangOpen(false);
                      }}
                      className={`
                        w-full px-4 py-2 text-left rounded-lg
                        transition active:scale-95
                        hover:bg-green-100 dark:hover:bg-white/10
                        ${l === locale ? "bg-green-200 dark:bg-white/20 font-semibold" : ""}
                      `}
                    >
                      {LOCALE_NAMES[l] || l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE MODAL */}
          <ProfileModal className="!text-green-700 dark:!text-white" />
        </div>
      </div>
    </div>
  );
}
