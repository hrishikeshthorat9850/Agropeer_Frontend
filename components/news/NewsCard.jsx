"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaTag, FaCalendar } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function NewsCard({ article, index = 0 }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
      return formatDistanceToNow(date, { addSuffix: true });
    } catch {
      try {
        return new Date(dateString).toLocaleDateString();
      } catch {
        return "Recently";
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="farm-card overflow-hidden hover-lift group"
    >
      <Link href={`/news?id=${article.id}`} className="block">
        {/* Image */}
        {article.image_url && (
          <div className="relative w-full h-48 overflow-hidden bg-farm-100">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Category Badge */}
          {article.category && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-farm-100 text-farm-700 rounded-full text-xs font-semibold mb-3">
              <FaTag className="w-3 h-3" />
              {article.category}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-farm-900 mb-3 group-hover:text-farm-700 transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Summary/Description */}
          {article.summary && (
            <p className="text-farm-700 text-sm mb-4 line-clamp-3">
              {article.summary}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-farm-600">
              <FaCalendar className="w-3 h-3" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-farm-600 group-hover:text-farm-700 transition-colors">
              <span className="text-sm font-semibold">Read More</span>
              <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
