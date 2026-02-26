import BestSellingCard from "../Cards/BestSellingCard";
import HomeProductCard from "../Cards/ProductCard";
import HomeProductsCard from "../Cards/HomeProductCard";
import SectionHeader from "../SectionHeader";
import { getMonthlySales } from "@/utils/MonthlySales";

const BestSelling = async ({ reviews }) => {
  const bestSellingProducts = await getMonthlySales();
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {" "}
            {bestSellingProducts?.map((product) => (
              <HomeProductsCard
                key={product?.productId}
                product={product}
                reviews={reviews}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSelling;
