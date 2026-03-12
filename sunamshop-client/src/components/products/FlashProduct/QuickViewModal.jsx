"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { Heart, X } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/context/WishlistContext";

const QuickViewModal = ({
  product,
  close,
  remainingStock,
  finalPrice,
  discountPercent,
  session,
}) => {
  const [qty, setQty] = useState(1);
  const queryClient = useQueryClient();

  const increase = () => {
    if (qty < remainingStock) setQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };
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
        qty: qty,
      };

      updated = [...wishlist, wishlistItem];
      toast.success("Added to wishlist");
    }

    updateWishlist(updated);
  };
  const isAdmin = session?.user?.role === "admin";

  const isDisabled = isAdmin === "admin";
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  if (typeof window === "undefined") return null;

  const discountPrice = Number(product?.discountPrice);
  const originalPrice = Number(product?.price);
  // console.log(originalPrice)
  const flashPrice = Number(product?.flashPrice);

  const hasFlash = product?.isFlash && flashPrice && flashPrice < originalPrice;
  const hasDiscount = discountPrice && discountPrice < originalPrice;
  const handleBuyNow = async () => {
    // ❌ admin block
    if (isAdmin) {
      toast.error("Admin cannot purchase");
      return;
    }

    // ❗ LOGIN নাই → LocalStorage save
    if (!session) {
      const exists = wishlist.find((item) => item._id === product._id);
      let updated;

      if (exists) {
        updated = wishlist.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + qty } : item,
        );
      } else {
        const wishlistItem = {
          _id: product._id,
          name: product?.name?.en,
          price: finalPrice,
          image: product?.images?.[0],
          qty: qty,
        };

        updated = [...wishlist, wishlistItem];
      }

      updateWishlist(updated);

      toast.success("Cart added");
      // close();
      return;
    }

    // ✅ Logged in user → server cart
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        productId: product?._id,
        qty: qty,
        email: session.user.email,
        price: finalPrice,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      queryClient.invalidateQueries(["cart"]);
      toast.success(`${product?.name?.en} added to cart`);
      close();
    }
  };
  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
      {/* MODAL */}
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded shadow-2xl relative  max-h-[90vh]  overflow-y-auto lg:overflow-hidden">
        {/* Close */}

        <button
          onClick={close}
          className="absolute top-3 right-3 z-50 text-gray-500 hover:text-black dark:hover:text-white text-2xl"
        >
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* IMAGE SIDE */}
          <div className="relative bg-gray-100 h-60 sm:h-72 md:h-full">
            {(hasDiscount || hasFlash) && (
              <div className="absolute top-4 left-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 flex items-center rounded-r-md z-10">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                {discountPercent}% OFF
              </div>
            )}
            <Image
              src={
                product?.images?.[0]
                  ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${product.images[0]}`
                  : "/placeholder.jpg"
              }
              alt={product?.name?.en}
              width={600}
              height={600}
              className="object-contain p-5"
            />
          </div>

          {/* INFO SIDE */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* TITLE */}
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
                <span className="en">{product?.name?.en}</span>
                <span className="bn">{product?.name?.bn}</span>
              </h2>

              {/* PACK SIZE */}
              <p className="text-gray-500 text-sm mt-1">
                {product.packSize.value} {product.packSize.unit}
              </p>

              {/* PRICE */}
              <div className="flex items-center gap-3 mt-4">
                <span className="text-3xl font-bold text-red-600">
                  ৳ {finalPrice}
                </span>

                {(hasDiscount || hasFlash) && (
  <span className="text-gray-400 line-through">
    ৳ {originalPrice}
  </span>
)}
              </div>

              {/* STOCK */}
              <p className="text-sm text-gray-500 mt-2">
                Stock: {remainingStock}
              </p>

              {/* DESCRIPTION */}
              <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm leading-relaxed">
                <span className="en">
                  {product?.description?.en || "No description available"}
                </span>
                <span className="bn">{product?.description?.bn}</span>
              </p>
            </div>

            {/* CART SECTION */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* QUANTITY */}
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={decrease}
                  className="px-5 py-3 text-xl text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>

                <div className="px-6 text-center">
                  <p className="font-semibold">{qty}</p>
                  <p className="text-xs text-gray-400">in bag</p>
                </div>

                <button
                  onClick={increase}
                  className="px-5 py-3 text-xl text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* BUY BUTTON */}
              {isAdmin ? (
                <button
                  disabled
                  className="flex-1 bg-gray-400 text-white font-semibold py-3 rounded-lg cursor-not-allowed"
                >
                  Admin cannot purchase
                </button>
              ) : (
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 transition text-white font-semibold py-3 rounded-lg shadow-md"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default QuickViewModal;
