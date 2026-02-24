import React from "react";
import SectionHeader from "../SectionHeader";
import HomeProductCard from "../Cards/HomeProductCard";

const BestSelling = ({ products }) => {
  const bestSellingProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);


  return (
    <div>
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <SectionHeader
            subtitle="This Month"
            title="Best Selling Products"
            hasButton
            link={"/"}
          />

          {/* Grid wrapper */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {bestSellingProducts.map((product) => (
              <HomeProductCard
                key={product._id || product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSelling;
