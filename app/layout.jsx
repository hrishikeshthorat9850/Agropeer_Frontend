"use  client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./LayoutClient";
import AppShell from "@/components/mobile/AppShell";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AgroPeer - Grow Together",
  description: "AgroPeer Description",
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "any", type: "image/png" }, // Primary fallback
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/favicon.png", sizes: "180x180", type: "image/png" }, // Fallback
    ],
    shortcut: "/favicon.ico",
    other: [
      {
        rel: "icon",
        url: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <ClientLayout><AppShell>{children}</AppShell></ClientLayout>
      </body>
    </html>
  );
}
