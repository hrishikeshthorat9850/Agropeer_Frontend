"use client";
import { motion } from "framer-motion";
import {
  FaSeedling,
  FaAward,
  FaUsers,
  FaCloudSun,
  FaChartLine,
  FaTractor,
  FaLeaf,
  FaHeart,
  FaComments,
} from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

const Sidebar = () => {
  const { t } = useLanguage();

  const quickActions = [
    {
      title: t("sidebar_weather"),
      description: t("sidebar_weather_desc"),
      icon: FaCloudSun,
      bgColor: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      title: t("sidebar_market"),
      description: t("sidebar_market_desc"),
      icon: FaChartLine,
      bgColor: "bg-sunset-100",
      iconColor: "text-sunset-600",
    },
    {
      title: t("sidebar_tools"),
      description: t("sidebar_tools_desc"),
      icon: FaTractor,
      bgColor: "bg-farm-100",
      iconColor: "text-farm-600",
    },
  ];

  const recentActivities = [
    {
      icon: FaLeaf,
      bgColor: "bg-farm-200",
      iconColor: "text-farm-600",
      action: `John ${t("activity_shared_photo")}`,
      time: `2 ${t("time_minutes_ago")}`,
    },
    {
      icon: FaHeart,
      bgColor: "bg-sunset-200",
      iconColor: "text-sunset-600",
      action: `Sarah ${t("activity_liked_post")}`,
      time: `5 ${t("time_minutes_ago")}`,
    },
    {
      icon: FaComments,
      bgColor: "bg-sky-200",
      iconColor: "text-sky-600",
      action: `Mike ${t("activity_commented")}`,
      time: `10 ${t("time_minutes_ago")}`,
    },
  ];

  const farmingTips = [
    {
      emoji: "🌱",
      title: t("tip_soil_health"),
      tip: t("tip_soil_health_desc"),
    },
    {
      emoji: "💧",
      title: t("tip_water_mgmt"),
      tip: t("tip_water_mgmt_desc"),
    },
    {
      emoji: "🐛",
      title: t("tip_pest_control"),
      tip: t("tip_pest_control_desc"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.4, duration: 0.6 }}
      className="hidden lg:block w-80 space-y-6 sticky top-4 h-fit"
    >
      {/* Getting Started Guide */}
      <div className="farm-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
            <FaSeedling className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-farm-900">
            {t("getting_started")}
          </h3>
        </div>
        <div className="space-y-3">
          {[
            t("getting_started_step1"),
            t("getting_started_step2"),
            t("getting_started_step3"),
          ].map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-farm-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-farm-600">
                  {index + 1}
                </span>
              </div>
              <p className="text-sm text-farm-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Tips */}
      <div className="earth-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-sunset-500 to-orange-600 rounded-full flex items-center justify-center">
            <FaAward className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-earth-900">
            {t("daily_tips")}
          </h3>
        </div>
        <div className="space-y-3">
          {farmingTips.map((tip, index) => (
            <div
              key={index}
              className="p-3 rounded-lg"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(249, 115, 22, 0.05) 100%)",
              }}
            >
              <p className="text-sm font-semibold text-earth-800 mb-1">
                {tip.emoji} {tip.title}
              </p>
              <p className="text-xs text-earth-700">{tip.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="sunset-gradient p-6 text-white rounded-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <FaUsers className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold">{t("community_title")}</h3>
        </div>
        <div className="space-y-3">
          {[
            { label: t("stat_active_today"), value: "2,847" },
            { label: t("stat_new_posts"), value: "156" },
            { label: t("stat_comments"), value: "1,203" },
          ].map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-white/90">{stat.label}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
          ))}
          <div className="w-full bg-white/20 rounded-full h-2 mt-3">
            <div className="bg-white rounded-full h-2 w-3/4"></div>
          </div>
          <p className="text-xs text-white/80">75% {t("engagement_rate")}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="farm-card p-6">
        <h3 className="text-lg font-bold text-farm-900 mb-4">
          {t("quick_actions_title")}
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-farm-50 transition-colors group"
            >
              <div
                className={`w-8 h-8 ${action.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <action.icon className={`w-4 h-4 ${action.iconColor}`} />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-farm-800">
                  {action.title}
                </p>
                <p className="text-xs text-farm-600">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="earth-card p-6">
        <h3 className="text-lg font-bold text-earth-900 mb-4">
          {t("recent_activity_title_sidebar")}
        </h3>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 ${activity.bgColor} rounded-full flex items-center justify-center`}
              >
                <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-earth-800">{activity.action}</p>
                <p className="text-xs text-earth-600">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
