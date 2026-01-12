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
    <div className="w-full relative active:scale-[0.98] transition-all duration-200 ease-out touch-manipulation">
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-[#333] overflow-hidden relative group hover:shadow-md transition-shadow">

        <div className="p-4 relative z-10">
          {/* Header Row: Commodity & Date */}
          <div className="flex justify-between items-start mb-2.5">
            <h2 className="text-[17px] font-extrabold text-slate-800 dark:text-slate-100 leading-tight tracking-tight">
              {data.commodity}
            </h2>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 dark:bg-[#2C2C2C] rounded-lg border border-slate-100 dark:border-[#333]">
              <FaCalendarAlt className="text-slate-400 text-[10px]" />
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                {formatDate(data.arrival_date)}
              </span>
            </div>
          </div>

          {/* District / Market Subtitle */}
          <div className="flex items-center gap-1.5 mb-3.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <div className="w-5 h-5 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center flex-shrink-0">
              <FaMapMarkerAlt className="text-red-500 dark:text-red-400 text-[10px]" />
            </div>
            <span className="truncate">{data.market}, {data.district}</span>
          </div>

          {/* Tags Row */}
          <div className="flex items-center flex-wrap gap-2 mb-4">
            {data.variety && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-100 dark:border-emerald-800/30">
                <FaTag className="text-[9px]" />
                {data.variety}
              </span>
            )}
            {data.grade && (
              <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-[11px] font-semibold border border-blue-100 dark:border-blue-800/30">
                {data.grade}
              </span>
            )}
          </div>

          {/* Price Section - "Card within Card" look */}
          <div className="bg-slate-50 dark:bg-[#252525] -mx-4 -mb-4 px-4 py-3 border-t border-slate-100 dark:border-[#333] flex items-center justify-between mt-auto">
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">{t("modal_price")}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  ₹{formatPrice(modalPrice)}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">/ {t("per_quintal")}</span>
              </div>
            </div>

            {/* Min/Max Simple Display */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 mb-0.5">
                <span className="text-[10px] text-slate-400 font-medium">{t("min_max")}</span>
              </div>
              <div className="px-2 py-1 bg-white dark:bg-[#1E1E1E] rounded border border-slate-200 dark:border-[#333] text-xs font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                ₹{formatPrice(minPrice)} - ₹{formatPrice(maxPrice)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
