import React from "react";
import { FaStar } from "react-icons/fa";

const schemes = [
  {
    title: "PM-Kisan Samman Nidhi",
    description: "Direct income support of Rs. 6,000 per year to small and marginal farmers, paid in three installments.",
    link: "https://pmkisan.gov.in/"
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme to protect farmers against crop loss due to natural calamities, pests, and diseases.",
    link: "https://pmfby.gov.in/"
  },
  {
    title: "Soil Health Card Scheme",
    description: "Provides soil health cards to farmers with crop-wise recommendations for nutrients and fertilizers.",
    link: "https://soilhealth.dac.gov.in/"
  },
  {
    title: "Kisan Credit Card (KCC)",
    description: "Provides timely access to credit for farmers to meet their agricultural needs.",
    link: "https://www.pmkisan.gov.in/Documents/KCC.pdf"
  },
  {
    title: "National Agriculture Market (eNAM)",
    description: "Online trading platform for agricultural commodities to help farmers get better prices.",
    link: "https://enam.gov.in/"
  }
];

export default function GovernmentSchemes() {
  return (
    <section className="w-full max-w-2xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-800">
        <FaStar className="text-yellow-500" />
        Government Schemes for Farmers
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
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
} 