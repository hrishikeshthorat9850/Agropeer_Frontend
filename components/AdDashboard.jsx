"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";

export default function AdDashboard() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editAd, setEditAd] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  // ✅ Fetch all ads
  const fetchAds = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("ads")
      .select("*")
      .order("id", { ascending: false });
    if (error) console.error(error);
    else setAds(data);
    setLoading(false);
  };

  // ✅ Delete ad
  const deleteAd = async (id) => {
    if (!confirm("Are you sure you want to delete this ad?")) return;
    await supabase.from("ads").delete().eq("id", id);
    setAds((prev) => prev.filter((a) => a.id !== id));
  };

  // ✅ Toggle activation
  const toggleAd = async (id, active) => {
    await supabase.from("ads").update({ active: !active }).eq("id", id);
    setAds((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  };

  // ✅ Edit ad
  const handleEdit = async (e) => {
    e.preventDefault();
    const { title, description, link, category, duration } = editAd;
    const { error } = await supabase
      .from("ads")
      .update({ title, description, link, category, duration })
      .eq("id", editAd.id);

    if (error) {
      console.error(error);
      alert("Error updating ad!");
    } else {
      setEditAd(null);
      fetchAds();
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-122px)]">
        <p className="text-green-600 font-semibold text-xl animate-pulse">
          Loading Ads...
        </p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-122px)] bg-gradient-to-br from-green-50 to-green-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-green-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-green-800">
            🧠 Ad Management Dashboard
          </h2>
          <a
            href="/create-ad"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            <FaPlus /> New Ad
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence>
            {ads.map((ad) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-green-200 rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={ad.imageUrl || "https://via.placeholder.com/400x300"}
                    alt={ad.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-green-900">
                      {ad.title}
                    </h3>
                    <p className="text-sm text-green-700 line-clamp-3 mt-1">
                      {ad.description}
                    </p>
                    <p className="text-sm mt-2">
                      <span className="font-bold">Category:</span> {ad.category}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Duration:</span>{" "}
                      {ad.duration} days
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => toggleAd(ad.id, ad.active)}
                      className="flex items-center gap-1 text-green-700 font-semibold hover:text-green-900 transition"
                    >
                      {ad.active ? (
                        <>
                          <FaToggleOn className="text-green-600 text-xl" /> Active
                        </>
                      ) : (
                        <>
                          <FaToggleOff className="text-gray-500 text-xl" /> Inactive
                        </>
                      )}
                    </button>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditAd(ad)}
                        className="text-blue-600 hover:text-blue-800 transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteAd(ad.id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ✅ Edit Modal */}
        {editAd && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg relative"
            >
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                ✏️ Edit Ad
              </h3>
              <form onSubmit={handleEdit} className="space-y-4">
                <input
                  type="text"
                  value={editAd.title}
                  onChange={(e) =>
                    setEditAd({ ...editAd, title: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                  placeholder="Title"
                />
                <textarea
                  value={editAd.description}
                  onChange={(e) =>
                    setEditAd({ ...editAd, description: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg h-24"
                  placeholder="Description"
                />
                <input
                  type="url"
                  value={editAd.link}
                  onChange={(e) =>
                    setEditAd({ ...editAd, link: e.target.value })
                  }
                  className="w-full p-3 border rounded-lg"
                  placeholder="Link"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={editAd.category}
                    onChange={(e) =>
                      setEditAd({ ...editAd, category: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                    placeholder="Category"
                  />
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={editAd.duration}
                    onChange={(e) =>
                      setEditAd({ ...editAd, duration: e.target.value })
                    }
                    className="w-full p-3 border rounded-lg"
                    placeholder="Duration"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setEditAd(null)}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
