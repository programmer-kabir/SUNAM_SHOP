"use client";

import { useState } from "react";
import CompleteCartTabs from "./CartTabs/CompleteCart";
import IncompleteCartTabs from "./CartTabs/IncompleteCart";

export default function CartTabs({ products }) {
  const [activeTab, setActiveTab] = useState("incomplete");

  return (
    <div className="w-full mt-6">
      {/* Tab buttons */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("complete")}
          className={`px-6 py-3 border-b-2 transition
            ${
              activeTab === "complete"
                ? "border-gray-800 text-black font-semibold"
                : "border-transparent text-black "
            }`}
        >
          Completed
        </button>

        <button
          onClick={() => setActiveTab("incomplete")}
          className={`px-6 py-3 border-b-2 transition
            ${
              activeTab === "incomplete"
                ? "border-gray-800 text-black font-semibold"
                : "border-transparent text-black"
            }`}
        >
          Incomplete
        </button>
      </div>

      {/* Content */}
      <div className="mt-5">
        {activeTab === "complete" && <CompleteCartTabs products={products} />}
        {activeTab === "incomplete" && (
          <IncompleteCartTabs products={products} />
        )}
      </div>
    </div>
  );
}
