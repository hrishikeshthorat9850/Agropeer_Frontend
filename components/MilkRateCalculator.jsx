"use client";
import React, { useState } from "react";
import { FaCalculator, FaCopy, FaRedo } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

const companies = [
  { name: "Amul", baseRate: 33, fatMultiplier: 1.5, snfMultiplier: 1 },
  { name: "Mother Dairy", baseRate: 34, fatMultiplier: 1.4, snfMultiplier: 1.2 },
  { name: "Gokul", baseRate: 32, fatMultiplier: 1.3, snfMultiplier: 1.1 },
  { name: "Parag", baseRate: 35, fatMultiplier: 1.6, snfMultiplier: 1.3 },
  { name: "Saras", baseRate: 31, fatMultiplier: 1.2, snfMultiplier: 1 },
  { name: "VRS", baseRate: 36, fatMultiplier: 1.7, snfMultiplier: 1.4 },
  { name: "Warana", baseRate: 33, fatMultiplier: 1.5, snfMultiplier: 1 },
  { name: "Nandini", baseRate: 34, fatMultiplier: 1.4, snfMultiplier: 1.2 },
  { name: "Aavin", baseRate: 32, fatMultiplier: 1.3, snfMultiplier: 1.1 },
  { name: "Milma", baseRate: 35, fatMultiplier: 1.6, snfMultiplier: 1.3 },
];

export default function MilkRateCalculator() {
  const { t } = useLanguage();

  const [company, setCompany] = useState(companies[0].name);
  const [quantity, setQuantity] = useState(1);
  const [snf, setSnf] = useState(8.5);
  const [fat, setFat] = useState(4.0);
  const [manualRate, setManualRate] = useState(null);
  const [copied, setCopied] = useState(false);

  const inputClass =
    "w-full border-2 border-green-400 text-black rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 dark:text-white";

  // Calculate adjusted rate dynamically
  const getAdjustedRate = () => {
    const selected = companies.find((c) => c.name === company);
    if (!selected) return 0;
    const rate = selected.baseRate + fat * selected.fatMultiplier + snf * selected.snfMultiplier;
    return Number(rate.toFixed(2));
  };

  // Effective rate = manualRate if user changed, else adjustedRate
  const effectiveRate = manualRate !== null ? manualRate : getAdjustedRate();

  // Total
  const total = (quantity * effectiveRate).toFixed(2);

  const handleReset = () => {
    setQuantity("");
    setSnf("");
    setFat("");
    setManualRate(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(total);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-[calc(100vh-122px)] flex justify-center py-10 px-2">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 flex flex-col gap-6 dark:bg-[#272727]">

        <h1 className="text-3xl font-bold text-green-900 flex items-center gap-3 mb-4">
          <FaCalculator className="text-green-600 text-2xl" /> {t("milk_calculator")}
        </h1>

        {/* Company */}
        <div className="p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm flex flex-col gap-3 dark:bg-[#1E1E1E] dark:border-gray-600">
          <label className="text-green-900 font-semibold dark:text-gray-200">{t("select_company")}</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
          >
            {companies.map((c) => (
              <option key={c.name} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Quantity */}
        <div className="p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm flex flex-col gap-3 dark:bg-[#1E1E1E] dark:border-gray-600">
          <label className="text-green-900 font-semibold dark:text-gray-200">{t("milk_quantity")}</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={inputClass}
          />
        </div>

        {/* SNF & Fat */}
        <div className="p-4 bg-green-50 rounded-xl border border-green-200 shadow-sm flex gap-4 dark:bg-[#1E1E1E] dark:border-gray-600">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-green-900 font-semibold dark:text-gray-200">{t("snf")}</label>
            <input
              type="number"
              step={0.1}
              min={0}
              max={15}
              value={snf}
              onChange={(e) => setSnf(Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label className="text-green-900 font-semibold dark:text-gray-200">{t("fat")}</label>
            <input
              type="number"
              step={0.1}
              min={0}
              max={10}
              value={fat}
              onChange={(e) => setFat(Number(e.target.value))}
              className={inputClass}
            />
          </div>
        </div>

        {/* Rate & Total */}
        <div className="p-4 bg-green-100 rounded-xl border border-green-200 shadow-md flex flex-col gap-3 dark:bg-[#1E1E1E] dark:border-gray-600">

          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-green-800 dark:text-gray-200">{t("rate")}:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step={0.01}
                min={0}
                value={effectiveRate}
                onChange={(e) => setManualRate(Number(e.target.value))}
                className="w-24 border-2 border-green-400 text-black rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="text-green-900 font-bold dark:text-gray-200">{t("per_liter")}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-green-800 dark:text-gray-200">{t("total")}:</span>
            <div className="flex items-center gap-2">
              <span className="text-xl font-mono font-bold text-green-900 dark:text-white">₹{total}</span>
              <button
                onClick={copyToClipboard}
                className="text-green-700 hover:text-green-900 transition-colors"
                title="Copy Total"
              >
                <FaCopy />
              </button>
            </div>
          </div>

          {copied && (
            <p className="text-xs text-green-700 mt-1 animate-pulse">{t("copied")}</p>
          )}
        </div>

        {/* Reset */}
        <div className="flex justify-end">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-red-700 hover:text-red-900 font-semibold transition-colors"
          >
            <FaRedo /> {t("reset")}
          </button>
        </div>

        {/* Tip */}
        {/* <div className="text-sm text-green-700 mt-2 text-center">
          Tip: Adjust SNF, Fat, Quantity or Rate. Total updates dynamically.
        </div> */}
      </div>
    </div>
  );
}
