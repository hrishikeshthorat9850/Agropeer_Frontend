"use client";
import { useState, useEffect } from "react";

export default function useGeolocation(options = {}) {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Correct condition
    if (!("geolocation" in navigator)) {
      setError(new Error("Geolocation is not supported in your browser"));
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        ...options, // ✅ Keep spreading user options last
      }
    );
  }, []); // ✅ Runs only once when mounted

  return { position, error, loading };
}
