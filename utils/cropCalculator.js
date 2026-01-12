/**
 * Centralized Crop Calculation Engine
 *
 * This module calculates all derived crop data from minimal user inputs:
 * - crop_type, variety, planting_date, area_acres, soil_type, coordinates, field_name
 *
 * All other fields are auto-calculated using CROP_DATABASE and business logic.
 */

import { CROP_DATABASE } from "@/data/CROP_DATABASE";

const priceLookup = {
  Cereal: 22,
  Millet: 18,
  Pulse: 30,
  Fruit: 34,
  Vegetable: 28,
  Oilseed: 32,
};

/**
 * Find crop info from CROP_DATABASE
 */
export function findCropInfo(cropName) {
  if (!cropName) return null;
  const db = Array.isArray(CROP_DATABASE)
    ? CROP_DATABASE
    : Object.values(CROP_DATABASE);
  return db.find((crop) => crop.name === cropName) || null;
}

/**
 * Add days to a date string
 */
function addDays(dateString, days) {
  if (!dateString) return null;
  const base = new Date(dateString);
  if (Number.isNaN(base.getTime())) return null;
  base.setDate(base.getDate() + days);
  return base.toISOString().split("T")[0];
}

/**
 * Clamp value between min and max
 */
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculate growth stage based on planting date
 */
export function calculateGrowthStage(plantingDate, cropInfo) {
  if (!plantingDate || !cropInfo) {
    return { stage: "Unknown", progress: 0 };
  }

  const planted = new Date(plantingDate);
  const now = new Date();
  const daysSincePlanting = Math.floor((now - planted) / (1000 * 60 * 60 * 24));

  if (daysSincePlanting < 0) {
    return { stage: "Not Planted", progress: 0 };
  }

  const totalDays = cropInfo.growthDays || 100;
  const stages = cropInfo.stages || [
    "Sowing",
    "Germination",
    "Vegetative",
    "Flowering",
    "Harvest",
  ];

  const progress = Math.min(daysSincePlanting / totalDays, 1);
  const stageIndex = Math.floor(progress * stages.length);
  const stage = stages[Math.min(stageIndex, stages.length - 1)];

  return {
    stage,
    progress: Math.min(progress * 100, 100).toFixed(1),
    daysSincePlanting,
    totalDays,
  };
}

/**
 * Calculate irrigation requirements
 * Enhanced with weather-based adjustments
 */
export function calculateIrrigation(
  cropInfo,
  areaAcres,
  soilType,
  weatherData = null
) {
  const wateringMin = cropInfo?.watering?.min ?? 350;
  const wateringMax = cropInfo?.watering?.max ?? 600;

  // Base moisture thresholds based on crop water needs
  let moistureThresholdMin = clamp(Math.round(30 + wateringMin / 18), 25, 70);
  let moistureThresholdMax = clamp(
    Math.round(moistureThresholdMin + 15 + wateringMax / 40),
    moistureThresholdMin + 5,
    90
  );

  // Weather-based adjustments
  let irrigationFrequencyDays = Math.max(
    2,
    Math.round((wateringMax - wateringMin) / 120) + 2
  );
  let defaultWaterAmountLiters = Math.round(areaAcres * wateringMin * 8);
  let weatherAdjustments = {
    rainfallReduction: 0,
    temperatureAdjustment: 0,
    humidityAdjustment: 0,
  };

  if (weatherData) {
    const { temperature, humidity, forecast } = weatherData;

    // Calculate average rain chance for next 7 days
    const avgRainChance =
      forecast && forecast.length > 0
        ? forecast
            .slice(0, 7)
            .reduce((sum, day) => sum + (day.rainChance || 0), 0) /
          Math.min(forecast.length, 7)
        : 0;

    // Adjust irrigation frequency based on rainfall forecast
    if (avgRainChance > 60) {
      // High rain chance - reduce irrigation frequency
      irrigationFrequencyDays = Math.max(3, irrigationFrequencyDays + 2);
      weatherAdjustments.rainfallReduction = -15; // Reduce water amount by 15%
    } else if (avgRainChance > 40) {
      // Moderate rain chance - slight reduction
      irrigationFrequencyDays = Math.max(2, irrigationFrequencyDays + 1);
      weatherAdjustments.rainfallReduction = -8;
    } else if (avgRainChance < 20 && temperature > 30) {
      // Low rain + high temp - increase irrigation
      irrigationFrequencyDays = Math.max(2, irrigationFrequencyDays - 1);
      weatherAdjustments.rainfallReduction = 20; // Increase water amount by 20%
    }

    // Temperature-based adjustments
    if (temperature > 35) {
      // Very hot - increase water needs
      defaultWaterAmountLiters = Math.round(defaultWaterAmountLiters * 1.15);
      moistureThresholdMin = Math.max(25, moistureThresholdMin - 5);
      weatherAdjustments.temperatureAdjustment = 15;
    } else if (temperature < 20) {
      // Cool weather - reduce water needs
      defaultWaterAmountLiters = Math.round(defaultWaterAmountLiters * 0.9);
      weatherAdjustments.temperatureAdjustment = -10;
    }

    // Humidity-based adjustments
    if (humidity < 40) {
      // Low humidity - increase irrigation
      defaultWaterAmountLiters = Math.round(defaultWaterAmountLiters * 1.1);
      moistureThresholdMin = Math.max(25, moistureThresholdMin - 3);
      weatherAdjustments.humidityAdjustment = 10;
    } else if (humidity > 80) {
      // High humidity - reduce irrigation
      defaultWaterAmountLiters = Math.round(defaultWaterAmountLiters * 0.95);
      weatherAdjustments.humidityAdjustment = -5;
    }
  }

  // Irrigation method based on area and water needs
  let irrigationMethod;
  if (areaAcres > 3) {
    irrigationMethod = "Sprinkler System";
  } else if (wateringMax > 900) {
    irrigationMethod = "Flood Irrigation";
  } else {
    irrigationMethod = "Drip Irrigation";
  }

  // Preferred time based on water needs and temperature
  let preferredIrrigationTime;
  if (weatherData && weatherData.temperature > 30) {
    // Hot weather - irrigate early morning
    preferredIrrigationTime = "05:30";
  } else if (wateringMax > 800) {
    preferredIrrigationTime = "05:30";
  } else {
    preferredIrrigationTime = "18:30";
  }

  // Water source based on area
  let waterSource;
  if (areaAcres > 5) {
    waterSource = "Canal";
  } else if (areaAcres > 2) {
    waterSource = "Tube Well";
  } else {
    waterSource = "Rainwater Harvesting";
  }

  return {
    irrigationMethod,
    waterSource,
    moistureThresholdMin,
    moistureThresholdMax,
    irrigationFrequencyDays,
    preferredIrrigationTime,
    defaultWaterAmountLiters,
    weatherAdjustments,
  };
}

/**
 * Calculate pest control schedule
 * Enhanced with weather-based risk assessment
 */
export function calculatePestControl(
  cropInfo,
  plantingDate,
  expectedYieldKg,
  weatherData = null
) {
  // Pest risk based on number of pests in database
  const pestList = cropInfo?.pests
    ? cropInfo.pests.split(",").map((p) => p.trim())
    : [];
  let pestRiskLevel =
    pestList.length > 2 ? "high" : pestList.length > 1 ? "medium" : "low";

  // Weather-based pest risk adjustments
  let weatherRiskFactors = [];

  if (weatherData) {
    const { temperature, humidity, forecast } = weatherData;

    // High humidity increases fungal disease risk
    if (humidity > 75) {
      if (pestRiskLevel === "low") pestRiskLevel = "medium";
      else if (pestRiskLevel === "medium") pestRiskLevel = "high";
      weatherRiskFactors.push("High humidity increases disease risk");
    }

    // High temperature + high humidity = ideal pest conditions
    if (temperature > 28 && humidity > 70) {
      if (pestRiskLevel !== "high") pestRiskLevel = "high";
      weatherRiskFactors.push("Warm and humid conditions favor pest activity");
    }

    // Check forecast for extended wet periods
    if (forecast && forecast.length > 0) {
      const highRainDays = forecast
        .slice(0, 7)
        .filter((day) => (day.rainChance || 0) > 60).length;
      if (highRainDays >= 3) {
        weatherRiskFactors.push(
          `${highRainDays} days of high rain forecast - monitor for water-related diseases`
        );
      }
    }

    // Cool and wet conditions favor certain diseases
    if (temperature < 22 && humidity > 70) {
      weatherRiskFactors.push(
        "Cool and wet conditions - watch for fungal diseases"
      );
    }
  }

  // Scouting frequency based on yield and weather risk
  let scoutingFrequencyDays = expectedYieldKg > 2000 ? 5 : 7;
  if (pestRiskLevel === "high") {
    scoutingFrequencyDays = Math.max(3, scoutingFrequencyDays - 2);
  } else if (pestRiskLevel === "medium") {
    scoutingFrequencyDays = Math.max(4, scoutingFrequencyDays - 1);
  }

  // First inspection 14 days after planting
  const lastPestInspection = addDays(plantingDate, 14);

  return {
    pestRiskLevel,
    scoutingFrequencyDays,
    lastPestInspection,
    knownPests: pestList,
    weatherRiskFactors,
  };
}

/**
 * Calculate fertilization schedule
 */
export function calculateFertilization(cropInfo, plantingDate) {
  // First fertilization typically 25 days after planting
  const nextFertilizationDate = addDays(plantingDate, 25);

  // Extract NPK ratios if available
  const npk = {
    nitrogen: cropInfo?.n_ratio_kg_per_acre ?? null,
    phosphorus: cropInfo?.p_ratio_kg_per_acre ?? null,
    potassium: cropInfo?.k_ratio_kg_per_acre ?? null,
  };

  return {
    nextFertilizationDate,
    npk,
    fertilizer: cropInfo?.fertilizer || "NPK as per soil test",
  };
}

/**
 * Calculate yield and pricing
 */
export function calculateYieldAndPricing(cropInfo, areaAcres) {
  const expectedYieldKg = Math.round(
    areaAcres * (cropInfo?.avg_yield_kg_per_acre ?? 1350)
  );
  const expectedPricePerKg = priceLookup[cropInfo?.category] ?? 24;
  const estimatedCostPerAcre = Math.round(9000 + areaAcres * 350);

  return {
    expectedYieldKg,
    expectedPricePerKg,
    estimatedCostPerAcre,
    estimatedRevenue: Math.round(expectedYieldKg * expectedPricePerKg),
    estimatedProfit: Math.round(
      expectedYieldKg * expectedPricePerKg - estimatedCostPerAcre * areaAcres
    ),
  };
}

/**
 * Calculate harvest window
 */
export function calculateHarvestWindow(plantingDate, cropInfo) {
  const growthDays = cropInfo?.growthDays ?? 110;
  const expectedHarvest = addDays(plantingDate, growthDays);
  const harvestWindowStart = expectedHarvest
    ? addDays(expectedHarvest, -5)
    : null;
  const harvestWindowEnd = expectedHarvest ? addDays(expectedHarvest, 5) : null;

  return {
    expectedHarvest,
    harvestWindowStart,
    harvestWindowEnd,
  };
}

/**
 * Main calculation function - computes all derived fields from minimal input
 * Enhanced with optional weather data for smarter calculations
 *
 * @param {Object} input - Minimal user input
 * @param {string} input.crop_type - Crop name
 * @param {string} [input.variety] - Optional variety
 * @param {string} input.planting_date - ISO date string
 * @param {number} input.area_acres - Area in acres
 * @param {string} input.soil_type - Soil type
 * @param {Object} [input.coordinates] - {lat, lng}
 * @param {string} input.field_name - Field name
 * @param {string} [input.location] - Optional location text
 * @param {Object} [input.weatherData] - Optional weather data from API
 *
 * @returns {Object} Complete crop data with all calculated fields
 */
export function calculateCropData(input) {
  const {
    crop_type,
    variety = null,
    planting_date,
    area_acres,
    soil_type,
    coordinates = null,
    field_name,
    location = null,
    weatherData = null, // Optional weather data
  } = input;

  // Validate required fields
  if (!crop_type || !planting_date || !area_acres || !field_name) {
    throw new Error(
      "Missing required fields: crop_type, planting_date, area_acres, field_name"
    );
  }

  // Find crop info from database
  const cropInfo = findCropInfo(crop_type);
  if (!cropInfo) {
    throw new Error(`Crop not found in database: ${crop_type}`);
  }

  // Calculate all derived data (with weather enhancements if available)
  const growthStage = calculateGrowthStage(planting_date, cropInfo);
  const irrigation = calculateIrrigation(
    cropInfo,
    area_acres,
    soil_type,
    weatherData
  );
  const yieldData = calculateYieldAndPricing(cropInfo, area_acres);
  const harvestWindow = calculateHarvestWindow(planting_date, cropInfo);
  const pestControl = calculatePestControl(
    cropInfo,
    planting_date,
    yieldData.expectedYieldKg,
    weatherData
  );
  const fertilization = calculateFertilization(cropInfo, planting_date);

  // Default soil type if not provided
  const finalSoilType =
    soil_type || cropInfo.soilType || "Well-drained loamy soil";

  // Build complete crop data object
  return {
    // User inputs (minimal)
    crop_type,
    variety,
    planting_date,
    area_acres: Number(area_acres),
    soil_type: finalSoilType,
    coordinates,
    field_name,
    location,

    // Calculated fields
    expected_harvest: harvestWindow.expectedHarvest,
    harvest_window_start: harvestWindow.harvestWindowStart,
    harvest_window_end: harvestWindow.harvestWindowEnd,

    // Growth stage (calculated dynamically, stored for reference)
    growth_stage: growthStage,

    // Crop info from database (stored for quick access)
    crop_info: {
      name: cropInfo.name,
      icon: cropInfo.icon,
      category: cropInfo.category,
      growthDays: cropInfo.growthDays,
      description: cropInfo.description,
      sunlight: cropInfo.sunlight,
      pests: cropInfo.pests,
      stages: cropInfo.stages || [
        "Sowing",
        "Germination",
        "Vegetative",
        "Flowering",
        "Harvest",
      ],
    },

    // Irrigation (all calculated)
    irrigation_method: irrigation.irrigationMethod,
    water_source: irrigation.waterSource,
    moisture_threshold_min: irrigation.moistureThresholdMin,
    moisture_threshold_max: irrigation.moistureThresholdMax,
    irrigation_frequency_days: irrigation.irrigationFrequencyDays,
    preferred_irrigation_time: irrigation.preferredIrrigationTime,
    default_water_amount_liters: irrigation.defaultWaterAmountLiters,
    weather_adjustments: irrigation.weatherAdjustments || {},

    // Yield and pricing (calculated)
    expected_yield_kg: yieldData.expectedYieldKg,
    expected_price_per_kg: yieldData.expectedPricePerKg,
    estimated_cost_per_acre: yieldData.estimatedCostPerAcre,
    estimated_revenue: yieldData.estimatedRevenue,
    estimated_profit: yieldData.estimatedProfit,

    // Pest control (calculated, weather-enhanced)
    pest_risk_level: pestControl.pestRiskLevel,
    scouting_frequency_days: pestControl.scoutingFrequencyDays,
    last_pest_inspection: pestControl.lastPestInspection,
    known_pests: pestControl.knownPests,
    weather_risk_factors: pestControl.weatherRiskFactors || [],

    // Fertilization (calculated)
    next_fertilization_date: fertilization.nextFertilizationDate,
    npk_requirements: fertilization.npk,
    fertilizer_recommendation: fertilization.fertilizer,
  };
}

/**
 * Recalculate growth stage for existing crop (call this periodically)
 */
export function recalculateGrowthStage(crop) {
  if (!crop.planting_date || !crop.crop_info) {
    return crop.growth_stage || { stage: "Unknown", progress: 0 };
  }

  const cropInfo = crop.crop_info;
  return calculateGrowthStage(crop.planting_date, cropInfo);
}
