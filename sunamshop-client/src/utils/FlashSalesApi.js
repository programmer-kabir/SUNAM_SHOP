export async function getAllFalseSales() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flash-sales`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch flash-sales");
  }

  return res.json();
}
