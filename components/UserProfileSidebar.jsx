"use client";
import Image from "next/image";
import { useLogin } from "@/Context/logincontext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { FaSeedling, FaHeart, FaUserCircle, FaUserCog, FaQuestionCircle } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import LogoutButton from "./ui/LogoutButton";
import { formatName } from "@/utils/formatName";
import { useLanguage } from "@/Context/languagecontext";

export default function UserSidebar({ onClose } = {}) {
  const router = useRouter();
  const { user, loading, userinfo } = useLogin();
  const { t } = useLanguage();
  const [infoLoading, setInfoLoading] = useState(true);

  useEffect(() => {
    if (!loading) setInfoLoading(false);
  }, [loading]);

  const handleLogout = async () => {
    try {
      if (supabase?.auth?.signOut) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      router.push("/login");
      if (typeof onClose === "function") onClose();
    }
  };

  const displayName = user?.user_metadata?.full_name || formatName(userinfo) || userinfo?.display_name;


  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.avatar ||
    null;

  return (
    <motion.aside
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
    >
      {/* Header */}
      {user?.id ? (
        <div className="bg-gradient-to-r from-green-700 to-green-500 text-white px-6 py-5 flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white bg-green-100">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                fill
                className="object-cover rounded-full inset-0 mx-auto !my-auto"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <FaUserCircle className="text-4xl text-green-700 mx-auto my-auto" />
            )}
          </div>

          <div>
            <div className="font-semibold text-md">{displayName}</div>
            <div className="text-sm opacity-80">{user?.email || t("no_email")}</div>
          </div>
        </div>

      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 mb-8 mt-4 p-0"
        >
          <Link href="/login" className="farm-button group">
            <span className="flex items-center gap-2">
              <FaHeart className="group-hover:animate-pulse" />
              {t("login")}
            </span>
          </Link>
          <Link href="/signup" className="sunset-gradient text-white font-semibold px-8 py-3 rounded-xl shadow-sunset hover:shadow-glow-sunset transition-all duration-300 transform hover:scale-105 group">
            <span className="flex items-center gap-2">
              <FaSeedling className="group-hover:animate-bounce" />
              {t("signup")}
            </span>
          </Link>
        </motion.div>
      )}

      {/* Sidebar actions */}
      <div className="flex-1 p-4 space-y-2 dark:bg-[#272727]">
        {user && (
          <button
            onClick={() => {
              router.push("/profile");
              if (typeof onClose === "function") onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition dark:hover:bg-[#0a0a0a]"
          >
            <FaUserCog className="text-lg" />
            <span>{t("my_profile")}</span>
          </button>
        )}

        <button
          onClick={() => {
            router.push("/settings");
            if (typeof onClose === "function") onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition dark:hover:bg-[#0a0a0a]"
        >
          <FaUserCog className="text-lg" />
          <span>{t("settings")}</span>
        </button>

        <button
          onClick={() => {
            router.push("/help");
            if (typeof onClose === "function") onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition dark:hover:bg-[#0a0a0a]"
        >
          <FaQuestionCircle className="text-lg" />
          <span>{t("help_support")}</span>
        </button>

        {user ? <LogoutButton onClick={() => handleLogout()} /> : null}
      </div>

      {/* Footer */}
      {/* <div className="text-center text-xs text-gray-400 pb-3 border-t pt-2">
        <p>© {new Date().getFullYear()} <span className="font-semibold text-green-700">AgroInsta</span></p>
        <p className="italic">Empowering Farmers 🌾</p>
      </div> */}
      
    </motion.aside>
  );
}
