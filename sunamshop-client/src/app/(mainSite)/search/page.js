import { getAllProducts } from "@/utils/productApi";

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params.query?.toLowerCase() || "";

  const products = await getAllProducts();

  const filteredProducts = products.filter(
    (product) =>
      product.name.en.toLowerCase().includes(query) ||
      product.name.bn.toLowerCase().includes(query),
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <div key={p._id} className="border p-4 rounded">
             <p className="en"> {p.name.en}</p>
             <p className="bn"> {p.name.bn}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
