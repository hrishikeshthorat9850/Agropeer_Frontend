"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLogin } from "./logincontext";
import { LOCALE_NAMES, DEFAULT_LOCALE, SUPPORTED_LOCALES as LOCALES_FROM_LIB } from "@/lib/locales";
import { TRANSLATIONS } from "@/lib/translations";

const LanguageContext = createContext();

/**
 * 🌐 TRANSLATIONS:
 * Add new translation keys here or replace this with files under /public/locales if you scale later.
 */

/** 🍪 Cookie helper */
function setCookie(name, value, days = 365) {
  try {
    if (typeof document === "undefined") return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value}; path=/; max-age=${maxAge}`;
  } catch (e) {
    console.warn("setCookie failed:", e);
  }
}

export function LanguageProvider({ children }) {
  const { user } = useLogin();
  const [locale, _setLocale] = useState(DEFAULT_LOCALE);
  const [isReady, setIsReady] = useState(false); // 🆕 controls SSR hydration safety

  useEffect(() => {
    const init = async () => {
      try {
        let finalLocale = DEFAULT_LOCALE;
        const ls = typeof window !== "undefined" ? localStorage.getItem("locale") : null;

        // 🧭 Priority: server (user_metadata) > localStorage > cookie > default
        if (user?.user_metadata?.language && LOCALES_FROM_LIB.includes(user.user_metadata.language)) {
          finalLocale = user.user_metadata.language;
        } else if (ls && LOCALES_FROM_LIB.includes(ls)) {
          finalLocale = ls;
        } else if (typeof document !== "undefined") {
          const m = document.cookie.match("(^|;)\\s*locale\\s*=\\s*([^;]+)");
          const cookieLocale = m ? m.pop() : null;
          if (cookieLocale && LOCALES_FROM_LIB.includes(cookieLocale)) {
            finalLocale = cookieLocale;
          }
        }

        _setLocale(finalLocale);
        if (typeof window !== "undefined") localStorage.setItem("locale", finalLocale);
        setCookie("locale", finalLocale);

        // Sync with Supabase if logged in
        if (user && user.user_metadata?.language !== finalLocale) {
          await supabase.auth.updateUser({ data: { language: finalLocale } }).catch(console.error);
        }
      } catch (e) {
        console.error("language init error:", e);
      } finally {
        // ✅ Mark as ready after initialization (prevents hydration mismatch)
        setIsReady(true);
      }
    };

    init();
  }, [user]);

  // 🆕 Prevent SSR/client text mismatch
  if (!isReady) return null;

  const setLocale = async (newLocale) => {
    if (!newLocale) return;
    const normalized = String(newLocale);
    if (!LOCALES_FROM_LIB.includes(normalized)) return;

    _setLocale(normalized);
    if (typeof window !== "undefined") localStorage.setItem("locale", normalized);
    setCookie("locale", normalized);

    if (user) {
      const { error } = await supabase.auth.updateUser({ data: { language: normalized } });
      if (error) console.error("supabase update language err:", error);
    }
  };

  const t = (key) => {
    return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS[DEFAULT_LOCALE]?.[key] ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        t,
        SUPPORTED_LOCALES: LOCALES_FROM_LIB,
        LOCALE_NAMES,
        DEFAULT_LOCALE,
        isReady, // optional if other components want to use readiness
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
