import Image from "next/image";
import Link from "next/link";
import { getAllFalseSales } from "@/utils/FlashSalesApi";

const FlashSalePage = async () => {
  const data = await getAllFalseSales();

  const campaign = data?.campaign;
  const products = data?.products || [];

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10">
      <div className="container-custom">
        {/* ================= Campaign Header ================= */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            🔥 {campaign?.title}
          </h1>

          <p className="text-gray-500 mt-2">
            Offer valid till {new Date(campaign?.endDate).toLocaleString()}
          </p>
        </div>

        {/* ================= Product Grid ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const original = Number(product.price);
            const flash = Number(product.flashPrice);

            const discountPercent = Math.round(
              ((original - flash) / original) * 100,
            );

            return (
              <div
                key={product._id}
                className="bg-white dark:bg-gray-950 rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
              >
                {/* Image */}
                <div className="relative w-full h-52">
                  <Image
                    src={product.images?.[0]}
                    alt={product.name?.en}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* Discount Badge */}
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{discountPercent}%
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2">
                    {product.name?.en}
                  </h3>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-red-500 font-bold">৳ {flash}</span>
                    <span className="text-gray-400 line-through text-sm">
                      ৳ {original}
                    </span>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="block mt-4 bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded-lg text-sm transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            No Flash Sale Products Available 😢
          </div>
        )}
      </div>
    </section>
  );
};

export default FlashSalePage;
