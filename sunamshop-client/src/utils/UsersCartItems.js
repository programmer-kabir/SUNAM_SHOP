export const UsersCartItems = async (token) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/cart_summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};
