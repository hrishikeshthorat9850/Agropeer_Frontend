"use client";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaLock,
  FaUserShield,
  FaGlobe,
  FaMobileAlt,
  FaDatabase,
} from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

import { useRouter } from "next/navigation";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  const router = useRouter();

  useBackPress(
    () => {
      router.push("/settings");
      return true;
    },
    10,
    true,
  );

  const sections = [
    {
      icon: <FaUserShield className="w-6 h-6" />,
      title: t("privacy_sec_1_title"),
      content: t("privacy_sec_1_content"),
    },
    {
      icon: <FaDatabase className="w-6 h-6" />,
      title: t("privacy_sec_2_title"),
      content: t("privacy_sec_2_content"),
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: t("privacy_sec_3_title"),
      content: t("privacy_sec_3_content"),
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: t("privacy_sec_4_title"),
      content: t("privacy_sec_4_content"),
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      title: t("privacy_sec_5_title"),
      content: t("privacy_sec_5_content"),
    },
    {
      icon: <FaMobileAlt className="w-6 h-6" />,
      title: t("privacy_sec_6_title"),
      content: t("privacy_sec_6_content"),
    },
    {
      title: t("privacy_sec_7_title"),
      content: t("privacy_sec_7_content"),
    },
    {
      title: t("privacy_sec_8_title"),
      content: t("privacy_sec_8_content"),
    },
    {
      title: t("privacy_sec_9_title"),
      content: t("privacy_sec_9_content"),
    },
    {
      title: t("privacy_sec_10_title"),
      content: t("privacy_sec_10_content"),
    },
    {
      title: t("privacy_sec_11_title"),
      content: t("privacy_sec_11_content"),
    },
    {
      title: t("privacy_sec_12_title"),
      content: t("privacy_sec_12_content"),
    },
    {
      title: t("privacy_sec_13_title"),
      content: t("privacy_sec_13_content"),
    },
    {
      title: t("privacy_sec_14_title"),
      content: t("privacy_sec_14_content"),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-122px)]">
      <div className="container mx-auto px-4 py-12 md:px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaShieldAlt className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
            {t("privacy_policy_title")}
          </h1>
          <p className="text-farm-700 text-lg dark:text-gray-300">
            {t("last_updated")}:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-farm-600 mt-2 dark:text-gray-400">
            {t("privacy_intro_text")}
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20"
            >
              <div className="flex items-start gap-4 mb-4">
                {section.icon && (
                  <div className="text-farm-600 flex-shrink-0 mt-1">
                    {section.icon}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-farm-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <div className="text-farm-700 leading-relaxed whitespace-pre-line dark:text-gray-300">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-farm-100 rounded-xl border border-farm-200 text-center dark:bg-[#1E1E1E] dark:border-white/20"
        >
          <p className="text-sm text-farm-700 dark:text-gray-400">
            {t("privacy_footer_text")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
