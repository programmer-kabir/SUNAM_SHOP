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
  const imageUrl = "https://supplylinkbd.com/";

  return (
    <Link href={`/products/${product?.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
        {/* Image */}
        <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
          <Image
            src={
              product?.images?.[0]
                ? `${imageUrl}${product.images[0]}`
                : "/placeholder.jpg"
            }
            alt={product?.name?.en}
            fill
            className="object-contain group-hover:scale-105 transition duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>

        {/* Content */}
        <div className="px-3 py-2 md:p-4 flex flex-col flex-1 space-y-3">
          {/* Title */}
          <div>
            <h2 className="text-sm md:text-base font-semibold truncate text-gray-800">
              {product?.name?.en}
            </h2>
            <p className="text-xs md:text-sm text-gray-500 line-clamp-2">
              {product?.description?.en}
            </p>
          </div>

          {/* Price */}
          <div>
            {hasFlash ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-red-500 font-bold text-lg md:text-xl">
                  ৳ {flashPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ৳ {originalPrice}
                </span>
              </div>
            ) : hasDiscount ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-green-600 font-bold text-lg md:text-xl">
                  ৳ {discountPrice}
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ৳ {originalPrice}
                </span>
              </div>
            ) : (
              <span className="text-lg md:text-xl font-bold text-gray-800">
                ৳ {originalPrice}
              </span>
            )}
          </div>

          {/* Rating + Stock */}
          <div className="flex items-center justify-between text-xs text-gray-600 mt-auto">
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

            {/* Stock */}
            <span
              className={`font-medium ${
                remainingStock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {remainingStock > 0 ? `${remainingStock} left` : "Out"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductsCard;
