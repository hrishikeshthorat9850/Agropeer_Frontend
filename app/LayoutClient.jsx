"use client";


import { usePathname, useRouter } from "next/navigation";
import AppProviders from "./AppProviders";
import { StatusBar } from "@capacitor/status-bar";
import Navbar from "../components/Navbar";
import TopLoader from "../components/TopLoader";
import OfflineBanner from "../components/OfflineBanner";
import PageTransition from "../components/PageTransition";
import Footer from "../components/home/Footer";

import AIChatbotButton from "@/components/chatbot/AIChatbotButton";
import AIChatWindow from "@/components/chatbot/AIChatWindow";
import NotificationHandler from "@/components/NotificationHandler";
import AndroidNotificationHandler from "@/components/AndroidNotificationHandler";
import ToastContainer from "@/components/ui/toast/ToastContainer";

import MobileNavbar from "@/components/mobile/MobileNavbar";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";
import MobileSidebar from "@/components/mobile/MobileSidebar";

import { useState, useEffect } from "react";

// 🔥 ADD YOUR POPUP MODAL HERE
import PopupModal from "@/components/popup/PopupModal";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // 🔥 Popup State → Always show on fresh load
  const [showPopup, setShowPopup] = useState(true);

  const noUIRoutes = ["/login", "/signup", "/register", "/admin/login", "/forgot-password"];
  const showNavbar = !noUIRoutes.includes(pathname);
  const isChatsPage = pathname.startsWith("/chats");

  // Detect mobile screen
  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ⭐ FIX STATUS BAR OVERLAY HERE
  useEffect(() => {
    StatusBar.setOverlaysWebView({ overlay: false }).catch(() => {});
  }, []);
  
  useEffect(() => {
  async function applyStatusBar() {
    try {
      // Make status bar dark icons (black)
      await StatusBar.setStyle({ style: Style.Dark });

      // Set a visible background color (slightly darker green)
      await StatusBar.setBackgroundColor({ color: "#E1F5E0" });
      // You can change this color based on your theme
    } catch (e) {}
  }

  applyStatusBar();
}, []);
  // 🔥 Mobile redirect from /home
  useEffect(() => {
    if (isMobile && pathname.startsWith("/home")) {
      window.location.replace("/");
    }
  }, [isMobile, pathname]);

  const shouldBlockHome = isMobile && pathname.startsWith("/home");

  const computedPadding = noUIRoutes.includes(pathname)
    ? ""
    : isMobile
    ? ""
    : "pt-[120px]";

  // Body padding adjustments for mobile no-padding routes
  useEffect(() => {
    const noMobilePaddingRoutes = ["/login", "/signup", "/register", "/admin/login", "/forgot-password"];

    if (noMobilePaddingRoutes.includes(pathname)) {
      document.body.classList.add("no-mobile-padding");
      document.documentElement.classList.add("no-mobile-padding");
    } else {
      document.body.classList.remove("no-mobile-padding");
      document.documentElement.classList.remove("no-mobile-padding");
    }
  }, [pathname]);

  return (
    <AppProviders>
      <TopLoader />
      <OfflineBanner />

      {/* 🔥 Popup Only on First Layout Mount */}
      {showPopup && !noUIRoutes.includes(pathname) && (
        <PopupModal onClose={() => setShowPopup(false)} />
      )}

      {shouldBlockHome ? (
        <main className="w-full min-h-screen bg-white"></main>
      ) : (
        <>
          {/* Desktop Navbar */}
          {!isMobile && showNavbar && <Navbar />}

          {/* Mobile Navbar */}
          {isMobile && showNavbar && (
            <MobileNavbar onOpenAI={() => setAiOpen(true)} />
          )}

          {/* <main
            className={`w-full ${
              isMobile && showNavbar
                ? "pt-[calc(56px+env(safe-area-inset-top,0))] pb-[calc(70px+env(safe-area-inset-bottom,0))]"
                : ""
            }`}
          > */}
          <main
            className={`w-full ${
              isMobile && showNavbar
                ? "pb-[calc(70px+env(safe-area-inset-bottom,0))]"
                : ""
            }`}
          >
            <div className={`flex flex-col ${computedPadding}`}>
              <PageTransition>{children}</PageTransition>

              {!isMobile && showNavbar && !isChatsPage && <Footer />}
            </div>
          </main>

          {/* Mobile Bottom Nav */}
          {isMobile && showNavbar && (
            <MobileBottomNav onAI={() => setAiOpen(true)} />
          )}

          {isMobile && <MobileSidebar />}

          {/* Chatbot */}
          {!noUIRoutes.includes(pathname) && (
            <>
              {!aiOpen && (
                <AIChatbotButton open={aiOpen} setOpen={setAiOpen} />
              )}
              <AIChatWindow open={aiOpen} setOpen={setAiOpen} />
            </>
          )}
        </>
      )}

      <NotificationHandler />
      <AndroidNotificationHandler />
      <ToastContainer position="top-right" maxToasts={5} />
    </AppProviders>
  );
}
