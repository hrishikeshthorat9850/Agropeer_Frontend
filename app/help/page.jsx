"use client";
import { useState } from "react";
import { FaPlus, FaMinus, FaHeadset, FaEnvelope, FaPhone } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function HelpSupport() {
  const { t } = useLanguage();

  const faqs = [
    {
      q: t("faq1_q"),
      a: t("faq1_a"),
    },
    {
      q: t("faq2_q"),
      a: t("faq2_a"),
    },
    {
      q: t("faq3_q"),
      a: t("faq3_a"),
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support Message Sent:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-[calc(100vh-122px)] py-10 px-2">

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <FaHeadset className="text-green-600 text-4xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-farm-900">{t("help_title")}</h1>
        <p className="text-farm-700 mt-2">{t("help_subtitle")}</p>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-200 dark:bg-[#272727] dark:border-white/20">
        <h2 className="text-xl font-bold text-farm-900 mb-4">{t("faq_title")}</h2>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 bg-gray-50 cursor-pointer dark:bg-[#1E1E1E] dark:border-none"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-farm-900 dark:text-gray-200">{f.q}</span>
                {openIndex === i ? (
                  <FaMinus className="text-green-600" />
                ) : (
                  <FaPlus className="text-green-600" />
                )}
              </div>

              {openIndex === i && (
                <p className="mt-2 text-sm text-farm-700">{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Support Form */}
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 dark:bg-[#272727] dark:border-white/20">
        <h2 className="text-xl font-bold text-farm-900 mb-4 flex items-center gap-2">
          <FaEnvelope className="text-green-600" /> {t("support_title")}
        </h2>

        {submitted && (
          <div className="mb-3 px-4 py-2 bg-green-600 text-white rounded-lg text-sm">
            ✅ {t("support_success")}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder={t("input_name")}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="email"
            placeholder={t("input_email")}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-green-500"
            required
          />
          <textarea
            rows="4"
            placeholder={t("input_message")}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full border-2 border-green-300 rounded-lg px-3 py-2 text-black focus:ring-2 focus:ring-green-500"
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition"
          >
            {t("btn_send")}
          </button>
        </form>
      </div>

      {/* Other Support */}
      <div className="max-w-3xl mx-auto mt-10 p-6 rounded-2xl text-center bg-gradient-to-r from-green-50 to-green-100 border border-green-300 shadow-sm dark:bg-none dark:bg-[#272727] dark:border-white/20">
        <h2 className="text-lg font-semibold text-farm-900 flex items-center justify-center gap-2 mb-2">
          <FaPhone className="text-green-600" /> {t("other_support_title")}
        </h2>

        <p className="text-farm-700 text-sm">
          📞 {t("call_us")}: +91 98765 43210
        </p>

        <p className="text-farm-700 text-sm">
          📧 {t("email_us")}: support@agroinsta.com
        </p>
      </div>
    </div>
  );
}
