"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/Context/languagecontext";
import {
  FaUserPlus,
  FaCloudSun,
  FaChartLine,
  FaSeedling,
  FaUsers,
  FaShoppingCart,
  FaCalculator,
  FaCheckCircle,
  FaArrowRight,
  FaMobileAlt,
  FaGlobe,
  FaShieldAlt,
  FaRocket,
} from "react-icons/fa";

export default function HowItWorks() {
  const { t } = useLanguage();
  const [expandedFeatures, setExpandedFeatures] = useState({});

  const toggleFeature = (index) => {
    setExpandedFeatures((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle state
    }));
  };

  const gettingStartedSteps = [
    {
      step: 1,
      title: t("step1_title"),
      description: t("step1_desc"),
      icon: <FaUserPlus className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      features: [t("step1_feature1"), t("step1_feature2"), t("step1_feature3")],
    },
    {
      step: 2,
      title: t("step2_title"),
      description: t("step2_desc"),
      icon: <FaGlobe className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      features: [t("step2_feature1"), t("step2_feature2"), t("step2_feature3")],
    },
    {
      step: 3,
      title: t("step3_title"),
      description: t("step3_desc"),
      icon: <FaRocket className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      features: [t("step3_feature1"), t("step3_feature2"), t("step3_feature3")],
    },
  ];

  const mainFeatures = [
    {
      title: t("mf1_title"),
      description: t("mf1_desc"),
      icon: <FaChartLine className="w-8 h-8" />,
      steps: [t("mf1_step1"), t("mf1_step2"), t("mf1_step3"), t("mf1_step4")],
      color: "from-sunset-400 to-sunset-600",
      bgColor: "bg-sunset-100",
      iconColor: "text-sunset-600",
      link: "/market-prices",
    },
    {
      title: t("mf2_title"),
      description: t("mf2_desc"),
      icon: <FaSeedling className="w-8 h-8" />,
      steps: [
        t("mf2_step1"),
        t("mf2_step2"),
        t("mf2_step3"),
        t("mf2_step4"),
        t("mf2_step5"),
      ],
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      link: "/farmer-dashboard",
    },
    {
      title: t("mf3_title"),
      description: t("mf3_desc"),
      icon: <FaCloudSun className="w-8 h-8" />,
      steps: [t("mf3_step1"), t("mf3_step2"), t("mf3_step3"), t("mf3_step4")],
      color: "from-sky-400 to-sky-600",
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
      link: "/weather",
    },
    {
      title: t("mf4_title"),
      description: t("mf4_desc"),
      icon: <FaUsers className="w-8 h-8" />,
      steps: [
        t("mf4_step1"),
        t("mf4_step2"),
        t("mf4_step3"),
        t("mf4_step4"),
        t("mf4_step5"),
      ],
      color: "from-farm-400 to-farm-600",
      bgColor: "bg-farm-100",
      iconColor: "text-farm-600",
      link: "/",
    },
    {
      title: t("mf5_title"),
      description: t("mf5_desc"),
      icon: <FaShoppingCart className="w-8 h-8" />,
      steps: [
        t("mf5_step1"),
        t("mf5_step2"),
        t("mf5_step3"),
        t("mf5_step4"),
        t("mf5_step5"),
      ],
      color: "from-orange-400 to-orange-600",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
      link: "/market",
    },
    {
      title: t("mf6_title"),
      description: t("mf6_desc"),
      icon: <FaCalculator className="w-8 h-8" />,
      steps: [
        t("mf6_step1"),
        t("mf6_step2"),
        t("mf6_step3"),
        t("mf6_step4"),
        t("mf6_step5"),
      ],
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      link: "/explore",
    },
  ];

  const benefits = [
    {
      title: t("benefit1_title"),
      description: t("benefit1_desc"),
      icon: <FaChartLine className="w-6 h-6" />,
    },
    {
      title: t("benefit2_title"),
      description: t("benefit2_desc"),
      icon: <FaShieldAlt className="w-6 h-6" />,
    },
    {
      title: t("benefit3_title"),
      description: t("benefit3_desc"),
      icon: <FaCheckCircle className="w-6 h-6" />,
    },
    {
      title: t("benefit4_title"),
      description: t("benefit4_desc"),
      icon: <FaUsers className="w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-black pb-6">
      {/* Sticky Mobile Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          {t("how_title")}
        </h1>
        <Link
          href="/about-us"
          className="w-8 h-8 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center"
        >
          <FaArrowRight className="text-farm-600 dark:text-farm-400 w-4 h-4" />
        </Link>
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="px-2 pt-6 space-y-8"
      >
        {/* Onboarding Hero Style */}
        <section className="text-center py-6">
          <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-farm-400 to-green-600 rounded-3xl flex items-center justify-center shadow-xl mb-6 rotate-3">
            <FaRocket className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("how_title")}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed px-4">
            {t("how_subtitle")}
          </p>
        </section>

        {/* Getting Started - Vertical Timeline */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {t("getting_started_title")}
            </h3>
          </div>
          <div className="relative pl-4 border-l-2 border-gray-100 dark:border-white/10 space-y-8 ml-2">
            {gettingStartedSteps.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-2"
              >
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[25px] top-0 w-8 h-8 rounded-full border-4 border-white dark:border-black ${item.bgColor} flex items-center justify-center z-10`}
                >
                  <span className="text-xs font-bold text-farm-700">
                    {item.step}
                  </span>
                </div>

                <div className="bg-white dark:bg-[#121212] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 ${item.bgColor} rounded-full flex items-center justify-center ${item.iconColor}`}
                    >
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-base">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <FaCheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        <span className="text-xs text-gray-500 font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Main Features - Feed Style */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              {t("main_features_title")}
            </h3>
          </div>
          {mainFeatures.map((feature, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#121212] rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-white/5"
            >
              {/* Card Header */}
              <div className="p-4 flex items-center gap-3 border-b border-gray-50 dark:border-white/5">
                <div
                  className={`w-10 h-10 ${feature.bgColor} rounded-full flex items-center justify-center ${feature.iconColor}`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-500">Agropeer Feature</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  {feature.description}
                </p>
                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 mb-4 space-y-2">
                  {(expandedFeatures[i] ? feature.steps : feature.steps.slice(0, 3)).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-farm-400 mt-1.5 shrink-0"></div>
                      <span className="text-xs text-gray-500 leading-snug">
                        {step}
                      </span>
                    </div>
                  ))}
                  {!expandedFeatures[i] && feature.steps.length > 3 && (
                    <button
                      onClick={() => toggleFeature(i)}
                      className="text-xs text-farm-600 font-bold pl-3.5 pt-1 hover:underline focus:outline-none"
                    >
                      +{feature.steps.length - 3} more steps
                    </button>
                  )}
                </div>

                <Link
                  href={feature.link}
                  className="w-full bg-black dark:bg-white dark:text-black text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  {t("explore_feature")} <FaArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Benefits Grid */}
        <section>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4 px-1">
            {t("benefits_title")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-farm-50 dark:bg-farm-900/10 p-4 rounded-2xl border border-farm-100 dark:border-white/5"
              >
                <div className="bg-white dark:bg-white/10 w-8 h-8 rounded-lg flex items-center justify-center text-farm-600 dark:text-farm-400 mb-3 shadow-sm">
                  {benefit.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {benefit.title}
                </h4>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Mobile App Promo */}
        <section className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <FaMobileAlt />
              </div>
              <span className="font-bold text-sm text-white/80">
                Get the App
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">{t("mobile_title")}</h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              {t("mobile_desc")}
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-xl font-bold text-sm w-full active:scale-95 transition-transform">
              Download Now
            </button>
          </div>
          <div className="absolute -right-4 -bottom-10 w-32 h-32 bg-farm-500 rounded-full blur-3xl opacity-50"></div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-farm-500 rounded-3xl p-6 text-center text-white shadow-lg shadow-farm-500/20">
          <h3 className="text-xl font-bold mb-2">{t("cta_title")}</h3>
          <p className="text-sm text-white/90 mb-6">{t("cta_subtitle")}</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/signup"
              className="w-full bg-white text-farm-600 py-3.5 rounded-xl font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <FaUserPlus /> {t("cta_signup")}
            </Link>
            <Link
              href="/about-us"
              className="w-full bg-farm-600 border border-white/20 py-3.5 rounded-xl font-bold active:scale-95 transition-transform"
            >
              {t("cta_learn_more")}
            </Link>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
