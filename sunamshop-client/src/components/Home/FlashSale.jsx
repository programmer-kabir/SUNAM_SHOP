"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionHeader from "../SectionHeader";

import HomeProductsCard from "../Cards/HomeProductCard";

export default function FlashSale({ reviews, FlashSales }) {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const flashProducts = FlashSales?.products || [];
  const endDate = FlashSales?.campaign?.endDate;
  return (
    <section className="py-12 max-w-[1600px]  px-4 w-full mx-auto">
      <div className="">
        <div className="md:hidden">
          <SectionHeader
            subtitle={"today"}
            title={FlashSales?.campaign?.title}
            hasTimer
            endDate={endDate}
            hasButton
            link="/flash-sale"
          />
        </div>
        <div className="hidden md:inline">
          <SectionHeader
            subtitle={"today"}
            title={FlashSales?.campaign?.title}
            hasTimer
            hasNavigation
            prevRef={prevRef}
            nextRef={nextRef}
            endDate={endDate}
          />
        </div>

        {flashProducts?.length > 0 ? (
          <div className="w-full">
            <div className="hidden md:inline">
              <Swiper
                modules={[Navigation]}
                navigation={{
                  prevEl: ".custom-prev",
                  nextEl: ".custom-next",
                }}
                slidesPerView={2}
                spaceBetween={20}
                breakpoints={{
                  320: { slidesPerView: 2 },
                  480: { slidesPerView: 2 },
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                  1280: { slidesPerView: 7 },
                }}
              >
                {flashProducts?.slice(0, 8)?.map((product) => (
                  <SwiperSlide key={product?._id}>
                    <HomeProductsCard product={product} reviews={reviews} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="md:hidden grid grid-cols-2 gap-2 w-full">
              {flashProducts?.slice(0, 8)?.map((product) => (
                <div key={product?._id}>
                  <HomeProductsCard product={product} reviews={reviews} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p>
        )}
      </div>
    </section>
  );
}
