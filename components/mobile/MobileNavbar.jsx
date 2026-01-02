"use client";

import { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaBell,
  FaComments,
  FaLanguage,
} from "react-icons/fa";
import Link from "next/link";
import NotificationBadge from "../chat/NotificationBadge";
import { useLogin } from "@/Context/logincontext";
import { useUnreadMessagesCount } from "@/hooks/useUnreadMessagesCount";
import { useLanguage } from "@/Context/languagecontext";
import ProfileModal from "@/components/ProfileModal";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../SearchBar";
import { supabase } from "@/lib/supabaseClient";
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
          if (error.code === '42P01' || error.message.includes('does not exist')) {
            setNotificationsUnreadCount(0);
            return;
          }
          console.error("Error fetching unread notifications count:", error);
          setNotificationsUnreadCount(0); // Reset to 0 on error
          return;
        }

        // Ensure count is a valid number, default to 0
        const unreadCount = typeof count === 'number' ? count : 0;
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
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
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
          if (payload.new && payload.old) {
            if (payload.new.seen && !payload.old.seen) {
              setNotificationsUnreadCount((prev) => Math.max(0, (prev || 0) - 1));
            } else if (!payload.new.seen && payload.old.seen) {
              setNotificationsUnreadCount((prev) => (prev || 0) + 1);
            }
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications',
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
                setNotificationsUnreadCount((prev) => Math.max(0, (prev || 0) - 1));
              }
              return;
            }

            // Ensure count is a valid number
            const unreadCount = typeof count === 'number' ? count : 0;
            setNotificationsUnreadCount(unreadCount);
          } catch (err) {
            console.error("Error refetching count after delete:", err);
            // Fallback: decrement if we know it was unread
            if (payload.old && !payload.old.seen) {
              setNotificationsUnreadCount((prev) => Math.max(0, (prev || 0) - 1));
            }
          }
        }
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
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Refetch when page regains focus
    const handleFocus = () => {
      fetchTotalUnreadNotifications();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
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
    <div
      className="pt-safe-top md:hidden fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-[#48ec50] to-[#77c37c] dark:bg-white/10 backdrop-blur-2xl rounded-bl-xl rounded-br-xl">
      <div
        className="
          flex items-center justify-between 
          py-1.5 px-2
          h-[56px]
          flex-shrink-0
          gap-2
        "
      >
        {/* MENU / SIDEBAR BUTTON */}
        <button
          onClick={openSidebar}
          className="p-2 active:scale-95 transition flex-shrink-0"
          aria-label="Open menu"
        >
          <FaBars className="text-[22px] text-white" />
        </button>

        {/* SEARCH BAR - Takes available space */}
        <div className="flex-1 min-w-0 max-w-[calc(100%-180px)]">
          <SearchBar inline={true} />
        </div>

        {/* RIGHT SIDE ICONS */}
        <div className="flex items-center gap-1 flex-shrink-0">

          {/* Notifications */}
          {user && (
            <Link href="/notifications" className="relative p-2 active:scale-95">
              <FaBell className="text-[20px]" />
              {notificationsUnreadCount > 0 && (
                <div className="absolute -top-2 -right-1">
                  <NotificationBadge unreadCount={notificationsUnreadCount} />
                </div>
              )}
            </Link>
          )}

          {/* Chats */}
          {user &&
            <Link href="/chats" className="relative p-2 active:scale-95">
              <FaComments className="text-[20px]" />
              {unreadChats > 0 && (
                <div className="absolute -top-2 -right-1">
                  <NotificationBadge unreadCount={unreadChats} />
                </div>
              )}
            </Link>
          }

          {/* LANGUAGE DROPDOWN */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 active:scale-95"
            >
              <FaLanguage className="text-[27px]" />
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
          <ProfileModal />
        </div>
      </div>
    </div>
  );
}