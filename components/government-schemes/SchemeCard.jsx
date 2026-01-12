"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt, FaTag } from "react-icons/fa";

import { useLanguage } from "@/Context/languagecontext";

export default function SchemeCard({ scheme, index = 0 }) {
  const { t } = useLanguage();
  const benefits = scheme.benefits ? (Array.isArray(scheme.benefits) ? scheme.benefits : JSON.parse(scheme.benefits || "[]")) : [];

  return (
    <Link href={`/government-schemes?id=${scheme.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white dark:bg-black py-4 border-b border-gray-100 dark:border-white/5 active:bg-gray-50 dark:active:bg-white/5 transition-colors"
      >
        {/* Card Content Container */}
        <div className="flex gap-4">
          {/* Leading Icon (Avatar style) */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-2xl">
              {scheme.icon || "📜"}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            {/* Header / Title */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
                {scheme.title}
              </h3>
              {/* Optional: Category Badge if crucial, or put it below */}
            </div>

            {/* Metadata Row */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
              {scheme.category && (
                <span className="font-medium text-green-600 dark:text-green-400">
                  {t(`scheme_cat_${scheme.category.replace(/\s+/g, "_")}`) || scheme.category}
                </span>
              )}
              <span>•</span>
              {scheme.state && (
                <span>{t(`state_${scheme.state.replace(/\s+/g, "_")}`) || scheme.state}</span>
              )}
            </div>

            {/* Description Snippet */}
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
              {scheme.description}
            </p>

            {/* Action / Benefits Hint */}
            <div className="flex items-center gap-4">
              {benefits.length > 0 && (
                <div className="flex -space-x-2">
                  {benefits.slice(0, 3).map((_, i) => (
                    <div key={i} className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 border-2 border-white dark:border-black flex items-center justify-center text-[8px] text-green-700 font-bold">✓</div>
                  ))}
                </div>
              )}
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {t("view_details") || "View Details"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

