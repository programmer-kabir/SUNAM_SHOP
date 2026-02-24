import React from "react";
import { Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axios from "axios";

const CartModal = ({ cart, products, onClose, session, refetchCart }) => {
  const cartItems = cart?.map((item) => {
    const product = products?.find((p) => p._id === item.productId);

    return {
      _id: item._id,
      image: product?.images?.[0],
      name: product?.name?.en,
      quantity: item.qty,
      size: item.size,
      color: item.color,
    };
  });

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
      await refetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove product from cart.");
    }
  };
  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-6">
        {cartItems?.map((item, index) => (
          <div key={index} className="flex gap-4 py-4 border-b items-center">
            {/* Image */}
            <Image
              width={100}
              height={100}
              src={item.image}
              alt={item.name}
              className="w-16 h-20 object-cover rounded border border-gray-200 p-1"
            />

            {/* Details */}
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              {item.size && (
                <p className="text-sm text-gray-500">Size: {item.size}</p>
              )}
              {item?.color && (
                <p className="text-sm text-gray-500">Color: {item.color}</p>
              )}
            </div>

            {/* Qty + Delete */}
            <div className="flex gap-2 justify-center items-center">
              <input
                type="number"
                value={item?.quantity}
                readOnly
                className="w-12 h-8 border border-gray-200 rounded text-center leading-none flex items-center justify-center"
              />

              <button onClick={() => handleDelete(item?._id)}>
                <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartItems?.length < 1 && (
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="mx-auto size-20 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>

            <h2 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              No items found
            </h2>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="p-6 border-t space-y-4 flex flex-col items-center">
        {cartItems?.length > 0 && (
          <>
            <Link
              href="/userDashboard/cart/Incomplete_cart"
              className="w-full border rounded py-3 text-center"
            >
              View my cart ({cartItems?.length})
            </Link>

            <Link
              href="/userDashboard/cart/CheckOut"
              className="w-full bg-gray-800 text-white rounded py-3  text-center"
            >
              Check OUt
            </Link>
          </>
        )}

        <Link
          href={"/products"}
          className="text-center text-sm underline cursor-pointer"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
};

export default CartModal;
