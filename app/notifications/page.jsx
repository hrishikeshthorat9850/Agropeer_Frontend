"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/Context/logincontext";
import {
  useNotifications,
  markNotificationsAsRead,
  markSingleNotificationAsRead,
} from "@/hooks/useNotifications";
import { timeAgo } from "@/utils/timeConverter";
import { FaBell, FaCheck, FaCheckDouble, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import useToast from "@/hooks/useToast";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { useLanguage } from "@/Context/languagecontext";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function NotificationsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { user, loading: authLoading, accessToken } = useLogin();
  const {
    notifications,
    unreadCount,
    loading: notificationsLoading,
  } = useNotifications(user?.id, 50);
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
  const [localNotificationsCount, setLocalNotificationsCount] = useState(
    localNotifications.length,
  );
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
      notificationId: id,
    };
    try {
      const response = await fetch(`${BASE_URL}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) console.error("Error in notification delete api");
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
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
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
            <LoadingSpinner size="md" color="green" />
            <p className="mt-4 text-farm-600 dark:text-farm-400">
              {t("loading")}
            </p>
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
            <h2 className="text-2xl font-bold text-farm-800 dark:text-farm-200 mb-2">
              {t("login_title")}
            </h2>
            <p className="text-farm-600 dark:text-farm-400 mb-6">
              {t("login_desc")}
            </p>
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
      <div className="bg-gray-50 dark:bg-black pb-4">
        {/* Creative Sticky Header - Changed to FIXED as requested */}
        <div className="fixed top-mobile-navbar-height left-0 right-0 z-30 bg-white dark:bg-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 shadow-sm">
          <div className="px-5 py-4 flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-farm-600 to-emerald-500 bg-clip-text text-transparent">
                {t("notifications_title")}
              </h1>
              {unreadCount > 0 && (
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                  You have{" "}
                  <span className="text-farm-600 dark:text-farm-400">
                    {localNotifications.length} new
                  </span>{" "}
                  updates
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={markAllAsRead}
                  disabled={markingAsRead}
                  className="bg-farm-100 dark:bg-farm-900/30 text-farm-600 dark:text-farm-400 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1"
                >
                  <FaCheckDouble />
                  {t("mark_all_read")}
                </motion.button>
              )}

              {localNotifications.length > 0 && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowBulkConfirm(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 transition-colors"
                >
                  <FaTrashAlt className="text-xs" />
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Spacer to prevent content from hiding behind fixed header */}
        <div className="h-[88px] w-full" />

        {/* Creative Notifications List */}
        {notificationsLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <LoadingSpinner size="md" color="green" />
            <p className="text-sm font-medium text-gray-400 animate-pulse">
              {t("loading_notifications")}
            </p>
          </div>
        ) : localNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-farm-300 blur-2xl opacity-20 rounded-full"></div>
              <FaBell className="relative text-6xl text-gray-300 dark:text-gray-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {t("no_notifications")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs leading-relaxed">
              {t("no_notifications_desc")}
            </p>
          </div>
        ) : (
          <div className="px-1 space-y-1">
            {localNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                onClick={() => handleNotificationClick(notification)}
                className={`group relative overflow-hidden rounded-2xl px-4 py-2 cursor-pointer transition-all duration-300
                            ${
                              !notification.seen
                                ? "bg-white dark:bg-[#1E1E1E] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-farm-100 dark:border-farm-900/50"
                                : "bg-gray-50/50 dark:bg-white/5 border border-transparent opacity-80 hover:opacity-100"
                            }
                        `}
              >
                {/* Unread Glow Indicator */}
                {!notification.seen && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-farm-400 to-emerald-500"></div>
                )}

                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm
                                ${
                                  !notification.seen
                                    ? "bg-gradient-to-br from-farm-500 to-emerald-600 text-white shadow-farm-500/30"
                                    : "bg-white dark:bg-white/10 text-gray-400 dark:text-gray-500"
                                }`}
                  >
                    <FaBell />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4
                        className={`text-base font-bold pr-6 leading-tight ${
                          !notification.seen
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        {timeAgo(notification.created_at)}
                      </span>
                    </div>

                    <p
                      className={`text-sm line-clamp-2 leading-relaxed ${
                        !notification.seen
                          ? "text-gray-600 dark:text-gray-300"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {notification.body}
                    </p>
                  </div>
                </div>

                {/* Hover Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPendingDelete(notification.id);
                    setShowConfirm(true);
                  }}
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-white dark:bg-zinc-800 text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0"
                >
                  <FaTrashAlt className="text-xs" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* -------------------------------------------------- */}
        {/* MODALS & SNACKBARS (Logic Preserved) */}
        {/* -------------------------------------------------- */}

        {/* Delete Single Confirm */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-gray-100 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mx-auto mb-4">
                <FaTrashAlt className="text-xl" />
              </div>
              <h2 className="text-xl font-black text-center text-gray-900 dark:text-white mb-2">
                {t("delete_confirmation_title")}
              </h2>
              <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
                {t("delete_confirmation_desc")}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 px-4 py-3.5 rounded-2xl font-bold bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => {
                    setShowConfirm(false);
                    handleDeleteUI(pendingDelete);
                  }}
                  className="flex-1 px-4 py-3.5 rounded-2xl font-bold bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors"
                >
                  {t("delete")}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Delete All Confirm */}
        {showBulkConfirm && (
          <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md flex items-center justify-center z-[9999] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              className="bg-white dark:bg-[#1E1E1E] p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-gray-100 dark:border-white/10"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-500 mx-auto mb-4">
                <FaTrashAlt className="text-xl" />
              </div>
              <h2 className="text-xl font-black text-center text-gray-900 dark:text-white mb-2">
                {t("delete_all_confirmation_title")}
              </h2>
              <p className="text-center text-gray-500 dark:text-gray-400 mb-8 text-sm">
                {t("delete_all_confirmation_desc")}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowBulkConfirm(false)}
                  className="flex-1 px-4 py-3.5 rounded-2xl font-bold bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => {
                    setShowBulkConfirm(false);
                    tempBulkDelete();
                  }}
                  className="flex-1 px-4 py-3.5 rounded-2xl font-bold bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors"
                >
                  {t("delete_all")}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Undo Toast */}
        {showUndo && (
          <div className="fixed bottom-24 md:bottom-10 left-1/2 -translate-x-1/2 z-[9999] w-max">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-full shadow-2xl flex items-center gap-4"
            >
              <span className="font-bold text-sm tracking-wide">
                {t("notification_deleted")}
              </span>
              <button
                onClick={undoDeleteUI}
                className="text-farm-400 dark:text-farm-600 font-black text-sm hover:underline uppercase"
              >
                {t("undo")}
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </MobilePageContainer>
  );
}
