import AddCategoryFrom from "@/components/Dashboards/AdminDashboard/AddCategoryFrom";
import { authOptions } from "@/lib/auth";
import { getAllCategory } from "@/utils/productApi";
import { getServerSession } from "next-auth";

const AddCategoryPage = async () => {
  const session = await getServerSession(authOptions);
  const category = await getAllCategory();
  return <AddCategoryFrom token={session?.accessToken} category={category}/>;
};

export default AddCategoryPage;
