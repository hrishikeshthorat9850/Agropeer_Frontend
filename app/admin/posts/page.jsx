"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import useToast from "@/hooks/useToast";

export default function AdminPostsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchPosts();
  }, [router]);

  async function fetchPosts() {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      showToast("error", "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Are you sure you want to delete this post?`)) return;
    try {
      const { error } = await supabase.from("posts").delete().eq("id", item.id);
      if (error) throw error;
      showToast("success", "Post deleted successfully! 🗑️");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      showToast("error", "Failed to delete post");
    }
  }

  const columns = [
    {
      header: "Content",
      accessor: (item) => item.content?.substring(0, 50) + "..." || "No content",
    },
    {
      header: "Author",
      accessor: (item) => item.user_id || "Unknown",
    },
    {
      header: "Media",
      cell: (item) =>
        item.media_url ? (
          <div className="relative w-16 h-16">
            <Image
              src={item.media_url}
              alt="Post media"
              fill
              className="object-cover rounded"
            />
          </div>
        ) : (
          <span className="text-gray-400">No media</span>
        ),
    },
    {
      header: "Likes",
      accessor: (item) => item.likes_count || 0,
    },
    {
      header: "Comments",
      accessor: (item) => item.comments_count || 0,
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
          <h1 className="text-3xl font-bold text-gray-900">Posts Management</h1>
          <p className="text-gray-600 mt-2">View and manage all user posts</p>
        </div>

        <AdminDataTable
          data={posts}
          columns={columns}
          onDelete={handleDelete}
          loading={loading}
          searchPlaceholder="Search posts by content or author..."
        />
      </div>
    </AdminLayout>
  );
}

