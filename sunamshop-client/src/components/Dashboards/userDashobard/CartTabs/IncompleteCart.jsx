"use client";
import NoDataFound from "@/components/noFound";
import useCart from "@/hooks/useCart";
import axios from "axios";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const IncompleteCart = ({ products }) => {
  const { data: cart, refetch } = useCart();

  const cartItems = cart?.map((item) => {
    const product = products?.find((p) => p._id === item.productId);

    return {
      _id: item.productId,
      image: product?.images?.[0],
      name: product?.name?.en,
      price: item?.price || 0,
      quantity: item.qty,
      size: item.size,
      color: item.color,
      subtotal: (item?.price || 0) * item.qty,
    };
  });

  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.subtotal, 0) || 0;
  const total = subtotal;
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete Item?",
        text: "Are you sure you want to remove this product from your cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0f172a",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, Delete It",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (!result.isConfirmed) return;
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

      toast.success("Product removed from your cart successfully.");
      await refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from cart.");
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {cartItems?.length === 0 ? (
        <NoDataFound />
      ) : (
        <>
          {/* Desktop Header */}
          <div className="hidden md:grid grid-cols-5 border-b pb-4 text-gray-500 font-semibold text-sm uppercase tracking-wide">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span className="text-right">Subtotal</span>
            <span className="text-right">Action</span>
          </div>

          {/* Cart Items */}
        {cartItems?.map((item) => (
  <div
    key={item._id}
    className="border-b py-5"
  >
    {/* Desktop Layout */}
    <div className="hidden md:grid grid-cols-5 items-center gap-4">
      
      {/* Product */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-md overflow-hidden border bg-gray-50">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">
            {item.size && `Size: ${item.size}`}{" "}
            {item.color && `| Color: ${item.color}`}
          </p>
        </div>
      </div>

      {/* Price */}
      <div>৳ {item.price}</div>

      {/* Quantity */}
      <div>{item.quantity}</div>

      {/* Subtotal */}
      <div className="text-right font-semibold">
        ৳ {item.subtotal}
      </div>

      {/* Action */}
      <div className="flex justify-end">
        <button
          onClick={() => handleDelete(item?._id)}
          className="text-red-500 hover:text-red-600 transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="flex md:hidden items-center justify-between gap-3">
      
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="relative w-16 h-16 rounded-md overflow-hidden border bg-gray-50 shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate">
            {item.name}
          </h3>

          <p className="text-xs text-gray-500 truncate">
            {item.size && `Size: ${item.size}`}{" "}
            {item.color && `| Color: ${item.color}`}
          </p>

          <div className="text-xs text-gray-600 mt-1">
            ৳ {item.price} × {item.quantity}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <span className="font-semibold text-sm">
          ৳ {item.subtotal}
        </span>

        <button
          onClick={() => handleDelete(item?._id)}
          className="text-red-500 hover:text-red-600 transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
))}

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-8 gap-6">
            <Link
              href="/products"
              className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
            >
              ← Return To Shop
            </Link>
          </div>

          {/* Cart Total Section */}
          <div className=" flex justify-end">
            <div className="w-full md:w-96 bg-white shadow rounded-2xl p-8 border border-gray-50">
              <h3 className="font-semibold text-lg mb-6">Cart Total</h3>

              <div className="flex justify-between mb-3 text-gray-600">
                <span>Subtotal</span>
                <span>৳ {subtotal}</span>
              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span>৳ {total}</span>
              </div>

              <Link
                href="/CheckOut"
                className="mt-6 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg block text-center transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IncompleteCart;
