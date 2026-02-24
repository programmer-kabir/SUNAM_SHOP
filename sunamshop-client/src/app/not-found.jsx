"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-16 w-full grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            404 Error
          </p>

          <h1 className="text-4xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
            Oops! Page not found
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Go Back */}
            <button
              onClick={() => router.back()}
              className="px-6 py-3 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
            >
              ← Go Back
            </button>

            {/* Home */}
            <Link
              href="/"
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200"
            >
              Take me Home
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            className=""
            src="https://merakiui.com/images/components/illustration.svg"
            alt="404 illustration"
          />
        </div>
      </div>
    </section>
  );
}
