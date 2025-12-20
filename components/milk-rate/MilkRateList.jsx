"use client";
import { motion } from "framer-motion";
import MilkCompanyCard from "./MilkCompanyCard";
import MilkRateLoader from "./MilkRateLoader";
import { FaInbox } from "react-icons/fa";

export default function MilkRateList({ companies, loading, error }) {
  if (loading) {
    return <MilkRateLoader count={6} />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="farm-card p-12 text-center"
      >
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-farm-700 mb-2">
          Something went wrong
        </h3>
        <p className="text-farm-600">{error}</p>
      </motion.div>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="farm-card p-12 text-center"
      >
        <FaInbox className="w-16 h-16 text-farm-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-farm-700 mb-2">
          No companies found
        </h3>
        <p className="text-farm-600">
          Try adjusting your filters or search terms
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company, index) => (
        <MilkCompanyCard key={company.id} company={company} index={index} />
      ))}
    </div>
  );
}

