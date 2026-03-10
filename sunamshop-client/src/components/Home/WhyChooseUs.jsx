"use client";

import { ShoppingBasket, Scale, Bike, RotateCcw } from "lucide-react";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

export default function WhyChooseUs({ products = [] }) {
  const { language } = useThemeLanguage();

const features = [
  {
    icon: <ShoppingBasket size={26} />,
    title:
      language === "BN"
        ? `${products.length}+ পণ্য`
        : `${products.length}+ Products`,
    desc:
      language === "BN"
        ? "বাজারের সব প্রয়োজনীয় পণ্য এক জায়গায়"
        : "All your daily essentials in one place",
  },
  {
    icon: <Scale size={26} />,
    title:
      language === "BN"
        ? "ওজন অনুযায়ী মূল্য"
        : "Weight Based Pricing",
    desc:
      language === "BN"
        ? "যতটুকু নেবেন ততটুকুই দাম"
        : "Pay exactly for what you take",
  },
  {
    icon: <Bike size={26} />,
    title:
      language === "BN"
        ? "দ্রুত ডেলিভারি"
        : "Fast Delivery",
    desc:
      language === "BN"
        ? "মাত্র ১ ঘন্টার মধ্যে ডেলিভারি"
        : "Delivery within 1 hour",
  },
  {
    icon: <RotateCcw size={26} />,
    title:
      language === "BN"
        ? "সহজ রিটার্ন"
        : "Easy Returns",
    desc:
      language === "BN"
        ? "কোন ঝামেলা ছাড়াই রিটার্ন সুবিধা"
        : "Hassle-free return policy",
  },
];

  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white border border-gray-400 shadow-black rounded-xl p-6 hover:shadow-md transition"
          >
            <div className="text-gray-700">{item.icon}</div>

            <div>
              <p className="text-gray-600 text-sm">{item.desc}</p>
              <h3 className="font-semibold text-lg">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
