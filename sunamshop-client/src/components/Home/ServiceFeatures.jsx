import React from "react";
import { Truck, Headphones, ShieldCheck } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Truck,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

const ServiceFeatures = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.id} className="flex flex-col items-center">
                {/* Icon circle */}
                <div className="w-20 h-20 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center">
                    <Icon size={26} />
                  </div>
                </div>

                {/* Text */}
                <h3 className="font-semibold text-sm tracking-wide dark:text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
