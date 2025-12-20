import { useCallback, useEffect, useRef, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { App } from "@capacitor/app";

export const LOCATION = {
  IDLE: "idle",
  LOADING: "loading",
  GRANTED: "granted",
  DENIED: "denied",
  GPS_OFF: "gps-off",
};

export function useLocation(onSuccess) {
  const [status, setStatus] = useState(LOCATION.IDLE);

  const cancelledRef = useRef(false);
  const wasGpsOffRef = useRef(false);
  const hasDetectedRef = useRef(false); // 🔒 prevent loop

  const detectLocation = useCallback(async () => {
    if (!Capacitor.isNativePlatform()) return;
    if (hasDetectedRef.current) return; // 🚫 already detected

    try {
      setStatus(LOCATION.LOADING);

      // 1️⃣ Permission check
      const perm = await Geolocation.checkPermissions();
      if (perm.location !== "granted") {
        const req = await Geolocation.requestPermissions();
        if (req.location !== "granted") {
          setStatus(LOCATION.DENIED);
          return;
        }
      }

      // 2️⃣ Get location
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      });

      if (!cancelledRef.current) {
        hasDetectedRef.current = true; // ✅ mark done
        wasGpsOffRef.current = false;
        setStatus(LOCATION.GRANTED);
        onSuccess(pos.coords.latitude, pos.coords.longitude);
      }
    } catch (err) {
      if (err?.code === 1) {
        setStatus(LOCATION.DENIED);
      } else {
        wasGpsOffRef.current = true;
        setStatus(LOCATION.GPS_OFF);
      }
    }
  }, [onSuccess]);

  // 🚀 Initial silent detect (ONCE)
  useEffect(() => {
    cancelledRef.current = false;
    detectLocation();

    return () => {
      cancelledRef.current = true;
    };
  }, [detectLocation]);

  // 🔁 Retry when app resumes (after settings)
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const sub = App.addListener("appStateChange", ({ isActive }) => {
      if (isActive && wasGpsOffRef.current) {
        hasDetectedRef.current = false; // 🔓 allow retry
        detectLocation();
      }
    });

    return () => {
      sub.remove();
    };
  }, [detectLocation]);

  // 🔘 Manual retry (button)
  const retry = useCallback(() => {
    hasDetectedRef.current = false;
    detectLocation();
  }, [detectLocation]);

  return {
    status,
    retry,
  };
}
