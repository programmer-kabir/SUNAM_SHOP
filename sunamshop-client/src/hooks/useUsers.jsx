"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useUsers() {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["users"],
    enabled: !!session?.accessToken,
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
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
