// lib/products.js (example location)

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

/* ===============================
   Get All Products
================================ */
export async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

/* ===============================
   Get Products By Category
================================ */
export async function getProductsByCategory(categoryName) {
  const res = await fetch(
    `${BASE_URL}/api/products?category=${encodeURIComponent(categoryName)}`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  return res.json();
}

/* ===============================
   Get Single Product By Slug
================================ */
export async function getProductBySlug(slug) {
  const res = await fetch(`${BASE_URL}/api/products/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export async function getAllCategory() {
  const res = await fetch(`${BASE_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  return res.json();
}
