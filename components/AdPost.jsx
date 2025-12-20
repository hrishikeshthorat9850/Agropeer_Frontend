"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AdPost({ ad }) {
  if (!ad) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition-all dark:bg-none dark:bg-yellow-800"
    >
      <div className="relative w-full md:w-1/3 h-64 md:h-auto flex-shrink-0">
        <Image
          src={ad.imageUrl || "https://via.placeholder.com/400x300"}
          alt={ad.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-300 hover:scale-105 rounded-xl"
        />
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 relative">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-yellow-800 mb-2">
            {ad.title || "Sponsored"}
          </h3>
          <p className="text-yellow-700 text-sm md:text-base mb-4 line-clamp-3">
            {ad.description || "Check out this special offer from our partner!"}
          </p>
        </div>

        <Link
          href={ad.link || "#"}
          target="_blank"
          className="self-start mt-auto px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
        >
          Learn More
        </Link>

        <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          AD
        </span>
      </div>
    </motion.div>
  );
}
