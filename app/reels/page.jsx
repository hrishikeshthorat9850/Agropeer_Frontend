// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { FaHeart, FaRegComment } from "react-icons/fa";

// const sampleReels = [
//   {
//     id: 1,
//     video: "https://www.w3schools.com/html/mov_bbb.mp4",
//     user: "Farmer Priya",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     caption: "How I irrigate my fields efficiently! 💧🌱",
//     likes: 120,
//     comments: 8,
//     commentsList: [
//       { user: "Farmer John", text: "Great technique!", likes: 12 },
//       { user: "Farmer Maria", text: "Very helpful, thanks!", likes: 18 },
//       { user: "Farmer Chen", text: "I will try this!", likes: 7 },
//     ],
//   },
//   {
//     id: 2,
//     video: "https://www.w3schools.com/html/movie.mp4",
//     user: "Farmer John",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     caption: "Tractor maintenance tips 🚜",
//     likes: 98,
//     comments: 5,
//     commentsList: [
//       { user: "Farmer Priya", text: "This saved me money!", likes: 22 },
//       { user: "Farmer Ahmed", text: "Very clear explanation.", likes: 15 },
//     ],
//   },
//   {
//     id: 3,
//     video: "https://www.w3schools.com/html/mov_bbb.mp4",
//     user: "Farmer Maria",
//     avatar: "https://randomuser.me/api/portraits/women/68.jpg",
//     caption: "Harvesting wheat with family! 🌾",
//     likes: 143,
//     comments: 12,
//     commentsList: [
//       { user: "Farmer Grace", text: "Beautiful family!", likes: 19 },
//       { user: "Farmer Ivan", text: "Congrats on the harvest!", likes: 25 },
//     ],
//   },
// ];

// export default function Reels() {
//   const [current, setCurrent] = useState(0);
//   const reel = sampleReels[current];
//   const mostLikedComment = reel.commentsList.reduce(
//     (max, c) => (c.likes > max.likes ? c : max),
//     reel.commentsList[0]
//   );

//   const handleNext = () =>
//     setCurrent((prev) => (prev + 1) % sampleReels.length);
//   const handlePrev = () =>
//     setCurrent((prev) => (prev - 1 + sampleReels.length) % sampleReels.length);

//   return (
//     <div className="min-h-[calc(100vh-122px)] flex justify-center py-10 px-2">
//       <div className="w-full max-w-md flex flex-col gap-6">
//         <h1 className="text-3xl md:text-5xl text-center font-display font-bold text-farm-900 mb-4 dark:text-white">
//           Reels
//         </h1>
//         <div className="relative w-full aspect-[9/16] bg-black rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
//           <video
//             src={reel.video}
//             controls
//             className="w-full h-full object-cover rounded-2xl"
//           />
//           <button
//             onClick={handlePrev}
//             className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow text-green-800 z-10"
//           >
//             &#8592;
//           </button>
//           <button
//             onClick={handleNext}
//             className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2 shadow text-green-800 z-10"
//           >
//             &#8594;
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 dark:bg-[#272727]">
//           <div className="relative w-10 h-10 rounded-full border-2 border-green-300 overflow-hidden">
//             <Image
//               src={reel.avatar}
//               alt={reel.user}
//               fill
//               className="object-cover rounded-full"
//             />
//           </div>
//           <div className="flex-1">
//             <div className="font-semibold text-green-900 dark:text-gray-200">{reel.user}</div>
//             <div className="text-green-700 text-sm dark:text-gray-200">{reel.caption}</div>
//           </div>
//           <div className="flex flex-col items-center gap-2">
//             <button className="flex items-center gap-1 text-red-500 hover:text-red-600">
//               <FaHeart /> <span className="text-sm">{reel.likes}</span>
//             </button>
//             <button className="flex items-center gap-1 text-green-700 hover:text-green-900">
//               <FaRegComment /> <span className="text-sm">{reel.comments}</span>
//             </button>
//           </div>
//         </div>

//         <div className="bg-green-50 border-l-4 border-green-400 rounded-2xl shadow px-4 py-3 flex items-center gap-3 dark:bg-[#272727]">
//           <span className="font-semibold text-green-800">
//             {mostLikedComment.user}:
//           </span>
//           <span className="text-green-900 flex-1">{mostLikedComment.text}</span>
//           <span className="flex items-center gap-1 text-red-500 ml-2">
//             <FaHeart className="text-xs" /> {mostLikedComment.likes}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React from "react";
import { FaVideo } from "react-icons/fa";

export default function Reels() {
  return (
    <div style={{ minHeight: "calc(100vh - 126px)" }} className="min-h-[calc(100vh-122px)] flex flex-col justify-center items-center px-4 text-center overflow-hidden">
      
      <h1 className="text-4xl font-bold text-farm-900 dark:text-white">
        Reels
      </h1>

      <p className="text-gray-600 mt-2 max-w-md dark:text-gray-300">
        Agriculture reels & short videos will be available soon.
      </p>

      <div className="mt-8 px-6 py-3 rounded-xl bg-yellow-100 text-yellow-800 text-sm font-medium 
      dark:bg-yellow-600/20 dark:text-yellow-300 shadow flex items-center gap-2">
        <FaVideo className="text-lg" />
        🚧 Coming Soon
      </div>
    </div>
  );
}
