"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useLanguage } from "@/Context/languagecontext";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load SellForm - heavy form component
const SellForm = dynamic(() => import("../../../components/SellForm"), {
  loading: () => <LoadingSpinner />,
});

export default function SelectedCategoryPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("others");
  
  const LABELS = {
    seeds: t("category_seeds"),
    fertilizers: t("category_fertilizers"),
    pesticides: t("category_pesticides"),
    machinery: t("category_machinery"),
    livestock: t("category_livestock"),
    vegetables: t("category_vegetables"),
    fruits: t("category_fruits"),
    oil: t("category_oil"),
    services: t("category_services"),
    others: t("category_others"),
  };

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory(categoryParam);
    }
  }, [searchParams]);

  const pretty = LABELS[category] || t("selected_category_fallback");

  return (
    <div className="min-h-screen flex justify-center font-sans">
      <div className="w-full max-w-3xl bg-white shadow-2xl p-4 flex flex-col gap-6 dark:bg-[#272727]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-green-600 font-medium">{t("sell_selected_title")}</p>
            <h2 className="text-xl font-bold text-green-800">{pretty}</h2>
          </div>
          <button
            onClick={() => router.push("/sell/choose")}
            className="px-4 py-2 border-2 border-green-600 rounded-md text-green-700 font-semibold hover:bg-green-100 transition"
          >
            {t("change_button")}
          </button>
        </div>

        {/* Sell Form */}
        <div className="mt-2">
          <SellForm category={category} />
        </div>
      </div>
    </div>
  );
}

