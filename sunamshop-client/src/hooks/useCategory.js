"use client";
import { useQuery } from "@tanstack/react-query";
export default function useCategory() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
      );

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
}
