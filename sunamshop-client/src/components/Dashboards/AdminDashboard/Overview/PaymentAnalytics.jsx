"use client";
import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#16a34a", "#2563eb"];

const PaymentAnalytics = ({ orders = [] }) => {
  const paymentData = useMemo(() => {
    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered",
    );

    let codAmount = 0;
    let onlineAmount = 0;

    deliveredOrders.forEach((order) => {
      if (order.paymentMethod === "COD") {
        codAmount += Number(order.total);
      } else {
        onlineAmount += Number(order.total);
      }
    });

    return [
      { name: "Cash on Delivery", value: codAmount },
      { name: "Online Payment", value: onlineAmount },
    ];
  }, [orders]);

  const totalRevenue = paymentData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-6">💳 Payment Analytics</h3>

      {/* Top Summary */}
      <div className="mb-4 text-sm text-gray-600">
        Total Revenue:{" "}
        <span className="font-semibold text-green-600">
          ৳ {totalRevenue.toLocaleString()}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={paymentData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {paymentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentAnalytics;
