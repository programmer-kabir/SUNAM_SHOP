import React from "react";
import ArrivalCard from "../Cards/ArrivalCard";

const NewArrival = () => {
  return (
    <section className="py-10 md:py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT BIG */}
          <ArrivalCard
            height="h-[350px] sm:h-[450px] lg:h-[624px]"
            image="https://supplylinkbd.com/img/Sunam_Shop/arrive_1.jpeg"
            title="Fresh Daily Groceries"
            description="Shop farm-fresh vegetables, fruits, pantry essentials and household items — delivered with quality you can trust."
          />

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Top Full Width on Tablet */}
            <div className="sm:col-span-2">
              <ArrivalCard
                height="h-[250px] sm:h-[300px]"
                image="https://supplylinkbd.com/img/Sunam_Shop/arrive-2.jpeg"
                title="Trending Sneakers Collection"
                description="Discover the latest street-style sneakers built for comfort, performance and everyday fashion."
              />
            </div>

            <ArrivalCard
              height="h-[250px] sm:h-[300px]"
              image="https://supplylinkbd.com/img/Sunam_Shop/arrive-3.jpeg"
              title="Elegant Bags & Accessories"
              description="Upgrade your look with premium handbags, backpacks and travel bags designed for modern lifestyle."
            />

            <ArrivalCard
              height="h-[250px] sm:h-[300px]"
              image="https://supplylinkbd.com/img/Sunam_Shop/arrive_4.jpeg"
              title="Luxury Beauty Essentials"
              description="Explore high-quality skincare, makeup and fragrances crafted to enhance your natural glow."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
