"use client";

import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaTag,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function MarketCard({ data }) {
  const { t } = useLanguage();
  const minPrice = parseFloat(data.min_price);
  const maxPrice = parseFloat(data.max_price);
  const modalPrice = parseFloat(data.modal_price);
  const priceRange = maxPrice - minPrice;
  const modalPosition =
    priceRange > 0 ? ((modalPrice - minPrice) / priceRange) * 100 : 50;

  // Format price with Indian number system
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(price);

  // Format date
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      {/* =================================================== */}
      {/* 📱 MOBILE – PREMIUM + DARK MODE ( < sm )            */}
      {/* =================================================== */}
      <div className="sm:hidden w-full relative">
        <div className="bg-white/90 dark:bg-[#181818] rounded-3xl shadow-lg border border-gray-100 dark:border-white/10 p-4 overflow-hidden relative">
          {/* Soft background circles */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-400/5 dark:bg-emerald-500/20 rounded-full" />
          <div className="absolute -bottom-14 -left-10 w-28 h-28 bg-sky-400/5 dark:bg-sky-500/10 rounded-full" />

          <div className="relative z-10">
            {/* Commodity */}
            <h2 className="text-[18px] font-extrabold text-gray-900 dark:text-white leading-snug mb-1">
              {data.commodity}
            </h2>

            {/* Variety + Grade */}
            <div className="flex items-center flex-wrap gap-2 mb-3">
              {data.variety && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200 text-[11px] font-semibold">
                  <FaTag className="text-[10px]" />
                  {data.variety}
                </span>
              )}
              {data.grade && (
                <span className="px-2 py-1 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-100 text-[10px] font-bold">
                  {data.grade}
                </span>
              )}
            </div>

            {/* Location + Date row */}
            <div className="flex items-center justify-between mb-3 text-[13px]">
              <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-200">
                <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-sm" />
                <span className="font-semibold">{data.market}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                <FaCalendarAlt className="text-sky-600 dark:text-sky-400 text-sm" />
                <span className="font-medium">
                  {formatDate(data.arrival_date)}
                </span>
              </div>
            </div>

            {/* PRICE CARD – primary highlight */}
            <div className="mt-2 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 dark:from-emerald-500 dark:via-emerald-600 dark:to-emerald-700 p-4 shadow-md border border-emerald-400/70">
              <div className="flex items-start justify-between">
                {/* Modal price */}
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-emerald-100 font-medium">
                    {t("modal_price")}
                  </p>
                  <p className="mt-1 text-[26px] font-extrabold text-white leading-none">
                    ₹{formatPrice(modalPrice)}
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-100/90">
                    {t("per_quintal")}
                  </p>
                </div>

                {/* Min / Max stacked chips */}
                <div className="flex flex-col items-end gap-1 text-[11px]">
                  <span className="px-2 py-1 rounded-full bg-white/10 text-emerald-50 font-semibold">
                    {t("min_max")}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-black/15 text-emerald-50 font-bold text-[12px]">
                    ₹{formatPrice(minPrice)} – ₹{formatPrice(maxPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================== */}
      {/* 💻 DESKTOP / TABLET – SAME UI + DARK MODE           */}
      {/* =================================================== */}
      <div className="hidden sm:block h-full">
        <div className="group bg-white dark:bg-[#272727] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/20 hover:border-emerald-400 overflow-hidden relative h-full flex flex-col">
          {/* Gradient accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400" />

          <div className="p-4 flex flex-col flex-grow">
            {/* Header Section */}
            <div className="mb-3">
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white mb-1.5 group-hover:text-emerald-500 transition-colors duration-200 line-clamp-2 min-h-[3rem]">
                {data.commodity}
              </h3>
              <div className="flex items-center flex-wrap gap-1.5">
                {data.variety && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/40 rounded-full border border-emerald-200 dark:border-emerald-700/70">
                    <FaTag className="text-emerald-600 dark:text-emerald-300 text-[10px]" />
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-100 truncate max-w-[80px]">
                      {data.variety}
                    </span>
                  </div>
                )}
                {data.grade && (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-sky-50 to-purple-50 dark:from-sky-900/40 dark:to-purple-900/40 text-sky-700 dark:text-sky-100 rounded-full text-[10px] font-bold border border-sky-200 dark:border-sky-700/70">
                    {data.grade}
                  </span>
                )}
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-3 p-2.5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#202020] dark:to-[#252525] rounded-lg border border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-1.5 mb-1.5">
                <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-sm flex-shrink-0" />
                <span className="font-bold text-gray-900 dark:text-white text-sm truncate">
                  {data.market}
                </span>
              </div>
              <div className="flex items-center flex-wrap gap-1.5 text-xs text-gray-600 dark:text-gray-300 ml-5">
                <span className="px-1.5 py-0.5 bg-white dark:bg-[#1b1b1b] rounded border border-gray-200 dark:border-white/10 font-medium truncate max-w-[100px]">
                  {data.district}
                </span>
                <span className="px-1.5 py-0.5 bg-white dark:bg-[#1b1b1b] rounded border border-gray-200 dark:border-white/10 font-medium truncate max-w-[100px]">
                  {data.state}
                </span>
              </div>
            </div>

            {/* Date Section */}
            <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-sky-50 dark:bg-sky-900/40 rounded-lg border border-sky-100 dark:border-sky-800">
              <div className="p-1.5 bg-sky-100 dark:bg-sky-800 rounded">
                <FaCalendarAlt className="text-sky-600 dark:text-sky-300 text-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-sky-600 dark:text-sky-200 font-semibold uppercase tracking-wide block">
                  {t("date_label")}
                </span>
                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {formatDate(data.arrival_date)}
                </p>
              </div>
            </div>

            {/* Price Range Visualization */}
            <div className="mb-3 flex-grow">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {t("price_range_label")}
                </span>
                <span className="text-[10px] text-gray-400 dark:text-gray-400">
                  {t("price_unit")}
                </span>
              </div>

              {/* Price Bar */}
              <div className="relative h-8 bg-gradient-to-r from-emerald-300 via-yellow-300 to-red-400 rounded-lg overflow-hidden shadow-inner border border-gray-200 dark:border-white/10">
                {/* Modal Price Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-gray-900 dark:bg-white shadow-lg z-10 transition-all duration-300 group-hover:w-1.5"
                  style={{ left: `${modalPosition}%` }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-[#111111] text-white text-[10px] font-extrabold px-2 py-1 rounded shadow-lg whitespace-nowrap border border-white/60 dark:border-white/20">
                    ₹{formatPrice(modalPrice)}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-gray-900 dark:border-t-[#111111]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Min / Max */}
              <div className="flex justify-between items-center mt-2 gap-1.5">
                <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 dark:bg-emerald-900/40 rounded border border-emerald-200 dark:border-emerald-700 flex-1">
                  <FaArrowDown className="text-emerald-600 dark:text-emerald-300 text-[10px]" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-200 font-semibold block">
                      {t("min_label")}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-100 truncate">
                      ₹{formatPrice(minPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/40 rounded border border-red-200 dark:border-red-700 flex-1">
                  <FaArrowUp className="text-red-600 dark:text-red-300 text-[10px]" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-red-600 dark:text-red-200 font-semibold block">
                      {t("max_label")}
                    </span>
                    <span className="text-xs font-bold text-red-700 dark:text-red-100 truncate">
                      ₹{formatPrice(maxPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Price Highlight Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-xl p-3 shadow-lg border-2 border-emerald-400 dark:border-emerald-500 group-hover:scale-[1.01] transition-transform duration-300 mt-auto">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 dark:bg-black/20 rounded-full -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 dark:bg-black/30 rounded-full -ml-8 -mb-8" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-emerald-100 text-[10px] font-semibold uppercase tracking-wide block">
                      {t("modal_price")}
                    </span>
                    <span className="text-emerald-50 text-[10px]">
                      {t("per_quintal")}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-white drop-shadow-lg">
                      ₹{formatPrice(modalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
