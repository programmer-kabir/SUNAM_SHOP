import CategoryWiseSales from "@/components/Dashboards/AdminDashboard/Overview/CategoryWiseSales";
import DashboardStatCard from "@/components/Dashboards/AdminDashboard/Overview/DashboardStatCard";
import LowStockAlert from "@/components/Dashboards/AdminDashboard/Overview/LowStockAlert";
import PaymentAnalytics from "@/components/Dashboards/AdminDashboard/Overview/PaymentAnalytics";
import SalesAnalytics from "@/components/Dashboards/AdminDashboard/Overview/SalesAnalytics";
import SellsHistory from "@/components/Dashboards/AdminDashboard/Overview/SellsHistory";
import TopSellingProduct from "@/components/Dashboards/AdminDashboard/Overview/TopSellingProduct";
import { authOptions } from "@/lib/auth";
import { getAllOrders } from "@/utils/ordersApis";
import { getAllCategory, getAllProducts } from "@/utils/productApi";
import { getServerSession } from "next-auth";
import React from "react";

const AdminDashboard = async () => {
  const session = await getServerSession(authOptions);
  const orders = await getAllOrders(session?.accessToken);
  const products = await getAllProducts();
    const categories = await getAllCategory();
  
  return (
    <div className="space-y-6">
      <SellsHistory orders={orders} />
      <TopSellingProduct products={products} />
      <LowStockAlert products={products} />
      <PaymentAnalytics orders={orders} />
      <CategoryWiseSales orders={orders} products={products} categories={categories}/>
    </div>
  );
};

export default AdminDashboard;
