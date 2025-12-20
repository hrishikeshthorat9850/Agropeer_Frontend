"use client";
import { useState, useEffect } from "react";
import { FaLanguage } from "react-icons/fa";

export default function AILanguageSelector({ languages, handleLanguageChange, defaultLanguage }) {
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);

  // Set default language on mount
  useEffect(() => {
    if (defaultLanguage) {
      const found = languages.find((l) => l.code === defaultLanguage);
      if (found) setSelectedLang(found);
    }
  }, [defaultLanguage, languages]);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-white/10 px-2 py-0.5 rounded-lg text-sm flex items-center gap-2"
      >
        <FaLanguage className="text-white/90 h-8 w-8" />
        {selectedLang ? selectedLang.label : ""}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 bg-emerald-600 text-white shadow-lg rounded-lg p-2 w-36 z-[10000]">
          {languages.map((l) => (
            <button
              key={l.code}
              className="w-full text-left px-2 py-1 hover:bg-white/10 rounded"
              onClick={() => {
                handleLanguageChange(l.code);
                setSelectedLang(l);
                setOpen(false);
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
