"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-400/20 rounded-full blur-3xl top-[-100px] right-[-100px]"></div>

      <div className="relative z-10 w-full max-w-6xl px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-sm font-semibold text-red-500 uppercase tracking-widest">
            500 Error
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            Something went wrong
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg">
            An unexpected error has occurred. Don’t worry — you can try again or
            safely return to the homepage.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => reset()}
              className="px-7 py-3 text-sm font-semibold text-white bg-red-600 rounded-xl shadow-lg hover:bg-red-700 hover:shadow-red-400/40 transition duration-300"
            >
              Try Again
            </button>

            <Link
              href="/"
              className="px-7 py-3 text-sm font-semibold border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300"
            >
              Go Home
            </Link>
          </div>
        </div>

        {/* Right Big 500 */}
        <div className="flex justify-center lg:justify-end relative">
          <h1 className="text-[150px] md:text-[220px] font-extrabold text-red-100 dark:text-red-900 select-none tracking-widest">
            500
          </h1>

          {/* Subtle Overlay Text */}
          <span className="absolute text-2xl font-semibold text-gray-300 dark:text-gray-700 bottom-10 right-10 opacity-30">
            Server Error
          </span>
        </div>
      </div>
    </section>
  );
}
