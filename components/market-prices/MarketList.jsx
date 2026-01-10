"use client";

import MarketCard from "./MarketCard";
import { useLanguage } from "@/Context/languagecontext";

export default function MarketList({ data = [], filters = {} }) {
  const { t } = useLanguage();

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {t("no_data_available")}
        </h3>
        <p className="text-gray-500">{t("try_again_later")}</p>
      </div>
    );
  }

  const filteredData = data.filter((item) => {
    if (!item) return false;
    if (filters.state && item.state !== filters.state) return false;
    if (filters.district && item.district !== filters.district) return false;
    if (filters.market && item.market !== filters.market) return false;

    if (filters.search) {
      const s = filters.search.toLowerCase();
      if (!item.commodity || !item.commodity.toLowerCase().includes(s))
        return false;
    }

    if (filters.commodity && item.commodity !== filters.commodity) return false;
    if (filters.arrival_date && item.arrival_date !== filters.arrival_date)
      return false;

    return true;
  });

  if (filteredData.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="text-gray-400 text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {t("no_market_prices_found")}
        </h3>
        <p className="text-gray-500">{t("adjust_filters_search_query")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-fr">
      {filteredData.map((item, index) => (
        <div
          key={
            item.id ||
            `${item.market}_${item.commodity}_${item.arrival_date}_${index}`
          }
          className="flex"
        >
          <MarketCard data={item} /> // Ensure MarketCard handles translation
          internally now
        </div>
      ))}
    </div>
  );
}
