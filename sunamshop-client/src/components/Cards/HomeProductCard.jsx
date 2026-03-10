"use client";
import Image from "next/image";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import StarRating from "../ui/StarRating";
import QuickViewModal from "../products/FlashProduct/QuickViewModal";

const HomeProductsCard = ({ product, reviews }) => {
  const [quickView, setQuickView] = useState(false);

  const { data: session } = useSession();
  const originalPrice = Number(product?.price);
  const flashPrice = Number(product?.flashPrice);
  const review = useMemo(() => {
    return reviews?.filter((r) => r.productId === product?._id) || [];
  }, [reviews, product?._id]);

  const avgRating = useMemo(() => {
    if (review.length === 0) return 0;
    const total = review.reduce((sum, r) => sum + (r.rating || 0), 0);
    return Number((total / review.length).toFixed(1));
  }, [review]);
  const remainingStock = Number(product?.stock ?? 0);
  const discountPrice = Number(product?.discountPrice);

  const hasFlash = product?.isFlash && flashPrice && flashPrice < originalPrice;
  const hasDiscount = discountPrice && discountPrice < originalPrice;

  // 🎯 FINAL PRICE LOGIC
  const finalPrice = hasFlash
    ? flashPrice
    : hasDiscount
      ? discountPrice
      : originalPrice;
  const discountPercent = hasFlash
    ? Math.round(((originalPrice - flashPrice) / originalPrice) * 100)
    : hasDiscount
      ? Math.round(((originalPrice - discountPrice) / originalPrice) * 100)
      : 0;

  return (
    <div className="group bg-white rounded shadow-sm border border-gray-50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-[140px] md:h-[200px] bg-gray-100 overflow-hidden">
        <Image
          src={
            product?.images?.[0]
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]}`
              : "/placeholder.jpg"
          }
          alt={product?.name?.en}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      {/* Content */}
      <div className="px-3 py-2 flex flex-col flex-1 space-y-1">
        {/* Title */}
        <h2
          onClick={() => setQuickView(true)}
          className="text-base font-semibold line-clamp-1 group-hover:text-blue-600 transition"
        >
          {product?.name?.en}
        </h2>

        <div className="flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ৳ {finalPrice}
            </span>

            {(hasDiscount || hasFlash) && (
              <span className="text-sm text-gray-400 line-through">
                ৳ {originalPrice}
              </span>
            )}
          </div>
          <p className="text-sm">
            {" "}
            {product.packSize.value} {product.packSize.unit}
          </p>
        </div>

        {/* Rating + Stock */}
        <div className="md:flex items-center justify-between text-xs mt-1 text-gray-600 pb-1">
          {review.length > 0 ? (
            <div className="flex items-center gap-1">
              <StarRating rating={avgRating} />
              <span>
                {avgRating} ({review.length})
              </span>
            </div>
          ) : (
            <span className="text-gray-400">No reviews</span>
          )}

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">
              {product?.sold || 0} sold
            </span>

            <span
              className={`font-medium ${
                remainingStock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {remainingStock > 0 ? `${remainingStock} left` : "Out of stock"}
            </span>
          </div>
        </div>

        {/* <button onClick={handleBuyNow} className="primaryButton py-2">Buy Now</button> */}
      </div>
      {quickView && (
        <QuickViewModal
          remainingStock={remainingStock}
          product={product}
          close={() => setQuickView(false)}
          originalPrice={originalPrice}
          finalPrice={finalPrice}
          discountPercent={discountPercent}
          session={session}
        />
      )}
    </div>
  );
};

export default HomeProductsCard;
