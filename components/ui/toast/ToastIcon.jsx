/**
 * Agricultural-themed Toast Icons
 * Provides contextual icons for different toast types
 */

export default function ToastIcon({ type, className = "" }) {
  const iconMap = {
    success: "🌾", // Harvest icon
    error: "⚠️",   // Warning icon
    info: "💡",    // Lightbulb icon
    warning: "🌧️", // Weather warning
    network: "📡", // Connection icon
  };

  const icon = iconMap[type] || "💡";

  return (
    <span className={`text-xl ${className}`} role="img" aria-label={`${type} icon`}>
      {icon}
    </span>
  );
}

