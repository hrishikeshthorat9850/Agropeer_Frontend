"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";
import { io } from "socket.io-client";
import { SocketProvider, useSocket } from "@/Context/SocketContext";

export function useUnreadMessagesCount() {
  const {socket, activeConversation} = useSocket();
  const { user: loggedInUser, loading } = useLogin();
  const [totalUnreadCount, setTotalUnreadCount] = useState(0);
  const conversationUnreadCountsRef = useRef({}); // Track unread counts per conversation

  // Fetch unread count for a specific conversation
  const fetchConversationUnreadCount = useCallback(async (conversationId) => {
    if (!loggedInUser?.id || !conversationId || loading) return 0;

    try {
      const { count, error } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", loggedInUser.id)
        .is("read_at", null);

      if (error) {
        console.error("❌ Error fetching conversation unread count:", error);
        return 0;
      }

      const countValue = count ?? 0;
      conversationUnreadCountsRef.current[conversationId] = countValue;
      return countValue;
    } catch (error) {
      console.error("❌ Error in fetchConversationUnreadCount:", error);
      return 0;
    }
  }, [loggedInUser?.id, loading]);

  // Fetch total unread count from database
  const fetchTotalUnreadCount = useCallback(async () => {
    if (!loggedInUser?.id || loading) return;

    try {
      // Get all non-deleted conversations for this user
      const { data: conversations, error: convError } = await supabase
        .from("conversations")
        .select("id")
        .or(`user1_id.eq.${loggedInUser.id},user2_id.eq.${loggedInUser.id}`)
        .is("deleted_at", null);

      if (convError) {
        console.error("❌ Error fetching conversations:", convError);
        return;
      }

      if (!conversations || conversations.length === 0) {
        setTotalUnreadCount(0);
        return;
      }

      // Get unread count for all conversations (exclude soft-deleted messages)
      const conversationIds = conversations.map((conv) => conv.id);
      const { count, error: countError } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .in("conversation_id", conversationIds)
        .neq("sender_id", loggedInUser.id)
        .is("read_at", null)
        .is("deleted_at", null);

      if (countError) {
        console.error("❌ Error fetching unread count:", countError);
        return;
      }

      setTotalUnreadCount(count ?? 0);
    } catch (error) {
      console.error("❌ Error in fetchTotalUnreadCount:", error);
    }
  }, [loggedInUser?.id, loading]);

  useEffect(() => {
    if (loading) return;
    if (!loggedInUser?.id) {
      setTotalUnreadCount(0);
      return;
    }

    // Register user with socket
    socket.emit("registerUser", loggedInUser.id);

    // Fetch initial count
    fetchTotalUnreadCount();

    // Listen for new messages
    const handleReceiveMessage = (msgg) => {
      // Only increment if message is from someone else AND not in active conversation
      if (msgg.sender_id !== loggedInUser.id && msgg.conversation_id !== activeConversation) {
        setTotalUnreadCount((prev) => Math.max(0, prev + 1));
        // Update the tracked count for this conversation
        conversationUnreadCountsRef.current[msgg.conversation_id] = 
          (conversationUnreadCountsRef.current[msgg.conversation_id] || 0) + 1;
      }
    };

    // Listen for messages being marked as read
    const handleMessagesSeen = ({ unread_count, conversation_id, reader_id }) => {
      // If I'm the one who read messages, update count
      if (reader_id === loggedInUser.id) {
        // Update the tracked count for this conversation
        const previousCount = conversationUnreadCountsRef.current[conversation_id] || 0;
        const newCount = unread_count ?? 0;
        const difference = previousCount - newCount;
        
        // Optimistically update the total if we know the difference
        if (difference > 0) {
          setTotalUnreadCount((prev) => Math.max(0, prev - difference));
        }
        
        // Update the ref
        conversationUnreadCountsRef.current[conversation_id] = newCount;
        
        // Also fetch the actual total to correct any discrepancies
        setTimeout(() => fetchTotalUnreadCount(), 500);
        setTimeout(() => fetchTotalUnreadCount(), 1000);
      }
    };

    // Listen for when markAsRead is called (optimistic update via browser event)
    const handleMarkAsRead = async (event) => {
      const { conversation_id } = event.detail || {};
      if (conversation_id) {
        // Immediately fetch the unread count for this conversation BEFORE server processes it
        const conversationUnreadCount = await fetchConversationUnreadCount(conversation_id);
        
        // Optimistically subtract this conversation's unread count from total
        if (conversationUnreadCount > 0) {
          setTotalUnreadCount((prev) => Math.max(0, prev - conversationUnreadCount));
          // Update the ref to track that this conversation is now read
          conversationUnreadCountsRef.current[conversation_id] = 0;
        }
        
        // Then fetch the actual total multiple times to correct any discrepancies
        setTimeout(() => fetchTotalUnreadCount(), 500);
        setTimeout(() => fetchTotalUnreadCount(), 1000);
        setTimeout(() => fetchTotalUnreadCount(), 2000);
      }
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messagesSeen", handleMessagesSeen);
    window.addEventListener("markAsReadCalled", handleMarkAsRead);

    // Refresh count when window gains focus (user returns to tab)
    const handleFocus = () => {
      fetchTotalUnreadCount();
    };
    window.addEventListener("focus", handleFocus);

    // Refresh count every 30 seconds to stay in sync
    const interval = setInterval(fetchTotalUnreadCount, 30000);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messagesSeen", handleMessagesSeen);
      window.removeEventListener("markAsReadCalled", handleMarkAsRead);
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, [loggedInUser?.id, loading, fetchTotalUnreadCount, fetchConversationUnreadCount, activeConversation]);
  return totalUnreadCount;
}
