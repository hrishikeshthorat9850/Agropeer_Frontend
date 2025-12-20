"use client";

export default function AdminStatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType = "positive",
  subtitle,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
          {change !== undefined && (
            <p
              className={`text-sm font-medium mt-2 ${
                changeType === "positive"
                  ? "text-green-600"
                  : changeType === "negative"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {changeType === "positive" ? "↑" : changeType === "negative" ? "↓" : "→"}{" "}
              {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className="ml-4 p-3 bg-green-100 rounded-full">
            <Icon className="w-6 h-6 text-green-600" />
          </div>
        )}
      </div>
    </div>
  );
}

