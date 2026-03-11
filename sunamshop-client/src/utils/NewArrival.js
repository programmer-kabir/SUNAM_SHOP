export async function getAllNewArrivalData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/new_arrival`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch flash-sales");
  }

  return res.json();
}
