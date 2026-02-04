"use client";

import { useState, useRef, useEffect } from "react";
import { FaBars, FaBell, FaComments, FaLanguage } from "react-icons/fa";
import Link from "next/link";
import NotificationBadge from "../chat/NotificationBadge";
import { useLogin } from "@/Context/logincontext";
import { useUnreadMessagesCount } from "@/hooks/useUnreadMessagesCount";
import { useLanguage } from "@/Context/languagecontext";
import ProfileModal from "@/components/ProfileModal";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../SearchBar";
import { supabase } from "@/lib/supabaseClient";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export default function MobileNavbar() {
  const { user } = useLogin();
  const unreadChats = useUnreadMessagesCount();
  const [notificationsUnreadCount, setNotificationsUnreadCount] = useState(0);
  const { locale, setLocale, LOCALE_NAMES, SUPPORTED_LOCALES } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);

  const langRef = useRef(null);

  // Fetch total unread notifications count from database (not limited)
  useEffect(() => {
    // Reset count immediately when user changes or when no user
    setNotificationsUnreadCount(0);

    if (!user?.id) {
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
          if (
            error.code === "42P01" ||
            error.message.includes("does not exist")
          ) {
            setNotificationsUnreadCount(0);
            return;
          }
          console.error("Error fetching unread notifications count:", error);
          setNotificationsUnreadCount(0); // Reset to 0 on error
          return;
        }

        // Ensure count is a valid number, default to 0
        const unreadCount = typeof count === "number" ? count : 0;
        setNotificationsUnreadCount(unreadCount);
      } catch (err) {
        console.error("Error in fetchTotalUnreadNotifications:", err);
        setNotificationsUnreadCount(0); // Reset to 0 on error
      }
    }

    // Initial fetch
    fetchTotalUnreadNotifications();

    // Set up real-time subscription to update count when notifications change
    const channel = supabase
      .channel(`mobile-navbar-notifications:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Only increment count if the new notification is unread
          if (payload.new && !payload.new.seen) {
            setNotificationsUnreadCount((prev) => {
              const newCount = (prev || 0) + 1;
              return newCount;
            });
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Update count when notification seen status changes
          if (payload.new && payload.old) {
            if (payload.new.seen && !payload.old.seen) {
              setNotificationsUnreadCount((prev) =>
                Math.max(0, (prev || 0) - 1),
              );
            } else if (!payload.new.seen && payload.old.seen) {
              setNotificationsUnreadCount((prev) => (prev || 0) + 1);
            }
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        async (payload) => {
          // When a notification is deleted, refetch the count to ensure accuracy
          // This is more reliable than trying to track the deleted notification's seen status
          try {
            const { count, error } = await supabase
              .from("notifications")
              .select("*", { count: "exact", head: true })
              .eq("user_id", user.id)
              .eq("seen", false);

            if (error) {
              console.error("Error refetching count after delete:", error);
              // Fallback: decrement if we know it was unread
              if (payload.old && !payload.old.seen) {
                setNotificationsUnreadCount((prev) =>
                  Math.max(0, (prev || 0) - 1),
                );
              }
              return;
            }

            // Ensure count is a valid number
            const unreadCount = typeof count === "number" ? count : 0;
            setNotificationsUnreadCount(unreadCount);
          } catch (err) {
            console.error("Error refetching count after delete:", err);
            // Fallback: decrement if we know it was unread
            if (payload.old && !payload.old.seen) {
              setNotificationsUnreadCount((prev) =>
                Math.max(0, (prev || 0) - 1),
              );
            }
          }
        },
      )
      .subscribe();

    // Periodic refetch as fallback (every 5 seconds) to catch missed real-time events
    // This is especially important for DELETE events that might not fire reliably
    const intervalId = setInterval(() => {
      fetchTotalUnreadNotifications();
    }, 5000);

    // Refetch when window/tab becomes visible (user comes back to app)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchTotalUnreadNotifications();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Refetch when page regains focus
    const handleFocus = () => {
      fetchTotalUnreadNotifications();
    };
    window.addEventListener("focus", handleFocus);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [user?.id]);

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
    <div className="fixed top-0 left-0 right-0 pt-safe-top w-full z-[999] bg-white dark:bg-black backdrop-blur-md shadow-sm transition-all border-zinc-100">
      <div className="flex items-center justify-between py-1.5 px-3 h-[56px] flex-shrink-0 gap-3">
        {/* MENU / SIDEBAR BUTTON */}
        <button
          onClick={() => {
            Haptics.impact({ style: ImpactStyle.Light });
            openSidebar();
          }}
          className="p-2 active:scale-95 transition flex-shrink-0 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Open menu"
        >
          <FaBars className="text-[24px] text-zinc-800 dark:text-zinc-100" />
        </button>

        {/* SEARCH BAR - Takes available space */}
        {/* <div className="flex-1 min-w-0">
          <SearchBar inline={true} />
        </div> */}

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Notifications */}

          <Link
            href="/notifications"
            onClick={() => Haptics.impact({ style: ImpactStyle.Light })}
            className="relative p-2 active:scale-95 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <FaBell className="text-[24px] text-zinc-800 dark:text-zinc-100" />
            {notificationsUnreadCount > 0 && (
              <div className="absolute top-1 right-0">
                <NotificationBadge unreadCount={notificationsUnreadCount} />
              </div>
            )}
          </Link>

          {/* Chats */}
          {user && (
            <Link
              href="/chats"
              onClick={() => Haptics.impact({ style: ImpactStyle.Light })}
              className="relative p-2 active:scale-95 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <FaComments className="text-[24px] text-zinc-800 dark:text-zinc-100" />
              {unreadChats > 0 && (
                <div className="absolute top-1 right-0">
                  <NotificationBadge unreadCount={unreadChats} />
                </div>
              )}
            </Link>
          )}

          {/* LANGUAGE DROPDOWN */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => {
                Haptics.impact({ style: ImpactStyle.Light });
                setLangOpen(!langOpen);
              }}
              className="p-2 active:scale-95 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <FaLanguage className="text-[28px] text-zinc-800 dark:text-zinc-100" />
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="
                    absolute right-0 mt-3 w-48 p-2 
                    rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border 
                    bg-white/90 dark:bg-[#1a1a1a]/95 
                    backdrop-blur-2xl 
                    border-zinc-100 dark:border-zinc-800
                    overflow-hidden origin-top-right z-50
                  "
                >
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        Haptics.impact({ style: ImpactStyle.Medium });
                        setLocale(l);
                        setLangOpen(false);
                      }}
                      className={`
                        flex items-center justify-between w-full px-4 py-3 text-left rounded-xl text-sm font-medium mb-1 last:mb-0
                        transition-all duration-200
                        ${
                          l === locale
                            ? "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400 ring-1 ring-green-100 dark:ring-green-500/20"
                            : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-white"
                        }
                      `}
                    >
                      <span>{LOCALE_NAMES[l] || l}</span>
                      {l === locale && (
                        <motion.div
                          layoutId="active-dot"
                          className="w-1.5 h-1.5 rounded-full bg-green-500"
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PROFILE MODAL */}
          <ProfileModal className="text-[24px] text-zinc-800 dark:text-zinc-100" />
        </div>
      </div>
    </div>
  );
}
