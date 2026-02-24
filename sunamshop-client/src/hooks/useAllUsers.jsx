"use client";

import { useQuery } from "@tanstack/react-query";
export default function useAllUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/get_all_users");

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
}
