"use client";

import { Truck } from "lucide-react";
import { useState, useEffect } from "react";

export default function DeliveryInfo({ onChange }) {
  const options = [
    { id: "inside", label: "Inside Mangalkata", charge: 0 },
    { id: "outside", label: "Outside Mangalkata", charge: 50 },
  ];

  const [selected, setSelected] = useState(options[0]);

  // parent কে জানাবে
  useEffect(() => {
    onChange?.(selected);
  }, [selected, onChange]);

  return (
    <div className="border-t border-gray-300 dark:border-gray-700 pt-6">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-gray-700 dark:text-gray-300">
          <Truck className="w-5 h-5" />
        </div>

        <div className="text-sm w-full">
          <p className="font-semibold text-gray-900 dark:text-white mb-3">
            Delivery Charge
          </p>

          <div className="space-y-2">
            {options.map((opt) => {
              const active = selected.id === opt.id;

              return (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between border rounded-md px-3 py-2 cursor-pointer transition
                  ${
                    active
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-gray-300 dark:border-gray-700 hover:border-gray-500"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      checked={active}
                      onChange={() => setSelected(opt)}
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {opt.label}
                    </span>
                  </div>

                  <span className="font-medium text-black dark:text-white">
                    ৳{opt.charge}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
