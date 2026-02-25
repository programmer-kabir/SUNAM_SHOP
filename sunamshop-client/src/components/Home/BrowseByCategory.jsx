"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SectionHeader from "../SectionHeader";
import { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BrowseByCategory = ({ categories }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const router = useRouter();

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

        {categories?.length > 0 ? (
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
              320: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1224: { slidesPerView: 4 },
            }}
          >
            {categories.map((category) => (
              <SwiperSlide key={category._id}>
                <div
                  onClick={() =>
                    router.push(`/products?category=${category.slug}`)
                  }
                  className="group relative block rounded-2xl overflow-hidden cursor-pointer"
                >
                  {/* Background Image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={category.image}
                      alt={category.name.en}
                      fill
                      unoptimized
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/40" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <p className="text-sm tracking-widest uppercase text-pink-400 font-medium">
                      Category
                    </p>

                    <h3 className="text-xl font-bold text-white">
                      {category.name.en}
                    </h3>

                    <div className="mt-6 overflow-hidden">
                      <p className="translate-y-6 opacity-0 text-sm text-white transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        Explore premium {category.name.en} products with the
                        best deals.
                      </p>
                    </div>
                  </div>
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
