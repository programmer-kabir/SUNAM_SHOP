import CheckOutClient from "@/components/Dashboards/userDashobard/CheckOutClient";
import Breadcrumb from "@/components/ui/breadcrumb";
import { fetchDistricts, fetchDivisions, fetchUpazilas } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getAllProducts } from "@/utils/productApi";
import { getServerSession } from "next-auth";
import React from "react";

const CheckOut = async () => {
  const session = await getServerSession(authOptions);
  const divisions = await fetchDivisions();
  const districts = await fetchDistricts();
  const upazilas = await fetchUpazilas();
  const token = session?.accessToken;
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
          {
            label: "CheckOut",
            href: `/userDashboard/cart/CheckOut`,
          },
        ]}
      />
      <CheckOutClient
        user={session?.user}
        token={token}
        divisions={divisions}
        districts={districts}
        upazilas={upazilas}
        products={products}
      />
    </div>
  );
};

export default CheckOut;
