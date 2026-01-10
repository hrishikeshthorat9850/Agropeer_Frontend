"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/Context/logincontext";
import { useNotifications, markNotificationsAsRead, markSingleNotificationAsRead } from "@/hooks/useNotifications";
import { timeAgo } from "@/utils/timeConverter";
import { FaBell, FaCheck, FaCheckDouble, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { useLanguage } from "@/Context/languagecontext";

export default function NotificationsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { user, loading: authLoading, accessToken } = useLogin();
  const { notifications, unreadCount, loading: notificationsLoading } = useNotifications(
    user?.id,
    50
  );
  const { showToast } = useToast();
  const [markingAsRead, setMarkingAsRead] = useState(false);

  // -----------------------------------------------------
  // 🔥 NEW UI STATES FOR DELETE SYSTEM
  // -----------------------------------------------------
  const [localNotifications, setLocalNotifications] = useState([]);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const [showUndo, setShowUndo] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);
  const [localNotificationsCount, setLocalNotificationsCount] = useState(localNotifications.length)
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (notifications?.length) {
      setLocalNotifications(notifications);
    }
  }, [notifications]);

  const tempDelete = async (id) => {
    setLocalNotifications((prev) => prev.filter((n) => n.id !== id));
    const payload = {
      userId: user?.id,
      notificationId: id
    }
    try {
      const response = await fetch(`${BASE_URL}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) console.error("Error in notification delete api")
      const data = await response.json();
      console.log("deleted notification is", data);
    } catch (e) {
      console.error("Error in catch block delete notification", e);
    }
  };

  const undoTempDelete = (id) => {
    const deleted = notifications.find((n) => n.id === id);
    if (deleted) {
      setLocalNotifications((prev) => [deleted, ...prev]);
    }
  };

  const tempBulkDelete = async () => {
    setLocalNotifications([]);
    const payload = {
      userId: user?.id,
    };
    try {
      const response = await fetch(`${BASE_URL}/api/notifications`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      console.log("Data is", data);
    } catch (e) {
      console.log("Error in frontend");
    }
  };

  const handleDeleteUI = (id) => {
    setLastDeleted(id);
    tempDelete(id);
    setShowUndo(true);
    setTimeout(() => setShowUndo(false), 3000);

  };

  const undoDeleteUI = () => {
    undoTempDelete(lastDeleted);
    setShowUndo(false);
  };

  // -----------------------------------------------------

  // Mark all notifications as read when page loads
  useEffect(() => {
    if (user?.id && unreadCount > 0 && !markingAsRead) {
      markAllAsRead();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const markAllAsRead = async () => {
    if (markingAsRead || !user?.id) return;

    setMarkingAsRead(true);
    try {
      await markNotificationsAsRead(user?.id);
      showToast("success", t("all_read_success"));
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      showToast("error", t("all_read_error"));
    } finally {
      setMarkingAsRead(false);
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.link) {
      router.push(notification.link);
    }
  };

  // -----------------------------------------------------
  // AUTH LOADING
  // -----------------------------------------------------
  if (authLoading) {
    return (
      <MobilePageContainer>
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-farm-600 dark:border-farm-500 mx-auto"></div>
            <p className="mt-4 text-farm-600 dark:text-farm-400">{t("loading")}</p>
          </div>
        </div>
      </MobilePageContainer>
    );
  }

  // -----------------------------------------------------
  // NO USER
  // -----------------------------------------------------
  if (!user) {
    return (
      <MobilePageContainer>
        <div className="min-h-screen flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <FaBell className="text-6xl text-farm-400 dark:text-farm-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-farm-800 dark:text-farm-200 mb-2">{t("login_title")}</h2>
            <p className="text-farm-600 dark:text-farm-400 mb-6">{t("login_desc")}</p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-farm-600 dark:bg-farm-500 text-white rounded-xl hover:bg-farm-700 dark:hover:bg-farm-600 transition-colors font-semibold active:scale-95"
            >
              {t("go_to_login")}
            </Link>
          </div>
        </div>
      </MobilePageContainer>
    );
  }

  // -----------------------------------------------------
  // MAIN UI
  // -----------------------------------------------------

  return (
    <MobilePageContainer>
      <div className="max-w-4xl mx-auto py-4 min-h-screen flex flex-col">

        {/* -------------------------------------------------- */}
        {/* STICKY HEADER */}
        {/* -------------------------------------------------- */}
        <div className="sticky top-0 z-20 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-2"
          >
            <div className="bg-emerald-100 dark:bg-neutral-800 backdrop-blur-sm shadow-lg border border-farm-200 dark:border-neutral-700 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-farm-600/20 dark:bg-farm-500/30 rounded-full blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-farm-600 to-farm-700 dark:from-farm-500 dark:to-farm-600 p-4 rounded-2xl shadow-lg">
                      <FaBell className="text-2xl sm:text-3xl text-white" />
                    </div>
                  </div>

                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-farm-800 to-farm-600 dark:from-farm-300 dark:to-farm-400 bg-clip-text text-transparent">
                      {t("notifications_title")}
                    </h1>
                    {/* <p className="text-sm text-farm-600 dark:text-farm-400 mt-1">
                    {notifications.length} {notifications.length === 1 ? 'notification' : 'notifications'}
                  </p> */}
                  </div>

                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white text-xs font-bold rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5"
                    >
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      {t("new_notifications_count").replace("{count}", localNotifications.length)}
                    </motion.span>
                  )}
                </div>

                <div className="flex justify-between gap-3">
                  {unreadCount > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={markAllAsRead}
                      disabled={markingAsRead}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-farm-600 to-farm-700 dark:from-farm-500 dark:to-farm-600 text-white rounded-xl hover:from-farm-700 hover:to-farm-800 transition-all text-sm font-semibold shadow-md"
                    >
                      <FaCheckDouble className="text-sm" />
                      {markingAsRead ? t("marking") : t("mark_all_read")}
                    </motion.button>
                  )}

                  {/* 🔥 BULK DELETE BUTTON */}
                  <button
                    onClick={() => setShowBulkConfirm(true)}
                    className="px-4 py-2 rounded-xl bg-red-600 text-white shadow-md hover:bg-red-700 transition"
                  >
                    {t("delete_all")}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* -------------------------------------------------- */}
        {/* NOTIFICATIONS LIST */}
        {/* -------------------------------------------------- */}

        {notificationsLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-farm-200 dark:border-neutral-700"
          >
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-farm-200 dark:border-neutral-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-farm-600 dark:border-farm-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-farm-600 dark:text-farm-400 font-medium">{t("loading_notifications")}</p>
          </motion.div>
        ) : localNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8 bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-farm-200 dark:border-neutral-700"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-farm-200/50 dark:bg-farm-500/20 rounded-full blur-2xl"></div>
              <FaBell className="relative text-7xl text-farm-300 dark:text-farm-600" />
            </div>
            <h3 className="text-2xl font-bold text-farm-800 dark:text-farm-200 mb-2">{t("no_notifications")}</h3>
            <p className="text-farm-600 dark:text-farm-400 max-w-md mx-auto">
              {t("no_notifications_desc")}
            </p>
          </motion.div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 sm:space-y-4">
            {localNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03, duration: 0.3 }}
                whileHover={{ scale: 1.01, x: 4 }}
                onClick={() => handleNotificationClick(notification)}
                className={`
                group relative bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm 
                rounded-xl shadow-md border-2 p-5 sm:p-6 cursor-pointer
                transition-all duration-300 
                overflow-hidden
                touch-pan-x active:translate-x-[-80px]
                ${!notification.seen
                    ? "border-farm-400 dark:border-farm-500 bg-gradient-to-r from-farm-50 to-white dark:from-neutral-800 dark:to-neutral-700 shadow-lg ring-2 ring-farm-200/50 dark:ring-farm-500/30"
                    : "border-farm-200 dark:border-neutral-700 hover:border-farm-300 dark:hover:border-neutral-600 hover:shadow-xl"
                  }
              `}
              >

                {/* Animated background gradient */}
                {!notification.seen && (
                  <div className="absolute inset-0 bg-gradient-to-r from-farm-100/50 dark:from-farm-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}

                {/* Content */}
                <div className="relative flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {!notification.seen ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-farm-600/30 dark:bg-farm-500/40 rounded-full blur-md animate-pulse"></div>
                        <div className="relative w-3 h-3 bg-gradient-to-br from-farm-600 to-farm-700 dark:from-farm-500 dark:to-farm-600 rounded-full ring-2 ring-farm-200 dark:ring-farm-500/50"></div>
                      </div>
                    ) : (
                      <div className="w-3 h-3 bg-farm-200 dark:bg-neutral-600 rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3
                        className={`font-bold text-base sm:text-lg leading-tight ${!notification.seen
                          ? "text-farm-900 dark:text-farm-100"
                          : "text-farm-700 dark:text-farm-300 group-hover:text-farm-900 dark:group-hover:text-farm-100"
                          }`}
                      >
                        {notification.title}
                      </h3>

                      {notification.seen && (
                        <FaCheck className="text-farm-400 dark:text-farm-500 flex-shrink-0 mt-1" />
                      )}
                    </div>

                    <p className="text-farm-600 dark:text-farm-400 text-sm sm:text-base mb-3 line-clamp-2 leading-relaxed">
                      {notification.body}
                    </p>

                    <div className="flex items-center gap-3 text-xs sm:text-sm text-farm-500 dark:text-farm-400">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {timeAgo(notification.created_at)}
                      </span>

                      {!notification.seen && (
                        <span className="px-2 py-0.5 bg-farm-100 dark:bg-farm-500/20 text-farm-700 dark:text-farm-300 rounded-full text-xs font-medium">
                          {t("new_badge")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom hover bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-farm-600 via-farm-500 to-farm-600 dark:from-farm-500 dark:via-farm-400 dark:to-farm-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                {/* -------------------------------------------------- */}
                {/* DELETE ICON (Bottom Right) */}
                {/* -------------------------------------------------- */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDelete(notification.id);
                    setShowConfirm(true);
                  }}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-red-700/90 hover:bg-red-800 opacity-0 group-hover:opacity-100
                  text-white shadow-lg transition-all duration-200">
                  <FaTrashAlt className="text-sm" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* DELETE CONFIRM POPUP */}
        {/* -------------------------------------------------- */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-xl w-[90%] max-w-sm">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                {t("delete_confirmation_title")}
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                {t("delete_confirmation_desc")}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-lg text-black dark:text-white bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                >
                  {t("cancel")}
                </button>

                <button
                  onClick={() => {
                    setShowConfirm(false);
                    handleDeleteUI(pendingDelete);
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* BULK DELETE POPUP */}
        {/* -------------------------------------------------- */}
        {showBulkConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
            <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-xl w-[90%] max-w-sm">
              <h2 className="text-lg font-bold mb-3 text-black">{t("delete_all_confirmation_title")}</h2>

              <p className="text-neutral-600 dark:text-neutral-300 mb-6">
                {t("delete_all_confirmation_desc")}
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowBulkConfirm(false)}
                  className="px-4 py-2 rounded-lg text-black dark:text-white bg-neutral-200 dark:bg-neutral-700"
                >
                  {t("cancel")}
                </button>

                <button
                  onClick={() => {
                    setShowBulkConfirm(false);
                    tempBulkDelete();
                  }}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  {t("delete_all")}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* SNACKBAR (Undo Delete) */}
        {/* -------------------------------------------------- */}
        {showUndo && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999]">
            <div className="bg-neutral-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4">
              <span>{t("notification_deleted")}</span>
              <button
                onClick={undoDeleteUI}
                className="text-yellow-300 font-semibold hover:text-yellow-400"
              >
                {t("undo")}
              </button>
            </div>
          </div>
        )}
      </div>
    </MobilePageContainer>
  );
}
