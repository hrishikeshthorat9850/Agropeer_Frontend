"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

import { useLanguage } from "@/Context/languagecontext";
import { CROP_DATABASE } from "@/data/CROP_DATABASE.multi";

import CropDetailModal from "@/components/CropDetailModal";
import StoryFormModal from "@/components/StoryFormModal";
import MarketSection from "@/components/explore/MarketPricesInsight";
import ToolsSection from "@/components/explore/Tools&Calculator";
import FarmerStories from "@/components/explore/FarmerStories";
import CropDiscoverySection from "@/components/explore/CropDiscoverySection";
import LoadingSpinner from "@/components/ui/market/LoadingSpinner";
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
    () => localizedCrops.sort((a, b) => (a.name || "").localeCompare(b.name || "")),
    [localizedCrops]
  );

  // ✅ Correct filtering logic (localized category values)
  const filteredCrops = useMemo(() => {
    const categoryMatchFn = (crop) =>
      categoryFilter === t("categories_all") ||
      crop.category?.trim()?.toLowerCase() === categoryFilter.trim().toLowerCase();

    const searchMatchFn = (crop) =>
      (crop.name || "").toLowerCase().includes(searchTerm.toLowerCase());

    return sortedCrops.filter((c) => categoryMatchFn(c) && searchMatchFn(c));
  }, [sortedCrops, searchTerm, categoryFilter, t]);

  // ✅ Show loading spinner while page loads
  if (loadingPage)
    return (
      <MobilePageContainer>
        <div className="flex justify-center items-center min-h-screen py-20">
          <LoadingSpinner />
        </div>
      </MobilePageContainer>
    );

  return (
    <MobilePageContainer>
      <div className="py-4">
        <div className="w-full max-w-7xl mx-auto">
      {/* 🌾 Header Section */}
      <div className="text-center mb-8">
        {/* PAGE HEADER — PREMIUM */}
<div
  className="
    rounded-3xl p-6 mb-6
    shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]
    bg-gradient-to-br from-[#d7ffe8] to-[#f4fff8]
    dark:from-[#0b2718] dark:to-[#0e3821]
    border-b border-white/60 dark:border-[#1a4a2d]
    text-center
  "
>
  <h1 className="text-3xl font-extrabold text-farm-900 dark:text-white mb-2">
    {t("explore_title")}
  </h1>

  <p className="text-farm-700 dark:text-white/80 text-lg max-w-xl mx-auto">
    {t("explore_subtitle")}
  </p>
</div>

        <div className="flex justify-center gap-3">
          <input
            className="p-3 w-80 rounded-xl border text-farm-900 border-green-300 shadow-sm focus:ring-2 focus:ring-green-400"
            placeholder={t("search_placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 📈 Market Section */}
      <div className="hidden md:block">
        <MarketSection router={router} />
      </div>

      {/* ⚙️ Tools Section */}
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

      {/* 📚 Farmer Stories */}
      <FarmerStories router={router} setShowStoryModal={setShowStoryModal} />

      {/* 🌱 Crop Discovery */}
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

      {/* 🧑‍🌾 Community Highlights */}
      <section className="mb-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-800">
          <FaUsers className="text-green-600" /> {t("community_highlights")}
        </h2>
        <p className="text-green-700 mt-3 ml-8">{t("coming_soon")}</p>
      </section>

      {/* ✍️ Add Story Modal */}
      {showStoryModal && (
        <StoryFormModal
          open={showStoryModal}
          onClose={() => setShowStoryModal(false)}
        />
      )}

      {/* 🌾 Crop Detail Modal */}
      <CropDetailModal crop={selectedCrop} onClose={() => setSelectedCrop(null)} />
        </div>
      </div>
    </MobilePageContainer>
  );
}
