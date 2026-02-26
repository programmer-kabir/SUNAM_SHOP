"use client";
import { useState, useMemo } from "react";
import useOrder from "@/hooks/useOrder";

const CompleteCart = ({ products }) => {
  const { data: orders, isLoading, isError } = useOrder();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const getProductById = (id) => {
    return products?.find((p) => p._id === id);
  };

  const filteredOrders = useMemo(() => {
    if (!orders) return [];

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);

      const matchSearch =
        order.orderId?.toLowerCase().includes(search.toLowerCase()) ||
        order.items?.some((item) => {
          const productName =
            getProductById(item.productId)?.name?.en?.toLowerCase() || "";
          return productName.includes(search.toLowerCase());
        });
      // Daily (Date Picker Based)
      if (filterType === "daily" && selectedDate) {
        const selected = new Date(selectedDate);
        return (
          orderDate.getFullYear() === selected.getFullYear() &&
          orderDate.getMonth() === selected.getMonth() &&
          orderDate.getDate() === selected.getDate() &&
          matchSearch
        );
      }

      // Monthly
      if (filterType === "monthly" && selectedMonth && selectedYear) {
        return (
          orderDate.getFullYear() === Number(selectedYear) &&
          orderDate.getMonth() === Number(selectedMonth) &&
          matchSearch
        );
      }

      // Yearly
      if (filterType === "yearly" && selectedYear) {
        return orderDate.getFullYear() === Number(selectedYear) && matchSearch;
      }

      return matchSearch;
    });
  }, [orders, search, filterType, selectedDate, selectedMonth, selectedYear]);
  const highlightText = (text) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-300 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
  const totalAmount = useMemo(() => {
    return filteredOrders.reduce((total, order) => {
      return (
        total +
        (order.items?.reduce((sum, item) => sum + item.subtotal, 0) || 0)
      );
    }, 0);
  }, [filteredOrders]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Failed to load orders</p>;
  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "cancelled":
        return "bg-gray-200 text-gray-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  return (
    <div className="mx-auto mt-10">
      {/* FILTER SECTION */}
      <div className="lg:flex items-center justify-between py-5">
        <div>
          <h4 className="text-3xl font-semibold">My Orders</h4>
          <p className="text-gray-500">Overview of your completed orders.</p>
        </div>
        <div className="md:flex space-y-2 items-center md:space-y-0 gap-4">
          {/* View */}
          <div className="flex flex-col ">
            <label className="text-gray-600 text-sm mb-1">View</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="border border-gray-400 outline-none px-4 py-2 rounded-lg"
            >
              <option value="all">All</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* Daily */}
          {filterType === "daily" && (
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-400 outline-none px-4 py-2 rounded-md"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-400 outline-none px-4 py-2 rounded-md"
                >
                  <option value="">Select Month</option>
                  {[
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
                  ].map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-400 outline-none px-4 py-2 rounded-md"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}

          {/* Monthly */}
          {filterType === "monthly" && (
            <>
              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="border border-gray-400 outline-none px-4 py-2 rounded-md"
                >
                  <option value="">Select Month</option>
                  {[
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
                  ].map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 text-sm mb-1">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="border border-gray-400 outline-none px-4 py-2 rounded-md"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </>
          )}

          {/* Yearly */}
          {filterType === "yearly" && (
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-400 outline-none px-4 py-2 rounded-lg"
              >
                <option value="">Select Year</option>
                {Array.from({ length: 5 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Search */}
          <div className="flex flex-col">
            <label className="text-gray-600 text-sm mb-1">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or Order Id"
              className="border border-gray-400 outline-none px-4 py-2 rounded-lg"
            />
          </div>

          {/* Reset */}
          <button
            onClick={() => {
              setFilterType("all");
              setSelectedDate("");
              setSelectedMonth("");
              setSelectedYear("");
              setSearch("");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg md:mt-5"
          >
            Reset
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-300">
        <h4 className="text-lg font-medium">
          Total Orders: {filteredOrders.length}
        </h4>
        <h4 className="text-lg font-medium">Total Amount: ৳ {totalAmount}</h4>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-md border border-gray-200 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Product</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Order Date</th>
              <th className="p-4">Delivery Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  No Orders Found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) =>
                order.items?.map((item, index) => (
                  <tr
                    key={`${order._id}-${index}`}
                    className="border-t border-gray-300 hover:bg-gray-100"
                  >
                    <td className="p-4 font-medium">
                      #{highlightText(order.orderId)}
                    </td>
                    <td className="p-4">
                      {highlightText(
                        getProductById(item.productId)?.name?.en ||
                          "Product Not Found",
                      )}
                    </td>
                    <td className="p-4">{item.qty}</td>
                    <td className="p-4">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4">{order?.deliveryDate}</td>
                    <td className="p-4">৳ {item.subtotal}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full capitalize ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                )),
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompleteCart;
