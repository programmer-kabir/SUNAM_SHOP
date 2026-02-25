import BestSellingCard from "../Cards/BestSellingCard";
import HomeProductCard from "../Cards/DHomeProductCard";
import SectionHeader from "../SectionHeader";
import { getMonthlySales } from "@/utils/MonthlySales";

const BestSelling = async () => {
  const bestSellingProducts = await getMonthlySales();
  console.log(bestSellingProducts);
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
            {bestSellingProducts?.map((product) => (
              <BestSellingCard key={product?.productId} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSelling;
