"use client";

import { useQuery } from "@tanstack/react-query";
export default function useAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get_all_users`,
      );

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
}
