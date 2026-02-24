"use client";

import { useQuery } from "@tanstack/react-query";
export default function useFlashSale() {
  return useQuery({
    queryKey: ["flashSales"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/flash-sales");
        console.log(res)
      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
}
