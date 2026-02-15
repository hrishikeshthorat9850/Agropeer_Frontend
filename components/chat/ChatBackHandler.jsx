"use client";

import { usePathname, useRouter } from "next/navigation";
import { useBackPress } from "@/Context/BackHandlerContext";
import { playBackAnimation } from "@/utils/backTransition";

/**
 * Registers a back handler when on /selected-chat (ChatArea) so that
 * Android back goes to /chats (chat list) instead of history.back() which
 * can land on home if user opened chat via deep link.
 * Must be rendered inside BackHandlerProvider (e.g. inside AppProviders).
 */
export default function ChatBackHandler() {
  const pathname = usePathname();
  const router = useRouter();

  const normalized =
    pathname?.endsWith("/") && pathname?.length > 1
      ? pathname.slice(0, -1)
      : pathname || "";
  const isSelectedChat = normalized === "/selected-chat";

  useBackPress(
    () => {
      if (normalized === "/selected-chat") {
        playBackAnimation(() => router.replace("/chats"));
        return true;
      }
      return false;
    },
    25,
    isSelectedChat,
  );

  return null;
}
