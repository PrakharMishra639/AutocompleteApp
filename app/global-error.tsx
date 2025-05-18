"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white shadow-xl rounded-lg max-w-md w-full p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again or return to the home
            page.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => reset()}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded transition duration-200"
            >
              Try Again
            </button>
            <a
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-5 rounded transition duration-200"
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
