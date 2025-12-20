"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function AdminReviewsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchReviews();
  }, [router]);

  async function fetchReviews() {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      showToast("error", "Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      showToast("success", "Review deleted successfully! 🗑️");
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      showToast("error", "Failed to delete review");
    }
  }

  const columns = [
    {
      header: "Rating",
      accessor: (item) => {
        const rating = item.rating || 0;
        return "⭐".repeat(rating) + "☆".repeat(5 - rating);
      },
    },
    {
      header: "Comment",
      accessor: (item) =>
        item.comment?.substring(0, 50) + "..." || "No comment",
    },
    {
      header: "User ID",
      accessor: (item) => item.user_id || "Unknown",
    },
    {
      header: "Product ID",
      accessor: (item) => item.product_id || "N/A",
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
          <h1 className="text-3xl font-bold text-gray-900">Reviews Management</h1>
          <p className="text-gray-600 mt-2">View and manage all product reviews</p>
        </div>

        <AdminDataTable
          data={reviews}
          columns={columns}
          onDelete={handleDelete}
          loading={loading}
          searchPlaceholder="Search reviews by comment or rating..."
        />
      </div>
    </AdminLayout>
  );
}

