"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/Context/languagecontext";

import { Network } from "@capacitor/network";
import { Capacitor } from "@capacitor/core";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);
  const [justBack, setJustBack] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    // Handler for status changes
    const handleStatusChange = (status) => {
      const isConnected = status.connected;
      if (!isConnected) {
        setOffline(true);
        setJustBack(false);
      } else {
        // If we were offline, show "Back Online"
        setOffline((prev) => {
          if (prev) {
            setJustBack(true);
            setTimeout(() => setJustBack(false), 2500);
          }
          return false;
        });
      }
    };

    // Initialize
    const initNetwork = async () => {
      if (Capacitor.isNativePlatform()) {
        const status = await Network.getStatus();
        handleStatusChange(status);

        Network.addListener("networkStatusChange", handleStatusChange);
      } else {
        // Web Fallback
        window.addEventListener("offline", () =>
          handleStatusChange({ connected: false }),
        );
        window.addEventListener("online", () =>
          handleStatusChange({ connected: true }),
        );
        handleStatusChange({ connected: navigator.onLine });
      }
    };

    initNetwork();

    return () => {
      if (Capacitor.isNativePlatform()) {
        Network.removeAllListeners();
      } else {
        window.removeEventListener("offline", () => {});
        window.removeEventListener("online", () => {});
      }
    };
  }, []);

  if (offline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white text-center py-2 text-sm">
        {t("banner_offline")}
      </div>
    );
  }

  if (justBack) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-emerald-600 text-white text-center py-2 text-sm">
        {t("banner_online")}
      </div>
    );
  }

  return null;
}
