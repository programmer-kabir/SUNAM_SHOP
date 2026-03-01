import React from "react";

const SpendingInsights = ({ orders = [] }) => {
  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const lastMonthDate = new Date(currentYear, currentMonth - 1);
  const lastMonth = lastMonthDate.getMonth();
  const lastMonthYear = lastMonthDate.getFullYear();

  // Current Month Spend
  const currentMonthSpend = orders
    .filter((order) => {
      const date = new Date(order.createdAt);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear &&
        order.status === "delivered"
      );
    })
    .reduce((sum, order) => sum + Number(order.total), 0);

  // Last Month Spend
  const lastMonthSpend = orders
    .filter((order) => {
      const date = new Date(order.createdAt);
      return (
        date.getMonth() === lastMonth &&
        date.getFullYear() === lastMonthYear &&
        order.status === "delivered"
      );
    })
    .reduce((sum, order) => sum + Number(order.total), 0);

  // Total Spend (Delivered only)
  const totalSpend = orders
    .filter((order) => order.status === "delivered")
    .reduce((sum, order) => sum + Number(order.total), 0);

  const totalOrders = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const averageOrderValue =
    totalOrders > 0 ? Math.round(totalSpend / totalOrders) : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Spending Insights
      </h3>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            ৳ {currentMonthSpend.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Last Month</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            ৳ {lastMonthSpend.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Average Order</p>
          <p className="text-xl font-bold text-gray-800 mt-1">
            ৳ {averageOrderValue.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">Total Spend</p>
          <p className="text-xl font-bold text-indigo-600 mt-1">
            ৳ {totalSpend.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpendingInsights;