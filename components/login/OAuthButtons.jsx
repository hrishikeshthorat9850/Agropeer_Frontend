// "use client";
// import { useState, useEffect } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { FaGoogle, FaFacebook } from "react-icons/fa";
// import { Capacitor } from "@capacitor/core";
// import { Browser } from "@capacitor/browser";
// import { App } from "@capacitor/app";
// export default function OAuthButtons({ mode = "login" }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState({ google: false, facebook: false });
//   const [error, setError] = useState("");
//   const isNative = Capacitor.isNativePlatform();

//   // Listen for app URL events (when OAuth redirects back to app)
//   useEffect(() => {
//     if (!isNative) return;

//     const handleAppUrl = async ({ url }) => {
//       console.log("App URL opened:", url);
      
//       // Check if this is an OAuth callback
//       if (url.includes('/auth/callback') || url.includes('access_token') || url.includes('#access_token') || url.includes('code=')) {
//         try {
//           // Close the browser if it's open
//           try {
//             await Browser.close();
//           } catch (e) {
//             // Browser might already be closed, ignore
//           }
          
//           // Parse the URL - handle both custom scheme and regular URLs
//           let cleanUrl = url;
//           if (url.startsWith('com.hrishikesh.agrogram://')) {
//             // Convert custom scheme to regular URL for parsing
//             cleanUrl = url.replace('com.hrishikesh.agrogram://', 'https://');
//           }
          
//           const parsedUrl = new URL(cleanUrl);
          
//           // Extract hash parameters (Supabase uses hash for tokens)
//           const hash = parsedUrl.hash.substring(1);
          
//           // Handle the OAuth callback
//           if (hash && (hash.includes('access_token') || hash.includes('code='))) {
//             // Set the URL hash in the current window so Supabase can read it
//             window.location.hash = hash;
            
//             // Wait a moment for hash to be set
//             await new Promise(resolve => setTimeout(resolve, 200));
            
//             // Supabase will handle the session automatically
//             const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
//             if (sessionError) {
//               console.error("Session error:", sessionError);
//               throw sessionError;
//             }
            
//             // Check if user is authenticated
//             const { data: { user }, error: userError } = await supabase.auth.getUser();
            
//             if (userError) {
//               console.error("User error:", userError);
//               throw userError;
//             }
            
//             if (user) {
//               setLoading({ google: false, facebook: false });
//               router.push("/home");
//             } else {
//               setLoading({ google: false, facebook: false });
//               router.push("/login");
//             }
//           } else {
//             // If no hash, navigate to callback page which will handle it
//             router.push('/auth/callback?' + parsedUrl.search.substring(1));
//           }
//         } catch (err) {
//           console.error("OAuth callback error:", err);
//           setError("Failed to complete login. Please try again.");
//           setLoading({ google: false, facebook: false });
//         }
//       }
//     };

//     // Listen for app URL events
//     const listener = App.addListener('appUrlOpen', handleAppUrl);

//     return () => {
//       listener.then(l => l.remove());
//     };
//   }, [isNative, router]);

//   const handleOAuthLogin = async (provider) => {
//     setError("");
//     setLoading((prev) => ({ ...prev, [provider]: true }));

//     try {
//       const redirectUrl = Capacitor.isNativePlatform() ? "agropeer://login-callback" : `${window.location.origin}/auth/callback`;

//       // --- Start OAuth flow
//       const { data, error } = await supabase.auth.signInWithOAuth({
//         provider,
//         options: {
//           redirectTo: redirectUrl,
//           skipBrowserRedirect: Capacitor.isNativePlatform(),
//           queryParams: provider === "google" ? {
//             access_type: "offline",
//             prompt: "consent",
//           } : {},
//         },
//       });

//       if (error) throw error;

//       // For native apps, open OAuth URL in Capacitor Browser (in-app browser)
//       if (isNative && data.url) {
//         // Open in-app browser with OAuth URL
//         // The browser will handle the OAuth flow and redirect back to our callback URL
//         await Browser.open({
//           url: data.url,
//           windowName: '_self',
//           toolbarColor: '#2E7D32',
//         });
        
//         // Don't set loading to false here - it will be handled by the callback listener
//         // The appUrlOpen listener will catch the redirect and handle authentication
//       } else {
//         // For web, redirect to OAuth provider
//         window.location.href = data.url;
//         setLoading((prev) => ({ ...prev, [provider]: false }));
//       }

//     } catch (err) {
//       console.error("OAuth error:", err);
//       setError(err.message || "OAuth login failed");
//       setLoading((prev) => ({ ...prev, [provider]: false }));
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* Material Design 3 OAuth Buttons */}
//       <div className="grid grid-cols-2 gap-3">
//         {/* Google Button */}
//         <motion.button
//           type="button"
//           onClick={() => handleOAuthLogin("google")}
//           disabled={loading.google || loading.facebook}
//           whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.96 }}
//           className="
//             flex items-center justify-center gap-2.5
//             px-4 py-3 rounded-xl border-2
//             bg-white dark:bg-gray-700
//             border-gray-300 dark:border-gray-600
//             hover:bg-gray-50 dark:hover:bg-gray-600
//             active:bg-gray-100 dark:active:bg-gray-500
//             transition-all duration-200
//             disabled:opacity-50 disabled:cursor-not-allowed
//             shadow-sm hover:shadow-md
//           "
//         >
//           {loading.google ? (
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
//           ) : (
//             <>
//               <FaGoogle className="text-xl text-red-500" />
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
//                 Google
//               </span>
//             </>
//           )}
//         </motion.button>

//         {/* Facebook Button */}
//         <motion.button
//           type="button"
//           onClick={() => handleOAuthLogin("facebook")}
//           disabled={loading.google || loading.facebook}
//           whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.96 }}
//           className="
//             flex items-center justify-center gap-2.5
//             px-4 py-3 rounded-xl border-2
//             bg-white dark:bg-gray-700
//             border-gray-300 dark:border-gray-600
//             hover:bg-gray-50 dark:hover:bg-gray-600
//             active:bg-gray-100 dark:active:bg-gray-500
//             transition-all duration-200
//             disabled:opacity-50 disabled:cursor-not-allowed
//             shadow-sm hover:shadow-md
//           "
//         >
//           {loading.facebook ? (
//             <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
//           ) : (
//             <>
//               <FaFacebook className="text-xl text-blue-600" />
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
//                 Facebook
//               </span>
//             </>
//           )}
//         </motion.button>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-3"
//         >
//           <p className="text-red-700 dark:text-red-300 text-sm font-medium text-center">{error}</p>
//         </motion.div>
//       )}
//     </div>
//   );

// }


"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export default function OAuthButtons() {
  const [loading, setLoading] = useState({ google: false, facebook: false });
  const [error, setError] = useState("");

  const isNative = Capacitor.isNativePlatform();

  const handleOAuthLogin = async (provider) => {
    setError("");
    setLoading((p) => ({ ...p, [provider]: true }));

    try {
      // For Android native apps, use production URL instead of localhost
      // Supabase will redirect to this URL, and our callback page will handle the session
      // For web, use current origin
      let redirectTo;
      if (isNative) {
        // Use production URL for Android to avoid localhost connection issues
        let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://agrogram-wheat.vercel.app";
        
        // Handle Vercel URL format (might not include protocol)
        if (process.env.NEXT_PUBLIC_VERCEL_URL && !baseUrl.includes("://")) {
          baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
        }
        
        // Ensure URL has protocol
        if (!baseUrl.startsWith("http")) {
          baseUrl = `https://${baseUrl}`;
        }
        
        // redirectTo = `${baseUrl}/auth/callback`;
        redirectTo = "agropeer://login-callback";
      } else {
        // For web, use current origin (handles localhost for dev)
        const redirectTo = isNative
          ? "agropeer://login-callback"
          : `${window.location.origin}/auth/callback`;
      }

      console.log("OAuth started. Native:", isNative);
      console.log("Redirect URL:", redirectTo);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          skipBrowserRedirect: isNative,
        },
      });

      if (error) throw error;

      if (isNative && data?.url) {
        // Open OAuth URL in in-app browser
        await Browser.open({ 
          url: data.url,
          windowName: '_self',
          toolbarColor: '#2E7D32'
        });
        // Don't set loading to false here - MobileOAuthHandler will handle the callback
      } else if (data?.url) {
        window.location.href = data.url;
        setLoading((p) => ({ ...p, [provider]: false }));
      }

    } catch (err) {
      console.error("OAuth error:", err);
      setError(err.message || "OAuth failed");
      setLoading((p) => ({ ...p, [provider]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Material Design 3 OAuth Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Google Button */}
        <motion.button
          type="button"
          onClick={() => handleOAuthLogin("google")}
          disabled={loading.google || loading.facebook}
          whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.96 }}
          className="
            flex items-center justify-center gap-2.5
            px-4 py-3 rounded-xl border-2
            bg-white dark:bg-gray-700
            border-gray-300 dark:border-gray-600
            hover:bg-gray-50 dark:hover:bg-gray-600
            active:bg-gray-100 dark:active:bg-gray-500
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md
          "
        >
          {loading.google ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
          ) : (
            <>
              <FaGoogle className="text-xl text-red-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                Google
              </span>
            </>
          )}
        </motion.button>

        {/* Facebook Button */}
        <motion.button
          type="button"
          onClick={() => handleOAuthLogin("facebook")}
          disabled={loading.google || loading.facebook}
          whileTap={{ scale: loading.google || loading.facebook ? 1 : 0.96 }}
          className="
            flex items-center justify-center gap-2.5
            px-4 py-3 rounded-xl border-2
            bg-white dark:bg-gray-700
            border-gray-300 dark:border-gray-600
            hover:bg-gray-50 dark:hover:bg-gray-600
            active:bg-gray-100 dark:active:bg-gray-500
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md
          "
        >
          {loading.facebook ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-transparent"></div>
          ) : (
            <>
              <FaFacebook className="text-xl text-blue-600" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:inline">
                Facebook
              </span>
            </>
          )}
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 dark:bg-red-900/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-3"
        >
          <p className="text-red-700 dark:text-red-300 text-sm font-medium text-center">{error}</p>
        </motion.div>
      )}
    </div>
  );
}
