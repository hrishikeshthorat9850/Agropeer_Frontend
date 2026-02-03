"use client";
import { usePathname } from "next/navigation";
import AppProviders from "./AppProviders";
import TopLoader from "../components/TopLoader";
import OfflineBanner from "../components/OfflineBanner";
import PageTransition from "../components/PageTransition";
import AIChatbotButton from "@/components/chatbot/AIChatbotButton";
import AIChatWindow from "@/components/chatbot/AIChatWindow";
import AndroidNotificationHandler from "@/components/AndroidNotificationHandler";
import ToastContainer from "@/components/ui/toast/ToastContainer";
import { StatusBar, Style } from "@capacitor/status-bar";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import MobileBottomNav from "@/components/mobile/MobileBottomNav";
import MobileSidebar from "@/components/mobile/MobileSidebar";
import MobilePageLayout from "@/components/mobile/MobilePageLayout";
import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import { useKeyboardOpen } from "@/Mobile/hooks/useKeyboardOpen";
// import PopupModal from "@/components/popup/PopupModal";
import { setupAndroidNotificationChannel } from "@/utils/capacitorNotifications";
import DeepLinkManager from "@/components/Deeplink/DeeplinkManager";
import StatusBarManager from "@/components/mobile/StatusBarManager";
import ScrollToTop from "../components/ScrollToTop";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const keyboardOpen = useKeyboardOpen();

  const [aiOpen, setAiOpen] = useState(false);
  const [isChatSidebarOpen, setChatSidebarOpen] = useState(false);
  // 🔥 Popup State → Always show on fresh load
  const [showPopup, setShowPopup] = useState(true);

  const noUIRoutes = [
    "/login",
    "/signup",
    "/register",
    "/admin/login",
    "/forgot-password",
    "/selected-chat",
  ];
  const normalizePath = (path) => {
    if (!path) return "";
    return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
  };

  const showNavbar = !noUIRoutes.includes(normalizePath(pathname));

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      setupAndroidNotificationChannel(); // 📢 Create channel when app loads
    }
  }, []);

  // Add Capacitor platform class for Android scrollbar hiding
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const platform = Capacitor.getPlatform();
      document.documentElement.classList.add(`capacitor-platform-${platform}`);
      document.body.classList.add(`capacitor-platform-${platform}`);
      return () => {
        document.documentElement.classList.remove(
          `capacitor-platform-${platform}`,
        );
        document.body.classList.remove(`capacitor-platform-${platform}`);
      };
    }
  }, []);


  // Body padding adjustments for mobile no-padding routes
  useEffect(() => {
    const noMobilePaddingRoutes = [
      "/login",
      "/signup",
      "/register",
      "/admin/login",
      "/forgot-password",
      "/selected-chat",
    ];

    if (noMobilePaddingRoutes.includes(normalizePath(pathname))) {
      document.body.classList.add("no-mobile-padding");
      document.documentElement.classList.add("no-mobile-padding");
    } else {
      document.body.classList.remove("no-mobile-padding");
      document.documentElement.classList.remove("no-mobile-padding");
    }
  }, [pathname]);

  return (
    <>
      <DeepLinkManager
        navState={{
          isChatSidebarOpen,
          setChatSidebarOpen,
        }}
      />
      <AppProviders>
        {/* Do not mount ScrollToTop on /posts — prevents any scroll-to-top when loading more / reaching end */}
        {normalizePath(pathname) !== "/posts" && <ScrollToTop />}
        <StatusBarManager />
        <TopLoader />
        <OfflineBanner />

        {/* 🔥 Popup Only on First Layout Mount */}
        {/* {showPopup && !noUIRoutes.includes(pathname) && (
          <PopupModal onClose={() => setShowPopup(false)} />
        )} */}

        {/* Main Layout Structure (Mobile Only) - SANDWICH STRUCTURE */}
        {/* Main Layout Structure (Mobile Only) */}
        <div className="min-h-[100dvh] w-full relative">
          {/* 1. TOP: Mobile Navbar (Fixed) */}
          {showNavbar && <MobileNavbar onOpenAI={() => setAiOpen(true)} />}

          {/* 2. MIDDLE: Content Area */}
          <main
            className={`
              w-full min-h-screen 
              ${showNavbar ? "pt-mobile-layout" : ""} 
              ${showNavbar && !keyboardOpen ? "pb-mobile-layout" : ""}
            `}
          >
            <PageTransition>
              {/* MobilePageLayout provides consistent logic but NO extra padding if navbar/bottomnav are outside */}
              <MobilePageLayout hasNavbar={showNavbar}>
                {children}
              </MobilePageLayout>
            </PageTransition>
          </main>

          {/* 3. BOTTOM: Mobile Bottom Nav (Fixed) */}
          {showNavbar && !keyboardOpen && !aiOpen && (
            <MobileBottomNav onAI={() => setAiOpen(true)} />
          )}
        </div>

        <MobileSidebar />

        {/* Chatbot */}
        {!noUIRoutes.includes(pathname) && (
          <>
            {!aiOpen && <AIChatbotButton open={aiOpen} setOpen={setAiOpen} />}
            <AIChatWindow open={aiOpen} setOpen={setAiOpen} />
          </>
        )}

        <AndroidNotificationHandler />
        <ToastContainer position="top-center" maxToasts={5} />
      </AppProviders>
    </>
  );
}
