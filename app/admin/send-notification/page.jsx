"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/lib/supabaseClient";
import { FaPaperPlane, FaUsers, FaUser, FaInfoCircle } from "react-icons/fa";
import useToast from "@/hooks/useToast";

export default function AdminSendNotificationPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [selectedTokens, setSelectedTokens] = useState([]);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    url: "",
    image: "",
  });
  const [sendMode, setSendMode] = useState("all"); // 'all', 'selected', 'user'
  const [testToken, setTestToken] = useState("");

  useEffect(() => {
    const adminUser = localStorage.getItem("adminUser");
    if (!adminUser) {
      router.push("/admin/login");
      return;
    }
    fetchTokens();
  }, [router]);

  async function fetchTokens() {
    try {
      const { data, error } = await supabase
        .from("fcm_tokens")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setTokens(data || []);
    } catch (error) {
      console.error("Error fetching tokens:", error);
    }
  }

  async function handleSend() {
    if (!formData.title || !formData.body) {
      showToast("error", "Title and body are required!");
      return;
    }

    setLoading(true);
    try {
      let tokensToSend = [];

      if (sendMode === "all") {
        tokensToSend = tokens.map((t) => t.token);
      } else if (sendMode === "selected") {
        tokensToSend = selectedTokens;
      } else if (sendMode === "user") {
        // Get tokens for specific user (you can add user selection UI)
        const userId = prompt("Enter user ID:");
        if (userId) {
          const userTokens = tokens
            .filter((t) => t.user_id === userId)
            .map((t) => t.token);
          tokensToSend = userTokens;
        }
      }

      if (tokensToSend.length === 0) {
        showToast("warning", "No tokens to send to! Please ensure users have enabled notifications.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE_URL}/api/send-notifications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokens: tokensToSend,
          title: formData.title,
          body: formData.body,
          data: {
            url: formData.url || "/",
            ...formData,
          },
          image: formData.image || undefined,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFormData({ title: "", body: "", url: "", image: "" });
        setSelectedTokens([]);
      } else {
        showToast("error", `Failed to send: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      showToast("error", "Failed to send notification");
    } finally {
      setLoading(false);
    }
  }

  function toggleToken(token) {
    setSelectedTokens((prev) =>
      prev.includes(token)
        ? prev.filter((t) => t !== token)
        : [...prev, token]
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Send Push Notification</h1>
          <p className="text-gray-600 mt-2">
            Send notifications to all users or selected recipients
          </p>
          {tokens.length > 0 && (
            <div className="mt-4 flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-lg">
              <FaInfoCircle />
              <span>{tokens.length} FCM token(s) registered</span>
            </div>
          )}
        </div>

        {/* Info Banner if no tokens */}
        {tokens.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              ⚠️ No FCM Tokens Registered Yet
            </h3>
            <p className="text-yellow-800 mb-4">
              You need to register FCM tokens before sending notifications. Here's how:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-yellow-800 mb-4">
              <li>Open your website in a browser (not in admin panel)</li>
              <li>Allow notification permission when prompted</li>
              <li>Check browser console (F12) for "✅ FCM Token obtained"</li>
              <li>Or use the "Test with My Token" section below</li>
            </ol>
            <div className="bg-white rounded p-4 border border-yellow-300">
              <h4 className="font-semibold text-yellow-900 mb-2">Quick Test:</h4>
              <p className="text-sm text-yellow-800 mb-2">
                Get your token from browser console, then paste it below to test sending.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Send Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Send To
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setSendMode("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  sendMode === "all"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaUsers /> All Users ({tokens.length})
              </button>
              <button
                onClick={() => setSendMode("selected")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  sendMode === "selected"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <FaUser /> Selected ({selectedTokens.length})
              </button>
            </div>
          </div>

          {/* Notification Form */}
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
                placeholder="Notification title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body *
              </label>
              <textarea
                required
                value={formData.body}
                onChange={(e) =>
                  setFormData({ ...formData, body: e.target.value })
                }
                rows={4}
                placeholder="Notification message"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  placeholder="https://example.com/page"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={loading || tokens.length === 0}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Notification"}
            </button>
          </div>
        </div>

        {/* Test with Manual Token */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            🧪 Test with My Token
          </h2>
          <p className="text-gray-600 mb-4">
            If you want to test immediately, get your FCM token from browser console and paste it here:
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your FCM Token
              </label>
              <input
                type="text"
                value={testToken}
                onChange={(e) => setTestToken(e.target.value)}
                placeholder="Paste your FCM token here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Open your site in another tab, allow notifications, then check console (F12) for the token
              </p>
            </div>
            <button
              onClick={async () => {
                if (!testToken.trim()) {
                  showToast("error", "Please enter a token");
                  return;
                }
                if (!formData.title || !formData.body) {
                  showToast("error", "Please fill in title and body first");
                  return;
                }
                setLoading(true);
                try {
                  const response = await fetch(`${BASE_URL}/api/send-notifications`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      token: testToken.trim(),
                      title: formData.title,
                      body: formData.body,
                      data: {
                        url: formData.url || "/",
                        ...formData,
                      },
                      image: formData.image || undefined,
                    }),
                  });
                  const result = await response.json();
                  if (result.success) {
                    showToast("success", "Test notification sent! Check your browser. 📢");
                  } else {
                    showToast("error", `Failed: ${result.error}`);
                  }
                } catch (error) {
                  showToast("error", "Failed to send test notification");
                } finally {
                  setLoading(false);
                }
              }}
              disabled={loading || !testToken.trim()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
              {loading ? "Sending..." : "Send Test Notification"}
            </button>
          </div>
        </div>

        {/* Token Selection (if mode is 'selected') */}
        {sendMode === "selected" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Select Recipients ({selectedTokens.length} selected)
            </h2>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {tokens.map((tokenData) => (
                <div
                  key={tokenData.id}
                  onClick={() => toggleToken(tokenData.token)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedTokens.includes(tokenData.token)
                      ? "bg-green-50 border-green-500"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">
                        User: {tokenData.user_id || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {tokenData.token.substring(0, 30)}...
                      </p>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs text-gray-400">
                          {tokenData.device_type?.toUpperCase() || "WEB"}
                        </span>
                        <span className="text-xs text-gray-400">
                          • {new Date(tokenData.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedTokens.includes(tokenData.token)}
                      onChange={() => toggleToken(tokenData.token)}
                      className="w-5 h-5 text-green-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

