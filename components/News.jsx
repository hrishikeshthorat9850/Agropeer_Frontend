"use client";
import { useState,useEffect } from "react";
import { useView } from "@/Context/ViewContext";
import Image from "next/image";
import Link from "next/link";

export default function News() {
  const { view,setView } = useView();
  const [news,setNews] = useState([]);
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
    <h2 className="text-4xl font-bold text-green-800 mb-4 text-center mt-10 hover:underline">AgroPeer News</h2>
    <section className="flex justify-center items-center w-full max-w-xl mx-auto mt-6 mb-8">
      <div className="flex flex-col gap-6">
        {news.map((article) => (
          <Link href={`/news?id=${article.id}`} key={article.id} className="bg-white rounded-xl shadow-md flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-green-400 group text-left cursor-pointer">
            <div className="relative w-full md:w-40 h-48 md:h-auto flex-shrink-0">
              <Image
                src={article.imgUrl}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 768px) 100vw, 160px"
                priority={article.id}
              />
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-1">{article.title}</h3>
                <p className="text-green-700 text-sm mb-2 line-clamp-3">{article.summary}</p>
              </div>
              <div className="text-xs text-gray-500 mt-2">{new Date(article.date).toLocaleDateString()}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
    </>
  );
} 