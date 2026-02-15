"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

import { useLanguage } from "@/Context/languagecontext";
import { useBackPress } from "@/Context/BackHandlerContext";
import { CROP_DATABASE } from "@/data/CROP_DATABASE.multi";

import CropDetailModal from "@/components/CropDetailModal";
import StoryFormModal from "@/components/StoryFormModal";
import MarketSection from "@/components/explore/MarketPricesInsight";
import ToolsSection from "@/components/explore/Tools&Calculator";
import FarmerStories from "@/components/explore/FarmerStories";
import CropDiscoverySection from "@/components/explore/CropDiscoverySection";
import AllCropsModal from "@/components/explore/AllCropsModal";
import ExploreSkeleton from "@/components/skeletons/ExploreSkeleton"; // Added Skeleton
import LoadingSpinner from "@/components/LoadingSpinner";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";

// ✅ Number formatter
const formatNumber = (num) => {
  if (num == null) return "-";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// ✅ Skeleton Card (local only)
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl p-6 border shadow animate-pulse h-40"></div>
);

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);

  const [tool, setTool] = useState(null);
  const [selectedToolCrop, setSelectedToolCrop] = useState("");
  const [areaInput, setAreaInput] = useState("");
  const [soilN, setSoilN] = useState("");
  const [soilP, setSoilP] = useState("");
  const [soilK, setSoilK] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [toolResult, setToolResult] = useState(null);
  const [loadingTool, setLoadingTool] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadingPage, setLoadingPage] = useState(true);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [showAllCrops, setShowAllCrops] = useState(false);

  useBackPress(
    () => {
      if (selectedCrop || showStoryModal || showAllCrops) {
        setSelectedCrop(null);
        setShowStoryModal(false);
        setShowAllCrops(false);
        return true;
      }
      return false;
    },
    20,
    !!(selectedCrop || showStoryModal || showAllCrops),
  );

  const { t, locale } = useLanguage();
  const router = useRouter();

  // ✅ Category translations
  const categories = [
    t("categories_all"),
    t("categories_cereal"),
    t("categories_millet"),
    t("categories_pulse"),
    t("categories_oilseed"),
    t("categories_vegetable"),
    t("categories_fruit"),
    t("categories_spice"),
    t("categories_plantation"),
    t("categories_herb"),
    t("categories_cash_crop"),
  ];

  // ✅ Default category auto-sync with language
  // Reset to "all" when locale changes since category names are translated
  const [categoryFilter, setCategoryFilter] = useState(t("categories_all"));
  useEffect(() => {
    setCategoryFilter(t("categories_all"));
  }, [locale, t]);

  // ✅ Page loader
  useEffect(() => {
    const timer = setTimeout(() => setLoadingPage(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Localized crop data (depends on current language)
  const localizedCrops = useMemo(() => {
    const langData = CROP_DATABASE[locale] || CROP_DATABASE.en;
    const map = {};
    langData.forEach((c) => {
      const key = c.name.trim();
      if (!map[key]) map[key] = c;
    });
    return Object.values(map);
  }, [locale]);

  const sortedCrops = useMemo(
    () =>
      localizedCrops.sort((a, b) => (a.name || "").localeCompare(b.name || "")),
    [localizedCrops],
  );

  // ✅ Correct filtering logic (localized category values)
  const filteredCrops = useMemo(() => {
    const categoryMatchFn = (crop) =>
      categoryFilter === t("categories_all") ||
      crop.category?.trim()?.toLowerCase() ===
        categoryFilter.trim().toLowerCase();

    const searchMatchFn = (crop) =>
      (crop.name || "").toLowerCase().includes(searchTerm.toLowerCase());

    return sortedCrops.filter((c) => categoryMatchFn(c) && searchMatchFn(c));
  }, [sortedCrops, searchTerm, categoryFilter, t]);

  // ✅ Show loading spinner while page loads
  if (loadingPage) return <ExploreSkeleton />;

  return (
    <MobilePageContainer>
      <div className="pb-6 pt-2">
        <div className="w-full max-w-7xl mx-auto px-4">
          {/* 🔍 App-Like Header */}
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-md pt-4 -mx-4 px-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {t("explore_title")}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {t("explore_subtitle")}
                </p>
              </div>

              {/* Profile/Menu Placeholder or Action - Keeping minimal for now */}
              <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-green-600">
                <FaUsers className="w-5 h-5" />
              </div>
            </div>

            {/* 🔎 Search Bar - iOS/Material Style */}
            <div className="relative">
              <input
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:ring-2 focus:ring-green-500/50 transition-all font-medium placeholder-gray-400"
                placeholder={t("search_placeholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            {/* 📈 Market Section Widget */}
            <div className="hidden md:block">
              <MarketSection router={router} />
            </div>

            {/* 🌱 Crop Discovery (Categories + Grid) */}
            <CropDiscoverySection
              categories={categories}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              filteredCrops={filteredCrops}
              showAllCrops={showAllCrops}
              setShowAllCrops={setShowAllCrops}
              setSelectedCrop={setSelectedCrop}
              SkeletonCard={SkeletonCard}
            />

            {/* ⚙️ Tools Grid */}
            <ToolsSection
              tool={tool}
              setTool={setTool}
              selectedToolCrop={selectedToolCrop}
              setSelectedToolCrop={setSelectedToolCrop}
              areaInput={areaInput}
              setAreaInput={setAreaInput}
              soilN={soilN}
              soilP={soilP}
              soilK={soilK}
              setSoilN={setSoilN}
              setSoilP={setSoilP}
              setSoilK={setSoilK}
              marketPrice={marketPrice}
              setMarketPrice={setMarketPrice}
              toolResult={toolResult}
              setToolResult={setToolResult}
              loadingTool={loadingTool}
              setLoadingTool={setLoadingTool}
              errors={errors}
              setErrors={setErrors}
              uniqueCrops={localizedCrops}
              LoadingSpinner={LoadingSpinner}
            />

            {/* 📚 Farmer Stories & Community */}
            <FarmerStories
              router={router}
              setShowStoryModal={setShowStoryModal}
            />

            {/* 🔒 Community Teaser */}
            <section className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6 border border-green-100 dark:border-green-800">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 dark:bg-green-800 rounded-full text-green-600 dark:text-green-300">
                  <FaUsers className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  {t("community_highlights")}
                </h2>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm font-medium ml-1">
                {t("coming_soon")}
              </p>
            </section>
          </div>

          {/* Modals */}
          {showStoryModal && (
            <StoryFormModal
              open={showStoryModal}
              onClose={() => setShowStoryModal(false)}
            />
          )}

          <CropDetailModal
            crop={selectedCrop}
            onClose={() => setSelectedCrop(null)}
          />

          <AllCropsModal
            isOpen={showAllCrops}
            onClose={() => setShowAllCrops(false)}
            crops={filteredCrops}
            onSelectCrop={setSelectedCrop}
          />
        </div>
      </div>
    </MobilePageContainer>
  );
}
