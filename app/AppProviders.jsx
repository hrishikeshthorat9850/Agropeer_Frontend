"use client";

import { LoginProvider, useLogin } from "@/Context/logincontext";
import { ThemeProvider } from "@/Context/themecontext";
import { ViewProvider } from "@/Context/ViewContext";
import { LanguageProvider } from "@/Context/languagecontext";
import { SocketProvider } from "@/Context/SocketContext";
import { WeatherProvider } from "@/Context/WeatherContext";
import { ToastProvider } from "@/Context/ToastContext";

export default function AppProviders({ children }) {
  return (
    <LoginProvider>
      <InnerProviders>{children}</InnerProviders>
    </LoginProvider>
  );
}

function InnerProviders({ children }) {
  const { user } = useLogin();

  return (
    <ThemeProvider>
        <ViewProvider>
          <LanguageProvider>
            <ToastProvider>
              <SocketProvider loggedInUser={user}>
                <WeatherProvider>
                  {children}
                </WeatherProvider>
              </SocketProvider>
            </ToastProvider>
          </LanguageProvider>
        </ViewProvider>
    </ThemeProvider>
  );
}
