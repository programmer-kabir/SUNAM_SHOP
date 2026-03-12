"use client";

import { useState } from "react";
import axios from "axios";
import slugify from "slugify";
import { toast } from "react-hot-toast";

const AddProductForm = ({
  session,
  category,
  subCategory,
  subSubCategory,
  childCategory,
}) => {
  const initialState = {
    name: { en: "", bn: "" },
    description: { en: "", bn: "" },
    price: "",
    discountPrice: "",
    stock: "",
    images: [""],
    packSize: {
      value: "",
      unit: "",
    },
    category: {
      mainCategoryId: "",
      subCategoryId: "",
      subSubCategoryId: "",
      childCategoryId: "",
    },
    isFeatured: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e, field, lang = null) => {
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      }));
    }
  };

  const handleImageChange = (index, value) => {
    const updated = [...formData.images];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  const addImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const removeImage = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);

    setFormData((prev) => ({
      ...prev,
      images: updated,
    }));
  };

  const handleCategoryChange = (field, value) => {
    setFormData((prev) => {
      let updatedCategory = { ...prev.category, [field]: value };

      if (field === "mainCategoryId") {
        updatedCategory.subCategoryId = "";
        updatedCategory.subSubCategoryId = "";
        updatedCategory.childCategoryId = "";
      }

      if (field === "subCategoryId") {
        updatedCategory.subSubCategoryId = "";
        updatedCategory.childCategoryId = "";
      }

      if (field === "subSubCategoryId") {
        updatedCategory.childCategoryId = "";
      }

      return {
        ...prev,
        category: updatedCategory,
      };
    });
  };

  const filteredSubCategory = subCategory?.filter(
    (item) => item.parentId === formData.category.mainCategoryId,
  );

  const filteredSubSubCategory = subSubCategory?.filter(
    (item) => item.parentId === formData.category.subCategoryId,
  );

  const filteredChildCategory = childCategory?.filter(
    (item) => item.parentId === formData.category.subSubCategoryId,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanName = formData.name.en
      .replace(/[()]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const slug = slugify(cleanName, {
      lower: true,
      strict: true,
      trim: true,
    });

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
        {
          ...formData,
          name: {
            ...formData.name,
            en: cleanName,
          },
          slug,
          category: formData.category,
          price: Number(formData.price),
          discountPrice: Number(formData.discountPrice),
          stock: Number(formData.stock),
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

  const inputClass =
    "w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded outline-none text-sm";

  return (
    <form onSubmit={handleSubmit} className="mx-auto space-y-6">

      <h2 className="text-2xl font-bold">Add New Product</h2>

      {/* Name */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <p className="text-sm">Product Title (EN)</p>
          <input
            type="text"
            className={inputClass}
            value={formData.name.en}
            onChange={(e) => handleChange(e, "name", "en")}
          />
        </div>

        <div>
          <p className="text-sm">Product Title (BN)</p>
          <input
            type="text"
            className={inputClass}
            value={formData.name.bn}
            onChange={(e) => handleChange(e, "name", "bn")}
          />
        </div>

      </div>

      {/* Description */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <p className="text-sm">Description (EN)</p>
          <textarea
            className={inputClass}
            value={formData.description.en}
            onChange={(e) => handleChange(e, "description", "en")}
          />
        </div>

        <div>
          <p className="text-sm">Description (BN)</p>
          <textarea
            className={inputClass}
            value={formData.description.bn}
            onChange={(e) => handleChange(e, "description", "bn")}
          />
        </div>

      </div>

      {/* Price */}
      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <p className="text-sm">Price</p>
          <input
            type="number"
            className={inputClass}
            value={formData.price}
            onChange={(e) => handleChange(e, "price")}
          />
        </div>

        <div>
          <p className="text-sm">Discount Price</p>
          <input
            type="number"
            className={inputClass}
            value={formData.discountPrice}
            onChange={(e) => handleChange(e, "discountPrice")}
          />
        </div>

        <div>
          <p className="text-sm">Stock</p>
          <input
            type="number"
            className={inputClass}
            value={formData.stock}
            onChange={(e) => handleChange(e, "stock")}
          />
        </div>

      </div>

      {/* Pack Size */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <p className="text-sm">Pack Size Value</p>
          <input
            type="number"
            className={inputClass}
            value={formData.packSize.value}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                packSize: { ...prev.packSize, value: e.target.value },
              }))
            }
          />
        </div>

        <div>
          <p className="text-sm">Pack Size Unit</p>
          <select
            className={inputClass}
            value={formData.packSize.unit}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                packSize: { ...prev.packSize, unit: e.target.value },
              }))
            }
          >
            <option value="">Select Unit</option>
            <option value="kg">KG</option>
            <option value="gm">GM</option>
            <option value="ltr">Liter</option>
            <option value="ml">ML</option>
            <option value="pcs">PCS</option>
          </select>
        </div>

      </div>

      {/* Images */}
      <div>

        <h3 className="font-semibold">Images</h3>

        {formData.images.map((img, index) => (
          <div key={index} className="flex gap-2 mt-2">

            <input
              type="text"
              className={inputClass}
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
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          + Add Image
        </button>

      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <p>Main Category</p>
          <select
            className={inputClass}
            value={formData.category.mainCategoryId}
            onChange={(e) =>
              handleCategoryChange("mainCategoryId", e.target.value)
            }
          >
            <option value="">Select</option>
            {category?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Sub Category</p>
          <select
            className={inputClass}
            disabled={!formData.category.mainCategoryId}
            value={formData.category.subCategoryId}
            onChange={(e) =>
              handleCategoryChange("subCategoryId", e.target.value)
            }
          >
            <option value="">Select</option>

            {filteredSubCategory?.map((sub) => (
              <option key={sub.subCategoryId} value={sub.subCategoryId}>
                {sub.name.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Sub Sub Category</p>
          <select
            className={inputClass}
            disabled={!formData.category.subCategoryId}
            value={formData.category.subSubCategoryId}
            onChange={(e) =>
              handleCategoryChange("subSubCategoryId", e.target.value)
            }
          >
            <option value="">Select</option>

            {filteredSubSubCategory?.map((sub) => (
              <option
                key={sub.subSubCategoryId}
                value={sub.subSubCategoryId}
              >
                {sub.name.en}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p>Child Category</p>
          <select
            className={inputClass}
            disabled={!formData.category.subSubCategoryId}
            value={formData.category.childCategoryId}
            onChange={(e) =>
              handleCategoryChange("childCategoryId", e.target.value)
            }
          >
            <option value="">Select</option>

            {filteredChildCategory?.map((child) => (
              <option key={child.childCategoryId} value={child.childCategoryId}>
                {child.name.en}
              </option>
            ))}
          </select>
        </div>

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

      <button className="w-full bg-black text-white py-3 rounded-lg">
        Submit Product
      </button>

    </form>
  );
};

export default AddProductForm;