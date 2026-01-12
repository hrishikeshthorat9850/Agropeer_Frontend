"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaTag, FaCalendar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

import { useLanguage } from "@/Context/languagecontext";

export default function NewsCard({ article, index = 0 }) {
  const { t } = useLanguage();
  const formatDate = (dateString) => {
    if (!dateString) return t("recently");
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      try {
        return new Date(dateString).toLocaleDateString();
      } catch {
        return t("recently");
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="bg-white dark:bg-[#1E1E1E] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#333]"
    >
      <Link href={`/news?id=${article.id}`} className="block">
        {/* Header / Meta */}
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-xs">
              {article.category
                ? article.category.charAt(0).toUpperCase()
                : "N"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900 dark:text-white leading-none">
                {article.category || "News"}
              </span>
              <span className="text-[10px] text-gray-500 font-medium mt-0.5">
                {formatDate(article.date)}
              </span>
            </div>
          </div>
        </div>

        {/* Categories / Tags (Optional - can be inline) */}

        {/* Title */}
        <div className="px-5 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2">
            {article.title}
          </h3>
        </div>

        {/* Image - Full Width */}
        {article.image_url && (
          <div className="relative w-full aspect-video bg-gray-100 dark:bg-[#2C2C2C]">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Summary & Footer */}
        <div className="p-5">
          {article.summary && (
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed mb-4">
              {article.summary}
            </p>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-[#333]">
            <button className="text-xs font-bold text-gray-500 hover:text-green-600 transition-colors dark:text-gray-400">
              {t("read_more")}
            </button>
            <div className="flex items-center gap-3">
              <FaArrowRight className="text-gray-400 w-4 h-4 -rotate-45" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
