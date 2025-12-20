"use client";

import React from "react";
import { useTheme } from "@/Context/themecontext";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  // dynamic button styling based on current theme
  const buttonClasses =
    theme === "light"
      ? "px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
      : "px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 transition";

  return (
    <button
      onClick={toggleTheme}
      className={buttonClasses}
      aria-pressed={theme === "dark"}
    >
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
