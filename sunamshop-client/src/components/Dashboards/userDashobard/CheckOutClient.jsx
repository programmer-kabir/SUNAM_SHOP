"use client";
import DeliveryInfo from "@/components/products/DeliveryInfo";
import useCart from "@/hooks/useCart";
import useUsers from "@/hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CheckOutClient = ({
  user,
  divisions,
  districts,
  upazilas,
  token,
  products,
}) => {
  const { data: cart, refetch } = useCart();
  const [delivery, setDelivery] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: users } = useUsers();
  const currentUser = users?.find((u) => u.email === user?.email);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        firstName: currentUser?.firstName || currentUser?.name || "",
        lastName: currentUser?.lastName || "",
        email: currentUser?.email || "",
        number: currentUser?.number || "",
        division_id: currentUser?.division_id || "",
        district_id: currentUser?.district_id || "",
        upazila_id: currentUser?.upazila_id || "",
        villageName: currentUser?.villageName || "",
      });
    }
  }, [currentUser, reset]);

  const selectedDivision = watch("division_id");
  const selectedDistrict = watch("district_id");

  // ✅ Filter Districts
  const filteredDistricts = useMemo(() => {
    return districts?.filter(
      (district) => String(district.division_id) === String(selectedDivision),
    );
  }, [selectedDivision, districts]);

  // ✅ Filter Upazilas
  const filteredUpazilas = useMemo(() => {
    return upazilas?.filter(
      (upazila) => String(upazila.district_id) === String(selectedDistrict),
    );
  }, [selectedDistrict, upazilas]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!currentUser || !divisions?.length) return;

    const matchedDivision = divisions.find(
      (d) => d.name === currentUser.division,
    );

    const matchedDistrict = districts.find(
      (d) =>
        d.name === currentUser.district &&
        d.division_id === matchedDivision?.id,
    );

    const matchedUpazila = upazilas.find(
      (u) =>
        u.name === currentUser.upazila && u.district_id === matchedDistrict?.id,
    );

    reset({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
      number: currentUser.number || "",
      division_id: matchedDivision?.id || "",
      district_id: matchedDistrict?.id || "",
      upazila_id: matchedUpazila?.id || "",
      villageName: currentUser.villageName || "",
    });
  }, [currentUser, divisions, districts, upazilas, reset]);
  const cartItems = cart?.map((item) => {
    const product = products?.find((p) => p._id === item.productId);

    return {
      _id: item.productId,
      image: product?.images?.[0],
      name: product?.name?.en,
      quantity: item.qty,
      size: item.size,
      color: item.color,
      price: item.price,
    };
  });
  const deliveryCharge = Number(delivery?.charge) || 0;
  const subtotal =
    cartItems?.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.quantity) || 0;
      return acc + price * qty;
    }, 0) || 0;
  const total = subtotal + deliveryCharge;

  // const onSubmit = async (data) => {

  //   setIsSubmitting(true);

  //   const selectedDivisionObj = divisions?.find(
  //     (d) => String(d.id) === String(data.division_id),
  //   );

  //   const selectedDistrictObj = districts?.find(
  //     (d) => String(d.id) === String(data.district_id),
  //   );

  //   const selectedUpazilaObj = upazilas?.find(
  //     (u) => String(u.id) === String(data.upazila_id),
  //   );

  //   const profileRes = await fetch(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/edit_user_profile`,
  //     {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         firstName: data.firstName || null,
  //         lastName: data.lastName || null,
  //         email: data.email,
  //         number: data.number,
  //         division: selectedDivisionObj?.name,
  //         district: selectedDistrictObj?.name,
  //         upazila: selectedUpazilaObj?.name,
  //         villageName: data.villageName,
  //       }),
  //     },
  //   );
  //   if (!profileRes.ok) {
  //     toast.error("Profile update failed");
  //   }

  //   if (profileRes.ok) {
  //     queryClient.invalidateQueries(["edit_user_profile"]);
  //     const orderRes = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           deliveryCharge: deliveryCharge || null,
  //           email: user?.email,
  //         }),
  //       },
  //     );
  //     if (!orderRes.ok) {
  //       toast.error("Order failed");
  //     }
  //     toast.success("Order placed successfully 🎉");
  //     refetch();
  //   }
  // };
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const selectedDivisionObj = divisions?.find(
        (d) => String(d.id) === String(data.division_id),
      );

      const selectedDistrictObj = districts?.find(
        (d) => String(d.id) === String(data.district_id),
      );

      const selectedUpazilaObj = upazilas?.find(
        (u) => String(u.id) === String(data.upazila_id),
      );

      const profileRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/edit_user_profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firstName: data.firstName || null,
            lastName: data.lastName || null,
            email: data.email,
            number: data.number,
            division: selectedDivisionObj?.name,
            district: selectedDistrictObj?.name,
            upazila: selectedUpazilaObj?.name,
            villageName: data.villageName,
          }),
        },
      );

      if (!profileRes.ok) throw new Error("Profile update failed");

      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deliveryCharge: deliveryCharge || null,
            email: user?.email,
          }),
        },
      );

      if (!orderRes.ok) throw new Error("Order failed");

      toast.success("Order placed successfully 🎉");
      refetch();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex  gap-10 bg-gray-50 "
    >
      <div className="bg-white shadow rounded-lg p-8 lg:w-[60%]">
        <h2 className="text-xl font-semibold text-red-500 mb-6">
          Billing Details
        </h2>

        <div className="space-y-6">
          {/* First + Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>First Name *</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full mt-2 px-4 py-3 bg-gray-100 rounded"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label>Last Name *</label>
              <input
                {...register("lastName")}
                className="w-full mt-2 px-4 py-3 bg-gray-100 rounded"
              />
            </div>
          </div>

          {/* Email (Read Only) */}
          <div>
            <label>Email</label>
            <input
              value={user?.email || ""}
              readOnly
              className="w-full mt-2 px-4 py-3 bg-gray-100 rounded cursor-not-allowed"
            />
            <input
              type="hidden"
              {...register("email")}
              value={user?.email || ""}
            />
          </div>

          {/* Number */}
          <div>
            <label>Number *</label>
            <input
              {...register("number", {
                required: "Number is required",
              })}
              className="w-full mt-2 px-4 py-3 bg-gray-100 rounded"
            />
            {errors.number && (
              <p className="text-red-500 text-sm">{errors.number.message}</p>
            )}
          </div>

          {/* Division + District */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>Division *</label>
              <select
                {...register("division_id", {
                  required: "Division is required",
                })}
                onChange={(e) => {
                  setValue("division_id", e.target.value);
                  setValue("district_id", "");
                  setValue("upazila_id", "");
                }}
                className="w-full mt-2 px-4 py-3 bg-gray-100 rounded"
              >
                <option value="">Select Division</option>
                {divisions?.map((division) => (
                  <option key={division.id} value={division.id}>
                    {division.name}
                  </option>
                ))}
              </select>
              {errors.division_id && (
                <p className="text-red-500 text-sm">
                  {errors.division_id.message}
                </p>
              )}
            </div>

            <div>
              <label>District *</label>
              <select
                {...register("district_id", {
                  required: "District is required",
                })}
                disabled={!selectedDivision}
                onChange={(e) => {
                  setValue("district_id", e.target.value);
                  setValue("upazila_id", "");
                }}
                className="w-full mt-2 px-4 py-3 bg-gray-100 rounded"
              >
                <option value="">Select District</option>
                {filteredDistricts?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
              {errors.district_id && (
                <p className="text-red-500 text-sm">
                  {errors.district_id.message}
                </p>
              )}
            </div>
          </div>

          {/* Upazila + Village */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label>Upazila *</label>
              <select
                {...register("upazila_id", {
                  required: "Upazila is required",
                })}
                disabled={!selectedDistrict}
                className="w-full mt-2 px-4 py-3 bg-gray-100 rounded"
              >
                <option value="">Select Upazila</option>
                {filteredUpazilas?.map((upazila) => (
                  <option key={upazila.id} value={upazila.id}>
                    {upazila.name}
                  </option>
                ))}
              </select>
              {errors.upazila_id && (
                <p className="text-red-500 text-sm">
                  {errors.upazila_id.message}
                </p>
              )}
            </div>

            <div>
              <label>Village *</label>
              <input
                {...register("villageName", {
                  required: "Village name is required",
                })}
                className="w-full mt-2 px-4 py-3 bg-gray-100 rounded"
              />
              {errors.villageName && (
                <p className="text-red-500 text-sm">
                  {errors.villageName.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[40%]">
        <div className="flex-1 overflow-y-auto px-6">
          {cartItems?.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 py-4 border-b items-center justify-between"
            >
              {/* Image */}
              <div className="flex items-center gap-2">
                <Image
                  width={100}
                  height={100}
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover rounded "
                />
                <h3 className="font-medium">{item.name}</h3>
              </div>
              <h3 className="font-medium">{item.price}</h3>
            </div>
          ))}
          <div className="space-y-5">
            <DeliveryInfo onChange={setDelivery} />
            <p className="font-semibold">Full Cash On Delivery</p>
            {/* <div className="flex items-center gap-3">
              <div className="w-[70%]">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border px-3 py-2 w-full"
                />
              </div>
              <button className="bg-red-500 text-white px-5 py-2 rounded-md">
                Apply Coupon
              </button>
            </div> */}
          </div>
          <div className="mt-5">
            <h3 className="font-semibold mb-4">Cart Total</h3>

            <div className="flex justify-between mb-2">
              <span>Items subtotal :</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount :</span>
              <span>0</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax :</span>
              <span>0</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Subtotal :</span>
              <span>৳{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping Cost :</span>
              <span>৳{deliveryCharge}</span>
            </div>

            <div className="flex justify-between font-semibold border-t pt-3">
              <span>Total</span>
              <span>৳{total}</span>
            </div>
          </div>
          <div className="flex justify-end mt-7">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg text-white font-semibold transition flex items-center justify-center gap-2
    ${
      isSubmitting
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600"
    }
  `}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                  Processing...
                </>
              ) : (
                "Confirm Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckOutClient;
