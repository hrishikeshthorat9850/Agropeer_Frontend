"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

const BackHandlerContext = createContext({
  register: (id, handler, priority) => {},
  unregister: (id) => {},
  handleBack: () => Promise.resolve(false),
});

export const useBackHandler = () => useContext(BackHandlerContext);

/**
 * Hook to easily register a back handler in a component
 * @param {Function} handler - Function to call when back is pressed. Return true if handled.
 * @param {number} priority - Higher priority handlers are called first. Default 10.
 * @param {boolean} enabled - Whether the handler is active. Default true.
 */
export function useBackPress(handler, priority = 10, enabled = true) {
  const { register, unregister } = useBackHandler();
  // Generate a unique ID for this hook instance
  const id = useRef(
    `back-handler-${Math.random().toString(36).substr(2, 9)}`,
  ).current;

  useEffect(() => {
    if (enabled) {
      register(id, handler, priority);
    } else {
      unregister(id);
    }
    return () => unregister(id);
  }, [enabled, handler, priority, register, unregister, id]);
}

export function BackHandlerProvider({ children }) {
  // Store handlers as a map: id -> { handler, priority }
  const handlersRef = useRef(new Map());
  // Force update to ensure context consumers have latest refs if needed (rarely)
  const [, forceUpdate] = useState({});

  const register = useCallback((id, handler, priority = 10) => {
    handlersRef.current.set(id, { handler, priority });
  }, []);

  const unregister = useCallback((id) => {
    handlersRef.current.delete(id);
  }, []);

  const handleBack = useCallback(async () => {
    // Sort handlers by priority (descending)
    const sortedHandlers = Array.from(handlersRef.current.values()).sort(
      (a, b) => b.priority - a.priority,
    );

    // Iterate and find the first one that returns true
    for (const { handler } of sortedHandlers) {
      try {
        const result = await handler();
        if (result) {
          return true; // Handled
        }
      } catch (e) {
        console.error("Error in back handler:", e);
      }
    }

    return false; // Not handled
  }, []);

  return (
    <BackHandlerContext.Provider value={{ register, unregister, handleBack }}>
      {children}
    </BackHandlerContext.Provider>
  );
}
