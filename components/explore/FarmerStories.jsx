"use client";
import { FaBookReader, FaPlus, FaEye } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";
// ADDITIVE ENHANCEMENT: Import forward page transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { usePageTransition } from "@/hooks/usePageTransition";

export default function FarmerStories({ router, setShowStoryModal }) {
  const { t } = useLanguage();
  // ADDITIVE ENHANCEMENT: Get forward transition handlers
  // Original router.push() still available, this adds smooth transitions
  const { push } = usePageTransition();

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <FaBookReader className="text-green-600 dark:text-green-400" />
          {t("farmer_stories_title")}
        </h2>
        <button
          onClick={() => {
            // ENHANCED: Use push() with smooth transition instead of router.push()
            // PRESERVED: All other behavior unchanged
            push("/farmer-story");
          }}
          className="text-green-600 dark:text-green-400 font-semibold text-sm hover:underline"
        >
          {t("view_stories")}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl p-1 border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 p-5">
          <div className="flex-1">
            <div className="inline-block px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-xs font-bold mb-3 uppercase tracking-wider">
              Inspiration
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {t("farmer_stories_desc")}
            </p>
            <button
              onClick={() => setShowStoryModal(true)}
              className="inline-flex items-center gap-2 text-gray-900 dark:text-white font-bold text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-5 py-2.5 rounded-full transition-colors"
            >
              <FaPlus className="text-green-600" /> {t("add_story")}
            </button>
          </div>

          {/* Visual Illustration Placeholder */}
          <div className="hidden sm:flex w-1/3 bg-green-50 dark:bg-green-900/10 rounded-2xl items-center justify-center text-green-200 dark:text-green-900">
            <FaBookReader className="w-16 h-16 opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
}
