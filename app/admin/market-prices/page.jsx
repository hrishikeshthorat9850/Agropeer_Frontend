"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFormModal from "@/components/admin/AdminFormModal";
import { supabase } from "@/lib/supabaseClient";
import useToast from "@/hooks/useToast";

export default function AdminMarketPricesPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    commodity: "",
    variety: "",
    state: "",
    district: "",
    market: "",
    min_price: "",
    max_price: "",
    modal_price: "",
    date: "",
  });

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchPrices();
  }, [router]);

  async function fetchPrices() {
    try {
      const { data, error } = await supabase
        .from("market_prices")
        .select("*")
        .order("date", { ascending: false })
        .limit(1000);
      if (error) throw error;
      setPrices(data || []);
    } catch (error) {
      console.error("Error fetching prices:", error);
      showToast("error", "Failed to fetch market prices");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const processedData = {
        ...formData,
        min_price: formData.min_price ? parseFloat(formData.min_price) : null,
        max_price: formData.max_price ? parseFloat(formData.max_price) : null,
        modal_price: formData.modal_price
          ? parseFloat(formData.modal_price)
          : null,
        date: formData.date || new Date().toISOString(),
      };

      if (editingItem) {
        const { error } = await supabase
          .from("market_prices")
          .update(processedData)
          .eq("id", editingItem.id);
        if (error) throw error;
        showToast("success", "Price updated successfully! 💰");
      } else {
        const { error } = await supabase
          .from("market_prices")
          .insert([processedData]);
        if (error) throw error;
        showToast("success", "Price added successfully! 💰");
      }
      setIsModalOpen(false);
      resetForm();
      fetchPrices();
    } catch (error) {
      console.error("Error saving price:", error);
      showToast("error", "Failed to save price");
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFormData({
      commodity: item.commodity || "",
      variety: item.variety || "",
      state: item.state || "",
      district: item.district || "",
      market: item.market || "",
      min_price: item.min_price?.toString() || "",
      max_price: item.max_price?.toString() || "",
      modal_price: item.modal_price?.toString() || "",
      date: item.date
        ? new Date(item.date).toISOString().split("T")[0]
        : "",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(item) {
    if (
      !confirm(
        `Are you sure you want to delete price for ${item.commodity}?`
      )
    )
      return;
    try {
      const { error } = await supabase
        .from("market_prices")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      showToast("success", "Price deleted successfully! 🗑️");
      fetchPrices();
    } catch (error) {
      console.error("Error deleting price:", error);
      showToast("error", "Failed to delete price");
    }
  }

  function resetForm() {
    setFormData({
      commodity: "",
      variety: "",
      state: "",
      district: "",
      market: "",
      min_price: "",
      max_price: "",
      modal_price: "",
      date: "",
    });
    setEditingItem(null);
  }

  const columns = [
    {
      header: "Commodity",
      accessor: (item) => item.commodity || "N/A",
    },
    {
      header: "Variety",
      accessor: (item) => item.variety || "N/A",
    },
    {
      header: "State",
      accessor: (item) => item.state || "N/A",
    },
    {
      header: "District",
      accessor: (item) => item.district || "N/A",
    },
    {
      header: "Market",
      accessor: (item) => item.market || "N/A",
    },
    {
      header: "Price Range",
      accessor: (item) =>
        item.min_price && item.max_price
          ? `₹${item.min_price} - ₹${item.max_price}`
          : item.modal_price
          ? `₹${item.modal_price}`
          : "N/A",
    },
    {
      header: "Date",
      accessor: (item) =>
        item.date ? new Date(item.date).toLocaleDateString() : "N/A",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Market Prices Management
          </h1>
          <p className="text-gray-600 mt-2">Manage all market price records</p>
        </div>

        <AdminDataTable
          data={prices}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          loading={loading}
          searchPlaceholder="Search prices by commodity, state, or market..."
        />

        <AdminFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingItem ? "Edit Price" : "Add New Price"}
          onSubmit={handleSubmit}
          submitLabel={editingItem ? "Update Price" : "Add Price"}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Commodity *
                </label>
                <input
                  type="text"
                  required
                  value={formData.commodity}
                  onChange={(e) =>
                    setFormData({ ...formData, commodity: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Variety
                </label>
                <input
                  type="text"
                  value={formData.variety}
                  onChange={(e) =>
                    setFormData({ ...formData, variety: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) =>
                    setFormData({ ...formData, district: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Market
                </label>
                <input
                  type="text"
                  value={formData.market}
                  onChange={(e) =>
                    setFormData({ ...formData, market: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.min_price}
                  onChange={(e) =>
                    setFormData({ ...formData, min_price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.max_price}
                  onChange={(e) =>
                    setFormData({ ...formData, max_price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modal Price (₹)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.modal_price}
                  onChange={(e) =>
                    setFormData({ ...formData, modal_price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </AdminFormModal>
      </div>
    </AdminLayout>
  );
}

