"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { supabase } from "@/lib/supabaseClient";

export default function AdminFavoritesPage() {
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchFavorites();
  }, [router]);

  async function fetchFavorites() {
    try {
      const { data, error } = await supabase
        .from("user_favorites")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      alert("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm("Are you sure you want to delete this favorite?")) return;
    try {
      const { error } = await supabase
        .from("user_favorites")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      alert("Favorite deleted successfully!");
      fetchFavorites();
    } catch (error) {
      console.error("Error deleting favorite:", error);
      alert("Failed to delete favorite");
    }
  }

  const columns = [
    {
      header: "User ID",
      accessor: (item) => item.user_id || "Unknown",
    },
    {
      header: "Type",
      accessor: (item) => item.item_type || "N/A",
    },
    {
      header: "Item ID",
      accessor: (item) => item.item_id || "N/A",
    },
    {
      header: "Created",
      accessor: (item) =>
        new Date(item.created_at).toLocaleDateString(),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Favorites Management</h1>
          <p className="text-gray-600 mt-2">View and manage all user favorites</p>
        </div>

        <AdminDataTable
          data={favorites}
          columns={columns}
          onDelete={handleDelete}
          loading={loading}
          searchPlaceholder="Search favorites by user ID or type..."
        />
      </div>
    </AdminLayout>
  );
}

