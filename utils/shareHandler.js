import { Capacitor } from "@capacitor/core";
import { Share } from "@capacitor/share";

export async function shareContent({ title, text, postId }) {
  const safeText = String(text || "")
    .replace(/[\r\n]+/g, "\n")   // normalize newlines
    .replace(/[`"]/g, "'")       // prevent breaking JS strings
    .trim();

  const appLink = `agropeer://posts?id=${postId}`;
  const webLink = `https://agrogram-wheat.vercel.app/posts?id=${postId}`;

  try {
    await Share.share({
      title: title || "Farm Post",
      text: `${safeText}\n\n🔗 Open in app → ${appLink}`,
      url: webLink,
      dialogTitle: "Share with..."
    });

    return { success: true };
  } catch (err) {
    console.log("❌ Share Error:", err);
    return { success: false, error: err.message };
  }
}

