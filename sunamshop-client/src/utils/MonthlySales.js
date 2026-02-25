export async function getMonthlySales() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get_monthly_sales`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Orders");
  }

  return res.json();
}
