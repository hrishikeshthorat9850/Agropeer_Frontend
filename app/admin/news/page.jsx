"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFormModal from "@/components/admin/AdminFormModal";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import useToast from "@/hooks/useToast";

export default function AdminNewsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    category: "",
    image_url: "",
    source: "",
  });

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchNews();
  }, [router]);

  async function fetchNews() {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      showToast("error", "Failed to fetch news");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingItem) {
        const { error } = await supabase
          .from("news")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingItem.id);
        if (error) throw error;
        showToast("success", "News updated successfully! 📰");
      } else {
        const { error } = await supabase.from("news").insert([formData]);
        if (error) throw error;
        showToast("success", "News added successfully! 📰");
      }
      setIsModalOpen(false);
      resetForm();
      fetchNews();
    } catch (error) {
      console.error("Error saving news:", error);
      showToast("error", "Failed to save news");
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      summary: item.summary || "",
      content: item.content || "",
      category: item.category || "",
      image_url: item.image_url || "",
      source: item.source || "",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(item) {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;
    try {
      const { error } = await supabase.from("news").delete().eq("id", item.id);
      if (error) throw error;
      showToast("success", "News deleted successfully! 🗑️");
      fetchNews();
    } catch (error) {
      console.error("Error deleting news:", error);
      showToast("error", "Failed to delete news");
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      summary: "",
      content: "",
      category: "",
      image_url: "",
      source: "",
    });
    setEditingItem(null);
  }

  const columns = [
    {
      header: "Title",
      accessor: (item) => item.title,
    },
    {
      header: "Category",
      accessor: (item) => item.category || "N/A",
    },
    {
      header: "Source",
      accessor: (item) => item.source || "N/A",
    },
    {
      header: "Date",
      accessor: (item) =>
        new Date(item.date || item.created_at).toLocaleDateString(),
    },
    {
      header: "Image",
      cell: (item) =>
        item.image_url ? (
          <div className="relative w-16 h-16">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover rounded"
            />
          </div>
        ) : (
          <span className="text-gray-400">No image</span>
        ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-2">Manage all news articles</p>
        </div>

        <AdminDataTable
          data={news}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          loading={loading}
          searchPlaceholder="Search news by title, category, or source..."
        />

        <AdminFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingItem ? "Edit News" : "Add New News"}
          onSubmit={handleSubmit}
          submitLabel={editingItem ? "Update News" : "Add News"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Summary
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) =>
                  setFormData({ ...formData, summary: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content *
              </label>
              <textarea
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Agriculture, Market Rates"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Source
                </label>
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  placeholder="News source"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image_url}
                onChange={(e) =>
                  setFormData({ ...formData, image_url: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </AdminFormModal>
      </div>
    </AdminLayout>
  );
}

