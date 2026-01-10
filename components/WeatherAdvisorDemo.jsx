"use client";
import WeatherAdvisor from "./WeatherAdvisor";
import { useLanguage } from "@/Context/languagecontext";

const WeatherAdvisorDemo = () => {
  const { t } = useLanguage();

  // Sample data for demonstration
  const sampleWeather = {
    temperature: 24,
    humidity: 65,
    rainChance: 30,
    windSpeed: 12,
    forecast: [
      { day: t("day_today"), temp: 24, condition: "sunny", icon: "Sun", rainChance: 20 },
      { day: t("day_tomorrow"), temp: 22, condition: "cloudy", icon: "Cloud", rainChance: 40 },
      { day: "Day 3", temp: 18, condition: "rainy", icon: "CloudRain", rainChance: 80 }
    ]
  };

  const sampleSuggestions = [
    { text: t("sample_suggestion_rain"), icon: "CloudRain", type: "warning" },
    { text: t("sample_suggestion_growth"), icon: "Sun", type: "success" },
    { text: t("sample_suggestion_wind"), icon: "Wind", type: "info" },
    { text: t("sample_suggestion_humidity"), icon: "Droplets", type: "success" },
    { text: t("sample_suggestion_moisture"), icon: "Gauge", type: "info" },
    { text: t("sample_suggestion_fertilizer"), icon: "Sprout", type: "success" }
  ];

  return (
    <div className="min-h-[calc(100vh-122px)] bg-farm-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-farm-900 mb-4">
            {t("demo_title")}
          </h1>
          <p className="text-lg text-farm-700">
            {t("demo_subtitle")}
          </p>
        </div>

        {/* Demo with Sample Data */}
        <WeatherAdvisor
          cropName="Wheat"
          cropStage="Growth Stage"
          weather={sampleWeather}
          suggestions={sampleSuggestions}
        />

        {/* Demo with No Data (Fallback) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-farm-900 mb-6 text-center">
            {t("demo_fallback_title")}
          </h2>
          <WeatherAdvisor />
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvisorDemo;
