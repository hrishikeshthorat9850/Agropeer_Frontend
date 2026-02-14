"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useBackPress } from "@/Context/BackHandlerContext";

export default function PopupModal() {
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("popupData");
    if (savedData) {
      setPopupData(JSON.parse(savedData));
      setShow(true);
    }
  }, []);

  // ✅ Optional Auto-close after 10 seconds (disable if not needed)
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleClose = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const handleRedirect = () => {
    if (popupData?.redirectUrl) {
      window.location.href = popupData.redirectUrl;
    }
  };

  // ✅ Handle Android Back Press
  useBackPress(
    () => {
      if (show) {
        setShow(false);
        return true; // Handled
      }
      return false;
    },
    20,
    show,
  );

  if (!popupData) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`
              relative overflow-visible flex flex-col justify-end items-start
              rounded-3xl bg-cover bg-center bg-no-repeat border-[8px] border-white
              shadow-[0_8px_40px_rgba(0,0,0,0.25)]
              w-[70vw] h-[70vh]
              md:w-[55vw] md:h-[80vh]
              sm:w-[75vw] sm:h-[70vh]
              max-sm:w-[95vw] max-sm:h-[55vh]
            `}
            style={{
              backgroundImage: `url(${
                popupData.bgImage || "/placeholder.jpg"
              })`,
              filter: "brightness(1.15) contrast(1.05)",
            }}
          >
            {/* ✅ Close Button on Border */}
            <button
              onClick={handleClose}
              className="
                absolute top-0 right-0
                translate-x-[35%] -translate-y-[35%]
                bg-orange-500 text-white border-2 border-white rounded-full
                p-2.5 md:p-3
                shadow-lg hover:bg-orange-600 transition
                z-[9999]
              "
            >
              <FaTimes size={18} className="text-white" />
            </button>

            {/* ✅ Soft Transparent Overlay (for readability) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/5 to-transparent"></div>

            {/* ✅ Text + Button Content (position based on selection) */}
            <div
              className={`absolute z-10 flex flex-col justify-start items-start p-8 md:p-12 transition-all duration-500
                ${popupData.textPosition === "top-left" ? "top-0 left-0" : ""}
                ${
                  popupData.textPosition === "top-right"
                    ? "top-0 right-0 items-end"
                    : ""
                }
                ${
                  popupData.textPosition === "center"
                    ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center text-center"
                    : ""
                }
                ${
                  popupData.textPosition === "bottom-left"
                    ? "bottom-0 left-0"
                    : ""
                }
                ${
                  popupData.textPosition === "bottom-right"
                    ? "bottom-0 right-0 items-end"
                    : ""
                }
              `}
            >
              <motion.h2
                className="text-[clamp(1.8rem,3vw,2.5rem)] font-extrabold mb-3 leading-tight drop-shadow-xl"
                style={{ color: popupData.titleColor }}
              >
                {popupData.title}
              </motion.h2>

              <motion.p
                className="text-[clamp(1rem,1.5vw,1.2rem)] mb-6 font-medium drop-shadow-md"
                style={{ color: popupData.descColor }}
              >
                {popupData.desc}
              </motion.p>

              <motion.button
                onClick={handleRedirect}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-8 py-3 text-lg font-semibold rounded-xl shadow-lg
                  bg-gradient-to-r from-orange-500 to-orange-600 text-white
                  hover:shadow-xl hover:brightness-110 transition-all
                "
              >
                {popupData.buttonText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
