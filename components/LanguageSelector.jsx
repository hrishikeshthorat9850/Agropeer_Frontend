"use client";
import React from "react";
import { useLanguage } from "@/Context/languagecontext";
import BottomSelect from "./ui/BottomSelect";

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
      <label htmlFor="site-language" className="sr-only">
        Select Language
      </label>
      <BottomSelect
        value={locale}
        onChange={setLocale}
        options={LANGUAGES.map((l) => ({ value: l.code, label: l.label }))}
        placeholder="Select Language"
        searchPlaceholder="Search Language"
      />
    </div>
  );
}
