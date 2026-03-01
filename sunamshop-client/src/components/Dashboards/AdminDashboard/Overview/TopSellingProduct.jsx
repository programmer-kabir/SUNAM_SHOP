"use client";
import React, { useMemo } from "react";
import Image from "next/image";

const TopSellingProduct = ({ products = [] }) => {
  const topProducts = useMemo(() => {
    if (!products.length) return [];

    return [...products]
      .sort((a, b) => (b.sold || 0) - (a.sold || 0))
      .slice(0, 10);
  }, [products]);

  const maxSold = Math.max(...topProducts.map((p) => p.sold || 0), 1);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-5">🔥 Top 10 Selling Products</h3>

      <div className="space-y-5">
        {topProducts.map((product, index) => {
          const sold = product.sold || 0;
          const percentage = (sold / maxSold) * 100;
          const revenue = (product.price || 0) * sold;

          return (
            <div
              key={product._id}
              className="flex items-center gap-4 border-b pb-4 last:border-none"
            >
              {/* Rank */}
              <div className="w-8 text-center font-bold text-gray-500">
                #{index + 1}
              </div>

              {/* Image */}
              <div className="w-14 h-14 relative rounded-lg overflow-hidden border">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product?.name?.en}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <h4 className="font-medium text-sm truncate">
                  {product?.name?.en}
                </h4>

                <div className="text-xs text-gray-500 mt-1">
                  Sold: {sold} pcs
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="bg-green-500 h-2 rounded transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Revenue */}
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">
                  ৳ {revenue.toLocaleString()}
                </div>
                <div className="text-xs text-gray-400">Revenue</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopSellingProduct;
