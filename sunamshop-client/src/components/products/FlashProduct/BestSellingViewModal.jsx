"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const BestSellingViewModal = ({ product, close }) => {
    console.log(product)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl rounded-2xl shadow-xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* LEFT: Product Image */}
          <div className="relative w-full h-80 bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={product?.images?.[0] || "/placeholder.jpg"}
              alt={product?.name?.en}
              fill
              className="object-contain"
            />
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-3 dark:text-white">
                {product?.name?.en}
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product?.description?.en || "No description available."}
              </p>

              <div className="text-xl font-bold text-red-500 mb-4">
                ৳ {product?.flashPrice || product?.price}
              </div>

              {/* Category & Stock */}
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>Category: {product?.category}</p>
                <p>Stock: {product?.stock || "Available"}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BestSellingViewModal;
