export async function getAllUsers(accessToken) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export async function getCurrentUser(email, accessToken) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users?email=${email}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch current user");
  }

  return res.json();
}
