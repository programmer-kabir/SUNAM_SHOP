import HomeProductCard from "../Cards/ProductCard";
import HomeProductsCard from "../Cards/HomeProductCard";
import SectionHeader from "../SectionHeader";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import Link from "next/link";

const BestSelling = ({ reviews, products }) => {
  const topProducts = [...(products || [])]
    .sort((a, b) => (b?.sold || 0) - (a?.sold || 0))
    .slice(0, 14);
  return (
    <div>
      <section className="py-12 max-w-[1600px]  px-4 w-full mx-auto">
        <div className="">
          <div className="md:hidden">
            <SectionHeader
              subtitle="This Month"
              title="Best Selling Products"
            />
          </div>
          <div className="hidden md:inline">
            <SectionHeader
              subtitle="This Month"
              title="Best Selling Products"
              hasButton
              link={"/"}
            />
          </div>
          {/* Grid wrapper */}
          <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-7 gap-6 items-stretch">
            {" "}
            {topProducts?.map((product) => (
              <HomeProductsCard
                key={product?._id}
                product={product}
                reviews={reviews}
              />
            ))}
          </div>
          <div className="flex items-center justify-center pt-5 md:hidden">
            <Link href={"/"} className="bg-red-500 text-white px-4 py-2 rounded">
            View All
          </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestSelling;
