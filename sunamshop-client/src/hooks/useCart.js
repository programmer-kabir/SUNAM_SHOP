"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useCart() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["cart", session?.user?.email],
    enabled: !!session,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (!res.ok) throw new Error("Failed");

      return res.json();
    },
  });
}
