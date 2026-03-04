"use client";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import StarRating from "../ui/StarRating";

const HomeProductsCard = ({ product, reviews }) => {
  const { data: session } = useSession();
  const originalPrice = Number(product?.price);
  const flashPrice = Number(product?.flashPrice);
  const { wishlist, updateWishlist } = useWishlist();
  const hasSizes = Array.isArray(product?.sizes) && product.sizes.length > 0;
  const hasColors = Array.isArray(product?.color) && product.color.length > 0;
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const liked = wishlist.some((item) => item._id === product.productId);
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
  const toggleWishlist = () => {
    const exists = wishlist.find((item) => item._id === product.productId);

    let updated;

    if (exists) {
      updated = wishlist.filter((item) => !(item._id === product.productId));
      toast.success("Removed from wishlist");
    } else {
      const wishlistItem = {
        _id: product.productId,
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
  const queryClient = useQueryClient();

  const discountPrice = Number(product?.discountPrice);

  const hasFlash = product?.isFlash && flashPrice && flashPrice < originalPrice;

  const hasDiscount = discountPrice && discountPrice < originalPrice;

  // 🎯 FINAL PRICE LOGIC
  const finalPrice = hasFlash
    ? flashPrice
    : hasDiscount
      ? discountPrice
      : originalPrice;
  const handleBuyNow = async () => {
    if (!session) {
      alert("Login first");
      return;
    }
    if (remainingStock <= 0) {
      toast.error("Product is out of stock");
      return;
    }
    if (hasSizes && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (hasColors && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        productId: product?._id || null,
        color: selectedColor || null,
        size: selectedSize || null,
        qty: 1,
        email: session.user.email,
        price: finalPrice || null,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      queryClient.invalidateQueries(["cart"]);
      toast.success(`${product?.name?.en} one product added`);
    }
  };

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
        <h2 className="text-base font-semibold line-clamp-1 group-hover:text-blue-600 transition">
          {product?.name?.en}
        </h2>

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

        {/* Rating + Stock */}
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
    </div>
  );
};

export default HomeProductsCard;
