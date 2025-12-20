"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowRight, FaMapMarkerAlt, FaTag } from "react-icons/fa";

export default function SchemeCard({ scheme, index = 0 }) {
  const benefits = scheme.benefits ? (Array.isArray(scheme.benefits) ? scheme.benefits : JSON.parse(scheme.benefits || "[]")) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="farm-card p-6 hover-lift group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {scheme.icon && (
              <span className="text-2xl">{scheme.icon}</span>
            )}
            <h3 className="text-xl font-display font-bold text-farm-900 group-hover:text-farm-700 transition-colors">
              {scheme.title}
            </h3>
          </div>
          
          {/* Category Badge */}
          {scheme.category && (
            <div className="inline-flex items-center gap-1 px-3 py-1 bg-farm-100 text-farm-700 rounded-full text-xs font-semibold mb-3">
              <FaTag className="w-3 h-3" />
              {scheme.category}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-farm-700 text-sm mb-4 line-clamp-2">
        {scheme.description}
      </p>

      {/* Key Benefits Preview */}
      {benefits.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-2">
            {benefits.slice(0, 2).map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-farm-600">
                <span className="text-farm-500 mt-1">✓</span>
                <span className="line-clamp-1">{typeof benefit === 'string' ? benefit : benefit.text || benefit}</span>
              </li>
            ))}
            {benefits.length > 2 && (
              <li className="text-xs text-farm-500 italic">
                +{benefits.length - 2} more benefits
              </li>
            )}
          </ul>
        </div>
      )}

      {/* State Badge */}
      {scheme.state && (
        <div className="flex items-center gap-1 text-xs text-farm-600 mb-4">
          <FaMapMarkerAlt className="w-3 h-3" />
          <span>{scheme.state}</span>
        </div>
      )}

      {/* Action Button */}
      <Link
        href={`/government-schemes?id=${scheme.id}`}
        className="inline-flex items-center gap-2 px-4 py-2 bg-farm-500 text-white rounded-xl hover:bg-farm-600 transition-all duration-300 font-semibold text-sm group-hover:gap-3"
      >

        <span>View Details</span>
        <FaArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}

