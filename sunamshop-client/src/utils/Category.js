export async function getAllMainCategory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json(); // শুধু এটা
}
export async function getAllSubCategory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub_categories`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch sub_categories");
  }

  return res.json();
}
export async function getAllSubSubCategory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sub_sub_categories`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch sub_sub_categories");
  }

  return res.json();
}
export async function getAllChildCategory() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/child_categories`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch child_categories");
  }

  return res.json();
}
export async function getAllProductss() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}