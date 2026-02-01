"use client";

import { SocketProvider } from "@/Context/SocketContext";
import { WeatherProvider } from "@/Context/WeatherContext";
import { ChatProvider } from "@/Context/ChatContext";
import { useLogin } from "@/Context/logincontext";

export default function FeatureProviders({ children }) {
  const { user } = useLogin();

  return (
    <SocketProvider loggedInUser={user}>
      <ChatProvider>
        <WeatherProvider>{children}</WeatherProvider>
      </ChatProvider>
    </SocketProvider>
  );
}
