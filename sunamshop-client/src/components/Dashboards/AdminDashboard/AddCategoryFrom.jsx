"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-hot-toast";

const AddCategoryFrom = ({ token, category }) => {
  const initialState = {
    id: "",
    name: { en: "", bn: "" },
    image: "",
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialState);

  // 🔥 Auto Generate Next Category ID
  useEffect(() => {
    if (category?.length > 0) {
      const numbers = category.map((cat) => Number(cat.id.replace("cat", "")));

      const maxNumber = Math.max(...numbers);
      const nextId = `cat${maxNumber + 1}`;

      setFormData((prev) => ({
        ...prev,
        id: nextId,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        id: "cat1",
      }));
    }
  }, [category]);

  const handleChange = (e, field, lang = null) => {
    if (lang) {
      setFormData({
        ...formData,
        name: {
          ...formData.name,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.en) {
      toast.error("English name is required");
      return;
    }

    const slug = slugify(formData.name.en, {
      lower: true,
      strict: true,
      trim: true,
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
        {
          ...formData,
          slug,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Category Added Successfully");

      // Reset but keep next ID updated
      setFormData((prev) => ({
        ...initialState,
        id: `cat${Number(prev.id.replace("cat", "")) + 1}`,
      }));
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const inputClass =
    "w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm";

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category ID */}
        <div>
          <label>Category Id</label>
          <input
            type="text"
            className={inputClass}
            value={formData.id}
            
          />
        </div>

        {/* English Name */}
        <div>
          <label>Category Name (English)</label>
          <input
            type="text"
            className={inputClass}
            value={formData.name.en}
            onChange={(e) => handleChange(e, "name", "en")}
          />
        </div>

        {/* Bangla Name */}
        <div>
          <label>Category Name (Bangla)</label>
          <input
            type="text"
            className={inputClass}
            value={formData.name.bn}
            onChange={(e) => handleChange(e, "name", "bn")}
          />
        </div>

        {/* Image URL */}
        <div>
          <label>Category Image URL</label>
          <input
            type="text"
            className={inputClass}
            value={formData.image}
            onChange={(e) => handleChange(e, "image")}
          />
        </div>

        {/* Featured */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => handleChange(e, "isFeatured")}
          />
          <label>Mark as Featured</label>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryFrom;
