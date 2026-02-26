"use client";
import Image from "next/image";
import { useMemo } from "react";
import StarRating from "../ui/StarRating";
import Link from "next/link";

const ProductsCard = ({ product, reviews, category }) => {
  console.log(category);
  const originalPrice = Number(product?.price);
  const flashPrice = Number(product?.flashPrice);

  const discountPrice = Number(product?.discountPrice);

  const hasFlash = product?.isFlash && flashPrice && flashPrice < originalPrice;

  const hasDiscount = discountPrice && discountPrice < originalPrice;
  const review = useMemo(() => {
    return reviews?.filter((r) => r.productId === product?._id) || [];
  }, [reviews, product?._id]);
  const avgRating = useMemo(() => {
    if (review.length === 0) return 0;
    const total = review.reduce((sum, r) => sum + (r.rating || 0), 0);
    return Number((total / review.length).toFixed(1));
  }, [review]);
  const remainingStock = Number(product?.stock ?? 0);
  return (
    <Link href={`/products/${product?.slug}`}>
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden flex flex-col h-full">
        {" "}
        {/* Image */}
        <div className="relative bg-gray-100 h-64">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt={product?.name?.en}
            fill
            className="object-contain"
          />
        </div>
        <div className="px-4 py-5 space-y-4 flex flex-col flex-1">
          {" "}
          {/* Title */}
          <div>
            <h2 className="text-lg font-semibold truncate">
              {product?.name?.en}
            </h2>
            <p className="text-sm text-gray-500 line-clamp-2">
              {product?.description?.en}
            </p>{" "}
          </div>
          {/* Price */}
          <div>
            {hasFlash ? (
              <div className="flex items-center gap-3">
                <span className="text-red-500 font-bold text-2xl">
                  ৳ {flashPrice}
                </span>
                <span className="line-through text-gray-400">
                  ৳ {originalPrice}
                </span>
              </div>
            ) : hasDiscount ? (
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-bold text-2xl">
                  ৳ {discountPrice}
                </span>
                <span className="line-through text-gray-400">
                  ৳ {originalPrice}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">৳ {originalPrice}</span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            {/* Rating */}
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

            {/* Sold + Stock */}
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
        </div>
      </div>
    </Link>
  );
};

export default ProductsCard;
