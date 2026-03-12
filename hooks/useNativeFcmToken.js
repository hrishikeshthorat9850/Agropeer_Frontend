"use client";
import { useEffect, useState } from "react";
import { useLogin } from "@/Context/logincontext";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

async function registerNativeToken(token, userId, accessToken) {
  if (!token) return;
  try {
    const response = await fetch(`${BASE_URL}/api/register-fcm-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: JSON.stringify({
        token,
        deviceType: "android",
        userId: userId ?? null,
      }),
    });

    if (!response.ok) {
      console.warn("⚠️ Failed to register native FCM token");
    } else {
    }
  } catch (error) {
    console.error("❌ Error registering native FCM token:", error);
  }
}

export default function useNativeFcmToken(options = {}) {
  const { onMessage, onAction } = options;
  const [token, setToken] = useState(null);
  const [permission, setPermission] = useState("prompt");
  const { user, accessToken } = useLogin();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;
    const listenerHandles = [];

    async function setupNativePush() {
      try {
        const [{ PushNotifications }, { Capacitor }] = await Promise.all([
          import("@capacitor/push-notifications"),
          import("@capacitor/core"),
        ]);

        if (!Capacitor.isNativePlatform()) {
          return;
        }

        let permStatus = await PushNotifications.checkPermissions();
        let receiveState = permStatus.receive;
        if (receiveState !== "granted") {
          permStatus = await PushNotifications.requestPermissions();
          receiveState = permStatus.receive;
        }

        if (isMounted) {
          setPermission(receiveState);
        }

        if (receiveState !== "granted") {
          console.warn("⚠️ Push notifications permission denied on native platform");
          return;
        }

        await PushNotifications.register();

        listenerHandles.push(
          await PushNotifications.addListener("registration", async (tokenResult) => {
            if (!isMounted) return;
            const nativeToken = tokenResult.value;
            setToken(nativeToken);
            await registerNativeToken(nativeToken, user?.id, accessToken);
          })
        );

        listenerHandles.push(
          await PushNotifications.addListener("registrationError", (error) => {
            console.error("❌ Native FCM registration error:", error);
          })
        );

        listenerHandles.push(
          await PushNotifications.addListener("pushNotificationReceived", (notification) => {
            if (onMessage) {
              onMessage(notification);
            }
          })
        );

        listenerHandles.push(
          await PushNotifications.addListener("pushNotificationActionPerformed", (notification) => {

            if (onAction) {
              onAction(notification);
              return;
            }

            const data = notification.notification?.data ?? notification.data ?? {};
            if (data.url) {
              window.location.href = data.url;
            } else if (data.conversationId) {
              window.location.href = `/chats?conversation=${data?.conversationId}`;
            }
          })
        );
      } catch (error) {
        console.error("❌ Error setting up native push notifications:", error);
      }
    }

    setupNativePush();

    return () => {
      isMounted = false;
      listenerHandles.forEach((handle) => {
        try {
          handle?.remove();
        } catch (err) {
          console.warn("⚠️ Failed to remove push listener:", err);
        }
      });
    };
  }, [user?.id, accessToken, onMessage, onAction]);

  // Re-register when token + user + accessToken are available (e.g. after login on Android)
  useEffect(() => {
    if (!token || !user?.id || !accessToken) return;
    registerNativeToken(token, user.id, accessToken);
  }, [token, user?.id, accessToken]);

  return { token, permission };
}

