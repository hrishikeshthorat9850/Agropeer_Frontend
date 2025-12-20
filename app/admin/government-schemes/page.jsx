"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFormModal from "@/components/admin/AdminFormModal";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function AdminGovernmentSchemesPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    category: "",
    state: "",
    icon: "",
    benefits: "",
    eligibility: "",
    documents: "",
    application_steps: "",
    official_links: "",
    faqs: "",
  });

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchSchemes();
  }, [router]);

  async function fetchSchemes() {
    try {
      const { data, error } = await supabase
        .from("government_schemes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setSchemes(data || []);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      showToast("error", "Failed to fetch schemes");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const processedData = {
        ...formData,
        benefits: formData.benefits
          ? JSON.parse(formData.benefits)
          : [],
        eligibility: formData.eligibility
          ? JSON.parse(formData.eligibility)
          : [],
        documents: formData.documents
          ? JSON.parse(formData.documents)
          : [],
        application_steps: formData.application_steps
          ? JSON.parse(formData.application_steps)
          : [],
        official_links: formData.official_links
          ? JSON.parse(formData.official_links)
          : [],
        faqs: formData.faqs ? JSON.parse(formData.faqs) : [],
        updated_at: new Date().toISOString(),
      };

      if (editingItem) {
        const { error } = await supabase
          .from("government_schemes")
          .update(processedData)
          .eq("id", editingItem.id);
        if (error) throw error;
        showToast("success", "Scheme updated successfully! 🏛️");
      } else {
        const { error } = await supabase
          .from("government_schemes")
          .insert([processedData]);
        if (error) throw error;
        showToast("success", "Scheme added successfully! 🏛️");
      }
      setIsModalOpen(false);
      resetForm();
      fetchSchemes();
    } catch (error) {
      console.error("Error saving scheme:", error);
      showToast("error", "Failed to save scheme. Check JSON format.");
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      tagline: item.tagline || "",
      description: item.description || "",
      category: item.category || "",
      state: item.state || "",
      icon: item.icon || "",
      benefits: Array.isArray(item.benefits)
        ? JSON.stringify(item.benefits, null, 2)
        : "",
      eligibility: Array.isArray(item.eligibility)
        ? JSON.stringify(item.eligibility, null, 2)
        : "",
      documents: Array.isArray(item.documents)
        ? JSON.stringify(item.documents, null, 2)
        : "",
      application_steps: Array.isArray(item.application_steps)
        ? JSON.stringify(item.application_steps, null, 2)
        : "",
      official_links: Array.isArray(item.official_links)
        ? JSON.stringify(item.official_links, null, 2)
        : "",
      faqs: Array.isArray(item.faqs) ? JSON.stringify(item.faqs, null, 2) : "",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(item) {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;
    try {
      const { error } = await supabase
        .from("government_schemes")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      showToast("success", "Scheme deleted successfully! 🗑️");
      fetchSchemes();
    } catch (error) {
      console.error("Error deleting scheme:", error);
      showToast("error", "Failed to delete scheme");
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      tagline: "",
      description: "",
      category: "",
      state: "",
      icon: "",
      benefits: "",
      eligibility: "",
      documents: "",
      application_steps: "",
      official_links: "",
      faqs: "",
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
      header: "State",
      accessor: (item) => item.state || "All States",
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
          <h1 className="text-3xl font-bold text-gray-900">
            Government Schemes Management
          </h1>
          <p className="text-gray-600 mt-2">Manage all government schemes</p>
        </div>

        <AdminDataTable
          data={schemes}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          loading={loading}
          searchPlaceholder="Search schemes by title, category, or state..."
        />

        <AdminFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingItem ? "Edit Scheme" : "Add New Scheme"}
          onSubmit={handleSubmit}
          submitLabel={editingItem ? "Update Scheme" : "Add Scheme"}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) =>
                    setFormData({ ...formData, tagline: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Agriculture, Business, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  placeholder="Leave empty for all states"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <input
                  type="text"
                  value={formData.icon}
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
                  placeholder="Emoji or icon"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Benefits (JSON Array)
              </label>
              <textarea
                value={formData.benefits}
                onChange={(e) =>
                  setFormData({ ...formData, benefits: e.target.value })
                }
                rows={3}
                placeholder='["Benefit 1", "Benefit 2"]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Eligibility (JSON Array)
              </label>
              <textarea
                value={formData.eligibility}
                onChange={(e) =>
                  setFormData({ ...formData, eligibility: e.target.value })
                }
                rows={3}
                placeholder='["Criteria 1", "Criteria 2"]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Documents (JSON Array)
              </label>
              <textarea
                value={formData.documents}
                onChange={(e) =>
                  setFormData({ ...formData, documents: e.target.value })
                }
                rows={3}
                placeholder='["Document 1", "Document 2"]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Steps (JSON Array)
              </label>
              <textarea
                value={formData.application_steps}
                onChange={(e) =>
                  setFormData({ ...formData, application_steps: e.target.value })
                }
                rows={4}
                placeholder='["Step 1", "Step 2"]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Official Links (JSON Array)
              </label>
              <textarea
                value={formData.official_links}
                onChange={(e) =>
                  setFormData({ ...formData, official_links: e.target.value })
                }
                rows={2}
                placeholder='[{"label": "Website", "url": "https://..."}]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                FAQs (JSON Array)
              </label>
              <textarea
                value={formData.faqs}
                onChange={(e) =>
                  setFormData({ ...formData, faqs: e.target.value })
                }
                rows={4}
                placeholder='[{"question": "Q?", "answer": "A"}]'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </AdminFormModal>
      </div>
    </AdminLayout>
  );
}

