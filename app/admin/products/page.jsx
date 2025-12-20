"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFormModal from "@/components/admin/AdminFormModal";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import useToast from "@/hooks/useToast";

export default function AdminProductsPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    unit: "",
    image_url: "",
    seller_id: "",
    location: "",
  });

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchProducts();
  }, [router]);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from("agri_products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      showToast("error", "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const processedData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("agri_products")
          .update(processedData)
          .eq("id", editingItem.id);
        if (error) throw error;
        showToast("success", "Product updated successfully! ✅");
      } else {
        const { error } = await supabase
          .from("agri_products")
          .insert([processedData]);
        if (error) throw error;
        showToast("success", "Product added successfully! ✅");
      }
      setIsModalOpen(false);
      resetForm();
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
      showToast("error", "Failed to save product");
    }
  }

  function handleEdit(item) {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      description: item.description || "",
      category: item.category || "",
      price: item.price?.toString() || "",
      unit: item.unit || "",
      image_url: item.image_url || "",
      seller_id: item.seller_id || "",
      location: item.location || "",
    });
    setIsModalOpen(true);
  }

  async function handleDelete(item) {
    if (!confirm(`Are you sure you want to delete "${item.name}"?`)) return;
    try {
      const { error } = await supabase
        .from("agri_products")
        .delete()
        .eq("id", item.id);
      if (error) throw error;
      showToast("success", "Product deleted successfully! 🗑️");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast("error", "Failed to delete product");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      unit: "",
      image_url: "",
      seller_id: "",
      location: "",
    });
    setEditingItem(null);
  }

  const columns = [
    {
      header: "Name",
      accessor: (item) => item.name,
    },
    {
      header: "Category",
      accessor: (item) => item.category || "N/A",
    },
    {
      header: "Price",
      accessor: (item) =>
        item.price ? `₹${item.price} / ${item.unit || "unit"}` : "N/A",
    },
    {
      header: "Location",
      accessor: (item) => item.location || "N/A",
    },
    {
      header: "Image",
      cell: (item) =>
        item.image_url ? (
          <div className="relative w-16 h-16">
            <Image
              src={item.image_url}
              alt={item.name}
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
          <h1 className="text-3xl font-bold text-gray-900">
            Products Management
          </h1>
          <p className="text-gray-600 mt-2">Manage all agricultural products</p>
        </div>

        <AdminDataTable
          data={products}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          loading={loading}
          searchPlaceholder="Search products by name, category, or location..."
        />

        <AdminFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            resetForm();
          }}
          title={editingItem ? "Edit Product" : "Add New Product"}
          onSubmit={handleSubmit}
          submitLabel={editingItem ? "Update Product" : "Add Product"}
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
                  Category
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  placeholder="kg, liter, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Seller ID
                </label>
                <input
                  type="text"
                  value={formData.seller_id}
                  onChange={(e) =>
                    setFormData({ ...formData, seller_id: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
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

