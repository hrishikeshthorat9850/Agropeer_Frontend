"use client";
import React from "react";
import { useLanguage } from "@/Context/languagecontext";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "mr", label: "मराठी" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "ta", label: "தமிழ்" },
  { code: "te", label: "తెలుగు" },
  { code: "bho", label: "भोजपुरी" },
];

export default function LanguageSelector({ className }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={className}>
      <label htmlFor="site-language" className="sr-only">Select Language</label>
      <select
        id="site-language"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="px-2 py-1 rounded border"
        aria-label="Site language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
