"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  FaSeedling,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaUsers,
  FaComments,
  FaGlobe,
  FaThumbsUp,
  FaTractor, FaCloudSun, FaUserTie
} from "react-icons/fa";
import Link from "next/link";
import AboutUsLink from "./footer/AboutUsLink";
import HowItWorksLink from "./footer/HowItWorksLink";
// import SuccessStoriesLink from "./footer/SuccessStoriesLink";
import HelpCenterLink from "./footer/HelpCenterLink";
import ReviewsLink from "./footer/ReviewsLink";
import { FaIndianRupeeSign } from "react-icons/fa6";

const Footer = ({ communityStats: propCommunityStats = [] }) => {
  const [communityStats, setCommunityStats] = useState(propCommunityStats);
  const [activeFarmers, setActiveFarmers] = useState(0);
  const [postsShared, setPostsShared] = useState(0);
  const hasFetchedRef = useRef(false);
  const isFetchingRef = useRef(false);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Fetch community stats if not provided as props - only once
  useEffect(() => {
    // If props are provided and not empty, use them
    if (propCommunityStats && propCommunityStats.length > 0) {
      setCommunityStats(propCommunityStats);
      return;
    }

    // Only fetch once if not already fetched
    if (!hasFetchedRef.current && !isFetchingRef.current) {
      hasFetchedRef.current = true;
      fetchCommunityStats();
    }
  }, []); // Empty dependency array - only run once on mount

  const fetchCommunityStats = useCallback(async () => {
    if (isFetchingRef.current) return; // Prevent concurrent calls
    isFetchingRef.current = true;
    try {
      // Fetch active farmers
      const resFarmers = await fetch(`${BASE_URL}/api/get-activefarmers`);
      const dataFarmers = await resFarmers.json();
      if (resFarmers.ok) {
        setActiveFarmers(dataFarmers.activeFarmers || 0);
      }

      // Fetch posts shared
      const resPosts = await fetch(`${BASE_URL}/api/posts-shared`);
      const dataPosts = await resPosts.json();
      if (resPosts.ok) {
        setPostsShared(dataPosts.totalPosts || 0);
      }

      // Set default community stats
      const defaultStats = [
        { 
          icon: <FaUsers className="w-5 h-5 text-farm-600" />, 
          value: dataFarmers.activeFarmers || 0, 
          label: "Active Farmers" 
        },
        { 
          icon: <FaComments className="w-5 h-5 text-sunset-600" />, 
          value: dataPosts.totalPosts || 0, 
          label: "Posts Shared" 
        },
        { 
          icon: <FaGlobe className="w-5 h-5 text-sky-600" />, 
          value: "28", 
          label: "States" 
        },
        { 
          icon: <FaThumbsUp className="w-5 h-5 text-farm-600" />, 
          value: "95%", 
          label: "Satisfaction" 
        },
      ];
      setCommunityStats(defaultStats);
    } catch (err) {
      console.error("Error fetching community stats:", err);
      // Set fallback stats
      setCommunityStats([
        { 
          icon: <FaUsers className="w-5 h-5 text-farm-600" />, 
          value: "1000+", 
          label: "Active Farmers" 
        },
        { 
          icon: <FaComments className="w-5 h-5 text-sunset-600" />, 
          value: "5000+", 
          label: "Posts Shared" 
        },
        { 
          icon: <FaGlobe className="w-5 h-5 text-sky-600" />, 
          value: "28", 
          label: "States" 
        },
        { 
          icon: <FaThumbsUp className="w-5 h-5 text-farm-600" />, 
          value: "95%", 
          label: "Satisfaction" 
        },
      ]);
    } finally {
      isFetchingRef.current = false;
    }
  }, []);

  const iconMap = {
    "Farming Tips": <FaTractor className="inline-block mr-2 text-farm-500" />,
    "Market Prices": <FaIndianRupeeSign className="inline-block mr-2 text-farm-500" />,
    "Weather Forecast": <FaCloudSun className="inline-block mr-2 text-farm-500" />,
    "Expert Advice": <FaUserTie className="inline-block mr-2 text-farm-500" />,
  };

  const footerLinks = {
    resources: [
      { name: "Farming Tips", href: "/farming-tips" },
      { name: "Market Prices", href: "/market-prices" },
      { name: "Weather Forecast", href: "/weather" },
      { name: "Expert Advice", href: "/expert-advice" },
    ],
  };

  const social = [
    {
      icon: <FaFacebookF className="text-white" />,
      href: "https://www.facebook.com/profile.php?id=61584709015575",
      bg: "bg-[#1877F2]",
      hover: "hover:bg-[#145dbd]",
    },
    {
      icon: <FaWhatsapp className="text-white" />,
      href: "https://chat.whatsapp.com/HRVHJXmrX6Q6gv07wnw1e3?mode=wwt",
      bg: "bg-[#25D366]",
      hover: "hover:bg-[#1eab54]",
    },
    {
      icon: <FaInstagram className="text-white" />,
      href: "https://www.instagram.com/agro_peer/",
      bg: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#962fbf]",
      hover: "opacity-90",
    },
    {
      icon: <FaYoutube className="text-white" />,
      href: "https://youtube.com/@agropeer",
      bg: "bg-[#FF0000]",
      hover: "hover:bg-[#cc0000]",
    },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="border-farm-200 bg-[#F4FFF7] mt-12 dark:bg-[#272727]"
    >
      <div className="w-full px-4 py-12 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-farm-500 to-farm-600 rounded-xl flex items-center justify-center">
                <FaSeedling className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-farm-900">AgroPeer</h3>
            </div>
            <p className="text-farm-700 mb-6 leading-relaxed dark:text-green-500">
              Connecting farmers worldwide to share knowledge, experiences, and grow together.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-farm-600 hover:text-farm-800">
                <FaEnvelope className="w-4 h-4 text-farm-500" />
                <span className="text-sm">admin@agropeer.com</span>
              </div>
              <div className="flex items-center gap-2 text-farm-600 hover:text-farm-800">
                <FaPhone className="w-4 h-4 text-farm-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-farm-600 hover:text-farm-800">
                <FaMapMarkerAlt className="w-4 h-4 text-farm-500" />
                <span className="text-sm">Farmer Community</span>
              </div>
            </div>
          </div>

          {/* Platform + Social */}
          <div>
            <h4 className="font-display font-bold text-farm-900 mb-3 text-lg">Platform</h4>
            <ul className="space-y-2 mb-6">
              <AboutUsLink />
              <HowItWorksLink />
              {/* <SuccessStoriesLink /> */}
              <HelpCenterLink />
              <ReviewsLink />
            </ul>

            {/* ✅ Social moved here with official brand colors */}
            <div className="flex items-center gap-3">
              {social.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2 rounded-lg ${s.bg} ${s.hover} transition-all`}
                >
                  <div className="w-5 h-5 flex items-center justify-center">{s.icon}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-bold text-farm-900 mb-3 text-lg">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-semibold text-farm-800 hover:text-farm-600 transition-colors"
                  >
                    {iconMap[link.name]}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Stats */}
          <div>
            <h4 className="font-display font-bold text-farm-900 mb-3 text-lg dark:text-white">Community</h4>
            {communityStats.length > 0 ? (
              <div className="space-y-1">
                {communityStats.map((stat, index) => (
                  <motion.div
                    key={stat.label || index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-1 rounded-lg hover:bg-farm-50 transition-colors dark:hover:bg-[#1E1E1E]"
                  >
                    <div className="w-10 h-10 bg-farm-100 rounded-lg flex items-center justify-center dark:bg-[#1E1E1E] dark:border dark:border-white/20">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-farm-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-sm text-farm-500 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {/* Loading skeleton */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3 animate-pulse">
                    <div className="w-10 h-10 bg-farm-100 rounded-lg dark:bg-[#1E1E1E]"></div>
                    <div className="flex-1">
                      <div className="h-5 w-16 bg-farm-100 rounded mb-2 dark:bg-[#1E1E1E]"></div>
                      <div className="h-4 w-24 bg-farm-100 rounded dark:bg-[#1E1E1E]"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-farm-200 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-farm-600 text-sm">
              © {new Date().getFullYear()} AgroPeer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="text-farm-600 hover:text-farm-800 text-sm font-semibold">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-farm-600 hover:text-farm-800 text-sm font-semibold">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="text-farm-600 hover:text-farm-800 text-sm font-semibold">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
