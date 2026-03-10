"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";

import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function PopularCategories({ subSubCategories = [] }) {
  const { language } = useThemeLanguage();

  return (
    <section className="w-full py-12 max-w-[1600px] px-4 mx-auto ">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {language === "BN" ? "জনপ্রিয় ক্যাটাগরি" : "Popular Categories"}
          </h2>

          <div className="flex items-center gap-3">
            <Link
              href="/categories"
              className="text-purple-600 text-sm font-medium"
            >
              {language === "bn" ? "সব দেখুন" : "View All"}
            </Link>

            {/* Arrow Buttons */}
            <button className="popular-prev w-6 h-6 flex items-center justify-center bg-gray-300  rounded-full ">
              <ChevronLeft size={18} />
            </button>

            <button className="popular-next w-6 h-6 flex items-center justify-center bg-gray-300 rounded-full ">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="hidden md:inline">
          {/* Slider */}
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".popular-next",
              prevEl: ".popular-prev",
            }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 6 },
              1024: { slidesPerView: 6 },
              1280: { slidesPerView: 7 },
            }}
          >
            {subSubCategories.slice(0, 13).map((cat) => (
              <SwiperSlide key={cat._id}>
                <Link
                  href={`/category/${cat.slug}`}
                  style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  }}
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition h-[200px]"
                >
                  <div className="relative mb-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${cat.image}`}
                      alt={cat.name.en}
                      width={400}
                      height={300}
                      className="object-contain"
                    />
                  </div>

                  <p className="text-sm text-gray-700 font-medium text-center">
                    {language === "BN" ? cat.name.bn : cat.name.en}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="md:hidden grid grid-cols-2 gap-2 w-full">
          {subSubCategories?.slice(0, 8)?.map((cat) => (
            <div key={cat?._id}>
              <Link
                href={`/category/${cat.slug}`}
                style={{
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                }}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition h-[200px]"
              >
                <div className="relative mb-3">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${cat.image}`}
                    alt={cat.name.en}
                    width={400}
                    height={300}
                    className="lg:object-contain px-2 lg:px-0"
                  />
                </div>

                <p className="text-sm text-gray-700 font-medium text-center">
                  {language === "BN" ? cat.name.bn : cat.name.en}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
