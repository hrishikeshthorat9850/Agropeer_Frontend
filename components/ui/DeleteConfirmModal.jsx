"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { useLanguage } from "@/Context/languagecontext";
import { useBackPress } from "@/Context/BackHandlerContext";
import Portal from "./Portal";

/**
 * A common, premium Delete Confirmation Modal.
 * Optimized for Android (Bottom-sheet style on mobile) and Desktop.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Callback to close the modal
 * @param {Function} props.onConfirm - Callback to confirm the action
 * @param {string} props.title - Modal title (optional)
 * @param {string} props.message - Descriptive message (optional)
 * @param {string} props.confirmText - Label for the confirm button (optional)
 * @param {string} props.cancelText - Label for the cancel button (optional)
 * @param {boolean} props.loading - Whether the confirm action is in progress
 * @param {string} props.variant - 'danger' (default) or 'warning'
 */
export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
  loading = false,
  variant = "danger",
}) {
  const { t } = useLanguage();

  // Handle Android Back Press
  useBackPress(
    () => {
      if (isOpen) {
        onClose();
        return true;
      }
      return false;
    },
    30, // Higher priority than general app closures
    isOpen
  );

  // Lock body scroll when open - aggressive for mobile
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.classList.add("no-scroll");
      document.documentElement.classList.add("no-scroll");

      return () => {
        const top = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.classList.remove("no-scroll");
        document.documentElement.classList.remove("no-scroll");
        
        // Restore scroll position
        if (top) {
          const scrollPos = parseInt(top || '0') * -1;
          window.scrollTo(0, scrollPos);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isDanger = variant === "danger";
  const iconColor = isDanger ? "text-red-500" : "text-amber-500";
  const iconBg = isDanger ? "bg-red-50 dark:bg-red-500/10" : "bg-amber-50 dark:bg-amber-500/10";
  const btnBg = isDanger 
    ? "bg-red-600 hover:bg-red-700 shadow-red-600/20" 
    : "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20";

  return (
    <Portal>
      <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] touch-none"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm sm:max-w-md bg-white dark:bg-[#1C1C1E] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile Handle Bar */}
          <div className="flex justify-center pt-2.5 pb-2 sm:hidden">
            <div className="w-10 h-1 bg-gray-300 dark:bg-neutral-700 rounded-full" />
          </div>

          {/* Close Button - Desktop Only */}
          <button
            onClick={onClose}
            className="hidden sm:flex absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="px-6 pt-2 pb-8 sm:pt-10 flex flex-col items-center text-center">
            {/* Icon Wrapper */}
            <div className={`w-16 h-16 sm:w-20 sm:h-20 ${iconBg} rounded-full flex items-center justify-center mb-5 sm:mb-6`}>
              {isDanger ? (
                <Trash2 size={32} className={`${iconColor}`} strokeWidth={1.5} />
              ) : (
                <AlertTriangle size={32} className={`${iconColor}`} strokeWidth={1.5} />
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {title || t("delete_confirm_title") || "Confirm Deletion"}
            </h3>
            
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-[85%] mb-8 leading-relaxed">
              {message || t("delete_confirm_desc") || "This action cannot be undone. Are you sure you want to proceed?"}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                disabled={loading}
                onClick={onConfirm}
                className={`flex-1 order-1 sm:order-2 h-14 sm:h-12 flex items-center justify-center gap-2 text-white font-semibold rounded-xl sm:rounded-lg ${btnBg} shadow-lg transition-all active:scale-[0.98] disabled:opacity-50`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Trash2 size={18} />
                    <span>{confirmText || t("delete_btn") || "Delete"}</span>
                  </>
                )}
              </button>
              
              <button
                disabled={loading}
                onClick={onClose}
                className="flex-1 order-2 sm:order-1 h-14 sm:h-12 bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-white font-semibold rounded-xl sm:rounded-lg hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {cancelText || t("cancel_btn") || "Cancel"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </Portal>
  );
}
