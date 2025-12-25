"use client";


import { usePathname, useRouter } from "next/navigation";
import AppProviders from "./AppProviders";
import { StatusBar, Style } from "@capacitor/status-bar";
import Navbar from "../components/Navbar";
import TopLoader from "../components/TopLoader";
import OfflineBanner from "../components/OfflineBanner";
import PageTransition from "../components/PageTransition";
import Footer from "../components/home/Footer";
import { Browser } from "@capacitor/browser";
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
import { useKeyboardOpen } from "@/Mobile/hooks/useKeyboardOpen";
// 🔥 ADD YOUR POPUP MODAL HERE
import PopupModal from "@/components/popup/PopupModal";
import { App } from "@capacitor/app";
import { supabase } from "@/lib/supabaseClient";
import { setupAndroidNotificationChannel } from "@/utils/capacitorNotifications";
export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const keyboardOpen = useKeyboardOpen();

  const [isMobile, setIsMobile] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  // 🔥 Popup State → Always show on fresh load
  const [showPopup, setShowPopup] = useState(true);

  const noUIRoutes = ["/login", "/signup", "/register", "/admin/login", "/forgot-password"];
  const showNavbar = !noUIRoutes.includes(pathname);
  const isChatsPage = pathname.startsWith("/chats");

  useEffect(() => {
    if(Capacitor.isNativePlatform()){
      setupAndroidNotificationChannel();  // 📢 Create channel when app loads
    }
  }, []);
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const sub = App.addListener("appUrlOpen", async ({ url }) => {
      console.log("🔗 Deep link received:", url);

      if (!url.includes("login-callback")) return;

      // Convert scheme URL to parsable URL
      const parsed = new URL(
        url.replace("agropeer://", "https://callback/")
      );

      const hashParams = new URLSearchParams(parsed.hash.substring(1));

      const access_token = hashParams.get("access_token");
      const refresh_token = hashParams.get("refresh_token");
      const expires_in = hashParams.get("expires_in");

      if (!access_token || !refresh_token) {
        console.error("❌ Tokens missing in hash");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error("❌ setSession failed:", error);
        window.location.replace("/login?error=oauth_failed");
        return;
      }

      try {
        await Browser.close();
      } catch { }

      window.location.replace("/home");
    });

    return () => {
      sub.then((h) => h.remove());
    };
  }, []);

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
              w-full min-h-screen mt-[-33px]
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
          {isMobile && showNavbar && !keyboardOpen ?
            (
              <MobileBottomNav onAI={() => setAiOpen(true)} />
            ) : null}

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
