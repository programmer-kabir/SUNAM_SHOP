"use client";

import { useState, useRef, useEffect } from "react";
import ReviewsTabs from "./ProductTabs/ReviewsTabs";

export default function ProductTabs({ product, reviews = [] }) {
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
      <div className="relative border-b border-gray-300 dark:border-gray-700 flex gap-2">
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
            className={`px-5 py-3 text-sm font-semibold transition-colors
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
          <div className="animate-fadeIn">
            <p>
              This is demo description content. You will later load
              product.description dynamically here.
            </p>
          </div>
        )}

        {active === "reviews" && (
          <div className="animate-fadeIn">
          <ReviewsTabs reviews={reviews}/>
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
