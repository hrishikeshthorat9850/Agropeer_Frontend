"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaNewspaper, FaArrowLeft, FaWhatsapp, FaCopy, FaCheck, FaTag, FaCalendar, FaUser, FaShareAlt } from "react-icons/fa";
import NewsSearch from "@/components/news/NewsSearch";
import NewsFilterBar from "@/components/news/NewsFilterBar";
import NewsList from "@/components/news/NewsList";
import NewsCard from "@/components/news/NewsCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePagination } from "@/hooks/usePagination";
import { apiRequest } from "@/utils/apiHelpers";
import { formatDistanceToNow } from "date-fns";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";
import { useLanguage } from "@/Context/languagecontext";
export default function NewsPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const pagination = usePagination(1, 12);

  const setTotalRef = useRef(pagination.setTotal);
  setTotalRef.current = pagination.setTotal;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Detail view state
  const articleId = searchParams.get("id");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articleLoading, setArticleLoading] = useState(false);
  const [articleError, setArticleError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  const fetchNews = useCallback(
    async (page) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          orderBy: "date",
          order: "desc",
        });

        if (searchQuery) params.append("search", searchQuery);
        if (selectedCategory) params.append("category", selectedCategory);

        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/news?${params.toString()}`
        );

        if (apiError) {
          setError(apiError.message || t("failed_load_news"));
          return;
        }

        setArticles(data?.data || []);
        setTotalRef.current(data?.pagination?.total || 0);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchQuery, selectedCategory]
  );

  useEffect(() => {
    fetchNews(pagination.page);
  }, [pagination.page, fetchNews]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    pagination.setPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    pagination.setPage(1);
  };

  const handlePageChange = (page) => {
    pagination.setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch article detail when id query param is present
  useEffect(() => {
    const fetchArticleDetail = async () => {
      if (!articleId) {
        setSelectedArticle(null);
        return;
      }

      setArticleLoading(true);
      setArticleError(null);
      try {
        const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/news/${articleId}`);

        if (apiError) {
          setArticleError(apiError.message || t("failed_load_article"));
          return;
        }

        setSelectedArticle(data?.data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setArticleError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setArticleLoading(false);
      }
    };

    fetchArticleDetail();
  }, [articleId]);

  const handleShare = (article) => {
    const targetArticle = article || selectedArticle;
    if (!targetArticle) return;

    if (Capacitor.isNativePlatform()) {
      shareContent({
        title: targetArticle.title,
        text: targetArticle.summary,
        id: targetArticle.id,
        route: "news"
      }).then((result) => {
        if (result.platform === "copy") {
          showToast("info", "📋 Link copied to clipboard!");
        }
      });
    } else {
      // Web Fallback
      const url = `${window.location.origin}/news?id=${targetArticle.id}`;
      navigator.clipboard.writeText(url).then(() => {
        showToast("info", "📋 Link copied to clipboard!");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return t("recently");
    try {
      const date = new Date(dateString);
      return {
        relative: formatDistanceToNow(date, { addSuffix: true }),
        full: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
    } catch {
      return {
        relative: t("recently"),
        full: dateString,
      };
    }
  };

  // Detail view
  if (articleId) {
    if (articleLoading) {
      return (
        <ErrorBoundary>
          <div className="min-h-[calc(100vh-122px)] flex items-center justify-center">
            <LoadingSpinner text={t("loading_article")} />
          </div>
        </ErrorBoundary>
      );
    }

    if (articleError || !selectedArticle) {
      return (
        <ErrorBoundary>
          <div className="min-h-[calc(100vh-122px)] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="farm-card p-12 text-center max-w-md"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-farm-700 mb-2">
                {articleError || t("article_not_found")}
              </h3>
              <p className="text-farm-600 mb-4">
                {articleError || t("article_not_found_desc")}
              </p>
              <Link href="/news" className="farm-button inline-block">
                {t("back_to_news")}
              </Link>
            </motion.div>
          </div>
        </ErrorBoundary>
      );
    }

    const dateInfo = formatDate(selectedArticle.date);

    return (
      <ErrorBoundary>
        <MobilePageContainer>
          <div className="py-4">
            <div className="md:hidden px-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)] bg-gradient-to-br from-[#d7ffe8] to-[#f4fff8] dark:from-[#0b2718] dark:to-[#0e3821] border border-white/60 dark:border-[#1a4a2d]"
              >
                <button
                  onClick={() => router.push("/news")}
                  className="flex items-center gap-2 text-green-800 dark:text-white mb-4"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  <span className="font-medium">{t("back")}</span>
                </button>

                {selectedArticle.category && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 dark:bg-white/10 rounded-full text-sm font-semibold mb-3">
                    <FaTag className="w-4 h-4" />
                    {selectedArticle.category}
                  </div>
                )}

                <h1 className="text-2xl font-bold text-green-900 dark:text-white leading-snug">
                  {selectedArticle.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm text-green-700 dark:text-green-300 mt-3">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="w-4 h-4" /> {dateInfo.full}
                  </div>
                  {selectedArticle.source && (
                    <div className="flex items-center gap-2">
                      <FaUser className="w-4 h-4" /> {selectedArticle.source}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:block bg-gradient-to-r from-farm-500 to-farm-700 text-white py-12"
            >
              <div className="w-full max-w-4xl mx-auto px-4">
                <button
                  onClick={() => router.push("/news")}
                  className="flex items-center gap-2 text-white/90 hover:text-white mb-6"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  <span>{t("back")}</span>
                </button>

                {selectedArticle.category && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-4">
                    <FaTag className="w-4 h-4" />
                    {selectedArticle.category}
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">
                  {selectedArticle.title}
                </h1>

                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    <FaCalendar className="w-4 h-4" /> {dateInfo.full}
                  </div>
                  {selectedArticle.source && (
                    <div className="flex items-center gap-2">
                      <FaUser className="w-4 h-4" /> {selectedArticle.source}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <div className="w-full max-w-4xl mx-auto px-4 py-12">
              {selectedArticle.image_url && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 rounded-2xl overflow-hidden shadow-md"
                >
                  <div className="relative w-full h-96">
                    <Image
                      src={selectedArticle.image_url}
                      alt={selectedArticle.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              )}

              {selectedArticle.summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="farm-card p-6 mb-8"
                >
                  <p className="text-lg font-medium text-farm-900 dark:text-white leading-relaxed">
                    {selectedArticle.summary}
                  </p>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="farm-card p-8 md:p-12 mb-8"
              >
                {selectedArticle.content ? (
                  <div
                    className="text-farm-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{
                      __html: selectedArticle.content.replace(/\n/g, "<br />"),
                    }}
                  />
                ) : (
                  <p className="text-farm-700 dark:text-gray-300 leading-relaxed">
                    {selectedArticle.summary}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="farm-card p-6 mb-8 md:block hidden"
              >
                <h3 className="text-lg font-bold text-farm-900 mb-4">Share this article</h3>
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="px-4 py-2 bg-green-500 text-white rounded-xl mr-3 font-semibold shadow-sm hover:shadow-md transition-shadow"
                >
                  Share Article
                </button>
              </motion.div>

              {selectedArticle.relatedNews && selectedArticle.relatedNews.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="text-2xl font-display font-bold text-farm-900 mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedArticle.relatedNews.map((item) => (
                      <NewsCard key={item.id} article={item} />
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            <div className="md:hidden fixed bottom-24 right-6 z-[999]">
              <motion.button
                onClick={() => setFabOpen((prev) => !prev)}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full shadow-xl bg-green-600 text-white flex items-center justify-center text-xl"
              >
                <FaShareAlt />
              </motion.button>

              {fabOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute bottom-16 right-0 flex flex-col gap-3"
                >
                  <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-xl">
                    <button
                      onClick={() => handleShare(selectedArticle)}
                      className="w-12 h-12 rounded-full shadow-md bg-green-500 text-white flex items-center justify-center mb-2"
                    >
                      <FaWhatsapp />
                    </button>
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/news?id=${selectedArticle?.id}`;
                        navigator.clipboard.writeText(url).then(() => {
                          showToast("success", "Link Copied!");
                          setFabOpen(false);
                        });
                      }}
                      className="w-12 h-12 rounded-full shadow-md bg-gray-600 text-white flex items-center justify-center"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </MobilePageContainer>
      </ErrorBoundary>
    );
  }
  // List view
  return (
    <ErrorBoundary>
      <MobilePageContainer>
        <div className="py-4">

          {/* ================= MOBILE HEADER (Premium UI) ================= */}
          <div className="md:hidden px-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="
              rounded-3xl p-6 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]
              bg-gradient-to-br from-[#d7ffe8] to-[#f4fff8]
              dark:from-[#0b2718] dark:to-[#0e3821]
              border border-white/60 dark:border-[#1a4a2d]
            "
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                  w-14 h-14 rounded-2xl 
                  bg-white/70 dark:bg-white/10 
                  flex items-center justify-center
                  shadow-inner
                "
                >
                  <FaNewspaper className="text-3xl text-green-700 dark:text-white" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold text-green-800 dark:text-white">
                    {t("news_header_title")}
                  </h1>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    {t("news_header_subtitle")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= DESKTOP HEADER (unchanged) ================= */}
          <div className="hidden md:block w-full max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-center"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <FaNewspaper className="text-4xl text-farm-600" />
                <h1 className="text-5xl font-display font-bold text-farm-900">
                  {t("news_header_title")}
                </h1>
              </div>
              <p className="text-lg text-farm-600 max-w-2xl mx-auto">
                {t("news_header_desc")}
              </p>
            </motion.div>
          </div>

          {/* ================= MOBILE CONTENT ================= */}
          <div className="w-full max-w-7xl mx-auto px-4">

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <NewsSearch onSearch={handleSearch} />
            </motion.div>

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <NewsFilterBar
                onCategoryChange={handleCategoryChange}
                selectedCategory={selectedCategory}
              />
            </motion.div>

            {/* Result Count */}
            {!loading && !error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-6 text-sm text-farm-600 dark:text-green-300 md:text-left text-center"
              >
                {t("showing_articles").replace("{current}", articles.length).replace("{total}", pagination.total)}
              </motion.div>
            )}

            {/* List */}
            <NewsList articles={articles} loading={loading} error={error} />

            {/* Pagination */}
            {!loading && !error && pagination.totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-10"
              >
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  hasNextPage={pagination.hasNextPage}
                  hasPreviousPage={pagination.hasPreviousPage}
                  onPageChange={handlePageChange}
                />
              </motion.div>
            )}
          </div>
        </div>
      </MobilePageContainer>
    </ErrorBoundary>
  );
}
