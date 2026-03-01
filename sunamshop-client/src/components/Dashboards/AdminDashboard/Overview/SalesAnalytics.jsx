"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const SalesAnalytics = ({
  orders = [],
  viewType,
  selectedYear,
  selectedMonth,
}) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  const chartData = useMemo(() => {
    if (!orders || orders.length === 0) return [];

    // ===============================
    // MONTHLY & YEARLY VIEW
    // ===============================
    if ((viewType === "monthly" && selectedYear) || viewType === "yearly") {
      const year = Number(selectedYear);

      const monthsData = months.map((month) => ({
        month,
        revenue: 0,
        total: 0,
        delivered: 0,
        pending: 0,
        cancelled: 0,
        rejected: 0,
      }));

      orders.forEach((order) => {
        const date = new Date(order.createdAt);
        const orderYear = date.getFullYear();
        const orderMonth = date.getMonth();

        if (viewType === "monthly") {
          if (orderYear !== year) return;

          if (selectedMonth !== "" && selectedMonth !== undefined) {
            if (orderMonth !== Number(selectedMonth)) return;
          }
        }

        if (viewType === "yearly" && orderYear !== year) return;

        const monthData = monthsData[orderMonth];

        monthData.total += 1;

        if (order.status === "delivered") {
          monthData.delivered += 1;
          monthData.revenue += Number(order.total);
        }

        if (order.status === "pending") monthData.pending += 1;
        if (order.status === "cancelled") monthData.cancelled += 1;
        if (order.status === "rejected") monthData.rejected += 1;
      });

      if (
        viewType === "monthly" &&
        selectedMonth !== "" &&
        selectedMonth !== undefined
      ) {
        return [monthsData[Number(selectedMonth)]];
      }

      return monthsData;
    }

    // ===============================
    // DAILY VIEW
    // ===============================
    if (viewType === "daily") {
      const dailyMap = {};

      orders.forEach((order) => {
        const day = new Date(order.createdAt).toLocaleDateString();

        if (!dailyMap[day]) {
          dailyMap[day] = {
            day,
            revenue: 0,
            total: 0,
            delivered: 0,
            pending: 0,
            cancelled: 0,
            rejected: 0,
          };
        }

        const dayData = dailyMap[day];

        dayData.total += 1;

        if (order.status === "delivered") {
          dayData.delivered += 1;
          dayData.revenue += Number(order.total);
        }

        if (order.status === "pending") dayData.pending += 1;
        if (order.status === "cancelled") dayData.cancelled += 1;
        if (order.status === "rejected") dayData.rejected += 1;
      });

      return Object.values(dailyMap);
    }

    return [];
  }, [orders, viewType, selectedYear, selectedMonth]);

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {/* ================= Revenue Chart ================= */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Revenue Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={viewType === "daily" ? "day" : "month"} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#16a34a"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ================= Orders Overview ================= */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="font-semibold mb-4">Orders Overview</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={viewType === "daily" ? "day" : "month"} />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar dataKey="delivered" fill="#16a34a" />
            <Bar dataKey="pending" fill="#facc15" />
            <Bar dataKey="cancelled" fill="#6b7280" />
            <Bar dataKey="rejected" fill="#ef4444" />
            <Bar dataKey="total" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesAnalytics;