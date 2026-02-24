import AddProductForm from "@/components/Dashboards/AdminDashboard/AddProductForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const AddProducts = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <AddProductForm session={session} />
    </div>
  );
};

export default AddProducts;
