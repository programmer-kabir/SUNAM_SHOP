"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionHeader from "../SectionHeader";

import HomeProductsCard from "../Cards/HomeProductCard";

const NewArrival = ({ newArrivalData, reviews = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const newArrivals = newArrivalData?.products || [];
  return (
    <section className="py-12 max-w-[1600px]  px-4 w-full mx-auto">
      <div className="md:hidden">
        <SectionHeader subtitle={"Latest Products"} title={"New Arrival"} />
      </div>
      <div className="hidden md:inline">
        <SectionHeader
          subtitle={"Latest Products"}
          title={"New Arrival"}
          hasButton
          link="/flash-sale"
          hasNavigation
          prevRef={prevRef}
          nextRef={nextRef}
        />
      </div>

      {newArrivals?.length > 0 ? (
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
              {newArrivals?.slice(0, 8)?.map((product) => (
                <SwiperSlide key={product?._id}>
                  <HomeProductsCard product={product} reviews={reviews} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="md:hidden grid grid-cols-2 gap-2 w-full">
            {newArrivals?.slice(0, 8)?.map((product) => (
              <div key={product?._id}>
                <HomeProductsCard product={product} reviews={reviews} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </section>
  );
};

export default NewArrival;
