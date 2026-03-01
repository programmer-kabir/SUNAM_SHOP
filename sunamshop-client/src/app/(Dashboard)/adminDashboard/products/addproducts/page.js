import AddProductForm from "@/components/Dashboards/AdminDashboard/AddProductForm";
import { authOptions } from "@/lib/auth";
import { getAllCategory } from "@/utils/productApi";
import { getServerSession } from "next-auth";
import React from "react";

const AddProducts = async () => {
  const session = await getServerSession(authOptions);
  const category = await  getAllCategory()
  return (
    <div>
      <AddProductForm session={session} category={category}/>
    </div>
  );
};

export default AddProducts;
