"use client";
import { useState, useMemo } from "react";
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
} from "react-icons/fa";

export default function FarmingTips() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedTips, setSavedTips] = useState(new Set());
  const [selectedTip, setSelectedTip] = useState(null);

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
    { id: "all", name: t("category_all"), icon: <FaAward className="w-4 h-4" /> },
    { id: "soil", name: t("category_soil"), icon: <FaFlask className="w-4 h-4" /> },
    { id: "water", name: t("category_water"), icon: <FaTint className="w-4 h-4" /> },
    { id: "pest", name: t("category_pest"), icon: <FaBug className="w-4 h-4" /> },
    { id: "crop", name: t("category_crop"), icon: <FaSeedling className="w-4 h-4" /> },
    { id: "fertilizer", name: t("category_fertilizer"), icon: <FaFlask className="w-4 h-4" /> },
    { id: "seasonal", name: t("category_seasonal"), icon: <FaCalendarAlt className="w-4 h-4" /> },
  ];

  const filteredTips = useMemo(() => {
    return tips.filter((tip) => {
      const matchesCategory = selectedCategory === "all" || tip.category === selectedCategory;
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
    if (navigator.share) {
      navigator.share({
        title: tip.title,
        text: tip.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${tip.title}\n\n${tip.description}\n\n${window.location.href}`);
      alert("Tip copied to clipboard!");
    }
  };

  return (
    <div className="min-h-[calc(100vh-122px)]">
      <div className="container mx-auto px-4 py-12 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaAward className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
            {t("page_title")}
          </h1>
          <p className="text-farm-700 max-w-2xl mx-auto text-lg dark:text-gray-300">
            {t("page_subtitle")}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 mb-8 dark:bg-[#272727] dark:border-white/20"
        >
          {/* Search Section (Top) */}
          <div className="relative mb-4">
            <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-neutral-700">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder={t("search_placeholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
              />
            </div>
          </div>

          {/* Categories Section (Bottom) */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <FaFilter className="text-farm-600 flex-shrink-0" />

            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${selectedCategory === cat.id
                    ? "bg-gradient-to-r from-farm-500 to-farm-600 text-white shadow-lg"
                    : "bg-farm-100 text-farm-700 hover:bg-farm-200 dark:bg-[#363636] dark:text-gray-300 dark:hover:bg-[#404040]"
                    }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Tips Grid */}
        {filteredTips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-12 text-center shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20"
          >
            <FaSearch className="w-16 h-16 text-farm-300 mx-auto mb-4" />
            <p className="text-farm-600 text-lg dark:text-gray-400">
              {t("no_tips_found")}
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 hover:shadow-xl transition-all cursor-pointer group dark:bg-[#272727] dark:border-white/20"
                  onClick={() => setSelectedTip(tip)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${tip.bgColor} rounded-xl flex items-center justify-center ${tip.iconColor}`}>
                      {tip.icon}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSave(tip.id);
                        }}
                        className="p-2 rounded-lg hover:bg-farm-100 transition dark:hover:bg-[#363636]"
                      >
                        {savedTips.has(tip.id) ? (
                          <FaBookmarkSolid className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <FaBookmark className="w-5 h-5 text-farm-400" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(tip);
                        }}
                        className="p-2 rounded-lg hover:bg-farm-100 transition dark:hover:bg-[#363636]"
                      >
                        <FaShare className="w-5 h-5 text-farm-400" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-farm-900 mb-3 dark:text-white group-hover:text-farm-600 transition">
                    {tip.title}
                  </h3>
                  <p className="text-farm-700 leading-relaxed mb-4 dark:text-gray-300">
                    {tip.description}
                  </p>

                  <div className="flex items-center gap-3 text-sm">
                    <span className={`px-3 py-1 rounded-full ${tip.bgColor} ${tip.iconColor} font-semibold`}>
                      {categories.find((c) => c.id === tip.category)?.name}
                    </span>
                    <span className="text-farm-500 dark:text-gray-400 capitalize">
                      {t(`difficulty_${tip.difficulty}`)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Tip Detail Modal */}
        <AnimatePresence>
          {selectedTip && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
              onClick={() => setSelectedTip(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:bg-[#272727]"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 ${selectedTip.bgColor} rounded-xl flex items-center justify-center ${selectedTip.iconColor}`}>
                    {selectedTip.icon}
                  </div>
                  <button
                    onClick={() => setSelectedTip(null)}
                    className="text-farm-400 hover:text-farm-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <h2 className="text-3xl font-bold text-farm-900 mb-4 dark:text-white">
                  {selectedTip.title}
                </h2>
                <p className="text-farm-700 text-lg mb-6 leading-relaxed dark:text-gray-300">
                  {selectedTip.description}
                </p>
                <div className="bg-farm-50 rounded-xl p-6 mb-6 dark:bg-[#1E1E1E]">
                  <h3 className="font-bold text-farm-900 mb-3 dark:text-white">{t("detailed_information")}</h3>
                  <p className="text-farm-700 leading-relaxed dark:text-gray-300">
                    {selectedTip.details}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 border-t border-farm-200 dark:border-white/20">
                  <button
                    onClick={() => toggleSave(selectedTip.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${savedTips.has(selectedTip.id)
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                      : "bg-farm-100 text-farm-700 hover:bg-farm-200 dark:bg-[#363636] dark:text-gray-300"
                      }`}
                  >
                    {savedTips.has(selectedTip.id) ? (
                      <>
                        <FaBookmarkSolid className="w-4 h-4" />
                        {t("saved")}
                      </>
                    ) : (
                      <>
                        <FaBookmark className="w-4 h-4" />
                        {t("save_tip")}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(selectedTip)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-farm-100 text-farm-700 hover:bg-farm-200 transition dark:bg-[#363636] dark:text-gray-300"
                  >
                    <FaShare className="w-4 h-4" />
                    {t("share")}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
