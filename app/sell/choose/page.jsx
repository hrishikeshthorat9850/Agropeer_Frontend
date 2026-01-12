"use client";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/Context/languagecontext";
import {
  FaSearch,
  FaSeedling,
  FaTractor,
  FaFlask,
  FaBug,
  FaPaw,
  FaCarrot,
  FaAppleAlt,
  FaTint,
  FaHandshake,
  FaEllipsisH,
} from "react-icons/fa";

export default function ChooseCategoryPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  // 🌍 Multilingual Categories
  const CATEGORIES = [
    {
      key: "seeds",
      label: t("category_seeds"),
      icon: <FaSeedling />,
      color: "bg-green-100 text-green-600",
    },
    {
      key: "fertilizers",
      label: t("category_fertilizers"),
      icon: <FaFlask />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      key: "pesticides",
      label: t("category_pesticides"),
      icon: <FaBug />,
      color: "bg-red-100 text-red-600",
    },
    {
      key: "machinery",
      label: t("category_machinery"),
      icon: <FaTractor />,
      color: "bg-orange-100 text-orange-600",
    },
    {
      key: "livestock",
      label: t("category_livestock"),
      icon: <FaPaw />,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      key: "vegetables",
      label: t("category_vegetables"),
      icon: <FaCarrot />,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      key: "fruits",
      label: t("category_fruits"),
      icon: <FaAppleAlt />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      key: "oil",
      label: t("category_oil"),
      icon: <FaTint />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      key: "services",
      label: t("category_services"),
      icon: <FaHandshake />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      key: "others",
      label: t("category_others"),
      icon: <FaEllipsisH />,
      color: "bg-gray-100 text-gray-600",
    },
  ];

  const filtered = CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black font-sans pb-12">
      {/* HEADER */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          {t("choose_category_title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Select a category to start selling
        </p>
      </div>

      <div className="px-4">
        {/* SEARCH BAR */}
        <div className="relative mb-6 group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400 group-focus-within:text-green-500 transition-colors" />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_categories")}
            className="
              w-full pl-11 pr-4 py-3.5 
              bg-white dark:bg-[#1a1a1a] 
              border border-gray-100 dark:border-white/10
              rounded-2xl 
              text-gray-900 dark:text-white 
              placeholder-gray-400 
              shadow-sm focus:shadow-md
              focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500
              transition-all duration-300
            "
          />
        </div>

        {/* CATEGORY GRID */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((cat) => (
            <Link
              key={cat.key}
              href={`/sell/selected?category=${cat.key}`}
              className="block group"
            >
              <div
                className="
                flex flex-col items-center justify-center gap-3
                p-5 h-full
                bg-white dark:bg-[#1a1a1a]
                border border-gray-100 dark:border-white/5
                rounded-[24px]
                shadow-sm hover:shadow-md
                active:scale-95 transition-all duration-200
              "
              >
                <div
                  className={`
                  w-14 h-14 rounded-2xl 
                  flex items-center justify-center 
                  text-2xl shadow-sm
                  ${cat.color}
                  group-hover:scale-110 transition-transform duration-300
                `}
                >
                  {cat.icon}
                </div>
                <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm text-center">
                  {cat.label}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* NO RESULTS */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-3">
              <FaSearch className="text-gray-400 text-xl" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {t("no_category_found")} “{query}”
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
