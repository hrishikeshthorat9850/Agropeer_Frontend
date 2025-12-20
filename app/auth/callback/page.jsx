"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const finish = async () => {
      // Supabase reads hash tokens and sets session automatically
      await supabase.auth.getSession();

      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        router.replace("/home");  // Or wherever you want
      } else {
        router.replace("/login");
      }
    };

    finish();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoadingSpinner />
    </div>
  );
}
