"use client";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaCheckCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSprayCan,
  FaTint,
  FaFlask,
  FaExclamationTriangle,
  FaBoxOpen,
} from "react-icons/fa";
import { useBackPress } from "@/Context/BackHandlerContext";

const typeToIcon = {
  spray: FaSprayCan,
  irrigation: FaTint,
  nutrient: FaFlask,
  weather: FaExclamationTriangle,
  inventory: FaBoxOpen,
};

export default function TaskDetailModal({ task, onClose, onComplete }) {
  useBackPress(
    () => {
      if (task) {
        onClose();
        return true;
      }
      return false;
    },
    20,
    !!task,
  );

  if (!task) return null;

  const handleComplete = () => {
    if (onComplete) {
      onComplete(task.id);
    }
    onClose();
  };

  const Icon = typeToIcon[task.type] || FaCheckCircle;
  const instructionList =
    task.instructions && task.instructions.length
      ? task.instructions
      : [
          "Follow safety protocols",
          "Use recommended equipment",
          "Report completion status",
        ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Task Details</h2>
                <p className="text-blue-100 text-sm capitalize">
                  {task.type || "custom"} protocol
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">{task.text}</h3>
              <p className="text-gray-600 text-sm">
                {task.description ||
                  "Complete this task to maintain optimal farm operations."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <FaCalendarAlt />
                  <span className="font-semibold">Due Date</span>
                </div>
                <p className="text-gray-800">{task.dueDate || "Today"}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <FaMapMarkerAlt />
                  <span className="font-semibold">Location</span>
                </div>
                <p className="text-gray-800">{task.location || "Field A"}</p>
              </div>
            </div>

            {task.priority && (
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="font-semibold text-orange-800">
                  Priority: {task.priority}
                </p>
              </div>
            )}

            <div>
              <h3 className="font-bold text-gray-800 mb-3">Instructions</h3>
              <ul className="space-y-2 text-gray-700">
                {instructionList.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleComplete}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <FaCheckCircle />
                Mark as Complete
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
                Reschedule
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
