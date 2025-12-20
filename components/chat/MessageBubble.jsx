import { motion } from "framer-motion";
import { formatTime } from "@/utils/isoTimeFormat";
import {FaCheck} from "react-icons/fa";
export default function MessageBubble({message}){
    const me = message.from === "me";
    const seen = message.seen;
    return (
        <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={`flex ${me ? "justify-end" : "justify-start"} mb-3`}
        >
        <div
            className={`relative max-w-[80%] px-4 py-3 rounded-2xl ${
            me
                ? "bg-sky-700 text-white rounded-br-md shadow-md"
                : "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-bl-md shadow-sm"
            }`}
        >
            <div className="text-sm leading-relaxed">{message.text}</div>
            <div
            className={`text-[11px] mt-1 text-right flex items-center justify-end gap-1 ${
                me ? "text-white/80" : "text-gray-500"
            }`}
            >
            {formatTime(message.at)}
            {me && (
                <span className="ml-1 flex items-center">
                    <FaCheck
                        size={10}
                        className={`${seen ? "text-emerald-400" : "text-gray-200"} -mr-1`}
                    />
                    <FaCheck
                        size={10}
                        className={`${seen ? "text-emerald-400" : "text-gray-200"} ml-[2px]`}
                    />
                </span>

            )}
            </div>
        </div>
        </motion.div>
    );
}