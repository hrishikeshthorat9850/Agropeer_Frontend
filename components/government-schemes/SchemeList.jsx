"use client";
import { motion } from "framer-motion";
import SchemeCard from "./SchemeCard";
import SchemeLoader from "./SchemeLoader";
import { FaInbox } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function SchemeList({ schemes, loading, error }) {
  const { t } = useLanguage();
  if (loading) {
    return <SchemeLoader count={6} />;
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
          {t("something_wrong")}
        </h3>
        <p className="text-farm-600">{error}</p>
      </motion.div>
    );
  }

  if (!schemes || schemes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="farm-card p-12 text-center"
      >
        <FaInbox className="w-16 h-16 text-farm-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-farm-700 mb-2">
          {t("scheme_not_found")}
        </h3>
        <p className="text-farm-600">
          {t("scheme_not_found_desc")}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schemes.map((scheme, index) => (
        <SchemeCard key={scheme.id} scheme={scheme} index={index} />
      ))}
    </div>
  );
}

