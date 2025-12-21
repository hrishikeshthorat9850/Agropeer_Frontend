"use client";


import { usePathname, useRouter } from "next/navigation";
import AppProviders from "./AppProviders";
import { StatusBar, Style } from "@capacitor/status-bar";
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
import MobilePageLayout from "@/components/mobile/MobilePageLayout";

import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";

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

  // Add Capacitor platform class for Android scrollbar hiding
  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      const platform = Capacitor.getPlatform();
      document.documentElement.classList.add(`capacitor-platform-${platform}`);
      document.body.classList.add(`capacitor-platform-${platform}`);
      return () => {
        document.documentElement.classList.remove(`capacitor-platform-${platform}`);
        document.body.classList.remove(`capacitor-platform-${platform}`);
      };
    }
  }, []);

  // ⭐ FIX STATUS BAR - Make it overlay and match navbar color
  useEffect(() => {
    async function applyStatusBar() {
      try {
        if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android') {
          // Set status bar to overlay the webview so navbar shows through
          await StatusBar.setOverlaysWebView({ overlay: true });
          
          // Set status bar background to match navbar gradient (green)
          await StatusBar.setBackgroundColor({ color: "#2E7D32" });
          
          // Use light style (white icons) for dark green navbar background
          await StatusBar.setStyle({ style: Style.Light });
        }
      } catch (e) {
        console.error('StatusBar error:', e);
      }
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

          {/* Main Content Area */}
          <main
            className={`
              w-full min-h-screen
              ${isMobile ? "" : computedPadding}
            `}
          >
            <div className="flex flex-col w-full">
              <PageTransition>
                {isMobile && Capacitor.isNativePlatform() ? (
                  <MobilePageLayout>
                    {children}
                  </MobilePageLayout>
                ) : (
                  children
                )}
              </PageTransition>

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
      <ToastContainer position="top-right mt-10" maxToasts={5} />
    </AppProviders>
  );
}
