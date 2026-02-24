export async function fetchProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}
export async function fetchDivisions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/divisions`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch divisions");

  return res.json();
}
export async function fetchDistricts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/districts`,
    {
      cache: "no-store",
    },
  );
  if (!res.ok) throw new Error("Failed to fetch districts");

  return res.json();
}
export async function fetchUpazilas() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upazilas`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error("Failed to fetch upazilas");

  return res.json();
}
