"use client";
import React, { useMemo } from "react";
import useManageOrders from "@/hooks/useManageOrders";

const CustomerAnalytics = () => {
  const { data: orders = [] } = useManageOrders();

  // Unique Customers
  const totalCustomers = useMemo(() => {
    const emails = new Set(orders.map((o) => o.userEmail));
    return emails.size;
  }, [orders]);

  // New Customers (Last 7 Days)
  const newCustomers = useMemo(() => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentEmails = new Set(
      orders
        .filter((o) => new Date(o.createdAt) >= sevenDaysAgo)
        .map((o) => o.userEmail),
    );

    return recentEmails.size;
  }, [orders]);

  // Total Orders
  const totalOrders = orders.length;

  // Repeat Customers
  const repeatCustomers = useMemo(() => {
    const count = {};
    orders.forEach((o) => {
      count[o.userEmail] = (count[o.userEmail] || 0) + 1;
    });

    return Object.values(count).filter((c) => c > 1).length;
  }, [orders]);

  return (
    <div className="grid md:grid-cols-4 gap-6 p-6">
      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-gray-500 text-sm">Total Customers</h2>
        <p className="text-2xl font-bold">{totalCustomers}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-gray-500 text-sm">New Customers (7 Days)</h2>
        <p className="text-2xl font-bold">{newCustomers}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-gray-500 text-sm">Total Orders</h2>
        <p className="text-2xl font-bold">{totalOrders}</p>
      </div>

      <div className="bg-white shadow rounded-xl p-5">
        <h2 className="text-gray-500 text-sm">Repeat Customers</h2>
        <p className="text-2xl font-bold">{repeatCustomers}</p>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
