import ProductGallery from "@/components/products/ProductGallery";
import ProductsDetails from "@/components/products/ProductsDetails";
import ProductTabs from "@/components/products/ProductTabs";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getProductBySlug } from "@/utils/productApi";
import { getReviewsById } from "@/utils/reviewApi";
import { notFound } from "next/navigation";

const ProductDetails = async ({ params }) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const productId = product?._id?.toString();
  const reviews = await getReviewsById(productId);
  if (!product) return notFound();

  const name = product.name?.en || product.name?.bn || "No Name";
  const category = product?.category;

  return (
    <div className="container-custom py-10">
      <Breadcrumb
        items={[
          {
            label: category ? category : "All Category",
            href: `/products${category ? `?category=${category}` : ""}`,
          },
          {
            label: name ? name : "Product Name",
            href: `/products${slug ? `?/products/${slug}` : ""}`,
          },
        ]}
      />
      <div className="lg:flex lg:gap-10">
        {/* Image */}
        <div className="lg:w-1/2">
          <ProductGallery images={product.images} />
        </div>

        <div>
          <ProductsDetails name={name} product={product} reviews={reviews} />
        </div>
      </div>
      <ProductTabs product={product} reviews={reviews} />
    </div>
  );
};

export default ProductDetails;
