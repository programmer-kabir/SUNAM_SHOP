import { authOptions } from "@/lib/auth";
import { getAllOrders } from "@/utils/ordersApis";
import { getAllUsers } from "@/utils/usersApi";
import { getServerSession } from "next-auth";

const AllUsers = async () => {
  const session = await getServerSession(authOptions);
  const users = await getAllUsers(session?.accessToken);
  const orders = await getAllOrders();
  const spendingMap = {};

  orders?.forEach((order) => {
    if (order.status === "delivered") {
      spendingMap[order.userEmail] =
        (spendingMap[order.userEmail] || 0) + Number(order.total);
    }
  });

  const topBuyerEmail = Object.entries(spendingMap).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Total Spent</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Badge</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => {
              const userOrders = orders?.filter(
                (o) => o.userEmail === user.email,
              );

              const deliveredOrders = userOrders?.filter(
                (o) => o.status === "delivered",
              );

              const totalSpent =
                deliveredOrders?.reduce((sum, o) => sum + Number(o.total), 0) ||
                0;

              // 📈 Active Check (Last 30 days)
              const lastOrderDate = userOrders?.[0]?.createdAt;
              const isActive =
                lastOrderDate &&
                new Date(lastOrderDate) >
                  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

              // 👑 VIP (5+ orders)
              const isVIP = userOrders?.length >= 5;

              return (
                <tr key={user._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{user.firstName}</td>

                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.number || "-"}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {user.provider || "_"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {[
                      user?.division,
                      user?.district,
                      user?.upazila,
                      user?.villageName,
                    ]
                      .filter(Boolean)
                      .join(", ") || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {userOrders?.length || 0}
                  </td>

                  <td className="px-4 py-3 font-semibold">৳ {totalSpent}</td>

                  <td className="px-4 py-3">
                    {isActive ? (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-gray-400">Inactive</span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {user.email === topBuyerEmail && (
                      <span className="text-yellow-500">🥇 Top Buyer</span>
                    )}

                    {isVIP && (
                      <span className="ml-2 text-purple-600">👑 VIP</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
