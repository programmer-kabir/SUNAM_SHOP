import AddProductForm from "@/components/Dashboards/AdminDashboard/AddProductForm";
import { authOptions } from "@/lib/auth";
import {
  getAllChildCategory,
  getAllMainCategory,
  getAllSubCategory,
  getAllSubSubCategory,
} from "@/utils/Category";
import { getServerSession } from "next-auth";
import React from "react";

const AddProducts = async () => {
  const session = await getServerSession(authOptions);
  const category = await getAllMainCategory();
  const subCategory = await getAllSubCategory();
  const subSubCategory = await getAllSubSubCategory();
  const childCategory = await getAllChildCategory();
  return (
    <div>
      <AddProductForm
        session={session}
        category={category}
        subCategory={subCategory}
        subSubCategory={subSubCategory}
        childCategory={childCategory}
      />
    </div>
  );
};

export default AddProducts;
