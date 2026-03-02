"use client";

import { useState, useRef, useEffect } from "react";
import ReviewsTabs from "./ProductTabs/ReviewsTabs";

export default function ProductTabs({ product, reviews = [] }) {
  console.log(product);
  const tabs = [
    { id: "description", label: "Description" },
    { id: "reviews", label: `Reviews (${reviews?.length})` },
    { id: "chart", label: "Product Chart" },
    { id: "faq", label: "FAQ" },
  ];

  const [active, setActive] = useState("description");
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});

  /* underline animation */
  useEffect(() => {
    const el = tabRefs.current[active];
    if (!el || !indicatorRef.current) return;

    indicatorRef.current.style.width = `${el.offsetWidth}px`;
    indicatorRef.current.style.transform = `translateX(${el.offsetLeft}px)`;
  }, [active]);

  return (
    <div className="w-full mt-12">
      {/* HEADER */}
      <div className="relative border-b border-gray-300 dark:border-gray-700 flex md:gap-2">
        {/* underline indicator */}
        <span
          ref={indicatorRef}
          className="absolute bottom-0 h-[2px] bg-red-500 transition-all duration-300"
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            onClick={() => setActive(tab.id)}
            className={`md:px-5 px-2 py-3 text-sm font-semibold transition-colors
              ${
                active === tab.id
                  ? "text-red-500"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="mt-8 text-gray-600 dark:text-gray-300 text-sm leading-relaxed min-h-[140px]">
       {active === "description" && (
  <div className="animate-fadeIn space-y-8">
    
    {/* Bangla Description Only */}
    {product?.description?.bn && (
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          পণ্যের বিবরণ
        </h3>

        <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {product.description.bn}
        </div>
      </div>
    )}

    {/* Specifications */}
    {product?.specifications?.length > 0 && (
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          স্পেসিফিকেশন
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          {product.specifications.map((spec, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 px-4 py-3 rounded-lg"
            >
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {spec.key.bn}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {spec.value.bn}
              </span>
            </div>
          ))}
        </div>
      </div>
    )}

  </div>
)}

        {active === "reviews" && (
          <div className="animate-fadeIn">
            <ReviewsTabs reviews={reviews} />
          </div>
        )}

        {active === "chart" && (
          <div className="animate-fadeIn">
            <p>Product size / specification chart will appear here.</p>
          </div>
        )}

        {active === "faq" && (
          <div className="animate-fadeIn">
            <p>Frequently asked questions will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
