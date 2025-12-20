"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaBullhorn, FaArrowLeft, FaTag, FaMapMarkerAlt, FaCheckCircle, FaFileAlt, FaClipboardList, FaExternalLinkAlt, FaWhatsapp, FaCopy, FaCheck, FaShareAlt } from "react-icons/fa";
import SchemeSearch from "@/components/government-schemes/SchemeSearch";
import SchemeFilterBar from "@/components/government-schemes/SchemeFilterBar";
import SchemeList from "@/components/government-schemes/SchemeList";
import SchemeCard from "@/components/government-schemes/SchemeCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import Pagination from "@/components/ui/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { apiRequest } from "@/utils/apiHelpers";

export default function GovernmentSchemesPage() {
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
          `${BASE_URL}/api/government-schemes?${params.toString()}`
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
    [pagination.limit, searchQuery, selectedCategory, selectedState]
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
          `${BASE_URL}/api/government-schemes/${selectedSchemeId}`
        );
        if (apiError) {
          setDetailError(apiError.message || "Failed to load scheme details");
          return;
        }
        setDetailScheme(data?.data);
        
        // Fetch related schemes from same category
        if (data?.data?.category) {
          const { data: relatedData } = await apiRequest(
            `${BASE_URL}/api/government-schemes?category=${encodeURIComponent(data.data.category)}&limit=4`
          );
          setRelatedSchemes(
            (relatedData?.data || []).filter(s => s.id !== selectedSchemeId).slice(0, 3)
          );
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setDetailError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setDetailLoading(false);
      }
    };
    fetchSchemeDetails();
  }, [selectedSchemeId]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = detailScheme?.title || "Check out this government scheme";

    if (platform === "whatsapp") {
      window.open(`https://wa.me/?text=${encodeURIComponent(`${text} - ${url}`)}`, "_blank");
    } else if (platform === "copy") {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const parseArrayField = (field) => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return typeof field === 'string' ? field.split('\n').filter(Boolean) : [];
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
            <LoadingSpinner text="Loading scheme details..." />
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
              className="farm-card p-12 text-center max-w-md"
            >
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-farm-700 mb-2">
                {detailError || "Scheme not found"}
              </h3>
              <p className="text-farm-600 mb-4">
                The scheme you're looking for doesn't exist or has been removed.
              </p>
              <button onClick={() => router.push("/government-schemes")} className="farm-button">
                Back to Schemes
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
        <div className="min-h-[calc(100vh-122px)] pt-8 pb-12">
          <div className="w-full max-w-5xl mx-auto px-4">
            {/* Back Button */}
            <button
              onClick={() => router.push("/government-schemes")}
              className="flex items-center gap-2 text-farm-700 hover:text-farm-800 mb-6 transition-colors"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Schemes</span>
            </button>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="farm-card p-8 mb-8"
            >
              <div className="flex items-start gap-4 mb-6">
                {detailScheme.icon && (
                  <span className="text-5xl">{detailScheme.icon}</span>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {detailScheme.category && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-farm-100 text-farm-700 rounded-full text-sm font-semibold">
                        <FaTag className="w-4 h-4" />
                        {detailScheme.category}
                      </div>
                    )}
                    {detailScheme.state && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-farm-100 text-farm-700 rounded-full text-sm font-semibold">
                        <FaMapMarkerAlt className="w-4 h-4" />
                        {detailScheme.state}
                      </div>
                    )}
                  </div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-farm-900 mb-2">
                    {detailScheme.title}
                  </h1>
                  {detailScheme.tagline && (
                    <p className="text-lg text-farm-600">{detailScheme.tagline}</p>
                  )}
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-farm-200">
                <span className="text-sm text-farm-600 font-medium">Share:</span>
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="p-2 text-farm-600 hover:bg-farm-50 rounded-lg transition-colors"
                  title="Copy link"
                >
                  {copied ? <FaCheck className="w-5 h-5 text-green-600" /> : <FaCopy className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            {/* Overview Section */}
            {detailScheme.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4">Overview</h2>
                <p className="text-farm-700 leading-relaxed whitespace-pre-line">
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
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-farm-500" />
                  Key Benefits
                </h2>
                <ul className="space-y-3">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-farm-500 mt-1">✓</span>
                      <span className="text-farm-700 flex-1">
                        {typeof benefit === 'string' ? benefit : benefit.text || benefit}
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
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4">Eligibility Criteria</h2>
                <ul className="space-y-3">
                  {eligibility.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-farm-500 mt-1">•</span>
                      <span className="text-farm-700 flex-1">
                        {typeof item === 'string' ? item : item.text || item}
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
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4 flex items-center gap-2">
                  <FaFileAlt className="text-farm-500" />
                  Required Documents
                </h2>
                <ul className="space-y-3">
                  {documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-farm-500 mt-1">•</span>
                      <span className="text-farm-700 flex-1">
                        {typeof doc === 'string' ? doc : doc.text || doc}
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
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4 flex items-center gap-2">
                  <FaClipboardList className="text-farm-500" />
                  How to Apply
                </h2>
                <ol className="space-y-3 list-decimal list-inside">
                  {applicationSteps.map((step, idx) => (
                    <li key={idx} className="text-farm-700">
                      {typeof step === 'string' ? step : step.text || step}
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
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4">Official Links</h2>
                <div className="space-y-3">
                  {officialLinks.map((link, idx) => {
                    const linkObj = typeof link === 'string' ? { url: link, text: link } : link;
                    return (
                      <a
                        key={idx}
                        href={linkObj.url || linkObj}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-farm-500 text-white rounded-lg hover:bg-farm-600 transition-colors"
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
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => {
                    const faqObj = typeof faq === 'string' 
                      ? { question: faq, answer: '' } 
                      : { question: faq.question || faq.q || '', answer: faq.answer || faq.a || '' };
                    return (
                      <div key={idx} className="border-b border-farm-200 pb-4 last:border-0">
                        <h3 className="font-semibold text-farm-900 mb-2">{faqObj.question}</h3>
                        {faqObj.answer && (
                          <p className="text-farm-700">{faqObj.answer}</p>
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
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-6">Related Schemes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedSchemes.map((scheme, index) => (
                    <SchemeCard key={scheme.id} scheme={scheme} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Back Button */}
            <div className="text-center">
              <button onClick={() => router.push("/government-schemes")} className="farm-button">
                Back to All Schemes
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
      <div className="min-h-[calc(100vh-122px)] pt-8 pb-12">

        <div className="w-full max-w-7xl mx-auto px-4">

          {/* ======================================================= */}
          {/*            MOBILE HEADER (Premium Card Layout)           */}
          {/* ======================================================= */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              md:hidden 
              bg-gradient-to-br from-[#d7ffe8] to-[#f4fff8] dark:from-[#0b2718] dark:to-[#0e3821]
              shadow-[0_4px_20px_rgba(0,0,0,0.08)]
              dark:shadow-[0_4px_20px_rgba(0,0,0,0.45)]
              rounded-3xl p-5 mb-8 border border-gray-100 dark:border-gray-700
            "
          >
            <div className="flex items-center gap-4">
              <div className="
                w-14 h-14 rounded-2xl 
                bg-green-100 dark:bg-green-900/40
                flex items-center justify-center
              ">
                <FaBullhorn className="text-green-700 dark:text-green-300 text-3xl" />
              </div>

              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Government Schemes
                </h1>
                <p className="text-[13px] mt-1 text-gray-600 dark:text-gray-300 leading-snug">
                  Discover benefits & support available for farmers.
                </p>
              </div>
            </div>
          </motion.div>

          {/* DESKTOP NORMAL HEADER (Untouched) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 text-center hidden md:block"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaBullhorn className="text-4xl text-farm-600" />
              <h1 className="text-3xl md:text-5xl font-display font-bold text-farm-900">
                Government Schemes
              </h1>
            </div>
            <p className="text-lg text-farm-600 max-w-2xl mx-auto">
              Discover government schemes and benefits available for farmers and agricultural communities
            </p>
          </motion.div>

          {/* MOBILE SEARCH BOX (Premium rounded card) */}
          <div className="md:hidden mb-6">
            <div className="
              bg-white dark:bg-[#1e1e1e]
              rounded-2xl p-3 shadow-[0_4px_12px_rgba(0,0,0,0.08)]
              dark:shadow-[0_4px_12px_rgba(0,0,0,0.45)]
              border border-gray-100 dark:border-gray-700
            ">
              <SchemeSearch onSearch={handleSearch} />
            </div>
          </div>

          {/* DESKTOP SEARCH (Untouched) */}
          <motion.div 
            className="hidden md:block mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SchemeSearch onSearch={handleSearch} />
          </motion.div>

          {/* MOBILE FILTER BAR (Premium card) */}
          <div className="md:hidden mb-6">
            <div className="
              bg-white dark:bg-[#1e1e1e]
              rounded-2xl p-3 shadow-md
              border border-gray-100 dark:border-gray-700
            ">
              <SchemeFilterBar
                onCategoryChange={handleCategoryChange}
                onStateChange={handleStateChange}
                selectedCategory={selectedCategory}
                selectedState={selectedState}
              />
            </div>
          </div>

          {/* DESKTOP FILTER BAR (Untouched) */}
          <motion.div
            className="hidden md:block mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <SchemeFilterBar
              onCategoryChange={handleCategoryChange}
              onStateChange={handleStateChange}
              selectedCategory={selectedCategory}
              selectedState={selectedState}
            />
          </motion.div>

          {/* MOBILE RESULTS COUNT */}
          {!loading && !error && (
            <div className="text-sm text-gray-600 dark:text-gray-300 md:hidden mb-4 px-1">
              Showing {schemes.length} of {pagination.total} schemes
            </div>
          )}

          {/* Main Schemes List (Untouched) */}
          <SchemeList schemes={schemes} loading={loading} error={error} />

          {/* Pagination Desktop & Mobile (Untouched) */}
          {!loading && !error && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8"
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
    </ErrorBoundary>
  );
}
