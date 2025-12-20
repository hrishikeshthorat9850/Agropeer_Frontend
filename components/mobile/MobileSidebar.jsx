"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaLeaf,
  FaQuestionCircle,
  FaComments,
  FaStar,
  FaSeedling,
} from "react-icons/fa";
import { useEffect, useState } from "react";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  // Listen for open event
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-mobile-sidebar", handler);
    return () => window.removeEventListener("open-mobile-sidebar", handler);
  }, []);

  useEffect(() => {
    if (open) {
      // Lock scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.lockScrollY = scrollY;
    } else {
      // Unlock scroll
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    }

    // Cleanup (when component unmounts)
    return () => {
      const scrollY = document.body.dataset.lockScrollY || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, parseInt(scrollY));
      delete document.body.dataset.lockScrollY;
    };
  }, [open]);

  const MENU_ITEMS = [
    { href: "/about-us", label: "About Us", icon: <FaLeaf /> },
    { href: "/how-it-works", label: "How AgroPeer Works", icon: <FaSeedling /> },
    { href: "/help", label: "Help Center", icon: <FaQuestionCircle /> },
    { href: "/farming-tips", label: "Farming Tips", icon: <FaLeaf /> },
    { href: "/expert-advice", label: "Expert Advice", icon: <FaComments /> },
    { href: "/reviews", label: "Reviews", icon: <FaStar /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* LEFT SIDEBAR */}
          <motion.div
            className="
              fixed left-0 top-6 w-3/4 max-w-[300px]
              bg-gradient-to-b from-green-900 to-green-700
              text-white p-6 z-[9999]
              rounded-r-3xl shadow-xl
              overflow-y-auto pr-2
            "
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 28 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Menu</h3>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col gap-2">
              {MENU_ITEMS.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-white/10"
                >
                  <span className="text-lg">{it.icon}</span>
                  <span>{it.label}</span>
                </Link>
              ))}
            </nav>

            {/* Lower Links */}
            <div className="mt-3 pt-4 border-t border-white/10 space-y-2">
              <Link
                href="/favorites"
                onClick={() => setOpen(false)}
                className="block py-2 px-2 hover:bg-white/10 rounded-lg"
              >
                Favorites
              </Link>

              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className="block py-2 px-2 hover:bg-white/10 rounded-lg"
              >
                Settings
              </Link>

              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="block py-2 px-2 hover:bg-white/10 rounded-lg"
              >
                Profile
              </Link>
            </div>

            {/* Social icons */}
            <div className="mt-6 border-t border-white/10 pt-5">
              <h4 className="text-sm font-semibold mb-3">Connect With Us</h4>
              <div className="flex gap-3">

                <a
                  href="https://www.facebook.com/profile.php?id=61584709015575"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://chat.whatsapp.com/HRVHJXmrX6Q6gv07wnw1e3?mode=wwt"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center"
                >
                  <FaWhatsapp />
                </a>

                <a
                  href="https://www.instagram.com/agro_peer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#962fbf] flex items-center justify-center"
                >
                  <FaInstagram />
                </a>

                <a
                  href="https://youtube.com/@agropeer"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center"
                >
                  <FaYoutube />
                </a>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
