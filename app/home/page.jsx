"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileHome from "@/components/mobile/MobileHome";
export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // ✅ Correct way to detect Android in Capacitor
    const isAndroid =
      Capacitor.isNativePlatform() &&
      Capacitor.getPlatform() === "android";

    if (isAndroid) {
      <MobileHome />
    }
  }, [router]);

  return null;
}
