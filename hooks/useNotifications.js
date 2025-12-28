import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

/**
 * Hook to fetch notifications for the current user
 * @param {string} userId - User ID
 * @param {number} limit - Maximum number of notifications to fetch (default: 30)
 */
export function useNotifications(userId, limit = 30) {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchNotifications() {
      try {
        setLoading(true);
        setError(null);

        // Fetch notifications for user
        const { data, error: fetchError } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(limit);

        if (fetchError) {
          // If table doesn't exist, return empty array
          if (fetchError.code === '42P01' || fetchError.message.includes('does not exist')) {
            console.warn('Notifications table does not exist yet');
            setNotifications([]);
            setUnreadCount(0);
            setLoading(false);
            return;
          }
          throw fetchError;
        }

        setNotifications(data || []);

        // Count unread notifications
        const unread = (data || []).filter(n => !n.seen).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(err.message);
        setNotifications([]);
        setUnreadCount(0);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();

    // Set up real-time subscription for new notifications
    const channel = supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => [payload.new, ...prev].slice(0, limit));
          setUnreadCount((prev) => prev + 1);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => {
            const updated = prev.map((n) => (n.id === payload.new.id ? payload.new : n));
            // Recalculate unread count from the updated notifications array to ensure accuracy
            const unread = updated.filter(n => !n.seen).length;
            setUnreadCount(unread);
            return updated;
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE', // 🔥 Add this
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotifications((prev) => {
            const updated = prev.filter((n) => n.id !== payload.old.id);
            // Recalculate count based on the remaining notifications
            setUnreadCount(updated.filter(n => !n.seen).length);
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, limit]);

  return { notifications, unreadCount, loading, error };
}

/**
 * Mark notifications as read
 * @param {string} userId - User ID
 * @param {string[]} notificationIds - Array of notification IDs to mark as read (optional, if not provided marks all)
 */
export async function markNotificationsAsRead(userId, notificationIds = null) {
  try {
    if (!userId) return { success: false, error: 'User ID required' };

    let query = supabase
      .from('notifications')
      .update({ seen: true })
      .eq('user_id', userId)
      .eq('seen', false);

    if (notificationIds && notificationIds.length > 0) {
      query = query.in('id', notificationIds);
    }

    const { error } = await query;

    if (error) {
      // If table doesn't exist, return success (no-op)
      if (error.code === '42P01' || error.message.includes('does not exist')) {
        return { success: true };
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    return { success: false, error: error.message };
  }
}

export async function markSingleNotificationAsRead(notificationId) {
  const { error } = await supabase
    .from("notifications")
    .update({ seen: true })
    .eq("id", notificationId);

  if (error) console.error("Error marking notification:", error);
}
