"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { useLogin } from "@/Context/logincontext";

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useLogin();
  const ADMIN_EMAIL = "hrishikeshthorat9850@gmail.com"; // replace with your email
  const session = supabase.auth.getSession();

  // Fetch all news
  async function fetchNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });
    if (error) console.error(error);
    else setNews(data);
  }

  useEffect(() => {
    fetchNews();
  }, [news]);

  // Add or Update news
  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !content) return alert("Title & Content required!");
    setLoading(true);

    if (editingId) {
      // Update
      const { error } = await supabase
        .from("news")
        .update({ title, content, image_url: imageUrl })
        .eq("id", editingId);
      if (error) alert("❌ Failed to update news");
      else alert("✅ News updated successfully!");
      setEditingId(null);
    } else {
      // Insert
      const { error } = await supabase
        .from("news")
        .insert([{ title, content, image_url: imageUrl }]);
      if (error) alert("❌ Failed to add news");
      else alert("✅ News added successfully!");
    }

    setTitle("");
    setContent("");
    setImageUrl("");
    setLoading(false);
    fetchNews();
  }

  // Delete news
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this news?")) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) alert("❌ Failed to delete");
    else fetchNews();
  }

  // Edit news
  function handleEdit(item) {
    setTitle(item.title);
    setContent(item.content);
    setImageUrl(item.image_url || "");
    setEditingId(item.id);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">📰 Admin News Panel</h2>

      {/* News Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          placeholder="News title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="News content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded h-32"
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          disabled={loading}
        >
          {editingId ? "Update News" : "Add News"}
        </button>
      </form>

      {/* News List */}
      <div>
        {news.map((item) => (
          <div
            key={item.id}
            className="border-b py-3 flex justify-between items-start"
          >
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-700">{item.content}</p>
              {item.image_url && (
                <div className="relative w-32 h-24 mt-2">
                  <Image
                    src={item.image_url}
                    alt="news"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
              <small className="text-gray-500">
                {new Date(item.date).toLocaleDateString()}
              </small>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
