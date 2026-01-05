"use client";
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

  const gettingStartedSteps = [
    {
      step: 1,
      title: t("step1_title"),
      description: t("step1_desc"),
      icon: <FaUserPlus className="w-6 h-6" />,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
      features: [
        t("step1_feature1"),
        t("step1_feature2"),
        t("step1_feature3"),
      ],
    },
    {
      step: 2,
      title: t("step2_title"),
      description: t("step2_desc"),
      icon: <FaGlobe className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
      features: [
        t("step2_feature1"),
        t("step2_feature2"),
        t("step2_feature3"),
      ],
    },
    {
      step: 3,
      title: t("step3_title"),
      description: t("step3_desc"),
      icon: <FaRocket className="w-6 h-6" />,
      color: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
      features: [
        t("step3_feature1"),
        t("step3_feature2"),
        t("step3_feature3"),
      ],
    },
  ];

  const mainFeatures = [
    {
      title: t("mf1_title"),
      description: t("mf1_desc"),
      icon: <FaChartLine className="w-8 h-8" />,
      steps: [
        t("mf1_step1"),
        t("mf1_step2"),
        t("mf1_step3"),
        t("mf1_step4"),
      ],
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
      steps: [
        t("mf3_step1"),
        t("mf3_step2"),
        t("mf3_step3"),
        t("mf3_step4"),
      ],
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-[calc(100vh-122px)]"
    >

      {/* Hero Section */}
      <div className="bg-farm-50 py-16 dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaRocket className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-farm-900 mb-6 dark:text-white">
            {t("how_title")}
          </h1>

          <p className="text-farm-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed dark:text-gray-300">
            {t("how_subtitle")}
          </p>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="container mx-auto !px-5 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-farm-900 mb-4 dark:text-white text-center">
          {t("getting_started_title")}
        </h2>

        <p className="text-farm-700 max-w-2xl mx-auto text-lg text-center dark:text-gray-300">
          {t("getting_started_subtitle")}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {gettingStartedSteps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-farm-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                {item.step}
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20">
                <div className={`w-16 h-16 ${item.bgColor} rounded-xl flex items-center justify-center mb-6 ${item.iconColor}`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-farm-900 mb-4 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-farm-700 leading-relaxed mb-6 dark:text-gray-300">
                  {item.description}
                </p>

                <ul className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-farm-600 dark:text-gray-400">
                      <FaCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Connector Arrow */}
              {i < gettingStartedSteps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <FaArrowRight className="w-8 h-8 text-farm-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Features */}
      <div className="bg-white py-16 dark:bg-[#272727]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-farm-900 mb-10 text-center dark:text-white">
            {t("main_features_title")}
          </h2>

          <div className="space-y-8">
            {mainFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 ${feature.iconColor}`}>
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-farm-900 mb-4 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="text-farm-700 text-lg mb-6 leading-relaxed dark:text-gray-300">
                    {feature.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {feature.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-farm-700 dark:text-gray-300">{step}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={feature.link}
                    className={`inline-flex items-center gap-2 bg-gradient-to-r ${feature.color} text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                  >
                    {t("explore_feature")}
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="flex-1">
                  <div className={`bg-gradient-to-br ${feature.color} rounded-2xl p-12 text-white text-center shadow-xl`}>
                    <div className="text-6xl mb-4">🌾</div>
                    <p className="text-white/90 text-lg">
                      {feature.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-farm-900 mb-4 text-center dark:text-white">
          {t("benefits_title")}
        </h2>

        <p className="text-farm-700 max-w-2xl mx-auto text-lg text-center dark:text-gray-300">
          {t("benefits_subtitle")}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md border border-farm-200 text-center hover:shadow-xl transition dark:bg-[#272727] dark:border-white/20"
            >
              <div className="w-16 h-16 bg-farm-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-farm-600">
                {benefit.icon}
              </div>

              <h3 className="text-xl font-bold text-farm-900 mb-3 dark:text-white">
                {benefit.title}
              </h3>

              <p className="text-farm-700 text-sm dark:text-gray-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile App */}
      <div className="bg-farm-50 py-16 dark:bg-[#1E1E1E]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1 text-center md:text-left">
              <div className="w-16 h-16 bg-farm-600 rounded-xl flex items-center justify-center mx-auto md:mx-0 mb-6 text-white">
                <FaMobileAlt className="w-8 h-8" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-farm-900 mb-4 dark:text-white">
                {t("mobile_title")}
              </h2>

              <p className="text-farm-700 text-lg mb-6 leading-relaxed dark:text-gray-300">
                {t("mobile_desc")}
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  t("mobile_f1"),
                  t("mobile_f2"),
                  t("mobile_f3"),
                  t("mobile_f4"),
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-farm-700 dark:text-gray-300">
                    <FaCheckCircle className="w-5 h-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-2xl p-8 shadow-2xl dark:bg-purple-500">
                <div className="text-center">
                  <div className="text-6xl mb-4">📱</div>
                  <p className="text-farm-700 font-semibold dark:text-gray-300">
                    {t("mobile_box")}
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-farm-500 to-green-600 py-16 text-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7 }}
          >

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("cta_title")}
            </h2>

            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {t("cta_subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-white text-farm-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
              >
                <FaUserPlus className="w-5 h-5" />
                {t("cta_signup")}
              </Link>

              <Link
                href="/about-us"
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
              >
                {t("cta_learn_more")}
                <FaArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
