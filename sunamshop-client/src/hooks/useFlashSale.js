"use client";

import { useQuery } from "@tanstack/react-query";
export default function useFlashSale() {
  return useQuery({
    queryKey: ["flashSales"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/flash-sales`,
      );
      console.log(res);
      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
}
