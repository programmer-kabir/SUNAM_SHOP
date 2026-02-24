import React from "react";
import HomeProductCard from "../Cards/HomeProductCard";
import SectionHeader from "../SectionHeader";

const Products = ({ products }) => {
  return (
    <div>
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <SectionHeader subtitle="Our Products" title="Explore Our Products" />

          {/* Grid wrapper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 justify-center items-center">
            {products.slice(0, 8).map((product) => (
              <HomeProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-red-500 text-white px-8 py-3 rounded-md hover:bg-red-600 transition font-medium">
              View All Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
