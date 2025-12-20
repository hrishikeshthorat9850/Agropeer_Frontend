"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function AdminUsersPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchUsers();
  }, [router]);

  async function fetchUsers() {
    try {
      // Note: This requires admin privileges. In production, use a server-side API route
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      setUsers(data?.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      // Fallback: Try to get users from a custom table if available
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .limit(100);
        if (!error && data) {
          setUsers(data);
        }
      } catch (e) {
        console.error("Fallback fetch failed:", e);
      }
      showToast("error", "Failed to fetch users. Admin API may not be available.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Are you sure you want to delete user ${item.email}?`))
      return;
    try {
      // Note: This requires admin privileges
      const { error } = await supabase.auth.admin.deleteUser(item.id);
      if (error) throw error;
      showToast("success", "User deleted successfully! 👤");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("error", "Failed to delete user. Admin privileges required.");
    }
  }

  const columns = [
    {
      header: "Email",
      accessor: (item) => item.email || item.user_email || "N/A",
    },
    {
      header: "Name",
      accessor: (item) =>
        item.user_metadata?.full_name ||
        item.full_name ||
        item.name ||
        "N/A",
    },
    {
      header: "Role",
      accessor: (item) =>
        item.user_metadata?.role ||
        item.app_metadata?.role ||
        item.role ||
        "User",
    },
    {
      header: "Created",
      accessor: (item) =>
        item.created_at
          ? new Date(item.created_at).toLocaleDateString()
          : "N/A",
    },
    {
      header: "Last Sign In",
      accessor: (item) =>
        item.last_sign_in_at
          ? new Date(item.last_sign_in_at).toLocaleDateString()
          : "Never",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Users & Farmers Management
          </h1>
          <p className="text-gray-600 mt-2">View and manage all registered users</p>
        </div>

        <AdminDataTable
          data={users}
          columns={columns}
          onDelete={handleDelete}
          loading={loading}
          searchPlaceholder="Search users by email or name..."
        />
      </div>
    </AdminLayout>
  );
}

