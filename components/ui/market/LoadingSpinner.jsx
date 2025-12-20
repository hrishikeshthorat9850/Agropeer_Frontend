"use client";

export default function LoadingSpinner({ message = "Loading, please wait..." }) {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-green-500 border-l-lime-400 animate-spin"></div>
        <div className="absolute inset-[4px] bg-gradient-to-br from-green-200 to-lime-100 rounded-full"></div>
      </div>
      <p className="mt-4 text-green-700 font-medium animate-pulse text-lg">
        {message}
      </p>
    </div>
  );
}

