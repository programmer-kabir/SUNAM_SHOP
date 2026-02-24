"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";

export default function QuickAddModal({ product, close }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const sizeArray = Array.isArray(product?.sizes) ? product.sizes : [];
  const [selectedSize, setSelectedSize] = useState(sizeArray[0] || null);
  const [selectedColor, setSelectedColor] = useState(product?.color?.[0]);
  const [qty] = useState(1);

  const hasDiscount =
    product.discountPrice && product.discountPrice < product.price;

  const finalPrice = hasDiscount ? product.discountPrice : product.price;

  const handleAdd = async () => {
    if (!session) {
      toast.error("Login first");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-[90%] max-w-md relative">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-500"
        >
          ✕
        </button>

        <div className="relative w-full h-40 mb-4">
          <Image
            src={product.images?.[0] || "/placeholder.jpg"}
            alt="product"
            fill
            className="object-contain"
          />
        </div>

        <h3 className="font-semibold text-lg mb-2">{product.name?.en}</h3>

        <p className="text-red-500 font-bold mb-4">৳ {finalPrice}</p>

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

        <button
          onClick={handleAdd}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
