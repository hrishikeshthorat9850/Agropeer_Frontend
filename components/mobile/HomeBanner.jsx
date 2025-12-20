"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const SLIDE_INTERVAL = 5500;

const slides = [
  {
    id: 1,
    img: "/banners/FarmFamily.jpg",
    title: "Add Farm Posts",
    desc: "Share your farm photos, updates, and experiences with the community.",
    btn: "Add Post",
    btnLink: "/posts",
  },
  {
    id: 2,
    img: "/banners/Tractor.jpg",
    title: "Sell Your Farm Products",
    desc: "Reach more buyers and get better prices for your harvest.",
    btn: "Farm Product",
    btnLink: "/market",
  },
  {
    id: 3,
    img: "/banners/Calculator.jpg",
    title: "Smart Farm Tools & Calculators",
    desc: "Plan smarter using seed, fertilizer, water & yield calculators.",
    btn: "Try Tools",
    btnLink: "/explore",
  },
  {
    id: 4,
    img: "/banners/AgroPeerLight.jpg",
    title: "Live Market Prices",
    desc: "Stay updated with crop rates before you sell.",
    btn: "View Markets",
    btnLink: "/market-prices",
  },
];

export default function HomeBanner() {
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const freezeRef = useRef(false);      // freeze slider for tap
  const touchMoved = useRef(false);     // detect swipe vs tap
  const timer = useRef(null);

  // Restart Auto Slide
  const startAutoSlide = () => {
    timer.current = setInterval(() => {
      if (!freezeRef.current) {
        setIndex((prev) => (prev + 1) % slides.length);
      }
    }, SLIDE_INTERVAL);
  };

  // Auto slide start
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timer.current);
  }, []);

  // ---------------------------------------------
  // TOUCH / SWIPE HANDLING (JioKrishi Style)
  // ---------------------------------------------
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
    touchMoved.current = false;
  };

  const handleTouchMove = (e) => {
    const diff = Math.abs(e.touches[0].clientX - startX);
    if (diff > 10) touchMoved.current = true;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      // Swipe detected
      freezeRef.current = true;
      clearInterval(timer.current);

      if (diffX > 50) {
        setIndex((prev) => (prev + 1) % slides.length);
      } else {
        setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      }

      setTimeout(() => {
        freezeRef.current = false;
        startAutoSlide();
      }, 800);

      return;
    }
  };

  // ---------------------------------------------
  // TAP / CLICK → Correct slide open
  // ---------------------------------------------
  const handleClick = () => {
    if (touchMoved.current) return; // ignore swipe

    freezeRef.current = true;
    clearInterval(timer.current);

    // open exact slide
    router.push(slides[index].btnLink);

    // resume after 2 seconds like JioKrishi
    setTimeout(() => {
      freezeRef.current = false;
      startAutoSlide();
    }, 1800);
  };

  return (
    <div
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[220px] overflow-hidden mb-5 shadow-lg md:hidden"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slides[index].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[index].img}
            alt="banner"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/45 to-black/10" />

          <div className="absolute top-0 left-0 p-5 text-white max-w-[70%]">
            <h2 className="text-xl font-bold leading-snug">
              {slides[index].title}
            </h2>

            <p className="mt-2 text-sm text-gray-200 leading-snug">
              {slides[index].desc}
            </p>

            <span className="inline-block mt-4 bg-green-600 px-4 py-2 rounded-full shadow-md text-sm font-semibold">
              {slides[index].btn}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              index === i ? "bg-green-500 scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
