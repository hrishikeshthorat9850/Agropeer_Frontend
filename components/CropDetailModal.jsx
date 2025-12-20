"use client";
import { FaTimes, FaLeaf, FaWater, FaSun, FaSeedling, FaBug } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import { useEffect } from "react";

export default function CropDetailModal({ crop, onClose }) {
  const { t } = useLanguage();

  // --------------------------------------------------------
  // ⭐ SCROLL LOCK — safely placed BEFORE conditional return
  // --------------------------------------------------------
  useEffect(() => {
    if (crop) {
      // Lock scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.lockScrollY = scrollY;
    } else {
      // Unlock scroll
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    }

    // Cleanup (when component unmounts)
    return () => {
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    };
  }, [crop]);

  // SAFE EXIT — hooks already executed above
  if (!crop) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gradient-to-br from-white via-green-50 to-farm-50 rounded-3xl p-8 w-96 md:w-[600px] max-h-[85vh] overflow-y-auto relative shadow-2xl border border-green-100 dark:bg-[#272727] dark:bg-none dark:border-gray-600"
          style={{
          top: typeof window !== "undefined" && window.innerWidth < 768 ? "60px" : undefined,
          bottom: typeof window !== "undefined" && window.innerWidth < 768 ? "85px" : undefined,
        }}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 250, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-green-700 hover:text-green-900 transition-transform hover:scale-110"
          >
            <FaTimes className="text-xl" />
          </button>

          <div className="text-center mb-6">
            <motion.div
              className="text-7xl mb-3 drop-shadow-lg"
              initial={{ rotate: -10, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              {crop.icon}
            </motion.div>
            <h2 className="text-3xl font-extrabold text-green-800 tracking-tight">
              {crop.name}
            </h2>
            <p className="text-sm text-green-600 mt-1">
              {crop.category} • {crop.growthDays} Days
            </p>
          </div>

          <motion.p
            className="text-gray-700 text-center text-base mb-6 leading-relaxed px-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {crop.description || t("no_info")}
          </motion.p>

          <motion.div
            className="space-y-4 bg-white/70 backdrop-blur-md p-5 rounded-2xl shadow-inner border border-green-100 dark:bg-[#161616] dark:border-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* all your details exactly same */}
            {crop.soilType && (
              <p className="text-gray-800 text-sm">
                <strong className="text-green-800">{t("soil_type")}:</strong> {crop.soilType}
              </p>
            )}

            {crop.watering && (
              <p className="text-gray-800 text-sm flex items-center gap-2">
                <FaWater className="text-green-600" />
                <span>
                  <strong className="text-green-800">{t("watering_needs")}:</strong>{" "}
                  {typeof crop.watering === "object"
                    ? `${crop.watering.min}-${crop.watering.max} mm`
                    : crop.watering}
                </span>
              </p>
            )}

            {crop.sunlight && (
              <p className="text-gray-800 text-sm flex items-center gap-2">
                <FaSun className="text-yellow-500" />
                <span>
                  <strong className="text-green-800">{t("sunlight")}:</strong> {crop.sunlight}
                </span>
              </p>
            )}

            {crop.fertilizer && (
              <p className="text-gray-800 text-sm flex items-center gap-2">
                <FaLeaf className="text-green-500" />
                <span>
                  <strong className="text-green-800">{t("fertilizer_tips")}:</strong> {crop.fertilizer}
                </span>
              </p>
            )}

            {crop.pests && (
              <p className="text-gray-800 text-sm flex items-center gap-2">
                <FaBug className="text-red-500" />
                <span>
                  <strong className="text-green-800">{t("pests_diseases")}:</strong> {crop.pests}
                </span>
              </p>
            )}

            {crop.harvest && (
              <p className="text-gray-800 text-sm flex items-center gap-2">
                <FaSeedling className="text-emerald-600" />
                <span>
                  <strong className="text-green-800">{t("harvest_info")}:</strong> {crop.harvest}
                </span>
              </p>
            )}

            {crop.market && (
              <p className="text-gray-800 text-sm">
                <strong className="text-green-800">{t("market_info")}:</strong> {crop.market}
              </p>
            )}

            {crop.plantingSeason && (
              <p className="text-gray-800 text-sm">
                <strong className="text-green-800">{t("planting_season")}:</strong>{" "}
                {crop.plantingSeason}
              </p>
            )}
          </motion.div>

          <div className="mt-6 text-center">
            <motion.button
              onClick={() => (window.location.href = "/farmer-dashboard")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold py-3 px-5 rounded-full shadow-md hover:shadow-lg transition-all text-sm md:text-base w-full md:w-auto"
            >
              {t("add_crop_button")}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
