"use client";
import React, { useEffect, useState } from "react";
import { useLanguage } from "@/Context/languagecontext";

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);
  const [justBack, setJustBack] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const goOffline = () => {
      setOffline(true);
      setJustBack(false);
    };
    const goOnline = () => {
      setOffline(false);
      setJustBack(true);
      setTimeout(() => setJustBack(false), 2500);
    };

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    // initial
    if (!navigator.onLine) setOffline(true);

    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
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
