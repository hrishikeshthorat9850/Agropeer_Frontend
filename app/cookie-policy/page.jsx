"use client";
import { motion } from "framer-motion";
import {
  FaCookie,
  FaShieldAlt,
  FaCog,
  FaChartLine,
  FaUsers,
  FaMobileAlt,
  FaTrash,
} from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

import { useRouter } from "next/navigation";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function CookiePolicy() {
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

  const cookieTypes = [
    {
      category: t("cat_essential"),
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      description: t("cat_essential_desc"),
      cookies: [
        {
          name: "sb-* (Supabase Session)",
          purpose: t("cp_auth"),
          duration: t("dur_session"),
          type: t("type_first"),
        },
        {
          name: "theme",
          purpose: t("cp_theme"),
          duration: t("dur_1_year"),
          type: t("type_first"),
        },
        {
          name: "locale",
          purpose: t("cp_locale"),
          duration: t("dur_1_year"),
          type: t("type_first"),
        },
      ],
    },
    {
      category: t("cat_functional"),
      icon: <FaCog className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      description: t("cat_functional_desc"),
      cookies: [
        {
          name: "user_preferences",
          purpose: t("cp_user_pref"),
          duration: t("dur_1_year"),
          type: t("type_first"),
        },
        {
          name: "last_visited",
          purpose: t("cp_last_visited"),
          duration: t("dur_30_days"),
          type: t("type_first"),
        },
      ],
    },
    {
      category: t("cat_analytics"),
      icon: <FaChartLine className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      description: t("cat_analytics_desc"),
      cookies: [
        {
          name: "_ga, _gid (Google Analytics)",
          purpose: t("cp_ga"),
          duration: t("dur_2_years"),
          type: t("type_third"),
        },
        {
          name: "analytics_session",
          purpose: t("cp_analytics_sess"),
          duration: t("dur_30_min"),
          type: t("type_first"),
        },
      ],
    },
    {
      category: t("cat_performance"),
      icon: <FaUsers className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600",
      description: t("cat_performance_desc"),
      cookies: [
        {
          name: "performance_metrics",
          purpose: t("cp_perf"),
          duration: t("dur_7_days"),
          type: t("type_first"),
        },
      ],
    },
  ];

  const sections = [
    {
      icon: <FaCookie className="w-6 h-6" />,
      title: t("sec_1_title"),
      content: t("sec_1_content"),
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: t("sec_2_title"),
      content: t("sec_2_content"),
    },
    {
      title: t("sec_3_title"),
      content: t("sec_3_content"),
    },
    {
      icon: <FaMobileAlt className="w-6 h-6" />,
      title: t("sec_4_title"),
      content: t("sec_4_content"),
    },
    {
      title: t("sec_5_title"),
      content: t("sec_5_content"),
    },
    {
      icon: <FaTrash className="w-6 h-6" />,
      title: t("sec_6_title"),
      content: t("sec_6_content"),
    },
    {
      title: t("sec_7_title"),
      content: t("sec_7_content"),
    },
    {
      title: t("sec_8_title"),
      content: t("sec_8_content"),
    },
    {
      title: t("sec_9_title"),
      content: t("sec_9_content"),
    },
    {
      title: t("sec_10_title"),
      content: t("sec_10_content"),
    },
    {
      title: t("sec_11_title"),
      content: t("sec_11_content"),
    },
    {
      title: t("sec_12_title"),
      content: t("sec_12_content"),
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
              <FaCookie className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
            {t("cookie_policy_title")}
          </h1>
          <p className="text-farm-700 text-lg dark:text-gray-300">
            {t("last_updated")}{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-farm-600 mt-2 dark:text-gray-400">
            {t("cookie_policy_intro_text")}
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

          {/* Cookie Types Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20"
          >
            <h2 className="text-2xl font-bold text-farm-900 mb-6 dark:text-white">
              {t("detailed_cookie_info")}
            </h2>
            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <div
                  key={index}
                  className="border border-farm-200 rounded-xl p-6 dark:border-white/20"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center text-white`}
                    >
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-farm-900 dark:text-white">
                        {type.category}
                      </h3>
                      <p className="text-sm text-farm-600 dark:text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-farm-200 dark:border-white/20">
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">
                            {t("th_cookie_name")}
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">
                            {t("th_purpose")}
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">
                            {t("th_duration")}
                          </th>
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">
                            {t("th_type")}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.cookies.map((cookie, cookieIndex) => (
                          <tr
                            key={cookieIndex}
                            className="border-b border-farm-100 dark:border-white/10"
                          >
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300 font-mono text-xs">
                              {cookie.name}
                            </td>
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300">
                              {cookie.purpose}
                            </td>
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300">
                              {cookie.duration}
                            </td>
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300">
                              {cookie.type}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-farm-100 rounded-xl border border-farm-200 text-center dark:bg-[#1E1E1E] dark:border-white/20"
        >
          <p className="text-sm text-farm-700 dark:text-gray-400 whitespace-pre-line">
            {t("cookie_footer_note")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
