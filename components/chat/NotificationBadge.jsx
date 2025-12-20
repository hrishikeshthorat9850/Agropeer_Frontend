"use client";

export default function NotificationBadge({ unreadCount }) {
  if (!unreadCount) return null;

  return (
    <div className="absolute top-1 right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full px-[6px] py-[2px] shadow-md">
      {unreadCount}
    </div>
  );
}
