"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function AdminNotificationsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchNotifications();
  }, [router]);

  async function fetchNotifications() {
    try {
      // Assuming there's a notifications table or fcm_tokens table
      const { data, error } = await supabase
        .from("fcm_tokens")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      showToast("error", "Failed to fetch notification tokens");
      // If table doesn't exist, show empty state
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm("Are you sure you want to delete this notification token?"))
      return;
    try {
      const { error } = await supabase
        .from("fcm_tokens")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      showToast("success", "Notification token deleted successfully! 🗑️");
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
      showToast("error", "Failed to delete notification token");
    }
  }

  const columns = [
    {
      header: "User ID",
      accessor: (item) => item.user_id || "Anonymous",
    },
    {
      header: "Token",
      accessor: (item) =>
        item.token?.substring(0, 30) + "..." || "N/A",
    },
    {
      header: "Device Type",
      accessor: (item) => {
        const type = item.device_type || "web";
        return type.charAt(0).toUpperCase() + type.slice(1);
      },
    },
    {
      header: "Created",
      accessor: (item) =>
        item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Last Updated",
      accessor: (item) =>
        item.updated_at
          ? new Date(item.updated_at).toLocaleDateString()
          : "N/A",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Notifications Management
          </h1>
          <p className="text-gray-600 mt-2">
            View and manage FCM notification tokens
          </p>
        </div>

        <AdminDataTable
          data={notifications}
          columns={columns}
          onDelete={handleDelete}
          loading={loading}
          searchPlaceholder="Search notifications by user ID..."
        />
      </div>
    </AdminLayout>
  );
}

