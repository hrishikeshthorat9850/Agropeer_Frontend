"use client";
import { useState, useRef, useEffect } from "react";
import { FaTools, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import { createPortal } from "react-dom";
import BottomSelect from "@/components/ui/BottomSelect";

export default function ToolsSection({
  tool,
  setTool,
  selectedToolCrop,
  setSelectedToolCrop,
  areaInput,
  setAreaInput,
  soilN,
  soilP,
  soilK,
  setSoilN,
  setSoilP,
  setSoilK,
  marketPrice,
  setMarketPrice,
  toolResult,
  setToolResult,
  loadingTool,
  setLoadingTool,
  errors,
  setErrors,
  uniqueCrops,
  LoadingSpinner,
}) {
  const { t } = useLanguage();
  const formRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (tool) {
      // Lock BODY
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      // Lock HTML
      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
    } else {
      // Unlock BODY
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";

      // Unlock HTML
      document.documentElement.style.overflow = "auto";
      document.documentElement.style.touchAction = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.touchAction = "auto";

      document.documentElement.style.overflow = "auto";
      document.documentElement.style.touchAction = "auto";
    };
  }, [tool]);

  // ✅ API endpoints (Using BASE_URL)
  const endpointMap = {
    seed: `${BASE_URL}/api/seed-calculator`,
    fertilizer: `${BASE_URL}/api/fertilizer-planner`,
    water: `${BASE_URL}/api/water-calculator`,
    density: `${BASE_URL}/api/planting-density`,
    yield: `${BASE_URL}/api/yield-estimator`,
    cost: `${BASE_URL}/api/cost-profit`,
  };

  // ✅ Tool labels
  const toolLabels = {
    seed: t("seed_calculator"),
    fertilizer: t("fertilizer_planner"),
    water: t("water_requirement"),
    density: t("planting_density"),
    yield: t("yield_estimator"),
    cost: t("cost_profit_analysis"),
  };

  // ✅ Number format
  const formatNumber = (num) =>
    num == null ? "-" : num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // ✅ Simple validation (no UI changes except * colors)
  const validateInputs = () => {
    const newErrors = {};
    if (!selectedToolCrop) newErrors.selectedToolCrop = true;
    if (!areaInput || Number(areaInput) <= 0) newErrors.areaInput = true;
    if (tool === "fertilizer") {
      if (!soilN) newErrors.soilN = true;
      if (!soilP) newErrors.soilP = true;
      if (!soilK) newErrors.soilK = true;
    }
    if (tool === "cost" && (!marketPrice || Number(marketPrice) <= 0))
      newErrors.marketPrice = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit handler
  const handleToolSubmit = async () => {
    if (!validateInputs()) return;

    setLoadingTool(true);
    setToolResult(null);

    let body = { cropName: selectedToolCrop, area: Number(areaInput) };
    if (tool === "fertilizer") {
      body.soilN = Number(soilN || 0);
      body.soilP = Number(soilP || 0);
      body.soilK = Number(soilK || 0);
    }
    if (tool === "cost") body.marketPrice = Number(marketPrice || 0);

    try {
      if (!BASE_URL) console.warn("Missing NEXT_PUBLIC_BASE_URL");
      const url = endpointMap[tool];
      console.log("Fetching tool:", url, body);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Tool Error:", data);
        setToolResult({ error: data.error || t("server_error") });
      } else {
        setToolResult(data);
      }
    } catch (err) {
      console.error("Network Error:", err);
      setToolResult({ error: t("server_error") });
    }
    setLoadingTool(false);
  };

  // ✅ Close animation
  const handleCloseForm = () => {
    // Logic to close
    setTool(null);
    setToolResult(null);
    setErrors({});
    // Clear all form inputs when closing tool
    setSelectedToolCrop("");
    setAreaInput("");
    setSoilN("");
    setSoilP("");
    setSoilK("");
    setMarketPrice("");
  };

  // Clear form inputs when tool changes to null (e.g., external close)
  useEffect(() => {
    if (!tool) {
      setSelectedToolCrop("");
      setAreaInput("");
      setSoilN("");
      setSoilP("");
      setSoilK("");
      setMarketPrice("");
      setToolResult(null);
      setErrors({});
    }
  }, [
    tool,
    setSelectedToolCrop,
    setAreaInput,
    setSoilN,
    setSoilP,
    setSoilK,
    setMarketPrice,
    setToolResult,
    setErrors,
  ]);

  // ✅ Label with color-changing *
  const Label = ({ text, fieldKey }) => (
    <label className="text-green-700 font-medium text-sm mb-1 flex items-center gap-1">
      {text}
      <span
        className={`${
          errors[fieldKey] ? "text-red-600" : "text-green-600"
        } transition-colors`}
      >
        *
      </span>
    </label>
  );

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
            <FaTools className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t("tools_section_title")}
          </h2>
        </div>
      </div>

      {/* 🌾 Tool Quick Actions (Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Object.keys(endpointMap).map((tKey) => (
          <motion.button
            key={tKey}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setTool(tKey);
              setToolResult(null);
              setErrors({});
            }}
            className={`
              flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all h-28
              ${
                tool === tKey
                  ? "bg-green-600 text-white border-green-600 shadow-md"
                  : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-green-200 dark:hover:border-green-800 hover:bg-green-50/50 dark:hover:bg-gray-700"
              }
            `}
          >
            {/* Icons mapping logic embedded for UI */}
            <div
              className={`mb-2 text-2xl ${
                tool === tKey
                  ? "text-white"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {tKey === "seed" && "🌱"}
              {tKey === "fertilizer" && "🧪"}
              {tKey === "water" && "💧"}
              {tKey === "density" && "📏"}
              {tKey === "yield" && "🚜"}
              {tKey === "cost" && "💰"}
            </div>
            <span className="text-sm font-semibold leading-tight">
              {toolLabels[tKey]}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 🌱 Tool Form - Bottom Sheet (PORTAL) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {tool && (
              <>
                {/* Backdrop */}
                <motion.div
                  key="backdrop"
                  className="fixed inset-0 z-[99998] bg-black/60 backdrop-blur-sm"
                  onClick={handleCloseForm}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />

                {/* Bottom Sheet */}
                <motion.div
                  key="sheet"
                  className="fixed bottom-0 left-0 right-0 z-[99999] bg-white dark:bg-gray-900 rounded-t-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                  {/* Drag Handle */}
                  <div
                    className="flex justify-center pt-3 pb-1"
                    onClick={handleCloseForm}
                  >
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full" />
                  </div>

                  {/* Header */}
                  <div className="px-6 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-2xl">
                        {tool === "seed" && "🌱"}
                        {tool === "fertilizer" && "🧪"}
                        {tool === "water" && "💧"}
                        {tool === "density" && "📏"}
                        {tool === "yield" && "🚜"}
                        {tool === "cost" && "💰"}
                      </span>
                      {toolLabels[tool]}
                    </h3>
                    <button
                      onClick={handleCloseForm}
                      className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  {/* Scrollable Content */}
                  <div className="p-6 overflow-y-auto pb-safe">
                    <div className="flex flex-col gap-5">
                      {/* Crop Select */}
                      <div className="flex flex-col gap-1.5">
                        <BottomSelect
                          label={t("select_crop")}
                          value={selectedToolCrop}
                          onChange={(val) => setSelectedToolCrop(val)}
                          options={uniqueCrops.map((c) => ({
                            label: c.name,
                            value: c.name,
                          }))}
                          placeholder={t("select_crop")}
                          zIndex={100000}
                          error={errors.selectedToolCrop ? true : ""}
                        />
                      </div>
                      {/* Area Input */}
                      <div className="flex flex-col gap-1.5">
                        <Label text={t("area_label")} fieldKey="areaInput" />
                        <input
                          className={`w-full p-4 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 text-gray-900 dark:text-white text-base ${
                            errors.areaInput
                              ? "border-red-500"
                              : "border-gray-200 dark:border-gray-700"
                          }`}
                          type="number"
                          placeholder={t("enter_area")}
                          value={areaInput}
                          onWheel={(e) => e.target.blur()}
                          onChange={(e) => setAreaInput(e.target.value)}
                        />
                      </div>
                      {/* Fertilizer Inputs */}
                      {tool === "fertilizer" && (
                        <div className="grid grid-cols-3 gap-3">
                          {["N", "P", "K"].map((el) => (
                            <div key={el} className="flex flex-col gap-1.5">
                              <Label
                                text={t("soil_label").replace("{value}", el)}
                                fieldKey={`soil${el}`}
                              />
                              <input
                                className={`w-full p-3 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 text-center text-gray-900 dark:text-white font-medium ${
                                  errors[`soil${el}`]
                                    ? "border-red-500"
                                    : "border-gray-200 dark:border-gray-700"
                                }`}
                                placeholder="0"
                                value={{ N: soilN, P: soilP, K: soilK }[el]}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (/^\d*$/.test(val)) {
                                    el === "N"
                                      ? setSoilN(val)
                                      : el === "P"
                                      ? setSoilP(val)
                                      : setSoilK(val);
                                  }
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {/* Market Price */}
                      {tool === "cost" && (
                        <div className="flex flex-col gap-1.5">
                          <Label
                            text={t("market_price_label")}
                            fieldKey="marketPrice"
                          />
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                              ₹
                            </span>
                            <input
                              className={`w-full p-4 pl-10 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 text-gray-900 dark:text-white font-medium ${
                                errors.marketPrice
                                  ? "border-red-500"
                                  : "border-gray-200 dark:border-gray-700"
                              }`}
                              placeholder="0.00"
                              value={marketPrice}
                              onChange={(e) => {
                                const val = e.target.value;
                                if (/^\d*\.?\d*$/.test(val)) {
                                  setMarketPrice(val);
                                }
                              }}
                            />
                          </div>
                        </div>
                      )}
                      {/* Calculate Button */}
                      <button
                        onClick={handleToolSubmit}
                        disabled={loadingTool}
                        className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl font-bold shadow-lg shadow-gray-200 dark:shadow-none active:scale-[0.98] transition-transform flex justify-center items-center gap-3 mt-2"
                      >
                        {loadingTool && (
                          <LoadingSpinner size="tiny" color="white" text="" />
                        )}
                        <span>{t("calculate_button")}</span>
                      </button>
                      {/* 🌾 Results Card */}
                      <AnimatePresence>
                        {toolResult && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className={`mt-2 rounded-2xl p-5 border ${
                              toolResult.error
                                ? "bg-red-50 border-red-100 text-red-800"
                                : "bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-900 dark:text-green-100"
                            }`}
                          >
                            {toolResult.error ? (
                              <div className="flex items-center gap-2 font-medium">
                                <FaTimes /> {toolResult.error}
                              </div>
                            ) : (
                              <div className="grid gap-3">
                                <div className="text-sm font-medium opacity-70 uppercase tracking-wide">
                                  Result
                                </div>

                                {tool === "seed" && (
                                  <div className="text-3xl font-bold">
                                    {formatNumber(toolResult.seedRequiredKg)}{" "}
                                    <span className="text-lg font-normal">
                                      kg
                                    </span>
                                  </div>
                                )}

                                {tool === "fertilizer" && (
                                  <div className="grid grid-cols-3 gap-2">
                                    {/* Fertilizer Output Blocks */}
                                    <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg text-center">
                                      <div className="text-xs opacity-70 font-bold">
                                        N
                                      </div>
                                      <div className="text-lg font-bold">
                                        {formatNumber(toolResult.fertilizer?.N)}
                                      </div>
                                    </div>
                                    <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg text-center">
                                      <div className="text-xs opacity-70 font-bold">
                                        P
                                      </div>
                                      <div className="text-lg font-bold">
                                        {formatNumber(toolResult.fertilizer?.P)}
                                      </div>
                                    </div>
                                    <div className="bg-white/50 dark:bg-black/20 p-2 rounded-lg text-center">
                                      <div className="text-xs opacity-70 font-bold">
                                        K
                                      </div>
                                      <div className="text-lg font-bold">
                                        {formatNumber(toolResult.fertilizer?.K)}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {tool === "water" && (
                                  <div className="text-3xl font-bold">
                                    {formatNumber(toolResult.totalWater_liters)}{" "}
                                    <span className="text-lg font-normal">
                                      L
                                    </span>
                                  </div>
                                )}

                                {tool === "density" && (
                                  <div className="text-3xl font-bold">
                                    {formatNumber(toolResult.plants)}{" "}
                                    <span className="text-lg font-normal">
                                      plants
                                    </span>
                                  </div>
                                )}

                                {tool === "yield" && (
                                  <div className="text-3xl font-bold">
                                    {formatNumber(toolResult.yield)}{" "}
                                    <span className="text-lg font-normal">
                                      kg
                                    </span>
                                  </div>
                                )}

                                {tool === "cost" && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-2">
                                      <span className="opacity-70">
                                        {t("profit_label")}
                                      </span>
                                      <span
                                        className={`text-2xl font-bold ${
                                          toolResult.profit >= 0
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-red-500"
                                        }`}
                                      >
                                        ₹{formatNumber(toolResult.profit)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="opacity-70">
                                        {t("revenue_label")}
                                      </span>
                                      <span className="font-semibold">
                                        ₹{formatNumber(toolResult.revenue)}
                                      </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="opacity-70">
                                        {t("cost_label")}
                                      </span>
                                      <span className="font-semibold text-red-500">
                                        -₹{formatNumber(toolResult.totalCost)}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="h-4" /> {/* Safe Area Spacer */}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
