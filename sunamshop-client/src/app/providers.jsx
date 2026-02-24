"use client";
import { SessionProvider } from "next-auth/react";
import QueryProvider from "./query-provider";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "@/context/WishlistContext";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <WishlistProvider>
        <QueryProvider>
          {children} <Toaster position="top-center" />
        </QueryProvider>
      </WishlistProvider>
    </SessionProvider>
  );
}
