"use client";

export default function ExpertAdvice() {
  return (
    <div style={{ minHeight: "calc(100vh - 126px)" }} className="flex flex-col justify-center items-center px-4 text-center">
      
      <h1 className="text-4xl font-bold text-farm-900">
        Expert Advice
      </h1>

      <p className="text-gray-600 mt-2 max-w-md dark:text-gray-300">
        Professional agriculture experts will be available soon.
      </p>

      <div className="mt-8 px-6 py-3 rounded-xl bg-yellow-100 text-yellow-800 text-sm font-medium dark:bg-yellow-600/20 dark:text-yellow-300 shadow">
        🚧 Coming Soon
      </div>
      
    </div>
  );
}
