"use client";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import QuickViewModal from "../products/FlashProduct/QuickViewModal";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import StarRating from "../ui/StarRating";
import Link from "next/link";

const ProductCard = ({ product, reviews }) => {
  const { data: session } = useSession();

  const price = Number(product.price);
  const discountPrice = Number(product.discountPrice);

  const hasDiscount = discountPrice > 0 && discountPrice < price;
  const discountPercentage = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;
  const [quickView, setQuickView] = useState(false);
  const { wishlist, updateWishlist } = useWishlist();

  const liked = wishlist.some((item) => item._id === product._id);

  const toggleWishlist = () => {
    const exists = wishlist.find((item) => item._id === product._id);

    let updated;

    if (exists) {
      updated = wishlist.filter((item) => !(item._id === product._id));
      toast.success("Removed from wishlist");
    } else {
      const wishlistItem = {
        _id: product._id,
        name: product?.name?.en,
        price: product.discountPrice || product.price,
        image: product?.images?.[0],
        qty: 1,
      };

      updated = [...wishlist, wishlistItem];
      toast.success("Added to wishlist");
    }

    updateWishlist(updated);
  };
  const isAdmin = session?.user?.role;
  const isDisabled = isAdmin === "admin";
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
    <Link
      href={`/products/${product.slug}`}
      className="group relative
bg-white dark:bg-gray-900
rounded-lg
overflow-hidden
border border-gray-200 dark:border-gray-800
hover:shadow
transition-all duration-300"
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          -{discountPercentage}%
        </span>
      )}

      {/* Wishlist + Quick View */}
      <div
        className="
absolute top-3 md:right-3 right-2 flex flex-col gap-2 z-10
opacity-100 translate-x-0
md:translate-x-6 md:opacity-0
md:group-hover:translate-x-0 
md:group-hover:opacity-100
transition-all duration-300 ease-out
"
      >
        <button
          onClick={!isDisabled ? toggleWishlist : undefined}
          disabled={isDisabled}
          className={`p-2 bg-white rounded-full 
                        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                      `}
        >
          <Heart
            className={`md:w-5 md:h-5 h-3 w-3 transition ${
              liked ? "fill-red-500 text-red-500" : "text-black"
            }`}
          />
        </button>

        <button
          onClick={() => setQuickView(true)}
          className="bg-white p-1 md:p-2 rounded-full shadow hover:bg-gray-100 text-black"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* IMAGE WRAPPER */}
      <div className="relative w-full h-[140px] md:h-[200px] bg-gray-100 overflow-hidden">
        <Image
          src={
            product?.images?.[0]
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]}`
              : "/placeholder.jpg"
          }
          alt={product?.name?.en}
          fill
          className="object-cover"
          sizes=""
        />
      </div>
      {/* TEXT SECTION */}
      <div className="px-3 py-2">
        <h2 className="text-base font-semibold line-clamp-1 group-hover:text-blue-600 transition">
          {product?.name?.en}
        </h2>

        <div className="flex items-center gap-2 pt-2">
          <span className="text-black font-bold text-2xl">
            ৳ {hasDiscount ? product.discountPrice : product.price}
          </span>
          {hasDiscount && (
            <span className="line-through text-gray-400 text-sm">
              ৳ {product.price}
            </span>
          )}
        </div>
        <div className="md:flex items-center justify-between text-xs mt-1 text-gray-600">
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
      </div>
      {quickView && (
        <QuickViewModal product={product} close={() => setQuickView(false)} />
      )}
    </Link>
  );
};

export default ProductCard;
