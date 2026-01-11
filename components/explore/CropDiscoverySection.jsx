"use client";
import { motion } from "framer-motion";
import { FaSeedling, FaPlus, FaEye } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function CropDiscoverySection({
  categories,
  categoryFilter,
  setCategoryFilter,
  filteredCrops,
  showAllCrops,
  setShowAllCrops,
  setSelectedCrop,
}) {
  const { t, locale } = useLanguage();

  // 🌐 Map crop.category correctly according to language
  const visibleCrops =
    categoryFilter === t("categories_all")
      ? filteredCrops
      : filteredCrops.filter(
          (crop) =>
            crop.category?.trim()?.toLowerCase() ===
            categoryFilter.trim().toLowerCase()
        );

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
          <FaSeedling className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("crop_discovery_title")}
        </h2>
      </div>

      {/* 🌾 Category Chips (Horizontal Scroll) */}
      <div className="flex overflow-x-auto pb-4 gap-2 -mx-4 px-4 scrollbar-hide snap-x">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCategoryFilter(cat);
              setShowAllCrops(false);
            }}
            className={`
              snap-start flex-none px-5 py-2.5 rounded-full text-sm font-semibold transition-all border
              ${
                categoryFilter === cat
                  ? "bg-green-600 border-green-600 text-white shadow-md shadow-green-200 dark:shadow-none"
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }
            `}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* 🌱 Crop Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
      >
        {(showAllCrops ? visibleCrops : visibleCrops.slice(0, 5)).map(
          (crop, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedCrop(crop)}
              className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 dark:bg-green-900/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-4xl mb-3 drop-shadow-sm filter">
                  {crop.icon}
                </span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1">
                  {crop.name}
                </h3>
                <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1 mt-1 px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-md">
                  {crop.category}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {t("growth_label")}{" "}
                  <span className="text-gray-600 dark:text-gray-300 font-semibold">
                    {crop.growthDays ?? "N/A"} d
                  </span>
                </p>
              </div>
            </motion.div>
          )
        )}

        {/* 🌾 More Crops Button */}
        {visibleCrops.length > 5 && !showAllCrops && (
          <motion.button
            layout
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAllCrops(true)}
            className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-dashed border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-900/10 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors cursor-pointer min-h-[160px]"
          >
            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mb-2 text-green-600">
              <FaPlus />
            </div>
            <span className="font-semibold text-sm">{t("more_crops")}</span>
          </motion.button>
        )}
      </motion.div>

      {/* 🌿 Show Less Button */}
      {showAllCrops && visibleCrops.length > 5 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllCrops(false)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white font-semibold rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-sm"
          >
            <FaEye />
            <span>{t("show_less")}</span>
          </button>
        </div>
      )}
    </section>
  );
}
