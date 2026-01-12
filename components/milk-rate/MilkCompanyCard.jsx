"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaCalendar, FaTag } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

import { useLanguage } from "@/Context/languagecontext";

export default function MilkCompanyCard({ company, index = 0 }) {
  const { t } = useLanguage();

  const getInitials = (name) => {
    if (!name) return "??";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return t("recent");
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return t("recent");
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      return t("recent");
    }
  };

  return (
    <Link href={`/milk-rate-calculator?id=${company.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white dark:bg-black py-4 border-b border-gray-100 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors"
      >
        <div className="flex gap-4">
          {/* Avatar Icon */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-white/10 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-sm">
              {getInitials(company.name)}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Title & Metadata */}
            <div className="flex flex-col mb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-1">
                {company.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                {company.milk_type && (
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {company.milk_type}
                  </span>
                )}
                {company.region && (
                  <>
                    <span>•</span>
                    <span>{company.region}</span>
                  </>
                )}
              </div>
            </div>

            {/* Rates Grid Preview */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-lg">
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t("fat_rate")}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">₹{company.fat_rate?.toFixed(2) || "N/A"}</div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-lg">
                <div className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wide">{t("snf_rate")}</div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">₹{company.snf_rate?.toFixed(2) || "N/A"}</div>
              </div>
            </div>

            {/* Footer / Updated Time */}
            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
              <div className="flex items-center gap-1">
                <FaCalendar className="w-3 h-3" />
                <span>{formatDate(company.updated_at)}</span>
              </div>
              <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium pr-1">
                {t("view_details")} <FaArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

