/**
 * Simplified useToast hook
 * Now uses ToastContext for unified toast management
 * 
 * @deprecated - Use useToast from @/Context/ToastContext directly
 * This hook is kept for backward compatibility
 */

import { useToast as useToastContext } from "@/Context/ToastContext";

export default function useToast() {
  const { showToast, success, error, info, warning, clearToasts } = useToastContext();

  // Backward compatibility wrapper
  const showToastCompat = (type, message) => {
    if (typeof message === "string") {
      showToast({ type, message });
    } else {
      showToast({ type, ...message });
    }
  };

  return {
    showToast: showToastCompat,
    success,
    error,
    info,
    warning,
    clearToasts,
    // Note: ToastComponent is no longer needed - ToastContainer handles rendering globally
    ToastComponent: null, // Keep for backward compatibility but it's handled globally now
  };
}
