"use client";
import { motion } from "framer-motion";
import {
  FaChevronRight,
  FaSprayCan,
  FaTint,
  FaFlask,
  FaExclamationTriangle,
  FaBoxOpen,
} from "react-icons/fa";

const fallbackTasks = [
  {
    id: "fallback-1",
    text: "Spray pesticide on corn",
    type: "spray",
    priority: "High",
    location: "Field A",
  },
  {
    id: "fallback-2",
    text: "Irrigate soybean field",
    type: "irrigation",
    priority: "Medium",
    location: "Field C",
  },
  {
    id: "fallback-3",
    text: "Apply fertilizer to wheat",
    type: "nutrient",
    priority: "Low",
    location: "Field D",
  },
];

const typeToIcon = {
  spray: { icon: FaSprayCan, color: "text-green-600", bg: "bg-green-100" },
  irrigation: { icon: FaTint, color: "text-blue-600", bg: "bg-blue-100" },
  nutrient: { icon: FaFlask, color: "text-purple-600", bg: "bg-purple-100" },
  weather: { icon: FaExclamationTriangle, color: "text-orange-600", bg: "bg-orange-100" },
  inventory: { icon: FaBoxOpen, color: "text-amber-600", bg: "bg-amber-100" },
  custom: { icon: FaExclamationTriangle, color: "text-gray-600", bg: "bg-gray-100" },
};

export default function TasksAlertsCard({ showAll = false, tasks = [], onTaskClick }) {
  const mergedTasks = tasks.length ? tasks : fallbackTasks;
  const displayTasks = showAll ? mergedTasks : mergedTasks.slice(0, 3);

  const handleTaskClick = (task) => {
    if (onTaskClick) {
      onTaskClick({
        ...task,
        dueDate: task.dueDate || "Today",
        location: task.location || "Main Hub",
        priority: task.priority || "Medium",
        description: task.description || `Complete ${task.text.toLowerCase()}.`,
      });
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 font-semibold">Tasks & Alerts</h3>
        <span className="text-xs uppercase text-gray-400 tracking-wide">
          {mergedTasks.length} items
        </span>
      </div>

      {displayTasks.length === 0 ? (
        <div className="text-sm text-gray-500 text-center py-6">All caught up 🎉</div>
      ) : (
        <div className="space-y-3">
          {displayTasks.map((task) => {
            const palette = typeToIcon[task.type] || typeToIcon.custom;
            const Icon = palette.icon;
            return (
              <motion.button
                key={task.id}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTaskClick(task)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className={`${palette.bg} p-2 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${palette.color}`} />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 font-medium">{task.text}</p>
                  <p className="text-xs text-gray-500">
                    {task.location} · {task.priority} priority
                  </p>
                </div>
                <FaChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
              </motion.button>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
