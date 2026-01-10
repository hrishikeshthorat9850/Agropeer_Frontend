"use client";

import { useEffect, useCallback } from "react";
import { useAndroidNotifications } from "@/hooks/useAndroidNotifications";
import useNativeFcmToken from "@/hooks/useNativeFcmToken";
import { useLogin } from "@/Context/logincontext";
import { useLanguage } from "@/Context/languagecontext";

export default function AndroidNotificationHandler() {
  const { user } = useLogin();
  const { isAndroid, isReady } = useAndroidNotifications();
  const { t } = useLanguage();

  const handleForegroundPush = useCallback(
    async (notification) => {
      const { showAndroidNotification } = await import(
        "@/utils/capacitorNotifications"
      );
      const payload = notification.notification ?? notification;
      const data = payload?.data ?? notification.data ?? {};

      const title =
        payload.title ||
        payload.notification?.title ||
        data.title ||
        data.msg_title ||
        t("notification_default_title");

      const body =
        payload.body ||
        payload.notification?.body ||
        data.body ||
        data.message ||
        data.msg ||
        t("notification_default_body");

      await showAndroidNotification({
        title,
        body,
        data,
      });
    },
    [t]
  );

  const handlePushAction = useCallback((notification) => {
    const data = notification.notification?.data ?? notification.data ?? {};
    if (data.url) {
      window.location.href = data.url;
      return;
    }
    if (data.conversationId) {
      window.location.href = `/chats?conversation=${data.conversationId}`;
    }
  }, []);

  const { token: nativeToken, permission } = useNativeFcmToken({
    onMessage: handleForegroundPush,
    onAction: handlePushAction,
  });

  useEffect(() => {
    if (!isAndroid || !isReady) return;

    async function setupAndroidListeners() {
      try {
        const { LocalNotifications } = await import(
          "@capacitor/local-notifications"
        );
        const { App } = await import("@capacitor/app");

        LocalNotifications.addListener(
          "localNotificationActionPerformed",
          (notification) => {
            const data = notification.notification.data;
            if (data?.url) {
              window.location.href = data.url;
            } else if (data?.conversationId) {
              window.location.href = `/chats?conversation=${data.conversationId}`;
            }
          }
        );

        App.addListener("appStateChange", ({ isActive }) => {
          if (isActive) {
            // App returned to foreground - could refresh data if needed
          }
        });

        return () => {
          LocalNotifications.removeAllListeners();
        };
      } catch (error) {
        console.warn("Error setting up Android notification listeners:", error);
      }
    }

    setupAndroidListeners();
  }, [isAndroid, isReady]);

  useEffect(() => {
    if (!nativeToken) return;
    console.log(
      "✅ Native FCM token ready:",
      nativeToken.substring(0, 24) + "…"
    );
  }, [nativeToken]);

  useEffect(() => {
    if (!isAndroid) return;
    console.log("📲 Native push permission:", permission);
  }, [isAndroid, permission]);

  return null;
}
