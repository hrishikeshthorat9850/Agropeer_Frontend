"use client";
import { motion } from "framer-motion";
import { FaChartLine, FaChartBar, FaChartPie, FaArrowUp, FaArrowDown, FaSeedling, FaTint, FaBug } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useLanguage } from "@/Context/languagecontext";

const iconMap = {
  FaSeedling,
  FaIndianRupeeSign,
  FaTint,
  FaBug,
};

const AnalyticsTab = ({ data, loading, error }) => {
  const { t } = useLanguage();
  const kpiCards = data?.kpis || [];
  const monthlyStats = data?.monthlyStats || [];
  const cropPerformance = data?.cropPerformance || [];
  const fieldAnalytics = data?.fieldAnalytics || [];
  const growthMetrics = data?.growthMetrics || [];

  if (loading) {
    return (
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <p className="text-farm-700 dark:text-gray-200">{t("loading_analytics")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-farm-900 dark:text-white flex items-center gap-2">
              <FaChartLine className="text-pink-500" />
              {t("farm_analytics_title")}
            </h2>
            <p className="text-farm-700 dark:text-gray-300 mt-1">
              {t("farm_analytics_desc")}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const IconComponent = iconMap[kpi.icon] || FaChartLine;
          return (
            <motion.div
              key={kpi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/40 backdrop-blur-lg rounded-xl p-5 border border-white/30 shadow-md dark:bg-[#272727]"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${kpi.color || "from-green-400 to-green-600"} rounded-lg flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${kpi.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {kpi.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                  {kpi.change}
                </div>
              </div>
              <h3 className="text-sm text-farm-700 dark:text-gray-300 mb-1">{kpi.title}</h3>
              <p className="text-2xl font-bold text-farm-900 dark:text-white">{kpi.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Performance Chart */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
          <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
            <FaChartBar className="text-blue-500" />
            {t("monthly_performance")}
          </h3>
          <div className="space-y-4">
            {monthlyStats.map((stat, index) => (
              <div key={`${stat.month}-${index}`} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-farm-700 dark:text-gray-300 font-medium">{stat.month}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-farm-900 dark:text-white">{t("yield_label")}: {stat.yield}%</span>
                    <span className="text-green-600 dark:text-green-400">₹{stat.revenue.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                    style={{ width: `${stat.yield}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-farm-600 dark:text-gray-400">
                  <span>{t("revenue")}: ₹{stat.revenue.toLocaleString()}</span>
                  <span>{t("expenses")}: ₹{stat.expenses.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
          <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
            <FaChartPie className="text-purple-500" />
            {t("growth_metrics")}
          </h3>
          <div className="space-y-4">
            {growthMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-farm-700 dark:text-gray-300 font-medium">{metric.metric}</span>
                  <span className="text-farm-900 dark:text-white font-bold">
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                  <div
                    className={`${metric.color} h-3 rounded-full transition-all`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Crop Performance Table */}
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
          <FaSeedling className="text-green-500" />
          {t("crop_performance")}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-farm-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 text-farm-700 dark:text-gray-300 font-semibold">{t("crop_col")}</th>
                <th className="text-left py-3 px-4 text-farm-700 dark:text-gray-300 font-semibold">{t("yield_label")}</th>
                <th className="text-left py-3 px-4 text-farm-700 dark:text-gray-300 font-semibold">{t("growth_col")}</th>
                <th className="text-left py-3 px-4 text-farm-700 dark:text-gray-300 font-semibold">{t("health_col")}</th>
                <th className="text-left py-3 px-4 text-farm-700 dark:text-gray-300 font-semibold">{t("revenue")}</th>
              </tr>
            </thead>
            <tbody>
              {cropPerformance.map((crop, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-farm-100 dark:border-gray-800 hover:bg-farm-50 dark:hover:bg-[#1a1a1a] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-farm-900 dark:text-white">{crop.crop}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${crop.yield}%` }}
                        ></div>
                      </div>
                      <span className="text-farm-900 dark:text-white font-medium">{crop.yield}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${crop.growth}%` }}
                        ></div>
                      </div>
                      <span className="text-farm-900 dark:text-white font-medium">{crop.growth}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: `${crop.health}%` }}
                        ></div>
                      </div>
                      <span className="text-farm-900 dark:text-white font-medium">{crop.health}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      ₹{crop.revenue.toLocaleString()}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Field Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {fieldAnalytics.map((field, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/40 backdrop-blur-lg rounded-xl p-5 border border-white/30 shadow-md dark:bg-[#272727]"
          >
            <div className="mb-4">
              <h4 className="font-semibold text-farm-900 dark:text-white text-lg">{field.field}</h4>
              <p className="text-sm text-farm-600 dark:text-gray-400">{field.crop} • {field.area}</p>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-farm-700 dark:text-gray-300">{t("yield_label")}</span>
                  <span className="text-farm-900 dark:text-white font-semibold">{field.yield}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${field.yield}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-farm-700 dark:text-gray-300">{t("efficiency")}</span>
                  <span className="text-farm-900 dark:text-white font-semibold">{field.efficiency}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${field.efficiency}%` }}
                  ></div>
                </div>
              </div>
              <div className="pt-2 border-t border-farm-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-farm-700 dark:text-gray-300">{t("profit")}</span>
                  <span className="text-green-600 dark:text-green-400 font-bold">
                    ₹{field.profit.toLocaleString()}
                  </span>
                </div>
                <span
                  className={`inline-block mt-2 px-2 py-1 rounded text-xs ${field.status === "excellent"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                    }`}
                >
                  {field.status}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsTab;

