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
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
        <FaSeedling className="text-green-600" /> {t("crop_discovery_title")}
      </h2>

      {/* 🌾 Category Buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCategoryFilter(cat);
              setShowAllCrops(false);
            }}
            className={`px-4 py-2 rounded-3xl font-semibold shadow-sm transition-all ${
              categoryFilter === cat
                ? "bg-green-600 text-white"
                : "bg-green-50 text-green-700 hover:bg-green-100"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* 🌱 Crop Cards */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.5, type: "spring" } }}
        className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2"
      >
        {(showAllCrops ? visibleCrops : visibleCrops.slice(0, 5)).map((crop, idx) => (
          <motion.div
            key={idx}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedCrop(crop)}
            className="bg-gray-50 rounded-2xl p-6 border shadow hover:shadow-lg transition-shadow cursor-pointer dark:bg-[#272727] dark:border-gray-600"
          >
            <div className="text-4xl mb-2">{crop.icon}</div>
            <h3 className="text-lg font-bold text-green-800">{crop.name}</h3>
            <p className="text-sm text-green-700">
              {t("category_label")} {crop.category}
            </p>
            <p className="text-sm text-green-700">
              {t("growth_label")} {crop.growthDays ?? "N/A"} days
            </p>
          </motion.div>
        ))}

        {/* 🌾 More Crops Button */}
        {visibleCrops.length > 5 && !showAllCrops && (
          <motion.div
            layout
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95, rotate: -2 }}
            onClick={() => setShowAllCrops(true)}
            className="bg-gradient-to-r from-green-100 to-green-200 border-2 border-green-300 rounded-2xl p-6 flex flex-col justify-center items-center cursor-pointer hover:shadow-md transition-all"
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <FaPlus className="text-green-600 text-3xl mb-2" />
            </motion.div>
            <p className="text-green-700 font-semibold dark:text-blue-600">{t("more_crops")}</p>
          </motion.div>
        )}
      </motion.div>

      {/* 🌿 Show Less Button */}
      {showAllCrops && visibleCrops.length > 5 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllCrops(false)}
            className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 transition-all duration-200"
          >
            <FaEye className="text-white text-lg" />
            <span>{t("show_less")}</span>
          </button>
        </div>
      )}
    </section>
  );
}
