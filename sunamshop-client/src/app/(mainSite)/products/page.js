import { getAllProducts } from "@/utils/productApi";
import Image from "next/image";
import Link from "next/link";
import ProductFilters from "@/components/products/ProductFilters";
import Breadcrumb from "@/components/ui/breadcrumb";
import ProductCard from "@/components/products/ProductsCard";

const Products = async ({ searchParams }) => {
  /* ---------------- GET PARAMS ---------------- */
  const params = await searchParams;
  const search = params?.search;
  const category = params?.category;
  const rating = params?.rating;
  const price = params?.price;
  const color = params?.color;
  const weight = params?.weight;
  /* ---------------- FETCH PRODUCTS ---------------- */
  /* ---------------- FETCH PRODUCTS ---------------- */
  const products = await getAllProducts();

  /* ---------------- UNIQUE CATEGORIES ---------------- */
  const uniqueCategories = [...new Set(products.map((p) => p.category))];

  /* ---------------- FILTER LOGIC ---------------- */
  let filteredProducts = [...products];

  // ✅ SEARCH (প্রথমে থাকবে)
  if (search) {
    filteredProducts = filteredProducts.filter((p) => {
      const nameEN = p.name?.en?.toLowerCase() || "";
      const nameBN = p.name?.bn?.toLowerCase() || "";
      const categoryName = p.category?.toLowerCase() || "";

      const searchValue = search.toLowerCase();

      return (
        nameEN.includes(searchValue) ||
        nameBN.includes(searchValue) ||
        categoryName.includes(searchValue)
      );
    });
  }
  // Category
  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    );
  }

  // Rating
  if (rating) {
    filteredProducts = filteredProducts.filter(
      (p) => Math.floor(p.rating || 0) >= Number(rating),
    );
  }

  // Price
  if (price) {
    const [min, max] = price.split("-").map(Number);

    filteredProducts = filteredProducts.filter((p) => {
      const productPrice = Number(p.price) || 0;
      return productPrice >= min && productPrice <= max;
    });
  }

  // Color
  if (color) {
    filteredProducts = filteredProducts.filter(
      (p) => p.color?.toLowerCase() === color.toLowerCase(),
    );
  }

  // Weight
  if (weight) {
    filteredProducts = filteredProducts.filter((p) => {
      const w = p.weight || 0;

      if (weight === "under-1kg") return w < 1;
      if (weight === "1-5kg") return w >= 1 && w <= 5;
      if (weight === "5-10kg") return w >= 5 && w <= 10;
      if (weight === "over-20kg") return w > 20;

      return true;
    });
  }
  return (
    <div className="container-custom py-8 md:py-12">
      {/* HEADER */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
        <Breadcrumb
          items={[
            {
              label: category ? category : "All Category",
              href: `/products${category ? `?category=${category}` : ""}`,
            },
          ]}
        />
        <p className="text-sm text-gray-500 mt-2">
          Showing {filteredProducts.length} products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-1/4">
          <ProductFilters categories={uniqueCategories} />
        </aside>

        {/* PRODUCTS */}
        <main className="w-full lg:w-3/4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              No products found
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
