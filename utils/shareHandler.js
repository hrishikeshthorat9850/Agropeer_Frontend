import { Share } from "@capacitor/share";

export async function shareContent({ title, text, id,route }) {
  const safeText = String(text || "")
    .replace(/[\r\n]+/g, "\n")   // normalize newlines
    .replace(/[`"]/g, "'")       // prevent breaking JS strings
    .trim();

  const appLink = `agropeer://${route}?id=${id}`;
  const webLink = `https://agrogram-wheat.vercel.app/${route}?id=${id}`;

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

