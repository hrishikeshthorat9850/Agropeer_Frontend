"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading,setLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://gwjpmypuqmmoqcjyufln.functions.supabase.co/sendNewsLetterEmail",
        {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json(); // read once

      if (!res.ok) {
        console.error("Supabase function error:", data);
        alert("Subscription failed: " + (data.error || "Unknown error"));
      } else {
        console.log("Subscribed successfully:", data);
        setIsSubscribed(true);
        setTimeout(() => setIsSubscribed(false), 3000);
      }
    } catch (err) {
      console.error("Network or fetch error:", err);
      alert("Network error. Please try again.");
    }

    setIsSubmitting(false);
    setEmail("");
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      className="mb-10 md:px-4 sm:px-6 lg:px-0"
    >
      <div className="sunset-gradient p-5 sm:p-8 rounded-2xl text-white text-center relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-sunset-500/20 to-orange-500/20"></div>
        <div className="absolute top-3 right-3 w-12 h-12 sm:w-20 sm:h-20 bg-white/10 rounded-full"></div>
        <div className="absolute bottom-3 left-3 w-10 h-10 sm:w-16 sm:h-16 bg-white/5 rounded-full"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-3xl sm:text-3xl lg:text-4xl font-display font-black">
              Stay Updated
            </h2>
          </div>

          <p className="text-white text-base sm:text-lg font-medium sm:font-semibold mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Get the latest farming tips, market updates, and community news
            delivered right to your inbox.
          </p>

          {/* Form / Success Message */}
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl border-0 text-farm-900 placeholder-farm-600 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                  required
                />
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-sunset-600 px-6 py-3 rounded-xl font-semibold hover:bg-farm-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-sunset-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Subscribe
                      <FaArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 max-w-md mx-auto mt-4"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <FaEnvelope className="w-4 h-4 text-sunset-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">Successfully Subscribed!</h3>
              </div>
              <p className="text-white/90 text-sm sm:text-base px-1">
                Thank you for subscribing to our newsletter. You'll receive updates soon!
              </p>
            </motion.div>
          )}

          <p className="text-white/80 text-xs sm:text-sm mt-4">
            Join <span className="font-semibold">10,000+</span> farmers already subscribed 🌾
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsletterSignup;
