"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import useProducts from "@/hooks/useProducts";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { data: products } = useProducts();
  const categoryNames = [...new Set(products?.map((p) => p.category))];
  const categories = categoryNames?.slice(0, 8);

  const banners = [
    "https://supplylinkbd.com/img/Sunam_Shop/banner_1.webp",
    "https://supplylinkbd.com/img/Sunam_Shop/banner_2.webp",
    "https://supplylinkbd.com/img/Sunam_Shop/banner_3.webp",
    "https://supplylinkbd.com/img/Sunam_Shop/banner_8.webp",
  ];

  return (
    <section className="w-full bg-gray-100 dark:bg-gray-900 py-6">
      <div className="container-custom flex gap-6">
        {/* LEFT CATEGORY MENU */}
        <div className="hidden lg:flex flex-col w-60 bg-white dark:bg-gray-950 rounded-lg shadow p-4 space-y-3">
          {categories.map((item, index) => {
            const count = products?.filter((p) => p.category === item).length;

            return (
              <Link
                key={index}
                href={`/products?category=${item}`}
                className="flex justify-between items-center text-sm text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white transition"
              >
                <span>
                  {item} <span className="font-semibold text-[10px]">({count})</span>
                </span>
                <span>›</span>
              </Link>
            );
          })}
        </div>

        {/* RIGHT SWIPER SLIDER */}
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
            observer={true}
            observeParents={true}
            className="rounded-lg"
          >
            {banners.map((img, index) => (
              <SwiperSlide key={index}>
                {/* 🔥 Fixed Aspect Ratio Container */}
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
    </section>
  );
}
