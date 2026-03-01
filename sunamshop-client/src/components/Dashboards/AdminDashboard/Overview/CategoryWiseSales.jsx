"use client";
import React, { useMemo } from "react";

const CategoryWiseSales = ({ orders = [], products = [], categories = [] }) => {
  const categorySales = useMemo(() => {
    const sales = {};

    orders
      .filter((order) => order.status === "delivered")
      .forEach((order) => {
        order.items?.forEach((item) => {
          // 1️⃣ Find product
          const product = products.find(
            (p) => String(p._id) === String(item.productId),
          );
          if (!product) return;

          // 2️⃣ Find category
          const category = categories.find((c) => c.id === product.categoryId);

          const categoryName = category?.slug || "Unknown";

          // 3️⃣ Calculate amount
          const price = Number(item.price) || 0;
          const qty = Number(item.qty) || 1;
          const amount = price * qty;

          if (!sales[categoryName]) {
            sales[categoryName] = 0;
          }

          sales[categoryName] += amount;
        });
      });

    return sales;
  }, [orders, products, categories]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Category Wise Sales</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.entries(categorySales).map(([category, amount]) => (
          <div key={category} className="bg-white shadow rounded-xl p-5">
            <h3 className="text-gray-500 text-sm">{category}</h3>
            <p className="text-2xl font-bold">৳ {amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryWiseSales;
