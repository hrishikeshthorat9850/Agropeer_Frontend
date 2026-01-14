"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaMicrophone,
  FaPaperPlane,
  FaTimes,
  FaArrowLeft
} from "react-icons/fa";
import AILanguageSelector from "./AILanguageSelector";
import { FaBrain, FaRobot, FaChartLine } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function AIChatWindow({ open, setOpen }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState();
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [languageModalOpen, setlanguageModalOpen] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const { t } = useLanguage();

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "mr", label: "Marathi" },
  ];

  const handleLanguageChange = (l) => {
    setCurrentLanguage(l);
    setlanguageModalOpen(false);
  }
  /* ================== BODY SCROLL LOCK ================== */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [open]);

  /* ================== AUTO SCROLL ================== */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /* ================== SEND MESSAGE ================== */
  const handleSendMessage = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    const newUserMessage = {
      id: Date.now(),
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history, currentLanguage })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get response");

      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: t("chat_error_message"),
        timestamp: new Date().toISOString(),
        error: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  /* ================== ENTER KEY SEND ================== */
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* ============ BACKDROP (Click to Close) ============ */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed inset-0 
            bg-black/40 
            backdrop-blur-sm 
            z-[9998]
          "
        />
      )}

      {/* ============ CHAT WINDOW ============ */}
      <div
        className={`
          fixed z-[9999] py-0
          bg-white dark:bg-[#1E1E1E]
          border border-gray-200 dark:border-gray-800
          shadow-2xl flex flex-col overflow-hidden
          ${open ? "pointer-events-auto" : "pointer-events-none"}
        `}
        style={{
          ...(typeof window !== "undefined" && window.innerWidth < 768
            ? {
              top: "70px",
              bottom: "80px",
              left: "16px",
              right: "16px",
              height: "auto",
              width: "auto",
              borderRadius: "24px",
              transform: open ? "scale(1)" : "scale(0.95) translateY(20px)",
              opacity: open ? 1 : 0,
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            }
            : {}),

          ...(typeof window !== "undefined" && window.innerWidth >= 768
            ? {
              top: "100px",
              right: "24px",
              bottom: "24px",
              width: "400px",
              left: "auto",
              height: "650px",
              borderRadius: "24px",
              transform: open ? "translateY(0)" : "translateY(120%)"
            }
            : {})
        }}
      >

        {/* ================== HEADER ================== */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-md sticky top-0 z-10">

          {/* LEFT — BRAND */}
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="
                  w-8 h-8 flex items-center justify-center rounded-full
                  hover:bg-gray-100 dark:hover:bg-white/10
                  transition text-gray-600 dark:text-gray-300
                "
              >
                <FaArrowLeft size={16} />
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <FaRobot className="text-white text-sm" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800 dark:text-white leading-tight">AgroBot</span>
                <span className="text-[10px] text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT — LANGUAGE + CLOSE */}
          <div className="flex items-center gap-1">
            <AILanguageSelector languages={languages} handleLanguageChange={handleLanguageChange} languageModalOpen={languageModalOpen} />

            <button
              onClick={() => setOpen(false)}
              className="
                w-8 h-8 flex items-center justify-center rounded-full
                hover:bg-gray-100 dark:hover:bg-white/10
                transition text-gray-500 dark:text-gray-400
              "
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        {/* ================== MAIN CONTENT ================== */}
        <div
          ref={scrollContainerRef}
          className="px-5 mt-5 overflow-y-auto h-[calc(100%-140px)] pb-5"
          style={{ scrollBehavior: "smooth" }}
        >
          {messages.length === 0 ? (
            <>
              {/* ASK AI */}
              <div className="
                bg-gradient-to-br from-emerald-600/40 to-emerald-500/30 
                border border-white/10 backdrop-blur-xl 
                p-5 rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.3)]
                flex flex-col items-center text-center mb-5
              ">
                <FaBrain size={36} className="text-white" />
                <h2 className="text-xl font-semibold mt-2 text-white">{t("chat_ask_ai")}</h2>
                <p className="text-sm opacity-80 mt-1 text-white/80">
                  {t("chat_greeting")}
                </p>
              </div>

              <div className="w-full mb-5 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <p className="text-[11px] text-center font-semibold uppercase tracking-wide text-emerald-200">
                  {t("chat_farming_assistance")}
                </p>
                <p className="text-sm text-center mt-1 text-white/75">
                  {t("chat_assistance_desc")}
                </p>
              </div>

              {/* FEATURE CARDS */}
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="
                  bg-white/10 hover:bg-white/20 
                  border border-white/10 backdrop-blur-xl 
                  shadow-lg transition p-4 rounded-xl 
                  flex flex-col items-center text-center cursor-pointer
                ">
                  <FaCloud size={30} className="text-white" />
                  <p className="mt-2 text-sm font-medium text-white">Weather</p>
                </div>

                <div className="
                  bg-white/10 hover:bg-white/20 
                  border border-white/10 backdrop-blur-xl 
                  shadow-lg transition p-4 rounded-xl 
                  flex flex-col items-center text-center cursor-pointer
                ">
                  <FaChartLine size={30} className="text-white" />
                  <p className="mt-2 text-sm font-medium text-white">Market Prices</p>
                </div>
              </div> */}
            </>
          ) : (
            <div className="space-y-6 pb-20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex flex-col max-w-[85%] ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`
                      px-5 py-3 shadow-sm relative
                      ${message.role === "user"
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl rounded-tr-sm"
                          : message.error
                            ? "bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-300 rounded-2xl"
                            : "bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 text-gray-800 dark:text-gray-100 rounded-2xl rounded-tl-sm"
                        }
                    `}
                    >
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-white/5 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* ================== INPUT BAR ================== */}
        <form
          onSubmit={handleSendMessage}
          className="
          absolute bottom-0 left-0 w-full
          bg-white dark:bg-[#121212]
          border-t border-gray-100 dark:border-white/5
          p-3 pb-safe-bottom
          flex items-center gap-2
          z-20
        "
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="
            flex-1 px-5 py-3 rounded-full text-[15px]
            bg-gray-100 dark:bg-[#1a1a1a] 
            border-transparent focus:border-green-500
            text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600
            outline-none transition-all
          "
            placeholder={t("chat_placeholder")}
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="
            w-12 h-12 flex items-center justify-center rounded-full
            bg-green-600 text-white shadow-lg shadow-green-600/20
            disabled:opacity-50 disabled:cursor-not-allowed 
            hover:scale-105 active:scale-95 transition-transform
          "
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FaPaperPlane size={18} className="ml-0.5" />
            )}
          </button>
        </form>
      </div >
    </>
  );
}
