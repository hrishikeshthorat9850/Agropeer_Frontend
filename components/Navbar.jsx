"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaSeedling, FaBell, FaChevronDown, FaBars, FaPlus, FaHeart, FaComments, FaCog, FaLeaf, FaNewspaper, FaTractor, FaCloudSun, FaBullhorn, FaVideo, FaGlobe, FaImages, FaLanguage } from "react-icons/fa";
import SearchBar from "./SearchBar";
import ProfileModal from "@/components/ProfileModal";
import NotificationBadge from "./chat/NotificationBadge";
import { useLanguage } from "@/Context/languagecontext";
import { useUnreadMessagesCount } from "@/hooks/useUnreadMessagesCount";
import { useNotifications } from "@/hooks/useNotifications";
import { useLogin } from "@/Context/logincontext";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
export default function Navbar() {
  // const [catOpen, setCatOpen] = useState(false);
  const [langOpenDesktop, setLangOpenDesktop] = useState(false);
  const [langOpenMobile, setLangOpenMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale, SUPPORTED_LOCALES, LOCALE_NAMES } = useLanguage();
  const { user } = useLogin();
  const { unreadCount: notificationsUnreadCountFromHook } = useNotifications(user?.id, 5);
  const [notificationsUnreadCount, setNotificationsUnreadCount] = useState(0);
  const langRefDesktop = useRef(null);
  const langRefMobile = useRef(null);
  const mobileMenuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Use the hook that properly fetches unread messages count from database
  const totalUnread = useUnreadMessagesCount();
  
  // Fetch total unread notifications count from database (not limited to 5)
  useEffect(() => {
    if (!user?.id) {
      setNotificationsUnreadCount(0);
      return;
    }

    async function fetchTotalUnreadNotifications() {
      try {
        const { count, error } = await supabase
          .from("notifications")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("seen", false);

        if (error) {
          // If table doesn't exist, set to 0
          if (error.code === '42P01' || error.message.includes('does not exist')) {
            setNotificationsUnreadCount(0);
            return;
          }
          console.error("Error fetching unread notifications count:", error);
          return;
        }

        setNotificationsUnreadCount(count ?? 0);
      } catch (err) {
        console.error("Error in fetchTotalUnreadNotifications:", err);
      }
    }

    fetchTotalUnreadNotifications();

    // Set up real-time subscription to update count when notifications change
    const channel = supabase
      .channel(`navbar-notifications:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          // Increment count when new notification is inserted
          setNotificationsUnreadCount((prev) => prev + 1);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Update count when notification seen status changes
          if (payload.new.seen && !payload.old.seen) {
            setNotificationsUnreadCount((prev) => Math.max(0, prev - 1));
          } else if (!payload.new.seen && payload.old.seen) {
            setNotificationsUnreadCount((prev) => prev + 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  useEffect(() => {
    function isNode(el) {
      return !!el && typeof el.contains === "function";
    }

    function onDocClick(e) {
      try {
        // DESKTOP LANG
        const langDeskNode = langRefDesktop.current;
        if (isNode(langDeskNode) && !langDeskNode.contains(e.target)) {
          setLangOpenDesktop(false);
        }

        // MOBILE LANG
        const langMobileNode = langRefMobile.current;
        if (isNode(langMobileNode) && !langMobileNode.contains(e.target)) {
          setLangOpenMobile(false);
        }

        // MOBILE MENU (close when clicking outside both menu and menu button)
        const mobileNode = mobileMenuRef.current;
        const menuBtnNode = menuButtonRef.current;
        const mobileNodeIsNode = isNode(mobileNode);
        const menuBtnIsNode = isNode(menuBtnNode);

        const clickOutsideMobile =
          (mobileNodeIsNode && !mobileNode.contains(e.target)) &&
          (menuBtnIsNode && !menuBtnNode.contains(e.target));

        if ((mobileNodeIsNode || menuBtnIsNode) && clickOutsideMobile) {
          setMobileOpen(false);
        }
      } catch (err) {
        console.error("onDocClick handler error:", err);
      }
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // NAV links use translation via t()
  const NAV_LINKS = [
    { href: "/posts", label: t("posts") || "Posts", icon: <FaImages /> },
    { href: "/news", label: t("news") || "News", icon: <FaNewspaper /> },
    { href: "/government-schemes", label: t("government_schemes") || "Schemes", icon: <FaBullhorn /> },
    { href: "/market", label: t("market") || "Market", icon: <FaTractor /> },
    { href: "/milk-rate-calculator", label: t("milk_rate_calculator") || "Milk Rate", icon: <FaGlobe /> },
    { href: "/reels", label: t("reels") || "Reels", icon: <FaVideo /> },
    { href: "/explore", label: t("explore") || "Explore", icon: <FaLeaf /> },
    { href: "/weather", label: t("weather") || "Weather", icon: <FaCloudSun /> },
  ];

  // ensure supported locales for dropdown (fallback to LOCALE_NAMES keys)
  const availableLocaleKeys = SUPPORTED_LOCALES && SUPPORTED_LOCALES.length ? SUPPORTED_LOCALES : Object.keys(LOCALE_NAMES || {});

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
      className="hidden md:block safe-area-top w-full max-w-[100vw] bg-gradient-to-r from-farm-800 via-farm-700 to-farm-800 border-b border-farm-600 shadow-farm fixed left-0 z-50 backdrop-blur-md"
    >
      {/* ===== Top Navbar ===== */}
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 w-full gap-1 sm:gap-0">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center gap-1 group">
            <motion.div
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FaSeedling className="text-3xl text-farm-200 group-hover:text-farm-100 transition-colors" />
            </motion.div>
            <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-farm-100 transition-colors">
              AgroPeer
            </span>
          </Link>
        </motion.div>

        {/* Mobile Right Section */}
        <div className="flex items-center gap-1 sm:hidden">
          {user && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/notifications"
                className="relative p-3 rounded-xl hover:bg-farm-600/20 transition-colors group"
              >
                <FaBell className="text-xl text-farm-100 group-hover:text-farm-50 transition-colors" />

                {notificationsUnreadCount > 0 && (
                  <div className="absolute -top-1 -right-1">
                  <NotificationBadge
                    unreadCount={notificationsUnreadCount}
                  />
                  </div>
                )}
              </Link>
            </motion.div>
          )}
          <Link href="/chats" className="relative p-3 pl-1 rounded-xl hover:bg-farm-600/20 transition-colors group">
            <FaComments className="text-xl text-farm-100 group-hover:text-farm-50 transition-colors" />
            <NotificationBadge unreadCount={totalUnread} />
          </Link>

          {/* Language Dropdown Mobile */}
          <div ref={langRefMobile} className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLangOpenMobile((o) => !o)}
              className="relative py-3 pr-1 rounded-xl hover:bg-farm-600/20 transition-colors group"
              aria-haspopup="true"
              aria-expanded={langOpenMobile}
            >
              {/* {LOCALE_NAMES[locale] || "Lang"} <FaChevronDown className="ml-1 text-xs" /> */}
              <FaLanguage size={28} className="text-xl text-farm-100 group-hover:text-farm-50 transition-colors" />
            </motion.button>

            <AnimatePresence>
              {langOpenMobile && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white/90 backdrop-blur-md text-farm-800 border border-farm-200 rounded-xl shadow-farm z-50 w-40 dark:bg-farm-600/80 dark:text-white dark:border-none"
                >
                  {availableLocaleKeys.map((l) => (
                    <motion.button
                      key={l}
                      whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                      onClick={() => {
                        setLocale(l);
                        setLangOpenMobile(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-farm-100 transition-colors rounded-lg mx-1 my-1"
                    >
                      {/* Language Name (Marathi / Hindi / English) */}
                      {LOCALE_NAMES[l] || l}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/sell/choose"
              className="flex items-center gap-2 px-3 py-2 sunset-gradient text-white rounded-xl hover:shadow-sunset text-xs font-semibold transition-all duration-300"
            >
              <FaPlus className="text-xs" /> {t("sell") || "SELL"}
            </Link>
          </motion.div>

          {/* Profile Modal Mobile */}
          <ProfileModal />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <div className="w-full max-w-3xl">
            <SearchBar inline />
          </div>
        </div>

        {/* Desktop Right Icons */}
        <div className="hidden sm:flex items-center gap-3 ml-auto">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/favorites" className="p-3 rounded-xl hover:bg-farm-600/20 transition-colors group">
              <FaHeart className="text-xl text-farm-100 group-hover:text-farm-50 transition-colors" />
            </Link>
          </motion.div>
          {user && (
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link
                href="/notifications"
                className="
                  flex items-center justify-center
                  relative
                  h-12 w-12
                  rounded-xl
                  hover:bg-farm-600/20
                  transition-colors
                  group
                "
              >
                <FaBell className="text-xl text-farm-100 group-hover:text-farm-50 transition-colors" />

                {notificationsUnreadCount > 0 && (
                  <NotificationBadge unreadCount={notificationsUnreadCount} />
                )}
              </Link>
            </motion.div>
          )}
          <Link href="/chats" className="relative py-3 pr-3 rounded-xl hover:bg-farm-600/20 transition-colors group">
            <FaComments className="text-xl text-farm-100 group-hover:text-farm-50 transition-colors" />
            <div>
              
            </div>
            <NotificationBadge unreadCount={totalUnread}/>
          </Link>

          {/* Language Dropdown Desktop */}
          <div ref={langRefDesktop} className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLangOpenDesktop((o) => !o)}
              className="flex items-center px-4 py-2 rounded-xl text-sm bg-farm-600/80 text-white border border-farm-500 hover:bg-farm-600 transition-all duration-300 backdrop-blur-sm"
              aria-haspopup="true"
              aria-expanded={langOpenDesktop}
            >
              {LOCALE_NAMES[locale] || "Language"} <FaChevronDown className="ml-2 text-xs" />
            </motion.button>
            <AnimatePresence>
              {langOpenDesktop && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 bg-white/90 backdrop-blur-md text-farm-800 border border-farm-200 rounded-xl shadow-farm z-50 w-44 dark:bg-farm-600/80 dark:text-white dark:border-none"
                >
                  {availableLocaleKeys.map((l) => (
                    <motion.button
                      key={l}
                      whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                      onClick={() => {
                        setLocale(l);
                        setLangOpenDesktop(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-farm-100 transition-colors rounded-lg mx-1 my-1"
                    >
                      {LOCALE_NAMES[l] || l}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/sell/choose"
              className="ml-2 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-xl hover:shadow-sunset text-sm font-semibold transition-all duration-300"
            >
              <FaPlus className="text-sm" /> {t("sell") || "SELL"}
            </Link>
          </motion.div>

          {/* Profile Modal Desktop */}
          <ProfileModal />

          {/* Settings Icon */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link href="/settings" className="p-3 rounded-xl hover:bg-farm-600/20 transition-colors group">
              <FaCog className="text-xl text-farm-100 group-hover:text-farm-50 transition-colors" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ===== Second Layer Navbar ===== */}
      <div className="w-full bg-gradient-to-r from-farm-700 via-farm-600 to-farm-700 border-t border-farm-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Mobile Search */}
            <div className="flex-1 md:hidden pr-2">
              <SearchBar inline />
            </div>

            {/* FaBars Button */}
            <div className="flex md:hidden items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                ref={menuButtonRef}
                onClick={() => setMobileOpen((o) => !o)}
                className="p-3 rounded-xl bg-farm-500/80 text-white hover:bg-farm-500 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm"
                aria-label="Toggle menu"
              >
                <FaBars className="text-lg" />
                {/* <span className="text-sm font-medium">Menu</span> */}
              </motion.button>
            </div>

            {/* Farmer Dashboard */}
            <div className="hidden md:block relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/farmer-dashboard"
                  className="flex items-center px-4 py-2 rounded-xl text-sm bg-farm-500/80 text-white border border-farm-400 hover:bg-farm-500 transition-all duration-300 backdrop-blur-sm"
                >
                  <FaLeaf className="mr-2 text-base" />
                  {t("farmer_dashboard") || "Farmer Dashboard"}
                </Link>
              </motion.div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0.5 text-sm text-white">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={link.href} 
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-farm-500/50 transition-all duration-300 group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
        </div>

        {/* ===== Mobile Menu (FaBars) ===== */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              ref={mobileMenuRef}
              className="md:hidden bg-gradient-to-b from-farm-600 to-farm-700 border-t border-farm-500 fixed top-[7rem] left-0 w-full h-[calc(100vh-7rem)] overflow-y-auto z-[60] pb-10 backdrop-blur-md mt-2"
            >
              <div className="px-6 py-6 space-y-3">

                {/* 🟢 Farmer Dashboard */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.3 }}
                >
                  <Link
                    href="/farmer-dashboard"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-farm-500/50 transition-all duration-300 text-white group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaLeaf className="text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-lg">
                      {t("farmer_dashboard") || "Farmer Dashboard"}
                    </span>
                  </Link>
                </motion.div>

                {/* 🌾 Then All Other NAV_LINKS */}
                {NAV_LINKS.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 1) * 0.1, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-farm-500/50 transition-all duration-300 text-white group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="font-medium text-lg">{link.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {/* Chats link (between Weather & Settings) */}
                {/* <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 1) * 0.1, duration: 0.3 }}
                >
                  <Link
                    href="/chats"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-farm-500/50 transition-all duration-300 text-white group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaComments className="text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-lg">{t("chats") || "Chats"}</span>
                  </Link>
                </motion.div> */}

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 2) * 0.1, duration: 0.3 }}
                >
                  <Link
                    href="/favorites"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-farm-500/50 transition-all duration-300 text-white group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaHeart className="text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-lg">{t("favorites") || "Favorites"}</span>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (NAV_LINKS.length + 3) * 0.1, duration: 0.3 }}
                >
                  <Link
                    href="/settings"
                    className="flex items-center gap-4 px-4 py-4 rounded-xl hover:bg-farm-500/50 transition-all duration-300 text-white group"
                    onClick={() => setMobileOpen(false)}
                  >
                    <FaCog className="text-xl group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-lg">{t("settings") || "Settings"}</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
