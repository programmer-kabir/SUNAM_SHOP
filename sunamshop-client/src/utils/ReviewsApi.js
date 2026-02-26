export async function getAllReviews() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get_reviews`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch get_reviews");
  }

  return res.json();
}
