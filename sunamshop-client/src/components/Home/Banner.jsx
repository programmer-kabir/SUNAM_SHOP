"use client";
import { useRef, useEffect } from "react";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import Image from "next/image";

export default function HeroSection() {
  const heroRef = useRef(null);
  const { language } = useThemeLanguage();
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          window.dispatchEvent(new CustomEvent("heroHidden"));
        } else {
          window.dispatchEvent(new CustomEvent("heroVisible"));
        }
      },
      { threshold: 0.2 },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <section ref={heroRef} className="w-full bg-gray-100 dark:bg-gray-900 ">
      <div className="relative w-full min-h-[600px] flex items-center bg-gradient-to-r from-white to-[#f4ebff] overflow-hidden px-6 md:px-16 lg:px-24">
        {/* Left Content: Text & Search */}
        <div className="w-full lg:w-1/2 z-10">
          <h1 className="text-4xl en lg:text-5xl font-extrabold text-black mb-8 leading-tight">
            Grocery Delivered at your Doorstep
          </h1>
          <h1 className="text-4xl bn lg:text-5xl font-extrabold text-black mb-8 leading-tight">
            গ্রোসারি পৌঁছে দিচ্ছি আপনার দোরগোড়ায়
          </h1>

          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder={
                language === "BN"
                  ? "পণ্য খুঁজুন (যেমন: ডিম, দুধ, আলু)"
                  : "Search for products (e.g. eggs, milk, potato)"
              }
              className="w-full py-4 pl-5 pr-12 rounded-lg text-gray-700 shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {/* Search Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Content: Image Collage */}
        <div className="hidden lg:flex w-1/2 relative h-[550px] justify-end items-center gap-3 pl-10">
          {/* Column 1 */}
          <div className="flex flex-col justify-center">
            <Image
              src="https://supplylinkbd.com/img/Sunam_Shop/banner/Delivery_boy.jfif"
              alt="Delivery boy"
              width={300}
              height={400}
              priority
              className="w-56 h-72 object-cover rounded-xl shadow-md border-[3px] border-white object-top"
            />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3 transform -translate-y-6">
            <Image
              src="https://supplylinkbd.com/img/Sunam_Shop/banner/Vegetables.jpg"
              alt="Vegetables"
              width={300}
              height={400}
              priority
              className="w-36 h-36 object-cover rounded-xl shadow-sm border-2 border-white"
            />
            <Image
              src="https://supplylinkbd.com/img/Sunam_Shop/banner/Grocery_Aisle.jpg"
              alt="Grocery Aisle"
              width={300}
              height={400}
              priority
              className="w-36 h-60 object-cover rounded-xl shadow-sm border-2 border-white"
            />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3 transform translate-y-4">
            <Image
              src="https://supplylinkbd.com/img/Sunam_Shop/banner/Market.jpg"
              alt="Market"
              width={300}
              height={400}
              priority
              className="w-40 h-64 object-cover rounded-xl shadow-sm border-2 border-white"
            />
            <Image
              src="https://supplylinkbd.com/img/Sunam_Shop/banner/Bike_Delivery.jpg"
              alt="Bike Delivery"
              width={300}
              height={400}
              priority
              className="w-40 h-32 object-cover rounded-xl shadow-sm border-2 border-white"
            />
          </div>

          {/* Column 4 (Cutoff effect on the right edge) */}
          <div className="flex flex-col justify-center translate-y-8">
            <Image
              src="https://supplylinkbd.com/img/Sunam_Shop/banner/Produce.jpg"
              alt="Produce"
              width={300}
              height={400}
              priority
              className="w-24 h-48 object-cover rounded-l-xl shadow-sm border-y-2 border-l-2 border-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
