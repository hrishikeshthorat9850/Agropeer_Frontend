import { motion } from "framer-motion";
import { formatTime } from "@/utils/isoTimeFormat";
import { formatName } from "@/utils/formatName";
import { useState,useEffect } from "react";
import NotificationBadge from "./NotificationBadge";
import Image from "next/image";

export default function ContactRow({ user, active, onClick}){
    return(
        <motion.button
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.1 }}
            onClick={() => onClick(user)}
            className={`flex items-center gap-3 w-full p-3 rounded-xl text-left ${
                active ? "bg-sky-100 dark:bg-sky-800/30" : "hover:bg-gray-50 dark:hover:bg-neutral-800/60"
            }`}
            >
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                    src={user.profile_url || user.avatar_url || "/profile.png"}
                    alt={formatName(user)}
                    fill
                    className="object-cover rounded-full"
                />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{user?.displayName || formatName(user)}</p>
                <span className="text-xs text-gray-500 whitespace-nowrap">{formatTime(user?.last_message_at)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{user.last_message}</p>
            </div>
        </motion.button>
    )
}


