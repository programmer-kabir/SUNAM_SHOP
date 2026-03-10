"use client";

import { useEffect, useState } from "react";
import HomeProductsCard from "@/components/Cards/HomeProductCard";
import FlashCountdown from "./FlashCountdown";

export default function FlashSalesPage({ flashProducts, endDate }) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;

      if (distance < 0) {
        setTimeLeft("Expired");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <section className="max-w-[1600px] mx-auto py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 rounded-xl px-6 py-5 mb-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl font-bold text-red-500">Flash Sale</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">

          <FlashCountdown endDate={endDate} />
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
        {flashProducts?.map((product) => (
          <HomeProductsCard key={product?._id} product={product} />
        ))}
      </div>
    </section>
  );
}
