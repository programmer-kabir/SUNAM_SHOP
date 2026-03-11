export async function fetchProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}
export async function fetchDivisions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/divisions`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch divisions");

  return res.json();
}
export async function fetchDistricts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/districts`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch districts");

  return res.json();
}
export async function fetchUpazilas() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/upazilas`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch upazilas");

  return res.json();
}

// Get All Orders to Sells
