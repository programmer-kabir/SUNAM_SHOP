import DashboardStatCard from "@/components/Dashboards/AdminDashboard/Overview/DashboardStatCard";
import { authOptions } from "@/lib/auth";
import { getAllOrders } from "@/utils/ordersApis";
import { getServerSession } from "next-auth";
import React from "react";

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);
  const orders = await getAllOrders(session?.accessToken);

  // ===== TOTAL ORDERS =====
  const totalOrders = orders?.length || 0;

  // ===== TOTAL SALES (Only Delivered) =====
  const totalSales =
    orders
      ?.filter((order) => order.status === "delivered")
      .reduce((sum, order) => sum + Number(order.total), 0) || 0;
  const totalSale =
    orders?.filter((order) => order.status === "delivered").length || 0;

  // ===== TOTAL PENDING =====
  const totalPending =
    orders?.filter((order) => order.status === "pending").length || 0;

  // ===== TOTAL REJECTED =====
  const totalRejected =
    orders?.filter((order) => order.status === "rejected").length || 0;

  // ===== TOTAL CANCELLED =====
  const totalCancelled =
    orders?.filter((order) => order.status === "cancelled").length || 0;

  return (
    <div className="grid md:grid-cols-6 gap-6">
      <DashboardStatCard
        title="Total Sales"
        value={`৳ ${totalSales.toLocaleString()}`}
        color="green"
      />

      <DashboardStatCard title="Total Orders" value={totalSale} color="blue" />
      <DashboardStatCard
        title="Total Orders"
        value={totalOrders}
        color="blue"
      />

      <DashboardStatCard
        title="Total Pending"
        value={totalPending}
        color="yellow"
      />

      <DashboardStatCard
        title="Total Rejected"
        value={totalRejected}
        color="red"
      />

      <DashboardStatCard
        title="Total Cancelled"
        value={totalCancelled}
        color="gray"
      />
    </div>
  );
};

export default AdminDashboard;
