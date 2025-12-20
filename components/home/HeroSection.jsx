"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";

const HeroSection = ({ communityStats }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-farm-600 via-farm-700 to-farm-800 bg-clip-text text-transparent"
      >
        {t("welcome_title")}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-sunset-600 via-orange-600 to-red-600 bg-clip-text text-transparent dark:!text-orange-500 dark:!bg-none"
      >
        {t("welcome_subtitle")}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-lg md:text-xl font-semibold mb-8 text-sky-700"
      ></motion.p>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        {communityStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
            className="farm-card p-4 text-center hover-lift"
          >
            <div className="flex items-center justify-center mb-2">
              {stat.icon}
            </div>

            <div className="text-3xl font-black text-farm-800 mb-1 dark:text-gray-200">
              {stat.value}
            </div>

            <div className="text-sm font-bold text-farm-600">
              {t(stat.label)}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
