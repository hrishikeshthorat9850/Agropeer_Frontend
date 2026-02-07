"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaSeedling,
  FaTint,
  FaBug,
  FaSprayCan,
  FaTasks,
  FaFilter,
} from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

const typeMeta = {
  irrigation: { icon: FaTint, color: "from-cyan-400 to-cyan-600" },
  fertilization: { icon: FaSeedling, color: "from-green-400 to-green-600" },
  scouting: { icon: FaBug, color: "from-orange-400 to-orange-600" },
  pest_control: { icon: FaSprayCan, color: "from-orange-400 to-orange-600" },
  harvest: { icon: FaSeedling, color: "from-yellow-400 to-yellow-600" },
  monitoring: { icon: FaBug, color: "from-red-400 to-red-600" },
  maintenance: { icon: FaTasks, color: "from-purple-400 to-purple-600" },
  completed: { icon: FaCheckCircle, color: "from-green-400 to-green-600" },
};

const ScheduleTab = ({ data, loading, error }) => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const tasks = data?.tasks || [];
  const stats = data?.stats || { upcoming: 0, completed: 0, highPriority: 0, pending: 0 };
  const upcomingTasks = tasks.filter((task) => task.status === "scheduled" || task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-500 dark:bg-red-900/20 dark:text-red-300 dark:border-red-400";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-500 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-400";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-500 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-400";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300";
      case "pending":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300";
      case "completed":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300";
      case "overdue":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredTasks =
    filter === "all"
      ? upcomingTasks
      : filter === "completed"
        ? completedTasks
        : upcomingTasks.filter((task) => task.type === filter);

  if (loading) {
    return (
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <p className="text-farm-700 dark:text-gray-200">{t("loading_schedule")}</p>
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

  const tasksByDate = filteredTasks.reduce((acc, task) => {
    if (!acc[task.date]) {
      acc[task.date] = [];
    }
    acc[task.date].push(task);
    return acc;
  }, {});

  const sortedDates = Object.keys(tasksByDate).sort();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-farm-900 dark:text-white flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              {t("farming_schedule")}
            </h2>
            <p className="text-farm-700 dark:text-gray-300 mt-1">
              {t("schedule_desc")}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            <FaFilter className="text-farm-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-farm-700 dark:text-gray-300">{t("filter_label")}</span>
          </div>
          {["all", "irrigation", "pest_control", "fertilization", "harvest", "monitoring", "completed"].map(
            (filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === filterOption
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-white/60 dark:bg-[#1a1a1a] text-farm-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                  }`}
              >
                {t(`filter_${filterOption}`)}
              </button>
            )
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
              <FaTasks className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-farm-900 dark:text-white">{stats.upcoming}</div>
              <div className="text-xs text-farm-600 dark:text-gray-400">{t("upcoming_tasks")}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-farm-900 dark:text-white">{stats.completed}</div>
              <div className="text-xs text-farm-600 dark:text-gray-400">{t("completed_tasks")}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-red-600 rounded-lg flex items-center justify-center">
              <FaExclamationTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-farm-900 dark:text-white">
                {stats.highPriority}
              </div>
              <div className="text-xs text-farm-600 dark:text-gray-400">{t("high_priority")}</div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/40 backdrop-blur-lg rounded-xl p-4 border border-white/30 shadow-md dark:bg-[#272727]"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <FaClock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-farm-900 dark:text-white">
                {stats.pending}
              </div>
              <div className="text-xs text-farm-600 dark:text-gray-400">{t("pending_tasks")}</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tasks by Date */}
      <div className="space-y-6">
        {sortedDates.length > 0 ? (
          sortedDates.map((date, dateIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dateIndex * 0.1 }}
              className="bg-white/40 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-md dark:bg-[#272727]"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCalendarAlt className="text-purple-500" />
                <h3 className="text-xl font-bold text-farm-900 dark:text-white">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  {tasksByDate[date].length} {tasksByDate[date].length === 1 ? t("task") || "task" : t("tasks") || "tasks"}
                </span>
              </div>
              <div className="space-y-4">
                {tasksByDate[date].map((task) => {
                  const meta = typeMeta[task.type] || { icon: FaTasks, color: "from-gray-400 to-gray-600" };
                  const Icon = meta.icon;
                  const color = meta.color;
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-white/60 dark:bg-[#1a1a1a] rounded-xl p-5 border border-white/20 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center flex-shrink-0`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-lg text-farm-900 dark:text-white">{task.title}</h4>
                              <p className="text-sm text-farm-600 dark:text-gray-400 mt-1">{task.field}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
                                {t(`status_${task.status}`)}
                              </span>
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(task.priority)}`}
                              >
                                {t(`priority_${task.priority}`)} {t("priority")}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-farm-700 dark:text-gray-300 mb-3">{task.description}</p>
                          {task.weatherNote && (
                            <p className="text-sm text-sky-600 dark:text-sky-400 font-medium mb-3">{task.weatherNote}</p>
                          )}
                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-farm-600 dark:text-gray-400">
                              <FaClock className="w-4 h-4" />
                              <span className="font-medium text-farm-900 dark:text-white">{task.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-farm-600 dark:text-gray-400">
                              <FaCalendarAlt className="w-4 h-4" />
                              <span className="font-medium text-farm-900 dark:text-white">{task.duration}</span>
                            </div>
                            <div className="ml-auto">
                              <span className="px-3 py-1 bg-farm-100 dark:bg-farm-800 rounded-lg text-farm-700 dark:text-gray-300 text-xs font-medium">
                                {t(`filter_${task.type}`)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white/40 backdrop-blur-lg rounded-2xl p-12 border border-white/30 shadow-md dark:bg-[#272727] text-center">
            <FaCalendarAlt className="w-16 h-16 text-farm-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-2">{t("no_tasks")}</h3>
            <p className="text-farm-600 dark:text-gray-400">
              {filter === "all" ? t("all_caught_up") : t("no_scheduled_tasks").replace("{filter}", t(`filter_${filter}`))}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleTab;

