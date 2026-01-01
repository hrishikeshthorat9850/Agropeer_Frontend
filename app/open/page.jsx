"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OpenRedirectPage() {
  const params = useSearchParams();
  const router = useRouter();

  
  useEffect(() => {
    console.log("🚀 /open page EXECUTED!");
    const type = params.get("type");
    const id = params.get("id");

    if (!type || !id) {
      router.replace("/");
      return;
    }

    // Correct navigation for Next.js + Capacitor
    router.replace(`/${type}?id=${id}`);
  }, [params, router]);

  return (
    <main className="w-full h-screen flex items-center justify-center">
      <p className="text-gray-500 text-lg font-medium">
        Opening content...
      </p>
    </main>
  );
}
