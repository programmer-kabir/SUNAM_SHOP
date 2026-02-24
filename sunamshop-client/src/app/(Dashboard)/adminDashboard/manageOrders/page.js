import ManageOrders from "@/components/Dashboards/AdminDashboard/ManageOrders";
import { authOptions } from "@/lib/auth";
import { getAllProducts } from "@/utils/productApi";
import { getAllUsers } from "@/utils/usersApi";
import { getServerSession } from "next-auth";

const AdminManageOrders = async () => {
  const session = await getServerSession(authOptions);

  const products = await getAllProducts();
  const users = await getAllUsers(session.accessToken);
  return (
    <div>
      <ManageOrders products={products} users={users} />
    </div>
  );
};

export default AdminManageOrders;
