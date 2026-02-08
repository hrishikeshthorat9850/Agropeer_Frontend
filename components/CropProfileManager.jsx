"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "@/Context/logincontext";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSeedling,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSun,
  FaCheck,
  FaTimes,
  FaTint,
  FaChartLine,
  FaBug,
  FaClock,
  FaWater,
} from "react-icons/fa";
import { CROP_DATABASE } from "../data/CROP_DATABASE";
import Select from "react-select";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";
import { useLanguage } from "@/Context/languagecontext";
import BottomSelect from "./ui/BottomSelect";

const priceLookup = {
  Cereal: 22,
  Millet: 18,
  Pulse: 30,
  Fruit: 34,
  Vegetable: 28,
  Oilseed: 32,
};

const litersPerAcrePerMm = 4046.86;

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const addDays = (dateString, days) => {
  if (!dateString) return null;
  const base = new Date(dateString);
  if (Number.isNaN(base.getTime())) return null;
  base.setDate(base.getDate() + days);
  return base.toISOString().split("T")[0];
};

const formatDateForDisplay = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const findCropInfo = (cropName) => {
  if (!cropName) return null;
  return (
    Array.isArray(CROP_DATABASE) ? CROP_DATABASE : Object.values(CROP_DATABASE)
  ).find((crop) => crop.name === cropName);
};

const deriveAutoValues = (formState, cropInfoOverride) => {
  const cropInfo = cropInfoOverride || findCropInfo(formState.cropType);
  const areaAcres =
    parseFloat(formState.area) > 0 ? parseFloat(formState.area) : 1;
  const wateringMin = cropInfo?.watering?.min ?? 350;
  const wateringMax = cropInfo?.watering?.max ?? 600;

  const moistureThresholdMin =
    formState.moistureMin !== ""
      ? Number(formState.moistureMin)
      : clamp(Math.round(30 + wateringMin / 18), 25, 70);
  const moistureThresholdMax =
    formState.moistureMax !== ""
      ? Number(formState.moistureMax)
      : clamp(
          Math.round(moistureThresholdMin + 15 + wateringMax / 40),
          moistureThresholdMin + 5,
          90,
        );

  const irrigationFrequencyDays =
    formState.irrigationFrequency !== ""
      ? Number(formState.irrigationFrequency)
      : Math.max(2, Math.round((wateringMax - wateringMin) / 120) + 2);

  const irrigationMethod =
    formState.irrigationMethod ||
    (areaAcres > 3
      ? "Sprinkler System"
      : wateringMax > 900
      ? "Flood Irrigation"
      : "Drip Irrigation");

  const preferredIrrigationTime =
    formState.preferredIrrigationTime ||
    (wateringMax > 800 ? "05:30" : "18:30");

  const waterSource =
    formState.waterSource ||
    (areaAcres > 5
      ? "Canal"
      : areaAcres > 2
      ? "Tube Well"
      : "Rainwater Harvesting");

  const defaultWaterAmountLiters =
    formState.waterAmount !== ""
      ? Number(formState.waterAmount)
      : Math.round(areaAcres * wateringMin * 8);

  const soilType =
    formState.soilType || cropInfo?.soilType || "Well-drained loamy soil";

  const growthDays = cropInfo?.growthDays ?? 110;
  const expectedHarvest =
    formState.expectedHarvest || addDays(formState.plantingDate, growthDays);
  const harvestWindowStart =
    formState.harvestWindowStart ||
    (expectedHarvest ? addDays(expectedHarvest, -5) : null);
  const harvestWindowEnd =
    formState.harvestWindowEnd ||
    (expectedHarvest ? addDays(expectedHarvest, 5) : null);

  const expectedYieldKg =
    formState.expectedYield !== ""
      ? Number(formState.expectedYield)
      : Math.round(areaAcres * (cropInfo?.avg_yield_kg_per_acre ?? 1350));

  const expectedPricePerKg =
    formState.expectedPrice !== ""
      ? Number(formState.expectedPrice)
      : priceLookup[cropInfo?.category] ?? 24;

  const estimatedCostPerAcre =
    formState.costPerAcre !== ""
      ? Number(formState.costPerAcre)
      : Math.round(9000 + areaAcres * 350);

  const nextFertilizationDate =
    formState.nextFertilizationDate ||
    addDays(formState.plantingDate, 25) ||
    null;

  const scoutingFrequencyDays =
    formState.scoutingFrequency !== ""
      ? Number(formState.scoutingFrequency)
      : expectedYieldKg > 2000
      ? 5
      : 7;

  const pestRiskLevel =
    formState.pestRiskLevel ||
    (cropInfo?.pests && cropInfo.pests.split(",").length > 1
      ? "high"
      : "medium");

  const lastPestInspection =
    formState.lastPestInspection || addDays(formState.plantingDate, 14) || null;

  return {
    soilType,
    irrigationMethod,
    waterSource,
    moistureThresholdMin,
    moistureThresholdMax,
    irrigationFrequencyDays,
    preferredIrrigationTime,
    defaultWaterAmountLiters,
    expectedHarvest,
    harvestWindowStart,
    harvestWindowEnd,
    expectedYieldKg,
    expectedPricePerKg,
    estimatedCostPerAcre,
    nextFertilizationDate,
    scoutingFrequencyDays,
    pestRiskLevel,
    lastPestInspection,
  };
};

const defaultFormState = {
  fieldName: "",
  location: "",
  latitude: "",
  longitude: "",
  soilType: "",
  irrigationMethod: "",
  waterSource: "",
  moistureMin: "",
  moistureMax: "",
  irrigationFrequency: "",
  preferredIrrigationTime: "",
  waterAmount: "",
  cropType: "",
  variety: "",
  plantingDate: "",
  area: "",
  expectedYield: "",
  expectedPrice: "",
  costPerAcre: "",
  expectedHarvest: "",
  harvestWindowStart: "",
  harvestWindowEnd: "",
  nextFertilizationDate: "",
  scoutingFrequency: "",
  pestRiskLevel: "",
  lastPestInspection: "",
  notes: "",
};

const createInitialFormState = () => ({ ...defaultFormState });
const CropProfileManager = ({ onSelectCrop, selectedCrop }) => {
  const { user, accessToken } = useLogin();
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [crops, setCrops] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load crops for this user when component mounts or user changes
  useEffect(() => {
    if (!user?.id) return;

    async function fetchCrops() {
      const { data, error } = await supabase
        .from("farmer_crops")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch crops error:", error);
        return;
      }

      setCrops(data);
    }

    fetchCrops();
  }, [user]);

  const [formData, setFormData] = useState(() => createInitialFormState());
  const [calculatedData, setCalculatedData] = useState(null);
  const [calculating, setCalculating] = useState(false);
  const numberFormatter = useMemo(() => new Intl.NumberFormat("en-IN"), []);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Auto-calculate when required fields change
  useEffect(() => {
    if (
      !formData.cropType ||
      !formData.plantingDate ||
      !formData.area ||
      !formData.fieldName
    ) {
      setCalculatedData(null);
      return;
    }

    const timer = setTimeout(async () => {
      setCalculating(true);
      try {
        const response = await fetch(`${BASE_URL}/api/crops/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            crop_type: formData.cropType,
            variety: formData.variety || null,
            planting_date: formData.plantingDate,
            area_acres: Number(formData.area) || 1,
            soil_type: formData.soilType || null,
            coordinates:
              formData.latitude && formData.longitude
                ? {
                    lat: Number(formData.latitude),
                    lng: Number(formData.longitude),
                  }
                : null,
            field_name: formData.fieldName,
            location: formData.location || null,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setCalculatedData(result.data);
        }
      } catch (error) {
        console.error("Calculation error:", error);
      } finally {
        setCalculating(false);
      }
    }, 500); // Debounce 500ms

    return () => clearTimeout(timer);
  }, [
    formData.cropType,
    formData.plantingDate,
    formData.area,
    formData.fieldName,
    formData.variety,
    formData.soilType,
    formData.latitude,
    formData.longitude,
    formData.location,
  ]);

  // Use calculated data or fallback to derived values for display
  const displayData =
    calculatedData || (formData.cropType ? deriveAutoValues(formData) : {});

  const resetFormState = () => {
    setFormData(createInitialFormState());
    setEditingCrop(null);
    setShowAddForm(false);
  };

  const pickCropValue = (crop, ...keys) => {
    for (const key of keys) {
      if (crop && crop[key] !== undefined && crop[key] !== null) {
        return crop[key];
      }
    }
    return "";
  };

  const toInputValue = (value) => {
    if (value === null || value === undefined || value === "") return "";
    return String(value);
  };

  const formatDisplayValue = (value, fallback = "—") => {
    return value === null || value === undefined || value === ""
      ? fallback
      : value;
  };

  const pickNumberOrFallback = (value, fallback) => {
    if (value === null || value === undefined || value === "") return fallback;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : fallback;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateGrowthStage = (plantingDate, cropType) => {
    if (!plantingDate || !cropType) return { stage: "Unknown", progress: 0 };

    const planted = new Date(plantingDate);
    const now = new Date();
    const daysSincePlanting = Math.floor(
      (now - planted) / (1000 * 60 * 60 * 24),
    );

    const cropInfo = Array.isArray(CROP_DATABASE)
      ? CROP_DATABASE.find((c) => c.name === cropType)
      : Object.values(CROP_DATABASE).find((c) => c.name === cropType);

    if (!cropInfo) return { stage: "Unknown", progress: 0 };

    const totalDays = cropInfo.growthDays || 100;
    const stages = cropInfo.stages || [
      "Sowing",
      "Germination",
      "Vegetative",
      "Flowering",
      "Harvest",
    ];

    const progress = daysSincePlanting / totalDays;

    const stageIndex = Math.floor(progress * stages.length);
    const stage = stages[Math.min(stageIndex, stages.length - 1)];

    return {
      stage,
      progress: Math.min(progress * 100, 100).toFixed(1), // percent
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentUserId = user?.id;
    if (!currentUserId) {
      showToast("error", t("signin_to_add_error"));
      setLoading(false);
      return;
    }

    // Use calculated data if available, otherwise calculate on server
    try {
      const response = await fetch(`${BASE_URL}/api/crops`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user_id: currentUserId,
          crop_type: formData.cropType,
          variety: formData.variety || null,
          planting_date: formData.plantingDate,
          area_acres: Number(formData.area) || 1,
          soil_type: formData.soilType || null,
          coordinates:
            formData.latitude && formData.longitude
              ? {
                  lat: Number(formData.latitude),
                  lng: Number(formData.longitude),
                }
              : null,
          field_name: formData.fieldName,
          location: formData.location || null,
          notes: formData.notes || null,
          id: editingCrop?.id || null, // For updates
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save crop");
      }

      const result = await response.json();
      const savedRecord = result.data;

      // Update UI state
      if (editingCrop) {
        setCrops((prev) =>
          prev.map((c) => (c.id === savedRecord.id ? savedRecord : c)),
        );
      } else {
        setCrops((prev) => [savedRecord, ...prev]);
      }

      // Reset form
      resetFormState();
      showToast(
        "success",
        editingCrop ? t("crop_updated_success") : t("crop_saved_success"),
      );
    } catch (error) {
      console.error("Save error:", error);
      showToast(
        "error",
        error.message || "Failed to save crop. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (crop) => {
    setEditingCrop(crop);
    const coordinates = crop?.coordinates || null;
    setFormData({
      fieldName:
        pickCropValue(crop, "field_name", "fieldName", "location") || "",
      location: pickCropValue(crop, "location", "fieldLocation", "") || "",
      latitude:
        coordinates?.lat !== undefined ? toInputValue(coordinates.lat) : "",
      longitude:
        coordinates?.lng !== undefined ? toInputValue(coordinates.lng) : "",
      soilType: pickCropValue(crop, "soil_type", "soilType", ""),
      irrigationMethod: pickCropValue(
        crop,
        "irrigation_method",
        "irrigationMethod",
        "",
      ),
      waterSource: pickCropValue(crop, "water_source", "waterSource", ""),
      moistureMin: toInputValue(
        pickCropValue(crop, "moisture_threshold_min", "moistureMin", ""),
      ),
      moistureMax: toInputValue(
        pickCropValue(crop, "moisture_threshold_max", "moistureMax", ""),
      ),
      irrigationFrequency: toInputValue(
        pickCropValue(
          crop,
          "irrigation_frequency_days",
          "irrigationFrequency",
          "",
        ),
      ),
      preferredIrrigationTime: pickCropValue(
        crop,
        "preferred_irrigation_time",
        "preferredIrrigationTime",
        "",
      ),
      waterAmount: toInputValue(
        pickCropValue(crop, "default_water_amount_liters", "waterAmount", ""),
      ),
      cropType: pickCropValue(crop, "crop_type", "cropType", ""),
      variety: pickCropValue(crop, "variety", "cropVariety", ""),
      plantingDate: pickCropValue(crop, "planting_date", "plantingDate", ""),
      area: toInputValue(pickCropValue(crop, "area_acres", "area", "")),
      expectedYield: toInputValue(
        pickCropValue(crop, "expected_yield_kg", "expectedYield", ""),
      ),
      expectedPrice: toInputValue(
        pickCropValue(crop, "expected_price_per_kg", "expectedPrice", ""),
      ),
      costPerAcre: toInputValue(
        pickCropValue(crop, "estimated_cost_per_acre", "costPerAcre", ""),
      ),
      expectedHarvest: pickCropValue(
        crop,
        "expected_harvest",
        "expectedHarvest",
        "",
      ),
      harvestWindowStart: pickCropValue(
        crop,
        "harvest_window_start",
        "harvestWindowStart",
        "",
      ),
      harvestWindowEnd: pickCropValue(
        crop,
        "harvest_window_end",
        "harvestWindowEnd",
        "",
      ),
      nextFertilizationDate: pickCropValue(
        crop,
        "next_fertilization_date",
        "nextFertilizationDate",
        "",
      ),
      scoutingFrequency: toInputValue(
        pickCropValue(crop, "scouting_frequency_days", "scoutingFrequency", ""),
      ),
      pestRiskLevel: pickCropValue(
        crop,
        "pest_risk_level",
        "pestRiskLevel",
        "",
      ),
      lastPestInspection: pickCropValue(
        crop,
        "last_pest_inspection",
        "lastPestInspection",
        "",
      ),
      notes: pickCropValue(crop, "notes", "notes", ""),
    });
    setShowAddForm(true);
  };

  const handleDelete = async (cropId) => {
    if (!confirm(t("delete_confirm"))) return;

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/crops/${cropId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        showToast("error", "Failed to delete crop");
        return;
      }
      setCrops((prev) => prev.filter((crop) => crop.id !== cropId));
      showToast("success", t("delete_success"));
    } catch (e) {
      console.log("Error is :", e);
      showToast("error", "Failed to delete crop. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCropIcon = (cropType) => {
    const crop = Object.values(CROP_DATABASE).find((c) => c.name === cropType);
    return crop?.icon || "🌱";
  };

  const getCropName = (cropType) => {
    const crop = Object.values(CROP_DATABASE).find((c) => c.name === cropType);
    return crop?.name || cropType;
  };

  const cropOptions = Object.values(CROP_DATABASE)
    .filter(
      (crop, index, self) =>
        index === self.findIndex((c) => c.name === crop.name),
    )
    .map((crop) => ({
      value: crop.name,
      label: `${crop.icon} ${crop.name}`,
    }))
    .sort((a, b) => {
      const nameA = a.label.replace(/^[^\w]+/, "").toLowerCase();
      const nameB = b.label.replace(/^[^\w]+/, "").toLowerCase();
      return nameA.localeCompare(nameB);
    });

  const soilOptions = [
    { value: "Well-drained loamy soil", label: t("soil_well_drained") },
    { value: "Clay soil", label: t("soil_clay") },
    { value: "Sandy soil", label: t("soil_sandy") },
    { value: "Sandy loam", label: t("soil_sandy_loam") },
    { value: "Clay loam", label: t("soil_clay_loam") },
    { value: "Silt loam", label: t("soil_silt_loam") },
    { value: "Red soil", label: t("soil_red") },
    { value: "Black soil", label: t("soil_black") },
    { value: "Alluvial soil", label: t("soil_alluvial") },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      {/* Header - Minimalist App Style */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight">
          {t("my_crop_profiles")}
        </h2>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl text-sm md:text-base font-bold shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all transform hover:scale-[1.02] active:scale-[0.98] border border-white/10"
        >
          <FaPlus className="text-[14px]" />
          {t("add_crop_btn")}
        </motion.button>
      </div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8"
          >
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg dark:bg-[#1E1E1E] dark:border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-farm-900 dark:text-white">
                  {editingCrop ? t("edit_crop_title") : t("add_crop_title")}
                </h3>
                <button
                  onClick={resetFormState}
                  className="p-2 rounded-full hover:bg-farm-100 dark:hover:bg-white/10 transition-colors"
                >
                  <FaTimes className="w-5 h-5 text-farm-600 dark:text-gray-400" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="md:col-span-2 pt-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-farm-500 dark:text-emerald-400">
                    {t("essential_details")}
                  </p>
                  <p className="text-sm text-farm-600 dark:text-gray-400">
                    {t("essential_details_desc")}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-farm-700 dark:text-gray-300 mb-2">
                    {t("field_name_label")}
                  </label>
                  <input
                    type="text"
                    name="fieldName"
                    value={formData.fieldName}
                    onChange={handleInputChange}
                    placeholder={t("field_name_placeholder")}
                    required
                    className="w-full p-3 rounded-xl border text-farm-500 dark:text-gray-100 border-farm-200 dark:border-gray-700 bg-white dark:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-farm-400 dark:focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-farm-700 dark:text-gray-300 mb-2">
                    {t("field_location_label")}
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder={t("field_location_placeholder")}
                    className="w-full p-3 rounded-xl border text-farm-500 dark:text-gray-100 border-farm-200 dark:border-gray-700 bg-white dark:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-farm-400 dark:focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <BottomSelect
                    label={t("soil_type_label")}
                    value={formData.soilType}
                    onChange={(value) =>
                      handleInputChange({ target: { name: "soilType", value } })
                    }
                    options={soilOptions}
                    placeholder={t("select_soil_placeholder")}
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">
                    Latitude (optional)
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    step="0.0001"
                    placeholder="e.g., 19.7515"
                    className="w-full p-3 rounded-xl border text-farm-500 border-farm-200 focus:outline-none focus:ring-2 focus:ring-farm-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">
                    Longitude (optional)
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    step="0.0001"
                    placeholder="e.g., 75.7139"
                    className="w-full p-3 rounded-xl border text-farm-500 border-farm-200 focus:outline-none focus:ring-2 focus:ring-farm-400"
                  />
                </div> */}

                <div>
                  <label className="block text-sm font-semibold text-farm-700 dark:text-gray-300 mb-2">
                    {t("field_area_label")}
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder={t("area_placeholder")}
                    min="0.1"
                    step="0.1"
                    required
                    className="w-full p-3 rounded-xl border text-farm-500 dark:text-gray-100 border-farm-200 dark:border-gray-700 bg-white dark:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-farm-400 dark:focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-farm-700 dark:text-gray-300 mb-2">
                    {t("variety_label")}
                  </label>
                  <input
                    type="text"
                    name="variety"
                    value={formData.variety}
                    onChange={handleInputChange}
                    placeholder={t("variety_placeholder")}
                    className="w-full p-3 rounded-xl border text-farm-500 dark:text-gray-100 border-farm-200 dark:border-gray-700 bg-white dark:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-farm-400 dark:focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-farm-700 dark:text-gray-300 mb-2">
                    {t("crop_name_label")}
                  </label>
                  <Select
                    options={cropOptions}
                    value={cropOptions.find(
                      (option) => option.value === formData.cropType,
                    )}
                    onChange={(selectedOption) =>
                      setFormData((prev) => ({
                        ...prev,
                        cropType: selectedOption.value,
                      }))
                    }
                    placeholder={t("select_crop_placeholder")}
                    isSearchable={true}
                    required
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        backgroundColor: state.selectProps.isDark
                          ? "#1a1a1a"
                          : "white",
                        border: "1px solid",
                        borderColor: state.selectProps.isDark
                          ? "#3f3f46"
                          : "#e5e7eb",
                        boxShadow: state.isFocused
                          ? state.selectProps.isDark
                            ? "0 0 0 2px #22c55e55"
                            : "0 0 0 2px #16a34a"
                          : "none",
                        borderRadius: "0.75rem",
                        padding: "0.25rem 0.5rem",
                        minHeight: "48px",
                        color: state.selectProps.isDark ? "#e4e4e7" : "#14532d",
                      }),

                      menu: (base) => ({
                        ...base,
                        backgroundColor: "var(--rs-bg)",
                        borderRadius: "0.75rem",
                        overflow: "hidden",
                      }),

                      menuList: (base, state) => ({
                        ...base,
                        backgroundColor: state.selectProps.isDark
                          ? "#1a1a1a"
                          : "white",
                        padding: 0,
                      }),

                      singleValue: (base, state) => ({
                        ...base,
                        color: state.selectProps.isDark ? "#86efac" : "#15803d",
                        fontWeight: "500",
                      }),

                      placeholder: (base, state) => ({
                        ...base,
                        color: state.selectProps.isDark ? "#9ca3af" : "#9ca3af",
                      }),

                      option: (
                        base,
                        { isFocused, isSelected, selectProps },
                      ) => ({
                        ...base,
                        backgroundColor: isSelected
                          ? "#16a34a"
                          : isFocused
                          ? selectProps.isDark
                            ? "#262626"
                            : "#dcfce7"
                          : "transparent",
                        color: isSelected
                          ? "white"
                          : selectProps.isDark
                          ? "#d4d4d8"
                          : "#14532d",
                        cursor: "pointer",
                        padding: "10px 12px",
                      }),

                      dropdownIndicator: (base, state) => ({
                        ...base,
                        color: state.selectProps.isDark ? "#86efac" : "#16a34a",
                        ":hover": {
                          color: state.selectProps.isDark
                            ? "#4ade80"
                            : "#166534",
                        },
                      }),
                    }}
                    // Pass dark mode value to styles
                    isDark={
                      typeof window !== "undefined" &&
                      document.documentElement.classList.contains("dark")
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-farm-700 dark:text-gray-300 mb-2">
                    {t("planting_date_label")}
                  </label>
                  <input
                    type="date"
                    name="plantingDate"
                    value={formData.plantingDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 rounded-xl border text-farm-500 dark:text-gray-100 border-farm-200 dark:border-gray-700 bg-white dark:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-farm-400 dark:focus:ring-emerald-500/50"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-farm-700 dark:text-gray-300 mb-2">
                    {t("notes_label")}
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder={t("notes_placeholder")}
                    rows={3}
                    className="w-full p-3 rounded-xl border text-gray-500 dark:text-gray-100 border-farm-200 dark:border-gray-700 bg-white dark:bg-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-farm-400 dark:focus:ring-emerald-500/50 resize-none"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-farm-500 dark:text-emerald-400">
                        {t("auto_generated_blueprint")}
                      </p>
                      <p className="text-sm text-farm-600 dark:text-gray-400">
                        {t("blueprint_desc")}
                      </p>
                    </div>
                  </div>
                </div>

                {calculating && (
                  <div className="md:col-span-2 text-center py-4">
                    <p className="text-farm-600 dark:text-gray-400">
                      {t("calculating_data")}
                    </p>
                  </div>
                )}

                {calculatedData && !calculating && (
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        label: t("soil_type_label").replace("*", "").trim(),
                        value: calculatedData.soil_type || displayData.soilType,
                        icon: FaSeedling,
                      },
                      {
                        label: t("irrigation_method_label"),
                        value:
                          calculatedData.irrigation_method ||
                          displayData.irrigationMethod,
                        icon: FaTint,
                      },
                      {
                        label: t("moisture_range_label"),
                        value: `${
                          calculatedData.moisture_threshold_min ||
                          displayData.moistureThresholdMin
                        }% – ${
                          calculatedData.moisture_threshold_max ||
                          displayData.moistureThresholdMax
                        }%`,
                        icon: FaWater,
                      },
                      {
                        label: t("water_per_cycle"),
                        value: `${numberFormatter.format(
                          calculatedData.default_water_amount_liters ||
                            displayData.defaultWaterAmountLiters ||
                            0,
                        )} L`,
                        icon: FaSun,
                      },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="bg-white/60 dark:bg-[#2C2C2C] rounded-xl p-4 border border-white/20 dark:border-[#444] shadow-sm flex items-start gap-3"
                      >
                        <div className="p-2 rounded-lg bg-farm-100 dark:bg-emerald-900/30">
                          <Icon className="w-4 h-4 text-farm-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-farm-500 dark:text-gray-400">
                            {label}
                          </p>
                          <p className="text-base font-semibold text-farm-900 dark:text-white">
                            {formatDisplayValue(value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {calculatedData && !calculating && (
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: t("est_yield_label"),
                        value: `${numberFormatter.format(
                          calculatedData.expected_yield_kg ||
                            displayData.expectedYieldKg ||
                            0,
                        )} kg`,
                        icon: FaChartLine,
                      },
                      {
                        label: t("market_price_label"),
                        value:
                          calculatedData.expected_price_per_kg ||
                          displayData.expectedPricePerKg
                            ? `₹${numberFormatter.format(
                                calculatedData.expected_price_per_kg ||
                                  displayData.expectedPricePerKg,
                              )} / kg`
                            : "₹— / kg",
                        icon: FaSeedling,
                      },
                      {
                        label: t("est_cost_label"),
                        value: `₹${numberFormatter.format(
                          calculatedData.estimated_cost_per_acre ||
                            displayData.estimatedCostPerAcre ||
                            0,
                        )}`,
                        icon: FaSun,
                      },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="bg-white/60 dark:bg-[#1a1a1a] rounded-xl p-4 border border-white/20 shadow-sm flex items-start gap-3"
                      >
                        <div className="p-2 rounded-lg bg-farm-100">
                          <Icon className="w-4 h-4 text-farm-600" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-farm-500">
                            {label}
                          </p>
                          <p className="text-base font-semibold text-farm-900">
                            {formatDisplayValue(value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {calculatedData && !calculating && (
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: t("expected_harvest_label"),
                        value: formatDateForDisplay(
                          calculatedData.expected_harvest ||
                            displayData.expectedHarvest,
                        ),
                        icon: FaCalendarAlt,
                      },
                      {
                        label: t("fertilization_label"),
                        value: formatDateForDisplay(
                          calculatedData.next_fertilization_date ||
                            displayData.nextFertilizationDate,
                        ),
                        icon: FaClock,
                      },
                      {
                        label: t("scouting_cycle_label"),
                        value: `${formatDisplayValue(
                          calculatedData.scouting_frequency_days ||
                            displayData.scoutingFrequencyDays,
                        )} ${t("days")}`,
                        icon: FaBug,
                      },
                      {
                        label: t("pest_risk_label"),
                        value: (
                          calculatedData.pest_risk_level ||
                          displayData.pestRiskLevel ||
                          "medium"
                        ).toUpperCase(),
                        icon: FaBug,
                      },
                    ].map(({ label, value, icon: Icon }) => (
                      <div
                        key={label}
                        className="bg-white/60 dark:bg-[#1a1a1a] rounded-xl p-4 border border-white/20 shadow-sm flex items-start gap-3"
                      >
                        <div className="p-2 rounded-lg bg-farm-100">
                          <Icon className="w-4 h-4 text-farm-600" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-wider text-farm-500">
                            {label}
                          </p>
                          <p className="text-base font-semibold text-farm-900">
                            {formatDisplayValue(value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="md:col-span-2 flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={resetFormState}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-black bg-gray-50 hover:bg-gray-100 border border-gray-200 dark:text-gray-200 dark:bg-[#333] dark:hover:bg-[#444] dark:border-[#555]"
                  >
                    {t("cancel_btn")}
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-farm-500 to-farm-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  >
                    <FaCheck className="w-4 h-4" />
                    {editingCrop ? t("update_crop_btn") : t("add_crop_btn")}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {crops.map((crop, index) => {
          const cropTypeValue = pickCropValue(
            crop,
            "crop_type",
            "cropType",
            "",
          );
          const fieldName =
            pickCropValue(crop, "field_name", "fieldName", "") ||
            getCropName(cropTypeValue);
          const locationDisplay = pickCropValue(
            crop,
            "location",
            "fieldLocation",
            "No location set",
          );
          const areaDisplay = pickCropValue(crop, "area_acres", "area", "");
          const soilType = pickCropValue(crop, "soil_type", "soilType", "");
          const irrigationMethod = pickCropValue(
            crop,
            "irrigation_method",
            "irrigationMethod",
            "",
          );
          const moistureMin = pickCropValue(
            crop,
            "moisture_threshold_min",
            "moistureMin",
            "",
          );
          const moistureMax = pickCropValue(
            crop,
            "moisture_threshold_max",
            "moistureMax",
            "",
          );
          const expectedYield = pickCropValue(
            crop,
            "expected_yield_kg",
            "expectedYield",
            "",
          );
          const pestRisk = pickCropValue(
            crop,
            "pest_risk_level",
            "pestRiskLevel",
            "",
          );
          const nextFertilization = pickCropValue(
            crop,
            "next_fertilization_date",
            "nextFertilizationDate",
            "",
          );
          const plantingDate = pickCropValue(
            crop,
            "planting_date",
            "plantingDate",
            "",
          );

          return (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-5 border border-gray-100 dark:border-[#333] shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getCropIcon(cropTypeValue)}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                      {fieldName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {getCropName(cropTypeValue)}
                      {crop.variety ? ` • ${crop.variety}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(crop)}
                    className="p-2 rounded-lg bg-gray-50 dark:bg-[#333] hover:bg-gray-100 dark:hover:bg-[#444] transition-colors border border-gray-100 dark:border-[#444]"
                  >
                    <FaEdit className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => handleDelete(crop?.id)}
                    className="p-2 rounded-lg bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors border border-red-50 dark:border-red-900/20"
                  >
                    <FaTrash className="w-4 h-4 text-red-500 dark:text-red-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>
                    {t("planted_label")}{" "}
                    {plantingDate
                      ? new Date(plantingDate).toLocaleDateString()
                      : "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  <span>{formatDisplayValue(locationDisplay)}</span>
                </div>
                {areaDisplay && (
                  <div className="flex items-center gap-2">
                    <FaSun className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("area_label")} {formatDisplayValue(areaDisplay)} acres
                    </span>
                  </div>
                )}
                {soilType && (
                  <div className="flex items-center gap-2">
                    <FaSeedling className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("soil_label")} {soilType}
                    </span>
                  </div>
                )}
                {irrigationMethod && (
                  <div className="flex items-center gap-2">
                    <FaTint className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("irrigation_label")} {irrigationMethod}
                    </span>
                  </div>
                )}
                {(moistureMin || moistureMax) && (
                  <div className="flex items-center gap-2">
                    <FaWater className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("moisture_range_label_short")}{" "}
                      {formatDisplayValue(moistureMin)}% -{" "}
                      {formatDisplayValue(moistureMax)}%
                    </span>
                  </div>
                )}
                {expectedYield && (
                  <div className="flex items-center gap-2">
                    <FaChartLine className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("expected_yield_label_short")}{" "}
                      {formatDisplayValue(expectedYield)} kg
                    </span>
                  </div>
                )}
                {nextFertilization && (
                  <div className="flex items-center gap-2">
                    <FaClock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("next_fertilization_label")}{" "}
                      {new Date(nextFertilization).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {pestRisk && (
                  <div className="flex items-center gap-2">
                    <FaBug className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    <span>
                      {t("pest_risk_label_short")} {pestRisk}
                    </span>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (selectedCrop && selectedCrop.id === crop.id) {
                    onSelectCrop(null);
                  } else {
                    onSelectCrop(crop);
                  }
                }}
                className={`w-full mt-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCrop && selectedCrop.id === crop.id
                    ? "bg-gradient-to-r from-farm-500 to-farm-600 text-white shadow-lg"
                    : "bg-farm-100 text-farm-700 hover:bg-farm-200"
                }`}
              >
                {selectedCrop && selectedCrop.id === crop.id
                  ? t("selected_status")
                  : t("select_for_guidance")}
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {crops.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-farm-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSeedling className="w-12 h-12 text-farm-600" />
          </div>
          <h3 className="text-xl font-bold text-farm-900 dark:text-white mb-2">
            {t("no_crops_added_title")}
          </h3>
          <p className="text-farm-700 dark:text-gray-400 mb-6">
            {t("add_first_crop_desc")}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-farm-500 to-farm-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t("add_first_crop_btn")}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default CropProfileManager;
