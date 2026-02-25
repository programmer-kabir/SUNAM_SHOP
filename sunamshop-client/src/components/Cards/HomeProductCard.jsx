"use client";
import Image from "next/image";
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

const HomeProductsCard = ({ product }) => {
  console.log(product.images[0]);

  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md p-4 border">
      {/* Product Image */}
      <div className="relative bg-gray-100 rounded-xl h-64 flex items-center justify-center">
        <Image
          src={product.images?.[0] || "/placeholder.jpg"}
          alt={product.name.en}
          fill
        />
      </div>

      {/* Slider Indicator */}
      <div className="flex items-center justify-center gap-4 mt-3 text-gray-500">
        <ChevronLeft size={18} />
        <span className="text-sm font-medium">1 of 4</span>
        <ChevronRight size={18} />
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mt-4">Apple iPhone 15 Pro Max</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">
        256GB, Natural Titanium, 6.7 Inches - Unlocked (Renewed), Unlocked for
        All Carriers.
      </p>

      {/* Installment Link */}
      <p className="text-blue-600 text-sm mt-3 cursor-pointer">
        Buy in installments with Flowbite Wallet
      </p>

      {/* Price & Colors */}
      <div className="flex items-center justify-between mt-4">
        <span className="text-2xl font-bold">$1299</span>

        <div className="flex gap-2">
          <span className="w-6 h-6 rounded-full bg-black cursor-pointer border"></span>
          <span className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer border"></span>
          <span className="w-6 h-6 rounded-full bg-gray-300 cursor-pointer border"></span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-4">
        <button className="flex-1 border rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-gray-100 transition">
          <Heart size={18} />
          Wishlist
        </button>

        <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          <ShoppingCart size={18} />
          Buy now
        </button>
      </div>
    </div>
  );
};

export default HomeProductsCard;
