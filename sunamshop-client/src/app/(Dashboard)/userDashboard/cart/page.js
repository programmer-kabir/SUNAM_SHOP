import IncompleteCart from "@/components/Dashboards/userDashobard/CartTabs/IncompleteCart";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getAllProducts } from "@/utils/productApi";
import React from "react";

const MyCart = async () => {
  const products = await getAllProducts();
  return (
    <div>
      <Breadcrumb
        items={[
          {
            label: "user Dashboard",
            href: `/userDashboard/dashboard`,
          },
          {
            label: "My Cart",
            href: `/userDashboard/cart`,
          },
        ]}
      />
      <div>
        <IncompleteCart products={products} />
      </div>
    </div>
  );
};

export default MyCart;
