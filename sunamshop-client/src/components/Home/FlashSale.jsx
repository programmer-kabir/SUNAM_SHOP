"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Heart, Eye } from "lucide-react";
import Image from "next/image";
import SectionHeader from "../SectionHeader";
import HomeProductCard from "../Cards/DHomeProductCard";
import useFlashSale from "@/hooks/useFlashSale";
import FlashProductCard from "../Cards/FlashProductCard";
import { useSession } from "next-auth/react";
import Link from "next/link";
import HomeProductsCard from "../Cards/HomeProductCard";

export default function FlashSale({ products }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { data: flashSales } = useFlashSale();
  const flashProducts = flashSales?.products || [];
  const endDate = flashSales?.campaign?.endDate;
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        {/* HEADER */}

        <SectionHeader
          subtitle={"today"}
          title={flashSales?.campaign?.title}
          hasTimer
          hasNavigation
          prevRef={prevRef}
          nextRef={nextRef}
          endDate={endDate}
        />

        {/* PRODUCT SLIDER */}
        {flashProducts?.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {flashProducts?.map((product) => (
              <SwiperSlide key={product?._id}>
                <HomeProductsCard product={product} flashSales={flashSales} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {/* VIEW ALL BUTTON */}
        <div className="flex justify-center mt-10">
          <Link
            href={"/products/flashsale"}
            className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition font-medium"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
