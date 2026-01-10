"use client";
import { formatName } from "@/utils/formatName";
import {
  FaTimes,
  FaEllipsisV,
  FaPhone,
  FaVideo,
  FaCircle,
} from "react-icons/fa";
import { useSocket } from "@/Context/SocketContext";
import { useLanguage } from "@/Context/languagecontext";

export default function ChatHeader({ sellerUserInfo, onClose }) {
  const { onlineUsers } = useSocket();
  const { t } = useLanguage();
  const isOnline = !!(sellerUserInfo?.id && onlineUsers?.[sellerUserInfo.id]);

  return (
    <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-md rounded-t-2xl border-b border-emerald-800/40">
      {/* Left: Avatar + Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-900 to-green-800 flex items-center justify-center text-white font-semibold shadow-md border border-white/20">
            {sellerUserInfo?.profile_url ||
              formatName(sellerUserInfo).charAt(0)}
          </div>

          {/* Online Dot */}
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-emerald-700 ${
              isOnline ? "bg-green-400" : "bg-gray-400"
            }`}
          ></span>
        </div>

        {/* User Info */}
        <div className="leading-tight">
          <h3 className="font-semibold text-white text-base md:text-lg tracking-tight">
            {sellerUserInfo ? formatName(sellerUserInfo) : t("unknown_name")}
          </h3>
          <div className="flex items-center gap-1">
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-emerald-700 ${
                isOnline ? "bg-green-400" : "bg-gray-400"
              }`}
            ></span>
            <span className="text-xs text-green-100">
              {isOnline ? t("online_status") : t("offline_status")}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-3">
        {/* <button
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
          title="Call"
        >
          <FaPhone className="text-white text-sm" />
        </button>
        <button
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
          title="Video Call"
        >
          <FaVideo className="text-white text-sm" />
        </button> */}
        {/* <button
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
          title="More Options"
        >
          <FaEllipsisV className="text-white text-sm" />
        </button> */}
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/30 hover:bg-red-500/80 transition-all shadow-sm hover:shadow-md backdrop-blur-sm"
          title={t("close_chat_tooltip")}
        >
          <FaTimes className="text-white text-sm" />
        </button>
      </div>
    </div>
  );
}
