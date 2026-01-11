"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaRegStar,
  FaFilter,
  FaSearch,
  FaCheckCircle,
  FaThumbsUp,
  FaShare,
  FaQuoteLeft,
  FaAward,
  FaChartBar,
} from "react-icons/fa";
import { ReviewSkeleton } from "@/components/skeletons";
import { useLanguage } from "@/Context/languagecontext";
import useToast from "@/hooks/useToast";

export default function ReviewsPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rating: 5,
    message: "",
    location: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [filterRating, setFilterRating] = useState(0);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch reviews from API
  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${BASE_URL}/api/reviews`);
      const result = await res.json();

      if (result.status === "Success" && result.data) {
        const mappedReviews = result.data.map((review) => ({
          id: review.id,
          name: review.name,
          rating: review.rating,
          message: review.message,
          location: review.location || "",
          date: review.created_at || review.date || new Date().toISOString(),
          helpful: review.helpful || 0,
          verified: review.verified || false,
        }));
        setReviews(mappedReviews);
      } else {
        setError(t("error_loading"));
      }
    } catch (e) {
      setError(t("error_loading"));
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.message) {
      showToast("error", t("form_error_fill_all"));
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form }),
      });

      const data = await res.json();

      if (data.status === "Success" && data.data && data.data.length > 0) {
        const newReview = {
          id: data.data[0].id,
          name: data.data[0].name,
          rating: data.data[0].rating,
          message: data.data[0].message,
          location: data.data[0].location || "",
          date: data.data[0].created_at || new Date().toISOString(),
          helpful: 0,
          verified: false,
        };

        setReviews((prev) => [newReview, ...prev]);
        setForm({ name: "", rating: 5, message: "", location: "" });
        setShowForm(false);
        showToast("success", t("form_success"));
      } else {
        showToast("error", t("form_failed"));
      }
    } catch (e) {
      showToast("error", t("form_failed"));
    }
  }

  const handleStarClick = (rating) => {
    setForm({ ...form, rating });
  };

  const handleHelpful = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpful: (r.helpful || 0) + 1 } : r
      )
    );
  };

  // Calculate statistics
  const stats = {
    total: reviews.length,
    average:
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          ).toFixed(1)
        : 0,
    distribution: [5, 4, 3, 2, 1].map((rating) => ({
      rating,
      count: reviews.filter((r) => r.rating === rating).length,
      percentage:
        reviews.length > 0
          ? (
              (reviews.filter((r) => r.rating === rating).length /
                reviews.length) *
              100
            ).toFixed(0)
          : 0,
    })),
  };

  // Filter and sort
  const filteredAndSortedReviews = reviews
    .filter((r) => {
      const matchesRating = filterRating === 0 || r.rating === filterRating;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        r.name.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q) ||
        (r.location && r.location.toLowerCase().includes(q));

      return matchesRating && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.rating - a.rating;
        case "lowest":
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  // Date formatter with translations
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return t("date_today");
    if (diffDays === 1) return t("date_yesterday");
    if (diffDays < 7) return `${diffDays} ${t("date_days_ago")}`;
    if (diffDays < 30)
      return `${Math.floor(diffDays / 7)} ${t("date_weeks_ago")}`;
    if (diffDays < 365)
      return `${Math.floor(diffDays / 30)} ${t("date_months_ago")}`;

    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-24">
      {/* Sticky Mobile Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-farm-100 dark:bg-farm-900/30 rounded-full flex items-center justify-center text-farm-600 dark:text-farm-400">
            <FaAward className="w-4 h-4" />
          </div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            {t("hero_title")}
          </h1>
        </div>
      </nav>

      <div className="px-4 pt-4">
        {/* Search Bar - Floating Style */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/10 text-gray-900 dark:text-white text-sm rounded-2xl py-3.5 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-farm-500 focus:border-transparent outline-none transition-all placeholder-gray-400"
          />
        </div>

        {/* Stats Highlights - Horizontal Scroll */}
        {reviews.length > 0 && (
          <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-3">
              {/* Ave Rating Card */}
              <div className="min-w-[140px] bg-gradient-to-br from-farm-500 to-farm-600 rounded-2xl p-4 text-white shadow-lg shadow-farm-500/20">
                <div className="flex items-center gap-2 mb-2 opacity-90">
                  <FaStar className="w-4 h-4" />
                  <span className="text-xs font-bold">
                    {t("stats_avg_rating")}
                  </span>
                </div>
                <div className="text-3xl font-bold mb-1">{stats.average}</div>
                <div className="flex gap-0.5 opacity-80">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar
                      key={s}
                      className={`w-3 h-3 ${
                        s <= Math.round(stats.average)
                          ? "text-white"
                          : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Total Reviews Card */}
              <div className="min-w-[140px] bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-white/10 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-gray-500 dark:text-gray-400">
                  <FaChartBar className="w-4 h-4" />
                  <span className="text-xs font-bold">
                    {t("stats_total_reviews")}
                  </span>
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stats.total}
                </div>
                <span className="text-[10px] text-gray-400">
                  {t("statistics_card_total")}
                </span>
              </div>

              {/* Distribution Mini Chart */}
              <div className="min-w-[180px] bg-white dark:bg-[#1E1E1E] border border-gray-100 dark:border-white/10 rounded-2xl p-4 shadow-sm flex flex-col justify-center gap-1">
                {stats.distribution
                  .slice()
                  .reverse()
                  .slice(0, 3)
                  .map((dist) => (
                    <div
                      key={dist.rating}
                      className="flex items-center gap-2 text-[10px]"
                    >
                      <span className="font-bold text-gray-500 w-3">
                        {dist.rating}
                      </span>
                      <div className="flex-1 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-400 rounded-full"
                          style={{ width: `${dist.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 w-4 text-right">
                        {dist.count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters & Sorting - Chip Style */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide mb-6 -mx-4 px-4 pb-1">
          <div className="flex items-center gap-2 bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/10 rounded-full px-3 py-1.5 shadow-sm shrink-0">
            <FaFilter className="text-gray-400 w-3 h-3" />
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(Number(e.target.value))}
              className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-300 outline-none pr-1"
            >
              <option value={0}>{t("filter_all_ratings")}</option>
              <option value={5}>{t("filter_5_star")}</option>
              <option value={4}>{t("filter_4_star")}</option>
              <option value={3}>{t("filter_3_star")}</option>
              <option value={2}>{t("filter_2_star")}</option>
              <option value={1}>{t("filter_1_star")}</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white dark:bg-[#121212] border border-gray-100 dark:border-white/10 rounded-full px-3 py-1.5 shadow-sm shrink-0">
            <FaChartBar className="text-gray-400 w-3 h-3" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-gray-700 dark:text-gray-300 outline-none pr-1"
            >
              <option value="newest">{t("sort_newest")}</option>
              <option value="oldest">{t("sort_oldest")}</option>
              <option value="highest">{t("sort_highest")}</option>
              <option value="lowest">{t("sort_lowest")}</option>
            </select>
          </div>
        </div>

        {/* Reviews Feed */}
        <div className="space-y-4">
          {loading ? (
            <ReviewSkeleton count={3} />
          ) : error ? (
            <div className="bg-white dark:bg-[#1E1E1E] p-8 rounded-3xl text-center shadow-sm">
              <p className="text-red-500 mb-4">{t("error_loading")}</p>
              <button
                onClick={fetchReviews}
                className="text-sm font-bold text-farm-600 underline"
              >
                {t("retry")}
              </button>
            </div>
          ) : filteredAndSortedReviews.length === 0 ? (
            <div className="py-12 text-center opacity-60">
              <FaQuoteLeft className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-gray-500 dark:text-gray-400">
                {reviews.length === 0
                  ? t("no_reviews_yet")
                  : t("no_reviews_match")}
              </p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredAndSortedReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  layout
                  className="bg-white dark:bg-[#1E1E1E] rounded-3xl p-5 shadow-sm border border-gray-100 dark:border-white/5"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-tr from-farm-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md shadow-green-500/20">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
                            {review.name}
                          </h3>
                          {review.verified && (
                            <FaCheckCircle className="w-3 h-3 text-blue-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                className={`w-2.5 h-2.5 ${
                                  star <= review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] text-gray-400">
                            • {formatDate(review.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {review.location && (
                      <span className="text-[10px] font-medium text-gray-400 bg-gray-50 dark:bg-white/5 px-2 py-1 rounded-full">
                        {review.location}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="pl-[52px]">
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {review.message}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 active:text-farm-600 transition-colors"
                      >
                        <FaThumbsUp className="w-3.5 h-3.5" />
                        {t("helpful")}{" "}
                        <span className="opacity-60">
                          ({review.helpful || 0})
                        </span>
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 dark:text-gray-400 active:text-farm-600 transition-colors">
                        <FaShare className="w-3.5 h-3.5" />
                        {t("share")}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Floating Action Button (FAB) for Writing Review */}
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-24 right-4 z-40 bg-gray-900 dark:bg-white text-white dark:text-black px-5 py-3.5 rounded-2xl shadow-xl shadow-black/20 font-bold text-sm flex items-center gap-2 active:scale-95 transition-transform"
      >
        <span className="text-xl">+</span> {t("write_review")}
      </button>

      {/* Write Review - Bottom Sheet Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-[#1E1E1E] w-full sm:w-[500px] max-h-[85vh] overflow-y-auto sm:rounded-3xl rounded-t-3xl shadow-2xl pointer-events-auto p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {t("write_review")}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={submit} className="space-y-5">
                <div className="flex gap-2 justify-center py-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="transition-transform active:scale-90"
                    >
                      {star <= (hoveredStar || form.rating) ? (
                        <FaStar className="w-10 h-10 text-yellow-400 drop-shadow-sm" />
                      ) : (
                        <FaRegStar className="w-10 h-10 text-gray-200 dark:text-gray-700" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-center text-sm font-medium text-farm-600 dark:text-farm-400 -mt-2">
                  {form.rating === 5 && t("rating_excellent")}
                  {form.rating === 4 && t("rating_very_good")}
                  {form.rating === 3 && t("rating_good")}
                  {form.rating === 2 && t("rating_fair")}
                  {form.rating === 1 && t("rating_poor")}
                </p>

                <div>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-farm-500 placeholder-gray-400"
                    placeholder={t("form_full_name")}
                    required
                  />
                </div>
                <div>
                  <input
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-farm-500 placeholder-gray-400"
                    placeholder={t("location_placeholder")}
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-farm-500 placeholder-gray-400 resize-none"
                    placeholder={t("form_review_placeholder")}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-farm-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-farm-500/30 active:scale-[0.98] transition-all"
                >
                  {t("form_submit")}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
