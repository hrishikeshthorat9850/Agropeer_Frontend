"use client";
import { useState, useEffect } from "react";
import { useView } from "@/Context/ViewContext";
import Image from "next/image";
import Link from "next/link";

export default function News() {
  const { view, setView } = useView();
  const [news, setNews] = useState([]);
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  //api call
  const fetchNews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/news`);
      const jsonData = await res.json();
      setNews(jsonData.articles);
      localStorage.setItem("articles", JSON.stringify(jsonData.articles));
      console.log(jsonData.articles);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };
  //function call

  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <>
      <div className="flex items-center justify-between px-4 mt-6 mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Latest News
        </h2>
        <Link
          href="/news"
          className="text-sm font-bold text-farm-600 hover:underline"
        >
          View All
        </Link>
      </div>

      <section className="w-full overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
        <div className="flex gap-4 w-max">
          {news.map((article) => (
            <Link
              href={`/news?id=${article.id}`}
              key={article.id}
              className="w-[280px] bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden flex-shrink-0 active:scale-95 transition-transform"
            >
              <div className="relative w-full h-40 bg-gray-100 dark:bg-zinc-800">
                <Image
                  src={article.imgUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority={article.id}
                />
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md">
                  {new Date(article.date).toLocaleDateString()}
                </div>
              </div>
              <div className="p-4 flex flex-col h-[140px]">
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug">
                  {article.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2 mb-auto leading-relaxed">
                  {article.summary}
                </p>

                <div className="mt-3 flex items-center text-farm-600 dark:text-farm-400 text-xs font-bold">
                  Read More
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
