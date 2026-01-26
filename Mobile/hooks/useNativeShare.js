import { Share } from "@capacitor/share";
import { Capacitor } from "@capacitor/core";
import { Toast } from "@capacitor/toast";

export function useNativeShare() {
  const share = async ({ title, text, url, dialogTitle = "Share" }) => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title,
          text,
          url,
          dialogTitle,
        });
      } else {
        // Web Fallback
        if (navigator.share) {
          await navigator.share({ title, text, url });
        } else {
          // Fallback to clipboard
          await navigator.clipboard.writeText(url || text);
          // Optional: Show a web toast here if needed
          console.log("Copied to clipboard");
        }
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  return { share };
}
