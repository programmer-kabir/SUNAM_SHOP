import CompleteCart from "@/components/Dashboards/userDashobard/CartTabs/CompleteCart";
import Breadcrumb from "@/components/ui/breadcrumb";
import { getAllOrders } from "@/utils/usersApi";
import { getAllProducts } from "@/utils/productApi";
import React from "react";

const CompleteCartPage = async () => {
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
            label: "My Complete Cart",
            href: `/userDashboard/complete_cart`,
          },
        ]}
      />
      <CompleteCart products={products}/>
    </div>
  );
};

export default CompleteCartPage;
