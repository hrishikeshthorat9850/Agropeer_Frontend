"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/Context/logincontext";
import MobileHome from "@/components/mobile/MobileHome";
// import Loader from "@/components/Loader";

export default function RootPage() {
  const router = useRouter();
  const { user, loading } = useLogin();
  const [isMobile, setIsMobile] = useState(null);

  // Detect device size
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (loading || isMobile === null) return;

    // 🔥 Don't interfere with OAuth return
    if (window.location.pathname === "/auth/callback") return;

    if (user && !isMobile) {
      router.replace("/home");
    }

  }, [loading, user, isMobile, router]);

  if (user && isMobile) return <MobileHome />;

  return null;
}
