"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import useProducts from "@/hooks/useProducts";
import useCategory from "@/hooks/useCategory";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import { SlidersHorizontal } from "lucide-react";

export default function HeroSection() {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategory();
  const { language } = useThemeLanguage(); // en / bn

  const banners = [
    "https://supplylinkbd.com/img/Sunam_Shop/banner_1.webp",
    "https://supplylinkbd.com/img/Sunam_Shop/banner_2.webp",
    "https://supplylinkbd.com/img/Sunam_Shop/banner_3.webp",
  ];

  return (
    <section className="w-full bg-gray-100 dark:bg-gray-900 py-6">
      <div className="container-custom flex gap-6">
        {/* LEFT CATEGORY MENU */}
        <div className="hidden lg:flex flex-col w-60 bg-white dark:bg-gray-950 rounded-lg shadow space-y-3 max-h-[441px] overflow-y-auto no-scrollbar">
          <p className="flex items-center gap-3 bg-gray-200 dark:bg-gray-900 px-4 py-3 sticky top-0 z-10 font-semibold">
            <SlidersHorizontal size={18} />
            All Categories
          </p>
          {categories.map((item) => {
            // 🔥 Product count by categoryId
            const count =
              products.filter((p) => p.categoryId === item.id).length || 0;

            return (
              <Link
                key={item._id}
                href={`/products?category=${item.slug}`}
                className="flex justify-between items-center text-base text-gray-700 px-4 hover:text-black dark:text-gray-300 dark:hover:text-white transition border-b pb-2 border-gray-200"
              >
                <span className="flex items-center gap-2 ">
                  <Image
                    className="w-9 h-9"
                    height={50}
                    width={50}
                    src={item?.image}
                    alt={item?.name?.en}
                  />
                  <div>
                    {language === "bn" ? item.name?.bn : item.name?.en}
                    <span className="font-semibold text-[10px] ml-1">
                      ({count})
                    </span>
                  </div>
                </span>
                <span className="">›</span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT BANNER SLIDER */}
        <div className="flex-1 rounded-lg overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="rounded-lg"
          >
            {banners.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-[16/6]">
                  <Image
                    src={img}
                    alt={`Banner ${index}`}
                    fill
                    priority={index === 0}
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 75vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Categoryies */}
      <div className="w-full py-6 md:hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={12}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        
        >
          {categories.map((item) => (
            <SwiperSlide key={item._id}>
              <Link
                href={`/products?category=${item.slug}`}
                className="flex flex-col items-center justify-center text-center group shadow-sm"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 group-hover:scale-105 transition ">
                  <Image
                    src={item?.image}
                    alt={item?.name?.en}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <p className="text-[10px] text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition">
                  {language === "bn" ? item.name?.bn : item.name?.en}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
