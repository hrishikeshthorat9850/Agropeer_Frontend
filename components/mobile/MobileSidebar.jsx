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
import { StatusBar, Style } from '@capacitor/status-bar';

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  StatusBar.setOverlaysWebView({ overlay: true });

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

    useEffect(() => {
    if (open) {
      // Sidebar OPEN → white text/icons
      StatusBar.setStyle({ style: Style.Dark });
    } else {
      // Sidebar CLOSED → black text/icons
      StatusBar.setStyle({ style: Style.Dark });
    }
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
            className="fixed left-0 top-0 w-3/4 max-w-[300px]
              bg-gradient-to-b from-green-900 to-green-700
              text-white p-6 pb-10 z-[9999] rounded-r-3xl shadow-xl
              flex flex-col h-[100dvh]
            "
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 250, damping: 28 }}
          >
            {/* Fixed Header */}
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
              <div className="relative">
                <h3 className="text-xl mt-6 font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent px-4 rounded-xl backdrop-blur-sm bg-white/10 shadow-lg">
                  Menu
                </h3>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent rounded-full"></div>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
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

              {/* Creative Access Hub */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="relative">
                  {/* Floating Background Elements */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-4 left-2 w-12 h-12 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-lg animate-pulse delay-1000"></div>
                  </div>

                  {/* Section Title */}
                  <div className="relative mb-6">
                    <h4 className="text-sm font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                      Access Hub
                    </h4>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1"></div>
                  </div>

                  {/* Creative Floating Cards */}
                  <div className="relative space-y-4">
                    {/* Favorites - Floating Bubble */}
                    <Link
                      href="/favorites"
                      onClick={() => setOpen(false)}
                      className="group relative block"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-orange-500/20 backdrop-blur-md border border-white/20 p-5 hover:bg-gradient-to-br hover:from-rose-500/30 hover:via-pink-500/25 hover:to-orange-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-rose-500/25"
                      style={{
                        clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)'
                      }}
                    >
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 right-2 w-3 h-3 bg-rose-400 rounded-full animate-bounce delay-100"></div>
                          <div className="absolute bottom-3 left-3 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-300"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-orange-400 rounded-full animate-ping delay-500"></div>
                        </div>

                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 via-pink-400 to-orange-400 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                <span className="text-white text-lg">💖</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                              <span className="text-white font-bold text-base">Favorites</span>
                              <p className="text-white/70 text-xs mt-0.5">Your saved treasures</p>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                              <span className="text-white text-xs">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Settings - Floating Bubble */}
                    <Link
                      href="/settings"
                      onClick={() => setOpen(false)}
                      className="group relative block"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-blue-500/20 backdrop-blur-md border border-white/20 p-5 hover:bg-gradient-to-br hover:from-indigo-500/30 hover:via-purple-500/25 hover:to-blue-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/25"
                      style={{
                        clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)'
                      }}
                    >
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 right-2 w-3 h-3 bg-indigo-50 rounded-full animate-bounce delay-100"></div>
                          <div className="absolute bottom-3 left-3 w-2 h-2 bg-purple-50 rounded-full animate-bounce delay-300"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-blue-50 rounded-full animate-ping delay-500"></div>
                        </div>

                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                <span className="text-white text-lg">⚡</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                              <span className="text-white font-bold text-base">Settings</span>
                              <p className="text-white/70 text-xs mt-0.5">Customize your experience</p>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                              <span className="text-white text-xs">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Profile - Floating Bubble */}
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="group relative block"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 via-teal-500/15 to-green-500/20 backdrop-blur-md border border-white/20 p-5 hover:bg-gradient-to-br hover:from-emerald-500/30 hover:via-teal-500/25 hover:to-green-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/25"
                      style={{
                        clipPath: 'polygon(0% 15%, 15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%)'
                      }}
                    >
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
                          <div className="absolute bottom-3 left-3 w-2 h-2 bg-teal-400 rounded-full animate-bounce delay-300"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full animate-ping delay-500"></div>
                        </div>

                        <div className="relative flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 via-teal-400 to-green-400 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                                <span className="text-white text-lg">🌟</span>
                              </div>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-lime-400 to-green-400 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                              <span className="text-white font-bold text-base">Profile</span>
                              <p className="text-white/70 text-xs mt-0.5">Your digital identity</p>
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                              <span className="text-white text-xs">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
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
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
