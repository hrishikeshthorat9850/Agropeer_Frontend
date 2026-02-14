"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import {
  FaEllipsisV,
  FaExclamationTriangle,
  FaTrash,
  FaBroom,
} from "react-icons/fa";

import { useLanguage } from "@/Context/languagecontext";
import { useSocket } from "@/Context/SocketContext";
import { useLogin } from "@/Context/logincontext";
import useToast from "@/hooks/useToast";
import { useBackPress } from "@/Context/BackHandlerContext";

//
// Confirm Modal - defined OUTSIDE so it is stable (not recreated on every render)
//
function ConfirmModal({
  open,
  icon,
  title,
  message,
  confirmLabel,
  color,
  onConfirm,
  onClose,
  children,
  confirmDisabled = false,
  confirmLoading = false,
  cancelLabel,
}) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-100 dark:border-neutral-800 p-6"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div
              className={`mx-auto flex items-center justify-center w-14 h-14 rounded-full ${color} bg-opacity-10 mb-4`}
            >
              <div className={`text-2xl ${color.replace("bg-", "text-")}`}>
                {icon}
              </div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {message}
            </p>
            {children}

            <div className="flex justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                {cancelLabel || "Cancel"}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (!confirmDisabled) {
                    onConfirm();
                  }
                }}
                disabled={confirmDisabled}
                className={`px-4 py-2 rounded-md text-white ${color} hover:opacity-90 transition-colors flex items-center justify-center ${
                  confirmDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {confirmLoading ? (
                  <svg
                    className="w-4 h-4 animate-spin mr-2 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      opacity="0.25"
                    />
                    <path
                      d="M22 12a10 10 0 00-10-10"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : null}
                <span>{confirmLabel}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export default function ChatOptionsMenu({ conversationId }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const btnRef = useRef(null);
  const modalRef = useRef(null); // Track modal state with ref for reliable checking
  const isTransitioningRef = useRef(false); // Track if we're transitioning from dropdown to modal

  const {
    clearConversation,
    deleteConversation,
    clearConversationLocal,
    deleteConversationLocal,
  } = useSocket();
  const { user } = useLogin();
  const { showToast } = useToast();

  const menuWidth = 176;
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  // Update modal ref when modal state changes
  useEffect(() => {
    modalRef.current = modal;
  }, [modal]);

  // ✅ Handle Android Back Press for Dropdown & Modals
  useBackPress(
    () => {
      // 1. If a modal is open, close it
      if (modal) {
        setOpen(false);
        setDeleteConfirmText("");
        setModal(null);
        setActionLoading(false);
        isTransitioningRef.current = false;
        return true;
      }
      // 2. If the dropdown is open, close it
      if (open) {
        setOpen(false);
        return true;
      }
      return false;
    },
    20,
    open || !!modal,
  );

  // Memoize callbacks to prevent modal remounting
  const handleDeleteClose = useCallback(() => {
    setOpen(false);
    setDeleteConfirmText("");
    setModal(null);
    setActionLoading(false);
    isTransitioningRef.current = false;
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    // Use ref so we always have latest value (avoids stale closure when modal is stable)
    const text = deleteConfirmTextRef.current.trim().toUpperCase();
    if (actionLoading || text !== "DELETE") return;
    if (!conversationId) {
      showToast(
        "error",
        t("no_conversation_selected") || "No conversation selected",
      );
      setOpen(false);
      setModal(null);
      isTransitioningRef.current = false;
      return;
    }
    setActionLoading(true);
    setOpen(false);
    const cid = conversationId != null ? String(conversationId) : null;
    // Update UI immediately via context (guaranteed) + event for ChatContext/chats page
    if (cid) {
      deleteConversationLocal(conversationId);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("conversationDeletedLocal", {
            detail: { conversation_id: cid },
          }),
        );
      }
    }
    try {
      await deleteConversation(conversationId);
      showToast("success", t("delete_success") || "Conversation deleted");
      setDeleteConfirmText("");
      setModal(null);
      isTransitioningRef.current = false;
    } catch (err) {
      console.error("Error deleting conversation:", err);
      showToast(
        "error",
        err?.message || t("delete_error") || "Failed to delete conversation",
      );
      isTransitioningRef.current = false;
    } finally {
      setActionLoading(false);
    }
  }, [
    actionLoading,
    conversationId,
    deleteConversation,
    deleteConversationLocal,
    showToast,
    t,
  ]);

  const handleDeleteInputChange = useCallback((e) => {
    setDeleteConfirmText(e.target.value);
    e.stopPropagation();
  }, []);

  // Use ref so confirm handler always sees latest deleteConfirmText (avoids stale closure)
  const deleteConfirmTextRef = useRef("");
  deleteConfirmTextRef.current = deleteConfirmText;

  const computePos = () => {
    const btn = btnRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const top = rect.bottom + 6;
    let left = rect.right - menuWidth;
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8));

    setCoords({ top, left });
  };

  const toggleDropdown = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) setTimeout(() => computePos(), 0);
      return next;
    });
  };

  // CLOSE DROPDOWN ONLY WHEN CLICKED OUTSIDE BOTH button + dropdown + modal
  useEffect(() => {
    // Don't attach handler if modal is open or we're transitioning
    if (modalRef.current || isTransitioningRef.current || modal) return;

    const handler = (e) => {
      // Double-check refs and state in handler (defensive programming)
      if (modalRef.current || isTransitioningRef.current || modal) return;

      // Also check if modal exists in DOM (more reliable than ref)
      const modalInDOM = document.querySelector('[class*="z-[999999]"]');
      if (modalInDOM) return;

      const btn = btnRef.current;
      const dropdownEl = document.getElementById("dropdown-portal");

      // Don't close if clicking on button or dropdown
      if (btn?.contains(e.target)) return;
      if (dropdownEl?.contains(e.target)) return;

      // Don't close if clicking on any input, textarea, select, or button elements
      // (these are form elements that shouldn't trigger dropdown close)
      const target = e.target;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.tagName === "BUTTON" ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest("button"))
      ) {
        return;
      }

      // Check if click is on any modal backdrop (modals are portaled with z-[999999])
      // Also check if target is inside any element with z-[999999] class
      let element = e.target;
      while (element && element !== document.body) {
        // Check for modal backdrop class
        if (
          element.classList &&
          Array.from(element.classList).some((cls) =>
            cls.includes("z-[999999]"),
          )
        ) {
          return; // Click is on modal, don't close dropdown
        }
        // Also check if element is inside a modal by checking parent elements
        if (element.closest && typeof element.closest === "function") {
          const modalParent = element.closest('[class*="z-[999999]"]');
          if (modalParent) {
            return; // Inside a modal, don't close dropdown
          }
        }
        element = element.parentElement;
      }

      setOpen(false);
    };

    // Use capture phase to catch events before other handlers
    // Only attach if dropdown is open AND modal is NOT open
    if (open && !modal && !modalRef.current && !isTransitioningRef.current) {
      document.addEventListener("mousedown", handler, true); // true = capture phase
      return () => document.removeEventListener("mousedown", handler, true);
    }
    // If modal is open, make sure handler is removed
    return () => {
      document.removeEventListener("mousedown", handler, true);
    };
  }, [open, modal]);

  const dropdownUI = (
    <div
      id="dropdown-portal"
      className="w-44 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-[9999]"
    >
      <MenuItem
        icon={<FaExclamationTriangle className="text-red-500" />}
        label={t("report_label")}
        onClick={() => setModal("report")}
      />
      <MenuItem
        icon={<FaBroom className="text-yellow-500" />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!conversationId) {
            showToast(
              "error",
              t("no_conversation_selected") || "No conversation selected",
            );
            setOpen(false);
            return;
          }
          // Set transitioning flag BEFORE closing dropdown
          isTransitioningRef.current = true;
          // Close dropdown immediately
          setOpen(false);
          // Use setTimeout with 0 delay to ensure state updates complete
          setTimeout(() => {
            setModal("clear");
            // Reset transitioning flag after modal opens
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 100);
          }, 0);
        }}
        label={t("clear_chat")}
      />
      <MenuItem
        icon={<FaTrash className="text-red-600" />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          if (!conversationId) {
            showToast(
              "error",
              t("no_conversation_selected") || "No conversation selected",
            );
            setOpen(false);
            return;
          }
          // Set transitioning flag BEFORE closing dropdown
          isTransitioningRef.current = true;
          // Close dropdown immediately
          setOpen(false);
          // Use setTimeout with 0 delay to ensure state updates complete
          setTimeout(() => {
            setModal("delete");
            // Reset transitioning flag after modal opens
            setTimeout(() => {
              isTransitioningRef.current = false;
            }, 100);
          }, 0);
        }}
        label={t("delete_chat")}
      />
    </div>
  );

  return (
    <>
      <button
        ref={btnRef}
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <FaEllipsisV className="text-gray-700 dark:text-gray-200 text-lg" />
      </button>

      {open &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              zIndex: 9999,
            }}
          >
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                {dropdownUI}
              </motion.div>
            </AnimatePresence>
          </div>,
          document.body,
        )}

      {/* Report Modal */}
      {modal === "report" && (
        <ConfirmModal
          open
          icon={<FaExclamationTriangle />}
          title={t("report_chat")}
          message={t("report_chat_message")}
          confirmLabel={t("submit_btn")}
          cancelLabel={t("cancel_btn") || "Cancel"}
          color="bg-red-600"
          onClose={() => setModal(null)}
          onConfirm={() => setModal(null)}
        >
          <textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="w-full mt-4 p-2 bg-gray-50 dark:bg-neutral-800 border dark:border-neutral-700 rounded-md text-gray-800 dark:text-gray-200"
            rows={3}
            placeholder={t("report_reason_placeholder")}
          />
        </ConfirmModal>
      )}

      {/* Clear Modal */}
      {modal === "clear" && (
        <ConfirmModal
          open
          icon={<FaBroom />}
          title={t("clear_chat")}
          message={t("clear_chat_message")}
          confirmLabel={
            actionLoading ? t("processing") || "Processing..." : t("clear_btn")
          }
          cancelLabel={t("cancel_btn") || "Cancel"}
          confirmDisabled={actionLoading}
          confirmLoading={actionLoading}
          color="bg-yellow-500"
          onClose={() => {
            setOpen(false);
            setModal(null);
            setActionLoading(false);
            isTransitioningRef.current = false;
          }}
          onConfirm={async () => {
            if (actionLoading) return;
            if (!conversationId) {
              showToast(
                "error",
                t("no_conversation_selected") || "No conversation selected",
              );
              setOpen(false);
              setModal(null);
              isTransitioningRef.current = false;
              return;
            }
            setActionLoading(true);
            setOpen(false); // Close dropdown first
            const cid = conversationId != null ? String(conversationId) : null;
            // Update UI immediately via context (guaranteed) + event for other listeners
            if (cid) {
              clearConversationLocal(conversationId);
              if (typeof window !== "undefined") {
                window.dispatchEvent(
                  new CustomEvent("conversationClearedLocal", {
                    detail: { conversation_id: cid },
                  }),
                );
              }
            }
            try {
              await clearConversation(conversationId);
              showToast(
                "success",
                t("clear_success") || "Conversation cleared",
              );
              setModal(null);
              isTransitioningRef.current = false;
            } catch (err) {
              console.error("Error clearing conversation:", err);
              showToast(
                "error",
                err?.message ||
                  t("clear_error") ||
                  "Failed to clear conversation",
              );
              isTransitioningRef.current = false;
            } finally {
              setActionLoading(false);
            }
          }}
        />
      )}

      {/* Delete Modal - Always rendered but controlled by open prop */}
      <ConfirmModal
        key="delete-modal"
        open={modal === "delete"}
        icon={<FaTrash />}
        title={t("delete_chat")}
        message={t("delete_chat_message")}
        confirmLabel={
          actionLoading ? t("processing") || "Processing..." : t("delete_btn")
        }
        cancelLabel={t("cancel_btn") || "Cancel"}
        confirmDisabled={
          actionLoading || deleteConfirmText.trim().toUpperCase() !== "DELETE"
        }
        confirmLoading={actionLoading}
        color="bg-red-600"
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
      >
        <div
          className="mt-4"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          onKeyUp={(e) => e.stopPropagation()}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {t("delete_chat_confirm_typing") || "Type DELETE to confirm"}
          </p>
          <input
            value={deleteConfirmText}
            onChange={handleDeleteInputChange}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onFocus={(e) => {
              e.stopPropagation();
            }}
            onBlur={(e) => {
              e.stopPropagation();
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                deleteConfirmText.trim().toUpperCase() === "DELETE" &&
                !actionLoading
              ) {
                e.preventDefault();
                e.stopPropagation();
                const modalContent = e.target.closest(
                  ".bg-white, .dark\\:bg-neutral-900",
                );
                if (modalContent) {
                  const confirmBtn = modalContent.querySelector(
                    'button:not([class*="bg-gray"])',
                  );
                  if (confirmBtn && !confirmBtn.disabled) {
                    confirmBtn.click();
                  }
                }
              }
              e.stopPropagation();
            }}
            onKeyUp={(e) => {
              e.stopPropagation();
            }}
            className="w-full mt-2 p-2 bg-gray-50 dark:bg-neutral-800 border dark:border-neutral-700 rounded-md text-gray-800 dark:text-gray-200"
            placeholder={
              t("type_delete_placeholder") || "Type DELETE to confirm"
            }
            autoFocus={modal === "delete"}
          />
        </div>
      </ConfirmModal>
    </>
  );
}

//
// Menu Item
//
function MenuItem({ icon, label, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(e);
      }}
      onMouseDown={(e) => {
        // Prevent event from bubbling to click-outside handler
        e.stopPropagation();
      }}
      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
