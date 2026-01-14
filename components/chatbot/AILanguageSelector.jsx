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
        className="
          flex items-center gap-1.5 px-3 py-1.5 rounded-full
          bg-gray-100 dark:bg-white/10 
          hover:bg-gray-200 dark:hover:bg-white/20
          transition border border-gray-200 dark:border-white/10
        "
      >
        <FaLanguage className="text-gray-600 dark:text-gray-300 text-lg" />
        <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
          {selectedLang ? selectedLang.label : ""}
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="
          absolute right-0 mt-2 w-40 p-1
          bg-white dark:bg-[#1a1a1a] 
          border border-gray-100 dark:border-white/10
          shadow-xl rounded-xl z-[10000]
          animate-in fade-in zoom-in-95 duration-200
        ">
          {languages.map((l) => (
            <button
              key={l.code}
              className={`
                w-full text-left px-3 py-2 rounded-lg text-sm font-medium
                flex items-center justify-between
                transition-colors
                ${selectedLang?.code === l.code
                  ? "bg-green-50 dark:bg-green-500/20 text-green-600 dark:text-green-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                }
              `}
              onClick={() => {
                handleLanguageChange(l.code);
                setSelectedLang(l);
                setOpen(false);
              }}
            >
              {l.label}
              {selectedLang?.code === l.code && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
