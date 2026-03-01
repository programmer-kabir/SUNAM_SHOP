import React from "react";

const OrderOverview = ({
  totalOrders = 0,
  delivered = 0,
  pending = 0,
  cancelled = 0,
  shipped = 0,
  rejected = 0,
  processing = 0,
}) => {
  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      color: "text-gray-800",
      bg: "bg-gray-50",
    },
    {
      label: "Delivered",
      value: delivered,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Pending",
      value: pending,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Processing",
      value: processing,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Cancelled",
      value: cancelled,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Shipped",
      value: shipped,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Rejected",
      value: rejected,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Order Overview
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {stats.map((item, index) => (
          <div key={index} className={`${item.bg} p-4 rounded-lg text-center`}>
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className={`text-xl font-bold mt-1 ${item.color}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderOverview;
