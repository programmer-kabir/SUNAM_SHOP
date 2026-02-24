"use client";
import React, { useEffect, useMemo, useState } from "react";
import StarRating from "../ui/StarRating";
import ProductActions from "./ProductActions";
import CallForOrder from "./CallForOrder";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WishlistContext";
const ProductsDetails = ({ name, product, reviews = [] }) => {
  const { data: session } = useSession();
  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    return Number((total / reviews.length).toFixed(1));
  }, [reviews]);
  const remainingStock = Number(product.stock);
  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;
  const sizeArray = Array.isArray(product?.sizes) ? product.sizes : [];
  const [selectedColor, setSelectedColor] = useState(product?.color?.[0]);

  const [selectedSize, setSelectedSize] = useState(sizeArray[0] || null);
  const [qty, setQty] = useState(1);

  const queryClient = useQueryClient();
  const handleBuyNow = async () => {
    if (!session) {
      alert("Login first");
      return;
    }
    const finalPrice =
      product.discountPrice && product.discountPrice < product.price
        ? product.discountPrice
        : product.price;
    const res = await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        productId: product?._id || null,
        color: selectedColor || null,
        size: selectedSize || null,
        qty: qty || 1,
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
  const { wishlist, updateWishlist } = useWishlist();

  const liked = wishlist.some(
    (item) => item._id === product._id && item.color === selectedColor,
  );

  const toggleWishlist = () => {
    const exists = wishlist.find(
      (item) => item._id === product._id && item.color === selectedColor,
    );

    let updated;

    if (exists) {
      updated = wishlist.filter(
        (item) => !(item._id === product._id && item.color === selectedColor),
      );
      toast.success("Removed from wishlist");
    } else {
      const wishlistItem = {
        _id: product._id,
        name: product?.name?.en,
        price: product.discountPrice || product.price,
        image: product?.images?.[0],
        qty,
        color: selectedColor,
      };

      updated = [...wishlist, wishlistItem];
      toast.success("Added to wishlist");
    }

    updateWishlist(updated);
  };
  const isAdmin = session?.user?.role;
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
        {name}
      </h1>

      <div className="flex items-center gap-2 mb-4">
        <StarRating rating={avgRating} />

        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
          ({avgRating}) • ({reviews.length} reviews) |
          <span
            className={`text-sm font-medium ml-2 ${
              remainingStock > 0
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {remainingStock > 0
              ? `In Stock (${remainingStock})`
              : "Out of Stock"}
          </span>
        </span>
      </div>
      {/* discount */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-black font-bold text-2xl">
          ৳ {hasDiscount ? product.discountPrice : product.price}
        </span>

        {hasDiscount && (
          <span className="line-through text-gray-400 text-sm">
            ৳ {product.price}
          </span>
        )}
      </div>
      <p>{product?.description?.en}</p>
      <p className="border-t border-gray-300 my-8"></p>
      {/* Color */}
      {product?.color?.length > 0 && (
        <div className="mt-5">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Colour:
            </span>

            {/* Selected label */}
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {selectedColor}
            </span>
          </div>

          <div className="flex gap-3 mt-3">
            {product.color.map((c, i) => {
              const active = selectedColor === c;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedColor(c)}
                  className={`relative w-8 h-8 rounded-full transition-all duration-200
                ${active ? "ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-gray-900 scale-110" : "hover:scale-105"}
              `}
                  title={c}
                >
                  <span
                    className="absolute inset-0 rounded-full border border-gray-300 dark:border-gray-600"
                    style={{ backgroundColor: c }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SIZE */}
      {product?.sizes?.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Size:
            </span>

            <span className="text-sm text-gray-500 dark:text-gray-400 uppercase">
              {selectedSize}
            </span>
          </div>

          <div className="flex gap-3 mt-3">
            {sizeArray.map((size, i) => {
              const active = selectedSize === size;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[42px] h-10 px-3 rounded-md border text-sm font-medium transition-all
        ${
          active
            ? "bg-red-500 text-white border-red-500"
            : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 hover:border-gray-500"
        }`}
                >
                  {size.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <ProductActions
        stock={remainingStock}
        setQty={setQty}
        qty={qty}
        handleBuyNow={handleBuyNow}
        liked={liked}
        toggleWishlist={toggleWishlist}
        isAdmin={isAdmin}
      />
      <p className="font-semibold pt-5">
        {" "}
        <span className="text-red-500">Delivery Status:</span> Full Cash On
        Delivery
      </p>
      <CallForOrder number="01941-145876" />
    </div>
  );
};

export default ProductsDetails;
