export async function getAllUsers(accessToken) {
  const res = await fetch("http://localhost:5000/api/users", {
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
