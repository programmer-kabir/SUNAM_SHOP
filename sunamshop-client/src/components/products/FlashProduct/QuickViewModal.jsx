"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const QuickViewModal = ({ product, close }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl rounded-2xl shadow-xl relative overflow-y-auto h-5/6 md:h-fit scrollbar">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute md:top-4 top-2 right-4 text-gray-500 hover:text-black dark:hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6 mt-5">
          {/* LEFT: Product Image */}
          <div className="relative w-full md:h-96 h-36 bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={
                product?.images?.[0]
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]}`
                  : "/placeholder.jpg"
              }
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
                {product?.description?.en ||
                  product?.description ||
                  "NO Description Found"}
              </p>

              <div className="text-xl font-bold text-red-500 mb-4">
                ৳ {product?.flashPrice || product?.price}
              </div>

              {/* Category & Stock */}
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
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

export default QuickViewModal;
