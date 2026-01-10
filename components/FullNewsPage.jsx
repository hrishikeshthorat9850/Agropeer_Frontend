"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useView } from '@/Context/ViewContext';
import { supabase } from '@/lib/supabaseClient';
import LoadingSpinner from './LoadingSpinner';
import Image from 'next/image';
import { useLanguage } from '@/Context/languagecontext';

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
    }
    fetchFullNews();
  }, [id]);

  useEffect(() => {
    console.log("Full Single News is :", article);
  }, []);
  return (
    <div className="min-h-[calc(100vh-122px)] py-6 px-2 flex justify-center">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 dark:bg-[#272727]">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900 dark:text-gray-200">
            {article.title}
          </h1>

          {/* Image */}
          {article.image_url && (
            <div className="w-full aspect-[16/9] relative rounded overflow-hidden">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover object-center transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          )}

          {/* Published Date */}
          <p className="text-xs sm:text-sm text-gray-500">
            {t("news_published_on")} {article.date ? new Date(article.date).toLocaleDateString() : "N/A"}
          </p>

          {/* Content */}
          <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
            {article.content || t("news_no_content")}
          </p>
        </div>
      )}
    </div>
  );
}
