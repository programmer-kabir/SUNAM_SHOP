"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";

const LowStockAlert = ({ products = [] }) => {
  const lowStockProducts = useMemo(() => {
    return products
      .filter((product) => (product.stock || 0) <= 5)
      .sort((a, b) => (a.stock || 0) - (b.stock || 0));
  }, [products]);

  if (!lowStockProducts.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">📦 Low Stock Alert</h3>
        <p className="text-green-600 text-sm">
          ✅ All products have sufficient stock.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-5 text-red-600">
        ⚠️ Low Stock Alert
      </h3>

      <div className="space-y-4">
        {lowStockProducts.map((product) => (
          <div
            key={product._id}
            className="flex items-center justify-between border-b pb-3 last:border-none"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative rounded-lg overflow-hidden border">
                <Image
                  src={product.images?.[0] || "/placeholder.png"}
                  alt={product?.name?.en}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium">{product?.name?.en}</h4>
                <p className="text-xs text-gray-500">
                  Stock Left:{" "}
                  <span className="text-red-600 font-semibold">
                    {product.stock}
                  </span>
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <Link
              href={`/dashboard/products/edit/${product._id}`}
              className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Update
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LowStockAlert;
