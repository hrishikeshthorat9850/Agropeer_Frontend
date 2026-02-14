"use client";

import { ThemeProvider } from "@/Context/themecontext";
import { ViewProvider } from "@/Context/ViewContext";
import { LanguageProvider } from "@/Context/languagecontext";
import { ToastProvider } from "@/Context/ToastContext";
import { BackHandlerProvider } from "@/Context/BackHandlerContext";

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
            <BackHandlerProvider>
              <ToastProvider>{children}</ToastProvider>
            </BackHandlerProvider>
          </LanguageProvider>
        </ViewProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}
