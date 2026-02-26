import { getAllCategory, getAllProducts } from "@/utils/productApi";
import Image from "next/image";
import ProductFilters from "@/components/products/ProductFilters";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getAllReviews } from "@/utils/reviewApi";
import ProductCard from "@/components/Cards/ProductCard";

const Products = async ({ searchParams }) => {
  /* ---------------- GET PARAMS ---------------- */
  const params = await searchParams;
  const search = params?.search;
  const categorySlug = params?.category;
  const rating = params?.rating;
  const price = params?.price;
  const color = params?.color;
  const weight = params?.weight;
  const reviews = await getAllReviews();
  /* ---------------- FETCH DATA ---------------- */
  const products = await getAllProducts();
  const categories = await getAllCategory();

  const uniqueCategories = categories?.map((c) => ({
    name: c.name.en,
    slug: c.slug,
  }));
  /* ---------------- FIND SELECTED CATEGORY ID ---------------- */
  let selectedCategoryCustomId = null;

  if (categorySlug) {
    const matchedCategory = categories.find(
      (c) => c.slug?.toLowerCase() === categorySlug.toLowerCase(),
    );

    selectedCategoryCustomId = matchedCategory?.id; // 🔥 use id, not _id
  }

  /* ---------------- FILTER LOGIC ---------------- */
  let filteredProducts = [...products];

  if (search) {
    filteredProducts = filteredProducts.filter((p) => {
      const nameEN = p.name?.en?.toLowerCase() || "";
      const nameBN = p.name?.bn?.toLowerCase() || "";

      // 🔥 Find category name from categoryId
      const categoryObj = categories.find((c) => c.id === p.categoryId);

      const categoryNameEN = categoryObj?.name?.en?.toLowerCase() || "";
      const categoryNameBN = categoryObj?.name?.bn?.toLowerCase() || "";

      const searchValue = search.toLowerCase();

      return (
        nameEN.includes(searchValue) ||
        nameBN.includes(searchValue) ||
        categoryNameEN.includes(searchValue) ||
        categoryNameBN.includes(searchValue)
      );
    });
  }
  if (selectedCategoryCustomId) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === selectedCategoryCustomId,
    );
  }

  // ✅ RATING
  if (rating) {
    filteredProducts = filteredProducts.filter(
      (p) => Math.floor(p.rating || 0) >= Number(rating),
    );
  }

  // ✅ PRICE
  if (price) {
    const [min, max] = price.split("-").map(Number);

    filteredProducts = filteredProducts.filter((p) => {
      const productPrice = Number(p.price) || 0;
      return productPrice >= min && productPrice <= max;
    });
  }

  // ✅ COLOR
  if (color) {
    filteredProducts = filteredProducts.filter(
      (p) => p.color?.toLowerCase() === color.toLowerCase(),
    );
  }

  // ✅ WEIGHT
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
              label: categorySlug ? categorySlug : "All Category",
              href: `/products${categorySlug ? `?category=${categorySlug}` : ""}`,
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
                <ProductCard
                  key={product._id}
                  product={product}
                  reviews={reviews}
                />
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
