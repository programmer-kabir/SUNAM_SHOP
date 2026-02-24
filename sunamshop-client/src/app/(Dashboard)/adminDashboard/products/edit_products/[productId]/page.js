import EditProducts from "@/components/Dashboards/AdminDashboard/EditProducts";

export default async function EditProduct({ params }) {
  const resolvedParams = await params;   // 👈 important
  const productId = resolvedParams.productId;

  console.log("ID:", productId);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-8">Edit Product</h1>
      <EditProducts productId={productId} />
    </div>
  );
}