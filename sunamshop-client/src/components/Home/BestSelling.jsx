"use client";
import BestSellingCard from "../Cards/BestSellingCard";
import HomeProductCard from "../Cards/ProductCard";
import HomeProductsCard from "../Cards/HomeProductCard";
import SectionHeader from "../SectionHeader";
import { getMonthlySales } from "@/utils/MonthlySales";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";

const BestSelling = ({ reviews, bestSellingProducts,products }) => {
  const { language, setLanguage } = useThemeLanguage();
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
          <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-6 items-stretch">
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
