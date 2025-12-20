"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFormModal from "@/components/admin/AdminFormModal";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function AdminMilkCompaniesPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    milk_type: "",
    region: "",
    category: "",
    fat_rate: "",
    snf_rate: "",
    base_rate: "",
    fat_multiplier: "",
    snf_multiplier: "",
    per_liter_rate: "",
    contact_info: "",
  });

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchCompanies();
  }, [router]);

  async function fetchCompanies() {
    try {
      const { data, error } = await supabase
        .from("milk_companies")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setCompanies(data || []);
    } catch (error) {
      console.error("Error fetching companies:", error);
      showToast("error", "Failed to fetch companies");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const processedData = {
        ...formData,
        fat_rate: formData.fat_rate ? parseFloat(formData.fat_rate) : null,
        snf_rate: formData.snf_rate ? parseFloat(formData.snf_rate) : null,
        base_rate: formData.base_rate ? parseFloat(formData.base_rate) : null,
        fat_multiplier: formData.fat_multiplier
          ? parseFloat(formData.fat_multiplier)
          : null,
        snf_multiplier: formData.snf_multiplier
          ? parseFloat(formData.snf_multiplier)
          : null,
        per_liter_rate: formData.per_liter_rate
          ? parseFloat(formData.per_liter_rate)
          : null,
        contact_info: formData.contact_info
          ? JSON.parse(formData.contact_info)
          : null,
        updated_at: new Date().toISOString(),
      };

      if (editingItem) {
        const { error } = await supabase
          .from("milk_companies")
          .update(processedData)
          .eq("id", editingItem.id);
        if (error) throw error;
        showToast("success", "Company updated successfully! 🥛");
      } else {
        const { error } = await supabase
          .from("milk_companies")
          .insert([processedData]);
        if (error) throw error;
        showToast("success", "Company added successfully! 🥛");
      }
      setIsModalOpen(false);
      resetForm();
      fetchCompanies();
    } catch (error) {
      console.error("Error saving company:", error);
      showToast("error", "Failed to save company. Check JSON format for contact_info.");
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      milk_type: item.milk_type || "",
      region: item.region || "",
      category: item.category || "",
      fat_rate: item.fat_rate?.toString() || "",
      snf_rate: item.snf_rate?.toString() || "",
      base_rate: item.base_rate?.toString() || "",
      fat_multiplier: item.fat_multiplier?.toString() || "",
      snf_multiplier: item.snf_multiplier?.toString() || "",
      per_liter_rate: item.per_liter_rate?.toString() || "",
      contact_info: item.contact_info
        ? JSON.stringify(item.contact_info, null, 2)
        : "",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(item) {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;
    try {
      const { error } = await supabase
        .from("milk_companies")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      showToast("success", "Company deleted successfully! 🗑️");
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
      showToast("error", "Failed to delete company");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      milk_type: "",
      region: "",
      category: "",
      fat_rate: "",
      snf_rate: "",
      base_rate: "",
      fat_multiplier: "",
      snf_multiplier: "",
      per_liter_rate: "",
      contact_info: "",
    });
    setEditingItem(null);
  }

  const columns = [
    {
      header: "Name",
      accessor: (item) => item.name,
    },
    {
      header: "Milk Type",
      accessor: (item) => item.milk_type || "N/A",
    },
    {
      header: "Region",
      accessor: (item) => item.region || "N/A",
    },
    {
      header: "Category",
      accessor: (item) => item.category || "N/A",
    },
    {
      header: "Base Rate",
      accessor: (item) =>
        item.base_rate ? `₹${item.base_rate}` : "N/A",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Milk Companies Management
          </h1>
          <p className="text-gray-600 mt-2">Manage all milk companies</p>
        </div>

        <AdminDataTable
          data={companies}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          loading={loading}
          searchPlaceholder="Search companies by name, region, or type..."
        />

        <AdminFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingItem ? "Edit Company" : "Add New Company"}
          onSubmit={handleSubmit}
          submitLabel={editingItem ? "Update Company" : "Add Company"}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Milk Type
                </label>
                <select
                  value={formData.milk_type}
                  onChange={(e) =>
                    setFormData({ ...formData, milk_type: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Type</option>
                  <option value="Cow">Cow</option>
                  <option value="Buffalo">Buffalo</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  placeholder="Maharashtra, Gujarat, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Category</option>
                  <option value="Cooperative">Cooperative</option>
                  <option value="Private">Private</option>
                  <option value="Government">Government</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fat Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.fat_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, fat_rate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SNF Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.snf_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, snf_rate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Base Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.base_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, base_rate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fat Multiplier
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.fat_multiplier}
                  onChange={(e) =>
                    setFormData({ ...formData, fat_multiplier: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SNF Multiplier
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.snf_multiplier}
                  onChange={(e) =>
                    setFormData({ ...formData, snf_multiplier: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Per Liter Rate
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.per_liter_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, per_liter_rate: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Info (JSON)
              </label>
              <textarea
                value={formData.contact_info}
                onChange={(e) =>
                  setFormData({ ...formData, contact_info: e.target.value })
                }
                rows={4}
                placeholder='{"phone": "", "email": "", "address": "", "website": ""}'
                className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </AdminFormModal>
      </div>
    </AdminLayout>
  );
}

