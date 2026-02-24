"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/utils/productApi";

export default function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
}
