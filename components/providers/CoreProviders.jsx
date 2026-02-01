"use client";

import { ThemeProvider } from "@/Context/themecontext";
import { ViewProvider } from "@/Context/ViewContext";
import { LanguageProvider } from "@/Context/languagecontext";
import { ToastProvider } from "@/Context/ToastContext";

import { SWRConfig } from "swr";

export default function CoreProviders({ children }) {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        shouldRetryOnError: false,
        dedupingInterval: 5000,
      }}
    >
      <ThemeProvider>
        <ViewProvider>
          <LanguageProvider>
            <ToastProvider>{children}</ToastProvider>
          </LanguageProvider>
        </ViewProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
