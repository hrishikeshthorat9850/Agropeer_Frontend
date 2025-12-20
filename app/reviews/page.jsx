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
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
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
    <div className="min-h-[calc(100vh-122px)]">
      <div className="container mx-auto px-4 py-10 md:px-6">
        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaAward className="w-10 h-10 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
            {t("hero_title")}
          </h1>

          <p className="text-farm-700 max-w-2xl mx-auto text-lg dark:text-gray-300">
            {t("hero_subtitle")}
          </p>
        </motion.div>

        {/* STATS */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {/* Average rating */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-farm-900 dark:text-white">
                  {t("stats_avg_rating")}
                </h3>
                <FaChartBar className="w-6 h-6 text-farm-600" />
              </div>

              <div className="flex items-center gap-3">
                <div className="text-4xl font-bold text-farm-900 dark:text-white">
                  {stats.average}
                </div>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar
                      key={s}
                      className={`w-5 h-5 ${
                        s <= Math.round(stats.average)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-farm-600 mt-2 dark:text-gray-400">
                {t("stats_based_on")} {stats.total} {t("stats_reviews")}
              </p>
            </div>

            {/* Total reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-farm-900 dark:text-white">
                  {t("stats_total_reviews")}
                </h3>
                <FaStar className="w-6 h-6 text-yellow-400" />
              </div>

              <div className="text-4xl font-bold text-farm-900 dark:text-white">
                {stats.total}
              </div>

              <p className="text-sm text-farm-600 mt-2 dark:text-gray-400">
                {t("statistics_card_total")}
              </p>
            </div>

            {/* Rating distribution */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-farm-900 dark:text-white">
                  {t("stats_rating_distribution")}
                </h3>
                <FaChartBar className="w-6 h-6 text-farm-600" />
              </div>

              <div className="space-y-2">
                {stats.distribution
                  .slice()
                  .reverse()
                  .map((dist) => (
                    <div key={dist.rating} className="flex items-center gap-2">
                      <span className="text-sm font-medium w-8 text-farm-900 dark:text-gray-300">
                        {dist.rating}★
                      </span>

                      <div className="flex-1 h-2 bg-farm-200 rounded-full overflow-hidden dark:bg-gray-700">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                          style={{ width: `${dist.percentage}%` }}
                        />
                      </div>

                      <span className="text-xs w-12 text-right dark:text-gray-400">
                        {dist.count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* SEARCH + FILTER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-farm-200 mb-8 dark:bg-[#272727] dark:border-white/20"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border border-gray-200 dark:border-neutral-700">
                <FaSearch className="text-gray-400 dark:text-gray-500" />

                <input
                  type="text"
                  placeholder={t("search_placeholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
            
            {/* Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-farm-600" />
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(Number(e.target.value))}
                className="px-4 py-2 border rounded-lg text-gray-700 dark:bg-[#363636] dark:border-white/20 dark:text-white"
              >
                <option value={0}>{t("filter_all_ratings")}</option>
                <option value={5}>{t("filter_5_star")}</option>
                <option value={4}>{t("filter_4_star")}</option>
                <option value={3}>{t("filter_3_star")}</option>
                <option value={2}>{t("filter_2_star")}</option>
                <option value={1}>{t("filter_1_star")}</option>
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border rounded-lg text-gray-700 dark:bg-[#363636] dark:border-white/20 dark:text-white"
            >
              <option value="newest">{t("sort_newest")}</option>
              <option value="oldest">{t("sort_oldest")}</option>
              <option value="highest">{t("sort_highest")}</option>
              <option value="lowest">{t("sort_lowest")}</option>
            </select>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg border dark:bg-[#272727] dark:border-white/20 sticky top-4">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-farm-500 to-farm-700 shadow-lg"
                >
                  {t("write_review")}
                </button>
              ) : (
                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-sm font-semibold text-farm-700 dark:text-white block mb-2">
                      {t("form_full_name")}
                    </label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 text-sm border rounded-lg text-gray-700 dark:bg-[#363636] dark:text-white"
                      placeholder={t("form_full_name")}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-sm font-semibold text-farm-700 dark:text-white block mb-2">
                      {t("form_location")}
                    </label>
                    <input
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full p-3 text-sm border rounded-lg text-gray-700 dark:bg-[#363636] dark:text-white"
                      placeholder={t("location_placeholder")}
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="text-sm font-semibold text-farm-700 dark:text-white block mb-2">
                      {t("form_rating")}
                    </label>

                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => handleStarClick(star)}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                        >
                          {star <= (hoveredStar || form.rating) ? (
                            <FaStar className="w-8 h-8 text-yellow-400" />
                          ) : (
                            <FaRegStar className="w-8 h-8 text-gray-300" />
                          )}
                        </button>
                      ))}
                    </div>

                    <p className="text-xs text-farm-600 mt-1 dark:text-gray-400">
                      {form.rating === 5 && t("rating_excellent")}
                      {form.rating === 4 && t("rating_very_good")}
                      {form.rating === 3 && t("rating_good")}
                      {form.rating === 2 && t("rating_fair")}
                      {form.rating === 1 && t("rating_poor")}
                    </p>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-sm font-semibold text-farm-700 dark:text-white block mb-2">
                      {t("form_review")}
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full p-3 text-sm border rounded-lg text-gray-700 dark:bg-[#363636] dark:text-white"
                      placeholder={t("form_review_placeholder")}
                      required
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-farm-500 to-farm-700"
                    >
                      {t("form_submit")}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setForm({ name: "", rating: 5, message: "", location: "" });
                      }}
                      className="px-4 py-3 rounded-lg font-semibold border text-black bg-gray-50 dark:text-gray-200"
                    >
                      {t("form_cancel")}
                    </button>
                  </div>
                </motion.form>
              )}
            </div>
          </motion.div>

          {/* REVIEWS LIST */}
          <div className="lg:col-span-2">
            {loading ? (
              <ReviewSkeleton count={3} />
            ) : error ? (
              <motion.div className="bg-white p-12 rounded-2xl shadow-lg text-center border dark:bg-[#272727]">
                <p className="text-red-600 dark:text-red-400 text-lg mb-4">
                  {t("error_loading")}
                </p>
                <button
                  onClick={fetchReviews}
                  className="px-6 py-2 bg-farm-600 text-white rounded-lg"
                >
                  {t("retry")}
                </button>
              </motion.div>
            ) : filteredAndSortedReviews.length === 0 ? (
              <motion.div className="bg-white p-12 rounded-2xl text-center shadow-lg border dark:bg-[#272727]">
                <FaQuoteLeft className="w-12 h-12 text-farm-300 mx-auto mb-4" />

                <p className="text-farm-600 dark:text-gray-400 text-lg">
                  {reviews.length === 0 ? t("no_reviews_yet") : t("no_reviews_match")}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <AnimatePresence>
                  {filteredAndSortedReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white p-6 rounded-2xl shadow-lg border dark:bg-[#272727]"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-farm-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {review.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-green-900 dark:text-white">{review.name}</h3>
                              {review.verified && (
                                <FaCheckCircle className="w-4 h-4 text-blue-500" />
                              )}
                            </div>

                            {review.location && (
                              <p className="text-xs text-farm-600 dark:text-gray-400">
                                {review.location}
                              </p>
                            )}

                            <p className="text-xs text-farm-500 dark:text-gray-500">
                              {formatDate(review.date)}
                            </p>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <p className="text-farm-700 dark:text-gray-300 mb-4">
                        {review.message}
                      </p>

                      {/* Helpful + Share */}
                      <div className="flex items-center justify-between pt-4 border-t dark:border-white/10">
                        <button
                          onClick={() => handleHelpful(review.id)}
                          className="flex items-center gap-2 text-sm text-farm-600 dark:text-gray-400"
                        >
                          <FaThumbsUp className="w-4 h-4" />
                          <span>
                            {t("helpful")} ({review.helpful || 0})
                          </span>
                        </button>

                        <button className="text-sm text-farm-600 dark:text-gray-400">
                          <FaShare className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
