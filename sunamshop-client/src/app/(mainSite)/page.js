import Banner from "@/components/Home/Banner";
import BestSelling from "@/components/Home/BestSelling";
import BrowseByCategory from "@/components/Home/BrowseByCategory";
import FlashSale from "@/components/Home/FlashSale";
import NewArrival from "@/components/Home/NewArrival";
import Products from "@/components/Home/Products";
import ServiceFeatures from "@/components/Home/ServiceFeatures";
import { getAllFalseSales } from "@/utils/FlashSalesApi";
import { getAllCategory, getAllProducts } from "@/utils/productApi";

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategory();
  const flash = await getAllFalseSales();
  return (
    <section>
      <Banner />
      {flash?.campaign && <FlashSale products={products} flash={flash} />}
      <BrowseByCategory products={products} categories={categories} />
      {/* <BestSelling  products={products}/> */}
      {/* <Products products={products} /> */}
      {/* <NewArrival /> */}
      {/* <ServiceFeatures /> */}
    </section>
  );
}
