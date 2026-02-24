"use client";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import QuickAddModal from "./QuickAddModal";

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const outOfStock = product?.stock <= 0;

  return (
    <>
      <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
        {/* IMAGE */}
        <div className="relative w-full h-56 mb-4 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
          {hasDiscount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md z-10 font-semibold">
              SALE
            </span>
          )}

          {outOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-sm z-20">
              Out of Stock
            </div>
          )}

          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product.name?.en || "Product"}
            fill
            className="object-contain p-4 group-hover:scale-105 transition duration-300"
          />
        </div>

        {/* CATEGORY */}
        <p className="text-xs text-blue-600 font-semibold uppercase mb-1">
          {product.category}
        </p>

        {/* TITLE */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 h-12 hover:text-blue-600 transition">
            {product.name?.en || "No Name"}
          </h3>
        </Link>

        {/* PRICE */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-red-500 font-bold text-xl">
              ৳ {hasDiscount ? product.discountPrice : product.price}
            </span>

            {hasDiscount && (
              <span className="line-through text-gray-400 text-sm">
                ৳ {product.price}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
            >
              Details
            </Link>

            <button
              disabled={outOfStock}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-blue-600 hover:text-white transition"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {open && <QuickAddModal product={product} close={() => setOpen(false)} />}
    </>
  );
}
