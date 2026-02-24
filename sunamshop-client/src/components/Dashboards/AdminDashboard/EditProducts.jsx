"use client";
import useProducts from "@/hooks/useProducts";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
const EditProducts = ({ productId }) => {
  const { data: products } = useProducts();
  const currentProduct = products?.find((p) => p?._id === productId);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (currentProduct) {
      setFormData(currentProduct);
    }
  }, [currentProduct]);

  if (!formData) return <p className="p-6">Loading...</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    console.log("Updated Data:", formData);

    toast.success("Product Updated Successfully!");
  };
  // Specification Change
  const handleSpecChange = (index, field, lang, value) => {
    const updatedSpecs = [...formData.specifications];

    updatedSpecs[index][field][lang] = value;

    setFormData({
      ...formData,
      specifications: updatedSpecs,
    });
  };

  // Add New Specification
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

  // Remove Specification
  const removeSpecification = (index) => {
    const updatedSpecs = formData.specifications.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      specifications: updatedSpecs,
    });
  };
  // Remove Image
  const removeImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: updatedImages,
    });
  };

  // Add Image
  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""],
    });
  };

  // Update Image URL
  const updateImage = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;

    setFormData({
      ...formData,
      images: updatedImages,
    });
  };
  return (
    <div>
      <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
        {/* Name EN */}
        <div>
          <label className="block text-sm mb-2">Name (EN)</label>
          <input
            type="text"
            value={formData.name?.en || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: { ...formData.name, en: e.target.value },
              })
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Name BN */}
        <div>
          <label className="block text-sm mb-2">Name (BN)</label>
          <input
            type="text"
            value={formData.name?.bn || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: { ...formData.name, bn: e.target.value },
              })
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Discount Price */}
        <div>
          <label className="block text-sm mb-2">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm mb-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Colors */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2">Colors (comma separated)</label>
          <input
            type="text"
            value={formData.color?.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                color: e.target.value.split(",").map((c) => c.trim()),
              })
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Sizes */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2">Sizes (comma separated)</label>
          <input
            type="text"
            value={formData.sizes?.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                sizes: e.target.value.split(",").map((s) => s.trim()),
              })
            }
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Description EN */}
        <div className="md:col-span-2">
          <label className="block text-sm mb-2">Description (EN)</label>
          <textarea
            value={formData.description?.en || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: {
                  ...formData.description,
                  en: e.target.value,
                },
              })
            }
            rows={4}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-2">Description (BN)</label>
          <textarea
            value={formData.description?.bn || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: {
                  ...formData.description,
                  bn: e.target.value,
                },
              })
            }
            rows={4}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        {/* Images Preview */}
        <div className="md:col-span-2 mt-6">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium">Images</label>

            <button
              type="button"
              onClick={addImage}
              className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm"
            >
              + Add Image
            </button>
          </div>

          {formData.images?.map((img, index) => (
            <div
              key={index}
              className="flex items-center gap-4 mb-4 border p-3 rounded-xl"
            >
              {/* Preview */}
              <div className="relative w-20 h-20 border rounded-lg overflow-hidden">
                {img && (
                  <Image
                    src={img}
                    alt="product"
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* URL Input */}
              <input
                type="text"
                value={img}
                onChange={(e) => updateImage(index, e.target.value)}
                placeholder="Enter Image URL"
                className="flex-1 border px-3 py-2 rounded-lg"
              />

              {/* Remove */}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        {/* Specifications */}
        <div className="md:col-span-2 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Specifications</h2>
            <button
              type="button"
              onClick={addSpecification}
              className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm"
            >
              + Add Spec
            </button>
          </div>

          {formData.specifications?.map((spec, index) => (
            <div
              key={index}
              className="border p-4 rounded-xl mb-4 bg-gray-50 space-y-3"
            >
              {/* Key EN */}
              <input
                type="text"
                placeholder="Key (EN)"
                value={spec.key.en}
                onChange={(e) =>
                  handleSpecChange(index, "key", "en", e.target.value)
                }
                className="w-full border px-3 py-2 rounded-lg"
              />

              {/* Key BN */}
              <input
                type="text"
                placeholder="Key (BN)"
                value={spec.key.bn}
                onChange={(e) =>
                  handleSpecChange(index, "key", "bn", e.target.value)
                }
                className="w-full border px-3 py-2 rounded-lg"
              />

              {/* Value EN */}
              <input
                type="text"
                placeholder="Value (EN)"
                value={spec.value.en}
                onChange={(e) =>
                  handleSpecChange(index, "value", "en", e.target.value)
                }
                className="w-full border px-3 py-2 rounded-lg"
              />

              {/* Value BN */}
              <input
                type="text"
                placeholder="Value (BN)"
                value={spec.value.bn}
                onChange={(e) =>
                  handleSpecChange(index, "value", "bn", e.target.value)
                }
                className="w-full border px-3 py-2 rounded-lg"
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
        </div>
        {/* Submit */}
        <div className="md:col-span-2">
          <button className="bg-black text-white px-8 py-3 rounded-lg mt-4 hover:opacity-90 transition">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProducts;
