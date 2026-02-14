"use client";
import {
  FaTimes,
  FaLeaf,
  FaWater,
  FaSun,
  FaSeedling,
  FaBug,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useLanguage } from "@/Context/languagecontext";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function CropDetailModal({ crop, onClose }) {
  const { t } = useLanguage();

  // ✅ Handle Android Back Press
  useBackPress(
    () => {
      if (crop) {
        onClose();
        return true;
      }
      return false;
    },
    20,
    !!crop,
  );

  return (
    <Transition appear show={!!crop} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end md:items-center justify-center p-0 md:p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full md:scale-95 md:translate-y-0"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-full md:scale-95 md:translate-y-0"
            >
              <Dialog.Panel className="w-full md:w-[600px] transform overflow-hidden rounded-t-[2rem] md:rounded-3xl bg-white dark:bg-[#121212] text-left align-middle shadow-xl transition-all h-[85vh] md:h-auto md:max-h-[85vh] flex flex-col relative">
                {/* 🟢 Sticky Header */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5">
                  <span className="text-lg font-bold text-gray-900 dark:text-white opacity-0 animate-fade-in">
                    {crop?.name}
                  </span>
                  <button
                    onClick={onClose}
                    className="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-90"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* 📜 Scrollable Content */}
                <div className="overflow-y-auto flex-1 pb-safe pt-16 md:pt-6">
                  <div className="px-6 pb-6">
                    {/* Hero Section */}
                    <div className="flex flex-col items-center justify-center pt-4 pb-8">
                      <motion.div
                        className="w-32 h-32 rounded-full bg-gradient-to-tr from-green-100 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/10 flex items-center justify-center text-7xl shadow-xl shadow-green-900/5 mb-4 border border-white dark:border-white/10"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {crop?.icon}
                      </motion.div>
                      <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-1 text-center">
                        {crop?.name}
                      </h2>
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <span className="px-3 py-1 bg-gray-100 dark:bg-white/5 rounded-full">
                          {crop?.category}
                        </span>
                        <span>•</span>
                        <span>{crop?.growthDays} Days</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                      <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed text-center px-2">
                        {crop?.description || t("no_info")}
                      </p>
                    </div>

                    {/* ✨ Info Grid */}
                    <div className="grid grid-cols-1 gap-4">
                      {/* Soil & Water Row */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                          <div className="flex items-center gap-2 mb-2 text-amber-600 dark:text-amber-400">
                            <FaSun />
                            <span className="text-xs font-bold uppercase tracking-wider">
                              {t("sunlight")}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {crop?.sunlight || "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5">
                          <div className="flex items-center gap-2 mb-2 text-blue-500">
                            <FaWater />
                            <span className="text-xs font-bold uppercase tracking-wider">
                              {t("watering_needs")}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {typeof crop?.watering === "object"
                              ? `${crop.watering.min}-${crop.watering.max} mm`
                              : crop?.watering || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Full Width Cards */}
                      {crop?.soilType && (
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3">
                          <div className="p-2 bg-stone-100 dark:bg-white/10 rounded-xl h-fit text-stone-600 dark:text-stone-300">
                            <FaSeedling />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                              {t("soil_type")}
                            </h4>
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                              {crop.soilType}
                            </p>
                          </div>
                        </div>
                      )}

                      {crop?.fertilizer && (
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3">
                          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl h-fit text-purple-600 dark:text-purple-400">
                            <FaLeaf />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                              {t("fertilizer_tips")}
                            </h4>
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                              {crop.fertilizer}
                            </p>
                          </div>
                        </div>
                      )}

                      {crop?.pests && (
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3">
                          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl h-fit text-red-600 dark:text-red-400">
                            <FaBug />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                              {t("pests_diseases")}
                            </h4>
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                              {crop.pests}
                            </p>
                          </div>
                        </div>
                      )}

                      {crop?.harvest && (
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl h-fit text-emerald-600 dark:text-emerald-400">
                            <FaSeedling />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                              {t("harvest_info")}
                            </h4>
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                              {crop.harvest}
                            </p>
                          </div>
                        </div>
                      )}

                      {crop?.market && (
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl h-fit text-blue-600 dark:text-blue-400">
                            <FaLeaf />{" "}
                            {/* Reusing Leaf as generic or could import FaStore if available */}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                              {t("market_info")}
                            </h4>
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                              {crop.market}
                            </p>
                          </div>
                        </div>
                      )}

                      {crop?.plantingSeason && (
                        <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 flex gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl h-fit text-amber-600 dark:text-amber-400">
                            <FaSun /> {/* Reusing Sun for Season or generic */}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                              {t("planting_season")}
                            </h4>
                            <p className="text-sm font-medium text-gray-900 dark:text-white leading-snug">
                              {crop.plantingSeason}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 🦶 Fixed Bottom Action */}
                <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-[#121212] pt-2 pb-safe">
                  <button
                    onClick={() => (window.location.href = "/farmer-dashboard")}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-200 dark:shadow-none active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>{t("add_crop_button")}</span>
                    <FaSeedling className="opacity-80" />
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
