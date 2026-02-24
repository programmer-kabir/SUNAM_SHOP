import React from "react";
import ArrivalCard from "../Cards/ArrivalCard";

const NewArrival = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex gap-7.5">
          {/* LEFT BIG */}
          <div className="w-1/2">
            <ArrivalCard
              height="h-[600px]"
              image="https://supplylinkbd.com/img/Sunam_Shop/product_1.png"
              title="PlayStation 5"
              description="Black and White version of the PS5 coming out on sale."
            />
          </div>

          {/* RIGHT */}
          <div className="w-1/2 flex flex-col gap-7.5">
            <ArrivalCard
              height="h-[284px]"
              image="https://supplylinkbd.com/img/Sunam_Shop/product_2.png"
              title="Women’s Collections"
              description="Featured woman collections that give you another vibe."
            />

            <div className="flex gap-7.5">
              <ArrivalCard
                height="h-[284px] w-full"
                image="https://supplylinkbd.com/img/Sunam_Shop/product_3.png"
                title="Speakers"
                description="Amazon wireless speakers"
              />

              <ArrivalCard
                height="h-[284px] w-full"
                image="https://supplylinkbd.com/img/Sunam_Shop/product_4.png"
                title="Perfume"
                description="GUCCI INTENSE OUD EDP"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
