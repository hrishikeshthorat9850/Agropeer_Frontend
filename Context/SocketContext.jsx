"use client";

import { createContext, useContext, useEffect, useState, useRef, useCallback } from "react";
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
    const userId = loggedInUser?.id;
    if (!userId) return;

    const handleReady = () => {
      // Only register when we have a valid userId so server never gets undefined
      if (!userId) return;
      socket.emit("user-online", userId);
      socket.emit("registerUser", userId);
    };

    // If already connected (tab switch / fast refresh)
    if (socket.connected) {
      handleReady();
    }

    // Otherwise wait for connect event (also runs on reconnect)
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

      const convId = msg.conversation_id != null ? String(msg.conversation_id) : null;
      if (!convId) return;

      // Add message to store
      // setMessages((prev) => ({
      //   ...prev,
      //   [convId]: prev[convId] ? [...prev[convId], msg] : [msg],
      // }));
      setMessages((prev) => {
        const existing = prev[convId] || [];

        // 🔥 DEDUP CHECK
        if (existing.some((m) => m.id === msg.id)) {
          return prev; // already have this message
        }

        return {
          ...prev,
          [convId]: [...existing, msg],
        };
      });

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
      const cid = conversation_id != null ? String(conversation_id) : null;
      if (!cid) return;
      setMessages((prev) => {
        const updated = { ...prev };
        const msgs = updated[cid];

        if (!msgs) return prev;

        updated[cid] = msgs.map((msg) =>
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

  const loadMessages = (conversationId, msgs) => {
    const cid = conversationId != null ? String(conversationId) : null;
    if (!cid) return;
    setMessages((prev) => ({
      ...prev,
      [cid]: msgs,
    }));
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

  // Clear conversation (client side emitter) — with timeout so UI never sticks on "Processing"
  const CLEAR_TIMEOUT_MS = 15000;

  const clearConversation = (conversationId) => {
    return new Promise((resolve, reject) => {
      if (!socket || !loggedInUser?.id) {
        reject(new Error("Socket or user not available"));
        return;
      }

      let settled = false;
      const finish = (err, res) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (err) reject(err);
        else resolve(res);
      };

      const timer = setTimeout(() => {
        finish(new Error("Clear request timed out. Check your connection."));
      }, CLEAR_TIMEOUT_MS);

      socket.emit(
        "clearConversation",
        { conversation_id: conversationId, user_id: loggedInUser.id },
        (resp) => {
          if (!resp) {
            finish(new Error("No response from server"));
            return;
          }
          if (resp.error) finish(new Error(resp.message || "Clear failed"));
          else finish(null, resp);
        },
      );
    });
  };

  // Delete conversation (client side emitter) — with timeout so UI never sticks on "Processing"
  const DELETE_TIMEOUT_MS = 15000;

  const deleteConversation = (conversationId) => {
    return new Promise((resolve, reject) => {
      if (!socket || !loggedInUser?.id) {
        reject(new Error("Socket or user not available"));
        return;
      }

      let settled = false;
      const finish = (err, res) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (err) reject(err);
        else resolve(res);
      };

      const timer = setTimeout(() => {
        finish(new Error("Delete request timed out. Check your connection."));
      }, DELETE_TIMEOUT_MS);

      socket.emit(
        "deleteConversation",
        { conversation_id: conversationId, user_id: loggedInUser.id },
        (resp) => {
          if (!resp) {
            finish(new Error("No response from server"));
            return;
          }
          if (resp.error) finish(new Error(resp.message || "Delete failed"));
          else finish(null, resp);
        },
      );
    });
  };

  // Update local state immediately (no event/socket) so UI clears even if event listeners miss
  const clearConversationLocal = useCallback((conversationId) => {
    const cid = conversationId != null ? String(conversationId) : null;
    if (!cid) return;
    setMessages((prev) => ({ ...prev, [cid]: [] }));
    setUnreadCounts((prev) => ({ ...prev, [cid]: 0 }));
    setActiveConversation((prev) => (prev != null && String(prev) === cid ? null : prev));
    setTypingUsers((prev) => {
      const next = { ...prev };
      delete next[cid];
      return next;
    });
  }, []);

  const deleteConversationLocal = useCallback((conversationId) => {
    const cid = conversationId != null ? String(conversationId) : null;
    if (!cid) return;
    setMessages((prev) => {
      const copy = { ...prev };
      delete copy[cid];
      return copy;
    });
    // Contacts are managed by chats page / ChatContext; they update via conversationDeletedLocal event
    setUnreadCounts((prev) => {
      const copy = { ...prev };
      delete copy[cid];
      return copy;
    });
    setActiveConversation((prev) => (prev != null && String(prev) === cid ? null : prev));
  }, []);

  /* --------------------------------------------
    🔁 8. REAL-TIME CONVERSATION EVENTS (CLEAR / DELETE)
  --------------------------------------------- */

  useEffect(() => {
    if (!socket) return;

    const handleConversationCleared = ({ conversation_id, by_user_id }) => {
      const cid = conversation_id != null ? String(conversation_id) : null;
      if (!cid) return;

      // Clear stored messages for this conversation
      setMessages((prev) => ({ ...prev, [cid]: [] }));

      // Update unread counts and active/typing state
      setUnreadCounts((prev) => ({ ...prev, [cid]: 0 }));

      setActiveConversation((prev) => (prev != null && String(prev) === cid ? null : prev));

      setTypingUsers((prev) => {
        const next = { ...prev };
        delete next[cid];
        return next;
      });
    };

    const handleConversationDeleted = ({ conversation_id, by_user_id }) => {
      const cid = conversation_id != null ? String(conversation_id) : null;
      if (!cid) return;

      // Remove cached messages
      setMessages((prev) => {
        const copy = { ...prev };
        delete copy[cid];
        return copy;
      });

      // Contacts are managed by chats page; it listens to conversationDeleted and updates its own state

      // Clean up unread counts
      setUnreadCounts((prev) => {
        const copy = { ...prev };
        delete copy[cid];
        return copy;
      });

      // If active conversation was deleted, unset it
      setActiveConversation((prev) => (prev != null && String(prev) === cid ? null : prev));
    };

    socket.on("conversationCleared", handleConversationCleared);
    socket.on("conversationDeleted", handleConversationDeleted);

    // Local events: update state immediately when user clears/deletes (optimistic UI)
    const handleConversationClearedLocal = (e) => {
      const { conversation_id } = e.detail || {};
      if (conversation_id != null) handleConversationCleared({ conversation_id });
    };
    const handleConversationDeletedLocal = (e) => {
      const { conversation_id } = e.detail || {};
      if (conversation_id != null) handleConversationDeleted({ conversation_id });
    };
    if (typeof window !== "undefined") {
      window.addEventListener("conversationClearedLocal", handleConversationClearedLocal);
      window.addEventListener("conversationDeletedLocal", handleConversationDeletedLocal);
    }

    return () => {
      socket.off("conversationCleared", handleConversationCleared);
      socket.off("conversationDeleted", handleConversationDeleted);
      if (typeof window !== "undefined") {
        window.removeEventListener("conversationClearedLocal", handleConversationClearedLocal);
        window.removeEventListener("conversationDeletedLocal", handleConversationDeletedLocal);
      }
    };
  }, [socket]);

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
        loadMessages,
        clearConversation,
        deleteConversation,
        clearConversationLocal,
        deleteConversationLocal,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
