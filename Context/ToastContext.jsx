"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import ToastQueue from "@/lib/toast/toastQueue";
import { showNativeToast, isAndroidPlatform } from "@/lib/toast/toastAdapter";

const ToastContext = createContext(null);

// Global toast queue instance
const toastQueue = new ToastQueue(5);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [isAndroid, setIsAndroid] = useState(false);

  // Check platform on mount
  useEffect(() => {
    isAndroidPlatform().then(setIsAndroid);
  }, []);

  // Subscribe to queue changes
  useEffect(() => {
    const unsubscribe = toastQueue.subscribe((queue) => {
      setToasts(queue);
    });

    return unsubscribe;
  }, []);

  /**
   * Show toast notification
   * @param {string|object} typeOrOptions - Toast type or options object
   * @param {string} message - Toast message (if first param is type)
   */
  const showToast = useCallback((typeOrOptions, message) => {
    let options;

    // Handle both signatures: showToast(type, message) or showToast(options)
    if (typeof typeOrOptions === "string") {
      options = {
        type: typeOrOptions,
        message: message || "",
      };
    } else {
      options = typeOrOptions;
    }

    const {
      type = "info",
      message: msg = "",
      duration = 3000,
      position = "top-right",
      showIcon = true,
      showCloseButton = true,
      action,
      onDismiss,
      persistent = false,
      useNativeToast = false, // Option to use native Android toast
    } = options;

    // If Android and useNativeToast is true, use native toast
    if (isAndroid && useNativeToast && typeof msg === "string") {
      showNativeToast(msg, duration >= 5000 ? "long" : "short");
      onDismiss?.();
      return;
    }

    // Add to queue
    const id = toastQueue.add({
      type,
      message: msg,
      duration,
      position,
      showIcon,
      showCloseButton,
      action,
      onDismiss,
      persistent,
    });

    return id;
  }, [isAndroid]);

  /**
   * Remove toast by ID
   */
  const removeToast = useCallback((id) => {
    toastQueue.remove(id);
  }, []);

  /**
   * Clear all toasts
   */
  const clearToasts = useCallback(() => {
    toastQueue.clear();
  }, []);

  // Convenience methods
  const success = useCallback((message, options = {}) => {
    return showToast({ ...options, type: "success", message });
  }, [showToast]);

  const error = useCallback((message, options = {}) => {
    return showToast({ ...options, type: "error", message });
  }, [showToast]);

  const info = useCallback((message, options = {}) => {
    return showToast({ ...options, type: "info", message });
  }, [showToast]);

  const warning = useCallback((message, options = {}) => {
    return showToast({ ...options, type: "warning", message });
  }, [showToast]);

  const value = {
    toasts,
    showToast,
    removeToast,
    clearToasts,
    success,
    error,
    info,
    warning,
    isAndroid,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

