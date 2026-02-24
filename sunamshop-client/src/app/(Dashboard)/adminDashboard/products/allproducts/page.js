import { getAllProducts } from "@/utils/productApi";
import Image from "next/image";
import Link from "next/link";

const AllProducts = async () => {
  const products = await getAllProducts();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">All Products</h1>

        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search product..."
            className="border px-4 py-2 rounded-lg text-sm w-full md:w-64"
          />

          <Link
            href="/admin/products/add"
            className="bg-black text-white px-4 py-2 rounded-lg text-sm"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <div className="relative w-12 h-12">
                    <Image
                      src={product.images?.[0]}
                      alt={product.name?.en}
                      fill
                      className="object-contain rounded"
                    />
                  </div>
                </td>

                <td className="p-3 font-medium">{product.name?.en}</td>

                <td className="p-3">{product.category}</td>

                <td className="p-3">৳ {product.price}</td>

                <td className="p-3">{product.stock}</td>

                <td className="p-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/adminDashboard/products/edit_products/${product?._id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>

                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
