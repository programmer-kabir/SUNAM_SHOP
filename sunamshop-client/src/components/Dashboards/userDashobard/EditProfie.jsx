"use client";

import useUsers from "@/hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePlus } from "lucide-react";
import React, { useMemo, useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditProfile = ({ user, divisions, districts, upazilas, token }) => {
  const { data: users } = useUsers();
  const [image, setImage] = useState();
  console.log(image);
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

  const onSubmit = async (data) => {
    // 🔥 Convert ID → Name
    const selectedDivisionObj = divisions?.find(
      (d) => String(d.id) === String(data.division_id),
    );

    const selectedDistrictObj = districts?.find(
      (d) => String(d.id) === String(data.district_id),
    );

    const selectedUpazilaObj = upazilas?.find(
      (u) => String(u.id) === String(data.upazila_id),
    );

    const res = await fetch(
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
          image,
          villageName: data.villageName,
        }),
      },
    );
    const result = await res.json();
    if (res.ok) {
      queryClient.invalidateQueries(["edit_user_profile"]);
      toast.success(`${user?.name} your profile has been updated`);
    }
    // এখানে fetch request দিবা
  };
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
      image: currentUser?.image || "",
      division_id: matchedDivision?.id || "",
      district_id: matchedDistrict?.id || "",
      upazila_id: matchedUpazila?.id || "",
      villageName: currentUser.villageName || "",
    });
  }, [currentUser, divisions, districts, upazilas, reset]);
  return (
    <div className="min-h-screen ">
      <div className=" mx-auto md:px-8 p-2">
        <h2 className="text-xl font-semibold text-red-500 mb-6">
          Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* First + Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm">First Name *</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Write First Name..."
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm">Last Name *</label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                placeholder="Write Last Name..."
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email (Read Only) */}
            <div>
              <label className="text-sm">Email</label>
              <input
                value={user?.email || ""}
                readOnly
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
              />
              <input
                type="hidden"
                {...register("email")}
                value={user?.email || ""}
              />
            </div>

            {/* Number */}
            <div>
              <label className="text-sm">Number *</label>
              <input
                {...register("number", {
                  required: "Number is required",
                })}
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
              />
              {errors.number && (
                <p className="text-red-500 text-sm">{errors.number.message}</p>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm">Image *</label>
            <input
              {...register("image", {
                required: "Image is required",
              })}
              placeholder="Write Image URL..."
              onChange={(e) => setImage(e.target.value)}
              className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>
          {/* Division + District */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm">Division *</label>
              <select
                {...register("division_id", {
                  required: "Division is required",
                })}
                onChange={(e) => {
                  setValue("division_id", e.target.value);
                  setValue("district_id", "");
                  setValue("upazila_id", "");
                }}
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
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
              <label className="text-sm">District *</label>
              <select
                {...register("district_id", {
                  required: "District is required",
                })}
                disabled={!selectedDivision}
                onChange={(e) => {
                  setValue("district_id", e.target.value);
                  setValue("upazila_id", "");
                }}
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
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
              <label className="text-sm">Upazila *</label>
              <select
                {...register("upazila_id", {
                  required: "Upazila is required",
                })}
                disabled={!selectedDistrict}
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
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
              <label className="text-sm">Village *</label>
              <input
                {...register("villageName", {
                  required: "Village name is required",
                })}
                className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm"
              />
              {errors.villageName && (
                <p className="text-red-500 text-sm">
                  {errors.villageName.message}
                </p>
              )}
            </div>
          </div>
          {/* <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Display Images</h2>

            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
              }}
              className="border-2 border-dashed border-gray-300 
                   rounded-xl h-52 flex flex-col items-center 
                   justify-center cursor-pointer 
                   hover:border-blue-500 transition"
            >
              <ImagePlus size={40} className="text-gray-400 mb-3" />

              <p className="text-gray-500">
                Drag your photo here or{" "}
                <span className="text-blue-600 font-medium">
                  Browse from device
                </span>
              </p>

              <input
                type="file"
                multiple
                hidden
                ref={fileInputRef}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {images?.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-6">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative h-28 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={img}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div> */}
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
