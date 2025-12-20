"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AdBanner({ ads }) {
  const [currentAd, setCurrentAd] = useState(null);

  useEffect(() => {
    if (!ads || ads.length === 0) return;

    // Pick initial ad randomly
    setCurrentAd(ads[Math.floor(Math.random() * ads.length)]);

    // Rotate ads every 10 seconds
    const interval = setInterval(() => {
      setCurrentAd(ads[Math.floor(Math.random() * ads.length)]);
    }, 10000);

    return () => clearInterval(interval);
  }, [ads]);

  if (!currentAd) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-300 rounded-2xl shadow-lg overflow-hidden p-4 mb-8 flex flex-col md:flex-row items-center justify-between dark:bg-none dark:!bg-yellow-800"
    >
      <div className="relative w-full md:w-1/4 h-32 md:h-24 flex-shrink-0 rounded-xl overflow-hidden">
        <Image
          src={currentAd.imageUrl || "https://via.placeholder.com/400x300"}
          alt={currentAd.title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-xl transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="flex-1 md:ml-4">
        <h3 className="text-lg md:text-xl font-bold text-yellow-800 mb-1">
          {currentAd.title}
        </h3>
        <p className="text-yellow-700 text-sm md:text-base line-clamp-2">
          {currentAd.description}
        </p>
      </div>

      <Link
        href={currentAd.link || "#"}
        target="_blank"
        className="mt-2 md:mt-0 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition"
      >
        Learn More
      </Link>
    </motion.div>
  );
}
