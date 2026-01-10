"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaCalculator, FaTrophy, FaRupeeSign } from "react-icons/fa";

import { useLanguage } from "@/Context/languagecontext";

export default function ComparisonCalculator({ companies }) {
  const { t } = useLanguage();
  const [fat, setFat] = useState(4.0);
  const [snf, setSnf] = useState(8.5);

  const calculateRate = (company, fat, snf) => {
    if (!company) return 0;
    // If company has formula fields, use formula
    if (company.base_rate !== null && company.base_rate !== undefined &&
      company.fat_multiplier !== null && company.fat_multiplier !== undefined &&
      company.snf_multiplier !== null && company.snf_multiplier !== undefined) {
      return Number((company.base_rate + fat * company.fat_multiplier + snf * company.snf_multiplier).toFixed(2));
    }
    // Otherwise use fixed per_liter_rate
    return company.per_liter_rate || 0;
  };

  const rates = useMemo(() => {
    if (!companies || companies.length === 0) return [];

    return companies
      .map((company) => ({
        company,
        rate: calculateRate(company, fat, snf),
      }))
      .sort((a, b) => b.rate - a.rate);
  }, [companies, fat, snf]);

  const bestRate = rates.length > 0 ? rates[0] : null;
  const averageRate = rates.length > 0
    ? rates.reduce((sum, r) => sum + r.rate, 0) / rates.length
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="farm-card p-6 md:p-8 mb-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <FaCalculator className="text-2xl text-farm-600" />
        <h2 className="text-2xl font-display font-bold text-farm-900">
          {t("compare_rates")}
        </h2>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {t("fat_percentage")}
          </label>
          <input
            type="number"
            step={0.1}
            min={0}
            max={10}
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            className="w-full px-4 py-3 border-2 border-farm-200 rounded-xl focus:border-farm-500 focus:ring-4 focus:ring-farm-100 transition-all duration-300 bg-white text-farm-900"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-farm-700 mb-2">
            {t("snf_percentage")}
          </label>
          <input
            type="number"
            step={0.1}
            min={0}
            max={15}
            value={snf}
            onChange={(e) => setSnf(e.target.value)}
            className="w-full px-4 py-3 border-2 border-farm-200 rounded-xl focus:border-farm-500 focus:ring-4 focus:ring-farm-100 transition-all duration-300 bg-white text-farm-900"
          />
        </div>
      </div>

      {/* Results */}
      {rates.length > 0 && (
        <div className="space-y-4">
          {/* Best Rate Highlight */}
          {bestRate && (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="p-4 bg-gradient-to-r from-sunset-400 to-sunset-600 rounded-xl text-white"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaTrophy className="w-5 h-5" />
                <span className="font-bold">{t("best_rate")}</span>
              </div>
              <div className="text-2xl font-bold mb-1">
                {bestRate.company.name}: ₹{bestRate.rate}
              </div>
              {rates.length > 1 && (
                <div className="text-sm opacity-90">
                  {t("earn_more_msg").replace("{amount}", (bestRate.rate - averageRate).toFixed(2))}
                </div>
              )}
            </motion.div>
          )}

          {/* All Rates List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {rates.map((item, index) => (
              <motion.div
                key={item.company.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-3 rounded-xl flex items-center justify-between ${index === 0
                    ? "bg-farm-100 border-2 border-farm-500"
                    : "bg-farm-50"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-farm-400 to-farm-600 flex items-center justify-center text-white font-bold text-sm">
                    {item.company.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-farm-900">{item.company.name}</div>
                    {item.company.milk_type && (
                      <div className="text-xs text-farm-600">{item.company.milk_type}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaRupeeSign className="text-farm-600" />
                  <span className="text-lg font-bold text-farm-900">{item.rate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

