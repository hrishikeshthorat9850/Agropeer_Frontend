"use client";
import { FaChartLine, FaEye } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function MarketSection({ router }) {
  const { t } = useLanguage();
  
  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold flex items-center gap-2 text-green-800">
          <FaChartLine className="text-green-600" /> {t("market_section_title")}
        </h2>

        <button
          onClick={() => router.push("/market-prices")}
          className="relative w-full sm:w-auto overflow-hidden px-6 py-3 flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl shadow-lg transform transition-transform hover:scale-105"
        >
          <FaEye className="relative z-10 text-white animate-pulse" />
          <span className="relative z-10">{t("market_prices_button")}</span>
        </button>
      </div>

      <div className="p-5">
        <p className="text-green-800 leading-relaxed">
          {t("market_section_desc")}
        </p>
      </div>
    </section>
  );
}
