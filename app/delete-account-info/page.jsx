"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Trash2, User, FileText, Shield } from "lucide-react";
import { useLanguage } from "@/Context/languagecontext";
import { useRouter } from "next/navigation";
import { useBackPress } from "@/Context/BackHandlerContext";
import { Haptics, ImpactStyle } from "@capacitor/haptics";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { dateFormat } from "@/utils/dateFormat.js";

export default function DeleteAccountInfoPage() {
  const { t } = useLanguage();
  const router = useRouter();

  const triggerHaptic = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (_) {}
  };

  useBackPress(
    () => {
      triggerHaptic();
      router.replace("/settings");
      return true;
    },
    10,
    true,
  );

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: t("delete_info_sec_1_title"),
      content: t("delete_info_sec_1_content"),
    },
    {
      icon: <User className="w-6 h-6" />,
      title: t("delete_info_sec_2_title"),
      content: t("delete_info_sec_2_content"),
    },
    {
      icon: <Trash2 className="w-6 h-6" />,
      title: t("delete_info_sec_3_title"),
      content: t("delete_info_sec_3_content"),
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("delete_info_sec_4_title"),
      content: t("delete_info_sec_4_content"),
    },
  ];

  return (
    <MobilePageContainer>
      <div className="min-h-screen bg-[#F2F2F7] dark:bg-black pb-6 font-sans safe-area-inset-bottom">
        {/* Header - matches Settings / Privacy pattern */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center justify-between px-4 h-14">
            <button
              onClick={() => {
                triggerHaptic();
                router.push("/settings");
              }}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-black dark:text-white" />
            </button>
            <h1 className="text-lg font-semibold text-black dark:text-white">
              {t("delete_account_info_title")}
            </h1>
            <div className="w-10" />
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 md:px-6 max-w-4xl">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 rounded-2xl flex items-center justify-center">
                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
              {t("delete_account_info_heading")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
              {t("delete_account_info_intro")}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
              {t("last_updated")}:{" "}
              {dateFormat(new Date())}
            </p>
          </motion.div>

          {/* Content sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-[#1C1C1E] rounded-xl p-5 md:p-6 shadow-sm border border-gray-100 dark:border-[#2C2C2E]"
              >
                <div className="flex items-start gap-3 mb-3">
                  {section.icon && (
                    <div className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5">
                      {section.icon}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {section.title}
                  </h3>
                </div>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base pl-0 md:pl-9">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA - How to delete (in-app) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 p-5 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-100 dark:border-red-500/20"
          >
            <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">
              {t("delete_info_how_to_title")}
            </p>
            <p className="text-sm text-red-700 dark:text-red-200/90 whitespace-pre-line">
              {t("delete_info_how_to_content")}
            </p>
            <button
              onClick={() => {
                triggerHaptic();
                router.push("/settings");
              }}
              className="mt-4 w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 active:scale-[0.98] text-white font-semibold rounded-xl text-sm"
            >
              {t("delete_info_go_to_settings")}
            </button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-4 bg-gray-100 dark:bg-[#1E1E1E] rounded-xl border border-gray-200 dark:border-white/10 text-center"
          >
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {t("delete_account_info_footer")}
            </p>
          </motion.div>
        </div>
      </div>
    </MobilePageContainer>
  );
}
