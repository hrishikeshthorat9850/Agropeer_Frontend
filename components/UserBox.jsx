"use client";

import Image from "next/image";
// import { LogOut } from "lucide-react"; // Optional, replace with icon you use

export default function UserBox({ user, onLogout }) {
  return (
    <div className="absolute top-4 right-4 flex items-center bg-white shadow-md border border-green-200 rounded-xl px-4 py-2 gap-3">
      {/* Profile Image */}
      <Image
        src={user?.avatar || "/default-avatar.png"}
        alt="User Photo"
        width={40}
        height={40}
        className="rounded-full object-cover border border-green-400"
      />

      {/* User Info */}
      <div className="flex flex-col text-sm leading-tight">
        <span className="text-green-700 font-semibold">{user.name}</span>
        <span className="text-gray-500 text-xs">{user.email}</span>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="ml-auto hover:bg-green-100 p-2 rounded-full transition"
        title="Logout"
      >
        Logout
      </button>
    </div>
  );
}
