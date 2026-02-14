"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaTimes, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function AllCropsModal({
  isOpen,
  onClose,
  crops,
  onSelectCrop,
}) {
  const { t } = useLanguage();

  // ✅ Handle Android Back Press
  useBackPress(
    () => {
      if (isOpen) {
        onClose();
        return true;
      }
      return false;
    },
    20,
    isOpen,
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
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
              <Dialog.Panel className="w-full md:max-w-4xl transform overflow-hidden rounded-t-3xl md:rounded-2xl bg-white dark:bg-[#121212] p-0 text-left align-middle shadow-xl transition-all h-[90vh] md:h-auto md:max-h-[85vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10 bg-white dark:bg-[#121212] sticky top-0 z-20">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                      <FaSeedling className="w-5 h-5" />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-bold text-gray-900 dark:text-white"
                    >
                      {t("crop_discovery_title")}
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-black/20">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    {crops.map((crop) => (
                      <motion.div
                        key={crop.id || crop.name}
                        layoutId={`crop-modal-${crop.id || crop.name}`}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSelectCrop(crop); // Open details
                          // Keep this modal open in background or let the details modal overlay it?
                          // Usually standard is fine. The user can close details to return here.
                        }}
                        className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm cursor-pointer relative overflow-hidden group min-h-[140px]"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-green-50 dark:bg-green-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                          <span className="text-4xl mb-3 drop-shadow-sm filter">
                            {crop.icon}
                          </span>
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">
                            {crop.name}
                          </h3>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-md">
                            {crop.category}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
