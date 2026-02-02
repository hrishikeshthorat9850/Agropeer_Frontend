"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaNewspaper,
  FaArrowLeft,
  FaWhatsapp,
  FaCopy,
  FaCheck,
  FaTag,
  FaCalendar,
  FaUser,
  FaShareAlt,
} from "react-icons/fa";
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
          `${BASE_URL}/api/news?${params.toString()}`,
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
    [pagination.limit, searchQuery, selectedCategory],
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
        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/news/${articleId}`,
        );

        if (apiError) {
          setArticleError(apiError.message || t("failed_load_article"));
          return;
        }

        setSelectedArticle(data?.data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setArticleError(
          "An unexpected error occurred. Please refresh the page.",
        );
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
        route: "news",
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
          <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
            <LoadingSpinner text={t("loading_article")} />
          </div>
        </ErrorBoundary>
      );
    }

    if (articleError || !selectedArticle) {
      return (
        <ErrorBoundary>
          <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-[#1E1E1E] p-8 rounded-3xl text-center max-w-md shadow-lg"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {articleError || t("article_not_found")}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {articleError || t("article_not_found_desc")}
              </p>
              <Link
                href="/news"
                className="inline-block px-6 py-3 bg-farm-600 text-white rounded-xl font-bold active:scale-95 transition-transform"
              >
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
        <div className="min-h-screen bg-white dark:bg-black pb-12">
          {/* Immersive Header */}
          <div className="relative w-full h-[40vh] md:h-[50vh]">
            {selectedArticle.image_url ? (
              <Image
                src={selectedArticle.image_url}
                alt={selectedArticle.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-farm-100 dark:bg-white/5" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

            {/* Top Nav */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
              <button
                onClick={() => router.push("/news")}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform"
              >
                <FaArrowLeft />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleShare(selectedArticle)}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white active:scale-95 transition-transform"
                >
                  <FaShareAlt />
                </button>
              </div>
            </div>

            {/* Title & Metadata overlaid on bottom of image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              {selectedArticle.category && (
                <span className="inline-block px-3 py-1 bg-farm-600 text-white text-xs font-bold rounded-full mb-3 shadow-lg">
                  {selectedArticle.category}
                </span>
              )}
              <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 drop-shadow-md">
                {selectedArticle.title}
              </h1>
              <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
                <span className="flex items-center gap-1.5">
                  <FaCalendar className="w-3.5 h-3.5" /> {dateInfo.relative}
                </span>
                {selectedArticle.source && (
                  <>
                    <span className="w-1 h-1 bg-white/60 rounded-full" />
                    <span className="flex items-center gap-1.5">
                      <FaUser className="w-3.5 h-3.5" />{" "}
                      {selectedArticle.source}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="max-w-3xl mx-auto px-5 py-8 -mt-6 bg-white dark:bg-black relative rounded-t-3xl text-gray-800 dark:text-gray-200">
            {/* Decorative handle for 'sheet' look */}
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mx-auto mb-8" />

            {selectedArticle.summary && (
              <p className="text-lg font-medium leading-relaxed mb-8 text-gray-900 dark:text-white border-l-4 border-farm-500 pl-4">
                {selectedArticle.summary}
              </p>
            )}

            <div className="prose prose-lg dark:prose-invert prose-green max-w-none">
              {selectedArticle.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedArticle.content.replace(/\n/g, "<br />"),
                  }}
                />
              ) : (
                <p>{t("news_no_content")}</p>
              )}
            </div>
          </div>

          {/* Related News */}
          {selectedArticle.relatedNews &&
            selectedArticle.relatedNews.length > 0 && (
              <div className="px-5 pb-12 max-w-3xl mx-auto">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {t("related_news")}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {selectedArticle.relatedNews.map((item) => (
                    <NewsCard key={item.id} article={item} />
                  ))}
                </div>
              </div>
            )}
        </div>
      </ErrorBoundary>
    );
  }

  // List view
  return (
    <ErrorBoundary>
      <div className="bg-gray-50 dark:bg-black pb-6">
        {/* Mobile App Header */}
        {/* Mobile App Header */}
        {/* Mobile App Header (Title) */}
        {/* Sticky Header Wrapper - REMOVED sticky as requested */}
        <div className="bg-gray-50 dark:bg-black">
          <header className="relative z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-transparent px-5 py-3 flex items-center justify-between shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              Agro News
            </h1>
          </header>

          <div className="w-full max-w-lg mx-auto md:max-w-5xl bg-white dark:bg-black">
            {/* Search Area */}
            <div className="px-4 pb-2">
              <NewsSearch onSearch={handleSearch} />
            </div>

            {/* Horizontal Scrollable Filters */}
            <div className="bg-white/95 dark:bg-black/95 backdrop-blur-sm pt-2 pb-3 pl-4 border-b border-gray-100 dark:border-white/5">
              <div className="overflow-x-auto flex gap-2 pr-4 no-scrollbar">
                <NewsFilterBar
                  onCategoryChange={handleCategoryChange}
                  selectedCategory={selectedCategory}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg mx-auto md:max-w-5xl">
          {/* Stats Row (Subtle) */}
          {!loading && !error && (
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Latest Updates
              </span>
              <span className="text-xs text-gray-400 font-medium bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                {articles.length}
              </span>
            </div>
          )}

          {/* News Feed */}
          <div className="md:px-4 pb-4 min-h-[45vh]">
            <NewsList articles={articles} loading={loading} error={error} />
          </div>

          {/* Pagination */}
          {!loading && !error && pagination.totalPages > 1 && (
            <div className="px-4 pb-8 flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                hasNextPage={pagination.hasNextPage}
                hasPreviousPage={pagination.hasPreviousPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
