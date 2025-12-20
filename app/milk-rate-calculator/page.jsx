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

export default function MilkRateDashboardPage() {
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
    if (!dateString) return "Recently";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
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
        relative: "Recently",
        full: dateString,
      };
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
            <LoadingSpinner text="Loading company details..." />
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
                {companyError || "Company not found"}
              </h3>
              <p className="text-farm-600 mb-4">
                {companyError || "The company you're looking for doesn't exist or has been removed."}
              </p>
              <Link href="/milk-rate-calculator" className="farm-button inline-block">
                Back to Dashboard
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
        <div className="min-h-[calc(100vh-122px)]">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-green-700 to-green-900 dark:from-[#0b2718] dark:to-[#0e3821] rounded-bl-3xl rounded-br-3xl text-white py-12"
          >
            <div className="w-full max-w-5xl mx-auto px-4">
              <button
                onClick={() => router.push("/milk-rate-calculator")}
                className="flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
              >
                <FaArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                  {getInitials(selectedCompany.name)}
                </div>

                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3">
                    {selectedCompany.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {selectedCompany.milk_type && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                        <FaTag className="w-4 h-4" />
                        {selectedCompany.milk_type}
                      </div>
                    )}
                    {selectedCompany.region && (
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                        {selectedCompany.region}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <FaCalendar className="w-4 h-4" />
                    <span>Updated {dateInfo.full}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="w-full max-w-5xl mx-auto px-4 py-12">
            {selectedCompany.description && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="farm-card p-8 mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-4">About</h2>
                <p className="text-farm-700 leading-relaxed whitespace-pre-line">
                  {selectedCompany.description}
                </p>
              </motion.section>
            )}

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="farm-card p-8 mb-8"
            >
              <h2 className="text-2xl font-display font-bold text-farm-900 mb-6">Rate Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-farm-50 rounded-xl text-center dark:bg-[#0a0a0a]">
                  <div className="text-sm text-farm-600 mb-2">Fat Rate</div>
                  <div className="text-3xl font-bold text-farm-900">
                    ₹{selectedCompany.fat_rate?.toFixed(2) || "N/A"}
                  </div>
                  <div className="text-xs text-farm-600 mt-1">per unit</div>
                </div>
                <div className="p-6 bg-farm-50 rounded-xl text-center dark:bg-[#0a0a0a]">
                  <div className="text-sm text-farm-600 mb-2">SNF Rate</div>
                  <div className="text-3xl font-bold text-farm-900">
                    ₹{selectedCompany.snf_rate?.toFixed(2) || "N/A"}
                  </div>
                  <div className="text-xs text-farm-600 mt-1">per unit</div>
                </div>
                <div className="p-6 bg-farm-50 rounded-xl text-center dark:bg-[#0a0a0a]">
                  <div className="text-sm text-farm-600 mb-2">Base Rate</div>
                  <div className="text-3xl font-bold text-farm-900">
                    ₹{selectedCompany.base_rate?.toFixed(2) || selectedCompany.per_liter_rate?.toFixed(2) || "N/A"}
                  </div>
                  <div className="text-xs text-farm-600 mt-1">per liter</div>
                </div>
              </div>

              {(selectedCompany.base_rate && selectedCompany.fat_multiplier && selectedCompany.snf_multiplier) && (
                <div className="mt-6 p-4 bg-farm-100 rounded-xl dark:bg-gray-950">
                  <div className="text-sm text-farm-700 font-medium mb-2">Rate Formula:</div>
                  <div className="text-farm-800 font-mono text-sm">
                    Rate = Base ({selectedCompany.base_rate}) + Fat × {selectedCompany.fat_multiplier} + SNF × {selectedCompany.snf_multiplier}
                  </div>
                </div>
              )}
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="farm-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaCalculator className="text-2xl text-farm-600" />
                <h2 className="text-2xl font-display font-bold text-farm-900">Calculate Your Rate</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">Fat (%)</label>
                  <input
                    type="number"
                    step={0.1}
                    min={0}
                    max={10}
                    value={fat}
                    onChange={(e) => setFat(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-farm-200 rounded-xl focus:border-farm-500 focus:ring-4 focus:ring-farm-100 transition-all duration-300 bg-white text-farm-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">SNF (%)</label>
                  <input
                    type="number"
                    step={0.1}
                    min={0}
                    max={15}
                    value={snf}
                    onChange={(e) => setSnf(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-farm-200 rounded-xl focus:border-farm-500 focus:ring-4 focus:ring-farm-100 transition-all duration-300 bg-white text-farm-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-farm-700 mb-2">Quantity (Liters)</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-farm-200 rounded-xl focus:border-farm-500 focus:ring-4 focus:ring-farm-100 transition-all duration-300 bg-white text-farm-900"
                  />
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-farm-500 to-farm-600 rounded-xl text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Rate per Liter</div>
                    <div className="text-3xl font-bold">₹{calculatedRate}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">Total Amount</div>
                    <div className="text-3xl font-bold">₹{total}</div>
                  </div>
                </div>
              </div>
            </motion.section>

            {selectedCompany.historicalRates && selectedCompany.historicalRates.length > 0 ? (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="farm-card p-8 mb-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FaChartLine className="text-2xl text-farm-600" />
                  <h2 className="text-2xl font-display font-bold text-farm-900">Rate Trends (Last 30 Days)</h2>
                </div>
                <div className="space-y-3">
                  {selectedCompany.historicalRates.slice(0, 10).map((rate, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-farm-50 rounded-xl">
                      <div>
                        <div className="text-sm text-farm-600">
                          {new Date(rate.created_at).toLocaleDateString()}
                        </div>
                        <div className="text-farm-900 font-semibold">
                          Fat: ₹{rate.fat_rate?.toFixed(2)} | SNF: ₹{rate.snf_rate?.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-farm-900">
                        ₹{rate.per_liter_rate?.toFixed(2) || calculateRate(rate.fat_rate || 4, rate.snf_rate || 8.5).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            ) : (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="farm-card p-8 mb-8 text-center"
              >
                <FaChartLine className="w-12 h-12 text-farm-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-farm-700 mb-2">No Historical Data Available</h3>
                <p className="text-farm-600">Historical rate trends will appear here once data is available.</p>
              </motion.section>
            )}

            {selectedCompany.relatedCompanies && selectedCompany.relatedCompanies.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-display font-bold text-farm-900 mb-6">Related Companies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <div className="min-h-[calc(100vh-122px)] pt-8 pb-12">
        <div className="w-full max-w-7xl mx-auto px-4">

          {/* 🌟 MOBILE PREMIUM HEADER (Same as News header) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              md:hidden
              rounded-3xl p-6
              shadow-[0_10px_30px_-10px_rgba(0,0,0,0.25)]
              bg-gradient-to-br from-[#d7ffe8] to-[#f4fff8]
              dark:from-[#0b2718] dark:to-[#0e3821]
              border border-white/60 dark:border-[#1a4a2d]
              mb-8
            "
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/80 dark:bg-white/10 rounded-2xl flex items-center justify-center shadow-inner">
                <FaCalculator className="text-3xl text-green-700 dark:text-green-300" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-green-800 dark:text-white">
                  Milk Rate Dashboard
                </h1>
                <p className="text-sm text-green-700/80 dark:text-green-200/80 mt-1">
                  Compare milk rates from different dairy companies and find the best rates for your milk
                </p>
              </div>
            </div>
          </motion.div>

          {/* DESKTOP HEADER – unchanged */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden md:block mb-8 text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaCalculator className="text-4xl text-farm-600" />
              <h1 className="text-5xl font-display font-bold text-farm-900">
                Milk Rate Dashboard
              </h1>
            </div>
            <p className="text-lg text-farm-600 max-w-2xl mx-auto">
              Compare milk rates from different dairy companies and find the best rates for your milk
            </p>
          </motion.div>

          {/* Comparison Calculator */}
          {allCompanies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
              <ComparisonCalculator companies={allCompanies} />
            </motion.div>
          )}

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-6"
          >
            <MilkRateSearch onSearch={handleSearch} />
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <MilkRateFilters
              onMilkTypeChange={handleMilkTypeChange}
              onRegionChange={handleRegionChange}
              selectedMilkType={selectedMilkType}
              selectedRegion={selectedRegion}
            />
          </motion.div>

          {/* Results Count */}
          {!loading && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 text-sm text-farm-600"
            >
              Showing {companies.length} of {pagination.total} companies
            </motion.div>
          )}

          {/* List */}
          <MilkRateList companies={companies} loading={loading} error={error} />

          {/* Pagination */}
          {!loading && !error && pagination.totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
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
