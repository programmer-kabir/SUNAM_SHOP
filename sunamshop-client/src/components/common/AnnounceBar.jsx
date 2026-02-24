"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import { useSession } from "next-auth/react";

const AnnounceBar = () => {
  const { language, setLanguage } = useThemeLanguage();
  const { data: session } = useSession();
  const toggleLanguage = () => {
    setLanguage(language === "BN" ? "EN" : "BN");
  };
  const name = session?.user?.name || session?.user?.firstName;
  return (
    <div className="w-full border-b border-gray-200  bg-white/90 backdrop-blur-md dark:border-gray-500 dark:bg-gray-950/90 text-sm">
      <div className="container-custom flex items-center justify-between py-2">
        {/* LEFT TEXT */}
        <div className="text-gray-700 dark:text-gray-200 font-medium">
          <span className="en">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </span>
          <span className="bn">
            সব সাঁতারের পোশাকে সামার সেল এবং ফ্রি এক্সপ্রেস ডেলিভারি - ৫০% ছাড়!
          </span>

          <Link href="/" className="ml-3 underline">
            <span className="en">Shop Now</span>
            <span className="bn">এখনই কিনুন</span>
          </Link>
        </div>

        {/* LANGUAGE BUTTON */}
        <div className="flex items-center ">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-md px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <Globe className="h-4 w-4" />
            {language}
          </button>
          {!session?.user && (
            <>
              <Link href="/login" className="underline mr-4">
                Login
              </Link>

              <Link href="/register" className="underline">
                Register
              </Link>
            </>
          )}
  
          {session?.user && (
            <>
            <div>Welcome, {name}</div>
              <Link
                href={
                  session.user.role === "admin"
                    ? "/adminDashboard/dashboard"
                    : "/userDashboard/dashboard"
                }
                className="underline ml-2"
              >
                Dashboard
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnounceBar;
