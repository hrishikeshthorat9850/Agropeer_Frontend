"use client";
import { FaBookReader, FaPlus, FaEye } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function FarmerStories({ router, setShowStoryModal }) {
  const { t } = useLanguage();

  return (
    <section className="mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-800">
          <FaBookReader className="text-green-600" /> {t("farmer_stories_title")}
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => router.push("/farmer-story")}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-200 text-green-900 px-4 py-2 rounded-xl shadow-md hover:bg-green-300 transition-all"
          >
            <FaEye className="text-green-600" /> {t("view_stories")}
          </button>

          <button
            onClick={() => setShowStoryModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-xl shadow-lg transform transition-transform hover:scale-105"
          >
            <FaPlus /> {t("add_story")}
          </button>
        </div>
      </div>

      <div className="rounded-2xl p-4">
        <p className="text-green-700">
          {t("farmer_stories_desc")}
        </p>
      </div>
    </section>
  );
}
