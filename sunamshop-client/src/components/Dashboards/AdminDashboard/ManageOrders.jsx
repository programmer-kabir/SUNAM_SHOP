"use client";
import useManageOrders from "@/hooks/useManageOrders";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageOrders = ({ products, users }) => {
  const { data: manageOrders, refetch } = useManageOrders();
  const getProductById = (id) => {
    return products?.find((p) => p._id === id);
  };
  const { data: session } = useSession();
  const [viewType, setViewType] = useState("all"); // all | daily | monthly
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const itemsPerPage = 5;

  const filteredOrders = useMemo(() => {
    return (
      manageOrders?.filter((order) => {
        const orderDate = new Date(order.createdAt);

        let matchView = true;
        let matchStatus = true;

        // ✅ STATUS FILTER
        if (statusFilter !== "all") {
          matchStatus =
            order.status?.toLowerCase() === statusFilter.toLowerCase();
        }

        // ✅ DAILY FILTER
        if (viewType === "daily" && selectedDate) {
          const selected = new Date(selectedDate);
          matchView =
            orderDate.getFullYear() === selected.getFullYear() &&
            orderDate.getMonth() === selected.getMonth() &&
            orderDate.getDate() === selected.getDate();
        }

        // ✅ MONTHLY FILTER
        if (viewType === "monthly" && selectedMonth) {
          const [year, month] = selectedMonth.split("-");
          matchView =
            orderDate.getFullYear() === Number(year) &&
            orderDate.getMonth() === Number(month) - 1;
        }

        return matchView && matchStatus; // 🔥 BOTH must match
      }) || []
    );
  }, [manageOrders, viewType, selectedDate, selectedMonth, statusFilter]);
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: "Change Order Status?",
        text: `You are about to change status to "${newStatus}"`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0f172a",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Yes, update it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      // ❌ If cancelled
      if (!result.isConfirmed) return;

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/updated_order/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      );

      toast.success(`Order status changed to ${newStatus}`);
      refetch();
    } catch (error) {
      toast.error(`Failed to update order status.`);
    }
  };
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const paginatedData = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };
  const getUserFullDetails = (email) => {
    return users?.find((u) => u.email === email);
  };

  return (
    <div className="mx-auto bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-800">Manage Orders</h3>
          <p className="text-slate-500 text-sm">
            Overview of all customer purchases
          </p>
        </div>

        <input
          className="w-64 h-11 px-4 text-sm border border-slate-300 rounded-lg 
      focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white shadow-sm"
          placeholder="Search order..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-2xl p-6 mb-6 shadow-md border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="text-xs font-medium text-slate-500">
              Order Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full mt-1 h-11 px-3 bg-white text-slate-700 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          {/* View Type */}
          <div>
            <label className="text-xs font-medium text-slate-500">
              View Type
            </label>
            <select
              value={viewType}
              onChange={(e) => {
                setViewType(e.target.value);
                setSelectedDate("");
                setSelectedMonth("");
              }}
              className="w-full mt-1 h-11 px-3 bg-white text-slate-700 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* DAILY → Date Picker */}
          {viewType === "daily" && (
            <div>
              <label className="text-xs font-medium text-slate-500">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full mt-1 h-11 px-3 bg-white text-slate-700 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:outline-none"
              />
            </div>
          )}

          {/* MONTHLY → Month Picker */}
          {viewType === "monthly" && (
            <div>
              <label className="text-xs font-medium text-slate-500">
                Select Month
              </label>
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full mt-1 h-11 px-3 bg-white text-slate-700 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-400 focus:outline-none"
              />
            </div>
          )}

          {/* Reset Button */}
          <div>
            <button
              onClick={() => {
                setViewType("all");
                setSelectedDate("");
                setSelectedMonth("");
              }}
              className="w-full h-11 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
        <table className="min-w-[1200px] w-full text-base">
          {" "}
          <thead className="bg-slate-50 border-b">
            <tr className="text-slate-600 text-base uppercase tracking-wider">
              <th className="p-4 text-left">Order</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-center">Qty</th>
              <th className="p-4 text-right">Price</th>
              <th className="p-4 text-right">Total</th>
              <th className="p-4 text-right">Shipping</th>
              <th className="p-4 text-center">Order Date</th>

              <th className="p-4 text-center">Actions Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredOrders?.map((order) =>
              order.items?.map((product, index) => {
                const user = getUserFullDetails(order.userEmail);
                const productData = getProductById(product?.productId);

                return (
                  <tr
                    key={`${order._id}-${index}`}
                    className="transition-all px-2"
                  >
                    {index === 0 && (
                      <>
                        {/* ORDER COLUMN */}
                        <td
                          rowSpan={order.items.length}
                          className="px-4 py-2 align-center whitespace-nowrap"
                        >
                          <div className="font-semibold text-slate-800">
                            {order.orderId}
                          </div>
                        </td>

                        {/* CUSTOMER */}
                        <td rowSpan={order.items.length} className="px-4 py-2">
                          <div className="font-medium text-slate-700 whitespace-nowrap">
                            {user?.firstName} {user?.lastName}
                          </div>
                        </td>

                        {/* EMAIL */}
                        <td
                          rowSpan={order.items.length}
                          className="px-4 py-2 text-slate-500 align-center whitespace-nowrap"
                        >
                          {order.userEmail}
                        </td>

                        {/* PHONE */}
                        <td
                          rowSpan={order.items.length}
                          className="px-4 py-2 text-slate-500 whitespace-nowrap"
                        >
                          {user?.number}
                        </td>
                      </>
                    )}

                    {/* PRODUCT INFO */}
                    <td className="px-4 py-2">
                      <div className="text-slate-700 font-medium text-sm">
                        {productData?.name?.en || "Product Not Found"}
                      </div>
                    </td>

                    <td className="px-4 py-2 text-center text-slate-600">
                      {product.qty}
                    </td>

                    <td className="px-4 py-2 text-left font-medium text-slate-800 whitespace-nowrap">
                      ৳ {product.price}
                    </td>

                    {index === 0 && (
                      <>
                        <td
                          rowSpan={order.items.length}
                          className="px-4 py-2 text-left font-medium text-slate-700 align-center whitespace-nowrap"
                        >
                          ৳ {order.total}
                        </td>
                        <td
                          rowSpan={order.items.length}
                          className="px-4 py-2 text-right font-medium text-slate-700 align-center whitespace-nowrap"
                        >
                          ৳{order.deliveryCharge}
                        </td>

                        <td
                          rowSpan={order.items.length}
                          className="px-4 py-2 text-center text-slate-500 align-center whitespace-nowrap"
                        >
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td
                          rowSpan={order.items.length}
                          className="px-4 py-2 text-center text-slate-500 align-middle whitespace-nowrap"
                        >
                          {order.status === "delivered" && order.deliveryDate}
                          {order.status === "cancelled" && order.cancelDate}
                          {order.status === "rejected" && order.rejectDate}
                        </td>

                        <td
                          rowSpan={order.items.length}
                          className="p-2 text-center text-slate-500 align-center"
                        >
                          <select
                            value={order.status || "pending"}
                            onChange={(e) =>
                              handleStatusChange(order?._id, e.target.value)
                            }
                            className={`px-3 py-1 text-xs rounded-full border font-medium
      ${
        order.status === "pending"
          ? "bg-yellow-100 text-yellow-700 border-yellow-300"
          : order.status === "delivered"
            ? "bg-green-100 text-green-700 border-green-300"
            : order.status === "cancelled"
              ? "bg-red-100 text-red-700 border-red-300"
              : order.status === "rejected"
                ? "bg-gray-200 text-gray-700 border-gray-300"
                : "bg-slate-100 text-slate-700 border-slate-300"
      }
    `}
                          >
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                      </>
                    )}
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 bg-slate-50">
          <span className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-1.5 text-sm border rounded-lg hover:bg-slate-200"
            >
              Prev
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-1.5 text-sm border rounded-lg hover:bg-slate-200"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
