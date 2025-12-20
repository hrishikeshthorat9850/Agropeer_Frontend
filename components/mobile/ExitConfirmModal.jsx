"use client";

export default function ExitConfirmModal({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-green-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl w-80 p-6 shadow-xl relative">

        {/* Decorative Leaf Icon */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 p-2 rounded-full shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6c0 6-3 9-9 9 6 0 9 3 9 9 0-6 3-9 9-9-6 0-9-3-9-9z"
            />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-green-800 text-center mt-2">
          Exit App?
        </h2>

        <p className="text-green-700 text-center mt-2">
          Are you sure you want to close Agrogram?
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-green-300 text-green-700 bg-white hover:bg-green-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-green-700 text-white hover:bg-green-800 transition shadow-sm"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
