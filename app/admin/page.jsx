"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminStatsCard from "@/components/admin/AdminStatsCard";
import { supabase } from "@/lib/supabaseClient";
import {
  FaNewspaper,
  FaLandmark,
  FaIndustry,
  FaFileAlt,
  FaBox,
  FaChartLine,
  FaUsers,
} from "react-icons/fa";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    news: 0,
    schemes: 0,
    milkCompanies: 0,
    posts: 0,
    products: 0,
    marketPrices: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check admin authentication
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }

    fetchStats();
  }, [router]);

  async function fetchStats() {
    try {
      const [
        newsRes,
        schemesRes,
        milkCompaniesRes,
        postsRes,
        productsRes,
        marketPricesRes,
        usersRes,
      ] = await Promise.all([
        supabase.from("news").select("id", { count: "exact", head: true }),
        supabase
          .from("government_schemes")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("milk_companies")
          .select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase
          .from("agri_products")
          .select("id", { count: "exact", head: true }),
        supabase
          .from("market_prices")
          .select("id", { count: "exact", head: true }),
        supabase.auth.admin.listUsers(),
      ]);

      setStats({
        news: newsRes.count || 0,
        schemes: schemesRes.count || 0,
        milkCompanies: milkCompaniesRes.count || 0,
        posts: postsRes.count || 0,
        products: productsRes.count || 0,
        marketPrices: marketPricesRes.count || 0,
        users: usersRes.data?.users?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Overview of all data in your AgroPeer platform
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatsCard
            title="News Articles"
            value={stats.news}
            icon={FaNewspaper}
            subtitle="Total news items"
          />
          <AdminStatsCard
            title="Government Schemes"
            value={stats.schemes}
            icon={FaLandmark}
            subtitle="Available schemes"
          />
          <AdminStatsCard
            title="Milk Companies"
            value={stats.milkCompanies}
            icon={FaIndustry}
            subtitle="Registered companies"
          />
          <AdminStatsCard
            title="Posts"
            value={stats.posts}
            icon={FaFileAlt}
            subtitle="User posts"
          />
          <AdminStatsCard
            title="Products"
            value={stats.products}
            icon={FaBox}
            subtitle="Agricultural products"
          />
          <AdminStatsCard
            title="Market Prices"
            value={stats.marketPrices}
            icon={FaChartLine}
            subtitle="Price records"
          />
          <AdminStatsCard
            title="Users"
            value={stats.users}
            icon={FaUsers}
            subtitle="Registered users"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => router.push("/admin/news")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <FaNewspaper className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold">Manage News</p>
              <p className="text-sm text-gray-600">Add or edit news articles</p>
            </button>
            <button
              onClick={() => router.push("/admin/government-schemes")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <FaLandmark className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold">Manage Schemes</p>
              <p className="text-sm text-gray-600">Update government schemes</p>
            </button>
            <button
              onClick={() => router.push("/admin/milk-companies")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <FaIndustry className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold">Manage Companies</p>
              <p className="text-sm text-gray-600">Update milk companies</p>
            </button>
            <button
              onClick={() => router.push("/admin/posts")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
            >
              <FaFileAlt className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold">Manage Posts</p>
              <p className="text-sm text-gray-600">View and moderate posts</p>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
