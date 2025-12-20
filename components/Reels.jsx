"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegComment } from "react-icons/fa";

const sampleReels = [
  {
    id: 1,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "Farmer Priya",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    caption: "How I irrigate my fields efficiently! 💧🌱",
    likes: 120,
    comments: 8,
    commentsList: [
      { user: "Farmer John", text: "Great technique!", likes: 12 },
      { user: "Farmer Maria", text: "Very helpful, thanks!", likes: 18 },
      { user: "Farmer Chen", text: "I will try this!", likes: 7 },
    ],
  },
  {
    id: 2,
    video: "https://www.w3schools.com/html/movie.mp4",
    user: "Farmer John",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    caption: "Tractor maintenance tips 🚜",
    likes: 98,
    comments: 5,
    commentsList: [
      { user: "Farmer Priya", text: "This saved me money!", likes: 22 },
      { user: "Farmer Ahmed", text: "Very clear explanation.", likes: 15 },
    ],
  },
  {
    id: 3,
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    user: "Farmer Maria",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    caption: "Harvesting wheat with family! 🌾",
    likes: 143,
    comments: 12,
    commentsList: [
      { user: "Farmer Grace", text: "Beautiful family!", likes: 19 },
      { user: "Farmer Ivan", text: "Congrats on the harvest!", likes: 25 },
    ],
  },
];

export default function Reels() {
  const [current, setCurrent] = useState(0);

  const handleNext = () => setCurrent((prev) => (prev + 1) % sampleReels.length);
  const handlePrev = () => setCurrent((prev) => (prev - 1 + sampleReels.length) % sampleReels.length);

  const reel = sampleReels[current];
  const mostLikedComment =
    reel.commentsList && reel.commentsList.length > 0
      ? reel.commentsList.reduce((max, c) => (c.likes > max.likes ? c : max), reel.commentsList[0])
      : null;

  return (
    <section className="w-full max-w-md mx-auto mt-8 px-4 flex flex-col items-center">
      <div className="relative w-full aspect-[9/16] bg-black rounded-xl shadow-lg overflow-hidden flex items-center justify-center">
        <video
          src={reel.video}
          controls
          className="w-full h-full object-cover"
        />
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow text-green-800 z-10"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow text-green-800 z-10"
        >
          &#8594;
        </button>
      </div>
      <div className="w-full bg-white rounded-b-xl shadow-lg px-4 py-3 flex items-center gap-3">
        <div className="relative w-10 h-10">
          <Image
            src={reel.avatar}
            alt={reel.user}
            fill
            className="rounded-full border-2 border-green-300 object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-green-900">{reel.user}</div>
          <div className="text-green-700 text-sm">{reel.caption}</div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
            <FaHeart /> <span className="text-sm">{reel.likes}</span>
          </button>
          <button className="flex items-center gap-1 text-green-700 hover:text-green-900">
            <FaRegComment /> <span className="text-sm">{reel.comments}</span>
          </button>
        </div>
      </div>
      {mostLikedComment && (
        <div className="w-full bg-green-50 border-l-4 border-green-400 rounded-xl shadow px-4 py-3 mt-2 flex items-center gap-3">
          <span className="font-semibold text-green-800">{mostLikedComment.user}:</span>
          <span className="text-green-900 flex-1">{mostLikedComment.text}</span>
          <span className="flex items-center gap-1 text-red-500 ml-2">
            <FaHeart className="text-xs" /> {mostLikedComment.likes}
          </span>
        </div>
      )}
    </section>
  );
}
