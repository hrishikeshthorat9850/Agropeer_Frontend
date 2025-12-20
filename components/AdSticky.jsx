"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AdSticky({ ads }) {
  const [ad, setAd] = useState(null);

  useEffect(() => {
    if (!ads || ads.length === 0) return;
    setAd(ads[Math.floor(Math.random() * ads.length)]);
  }, [ads]);

  if (!ad) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:flex flex-col w-72 bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-300 rounded-2xl shadow-lg overflow-hidden sticky top-24 p-4 dark:bg-none dark:bg-yellow-800"
    >
      <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
        <Image
          src={ad.imageUrl || "https://via.placeholder.com/400x300"}
          alt={ad.title}
          fill
          style={{ objectFit: "cover" }}
          className="hover:scale-105 transition-transform duration-300 rounded-xl"
        />
      </div>

      <h3 className="text-lg font-bold text-yellow-800 mb-2">{ad.title}</h3>
      <p className="text-yellow-700 text-sm mb-4 line-clamp-3">{ad.description}</p>

      <Link
        href={ad.link || "#"}
        target="_blank"
        className="inline-block px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
      >
        Learn More
      </Link>

      <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
        AD
      </span>
      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow animate-pulse">
        Special Offer
      </span>
    </motion.div>
  );
}
