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
    { value: "28+", label: t("stats_states"), icon: <FaGlobe className="w-6 h-6" /> },
    { value: "1000+", label: t("stats_farmers"), icon: <FaUsers className="w-6 h-6" /> },
    { value: "500+", label: t("stats_crops"), icon: <FaSeedling className="w-6 h-6" /> },
    { value: "24/7", label: t("stats_support"), icon: <FaComments className="w-6 h-6" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[calc(100vh-122px)]"
    >
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 md:py-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaSeedling className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-farm-900 mb-6">
            {t("about_title")} 🌱
          </h1>

          <p className="text-farm-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
            {t("about_subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="bg-farm-50 py-12 dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3 text-farm-600">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-farm-900 mb-2 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-farm-700 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-farm-900 mb-6">{t("who_we_are_title")}</h2>

            <div className="space-y-4 text-farm-700 leading-relaxed">
              <p className="text-lg">{t("who_we_are_p1")}</p>
              <p>{t("who_we_are_p2")}</p>
              <p>{t("who_we_are_p3")}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-farm-200 dark:border-white/20">
              <div className="bg-gradient-to-br from-farm-400 to-green-500 p-12 text-white text-center">
                <FaRocket className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">{t("vision_title")}</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vision + Mission */}
      <div className="bg-white py-16 dark:bg-[#272727]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-farm-50 rounded-2xl p-8 shadow-lg border border-farm-200 dark:bg-[#1E1E1E] dark:border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-farm-600 rounded-xl flex items-center justify-center">
                  <FaGlobe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-farm-900">{t("vision_title")}</h3>
              </div>

              <p className="text-farm-700 leading-relaxed text-lg">{t("vision_text")}</p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-farm-50 rounded-2xl p-8 shadow-lg border border-sky-200 dark:bg-[#1E1E1E] dark:border-white/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center">
                  <FaRocket className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-farm-900">{t("mission_title")}</h3>
              </div>

              <p className="text-farm-700 leading-relaxed text-lg">{t("mission_text")}</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Features */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-farm-900 mb-4">{t("features_title")}</h2>
          <p className="text-farm-700 max-w-2xl mx-auto text-lg">{t("features_subtitle")}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.05 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-md border border-farm-200 hover:shadow-xl transition-all duration-300 h-full dark:bg-[#1E1E1E] dark:border-white/20">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-farm-900 mb-3 dark:text-white">{feature.title}</h3>
                <p className="text-farm-700 leading-relaxed dark:text-gray-300">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-farm-500 to-green-600 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("cta_title")}</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">{t("cta_subtitle")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="bg-white text-farm-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                {t("cta_get_started")}
              </Link>

              <Link
                href="/how-it-works"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
              >
                {t("cta_how_it_works")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
