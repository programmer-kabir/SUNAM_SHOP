"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useProducts from "@/hooks/useProducts";
import ProductSelectModal from "./ProductSelectModal";
import { useSession } from "next-auth/react";

export default function NewArrivalFrom() {
  const { data: products = [] } = useProducts();
  const { data: session } = useSession();
  const [discountType, setDiscountType] = useState("percentage");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {

      if (selectedProducts.length === 0) {
        toast.error("Please select at least one product");
        return;
      }

      const payload = {

        productIds: selectedProducts,       
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/new_arrival`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

      toast.success("Flash Campaign Created 🎉");

      reset();
      setSelectedProducts([]);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        New Arrival Products
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Select Products</label>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-between w-full border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {selectedProducts.length > 0
                ? `${selectedProducts.length} Products Selected`
                : "Select Products"}
            </span>

            <span className="text-sm text-red-500 font-semibold">
              {selectedProducts.length > 0 && "Edit"}
            </span>
          </button>

          {/* Selected Preview */}
          {selectedProducts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedProducts.slice(0, 5).map((id) => {
                const product = products.find((p) => p._id === id);
                return (
                  <span
                    key={id}
                    className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full"
                  >
                    {product?.name?.en}
                  </span>
                );
              })}

              {selectedProducts.length > 5 && (
                <span className="text-xs text-gray-500">
                  +{selectedProducts.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition duration-200"
        >
          Create Campaign
        </button>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <ProductSelectModal
          products={products}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
