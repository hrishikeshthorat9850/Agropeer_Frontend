import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaWifi,
} from "react-icons/fa";

export default function ToastIcon({ type, className = "" }) {
  const iconMap = {
    success: <FaCheckCircle className="text-emerald-500" />,
    error: <FaExclamationCircle className="text-red-500" />,
    info: <FaInfoCircle className="text-blue-500" />,
    warning: <FaExclamationTriangle className="text-amber-500" />,
    network: <FaWifi className="text-purple-500" />,
  };

  const IconComponent = iconMap[type] || <FaInfoCircle className="text-gray-400" />;

  return (
    <span className={`text-xl ${className}`} aria-hidden="true">
      {IconComponent}
    </span>
  );
}

