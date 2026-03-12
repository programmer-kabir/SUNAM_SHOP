import AddCategoryFrom from "@/components/Dashboards/AdminDashboard/AddCategoryFrom";
import { authOptions } from "@/lib/auth";
import {
  getAllChildCategory,
  getAllMainCategory,
  getAllSubCategory,
  getAllSubSubCategory,
} from "@/utils/Category";
import { getAllCategory } from "@/utils/productApi";
import { getServerSession } from "next-auth";

const AddCategoryPage = async () => {
  const session = await getServerSession(authOptions);
  const category = await getAllMainCategory();
  const subCategory = await getAllSubCategory();
  const subSubCategory = await getAllSubSubCategory();
  const childCategory = await getAllChildCategory();
  return (
    <AddCategoryFrom
      token={session?.accessToken}
      category={category}
      subCategory={subCategory}
      subSubCategory={subSubCategory}
      childCategory={childCategory}
    />
  );
};

export default AddCategoryPage;
