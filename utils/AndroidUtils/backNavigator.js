export function resolveBackAction({ pathname, state }) {
  if (pathname === "/") {
    return { action: "exit" };
  }

  if (pathname === "/chats" && !state.isChatSidebarOpen) {
    return { action: "openChatSidebar" };
  }

  if (pathname === "/news") {
    return { action: "goHome" };
  }

  return { action: "back" };
}
