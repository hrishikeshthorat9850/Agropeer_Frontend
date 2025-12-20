"use client";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/Context/languagecontext";

export default function ChooseCategoryPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");

  // 🌍 Multilingual Categories
  const CATEGORIES = [
    { key: "seeds", label: t("category_seeds") },
    { key: "fertilizers", label: t("category_fertilizers") },
    { key: "pesticides", label: t("category_pesticides") },
    { key: "machinery", label: t("category_machinery") },
    { key: "livestock", label: t("category_livestock") },
    { key: "vegetables", label: t("category_vegetables") },
    { key: "fruits", label: t("category_fruits") },
    { key: "oil", label: t("category_oil") },
    { key: "services", label: t("category_services") },
    { key: "others", label: t("category_others") },
  ];

  const filtered = CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-122px)] flex justify-center py-10 px-2">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-6 border border-green-300 dark:bg-[#272727]">
        
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-green-800 text-center">
          {t("choose_category_title")}
        </h1>

        {/* Search Input */}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("search_categories")}
          className="w-full border-2 border-green-500 rounded-lg px-3 py-2 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />

        {/* Category List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((cat) => (
            <Link key={cat.key} href={`/sell/selected?category=${cat.key}`} className="block">
              <div className="p-4 border border-green-200 rounded-xl hover:bg-green-50 hover:shadow-md transition-all duration-200 cursor-pointer dark:hover:bg-[#0a0a0a]">
                <p className="font-medium text-green-800">{cat.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results */}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            {t("no_category_found")} “{query}”
          </p>
        )}
      </div>
    </div>
  );
}
