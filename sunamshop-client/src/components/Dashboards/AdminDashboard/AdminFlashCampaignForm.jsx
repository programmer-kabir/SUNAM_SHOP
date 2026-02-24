"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useProducts from "@/hooks/useProducts";
import ProductSelectModal from "./ProductSelectModal";
import { useSession } from "next-auth/react";

export default function AdminFlashCampaignForm() {
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
      // Date validation
      if (new Date(data.endDate) <= new Date(data.startDate)) {
        toast.error("End date must be after start date");
        return;
      }

      if (selectedProducts.length === 0) {
        toast.error("Please select at least one product");
        return;
      }

      const payload = {
        title: data.title,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),


        productIds: selectedProducts,
        discountPercentage:
          discountType === "percentage" ? Number(data.discount) : null,
        discountAmount:
          discountType === "amount" ? Number(data.discount) : null,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-flash-campaign`,
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
        Create Flash Sale Campaign
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Campaign Title</label>
          <input
            {...register("title", { required: true })}
            className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-red-500 outline-none dark:bg-gray-800"
            placeholder="Enter campaign title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Title is required</p>
          )}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Start Date</label>
            <input
              type="datetime-local"
              {...register("startDate", { required: true })}
              className="w-full border rounded-xl p-3 dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">End Date</label>
            <input
              type="datetime-local"
              {...register("endDate", { required: true })}
              className="w-full border rounded-xl p-3 dark:bg-gray-800"
            />
          </div>
        </div>

        {/* Discount Type */}
        <div>
          <label className="block mb-2 font-medium">Discount Type</label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={discountType === "percentage"}
                onChange={() => setDiscountType("percentage")}
              />
              Percentage (%)
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={discountType === "amount"}
                onChange={() => setDiscountType("amount")}
              />
              Fixed Amount (৳)
            </label>
          </div>

          <input
            type="number"
            {...register("discount", {
              required: true,
              min: 1,
              validate: (value) => {
                if (discountType === "percentage" && value > 100) {
                  return "Percentage cannot exceed 100";
                }
                return true;
              },
            })}
            className="w-full mt-3 border rounded-xl p-3 dark:bg-gray-800"
          />
        </div>

        {/* Product Select */}
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
