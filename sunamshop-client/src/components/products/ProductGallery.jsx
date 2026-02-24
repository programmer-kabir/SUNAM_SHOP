"use client";

import { useRef } from "react";
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
export default function ProductGallery({ images = [] }) {
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images?.length) return null;

  const scroll = (dir) => {
    if (!sliderRef.current) return;
    const scrollAmount = 140; // thumbnail width + gap
    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="">
      {/* MAIN IMAGE */}
      <div className="relative w-full lg:w-[700px] h-[700px] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={images[activeIndex]}
          alt="product image"
          fill
          priority
          className=""
        />
      </div>

      {/* THUMBNAILS */}
      <div className="relative mt-4 lg:w-[700px]">
        {/* LEFT ARROW */}
        {images.length > 4 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 lg:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-hidden scroll-smooth py-2"
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative shrink-0 w-20 h-16 lg:w-28 lg:h-20 rounded-xl overflow-hidden transition
          ${
            activeIndex === i
              ? "ring-2 ring-blue-500 scale-105 "
              : "opacity-80 hover:opacity-100"
          }
        `}
            >
              <Image
                src={img}
                alt={`thumb-${i}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* RIGHT ARROW */}
        {images.length > 4 && (
          <button
            onClick={() => scroll("right")}
            className="absolute lg:-right-4 right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
