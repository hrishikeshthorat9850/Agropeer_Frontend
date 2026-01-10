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

  // This function is not used in the card, but kept for potential future use
  const calculateRate = (fat, snf) => {
    if (!company) return 0;
    if (company.base_rate !== null && company.base_rate !== undefined &&
      company.fat_multiplier !== null && company.fat_multiplier !== undefined &&
      company.snf_multiplier !== null && company.snf_multiplier !== undefined) {
      return Number((company.base_rate + fat * company.fat_multiplier + snf * company.snf_multiplier).toFixed(2));
    }
    return company.per_liter_rate || 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="farm-card p-6 hover-lift group"
    >
      <Link href={`/milk-rate-calculator?id=${company.id}`} className="block">
        {/* Header with Icon and Name */}
        <div className="flex items-start gap-4 mb-4">
          {/* Placeholder Icon */}
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-farm-400 to-farm-600 flex items-center justify-center text-white font-bold text-xl shadow-farm">
            {getInitials(company.name)}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-display font-bold text-farm-900 group-hover:text-farm-700 transition-colors mb-2 line-clamp-1">
              {company.name}
            </h3>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {company.milk_type && (
                <div className="inline-flex items-center gap-1 px-2 py-1 bg-farm-100 text-farm-700 rounded-full text-xs font-semibold">
                  <FaTag className="w-3 h-3" />
                  {company.milk_type}
                </div>
              )}
              {company.region && (
                <span className="text-xs text-farm-600">{company.region}</span>
              )}
            </div>
          </div>
        </div>

        {/* Rates */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-farm-50 rounded-xl">
            <div className="text-xs text-farm-600 mb-1">{t("fat_rate")}</div>
            <div className="text-lg font-bold text-farm-900">
              ₹{company.fat_rate?.toFixed(2) || "N/A"}
            </div>
          </div>
          <div className="p-3 bg-farm-50 rounded-xl">
            <div className="text-xs text-farm-600 mb-1">{t("snf_rate")}</div>
            <div className="text-lg font-bold text-farm-900">
              ₹{company.snf_rate?.toFixed(2) || "N/A"}
            </div>
          </div>
        </div>

        {/* Per Liter Rate */}
        {company.per_liter_rate && (
          <div className="mb-4 p-3 bg-farm-100 rounded-xl">
            <div className="text-xs text-farm-600 mb-1">{t("base_rate")} ({t("per_liter")})</div>
            <div className="text-xl font-bold text-farm-900">
              ₹{company.per_liter_rate.toFixed(2)}
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-farm-600">
            <FaCalendar className="w-3 h-3" />
            <span>{t("updated")} {formatDate(company.updated_at)}</span>
          </div>
          <div className="flex items-center gap-2 text-farm-600 group-hover:text-farm-700 transition-colors">
            <span className="text-sm font-semibold">{t("view_details")}</span>
            <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

