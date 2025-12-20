import { createClient } from "@supabase/supabase-js"
let supabase = null;
function buildClient(url, key) {
  try {
    if (url && key) {
      return createClient(url, key);
    }
    return null;
  } catch (err) {
    // if createClient still throws for some reason, return null to avoid app crash
    // and optionally log for debugging
    // console.error("Failed to create supabase client:", err);
    return null;
  }
}

// run-time detection
if (typeof window !== "undefined") {
  // Client-side: use NEXT_PUBLIC variables (these are exposed to browser)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  supabase = buildClient(supabaseUrl, supabaseAnonKey);
} else {
  // Server-side: prefer server envs if available, fallback to NEXT_PUBLIC_ (less ideal)
  const supabaseUrl =
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  supabase = buildClient(supabaseUrl, supabaseKey);
}


export { supabase };
