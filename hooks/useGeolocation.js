"use client";
import { useState, useEffect } from "react";

export default function useGeolocation(options = {}) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Default fallback (New Delhi)
  const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.2090 };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError(new Error("Geolocation is not supported in your browser"));
      return;
    }

    setLoading(true);

    // 1. Try to get cached location first (instant load)
    const cached = localStorage.getItem("cached_position");
    if (cached) {
      try {
        setPosition(JSON.parse(cached));
      } catch (e) {
        console.error("Error parsing cached location", e);
      }
    }

    // 2. Try to get real location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = { latitude, longitude };

        setPosition(newPos);
        setLoading(false);

        // Cache success
        localStorage.setItem("cached_position", JSON.stringify(newPos));
      },
      (err) => {
        console.warn("Location error, using fallback:", err.message);
        setError(err);
        setLoading(false);

        // 3. On error, if no cache exists, use DEFAULT
        if (!localStorage.getItem("cached_position")) {
          setPosition(DEFAULT_LOCATION);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        ...options,
      }
    );
  }, []);

  return { position, error, loading };
}
