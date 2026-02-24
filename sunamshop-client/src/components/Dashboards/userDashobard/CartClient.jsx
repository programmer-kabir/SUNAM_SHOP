"use client";
import DeliveryInfo from "@/components/products/DeliveryInfo";
import useCart from "@/hooks/useCart";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CartTabs from "./CartTabs";

const CartClient = ({ products }) => {
  const { data: cart } = useCart();

  const cartItems = cart?.map((item) => {
    const product = products?.find((p) => p._id === item.productId);

    return {
      _id: item.productId,
      image: product?.images?.[0],
      name: product?.name?.en,
      price: product?.price || 0,
      quantity: item.qty,
      size: item.size,
      color: item.color,
      subtotal: (product?.price || 0) * item.qty,
    };
  });

  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.subtotal, 0) || 0;
  const total = subtotal ;

  

  return (
    <div className="mx-auto px-6">
     <CartTabs />

    </div>
  );
};

export default CartClient;
