"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-hot-toast";

const AddCategoryFrom = ({
  token,
  category,
  subCategory,
  subSubCategory,
  childCategory,
}) => {
  const initialState = {
    id: "",
    name: { en: "", bn: "" },
    image: "",
    parentId: "",
    level: 0,
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [level, setLevel] = useState("main");

  const inputClass =
    "w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm";

  // ============================
  // AUTO ID GENERATE
  // ============================

  useEffect(() => {
    let nextId = "";

    if (level === "main") {
      const numbers =
        category?.map((c) => Number(c.id.replace("cat", ""))) || [];
      nextId = `cat${Math.max(...numbers, 0) + 1}`;
    }

    if (level === "sub") {
      const numbers =
        subCategory?.map((c) =>
          Number(c.subCategoryId.replace("sub_cat", "")),
        ) || [];
      nextId = `sub_cat${Math.max(...numbers, 0) + 1}`;
    }

    if (level === "subsub") {
      const numbers =
        subSubCategory?.map((c) =>
          Number(c.subSubCategoryId.replace("sub_sub_cat", "")),
        ) || [];
      nextId = `sub_sub_cat${Math.max(...numbers, 0) + 1}`;
    }

    if (level === "child") {
      const numbers =
        childCategory?.map((c) =>
          Number(c.childCategoryId.replace("child_cat", "")),
        ) || [];
      nextId = `child_cat${Math.max(...numbers, 0) + 1}`;
    }

    setFormData((prev) => ({
      ...prev,
      id: nextId,
    }));
  }, [level]);

  // ============================
  // HANDLE INPUT
  // ============================

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

  // ============================
  // SUBMIT
  // ============================

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

    let url = "";
    let payload = {};

    // MAIN CATEGORY
    if (level === "main") {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`;

      payload = {
        id: formData.id,
        name: formData.name,
        slug,
        image: formData.image,
        isFeatured: formData.isFeatured,
      };
    }

    // SUB CATEGORY
    if (level === "sub") {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub_categories`;

      payload = {
        subCategoryId: formData.id,
        name: formData.name,
        slug,
        parentId: formData.parentId,
        image: formData.image,
        isFeatured: formData.isFeatured,
        level: 1,
      };
    }

    // SUB SUB CATEGORY
    if (level === "subsub") {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub_sub_categories`;

      payload = {
        subSubCategoryId: formData.id,
        name: formData.name,
        slug,
        parentId: formData.parentId,
        image: formData.image,
        isFeatured: formData.isFeatured,
        level: 2,
      };
    }

    // CHILD CATEGORY
    if (level === "child") {
      url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/child_categories`;

      payload = {
        childCategoryId: formData.id,
        name: formData.name,
        slug,
        parentId: formData.parentId,
        image: formData.image,
        isFeatured: formData.isFeatured,
        level: 3,
      };
    }

    try {
      await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category Added Successfully");

      setFormData(initialState);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Category</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* LEVEL SELECT */}
        <div>
          <label>Category Level</label>

          <select
            className={inputClass}
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="main">Main Category</option>
            <option value="sub">Sub Category</option>
            <option value="subsub">Sub Sub Category</option>
            <option value="child">Child Category</option>
          </select>
        </div>

        {/* CATEGORY ID */}

        <div>
          <label>ID</label>
          <input className={inputClass} value={formData.id} readOnly />
        </div>

        {/* PARENT SELECT */}

        {level === "sub" && (
          <div>
            <label>Main Category</label>

            <select
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, parentId: e.target.value })
              }
            >
              <option>Select Category</option>

              {category.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name.en}
                </option>
              ))}
            </select>
          </div>
        )}

        {level === "subsub" && (
          <div>
            <label>Sub Category</label>

            <select
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, parentId: e.target.value })
              }
            >
              <option>Select Sub Category</option>

              {subCategory.map((sub) => (
                <option key={sub.subCategoryId} value={sub.subCategoryId}>
                  {sub.name.en}
                </option>
              ))}
            </select>
          </div>
        )}

        {level === "child" && (
          <div>
            <label>Sub Sub Category</label>

            <select
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, parentId: e.target.value })
              }
            >
              <option>Select Sub Sub Category</option>

              {subSubCategory.map((sub) => (
                <option key={sub.subSubCategoryId} value={sub.subSubCategoryId}>
                  {sub.name.en}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* ENGLISH NAME */}

        <div>
          <label>Name (English)</label>
          <input
            className={inputClass}
            value={formData.name.en}
            onChange={(e) => handleChange(e, "name", "en")}
          />
        </div>

        {/* BANGLA NAME */}

        <div>
          <label>Name (Bangla)</label>
          <input
            className={inputClass}
            value={formData.name.bn}
            onChange={(e) => handleChange(e, "name", "bn")}
          />
        </div>

        {/* IMAGE */}

        <div>
          <label>Image URL</label>
          <input
            className={inputClass}
            value={formData.image}
            onChange={(e) => handleChange(e, "image")}
          />
        </div>

        {/* FEATURED */}

        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            checked={formData.isFeatured}
            onChange={(e) => handleChange(e, "isFeatured")}
          />
          <label>Featured</label>
        </div>

        <button className="w-full bg-black text-white py-3 rounded">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryFrom;
