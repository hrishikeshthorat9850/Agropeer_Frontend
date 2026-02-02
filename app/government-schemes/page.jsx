"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaBullhorn,
  FaArrowLeft,
  FaTag,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaFileAlt,
  FaClipboardList,
  FaExternalLinkAlt,
  FaWhatsapp,
  FaCopy,
  FaCheck,
  FaShareAlt,
} from "react-icons/fa";
import SchemeSearch from "@/components/government-schemes/SchemeSearch";
import SchemeFilterBar from "@/components/government-schemes/SchemeFilterBar";
import SchemeList from "@/components/government-schemes/SchemeList";
import SchemeCard from "@/components/government-schemes/SchemeCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { apiRequest } from "@/utils/apiHelpers";
import { Capacitor } from "@capacitor/core";
import { shareContent } from "@/utils/shareHandler";
import { useLanguage } from "@/Context/languagecontext";

export default function GovernmentSchemesPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSchemeId = searchParams.get("id");

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // Detail view state
  const [detailScheme, setDetailScheme] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);
  const [relatedSchemes, setRelatedSchemes] = useState([]);
  const [copied, setCopied] = useState(false);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const pagination = usePagination(1, 12);

  const setTotalRef = useRef(pagination.setTotal);
  setTotalRef.current = pagination.setTotal;

  const fetchSchemes = useCallback(
    async (page) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          orderBy: "created_at",
          order: "desc",
        });

        if (searchQuery) params.append("search", searchQuery);
        if (selectedCategory) params.append("category", selectedCategory);
        if (selectedState) params.append("state", selectedState);

        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/government-schemes?${params.toString()}`,
        );

        if (apiError) {
          setError(apiError.message || "Failed to load schemes");
          return;
        }

        setSchemes(data?.data || []);
        setTotalRef.current(data?.pagination?.total || 0);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchQuery, selectedCategory, selectedState],
  );

  useEffect(() => {
    if (!selectedSchemeId) {
      fetchSchemes(pagination.page);
    }
  }, [pagination.page, fetchSchemes, selectedSchemeId]);

  // Fetch single scheme details for detail view
  useEffect(() => {
    const fetchSchemeDetails = async () => {
      if (!selectedSchemeId) {
        setDetailScheme(null);
        return;
      }
      setDetailLoading(true);
      setDetailError(null);
      try {
        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/government-schemes/${selectedSchemeId}`,
        );
        if (apiError) {
          setDetailError(apiError.message || "Failed to load scheme details");
          return;
        }
        setDetailScheme(data?.data);

        // Fetch related schemes from same category
        if (data?.data?.category) {
          const { data: relatedData } = await apiRequest(
            `${BASE_URL}/api/government-schemes?category=${encodeURIComponent(
              data.data.category,
            )}&limit=4`,
          );
          setRelatedSchemes(
            (relatedData?.data || [])
              .filter((s) => s.id !== selectedSchemeId)
              .slice(0, 3),
          );
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setDetailError(
          "An unexpected error occurred. Please refresh the page.",
        );
      } finally {
        setDetailLoading(false);
      }
    };
    fetchSchemeDetails();
  }, [selectedSchemeId]);

  const handleShare = (scheme) => {
    if (Capacitor.isNativePlatform()) {
      const result = shareContent({
        title: scheme?.title,
        text: scheme?.tagline,
        id: scheme?.id,
        route: "government-schemes",
      });
      if (result.platform === "native") {
        console.log("✔ Shared via native bottom sheet");
      }

      if (result.platform === "web") {
        console.log("🌍 Shared via browser share dialog");
      }

      if (result.platform === "copy") {
        showToast("info", "📋 Link copied to clipboard!");
      }

      if (!result.success) {
        return;
      }
    }
  };

  const parseArrayField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return typeof field === "string" ? field.split("\n").filter(Boolean) : [];
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    pagination.setPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    pagination.setPage(1);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    pagination.setPage(1);
  };

  const handlePageChange = (page) => {
    pagination.setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Detail view
  if (selectedSchemeId) {
    if (detailLoading) {
      return (
        <ErrorBoundary>
          <div className="min-h-[calc(100vh-122px)] flex items-center justify-center">
            <LoadingSpinner text={t("loading_scheme_details")} />
          </div>
        </ErrorBoundary>
      );
    }

    if (detailError || !detailScheme) {
      return (
        <ErrorBoundary>
          <div className="min-h-[calc(100vh-122px)] flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="farm-card p-12 text-center max-w-md bg-white dark:bg-[#1E1E1E] rounded-3xl border border-gray-100 dark:border-[#333]"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-farm-700 dark:text-white mb-2">
                {detailError || t("scheme_not_found")}
              </h3>
              <p className="text-farm-600 dark:text-gray-400 mb-4">
                {t("scheme_not_found_desc")}
              </p>
              <button
                onClick={() => router.push("/government-schemes")}
                className="farm-button bg-farm-600 hover:bg-farm-700 text-white dark:bg-farm-600 dark:hover:bg-farm-500"
              >
                {t("back_to_schemes")}
              </button>
            </motion.div>
          </div>
        </ErrorBoundary>
      );
    }

    const benefits = parseArrayField(detailScheme.benefits);
    const eligibility = parseArrayField(detailScheme.eligibility);
    const documents = parseArrayField(detailScheme.documents);
    const applicationSteps = parseArrayField(detailScheme.application_steps);
    const officialLinks = parseArrayField(detailScheme.official_links);
    const faqs = parseArrayField(detailScheme.faqs);

    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-6">
          {/* Mobile App Detail Header */}
          <header className="sticky top-0 z-40 bg-white dark:bg-black border-b border-gray-100 dark:border-white/10 px-4 py-3 flex items-center gap-4 shadow-sm">
            <button
              onClick={() => router.push("/government-schemes")}
              className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-700 dark:text-white active:scale-95 transition-transform"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate flex-1">
              {detailScheme.title}
            </h1>
          </header>

          <div className="w-full max-w-3xl mx-auto px-2 pt-6">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
            >
              <div className="flex items-start gap-4 mb-6">
                {detailScheme.icon && (
                  <span className="text-5xl">{detailScheme.icon}</span>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {detailScheme.category && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-farm-100 dark:bg-farm-900/30 text-farm-700 dark:text-farm-300 rounded-full text-sm font-semibold border border-farm-200 dark:border-farm-800">
                        <FaTag className="w-4 h-4" />
                        {detailScheme.category}
                      </div>
                    )}
                    {detailScheme.state && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        {detailScheme.state}
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-farm-900 dark:text-white mb-2">
                    {detailScheme.title}
                  </h1>
                  {detailScheme.tagline && (
                    <p className="text-lg text-farm-600 dark:text-gray-400">
                      {detailScheme.tagline}
                    </p>
                  )}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-farm-200 dark:border-[#333]">
                <span className="text-sm text-farm-600 dark:text-gray-400 font-medium">
                  {t("share_label")}
                </span>
                <button
                  onClick={() => handleShare(detailScheme)}
                  className="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                  title={t("share_whatsapp")}
                >
                  <FaWhatsapp className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Overview Section */}
            {detailScheme.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-4">
                  {t("overview_title")}
                </h2>
                <p className="text-farm-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {detailScheme.description}
                </p>
              </motion.div>
            )}

            {/* Key Benefits */}
            {benefits.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-farm-500 dark:text-farm-400" />
                  {t("key_benefits")}
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-farm-500 dark:text-farm-400 mt-1">
                        ✓
                      </span>
                      <span className="text-farm-700 dark:text-gray-300 flex-1">
                        {typeof benefit === "string"
                          ? benefit
                          : benefit.text || benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Eligibility Criteria */}
            {eligibility.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-4">
                  {t("eligibility_criteria")}
                </h2>
                <ul className="space-y-3">
                  {eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-farm-500 dark:text-farm-400 mt-1">
                        •
                      </span>
                      <span className="text-farm-700 dark:text-gray-300 flex-1">
                        {typeof item === "string" ? item : item.text || item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Required Documents */}
            {documents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaFileAlt className="text-farm-500 dark:text-farm-400" />
                  {t("required_documents")}
                </h2>
                <ul className="space-y-3">
                  {documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-farm-500 dark:text-farm-400 mt-1">
                        •
                      </span>
                      <span className="text-farm-700 dark:text-gray-300 flex-1">
                        {typeof doc === "string" ? doc : doc.text || doc}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* How to Apply */}
            {applicationSteps.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-4 flex items-center gap-2">
                  <FaClipboardList className="text-farm-500 dark:text-farm-400" />
                  {t("how_to_apply")}
                </h2>
                <ol className="space-y-3 list-decimal list-inside">
                  {applicationSteps.map((step, idx) => (
                    <li key={idx} className="text-farm-700 dark:text-gray-300">
                      {typeof step === "string" ? step : step.text || step}
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}

            {/* Official Links */}
            {officialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-4">
                  {t("official_links")}
                </h2>
                <div className="space-y-3">
                  {officialLinks.map((link, idx) => {
                    const linkObj =
                      typeof link === "string"
                        ? { url: link, text: link }
                        : link;
                    return (
                      <a
                        key={idx}
                        href={linkObj.url || linkObj}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-farm-500 hover:bg-farm-600 text-white rounded-lg transition-colors dark:bg-farm-600 dark:hover:bg-farm-500"
                      >
                        <span>{linkObj.text || linkObj.url || link}</span>
                        <FaExternalLinkAlt className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* FAQ Section */}
            {faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="farm-card p-8 mb-8 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-sm border border-gray-100 dark:border-[#333]"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-4">
                  {t("faq_title")}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => {
                    const faqObj =
                      typeof faq === "string"
                        ? { question: faq, answer: "" }
                        : {
                            question: faq.question || faq.q || "",
                            answer: faq.answer || faq.a || "",
                          };
                    return (
                      <div
                        key={idx}
                        className="border-b border-farm-200 dark:border-white/10 pb-4 last:border-0"
                      >
                        <h3 className="font-semibold text-farm-900 dark:text-white mb-2">
                          {faqObj.question}
                        </h3>
                        {faqObj.answer && (
                          <p className="text-farm-700 dark:text-gray-300">
                            {faqObj.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Related Schemes */}
            {relatedSchemes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 dark:text-white mb-6">
                  {t("related_schemes")}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedSchemes.map((scheme, index) => (
                    <SchemeCard key={scheme.id} scheme={scheme} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => router.push("/government-schemes")}
                className="farm-button bg-farm-600 hover:bg-farm-700 text-white dark:bg-farm-600 dark:hover:bg-farm-500 px-8 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95"
              >
                {t("back_to_all_schemes")}
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // List view
  return (
    <ErrorBoundary>
      <div className="bg-gray-50 dark:bg-black pb-6">
        {/* Mobile App Header */}
        {/* Sticky Header Wrapper - REMOVED sticky as requested */}
        <div className="bg-gray-50 dark:bg-black">
          <header className="bg-white dark:bg-black border-b border-gray-100 dark:border-white/10 px-4 py-3 flex items-center justify-between shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              {t("govt_schemes_title")}
            </h1>
          </header>

          <div className="w-full max-w-lg mx-auto md:max-w-5xl bg-white dark:bg-black">
            {/* Search Area */}
            <div className="px-4 py-3 bg-white dark:bg-black/50">
              <SchemeSearch onSearch={handleSearch} />
            </div>

            {/* Horizontal Scrollable Filters */}
            <div className="bg-gray-50/95 dark:bg-black/95 backdrop-blur-sm py-2 px-4 border-b border-gray-100 dark:border-white/5">
              <SchemeFilterBar
                onCategoryChange={handleCategoryChange}
                onStateChange={handleStateChange}
                selectedCategory={selectedCategory}
                selectedState={selectedState}
              />
            </div>
          </div>
        </div>

        <div className="w-full max-w-lg mx-auto md:max-w-5xl">
          {/* Stats Row */}
          {!loading && !error && (
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t("schemes") || "Schemes"}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-300 font-medium bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded-full">
                {schemes.length}
              </span>
            </div>
          )}

          {/* Scheme List */}
          <div className="px-2 md:px-4 pb-4 min-h-[50vh]">
            <SchemeList schemes={schemes} loading={loading} error={error} />
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
