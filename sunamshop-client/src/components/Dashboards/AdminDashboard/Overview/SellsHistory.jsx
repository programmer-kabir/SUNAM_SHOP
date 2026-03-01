"use client";
import React, { useMemo, useState } from "react";
import DashboardStatCard from "./DashboardStatCard";
import SalesAnalytics from "./SalesAnalytics";

const SellsHistory = ({ orders }) => {
  const [viewType, setViewType] = useState("daily");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  // ===== CURRENT YEAR =====
  const currentYear = new Date().getFullYear();

  // ===== YEAR LIST (2025 → Current Year) =====
  const years = [];
  for (let y = 2025; y <= currentYear; y++) {
    years.push(y);
  }

  // ===== MONTH LIST =====
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // ===== FILTERED ORDERS =====
  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      if (viewType === "daily" && selectedDate) {
        const selected = new Date(selectedDate);
        return orderDate.toDateString() === selected.toDateString();
      }

      if (viewType === "monthly" && selectedYear) {
        // If specific month selected
        if (selectedMonth !== "") {
          return (
            orderDate.getMonth() === Number(selectedMonth) &&
            orderDate.getFullYear() === Number(selectedYear)
          );
        }

        // If All Months selected
        return orderDate.getFullYear() === Number(selectedYear);
      }
      if (viewType === "yearly" && selectedYear) {
        return orderDate.getFullYear() === Number(selectedYear);
      }

      return true;
    });
  }, [orders, viewType, selectedDate, selectedMonth, selectedYear]);

  // ===== CALCULATIONS =====
  const totalOrders = filteredOrders.length;

  const totalSales =
    filteredOrders
      .filter((order) => order.status === "delivered")
      .reduce((sum, order) => sum + Number(order.total), 0) || 0;

  const totalPending =
    filteredOrders.filter((order) => order.status === "pending").length || 0;

  const totalRejected =
    filteredOrders.filter((order) => order.status === "rejected").length || 0;

  const totalCancelled =
    filteredOrders.filter((order) => order.status === "cancelled").length || 0;

  return (
    <div>
      {/* ===== FILTER SECTION ===== */}
      <div className="border border-gray-400 md:border-none px-3 py-5 rounded-xl mb-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:w-fit  md:gap-6">
          {/* VIEW TYPE */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-600">
              View Type
            </label>
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="border md:px-3 md:py-2 rounded px-2 py-1 border-gray-300 outline-none"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* DAILY FILTER */}
          {viewType === "daily" && (
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-600">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border md:px-3 md:py-2 rounded px-2 py-1 border-gray-300 outline-none"
              />
            </div>
          )}

          {/* MONTHLY FILTER */}
          {viewType === "monthly" && (
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-600">
                  Select Month
                </label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border md:px-3 md:py-2 rounded px-2 py-1 border-gray-300 outline-none"
                >
                  <option value="">All Months</option>
                  {months.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1 text-gray-600">
                  Select Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border md:px-3 md:py-2 rounded px-2 py-1 border-gray-300 outline-none"
                >
                  <option value="">Choose Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* YEARLY FILTER */}
          {viewType === "yearly" && (
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-600">
                Select Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border md:px-3 md:py-2 rounded px-2 py-1 border-gray-300 outline-none"
              >
                <option value="">Choose Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="grid md:grid-cols-6 gap-6">
        <DashboardStatCard
          title="Total Sales"
          value={`৳ ${totalSales.toLocaleString()}`}
          color="green"
        />

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
      <SalesAnalytics
        orders={filteredOrders}
        viewType={viewType}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default SellsHistory;
