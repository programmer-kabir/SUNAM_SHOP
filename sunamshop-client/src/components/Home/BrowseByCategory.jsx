"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionHeader from "../SectionHeader";
import { useRef } from "react";

const BrowseByCategory = ({ products }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom">
        <SectionHeader
          subtitle="Categories"
          title="Browse By Category"
          hasNavigation
          prevRef={prevRef}
          nextRef={nextRef}
        />

        {categories.length > 0 ? (
          <Swiper
            modules={[Navigation]}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded border border-gray-200 text-center hover:shadow-lg transition cursor-pointer">
                  <p className="font-medium dark:text-white">{category}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No categories found.</p>
        )}
      </div>
    </section>
  );
};

export default BrowseByCategory;
