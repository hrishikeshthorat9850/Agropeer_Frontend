"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLogin } from "./logincontext";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

// function setCookie(name, value, days = 365) {
//   try {
//     if (typeof document === "undefined") return;
//     const maxAge = days * 24 * 60 * 60;
//     document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
//   } catch (e) {
//     // ignore
//   }
// }

export const ThemeProvider = ({ children }) => {
  const { user } = useLogin();
  const [theme, setTheme] = useState("light");

  // 1️⃣ Apply theme to DOM <html>
  const applyTheme = (mode) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode); // Tailwind expects this
  };

  // 2️⃣ Initialize theme ONLY ONCE (no reset on page change)
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      applyTheme(saved);
      return;
    }

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    const fallback = prefersDark ? "dark" : "light";

    setTheme(fallback);
    applyTheme(fallback);
    localStorage.setItem("theme", fallback);
  }, []);

  // 3️⃣ If user logs in AND has theme saved → apply it (ONLY ONCE)
  useEffect(() => {
    if (!user) return;

    const userTheme = user.user_metadata?.theme;
    if (!userTheme) return;

    const normalized = userTheme === "dark" ? "dark" : "light";

    setTheme(normalized);
    applyTheme(normalized);
    localStorage.setItem("theme", normalized);
  }, [user]);

  // 4️⃣ Toggle theme
  const toggleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (user) {
      await supabase.auth.updateUser({
        data: { theme: newTheme },
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
