import React from "react";
import SectionHeader from "../SectionHeader";
import ProductsCard from "../Cards/ProductsCard";

const Products = ({ products = [], categories = [], reviews = [] }) => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container-custom space-y-16">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.categoryId === category.id,
          );

          // যদি কোনো product না থাকে তাহলে section দেখাবো না
          if (categoryProducts.length === 0) return null;

          return (
            <section key={category._id}>
              {/* Section Header */}
              <SectionHeader
                subtitle="Our Products"
                title={category?.name?.en}
                hasButton
                link={`products?category=${category?.slug}`}
              />

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
                {categoryProducts.map((product) => (
                  <ProductsCard
                    key={product._id}
                    product={product}
                    reviews={reviews}
                    category={category}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
