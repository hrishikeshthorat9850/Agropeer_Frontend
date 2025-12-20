"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import {
  FaEllipsisV,
  FaExclamationTriangle,
  FaTrash,
  FaBroom,
} from "react-icons/fa";

//
// 🧩 Confirm Modal (Portal)
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
}) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl w-full max-w-md text-center border border-gray-100 dark:border-neutral-800 p-6"
          >
            <div className={`mx-auto flex items-center justify-center w-14 h-14 rounded-full ${color} bg-opacity-10 mb-4`}>
              <div className={`text-2xl ${color.replace("bg-", "text-")}`}>{icon}</div>
            </div>

            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{message}</p>
            {children}

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className={`px-4 py-2 rounded-md text-white ${color} hover:opacity-90 transition-colors`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

//
// ⭐ FIXED DROPDOWN — NOW MODALS ALSO WORK
//
export default function ChatOptionsMenu() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [reportReason, setReportReason] = useState("");
  const btnRef = useRef(null);

  const menuWidth = 176;
  const [coords, setCoords] = useState({ top: 0, left: 0 });

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

  // CLOSE DROPDOWN ONLY WHEN CLICKED OUTSIDE BOTH button + dropdown
  useEffect(() => {
    const handler = (e) => {
      const btn = btnRef.current;
      const dropdownEl = document.getElementById("dropdown-portal");

      if (btn?.contains(e.target)) return;
      if (dropdownEl?.contains(e.target)) return;

      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const dropdownUI = (
    <div
      id="dropdown-portal"
      className="w-44 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-lg overflow-hidden z-[9999]"
    >
      <MenuItem
        icon={<FaExclamationTriangle className="text-red-500" />}
        label="Report"
        onClick={() => setModal("report")}
      />
      <MenuItem
        icon={<FaBroom className="text-yellow-500" />}
        label="Clear Chat"
        onClick={() => setModal("clear")}
      />
      <MenuItem
        icon={<FaTrash className="text-red-600" />}
        label="Delete Chat"
        onClick={() => setModal("delete")}
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
          document.body
        )}

      {/* Report Modal */}
      {modal === "report" && (
        <ConfirmModal
          open
          icon={<FaExclamationTriangle />}
          title="Report Chat"
          message="Please describe why you're reporting this chat."
          confirmLabel="Submit"
          color="bg-red-600"
          onClose={() => setModal(null)}
          onConfirm={() => setModal(null)}
        >
          <textarea
            value={reportReason}
            onChange={(e) => setReportReason(e.target.value)}
            className="w-full mt-4 p-2 bg-gray-50 dark:bg-neutral-800 border dark:border-neutral-700 rounded-md text-gray-800 dark:text-gray-200"
            rows={3}
            placeholder="Write your reason..."
          />
        </ConfirmModal>
      )}

      {/* Clear Modal */}
      {modal === "clear" && (
        <ConfirmModal
          open
          icon={<FaBroom />}
          title="Clear Chat"
          message="Are you sure?"
          confirmLabel="Clear"
          color="bg-yellow-500"
          onClose={() => setModal(null)}
          onConfirm={() => setModal(null)}
        />
      )}

      {/* Delete Modal */}
      {modal === "delete" && (
        <ConfirmModal
          open
          icon={<FaTrash />}
          title="Delete Chat"
          message="This will permanently delete this chat."
          confirmLabel="Delete"
          color="bg-red-600"
          onClose={() => setModal(null)}
          onConfirm={() => setModal(null)}
        />
      )}
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
      onClick={onClick}
      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
