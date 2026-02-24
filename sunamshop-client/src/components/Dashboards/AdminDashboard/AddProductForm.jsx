"use client";

import { useState } from "react";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-hot-toast";
const AddProductForm = ({ session }) => {
    const initialState = {
  name: { en: "", bn: "" },
  description: { en: "", bn: "" },
  price: "",
  discountPrice: "",
  category: "",
  stock: "",
  color: [],
  sizes: [],
  images: [""],
  specifications: [
    {
      key: { en: "", bn: "" },
      value: { en: "", bn: "" },
    },
  ],
  isFeatured: false,
};
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e, field, lang = null) => {
    if (lang) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [lang]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const handleImageChange = (index, value) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData({ ...formData, images: updated });
  };

  const addImage = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImage = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated });
  };

  const handleColorChange = (e) => {
    const colors = e.target.value.split(",").map((c) => c.trim());
    setFormData({ ...formData, color: colors });
  };
  const handleSizeChange = (e) => {
    const sizes = e.target.value.split(",").map((c) => c.trim());
    setFormData({ ...formData, sizes: sizes });
  };

  const handleSpecChange = (index, field, lang, value) => {
    const updated = [...formData.specifications];
    updated[index][field][lang] = value;
    setFormData({ ...formData, specifications: updated });
  };

  const addSpecification = () => {
    setFormData({
      ...formData,
      specifications: [
        ...formData.specifications,
        {
          key: { en: "", bn: "" },
          value: { en: "", bn: "" },
        },
      ],
    });
  };

  const removeSpecification = (index) => {
    const updated = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanName = formData.name.en
      .replace(/[()]/g, "") // remove ()
      .replace(/\s+/g, " ") // remove double spaces
      .trim();

    // 2️⃣ Generate slug safely
    const slug = slugify(cleanName, {
      lower: true,
      strict: true, // remove special characters
      trim: true,
    });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
        {
          ...formData,
          name: {
            ...formData.name,
            en: cleanName,
          },
          slug,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );
setFormData(initialState);
      toast.success("Product Added Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const inputClass = "px-2 py-3 outline-none border border-gray-400 rounded-md";
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-bold">Add New Product</h2>

      {/* Name */}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name (English)"
          className={inputClass}
          onChange={(e) => handleChange(e, "name", "en")}
        />
        <input
          type="text"
          placeholder="Product Name (Bangla)"
          className={inputClass}
          onChange={(e) => handleChange(e, "name", "bn")}
        />
      </div>

      {/* Description */}
      <div className="grid md:grid-cols-2 gap-4">
        <textarea
          placeholder="Description (English)"
          className={inputClass}
          onChange={(e) => handleChange(e, "description", "en")}
        />
        <textarea
          placeholder="Description (Bangla)"
          className={inputClass}
          onChange={(e) => handleChange(e, "description", "bn")}
        />
      </div>

      {/* Price Section */}
      <div className="grid md:grid-cols-4 gap-4">
        <input
          type="number"
          placeholder="Price"
          className={inputClass}
          onChange={(e) => handleChange(e, "price")}
        />
        <input
          type="number"
          placeholder="Discount Price"
          className={inputClass}
          onChange={(e) => handleChange(e, "discountPrice")}
        />
        <input
          type="number"
          placeholder="Stock"
          className={inputClass}
          onChange={(e) => handleChange(e, "stock")}
        />
        <input
          type="text"
          placeholder="Category"
          className={inputClass}
          onChange={(e) => handleChange(e, "category")}
        />
      </div>

      {/* Colors */}
      <input
        type="text"
        placeholder="Colors (comma separated: white, black)"
        className={inputClass}
        onChange={handleColorChange}
      />
      <input
        type="text"
        placeholder="Size (comma separated: S, M, X, xl)"
        className={inputClass}
        onChange={handleSizeChange}
      />

      {/* Images */}
      <div>
        <h3 className="font-semibold mb-2">Images</h3>
        {formData.images.map((img, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Image URL"
              className={`${inputClass} w-full`}
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Image
        </button>
      </div>

      {/* Specifications */}
      <div>
        <h3 className="font-semibold mb-2">Specifications</h3>

        {formData.specifications.map((spec, index) => (
          <div
            key={index}
            className="grid md:grid-cols-4 gap-1 border p-3 rounded mb-3"
          >
            <input
              type="text"
              placeholder="Key EN"
              className={inputClass}
              onChange={(e) =>
                handleSpecChange(index, "key", "en", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Key BN"
              className={inputClass}
              onChange={(e) =>
                handleSpecChange(index, "key", "bn", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Value EN"
              className={inputClass}
              onChange={(e) =>
                handleSpecChange(index, "value", "en", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Value BN"
              className={inputClass}
              onChange={(e) =>
                handleSpecChange(index, "value", "bn", e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => removeSpecification(index)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSpecification}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          + Add Specification
        </button>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={(e) => handleChange(e, "isFeatured")}
        />
        <label>Mark as Featured</label>
      </div>

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg"
      >
        Submit Product
      </button>
    </form>
  );
};

export default AddProductForm;
