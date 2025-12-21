"use client";
import { createContext, useState, useEffect, useContext } from "react";
const weatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getWeather = async (latitude, longitude) => {
    // Prevent multiple simultaneous calls
    if (loading) {
      return weather;
    }

    try {
      setLoading(true);
      setError(null);

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${BASE_URL}/api/get-weather`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ latitude, longitude }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || "Failed Fetch Weather";
        setError(errorMsg);
        throw new Error(errorMsg);
      }
      setWeather(data);
      return data;
    } catch (e) {
      setError(e.message);
      // Only log non-rate-limit errors to reduce console spam
      if (!e.message.includes("limit exceeded")) {
        console.error("Weather Context Error:", e.message);
      }
      throw e; // Re-throw so caller can handle
    } finally {
      setLoading(false);
    }
  };

  return (
    <weatherContext.Provider
      value={{ weather, loading, error, getWeather }}
    >
      {children}
    </weatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(weatherContext);
}

