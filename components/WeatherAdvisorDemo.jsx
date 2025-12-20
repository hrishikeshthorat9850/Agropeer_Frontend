"use client";
import WeatherAdvisor from "./WeatherAdvisor";

const WeatherAdvisorDemo = () => {
  // Sample data for demonstration
  const sampleWeather = {
    temperature: 24,
    humidity: 65,
    rainChance: 30,
    windSpeed: 12,
    forecast: [
      { day: "Today", temp: 24, condition: "sunny", icon: "Sun", rainChance: 20 },
      { day: "Tomorrow", temp: 22, condition: "cloudy", icon: "Cloud", rainChance: 40 },
      { day: "Day 3", temp: 18, condition: "rainy", icon: "CloudRain", rainChance: 80 }
    ]
  };

  const sampleSuggestions = [
    { text: "Rain expected tomorrow — delay irrigation", icon: "CloudRain", type: "warning" },
    { text: "Optimal temperature for wheat growth", icon: "Sun", type: "success" },
    { text: "Consider wind protection for young plants", icon: "Wind", type: "info" },
    { text: "Humidity levels are ideal for your crop", icon: "Droplets", type: "success" },
    { text: "Monitor soil moisture closely", icon: "Gauge", type: "info" },
    { text: "Perfect conditions for fertilizer application", icon: "Sprout", type: "success" }
  ];

  return (
    <div className="min-h-[calc(100vh-122px)] bg-farm-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-farm-900 mb-4">
            Weather Advisor Demo
          </h1>
          <p className="text-lg text-farm-700">
            Modern weather advisory component for farming applications
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
            Fallback State (No Data)
          </h2>
          <WeatherAdvisor />
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvisorDemo;
