"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import {
  FaSeedling,
  FaTint,
  FaBug,
  FaLeaf,
  FaSun,
  FaChartLine,
  FaSearch,
  FaFilter,
  FaBookmark,
  FaBookmark as FaBookmarkSolid,
  FaShare,
  FaAward,
  FaCalendarAlt,
  FaTractor,
  FaFlask,
  FaRecycle,
  FaSync,
  FaLayerGroup,
  FaHandsHelping,
  FaCloudRain,
  FaSpider,
  FaEarlybirds,
  FaTree,
  FaCut,
  FaPoop,
  FaMountain,
  FaSnowflake,
  FaWarehouse,
  FaGlobeAmericas,
  FaRandom,
  FaVial,
  FaEye,
  FaWrench,
  FaWind,
  FaThermometerHalf,
  FaCloudMoon,
  FaArchive,
  FaShieldAlt,
  FaMicroscope,
  FaCheckDouble,
  FaPaw,
  FaCapsules,
  FaShieldVirus,
  FaBookOpen,
} from "react-icons/fa";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";
import { useRouter } from "next/navigation";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function FarmingTips() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedTips, setSavedTips] = useState(new Set());
  const [selectedTip, setSelectedTip] = useState(null);
  const router = useRouter();

  useBackPress(
    () => {
      if (selectedTip) {
        setSelectedTip(null);
        return true;
      }
      router.back();
      return true;
    },
    10,
    true,
  ); // Priority 10 (base page level), or could be dynamic.
  // Since we handle both cases, 10 is fine as long as no other overlay (with >10) is open.
  // Actually, if selectedTip is open, we might want higher priority?
  // But wait, if selectedTip is open, it IS the top level thing on this page.
  // So a single handler handling both states is correct.

  useEffect(() => {
    if (selectedTip) {
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
  }, [selectedTip]);

  const tips = [
    {
      id: 1,
      title: t("tip_1_title"),
      category: "soil",
      description: t("tip_1_description"),
      details: t("tip_1_details"),
      icon: <FaFlask className="w-8 h-8" />,
      color: "text-farm-600",
      bgColor: "bg-farm-50",
      iconColor: "text-farm-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 2,
      title: t("tip_2_title"),
      category: "soil",
      description: t("tip_2_description"),
      details: t("tip_2_details"),
      icon: <FaSync className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 3,
      title: t("tip_3_title"),
      category: "soil",
      description: t("tip_3_description"),
      details: t("tip_3_details"),
      icon: <FaLeaf className="w-8 h-8" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 4,
      title: t("tip_4_title"),
      category: "soil",
      description: t("tip_4_description"),
      details: t("tip_4_details"),
      icon: <FaLayerGroup className="w-8 h-8" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 5,
      title: t("tip_5_title"),
      category: "soil",
      description: t("tip_5_description"),
      details: t("tip_5_details"),
      icon: <FaHandsHelping className="w-8 h-8" />,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-500",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 6,
      title: t("tip_6_title"),
      category: "water",
      description: t("tip_6_description"),
      details: t("tip_6_details"),
      icon: <FaTint className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      season: "dry",
      difficulty: "intermediate",
    },
    {
      id: 7,
      title: t("tip_7_title"),
      category: "water",
      description: t("tip_7_description"),
      details: t("tip_7_details"),
      icon: <FaCloudRain className="w-8 h-8" />,
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      iconColor: "text-sky-500",
      season: "rainy",
      difficulty: "advanced",
    },
    {
      id: 8,
      title: t("tip_8_title"),
      category: "water",
      description: t("tip_8_description"),
      details: t("tip_8_details"),
      icon: <FaLayerGroup className="w-8 h-8" />,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-500",
      season: "dry",
      difficulty: "beginner",
    },
    {
      id: 9,
      title: t("tip_9_title"),
      category: "pest",
      description: t("tip_9_description"),
      details: t("tip_9_details"),
      icon: <FaBug className="w-8 h-8" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 10,
      title: t("tip_10_title"),
      category: "pest",
      description: t("tip_10_description"),
      details: t("tip_10_details"),
      icon: <FaSpider className="w-8 h-8" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 11,
      title: t("tip_11_title"),
      category: "pest",
      description: t("tip_11_description"),
      details: t("tip_11_details"),
      icon: <FaEarlybirds className="w-8 h-8" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 12,
      title: t("tip_12_title"),
      category: "pest",
      description: t("tip_12_description"),
      details: t("tip_12_details"),
      icon: <FaTree className="w-8 h-8" />,
      color: "text-green-700",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 13,
      title: t("tip_13_title"),
      category: "crop",
      description: t("tip_13_description"),
      details: t("tip_13_details"),
      icon: <FaSeedling className="w-8 h-8" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
      season: "planting",
      difficulty: "intermediate",
    },
    {
      id: 14,
      title: t("tip_14_title"),
      category: "crop",
      description: t("tip_14_description"),
      details: t("tip_14_details"),
      icon: <FaCut className="w-8 h-8" />,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-500",
      season: "growing",
      difficulty: "beginner",
    },
    {
      id: 15,
      title: t("tip_15_title"),
      category: "crop",
      description: t("tip_15_description"),
      details: t("tip_15_details"),
      icon: <FaSun className="w-8 h-8" />,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-400",
      season: "harvest",
      difficulty: "beginner",
    },
    {
      id: 16,
      title: t("tip_16_title"),
      category: "seasonal",
      description: t("tip_16_description"),
      details: t("tip_16_details"),
      icon: <FaCalendarAlt className="w-8 h-8" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 17,
      title: t("tip_17_title"),
      category: "crop",
      description: t("tip_17_description"),
      details: t("tip_17_details"),
      icon: <FaTractor className="w-8 h-8" />,
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      iconColor: "text-rose-500",
      season: "planting",
      difficulty: "intermediate",
    },
    {
      id: 18,
      title: t("tip_18_title"),
      category: "fertilizer",
      description: t("tip_18_description"),
      details: t("tip_18_details"),
      icon: <FaFlask className="w-8 h-8" />,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
      iconColor: "text-violet-500",
      season: "growing",
      difficulty: "intermediate",
    },
    {
      id: 19,
      title: t("tip_19_title"),
      category: "fertilizer",
      description: t("tip_19_description"),
      details: t("tip_19_details"),
      icon: <FaPoop className="w-8 h-8" />,
      color: "text-amber-800",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-700",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 20,
      title: t("tip_20_title"),
      category: "fertilizer",
      description: t("tip_20_description"),
      details: t("tip_20_details"),
      icon: <FaLeaf className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 21,
      title: t("tip_21_title"),
      category: "water",
      description: t("tip_21_description"),
      details: t("tip_21_details"),
      icon: <FaChartLine className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      season: "growing",
      difficulty: "advanced",
    },
    {
      id: 22,
      title: t("tip_22_title"),
      category: "soil",
      description: t("tip_22_description"),
      details: t("tip_22_details"),
      icon: <FaMountain className="w-8 h-8" />,
      color: "text-stone-600",
      bgColor: "bg-stone-50",
      iconColor: "text-stone-500",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 23,
      title: t("tip_23_title"),
      category: "seasonal",
      description: t("tip_23_description"),
      details: t("tip_23_details"),
      icon: <FaSnowflake className="w-8 h-8" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
      season: "winter",
      difficulty: "intermediate",
    },
    {
      id: 24,
      title: t("tip_24_title"),
      category: "seasonal",
      description: t("tip_24_description"),
      details: t("tip_24_details"),
      icon: <FaSun className="w-8 h-8" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      season: "summer",
      difficulty: "intermediate",
    },
    {
      id: 25,
      title: t("tip_25_title"),
      category: "crop",
      description: t("tip_25_description"),
      details: t("tip_25_details"),
      icon: <FaWarehouse className="w-8 h-8" />,
      color: "text-slate-600",
      bgColor: "bg-slate-50",
      iconColor: "text-slate-500",
      season: "harvest",
      difficulty: "beginner",
    },
    {
      id: 26,
      title: t("tip_26_title"),
      category: "pest",
      description: t("tip_26_description"),
      details: t("tip_26_details"),
      icon: <FaBug className="w-8 h-8" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 27,
      title: t("tip_27_title"),
      category: "water",
      description: t("tip_27_description"),
      details: t("tip_27_details"),
      icon: <FaFilter className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-400",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 28,
      title: t("tip_28_title"),
      category: "soil",
      description: t("tip_28_description"),
      details: t("tip_28_details"),
      icon: <FaGlobeAmericas className="w-8 h-8" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 29,
      title: t("tip_29_title"),
      category: "crop",
      description: t("tip_29_description"),
      details: t("tip_29_details"),
      icon: <FaRandom className="w-8 h-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      season: "planting",
      difficulty: "intermediate",
    },
    {
      id: 30,
      title: t("tip_30_title"),
      category: "fertilizer",
      description: t("tip_30_description"),
      details: t("tip_30_details"),
      icon: <FaVial className="w-8 h-8" />,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-500",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 31,
      title: t("tip_31_title"),
      category: "pest",
      description: t("tip_31_description"),
      details: t("tip_31_details"),
      icon: <FaEye className="w-8 h-8" />,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-500",
      season: "growing",
      difficulty: "beginner",
    },
    {
      id: 32,
      title: t("tip_32_title"),
      category: "crop",
      description: t("tip_32_description"),
      details: t("tip_32_details"),
      icon: <FaWrench className="w-8 h-8" />,
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      iconColor: "text-gray-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 33,
      title: t("tip_33_title"),
      category: "soil",
      description: t("tip_33_description"),
      details: t("tip_33_details"),
      icon: <FaWind className="w-8 h-8" />,
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-500",
      season: "all",
      difficulty: "intermediate",
    },
    {
      id: 34,
      title: t("tip_34_title"),
      category: "water",
      description: t("tip_34_description"),
      details: t("tip_34_details"),
      icon: <FaThermometerHalf className="w-8 h-8" />,
      color: "text-red-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-400",
      season: "summer",
      difficulty: "intermediate",
    },
    {
      id: 35,
      title: t("tip_35_title"),
      category: "seasonal",
      description: t("tip_35_description"),
      details: t("tip_35_details"),
      icon: <FaCloudMoon className="w-8 h-8" />,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      iconColor: "text-indigo-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 36,
      title: t("tip_36_title"),
      category: "crop",
      description: t("tip_36_description"),
      details: t("tip_36_details"),
      icon: <FaArchive className="w-8 h-8" />,
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      season: "harvest",
      difficulty: "intermediate",
    },
    {
      id: 37,
      title: t("tip_37_title"),
      category: "pest",
      description: t("tip_37_description"),
      details: t("tip_37_details"),
      icon: <FaShieldAlt className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 38,
      title: t("tip_38_title"),
      category: "fertilizer",
      description: t("tip_38_description"),
      details: t("tip_38_details"),
      icon: <FaRecycle className="w-8 h-8" />,
      color: "text-green-700",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 39,
      title: t("tip_39_title"),
      category: "soil",
      description: t("tip_39_description"),
      details: t("tip_39_details"),
      icon: <FaMicroscope className="w-8 h-8" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 40,
      title: t("tip_40_title"),
      category: "water",
      description: t("tip_40_description"),
      details: t("tip_40_details"),
      icon: <FaCheckDouble className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      season: "growing",
      difficulty: "intermediate",
    },
    {
      id: 41,
      title: t("tip_41_title"),
      category: "crop",
      description: t("tip_41_description"),
      details: t("tip_41_details"),
      icon: <FaWarehouse className="w-8 h-8" />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-500",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 42,
      title: t("tip_42_title"),
      category: "soil",
      description: t("tip_42_description"),
      details: t("tip_42_details"),
      icon: <FaPaw className="w-8 h-8" />,
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      season: "all",
      difficulty: "advanced",
    },
    {
      id: 43,
      title: t("tip_43_title"),
      category: "crop",
      description: t("tip_43_description"),
      details: t("tip_43_details"),
      icon: <FaCapsules className="w-8 h-8" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      season: "planting",
      difficulty: "intermediate",
    },
    {
      id: 44,
      title: t("tip_44_title"),
      category: "pest",
      description: t("tip_44_description"),
      details: t("tip_44_details"),
      icon: <FaShieldVirus className="w-8 h-8" />,
      color: "text-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-500",
      season: "all",
      difficulty: "beginner",
    },
    {
      id: 45,
      title: t("tip_45_title"),
      category: "crop",
      description: t("tip_45_description"),
      details: t("tip_45_details"),
      icon: <FaChartLine className="w-8 h-8" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      season: "harvest",
      difficulty: "intermediate",
    },
  ];

  const categories = [
    {
      id: "all",
      name: t("category_all"),
      icon: <FaAward className="w-4 h-4" />,
    },
    {
      id: "soil",
      name: t("category_soil"),
      icon: <FaFlask className="w-4 h-4" />,
    },
    {
      id: "water",
      name: t("category_water"),
      icon: <FaTint className="w-4 h-4" />,
    },
    {
      id: "pest",
      name: t("category_pest"),
      icon: <FaBug className="w-4 h-4" />,
    },
    {
      id: "crop",
      name: t("category_crop"),
      icon: <FaSeedling className="w-4 h-4" />,
    },
    {
      id: "fertilizer",
      name: t("category_fertilizer"),
      icon: <FaFlask className="w-4 h-4" />,
    },
    {
      id: "seasonal",
      name: t("category_seasonal"),
      icon: <FaCalendarAlt className="w-4 h-4" />,
    },
  ];

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesCategory =
        selectedCategory === "all" || tip.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tip.details.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [tips, searchQuery, selectedCategory]);

  const toggleSave = (tipId) => {
    setSavedTips((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tipId)) {
        newSet.delete(tipId);
      } else {
        newSet.add(tipId);
      }
      return newSet;
    });
  };

  const handleShare = (tip) => {
    if (Capacitor.isNativePlatform()) {
      const result = shareContent({
        title: tip.title,
        text: tip.description,
        id: tip?.id,
        route: "farmin-tips",
      });

      if (result.platform === "native") {
        console.log("✔ Shared via native bottom sheet");
      }

      if (result.platform === "web") {
        console.log("🌍 Shared via browser share dialog");
      }

      if (result.platform === "copy") {
        showToast("info", "📋 Link copied to clipboard!");
      }

      if (!result.success) {
        return;
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(
        `${tip.title}\n\n${tip.description}\n\n${window.location.href}`,
      );
      alert("Tip copied to clipboard!");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-black pb-6">
      {/* Sticky Mobile Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-farm-100 dark:bg-farm-900/30 rounded-full flex items-center justify-center text-farm-600 dark:text-farm-400">
            <FaLeaf className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("page_title")}
          </h1>
        </div>
      </nav>

      <div className="px-2 pt-4">
        {/* Search Bar - Floating Style */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-2xl py-3.5 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-farm-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
          />
        </div>

        {/* Categories - Story/Chip Style */}
        <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? "bg-farm-600 border-farm-600 text-white shadow-md shadow-farm-500/20"
                    : "bg-white dark:bg-[#121212] border-gray-100 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tips Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredTips.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <FaSearch className="w-6 h-6" />
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                  {t("no_tips_found")}
                </p>
              </motion.div>
            ) : (
              filteredTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  onClick={() => setSelectedTip(tip)}
                  className="bg-white dark:bg-[#121212] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/5 group active:scale-[0.98] transition-all cursor-pointer"
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${tip.bgColor} rounded-full flex items-center justify-center ${tip.iconColor}`}
                      >
                        {tip.icon}
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${tip.color} dark:text-white/80 bg-gray-50 dark:bg-white/10 px-2 py-0.5 rounded-md`}
                        >
                          {categories.find((c) => c.id === tip.category)?.name}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-[10px] text-gray-400 font-medium capitalize flex items-center gap-1">
                            <FaLayerGroup className="w-2.5 h-2.5" />{" "}
                            {t(`difficulty_${tip.difficulty}`)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {tip.description}
                  </p>

                  {/* Card Footer / Action Bar */}
                  <div className="flex items-center justify-between border-t border-gray-50 dark:border-white/5 pt-4">
                    <span className="text-xs font-bold text-farm-600 dark:text-farm-400">
                      Read More
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(tip.id);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          savedTips.has(tip.id)
                            ? "bg-yellow-50 text-yellow-500 dark:bg-yellow-900/20"
                            : "text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                        }`}
                      >
                        {savedTips.has(tip.id) ? (
                          <FaBookmarkSolid className="w-4 h-4" />
                        ) : (
                          <FaBookmark className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(tip);
                        }}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                      >
                        <FaShare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tip Detail Modal - Bottom Sheet Style on Mobile */}
      <AnimatePresence>
        {selectedTip && (
          <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTip(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full sm:w-[500px] max-h-[90vh] sm:max-h-[85vh] sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col ring-1 ring-gray-200 dark:ring-white/10 relative z-50 bg-white dark:bg-[#18181b]"
            >
              {/* Modal Header Image/Icon Area */}
              <div
                className={`h-40 ${selectedTip.bgColor} dark:bg-[#27272a] flex items-center justify-center relative shrink-0`}
              >
                <div className="w-12 h-1.5 bg-black/20 dark:bg-white/20 rounded-full absolute top-3"></div>

                {/* Decorative background circle */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-black/20" />

                <div
                  className={`w-24 h-24 bg-white dark:bg-[#2C2C2E] shadow-xl rounded-full flex items-center justify-center ${selectedTip.iconColor} relative z-10 transform translate-y-2`}
                >
                  <div className="scale-125">{selectedTip.icon}</div>
                </div>

                <button
                  onClick={() => setSelectedTip(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/30 hover:bg-white/50 dark:bg-black/20 dark:hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-gray-800 dark:text-white transition-colors border border-white/20"
                >
                  <span className="text-xl leading-none">&times;</span>
                </button>
              </div>

              {/* Content Scrollable */}
              <div className="p-6 overflow-y-auto flex-1 bg-white dark:bg-[#18181b]">
                <div className="mb-6 text-center">
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#27272a] text-gray-900 dark:text-white text-xs font-bold border border-gray-200 dark:border-white/10">
                      {
                        categories.find((c) => c.id === selectedTip.category)
                          ?.name
                      }
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#27272a] text-gray-900 dark:text-white text-xs font-bold capitalize border border-gray-200 dark:border-white/10">
                      {t(`difficulty_${selectedTip.difficulty}`)}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-black dark:text-white mb-3">
                    {selectedTip.title}
                  </h2>
                  <p className="text-gray-900 dark:text-gray-200 text-base leading-relaxed font-medium">
                    {selectedTip.description}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-[#27272a] rounded-2xl p-5 border border-gray-200 dark:border-white/10">
                  <h3 className="font-bold text-black dark:text-white mb-3 text-sm uppercase tracking-wide flex items-center gap-2">
                    <FaBookOpen className="w-4 h-4" />
                    {t("detailed_information")}
                  </h3>
                  <p className="text-gray-900 dark:text-gray-200 text-sm leading-relaxed whitespace-pre-wrap font-medium">
                    {selectedTip.details}
                  </p>
                </div>
              </div>

              {/* Bottom Actions Sticky */}
              <div className="p-4 border-t border-gray-100 dark:border-white/10 bg-white dark:bg-[#18181b] shrink-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleSave(selectedTip.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${
                      savedTips.has(selectedTip.id)
                        ? "bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/40 dark:text-yellow-300 dark:border-yellow-700/50"
                        : "bg-gray-100 text-gray-900 border border-transparent dark:bg-[#27272a] dark:text-white hover:bg-gray-200 dark:hover:bg-[#3f3f46]"
                    }`}
                  >
                    {savedTips.has(selectedTip.id) ? (
                      <FaBookmarkSolid className="w-4 h-4" />
                    ) : (
                      <FaBookmark className="w-4 h-4" />
                    )}
                    {savedTips.has(selectedTip.id) ? t("saved") : t("save_tip")}
                  </button>
                  <button
                    onClick={() => handleShare(selectedTip)}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-farm-600 text-white hover:bg-farm-700 active:scale-[0.98] transition-all shadow-lg shadow-farm-500/20"
                  >
                    <FaShare className="w-4 h-4" />
                    {t("share")}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
