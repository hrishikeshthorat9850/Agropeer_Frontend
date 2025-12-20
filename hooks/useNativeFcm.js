"use client";

import { useEffect, useState, useRef } from "react";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { useLogin } from "@/Context/logincontext";

export default function useNativeFcm(onForegroundMessage) {
  const { user } = useLogin();

  const [token, setToken] = useState(null);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const savingLock = useRef(false);
  const listenersAdded = useRef(false);

  useEffect(() => {
    async function initNative() {
      if (!Capacitor.isNativePlatform()) return;

      if (!listenersAdded.current) {
        listenersAdded.current = true;

        console.log("📱 Using Native FCM");

        // Request permission + register ONLY once
        const perm = await PushNotifications.requestPermissions();
        if (perm.receive !== "granted") return;
        await PushNotifications.register();

        // -----------------------------
        // TOKEN LISTENER
        // -----------------------------
        PushNotifications.addListener("registration", (data) => {
          const newToken = data.value;
          console.log("🔥 Native FCM Token:", newToken);

          // Save token locally first
          setToken(newToken);
          localStorage.setItem("native_fcm_token", newToken);

          // DO NOT SAVE YET IF USER IS NOT READY
          if (user?.id) {
            saveTokenToBackend(newToken, user?.id, savingLock);
          } else {
            console.log("⚠️ Token received before user is ready, will save later.");
          }
        });

        PushNotifications.addListener("registrationError", (err) => {
          console.error("❌ Native Registration Error:", err);
        });

        // -----------------------------
        // FOREGROUND MESSAGES
        // -----------------------------
        PushNotifications.addListener("pushNotificationReceived", (notif) => {
          console.log("📩 Native notification:", notif);
          onForegroundMessage?.(notif);
        });

        PushNotifications.addListener("pushNotificationActionPerformed", (notif) => {
          console.log("📲 Notification clicked:", notif);
        });
      }
    }

    initNative();
  }, []);

  // -----------------------------
  // SAVE TOKEN *AFTER USER LOADED*
  // -----------------------------
  useEffect(() => {
    if (!user?.id) return;

    const storedToken = token || localStorage.getItem("native_fcm_token");
    if (!storedToken) return;

    const storedUser = localStorage.getItem("native_fcm_user");

    if (storedUser !== user.id) {
      console.log("👤 User loaded — saving token now.");
      saveTokenToBackend(storedToken, user.id, savingLock).then(() => {
        localStorage.setItem("native_fcm_user", user.id);
      });
    }
  }, [user?.id, token]);

  return { token };
}

// -----------------------------------------------
// SAVE TOKEN TO BACKEND SAFELY
// -----------------------------------------------
async function saveTokenToBackend(token, userId, savingLock) {
  if (!token || !userId) return;

  if (savingLock.current) return;

  const storedToken = localStorage.getItem("native_fcm_token");
  const storedUser = localStorage.getItem("native_fcm_user");

  if (storedToken === token && storedUser === userId) {
    console.log("🔄 Token unchanged — skipping save");
    return;
  }

  savingLock.current = true;

  try {
    await fetch(`${BASE_URL}/api/register-fcm-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        deviceType: "android",
        userId,
      }),
    });

    console.log("📨 Native FCM Token saved:", token);
    localStorage.setItem("native_fcm_user", userId);
  } catch (err) {
    console.error("❌ Failed to save FCM token:", err);
  }

  savingLock.current = false;
}
