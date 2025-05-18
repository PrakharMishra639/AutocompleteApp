"use client";

import { useEffect } from "react";
import { MdErrorOutline } from "react-icons/md";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error boundary:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-tr from-white via-blue-50 to-blue-100 flex items-center justify-center px-4 py-16">
      <div className="bg-white border border-red-200 shadow-xl rounded-3xl p-10 max-w-md text-center">
        <MdErrorOutline className="text-5xl text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-block bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition duration-200 text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
