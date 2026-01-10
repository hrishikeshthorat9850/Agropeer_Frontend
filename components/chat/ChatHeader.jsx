import { FaEllipsisV, FaChevronLeft, FaPhone, FaVideo } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatName } from "@/utils/formatName";
import ChatOptionsMenu from "@/components/chat/ChatOptionsMenu";
import { useSocket } from "@/Context/SocketContext";
import { formatLastSeen } from "@/utils/formatLastSeen";
import { useLanguage } from "@/Context/languagecontext";

export default function ChatHeader({ selected }) {
  const { onlineUsers, lastSeen } = useSocket();
  const { t } = useLanguage();
  const [status, setStatus] = useState({ isOnline: false, lastSeen: null });
  const [showContacts, setShowContacts] = useState(true);
  useEffect(() => {
    if (!selected?.id) return;

    setStatus({
      isOnline: onlineUsers[selected?.id] === true,
      lastSeen: lastSeen[selected?.id] || null,
    });
  }, [onlineUsers, lastSeen, selected?.id]);

  useEffect(() => {
    console.log("onlineUsers are :", onlineUsers);
    console.log("lastSeen is :", lastSeen);
    console.log("Selected is :", selected);
  }, [selected]);

  if (!selected) {
    return (
      <div
        className="flex items-center px-4 py-3 border-b dark:border-neutral-800 
        bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm sticky top-0"
      >
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-neutral-800 animate-pulse" />

        <div className="ml-3">
          <div className="w-24 h-4 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
          <div className="mt-2 w-16 h-3 bg-gray-200 dark:bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-between items-center px-4 py-3 border-b dark:border-neutral-800 
      bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm sticky top-0"
    >
      <div className="flex items-center gap-3">
        {!showContacts && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowContacts(true)}
            className="p-2 rounded-md bg-gray-100 dark:bg-neutral-800 md:hidden"
          >
            <FaChevronLeft />
          </motion.button>
        )}

        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={
              selected?.profile_url || selected?.avatar_url || "/profile.png"
            }
            alt={
              selected?.display_name ||
              selected?.user_metadata?.full_name ||
              formatName(selected)
            }
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div>
          <div className="font-semibold text-gray-900 dark:text-gray-100">
            {selected?.display_name || formatName(selected)}
          </div>

          <div className="text-xs text-gray-500">
            {status.isOnline
              ? t("online_status")
              : status?.lastSeen
              ? `${t("last_seen_prefix")} ${formatLastSeen(status?.lastSeen)}`
              : t("offline_status")}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <ChatOptionsMenu />
      </div>
    </div>
  );
}
