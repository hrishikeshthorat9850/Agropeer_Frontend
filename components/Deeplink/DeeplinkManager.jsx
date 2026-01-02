"use client";
import { useEffect } from "react";
import { App } from "@capacitor/app";
import { useRouter } from "next/navigation";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { supabase } from "@/lib/supabaseClient";
import { resolveBackAction } from "@/utils/AndroidUtils/backNavigator";

export default function DeepLinkManager({navState}) {
  const router = useRouter();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
/* ─────────────────────────────
       🔙 ANDROID BACK BUTTON
    ───────────────────────────── */
    const backListener = App.addListener("backButton", () => {
      const pathname = window.location.pathname;

      const result = resolveBackAction({
        pathname,
        state: navState,
      });

      switch (result.action) {
        case "exit":
          App.exitApp();
          break;

        case "openChatSidebar":
          navState.setChatSidebarOpen(true);
          break;

        case "goHome":
          router.replace("/home");
          break;

        default:
          router.back();
      }
    });
    
    const listener = App.addListener("appUrlOpen", async ({ url }) => {
      if (!url) return;
      console.log("📩 Deep link:", url);

      // Normalize
      const clean = url
        .replace("agropeer://", "https://dplink/")
        .replace("com.hrishikesh.agrogram://", "https://dplink/");

      const parsed = new URL(clean);
      const pathname = parsed.pathname;
      const query = parsed.search;

      /* ───────────────────────────────────────────
         🔐 1) OAUTH HASH TOKEN FLOW
      ─────────────────────────────────────────── */
      if (url.includes("login-callback") && url.includes("#access_token")) {
        console.log("🔑 OAuth hash callback detected");
        try { await Browser.close(); } catch {}

        const oauthUrl = new URL(url.replace("agropeer://", "https://callback/"));
        const hashParams = new URLSearchParams(oauthUrl.hash.substring(1));
        const access_token = hashParams.get("access_token");
        const refresh_token = hashParams.get("refresh_token");

        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          if (!error) {
            console.log("✅ OAuth session set");
            router.replace("/home");
            return; // ❗ STOP EXECUTION HERE
          }

          console.error("❌ setSession failed:", error);
          router.replace("/login?error=oauth_failed");
          return;
        }
      }

      /* ───────────────────────────────────────────
         🔁 2) OAUTH PKCE (?code=)
      ─────────────────────────────────────────── */
      if (url.includes("login-callback") && parsed.searchParams.has("code")) {
        const code = parsed.searchParams.get("code");
        console.log("🔁 OAuth PKCE code detected");
        try {
          await supabase.auth.exchangeCodeForSession(code);
          router.replace("/home");
          return; // ❗ STOP HERE
        } catch {
          router.replace("/login?error=oauth_exchange_failed");
          return;
        }
      }

      /* ───────────────────────────────────────────
         🔑 3) RESET PASSWORD
      ─────────────────────────────────────────── */
      if (pathname.includes("reset-password")) {
        console.log("🛠 Reset password deep link");

        try { await Browser.close(); } catch {}
        const hash = parsed.hash?.substring(1) || "";
        const code = parsed.searchParams.get("code");

        if (code) {
          console.log("🔁 PKCE Reset Flow");
          try {
            await supabase.auth.exchangeCodeForSession(code);
            router.replace("/reset-password");
            return;
          } catch {
            router.replace("/login?error=reset_exchange_failed");
            return;
          }
        }

        if (hash.includes("access_token")) {
          window.location.hash = "#" + hash;
          await new Promise(res => setTimeout(res, 200));
          const { data } = await supabase.auth.getSession();

          if (data?.session) {
            router.replace("/reset-password");
            return;
          }

          router.replace("/login?error=invalid_reset_token");
          return;
        }

        router.replace("/reset-password");
        return; // ❗ Critical to prevent fallback routing
      }

      /* ───────────────────────────────────────────
         🚀 4) UNIVERSAL FALLBACK ROUTING
      ─────────────────────────────────────────── */
      router.replace(`${pathname}${query}`);
      return;
    });

    return () => listener.then(l => l.remove());
  }, [router,navState]);

  return null;
}
