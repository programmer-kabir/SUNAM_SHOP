import React from "react";
import Link from "next/link";

const RecentOrdersTable = ({ orders = [] }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "processing":
        return "bg-blue-100 text-blue-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      case "refunded":
        return "bg-purple-100 text-purple-600";
      case "rejected":
        return "bg-rose-100 text-rose-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
console.log(orders)
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Orders
        </h3>

        <Link
          href="/userDashboard/orders"
          className="text-sm text-indigo-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-3">Order ID</th>
                <th className="py-3">Date</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr
                  key={order._id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="py-3 font-medium text-gray-800">
                    #{order.orderId}
                  </td>

                  <td className="py-3 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 text-gray-800 font-medium">
                    ৳ {Number(order.total).toLocaleString()}
                  </td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentOrdersTable;