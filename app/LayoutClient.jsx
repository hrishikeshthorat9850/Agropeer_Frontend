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
          `capacitor-platform-${platform}`
        );
        document.body.classList.remove(`capacitor-platform-${platform}`);
      };
    }
  }, []);

  // ⭐ FIX STATUS BAR - Make it overlay and match navbar color
  useEffect(() => {
    async function applyStatusBar() {
      try {
        if (
          Capacitor.isNativePlatform() &&
          Capacitor.getPlatform() === "android"
        ) {
          // Set status bar to overlay the webview so navbar shows through
          await StatusBar.setOverlaysWebView({ overlay: true });

          // Set status bar background to match navbar gradient (green)
          await StatusBar.setBackgroundColor({ color: "#2E7D32" });

          // Use light style (white icons) for dark green navbar background
          await StatusBar.setStyle({ style: Style.Light });
        }
      } catch (e) {
        console.error("StatusBar error:", e);
      }
    }

    applyStatusBar();
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
        <TopLoader />
        <OfflineBanner />

        {/* 🔥 Popup Only on First Layout Mount */}
        {/* {showPopup && !noUIRoutes.includes(pathname) && (
          <PopupModal onClose={() => setShowPopup(false)} />
        )} */}

        {/* Main Layout Structure (Mobile Only) */}

        <>
          {/* Mobile Navbar */}
          {showNavbar && <MobileNavbar onOpenAI={() => setAiOpen(true)} />}

          {/* Main Content Area */}
          <main className={`w-full min-h-screen ${showNavbar ? "" : ""}`}>
            <div className="flex flex-col w-full">
              <PageTransition>
                {/* Always use MobilePageLayout if not explicitly native-only, but here we assume mobile behaviour */}
                <MobilePageLayout>{children}</MobilePageLayout>
              </PageTransition>
            </div>
          </main>

          {/* Mobile Bottom Nav */}
          {showNavbar && !keyboardOpen ? (
            <MobileBottomNav onAI={() => setAiOpen(true)} />
          ) : null}

          <MobileSidebar />

          {/* Chatbot */}
          {!noUIRoutes.includes(pathname) && (
            <>
              {!aiOpen && <AIChatbotButton open={aiOpen} setOpen={setAiOpen} />}
              <AIChatWindow open={aiOpen} setOpen={setAiOpen} />
            </>
          )}
        </>

        <AndroidNotificationHandler />
        <ToastContainer position="top-center" maxToasts={5} />
      </AppProviders>
    </>
  );
}
