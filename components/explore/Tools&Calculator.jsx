"use client";
import { FaTools, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/Context/languagecontext";
import { useRef, useEffect } from "react";

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
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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

  // ✅ API endpoints
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
      const res = await fetch(endpointMap[tool], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) setToolResult({ error: data.error || t("server_error") });
      else setToolResult(data);
    } catch {
      setToolResult({ error: t("server_error") });
    }
    setLoadingTool(false);
  };

  // ✅ Close animation (slide up)
  const handleCloseForm = () => {
    if (formRef.current) {
      const anim = formRef.current.animate(
        [
          { opacity: 1, transform: "translateY(0)" },
          { opacity: 0, transform: "translateY(-60px)" },
        ],
        { duration: 400, easing: "ease-in-out" }
      );
      anim.onfinish = () => {
        setTool(null);
        setToolResult(null);
        setErrors({});
      };
    } else {
      setTool(null);
      setToolResult(null);
      setErrors({});
    }
  };

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
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-green-800 mb-4 flex gap-2 items-center">
        <FaTools className="text-green-600"/> {t("tools_section_title")}
      </h2>

      {/* 🌾 Tool Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {Object.keys(endpointMap).map((tKey) => (
          <button
            key={tKey}
            onClick={() => {
              setTool(tKey);
              setToolResult(null);
              setErrors({});
            }}
            className={`w-full sm:w-auto px-4 py-2 rounded-xl font-semibold shadow-sm transition-colors ${
              tool === tKey
                ? "bg-green-600 text-white"
                : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-600"
            }`}
          >
            {toolLabels[tKey]}
          </button>
        ))}
      </div>

      {/* 🌱 Tool Form */}
      <AnimatePresence>
        {tool && (
          <motion.div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/40"
              onClick={handleCloseForm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Modal Box */}
            <motion.div
              ref={formRef}
              className="relative z-10 max-w-xl w-full bg-white dark:bg-[#272727] rounded-2xl border border-green-300 shadow-xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
              initial={{ y: -40, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -40, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            >
              {/* ❌ Close Button */}
              <button
                onClick={handleCloseForm}
                className="absolute top-3 right-3 text-green-700 hover:text-red-600 transition-colors"
              >
                <FaTimes size={20} />
              </button>

              {/* Title */}
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                {toolLabels[tool]}
              </h3>

              <div className="flex flex-col gap-4">
                {/* Crop Select */}
                <div className="flex flex-col">
                  <Label text={t("select_crop")} fieldKey="selectedToolCrop" />
                  <select
                    className={`p-3 border rounded-xl shadow-sm focus:ring-2 text-green-700 focus:ring-green-400 ${
                      errors.selectedToolCrop ? "border-red-500" : "border-green-300"
                    }`}
                    value={selectedToolCrop}
                    onChange={(e) => setSelectedToolCrop(e.target.value)}
                  >
                    <option value="">{t("select_crop")}</option>
                    {uniqueCrops.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Area Input */}
                <div className="flex flex-col">
                  <Label text={t("area_label")} fieldKey="areaInput" />
                  <input
                    className={`p-3 border rounded-xl shadow-sm focus:ring-2 text-farm-700 focus:ring-green-400 ${
                      errors.areaInput ? "border-red-500" : "border-green-300"
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
                  <div className="grid grid-cols-3 gap-4">
                    {["N", "P", "K"].map((el) => (
                      <div key={el} className="flex flex-col">
                        <Label text={t("soil_label").replace("{value}", el)} fieldKey={`soil${el}`} />
                        <input
                          className={`p-3 border rounded-xl shadow-sm focus:ring-2 text-farm-700 focus:ring-green-400 ${
                            errors[`soil${el}`] ? "border-red-500" : "border-green-300"
                          }`}
                          placeholder={`Enter ${el}`}
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
                  <div className="flex flex-col">
                    <Label text={t("market_price_label")} fieldKey="marketPrice" />
                    <input
                      className={`p-3 border rounded-xl shadow-sm focus:ring-2 text-farm-700 focus:ring-green-400 ${
                        errors.marketPrice ? "border-red-500" : "border-green-300"
                      }`}
                      placeholder={t("enter_market_price")}
                      value={marketPrice}
                      onChange={(e) => setMarketPrice(e.target.value)}
                    />
                  </div>
                )}

                {/* Calculate Button */}
                <button
                  onClick={handleToolSubmit}
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3 rounded-xl font-semibold shadow-md flex justify-center items-center gap-2 transition-all mt-2"
                >
                  {loadingTool && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  <span>{t("calculate_button")}</span>
                </button>
              </div>

              {/* 🌾 Results */}
              {toolResult && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-green-900 bg-green-50 rounded-xl p-4 shadow dark:bg-[#272727]">
                  {toolResult.error && (
                    <p className="text-red-600 font-semibold">{toolResult.error}</p>
                  )}

                  {tool === "seed" && (
                    <p className="font-semibold">
                      {t("seed_required_label")} {formatNumber(toolResult.seedRequiredKg)} kg
                    </p>
                  )}

                  {tool === "fertilizer" && (
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">{t("fertilizer_requirement_label")}</p>
                      <p>N: {formatNumber(toolResult.fertilizer?.N)} kg</p>
                      <p>P: {formatNumber(toolResult.fertilizer?.P)} kg</p>
                      <p>K: {formatNumber(toolResult.fertilizer?.K)} kg</p>
                    </div>
                  )}

                  {tool === "water" && (
                    <p>{t("total_water_label")} {formatNumber(toolResult.totalWater_liters)} liters</p>
                  )}

                  {tool === "density" && (
                    <p>{t("total_plants_label")} {formatNumber(toolResult.plants)}</p>
                  )}

                  {tool === "yield" && (
                    <p>{t("estimated_yield_label")} {formatNumber(toolResult.yield)} kg</p>
                  )}

                  {tool === "cost" && (
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold">{t("cost_profit_label")}</p>
                      <p className={toolResult.profit >= 0 ? "text-green-700" : "text-red-600"}>
                        {t("profit_label")} ₹{formatNumber(toolResult.profit)}
                      </p>
                      <p>{t("revenue_label")} ₹{formatNumber(toolResult.revenue)}</p>
                      <p>{t("cost_label")} ₹{formatNumber(toolResult.totalCost)}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
