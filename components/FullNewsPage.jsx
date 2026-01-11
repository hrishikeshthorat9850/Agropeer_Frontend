"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useView } from "@/Context/ViewContext";
import { supabase } from "@/lib/supabaseClient";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import { useLanguage } from "@/Context/languagecontext";

export default function FullNewsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [article, setArticle] = useState({});
  const { view, setView } = useView();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchFullNews = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("id", id)
          .single(); // Get one article

        if (error) throw error;
        setArticle(data);
      } catch (e) {
        console.error("Error fetching article:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchFullNews();
  }, [id]);

  useEffect(() => {
    console.log("Full Single News is :", article);
  }, []);

  // Detail view (standalone)

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pb-24">
      {/* Immersive Header */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        {article.image_url ? (
          <Image
            src={article.image_url}
            alt={article.title || "News Image"}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-farm-100 dark:bg-white/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

        {/* Top Nav (Optional if needed in this context, standard back button usually provided by browser or app shell) */}

        {/* Title & Metadata overlaid on bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-3 drop-shadow-md">
            {article.title}
          </h1>
          <div className="flex items-center gap-3 text-white/90 text-sm font-medium">
            <span className="flex items-center gap-1.5">
              {article.date
                ? new Date(article.date).toLocaleDateString()
                : "Recently"}
            </span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-3xl mx-auto px-5 py-8 -mt-6 bg-white dark:bg-black relative rounded-t-3xl text-gray-800 dark:text-gray-200">
        {/* Decorative handle for 'sheet' look */}
        <div className="w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mx-auto mb-8" />

        <div className="prose prose-lg dark:prose-invert prose-green max-w-none">
          {article.content ? (
            <div
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            <p>{t("news_no_content")}</p>
          )}
        </div>
      </div>
    </div>
  );
}
