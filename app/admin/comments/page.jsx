"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { supabase } from "@/lib/supabaseClient";

export default function AdminCommentsPage() {
  const router = useRouter();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchComments();
  }, [router]);

  async function fetchComments() {
    try {
      const { data, error } = await supabase
        .from("post_comments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
      alert("Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    try {
      const { error } = await supabase
        .from("post_comments")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      alert("Comment deleted successfully!");
      fetchComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  }

  const columns = [
    {
      header: "Content",
      accessor: (item) =>
        item.content?.substring(0, 50) + "..." || "No content",
    },
    {
      header: "User ID",
      accessor: (item) => item.user_id || "Unknown",
    },
    {
      header: "Post ID",
      accessor: (item) => item.post_id || "N/A",
    },
    {
      header: "Likes",
      accessor: (item) => item.likes_count || 0,
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
          <h1 className="text-3xl font-bold text-gray-900">Comments Management</h1>
          <p className="text-gray-600 mt-2">View and manage all post comments</p>
        </div>

        <AdminDataTable
          data={comments}
          columns={columns}
          onDelete={handleDelete}
          loading={loading}
          searchPlaceholder="Search comments by content..."
        />
      </div>
    </AdminLayout>
  );
}

