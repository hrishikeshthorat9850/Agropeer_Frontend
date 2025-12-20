"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/Context/logincontext";
import useFcmToken from "@/hooks/useFcmToken";
import { FaBell, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import EnableNotifications from "./Notifications/EnbleNotifications";
export default function NotificationHandler() {
  const { user } = useLogin();
  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Handle foreground messages
  const handleForegroundMessage = (payload) => {
    console.log("📨 Foreground notification received:", payload);
    
    const notificationData = {
      title: payload.notification?.title || payload.data?.title || "New Notification",
      body: payload.notification?.body || payload.data?.body || "",
      icon: payload.notification?.icon || "/favicon.png",
      data: payload.data || {},
    };

    setNotification(notificationData);
    setShowNotification(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  // Get FCM token
  const { token, permission } = useFcmToken(handleForegroundMessage);

  // Register token when available
  // useEffect(() => {
  //   if (token && user) {
  //     // Token is already registered in the hook, but we can log it
  //     console.log("✅ FCM Token obtained:", token.substring(0, 20) + "...");
  //   }
  // }, [token, user]);

  // Show permission prompt if denied
  const requestPermission = async () => {
    if (!("Notification" in window)) {
      // Notifications API not available
      console.log("Notifications not supported");
    }
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      window.location.reload(); // Reload to get token
    }
    if(permission === "denied"){
      console.log("Permission is denied");
    }
  };

  return (
    <>
      {/* In-app notification banner */}
      <AnimatePresence>
        {showNotification && notification && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-28 right-6 z-[60] w-full max-w-sm pointer-events-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white via-farm-50 to-farm-100 shadow-[0_20px_60px_rgba(16,24,40,0.15)] dark:from-[#232323] dark:via-[#1b1b1b] dark:to-[#151515] dark:border-white/10">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-farm-500 to-farm-300" />
              <div className="flex items-start gap-3 p-4 pl-5">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/80 shadow-inner dark:bg-white/5">
                  <FaBell className="text-farm-600 text-lg" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-farm-900 dark:text-white leading-tight">
                    {notification.title}
                  </h4>
                  {notification.body && (
                    <p className="text-sm text-farm-700 dark:text-farm-200 mt-1">
                      {notification.body}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setShowNotification(false)}
                  className="text-farm-400 hover:text-farm-600 transition-colors"
                  aria-label="Close notification"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
              <div className="h-1 w-full bg-gradient-to-r from-farm-400 via-farm-300 to-transparent animate-[shimmer_5s_linear]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Permission prompt (optional - can be removed if you handle it elsewhere) */}
      {permission === "denied" && (
        <EnableNotifications onClick={requestPermission}/>
      )}
    </>
  );
}

