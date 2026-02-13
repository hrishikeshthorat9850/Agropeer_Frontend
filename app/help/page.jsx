"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Headphones,
  Mail,
  Phone,
  MessageCircle,
  Send,
  ArrowLeft,
} from "lucide-react";
import { useLanguage } from "@/Context/languagecontext";
import { useRouter } from "next/navigation";
import MobilePageContainer from "@/components/mobile/MobilePageContainer";
// ADDITIVE ENHANCEMENT: Import back transition hook for smooth UI transitions
// This does NOT replace existing logic - it only enhances UI transitions
import { useBackTransition } from "@/hooks/useBackTransition";

export default function HelpSupport() {
  const { t } = useLanguage();
  const router = useRouter();
  // ADDITIVE ENHANCEMENT: Get back transition handler
  // Original router.back() still available, this adds smooth transitions
  const { routerBack } = useBackTransition();

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Support Message Sent:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <MobilePageContainer noPadding>
      <div className="min-h-screen bg-white dark:bg-black font-sans pb-10">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-[#2C2C2E]">
          <div className="flex items-center gap-3 px-4 h-14">
            <button
              onClick={() => routerBack()}
              className="p-2 -ml-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
            >
              {/* 
                ENHANCED: Changed router.back() to routerBack() for smooth transition
                PRESERVED: All other behavior unchanged
              */}
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {t("help_title")}
            </h1>
          </div>
        </div>

        <div className="p-4 sm:p-6 max-w-2xl mx-auto">
          {/* Hero / Intro */}
          <div className="text-center mb-8 mt-2">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-500">
              <Headphones size={32} />
            </div>
            {/* <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("how_can_we_help") || "How can we help you?"}
            </h2> */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t("help_subtitle")}
            </p>
          </div>

          {/* FAQs Section */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-4 ml-1">
              {t("faq_title")}
            </h3>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className={`
                          group border-2 border-transparent bg-gray-50 dark:bg-[#1C1C1E] rounded-2xl overflow-hidden transition-all duration-300
                          ${
                            openIndex === i
                              ? "border-green-100 dark:border-green-900/30 bg-green-50/30 dark:bg-green-900/10"
                              : ""
                          }
                       `}
                >
                  <button className="w-full flex items-center justify-between p-4 text-left">
                    <span
                      className={`font-semibold text-sm sm:text-base ${
                        openIndex === i
                          ? "text-green-700 dark:text-green-400"
                          : "text-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {f.q}
                    </span>
                    <div
                      className={`
                            transition-transform duration-300
                            ${
                              openIndex === i
                                ? "rotate-180 text-green-600"
                                : "text-gray-400"
                            }
                         `}
                    >
                      <ChevronDown size={20} />
                    </div>
                  </button>

                  <div
                    className={`
                          grid transition-[grid-template-rows] duration-300 ease-out
                          ${
                            openIndex === i
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }
                       `}
                  >
                    <div className="overflow-hidden">
                      <div className="p-4 pt-0 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4 ml-1">
              <MessageCircle size={18} className="text-green-600" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                {t("support_title")}
              </h3>
            </div>

            <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl border border-gray-100 dark:border-[#2C2C2E] shadow-xl shadow-gray-100/50 dark:shadow-none p-5 sm:p-6">
              {submitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-xl text-center font-medium animate-in fade-in zoom-in duration-300">
                  ✅ {t("support_success")}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder={t("input_name")}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#2C2C2E] border-none rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium"
                      required
                    />
                    <input
                      type="email"
                      placeholder={t("input_email")}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#2C2C2E] border-none rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition-all font-medium"
                      required
                    />
                    <textarea
                      rows="4"
                      placeholder={t("input_message")}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-[#2C2C2E] border-none rounded-xl px-4 py-3.5 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 outline-none transition-all resize-none font-medium"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={18} />
                    {t("btn_send")}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Footer Contact Info */}
          <div className="bg-gray-50 dark:bg-[#1C1C1E] rounded-2xl p-5 border border-dashed border-gray-200 dark:border-[#2C2C2E] text-center">
            <h4 className="text-gray-900 dark:text-white font-semibold mb-3 flex items-center justify-center gap-2">
              <Headphones size={18} className="text-gray-400" />
              {t("other_support_title")}
            </h4>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              {/* <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors bg-white dark:bg-[#2C2C2E] px-4 py-2 rounded-lg shadow-sm w-full sm:w-auto justify-center"
              >
                <Phone size={16} />
                +91 98765 43210
              </a> */}
              <a
                href="mailto:infoagropeer@gmail.com"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors bg-white dark:bg-[#2C2C2E] px-4 py-2 rounded-lg shadow-sm w-full sm:w-auto justify-center"
              >
                <Mail size={16} />
                infoagropeer@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </MobilePageContainer>
  );
}
