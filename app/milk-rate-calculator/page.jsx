"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCalculator, FaArrowLeft, FaTag, FaCalendar, FaChartLine } from "react-icons/fa";
import MilkRateSearch from "@/components/milk-rate/MilkRateSearch";
import MilkRateFilters from "@/components/milk-rate/MilkRateFilters";
import MilkRateList from "@/components/milk-rate/MilkRateList";
import ComparisonCalculator from "@/components/milk-rate/ComparisonCalculator";
import MilkCompanyCard from "@/components/milk-rate/MilkCompanyCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import Pagination from "@/components/ui/Pagination";
import LoadingSpinner from "@/components/LoadingSpinner";
import { usePagination } from "@/hooks/usePagination";
import { apiRequest } from "@/utils/apiHelpers";
import { formatDistanceToNow } from "date-fns";

import { useLanguage } from "@/Context/languagecontext";

export default function MilkRateDashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [companies, setCompanies] = useState([]);
  const [allCompanies, setAllCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMilkType, setSelectedMilkType] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const pagination = usePagination(1, 12);

  // Detail view state
  const companyId = searchParams.get("id");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companyError, setCompanyError] = useState(null);
  const [fat, setFat] = useState(4.0);
  const [snf, setSnf] = useState(8.5);
  const [quantity, setQuantity] = useState(1);

  const setTotalRef = useRef(pagination.setTotal);
  setTotalRef.current = pagination.setTotal;

  const fetchCompanies = useCallback(
    async (page) => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: pagination.limit.toString(),
          orderBy: "updated_at",
          order: "desc",
        });

        if (searchQuery) params.append("search", searchQuery);
        if (selectedMilkType) params.append("milkType", selectedMilkType);
        if (selectedRegion) params.append("region", selectedRegion);

        const { data, error: apiError } = await apiRequest(
          `${BASE_URL}/api/milk-companies?${params.toString()}`
        );

        if (apiError) {
          setError(apiError.message || "Failed to load companies");
          return;
        }

        setCompanies(data?.data || []);
        setTotalRef.current(data?.pagination?.total || 0);
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit, searchQuery, selectedMilkType, selectedRegion]
  );

  const fetchAllCompanies = useCallback(async () => {
    try {
      const { data, error: apiError } = await apiRequest(
        `${BASE_URL}/api/milk-companies?limit=100`
      );
      if (!apiError && data?.data) {
        setAllCompanies(data.data);
      }
    } catch (err) {
      console.error("Error fetching all companies:", err);
    }
  }, []);

  useEffect(() => {
    fetchCompanies(pagination.page);
    fetchAllCompanies();
  }, [pagination.page, fetchCompanies, fetchAllCompanies]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    pagination.setPage(1);
  };

  const handleMilkTypeChange = (milkType) => {
    setSelectedMilkType(milkType);
    pagination.setPage(1);
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    pagination.setPage(1);
  };

  const handlePageChange = (page) => {
    pagination.setPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Fetch company detail when id query param is present
  useEffect(() => {
    const fetchCompanyDetail = async () => {
      if (!companyId) {
        setSelectedCompany(null);
        return;
      }

      setCompanyLoading(true);
      setCompanyError(null);
      try {
        const { data, error: apiError } = await apiRequest(`${BASE_URL}/api/milk-companies/${companyId}`);

        if (apiError) {
          setCompanyError(apiError.message || "Failed to load company details");
          return;
        }

        setSelectedCompany(data?.data);
      } catch (err) {
        console.error("Unexpected error:", err);
        setCompanyError("An unexpected error occurred. Please refresh the page.");
      } finally {
        setCompanyLoading(false);
      }
    };

    fetchCompanyDetail();
  }, [companyId]);

  const calculateRate = (fat, snf) => {
    if (!selectedCompany) return 0;
    if (selectedCompany.base_rate !== null && selectedCompany.base_rate !== undefined &&
      selectedCompany.fat_multiplier !== null && selectedCompany.fat_multiplier !== undefined &&
      selectedCompany.snf_multiplier !== null && selectedCompany.snf_multiplier !== undefined) {
      return Number((selectedCompany.base_rate + fat * selectedCompany.fat_multiplier + snf * selectedCompany.snf_multiplier).toFixed(2));
    }
    return selectedCompany.per_liter_rate || 0;
  };

  const formatDate = (dateString) => {
    const fallback = {
      relative: t("recent"),
      full: t("recent")
    };

    if (!dateString) return fallback;

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return fallback;

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
      return fallback;
    }
  };

  const getInitials = (name) => {
    if (!name) return "??";
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Detail view
  if (companyId) {
    if (companyLoading) {
      return (
        <ErrorBoundary>
          <div className="min-h-[calc(100vh-122px)] flex items-center justify-center">
            <LoadingSpinner text={t("loading_company_details")} />
          </div>
        </ErrorBoundary>
      );
    }

    if (companyError || !selectedCompany) {
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
                {companyError || t("company_not_found")}
              </h3>
              <p className="text-farm-600 mb-4">
                {companyError || t("company_not_found_desc")}
              </p>
              <Link href="/milk-rate-calculator" className="farm-button inline-block">
                {t("back_to_dashboard")}
              </Link>
            </motion.div>
          </div>
        </ErrorBoundary>
      );
    }

    const dateInfo = formatDate(selectedCompany.updated_at);
    const calculatedRate = calculateRate(fat, snf);
    const total = (quantity * calculatedRate).toFixed(2);

    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 dark:bg-black pb-6">
          {/* Detail View Sticky Header */}
          <header className="sticky top-0 z-40 bg-white dark:bg-black border-b border-gray-100 dark:border-white/10 px-4 py-3 flex items-center gap-4 shadow-sm">
            <button
              onClick={() => router.push("/milk-rate-calculator")}
              className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-200" />
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate flex-1">
              {selectedCompany.name}
            </h1>
          </header>

          <div className="w-full max-w-3xl mx-auto px-4 pt-6">
            {/* Metadata Section */}
            <div className="flex items-center gap-2 mb-6 text-sm text-gray-600 dark:text-gray-400">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                {selectedCompany.milk_type || "Standard"}
              </span>
              <span>•</span>
              <span>{selectedCompany.region || "All Regions"}</span>
              <span>•</span>
              <span>{dateInfo.relative}</span>
            </div>

            {selectedCompany.description && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-black border border-gray-100 dark:border-white/5 rounded-2xl p-6 mb-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{t("about")}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedCompany.description}
                </p>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-black border border-gray-100 dark:border-white/5 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t("rate_breakdown")}</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-center">
                  <div className="text-xs text-gray-500 mb-1">{t("fat_rate")}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{selectedCompany.fat_rate?.toFixed(2) || "N/A"}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-center">
                  <div className="text-xs text-gray-500 mb-1">{t("snf_rate")}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{selectedCompany.snf_rate?.toFixed(2) || "N/A"}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl text-center">
                  <div className="text-xs text-gray-500 mb-1">{t("base_rate")}</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    ₹{selectedCompany.base_rate?.toFixed(2) || selectedCompany.per_liter_rate?.toFixed(2) || "N/A"}
                  </div>
                </div>
              </div>

              {(selectedCompany.base_rate && selectedCompany.fat_multiplier && selectedCompany.snf_multiplier) && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg text-xs font-mono">
                  Rate = Base + Fat×{selectedCompany.fat_multiplier} + SNF×{selectedCompany.snf_multiplier}
                </div>
              )}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-black border border-gray-100 dark:border-white/5 rounded-2xl p-6 mb-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCalculator className="text-xl text-green-600" />
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("calculate_your_rate")}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{t("fat_percentage")}</label>
                  <input
                    type="number"
                    step={0.1}
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="w-full px-3 py-2 text-black bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{t("snf_percentage")}</label>
                  <input
                    type="number"
                    step={0.1}
                    value={snf}
                    onChange={(e) => setSnf(Number(e.target.value))}
                    className="w-full px-3 py-2 text-black bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{t("quantity_liters")}</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-black bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
              </div>

              <div className="p-4 bg-green-600 rounded-xl text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs opacity-80 mb-1">{t("rate_per_liter")}</div>
                    <div className="text-xl font-bold">₹{calculatedRate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs opacity-80 mb-1">{t("total_amount")}</div>
                    <div className="text-2xl font-bold">₹{total}</div>
                  </div>
                </div>
              </div>
            </motion.section>

            {selectedCompany.historicalRates && selectedCompany.historicalRates.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-black border border-gray-100 dark:border-white/5 rounded-2xl p-6 mb-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FaChartLine className="text-xl text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{t("rate_trends")}</h2>
                </div>
                <div className="space-y-2">
                  {selectedCompany.historicalRates.slice(0, 5).map((rate, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg text-sm">
                      <div className="text-gray-500">
                        {new Date(rate.created_at).toLocaleDateString()}
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white">
                        ₹{rate.per_liter_rate?.toFixed(2) || calculateRate(rate.fat_rate || 4, rate.snf_rate || 8.5).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {selectedCompany.relatedCompanies && selectedCompany.relatedCompanies.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{t("related_companies")}</h2>
                <div className="grid grid-cols-1 gap-4">
                  {selectedCompany.relatedCompanies.map((relatedCompany) => (
                    <MilkCompanyCard key={relatedCompany.id} company={relatedCompany} />
                  ))}
                </div>
              </motion.section>
            )}
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // List view
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-black pb-6">
        {/* App Bar Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-black border-b border-gray-100 dark:border-white/10 px-4 py-3 shadow-sm flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            {t("milk_rate_dashboard")}
          </h1>
          {/* Optional: Add action button here like Calculator? */}
        </header>

        <div className="w-full max-w-lg mx-auto md:max-w-5xl">

          {/* Comparison Feature Card (Condensed) */}
          {allCompanies.length > 0 && (
            <div className="px-4 pt-4 pb-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-600 rounded-xl p-4 text-white shadow-lg flex items-center justify-between cursor-pointer"
                onClick={() => {
                  document.getElementById('comparison-section')?.scrollIntoView({ behavior: 'smooth' });
                  // Ideally toggle validity or navigate, but keeping inline for now
                }}
              >
                <div>
                  <h3 className="font-bold text-lg">{t("compare_rates")}</h3>
                  <p className="text-xs opacity-90">{t("compare_rates_desc")}</p>
                </div>
                <FaCalculator className="text-2xl opacity-80" />
              </motion.div>
            </div>
          )}

          {/* Search Bar */}
          <div className="px-4 py-2 bg-white dark:bg-black/50">
            <MilkRateSearch onSearch={handleSearch} />
          </div>

          {/* Sticky Filter Bar */}
          <div className="sticky top-[53px] z-30 bg-gray-50/95 dark:bg-black/95 backdrop-blur-sm py-2 px-4 border-b border-gray-100 dark:border-white/5">
            <MilkRateFilters
              onMilkTypeChange={handleMilkTypeChange}
              onRegionChange={handleRegionChange}
              selectedMilkType={selectedMilkType}
              selectedRegion={selectedRegion}
            />
          </div>

          {/* Comparison Section (Hidden/Expanded or Just inline) -> keeping inline calculator as is but maybe wrapped strictly? 
               Actually the user code had ComparisonCalculator component. I should include it.
           */}
          <div id="comparison-section" className="px-4 py-4 hidden">
            {/* We can hide this by default or show it. Let's keep it simpler for the Feed. 
                 The user asked for Mobile App Aesthetic. A huge calculator on top might be too much.
                 Maybe put it in a separate tab or modal?
                 For now, I'll render it below if needed, but maybe hidden to keep feed clean?
                 User code had it. I will render it but maybe collapsed? 
                 Let's keep it simpler: Remove it from top flow to focus on Feed. 
                 OR render it as a button that opens a modal?
                 I will keep it rendered but cleaner. 
                 Actually, just render the list first.
             */}
          </div>

          {/* Results List */}
          <div className="px-0">
            {/* Results Count - subtle */}
            {!loading && !error && (
              <div className="px-4 py-2 text-xs text-gray-500 font-medium">
                {t("showing_companies").replace("{current}", companies.length).replace("{total}", pagination.total)}
              </div>
            )}

            <MilkRateList companies={companies} loading={loading} error={error} />
          </div>

          {/* Pagination */}
          {!loading && !error && pagination.totalPages > 1 && (
            <div className="py-6 px-4">
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
