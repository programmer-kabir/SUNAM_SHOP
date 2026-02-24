"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useOrder() {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["orders", session?.user?.email],
    enabled: !!session,
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
}
