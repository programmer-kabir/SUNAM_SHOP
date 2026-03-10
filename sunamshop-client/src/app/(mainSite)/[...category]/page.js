import HomeProductsCard from "@/components/Cards/HomeProductCard";
import ProductCard from "@/components/Cards/ProductCard";
import Breadcrumb from "@/components/ui/breadcrumb";
import {
  getAllChildCategory,
  getAllProductss,
  getAllSubCategory,
  getAllSubSubCategory,
} from "@/utils/Category";
import Image from "next/image";
import Link from "next/link";

const CategoryPage = async ({ params }) => {
  const { category } = await params;
  const subCategory = await getAllSubCategory();
  const subSubCategory = await getAllSubSubCategory();
  const childCategory = await getAllChildCategory();
  const productsData = await getAllProductss();

  const slug = category || [];

  const subSlug = slug[0];
  const subSubSlug = slug[1];
  const childSlug = slug[2];

  let showCategories = [];
  let products = [];

  if (slug.length === 1) {
    const sub = subCategory.find((s) => s.slug === subSlug);

    if (sub) {
      showCategories = subSubCategory.filter(
        (s) => s.parentId === sub.subCategoryId,
      );

      if (showCategories.length === 0) {
        products = productsData.filter(
          (p) => p.category.subCategoryId === sub.subCategoryId,
        );
      }
    }
  }

  // 🔹 SUB SUB CATEGORY LEVEL (/food/cooking)
  if (slug.length === 2) {
    const subsub = subSubCategory.find((s) => s.slug === subSubSlug);

    if (subsub) {
      showCategories = childCategory.filter(
        (c) => c.parentId === subsub.subSubCategoryId,
      );

      if (showCategories.length === 0) {
        products = productsData.filter(
          (p) => p.category.subSubCategoryId === subsub.subSubCategoryId,
        );
      }
    }
  }

  // 🔹 CHILD CATEGORY LEVEL (/food/cooking/rice)
  if (slug.length === 3) {
    const child = childCategory.find((c) => c.slug === childSlug);

    if (child) {
      products = productsData.filter(
        (p) => p.category.childCategoryId === child.childCategoryId,
      );
    }
  }

  return (
    <div className="mx-auto lg:p-5">
      {showCategories && (
        <Breadcrumb
          items={[
            {
              label: subSlug ? subSlug : "All Category",
              href: `/products${subSlug ? `/${subSlug}` : ""}`,
            },
          ]}
        />
      )}
      {showCategories.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
          {showCategories.map((cat) => (
            <Link href={`${subSlug}/${cat?.slug}`} key={cat.slug} className="text-center border border-gray-50 p-1 rounded-md ">
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${cat?.image}`}
                height={200}
                width={200}
                alt={cat.slug}
              />
              <p className="en">{cat?.name?.en}</p>
              <p className="bn">{cat?.name?.bn}</p>
            </Link>
          ))}
        </div>
      )}

      {/* PRODUCT LIST */}
      {products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 mt-6">
          {products.map((product) => (
            <HomeProductsCard product={product} key={product?._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
