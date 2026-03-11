import Banner from "@/components/Home/Banner";
import FlashSale from "@/components/Home/FlashSale";
import PopularCategories from "@/components/Home/PopularCategories";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import { getAllSubSubCategory } from "@/utils/Category";
import { getAllProducts } from "@/utils/productApi";
import CTASection from "@/components/Home/CTA";
import FAQSection from "@/components/Home/FAQSection";
import { getAllFalseSales } from "@/utils/FlashSalesApi";
import { getAllNewArrivalData } from "@/utils/NewArrival";
import NewArrival from "@/components/Home/NewArrival";
import BestSelling from "@/components/Home/BestSelling";

export default async function Home() {
  const [products, subSubCategory, FlashSales, newArrivalData] =
    await Promise.all([
      getAllProducts(),
      getAllSubSubCategory(),
      getAllFalseSales(),
      getAllNewArrivalData(),
    ]);

  return (
    <section>
      <Banner />
      <WhyChooseUs products={products} />

      {FlashSales?.products?.length > 0 && (
        <FlashSale FlashSales={FlashSales} />
      )}

      <NewArrival newArrivalData={newArrivalData} />

      <PopularCategories subSubCategories={subSubCategory} />

      <BestSelling products={products} />

      <CTASection />
      <FAQSection />
    </section>
  );
}
