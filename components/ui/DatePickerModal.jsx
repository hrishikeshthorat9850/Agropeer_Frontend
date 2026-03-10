"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  isBefore,
  startOfDay,
} from "date-fns";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useBackPress } from "@/Context/BackHandlerContext";
import { dateFormat } from "@/utils/dateFormat.js";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * DatePickerModal – touch-friendly calendar for Android/web.
 * value, onChange: use yyyy-mm-dd (ISO date) for storage.
 * Display is always dd-mm-yyyy via dateFormat.
 */
export default function DatePickerModal({
  isOpen,
  onClose,
  value,
  onChange,
  minDate,
  maxDate,
  title = "Select date",
  zIndex = 9999,
}) {
  const [viewDate, setViewDate] = useState(() =>
    value ? new Date(value + "T12:00:00") : new Date()
  );
  const [mounted, setMounted] = useState(false);

  useBackPress(
    () => {
      if (isOpen) {
        onClose();
        return true;
      }
      return false;
    },
    20,
    isOpen
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setViewDate(value ? new Date(value + "T12:00:00") : new Date());
    }
  }, [isOpen, value]);

  const selectedDate = value ? new Date(value + "T12:00:00") : null;
  const min = minDate ? startOfDay(new Date(minDate)) : null;
  const max = maxDate ? startOfDay(new Date(maxDate)) : null;

  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = monthStart.getDay();
  const paddedDays = [...Array(startPad).fill(null), ...days];

  const handleSelect = (day) => {
    if (!day) return;
    const d = startOfDay(day);
    if (min && isBefore(d, min)) return;
    if (max && isBefore(max, d)) return;
    const iso = format(d, "yyyy-MM-dd");
    onChange(iso);
    onClose();
  };

  const goPrev = () => setViewDate((d) => subMonths(d, 1));
  const goNext = () => setViewDate((d) => addMonths(d, 1));

  const handleToday = () => {
    const today = startOfDay(new Date());
    if (min && isBefore(today, min)) return;
    if (max && isBefore(max, today)) return;
    onChange(format(today, "yyyy-MM-dd"));
    onClose();
  };

  if (!mounted || typeof document === "undefined") return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50"
            style={{ zIndex }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed left-0 right-0 bottom-0 rounded-t-3xl bg-white dark:bg-[#1E1E1E] shadow-2xl max-h-[85vh] flex flex-col"
            style={{ zIndex: zIndex + 1 }}
          >
            {/* Handle bar for mobile */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 -m-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400"
                aria-label="Close"
              >
                <span className="text-lg font-semibold">✕</span>
              </button>
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between px-4 py-3">
              <button
                type="button"
                onClick={goPrev}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 active:scale-95 touch-manipulation"
                aria-label="Previous month"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg font-semibold text-gray-900 dark:text-white min-w-[140px] text-center">
                {format(viewDate, "MMMM yyyy")}
              </span>
              <button
                type="button"
                onClick={goNext}
                className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 active:scale-95 touch-manipulation"
                aria-label="Next month"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-1 px-4 pb-2">
              {WEEKDAYS.map((wd) => (
                <div
                  key={wd}
                  className="text-center text-xs font-semibold text-gray-500 dark:text-gray-400 py-1"
                >
                  {wd}
                </div>
              ))}
            </div>

            {/* Calendar grid - touch-friendly 44px+ targets */}
            <div className="grid grid-cols-7 gap-2 px-4 pb-4 overflow-y-auto flex-1 min-h-0">
              {paddedDays.map((day, i) => {
                if (!day) {
                  return <div key={`empty-${i}`} className="aspect-square" />;
                }
                const d = startOfDay(day);
                const disabled =
                  (min && isBefore(d, min)) || (max && isBefore(max, d));
                const selected = selectedDate && isSameDay(d, selectedDate);
                const today = isToday(d);
                const inView = isSameMonth(d, viewDate);

                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => handleSelect(day)}
                    disabled={disabled}
                    className={`
                      aspect-square min-w-[44px] min-h-[44px] rounded-xl text-base font-medium
                      flex items-center justify-center touch-manipulation
                      transition-colors active:scale-95
                      ${!inView ? "text-gray-300 dark:text-gray-600" : ""}
                      ${disabled ? "opacity-40 cursor-not-allowed" : ""}
                      ${
                        selected
                          ? "bg-farm-500 text-white shadow-md dark:bg-emerald-600"
                          : today
                          ? "bg-farm-100 dark:bg-emerald-900/30 text-farm-700 dark:text-emerald-300 ring-2 ring-farm-400 dark:ring-emerald-500"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                      }
                    `}
                  >
                    {format(d, "d")}
                  </button>
                );
              })}
            </div>

            {/* Today shortcut */}
            <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={handleToday}
                className="w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium active:scale-[0.98] touch-manipulation"
              >
                Today
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

/**
 * Inline trigger + modal: tap to open calendar, display dd-mm-yyyy.
 * value/onChange in yyyy-mm-dd.
 */
export function DatePickerField({
  value,
  onChange,
  placeholder = "dd-mm-yyyy",
  minDate,
  maxDate,
  title = "Select date",
  disabled = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const display = value ? dateFormat(value) : "";

  return (
    <>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(true)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        className={`
          w-full flex items-center gap-3 p-3 rounded-xl border
          text-left text-farm-500 dark:text-gray-100
          border-farm-200 dark:border-gray-700
          bg-white dark:bg-[#2C2C2C]
          focus:outline-none focus:ring-2 focus:ring-farm-400 dark:focus:ring-emerald-500/50
          touch-manipulation min-h-[48px]
          ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
        aria-label={title}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <FaCalendarAlt className="w-5 h-5 flex-shrink-0 text-farm-500 dark:text-emerald-400" />
        <span className={display ? "font-medium" : "text-gray-400 dark:text-gray-500"}>
          {display || placeholder}
        </span>
      </div>
      <DatePickerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={value}
        onChange={(iso) => {
          onChange(iso);
        }}
        minDate={minDate}
        maxDate={maxDate}
        title={title}
      />
    </>
  );
}
