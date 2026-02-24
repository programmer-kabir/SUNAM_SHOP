"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddToCartModal = ({ product, close }) => {
  console.log(product);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const sizeArray = Array.isArray(product?.sizes) ? product.sizes : [];
  const [selectedSize, setSelectedSize] = useState(sizeArray[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.color?.[0]);
  const [qty] = useState(1);

  if (typeof window === "undefined") return null;
  const isAdmin = session?.user?.role;
  const isDisabled = isAdmin === "admin";
  const outOfStock = product?.stock <= 0;
  const originalPrice = Number(product?.price);
  const flashPrice = Number(product?.flashPrice);

  const hasFlash = product?.isFlash && flashPrice && flashPrice < originalPrice;

  const finalPrice = hasFlash ? flashPrice : originalPrice;
  const handleAdd = async () => {
    if (!session) {
      toast.error("Login first");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        productId: product._id,
        color: selectedColor,
        size: selectedSize,
        qty,
        email: session.user.email,
        price: finalPrice,
      }),
    });

    if (res.ok) {
      queryClient.invalidateQueries(["cart"]);
      toast.success("Added to cart");
      close();
    }
  };
  return createPortal(
    <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl rounded-2xl shadow-xl relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white text-xl"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* LEFT: Product Image */}
          <div className="relative w-full h-80 bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={product?.images?.[0] || "/placeholder.jpg"}
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
                {product?.description?.en || "No description available."}
              </p>

              <div className="text-xl font-bold text-red-500 mb-4">
                ৳ {product?.flashPrice || product?.price}
              </div>

              {/* Category & Stock */}
              <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                <p>Category: {product?.category}</p>
                <p>Stock: {product?.stock || "Available"}</p>
              </div>
            </div>
            {/* Color */}
            {product?.color?.length > 0 && (
              <div className="mb-4">
                <p className="text-sm mb-2">Color</p>
                <div className="flex gap-2">
                  {product.color.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`w-6 h-6 rounded-full border ${
                        selectedColor === c ? "ring-2 ring-blue-600" : ""
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size */}
            {sizeArray.length > 0 && (
              <div className="mb-4">
                <p className="text-sm mb-2">Size</p>
                <div className="flex gap-2">
                  {sizeArray.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1 text-sm border rounded-md ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* Bottom Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                disabled={outOfStock || isDisabled}
                onClick={handleAdd}
                className={`flex-1 py-2 rounded-md font-semibold text-white
    ${
      outOfStock || isDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600"
    }
  `}
              >
                {outOfStock
                  ? "Out of Stock"
                  : isDisabled
                    ? "Admin Can't Buy"
                    : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default AddToCartModal;
