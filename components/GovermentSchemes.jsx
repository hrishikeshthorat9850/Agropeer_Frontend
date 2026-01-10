"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function GovernmentSchemes() {
  const { t } = useLanguage();

  const schemes = [
    {
      title: t("scheme_pm_kisan_title"),
      description: t("scheme_pm_kisan_desc"),
      link: "https://pmkisan.gov.in/"
    },
    {
      title: t("scheme_fasal_bima_title"),
      description: t("scheme_fasal_bima_desc"),
      link: "https://pmfby.gov.in/"
    },
    {
      title: t("scheme_soil_health_title"),
      description: t("scheme_soil_health_desc"),
      link: "https://soilhealth.dac.gov.in/"
    },
    {
      title: t("scheme_kcc_title"),
      description: t("scheme_kcc_desc"),
      link: "https://www.pmkisan.gov.in/Documents/KCC.pdf"
    },
    {
      title: t("scheme_enam_title"),
      description: t("scheme_enam_desc"),
      link: "https://enam.gov.in/"
    }
  ];

  return (
    <section className="w-full max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-800">
        <FaStar className="text-yellow-500" />
        {t("gov_schemes_title")}
      </h2>
      <div className="grid gap-6">
        {schemes.map((scheme, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow border border-green-100 p-6 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-2">{scheme.title}</h3>
              <p className="text-green-800 mb-3">{scheme.description}</p>
            </div>
            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition"
            >
              {t("gov_schemes_learn_more")}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
} 