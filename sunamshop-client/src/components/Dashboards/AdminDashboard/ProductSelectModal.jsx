"use client";

import { useState } from "react";

export default function ProductSelectModal({
  products,
  selectedProducts,
  setSelectedProducts,
  onClose,
}) {
  const toggleProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 max-h-[80vh] rounded-xl shadow-xl p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Select Products</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Select</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => toggleProduct(product._id)}
                  />
                </td>
                <td className="p-2">{product.name?.en}</td>
                <td className="p-2">৳ {product.price}</td>
                <td className="p-2">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Cancel
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
