"use client";
import React, { useEffect, useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Image from "next/image";
import useCart from "@/hooks/useCart";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { data: session } = useSession();
  const { data: Cart, refetch } = useCart();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeItem = (id, color) => {
    const updated = wishlist.filter(
      (item) => !(item._id === id && item.color === color),
    );

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.success("Removed from wishlist");
  };

  const moveToCart = async (item) => {
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
        productId: item._id,
        qty: item.qty,
        color: item.color,
        price: item.price,
        email: session.user.email,
      }),
    });

    if (res.ok) {
      removeItem(item._id, item.color);
      refetch();
      toast.success("Moved to cart");
    }
  };

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mt-2">Start adding products you love ❤️</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col"
          >
            <Image
              width={52}
              height={52}
              src={item.image || "/placeholder.png"}
              alt={item.name}
              className="w-full h-52 object-contain rounded-lg bg-gray-50 p-4"
            />

            <div className="mt-4 flex-1">
              <h3 className="font-semibold text-lg">{item.name}</h3>

              <p className="text-sm text-gray-500 mt-1 capitalize">
                Color: {item.color || "N/A"}
              </p>

              <p className="text-sm text-gray-500">Qty: {item.qty}</p>

              <p className="text-red-500 font-bold text-lg mt-2">
                ৳ {item.price}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => removeItem(item._id, item.color)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
              >
                <Trash2 size={16} />
                Delete
              </button>

              <button
                onClick={() => moveToCart(item)}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                <ShoppingCart size={16} />
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
