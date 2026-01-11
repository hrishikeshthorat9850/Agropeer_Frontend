"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/Context/languagecontext";
import {
  FaSeedling,
  FaCloudSun,
  FaChartLine,
  FaUsers,
  FaComments,
  FaShoppingCart,
  FaCalculator,
  FaBug,
  FaTint,
  FaNewspaper,
  FaAward,
  FaGlobe,
  FaMobileAlt,
  FaDatabase,
  FaRocket,
} from "react-icons/fa";

export default function AboutUs() {
  const { t } = useLanguage();

  const coreFeatures = [
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: t("features_market"),
      description: t("features_market_desc"),
      color: "from-sunset-400 to-sunset-600",
      bgColor: "bg-sunset-100",
      iconColor: "text-sunset-600",
    },
    {
      icon: <FaCloudSun className="w-8 h-8" />,
      title: t("features_weather"),
      description: t("features_weather_desc"),
      color: "from-sky-400 to-sky-600",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      icon: <FaSeedling className="w-8 h-8" />,
      title: t("features_dashboard"),
      description: t("features_dashboard_desc"),
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: t("features_community"),
      description: t("features_community_desc"),
      color: "from-farm-400 to-farm-600",
      bgColor: "bg-farm-100",
      iconColor: "text-farm-600",
    },
    {
      icon: <FaShoppingCart className="w-8 h-8" />,
      title: t("features_marketplace"),
      description: t("features_marketplace_desc"),
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      icon: <FaCalculator className="w-8 h-8" />,
      title: t("features_calculator"),
      description: t("features_calculator_desc"),
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: <FaBug className="w-8 h-8" />,
      title: t("features_pest"),
      description: t("features_pest_desc"),
      color: "from-red-400 to-red-600",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
    {
      icon: <FaTint className="w-8 h-8" />,
      title: t("features_irrigation"),
      description: t("features_irrigation_desc"),
      color: "from-cyan-400 to-cyan-600",
      bgColor: "bg-cyan-100",
      iconColor: "text-cyan-600",
    },
    {
      icon: <FaNewspaper className="w-8 h-8" />,
      title: t("features_news"),
      description: t("features_news_desc"),
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: t("features_expert"),
      description: t("features_expert_desc"),
      color: "from-emerald-400 to-emerald-600",
      bgColor: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      icon: <FaDatabase className="w-8 h-8" />,
      title: t("features_database"),
      description: t("features_database_desc"),
      color: "from-indigo-400 to-indigo-600",
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: <FaMobileAlt className="w-8 h-8" />,
      title: t("features_mobile"),
      description: t("features_mobile_desc"),
      color: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-100",
      iconColor: "text-pink-600",
    },
  ];

  const stats = [
    {
      value: "28+",
      label: t("stats_states"),
      icon: <FaGlobe className="w-6 h-6" />,
    },
    {
      value: "1000+",
      label: t("stats_farmers"),
      icon: <FaUsers className="w-6 h-6" />,
    },
    {
      value: "500+",
      label: t("stats_crops"),
      icon: <FaSeedling className="w-6 h-6" />,
    },
    {
      value: "24/7",
      label: t("stats_support"),
      icon: <FaComments className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Sticky Mobile Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          {t("about_title")}
        </h1>
        <div className="w-8 h-8 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
          <FaSeedling className="text-farm-600 dark:text-farm-400" />
        </div>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-2 pt-6 space-y-8"
      >
        {/* Hero Card */}
        <section className="bg-white dark:bg-[#121212] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-farm-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-farm-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 transform rotate-3">
              <FaSeedling className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t("about_title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
              {t("about_subtitle")}
            </p>
          </div>
        </section>

        {/* Stats "Stories" */}
        <section>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="min-w-[140px] bg-white dark:bg-[#121212] p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center gap-2 shadow-sm"
              >
                <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-full text-farm-600">
                  {stat.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide text-center">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vision & Mission "Feed Cards" */}
        <section className="space-y-6">
          {/* Vision */}
          <div className="bg-white dark:bg-[#121212] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
            <div className="p-4 flex items-center gap-3 border-b border-gray-50 dark:border-white/5">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                <FaGlobe />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  {t("vision_title")}
                </h3>
                <p className="text-xs text-gray-500">Agropeer Vision</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t("vision_text")}
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white dark:bg-[#121212] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5">
            <div className="p-4 flex items-center gap-3 border-b border-gray-50 dark:border-white/5">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FaRocket />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                  {t("mission_title")}
                </h3>
                <p className="text-xs text-gray-500">Our Mission</p>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t("mission_text")}
              </p>
            </div>
          </div>
        </section>

        {/* Who We Are Context */}
        <section className="bg-gradient-to-br from-farm-600 to-green-700 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
          <FaUsers className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10" />
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaAward className="opacity-80" /> {t("who_we_are_title")}
          </h3>
          <div className="space-y-3 text-sm text-white/90 relative z-10">
            <p>{t("who_we_are_p1")}</p>
            <p>{t("who_we_are_p2")}</p>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t("features_title")}
            </h3>
            <span className="text-xs font-medium text-farm-600 dark:text-farm-400 bg-farm-50 dark:bg-farm-900/30 px-2 py-1 rounded-lg">
              All Apps
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {coreFeatures.map((feature, i) => (
              <motion.div
                key={i}
                whileTap={{ scale: 0.98 }}
                className="bg-white dark:bg-[#121212] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-3 h-full"
              >
                <div
                  className={`w-10 h-10 ${feature.bgColor} ${feature.iconColor} rounded-xl flex items-center justify-center shrink-0`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm leading-tight mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-900 dark:bg-white rounded-3xl p-6 text-center text-white dark:text-black">
          <h3 className="text-xl font-bold mb-2">{t("cta_title")}</h3>
          <p className="text-sm opacity-80 mb-6">{t("cta_subtitle")}</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/signup"
              className="w-full bg-farm-500 text-white py-3.5 rounded-xl font-bold active:scale-95 transition-transform"
            >
              {t("cta_get_started")}
            </Link>
            <Link
              href="/how-it-works"
              className="w-full bg-transparent border border-white/20 dark:border-black/20 text-white dark:text-black py-3.5 rounded-xl font-bold active:scale-95 transition-transform"
            >
              {t("cta_how_it_works")}
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
