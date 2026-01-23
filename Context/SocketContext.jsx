"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { socket } from "@/utils/socket";

const SocketContext = createContext();

export function SocketProvider({ loggedInUser, children }) {
  const [onlineUsers, setOnlineUsers] = useState({});
  const [lastSeen, setLastSeen] = useState({});
  const [messages, setMessages] = useState({});
  const [unreadCounts, setUnreadCounts] = useState({});
  const [typingUsers, setTypingUsers] = useState({});
  const [activeConversation, setActiveConversation] = useState(null);
  const selectedConversationRef = useRef(null);

  /* --------------------------------------------
    🔵 1. REGISTER USER + EMIT user-online
  --------------------------------------------- */
  useEffect(() => {
    if (!loggedInUser?.id) return;

    const handleReady = () => {
      socket.emit("user-online", loggedInUser?.id);
      socket.emit("registerUser", loggedInUser?.id);
    };

    // If already connected (tab switch / fast refresh)
    if (socket.connected) {
      handleReady();
    }

    // Otherwise wait for connect event
    socket.on("connect", handleReady);

    return () => socket.off("connect", handleReady);
  }, [loggedInUser?.id]);

  /* --------------------------------------------
    🟢 2. ONLINE STATUS + LAST SEEN TRACKING
  --------------------------------------------- */
  useEffect(() => {
    const handleOnlineStatus = (data) => {
      const { userId, online, last_seen } = data;

      setOnlineUsers((prev) => ({
        ...prev,
        [userId]: online,
      }));

      if (!online && last_seen) {
        setLastSeen((prev) => ({
          ...prev,
          [userId]: last_seen,
        }));
      }
    };

    socket.on("online-status", handleOnlineStatus);
    return () => socket.off("online-status", handleOnlineStatus);
  }, []);


  /* --------------------------------------------
    💬 3. RECEIVE MESSAGE + UNREAD COUNT
  --------------------------------------------- */
  useEffect(() => {
    if (!loggedInUser?.id) return;

    const handleReceive = (msg) => {
      // Safety checks: ensure loggedInUser and message are valid
      if (!loggedInUser?.id || !msg || !msg.conversation_id) return;

      const convId = msg.conversation_id;

      // Add message to store
      setMessages((prev) => ({
        ...prev,
        [convId]: prev[convId] ? [...prev[convId], msg] : [msg],
      }));

      // Update UNREAD count only if not current conversation
      if (activeConversation !== convId && msg.sender_id !== loggedInUser.id) {
        setUnreadCounts((prev) => ({
          ...prev,
          [convId]: (prev[convId] || 0) + 1,
        }));

        // Push notification
        showNotification(msg);
      }
    };

    socket.on("receiveMessage", handleReceive);
    return () => socket.off("receiveMessage", handleReceive);
  }, [activeConversation, loggedInUser?.id]);


  /* --------------------------------------------
    🔔 4. BROWSER PUSH NOTIFICATIONS (Web)
    📱 ANDROID LOCAL NOTIFICATIONS (Android)
  --------------------------------------------- */
  const showNotification = async (msg) => {
    // Check if Android platform
    try {
      const { isAndroidPlatform } = await import('@/utils/capacitorNotifications');
      const isAndroid = await isAndroidPlatform();

      if (isAndroid) {
        // Use Android local notifications
        const { sendAndroidLocalNotification } = await import('@/lib/androidNotificationService');
        await sendAndroidLocalNotification(loggedInUser?.id, {
          title: "New Message",
          body: msg.content,
          data: {
            type: 'chat_message',
            conversationId: msg?.conversation_id,
            senderId: msg?.sender_id,
            messageId: msg?.id,
          },
        });
        return;
      }
    } catch (error) {
      // If Android check fails, fall back to web notifications
      console.warn('Android notification check failed, using web notifications:', error);
    }

    // Web browser notifications (existing code - unchanged)
    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {
      new Notification("New Message", {
        body: msg.content,
      });
    }
  };

  useEffect(() => {
    // Request notification permissions
    async function requestPermissions() {
      try {
        const { isAndroidPlatform, requestAndroidNotificationPermission } = await import('@/utils/capacitorNotifications');
        const isAndroid = await isAndroidPlatform();

        if (isAndroid) {
          // Request Android notification permission
          await requestAndroidNotificationPermission();
        } else {
          // Request web notification permission (existing code - unchanged)
          if (Notification.permission !== "granted") {
            Notification.requestPermission();
          }
        }
      } catch (error) {
        // Fallback to web notifications if Android check fails
        if (Notification.permission !== "granted") {
          Notification.requestPermission();
        }
      }
    }

    requestPermissions();
  }, []);

  /* --------------------------------------------
    👀 5. MESSAGE SEEN + CLEAR UNREAD COUNT
  --------------------------------------------- */
  useEffect(() => {
    const handleSeen = ({ conversation_id, seen_message_ids }) => {
      setMessages((prev) => {
        const updated = { ...prev };
        const msgs = updated[conversation_id];

        if (!msgs) return prev;

        updated[conversation_id] = msgs.map((msg) =>
          seen_message_ids.includes(msg.id)
            ? { ...msg, read_at: new Date().toISOString() }
            : msg
        );

        return updated;
      });
    };

    socket.on("messagesSeen", handleSeen);
    return () => socket.off("messagesSeen", handleSeen);
  }, []);


  /* --------------------------------------------
    ✍️ 6. TYPING INDICATOR
  --------------------------------------------- */
  useEffect(() => {
    const handleTyping = ({ conversation_id, user_id, isTyping }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [conversation_id]: {
          ...prev[conversation_id],
          [user_id]: isTyping,
        },
      }));
    };

    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
  }, []);

  /* --------------------------------------------
    🌟 7. ACTIONS
  --------------------------------------------- */

  const markAsRead = (conversationId) => {
    if (!loggedInUser?.id) return;
    // Dispatch custom browser event BEFORE emitting to server for immediate count update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('markAsReadCalled', {
        detail: {
          conversation_id: conversationId,
          reader_id: loggedInUser.id,
        }
      }));
    }
    socket.emit("markAsRead", {
      conversation_id: conversationId,
      reader_id: loggedInUser.id,
    });
  };

  const joinConversation = (conversationId) => {
    if (!conversationId || !loggedInUser?.id) return;
    selectedConversationRef.current = conversationId;
    setActiveConversation(conversationId);

    socket.emit("join_conversation", conversationId);

    // Reset unread count when opening chat
    setUnreadCounts((prev) => ({
      ...prev,
      [conversationId]: 0,
    }));

    // Mark messages as read on opening chat - use markAsRead function to dispatch browser event
    markAsRead(conversationId);
  };

  const sendMessage = (payload) => {
    socket.emit("sendMessage", payload);
  };

  const sendTyping = (conversationId, isTyping) => {
    if (!loggedInUser?.id) return;
    socket.emit("typing", {
      conversation_id: conversationId,
      user_id: loggedInUser.id,
      isTyping,
    });
  };

  const findOrCreateConversation = (payload) => {
    return new Promise((resolve, reject) => {
      if (!socket) {
        reject(new Error("Socket not initialized"));
        return;
      }

      const timeout = setTimeout(() => {
        reject(new Error("Request timed out"));
      }, 5000);

      socket.emit("findOrCreateConversation", payload, (response) => {
        clearTimeout(timeout);
        if (!response) {
          reject(new Error("No response from server"));
          return;
        }

        if (response.error) {
          reject(response);
        } else {
          resolve(response);
        }
      });
    });
  };


  return (
    <SocketContext.Provider
      value={{
        socket,
        onlineUsers,
        messages,
        typingUsers,
        lastSeen,
        unreadCounts,
        activeConversation,
        joinConversation,
        sendMessage,
        markAsRead,
        sendTyping,
        findOrCreateConversation,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
