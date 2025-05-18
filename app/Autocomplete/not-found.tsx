"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-pink-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Sorry, the page you're looking for doesn't exist or was moved.
      </p>
      <Link href="/">
        <a className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded shadow">
          Go back home
        </a>
      </Link>
    </div>
  );
}
