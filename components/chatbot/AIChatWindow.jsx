"use client";
import { useState, useRef, useEffect } from "react";
import {
  FaMicrophone,
  FaPaperPlane,
  FaTimes,
  FaArrowLeft
} from "react-icons/fa";
import AILanguageSelector from "./AILanguageSelector";
import { FaBrain, FaCloud, FaChartLine } from "react-icons/fa";

export default function AIChatWindow({ open, setOpen }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentLanguage,setCurrentLanguage] = useState();
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [languageModalOpen, setlanguageModalOpen] = useState(false);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const languages = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "mr", label: "Marathi" },
  ];

  const handleLanguageChange = (l)=>{
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
        body: JSON.stringify({ message: userMessage, history,currentLanguage })
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
        content: "Sorry, I encountered an error. Please try again.",
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
          fixed z-[9999] py-2
          transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "translate-y-[120%]"}
        `}
        style={{
          background: "#1B1F23",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid gray",
          boxShadow: "0 8px 35px rgba(0,0,0,0.45)",

          ...(typeof window !== "undefined" && window.innerWidth < 768
            ? {
                left: "0",
                right: "0",
                top: "auto",
                bottom: "calc(env(safe-area-inset-bottom) + 70px)",
                height:
                  "calc(100vh - (env(safe-area-inset-top) + 56px) - (env(safe-area-inset-bottom) + 70px))",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }
            : {}),

          ...(typeof window !== "undefined" && window.innerWidth >= 768
            ? {
                top: "122px",
                right: "1rem",
                bottom: "1rem",
                width: "440px",
                left: "auto",
                borderRadius: "20px",
                transform: open ? "translateY(0)" : "translateY(120%)"
              }
            : {})
        }}
      >

        {/* ================== HEADER ================== */}
        <div className="flex items-center justify-between px-5">

          {/* LEFT — BACK BUTTON */}
          <div className="flex items-center gap-3">
            {messages.length > 0 && (
              <button
                onClick={() => setMessages([])}
                className="
                  bg-white/20 hover:bg-white/30
                  border border-white/20
                  p-2 rounded-lg
                  backdrop-blur-xl transition shadow-sm
                  flex items-center justify-center
                "
              >
                <FaArrowLeft size={15} className="text-white" />
              </button>
            )}
          </div>

          {/* RIGHT — LANGUAGE + CLOSE */}
          <div className="flex items-center gap-3">
            <AILanguageSelector languages={languages} handleLanguageChange={handleLanguageChange} languageModalOpen={languageModalOpen}/>

            <button
              onClick={() => setOpen(false)}
              className="
                bg-white/20 hover:bg-white/30
                border border-white/20
                p-2 rounded-xl
                backdrop-blur-xl transition shadow-sm
              "
            >
              <FaTimes size={16} className="text-white" />
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
                <h2 className="text-xl font-semibold mt-2 text-white">Ask AI</h2>
                <p className="text-sm opacity-80 mt-1 text-white/80">
                  How can I assist you today?
                </p>
              </div>

              <div className="w-full mb-5 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <p className="text-[11px] text-center font-semibold uppercase tracking-wide text-emerald-200">
                  Farming Assistance
                </p>
                <p className="text-sm text-center mt-1 text-white/75">
                  Ask agriculture-related questions for quick, reliable, and expert guidance.
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
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.role === "user"
                        ? "bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-lg"
                        : message.error
                        ? "bg-red-500/20 border border-red-400/30 text-red-200 backdrop-blur-md"
                        : "bg-white/10 border border-white/10 backdrop-blur-md text-white"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-150"></span>
                      <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-300"></span>
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
            bg-slate-900/50 backdrop-blur-xl 
            border-t border-white/10 
            p-3 shadow-inner
            flex items-center gap-3
          "
        >
          {/* <button
            type="button"
            className="text-white hover:opacity-80 transition"
          >
            <FaMicrophone size={22} />
          </button> */}

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="
              flex-1 px-4 py-2 rounded-full
              bg-white/15 border border-white/10
              text-white placeholder-white/50
              shadow-inner outline-none
            "
            placeholder="Message…"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || loading}
            className="
              bg-gradient-to-br from-emerald-600 to-emerald-500
              shadow-[0_4px_15px_rgba(34,197,94,0.4)]
              px-3 py-2 rounded-full text-white
              disabled:opacity-50 disabled:cursor-not-allowed 
              hover:opacity-90 transition
            "
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>
    </>
  );
}
