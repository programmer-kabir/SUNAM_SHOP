import Banner from "@/components/Home/Banner";
import BestSelling from "@/components/Home/BestSelling";
import BrowseByCategory from "@/components/Home/BrowseByCategory";
import FlashSale from "@/components/Home/FlashSale";
import NewArrival from "@/components/Home/NewArrival";
import Products from "@/components/Home/Products";
import ServiceFeatures from "@/components/Home/ServiceFeatures";
import { getAllProducts } from "@/utils/productApi";

export default async function Home() {
  const products = await getAllProducts();
  return (
    <section>
      <Banner />
      <FlashSale products={products} />
      <BrowseByCategory products={products} />
      <BestSelling products={products} />
      <Products products={products} />
      <NewArrival />
      <ServiceFeatures />
    </section>
  );
}
