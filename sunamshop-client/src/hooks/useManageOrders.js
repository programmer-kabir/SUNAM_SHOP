"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useManageOrders() {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ["manageOrders"],
    enabled: status === "authenticated" && session?.user?.role === "admin",

    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manage_orders`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (!res.ok) {
        throw new Error("Not authorized");
      }

      return res.json();
    },
  });
}
