import Banner from "@/components/Home/Banner";
import BestSelling from "@/components/Home/BestSelling";
import BrowseByCategory from "@/components/Home/BrowseByCategory";
import FlashSale from "@/components/Home/FlashSale";
import NewArrival from "@/components/Home/NewArrival";
import Products from "@/components/Home/Products";
import ServiceFeatures from "@/components/Home/ServiceFeatures";
import { getAllFalseSales } from "@/utils/FlashSalesApi";
import { getMonthlySales } from "@/utils/MonthlySales";
import { getAllCategory, getAllProducts } from "@/utils/productApi";
import { getAllReviews } from "@/utils/reviewApi";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategory();
  const flash = await getAllFalseSales();
  const reviews = await getAllReviews();
  const bestSellingProducts = await getMonthlySales();

  return (
    <section>
      <Banner />
      {flash?.campaign && (
        <FlashSale products={products} flash={flash} reviews={reviews} />
      )}
      <div className="hidden lg:inline">
        <BrowseByCategory
          products={products}
          categories={categories}
          reviews={reviews}
        />
      </div>
      <BestSelling
        products={products}
        reviews={reviews}
        bestSellingProducts={bestSellingProducts}
      />
      <Products products={products} reviews={reviews} categories={categories} />
      <NewArrival />
      <ServiceFeatures />
    </section>
  );
}
