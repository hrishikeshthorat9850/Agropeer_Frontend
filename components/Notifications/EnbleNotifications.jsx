import React, { useEffect, useState, useCallback } from "react";
import { FaBell } from "react-icons/fa";

export default function EnableNotifications({
  title = "Enable Notifications",
  message = "Stay updated with new messages, alerts, and activity.",
  buttonLabel = "Open browser settings",
  storageKey = "agriNotifyPromptHidden", // localStorage key
  className = "",
}) {
  // UI state
  const [supported, setSupported] = useState(true);
  const [permission, setPermission] = useState(() =>
    typeof window !== "undefined" && "Notification" in window
      ? Notification.permission
      : "unsupported"
  );
  const [hidden, setHidden] = useState(() => {
    try {
      return localStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  });
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  // initialize feature detection & permission on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("Notification" in window)) {
      setSupported(false);
      setPermission("unsupported");
      return;
    }

    setSupported(true);
    setPermission(Notification.permission);
  }, []);

  // helper to persist hide preference
  const hidePrompt = useCallback(() => {
    try {
      localStorage.setItem(storageKey, "true");
    } catch {}
    setHidden(true);
  }, [storageKey]);

  // Request permission handler
  const requestPermission = useCallback(async () => {
    if (!supported) {
      setInfo("Your browser does not support notifications.");
      return;
    }

    // If already granted — just show a test & return
    if (permission === "granted") {
      setInfo("Notifications already allowed.");
      showTestNotification();
      return;
    }

    setLoading(true);
    setInfo("");

    try {
      // Request permission
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === "granted") {
        setInfo("Thanks — notifications enabled!");
        // Ask the user whether to stop showing the prompt anymore
        hidePrompt();
        showTestNotification();
      } else if (result === "denied") {
        setInfo(
          "You denied notifications. To enable, open your browser settings (instructions below)."
        );
        // we hide the prompt to avoid nagging; you can change this
        hidePrompt();
      } else {
        // "default" - user dismissed the permission dialog
        setInfo("You dismissed the permission dialog.");
        // Optionally hide the prompt or show again later
      }
    } catch (err) {
      console.error("Permission request failed", err);
      setInfo("Failed to request permission.");
    } finally {
      setLoading(false);
    }
  }, [supported, permission, hidePrompt]);

  // Show a small local/test notification (only works if permission === 'granted')
  const showTestNotification = useCallback(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") return;

    try {
      const n = new Notification("Field Update — Codefluee", {
        body: "Test: Alerts enabled for milk collection & weather updates.",
        // small icon optional (must be absolute or in public folder)
        // icon: "/icons/farm-bell.png"
      });

      // Auto-close after 5s
      setTimeout(() => n.close(), 5000);

      // Optional: onClick handler
      n.onclick = () => {
        window.focus();
        // handle navigation or open app page
      };
    } catch (e) {
      console.error("Cannot show notification:", e);
    }
  }, []);

  // When user clicks the provided "Open browser settings" button:
  // we cannot programmatically open browser settings. Provide instructions instead.
  const openSettings = useCallback(() => {
    // For UX, we simply show instructions (copyable). Could open a modal with steps.
    setInfo(
      "To enable notifications: open your browser site settings → Permissions → Notifications → Allow. (I can't open this for you programmatically.)"
    );
  }, []);

  // Dismiss handler (user hides prompt)
  const onDismiss = useCallback(() => {
    hidePrompt();
    setInfo("Prompt hidden. You can re-enable in site settings later.");
  }, [hidePrompt]);

  // If hidden by preference or unsupported, render nothing
  if (hidden) return null;

  // If not supported, give a simple unobtrusive notice
  if (!supported) {
    return (
      <div className={`fixed bottom-6 left-6 z-[55] max-w-sm rounded-2xl p-4 shadow-xl ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <FaBell className="w-5 h-5 text-green-700" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-green-900">Notifications Unsupported</h4>
            <p className="text-sm text-green-800 mt-1">
              Your browser doesn't support the Notifications API.
            </p>
            <button onClick={onDismiss} className="mt-2 text-sm underline">
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main prompt UI
  return (
    <div
      className={`
        fixed bottom-6 left-6 
        z-[55] 
        max-w-sm rounded-2xl p-5 shadow-xl border
        bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]
        bg-green-50/95 dark:bg-green-900/90
        border-green-300 dark:border-green-800
      ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl bg-green-200 flex items-center justify-center shadow-inner">
          <FaBell className="w-5 h-5 text-green-800" />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-green-900 dark:text-green-100">{title}</h4>

          <p className="text-sm text-green-800 dark:text-green-200 mt-1 leading-relaxed">
            {message}
          </p>

          <div className="mt-3 flex items-center gap-3">
            {/* Request permission or show test/different button based on state */}
            {permission === "granted" ? (
              <>
                <button
                  onClick={showTestNotification}
                  className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-700 text-white"
                >
                  Test notification
                </button>
                <button
                  onClick={onDismiss}
                  className="text-sm underline"
                >
                  Hide
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={requestPermission}
                  disabled={loading}
                  className="px-3 py-1 rounded-lg text-sm font-semibold bg-green-700 text-white disabled:opacity-50"
                >
                  {loading ? "Requesting…" : "Enable notifications"}
                </button>

                <button
                  onClick={openSettings}
                  className="text-sm underline"
                >
                  {buttonLabel}
                </button>

                <button
                  onClick={onDismiss}
                  className="text-sm ml-2"
                >
                  Dismiss
                </button>
              </>
            )}
          </div>

          {info && <p className="text-xs text-green-700 mt-2">{info}</p>}
          <p className="text-xs text-neutral-500 mt-1">Current permission: {permission}</p>
        </div>
      </div>
    </div>
  );
}
