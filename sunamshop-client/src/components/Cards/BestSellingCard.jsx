"use client";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import QuickViewModal from "../products/FlashProduct/QuickViewModal";
import { useSession } from "next-auth/react";
import { useWishlist } from "@/context/WishlistContext";
import toast from "react-hot-toast";
import BestSellingViewModal from "../products/FlashProduct/BestSellingViewModal";
import useCategory from "@/hooks/useCategory";

const BestSellingCard = ({ product }) => {
  const { data: session } = useSession();
  const price = Number(product.price) || 0;
  const discount = Number(product.discountPrice) || 0;
  const category = useCategory();
  const hasDiscount = discount > 0 && discount < price;

  const discountPercentage = hasDiscount
    ? Math.round(((price - discount) / price) * 100)
    : 0;
  const [quickView, setQuickView] = useState(false);
  const { wishlist, updateWishlist } = useWishlist();

  const liked = wishlist.some((item) => item._id === product.productId);

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
  const isAdmin = session?.user?.role;
  const isDisabled = isAdmin === "admin";
  console.log(product);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow relative group overflow-hidden transition">
      {/* Discount Badge */}
      {hasDiscount && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded z-10">
          -{discountPercentage}%
        </span>
      )}

      {/* Wishlist + Quick View */}
      <div
        className="absolute top-3 right-3 flex flex-col gap-2 
      translate-x-6 opacity-0 
      group-hover:translate-x-0 group-hover:opacity-100
      transition-all duration-300 ease-out z-10"
      >
        <button
          onClick={!isDisabled ? toggleWishlist : undefined}
          disabled={isDisabled}
          className={`p-2 bg-white rounded-full 
                        ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                      `}
        >
          <Heart
            className={`w-5 h-5 transition ${
              liked ? "fill-red-500 text-red-500" : "text-black"
            }`}
          />
        </button>

        <button
          onClick={() => setQuickView(true)}
          className="bg-white p-2 rounded-full shadow hover:bg-gray-100 text-black"
        >
          <Eye size={16} />
        </button>
      </div>

      {/* IMAGE WRAPPER */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden group">
        <Image
          src={product.image || "/placeholder.jpg"}
          alt={product.name.en || product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />

        <button
          className="
        absolute bottom-0 left-0 w-full
        bg-black/90 text-white py-3
        translate-y-full
        group-hover:translate-y-0
        transition-transform duration-300 ease-out
      "
        >
          Add To Cart
        </button>
      </div>

      {/* TEXT SECTION */}
      <div className="px-5 py-4">
        <h3 className="text-sm font-medium dark:text-white mb-2 line-clamp-2 h-10">
          {product.name.en || product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-red-500 font-semibold">
            ৳ {hasDiscount ? product.discountPrice : product.price}
          </span>
          {hasDiscount && (
            <span className="line-through text-gray-400 text-sm">
              ৳ {product.price}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-yellow-400 mt-2 text-sm">
          {"★".repeat(Math.round(product.rating || 5))}
          {"☆".repeat(5 - Math.round(product.rating || 5))}
        </div>
      </div>
      {quickView && (
        <QuickViewModal product={product} close={() => setQuickView(false)} />
      )}
    </div>
  );
};

export default BestSellingCard;
