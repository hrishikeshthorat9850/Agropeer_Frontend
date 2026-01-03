"use client";

import { LoginProvider, useLogin } from "@/Context/logincontext";
import { ThemeProvider } from "@/Context/themecontext";
import { ViewProvider } from "@/Context/ViewContext";
import { LanguageProvider } from "@/Context/languagecontext";
import { SocketProvider } from "@/Context/SocketContext";
import { WeatherProvider } from "@/Context/WeatherContext";
import { ToastProvider } from "@/Context/ToastContext";
import { ChatProvider } from "@/Context/ChatContext";

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
                <ChatProvider>
                  <WeatherProvider>
                    {children}
                  </WeatherProvider>
                </ChatProvider>
              </SocketProvider>
            </ToastProvider>
          </LanguageProvider>
        </ViewProvider>
    </ThemeProvider>
  );
}
