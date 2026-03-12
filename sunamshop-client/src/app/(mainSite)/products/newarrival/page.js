import HomeProductsCard from "@/components/Cards/HomeProductCard";
import { getAllNewArrivalData } from "@/utils/NewArrival";
import React from "react";

const NewArrivalPage = async () => {
  const newArrivalData = await getAllNewArrivalData();
  return (
    <section className="max-w-[1600px] mx-auto py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-100 rounded-xl px-6 py-5 mb-6">
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl font-bold text-red-500">New Arrival</h1>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
        {newArrivalData?.products?.map((product) => (
          <HomeProductsCard key={product?._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalPage;
