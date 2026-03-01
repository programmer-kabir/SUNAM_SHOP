"use client";
import useManageOrders from "@/hooks/useManageOrders";
import axios from "axios";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
  const itemsPerPage = 20;

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
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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
  const highlightText = (text) => {
    if (!search) return text;

    const regex = new RegExp(`(${search})`, "gi");

    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-300  rounded">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };
  return (
    <div className="mx-auto min-h-screen">
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
                setCurrentPage(1);
              }}
              className="w-full h-11 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </div>
      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="w-full overflow-x-auto custom-scroll">
          {" "}
          <table className="min-w-[1440px] w-full text-base">
            {" "}
            <thead className="bg-slate-50 border-b">
              <tr className="text-slate-600 text-base uppercase tracking-wider">
                <th className="p-4 text-left whitespace-nowrap">Order</th>
                <th className="p-4 text-left whitespace-nowrap">Customer</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left whitespace-nowrap">Product</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4 text-right whitespace-nowrap">Price</th>
                <th className="p-4 text-right whitespace-nowrap">Size</th>
                <th className="p-4 text-right whitespace-nowrap">Color</th>
                <th className="p-4 text-right  whitespace-nowrap">Total</th>
                <th className="p-4 text-right  whitespace-nowrap">Shipping</th>
                <th className="p-4 text-center  whitespace-nowrap">
                  Order Date
                </th>

                <th className="p-4 text-center whitespace-nowrap">
                  Actions Date
                </th>
                <th className="p-4 text-center  whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedData?.map((order) =>
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
                            className="p-4 align-center whitespace-nowrap"
                          >
                            <div className="font-semibold text-slate-800  whitespace-nowrap">
                              #{highlightText(order.orderId)}
                            </div>
                          </td>

                          {/* CUSTOMER */}
                          <td rowSpan={order.items.length} className="p-4">
                            <div className="font-medium text-slate-700 whitespace-nowrap">
                              {user?.firstName} {user?.lastName}
                            </div>
                          </td>

                          {/* EMAIL */}
                          <td
                            rowSpan={order.items.length}
                            className="p-4 text-slate-500 align-center whitespace-nowrap"
                          >
                            {order.userEmail}
                          </td>

                          {/* PHONE */}
                          <td
                            rowSpan={order.items.length}
                            className="p-4 text-slate-500 whitespace-nowrap"
                          >
                            {highlightText(user?.number)}
                          </td>
                        </>
                      )}

                      {/* PRODUCT INFO */}
                      <td className="p-4">
                        <div className="text-slate-700 font-medium text-sm  whitespace-nowrap">
                          {highlightText(
                            productData?.name?.en || "Product Not Found",
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-center text-slate-600  whitespace-nowrap">
                        {product.qty}
                      </td>

                      <td className="p-4 text-center font-medium text-slate-800 whitespace-nowrap">
                        ৳ {product.price}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        {product?.size ? (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {product.size}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>

                      <td className="p-4 text-left whitespace-nowrap">
                        {product?.color ? (
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                            {product.color}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-sm">—</span>
                        )}
                      </td>

                      {index === 0 && (
                        <>
                          <td
                            rowSpan={order.items.length}
                            className="p-4 text-left font-medium text-slate-700 align-center whitespace-nowrap"
                          >
                            ৳ {order.total}
                          </td>
                          <td
                            rowSpan={order.items.length}
                            className="p-4 text-right font-medium text-slate-700 align-center whitespace-nowrap"
                          >
                            ৳{order.deliveryCharge}
                          </td>

                          <td
                            rowSpan={order.items.length}
                            className="p-4 text-center text-slate-500 align-center whitespace-nowrap"
                          >
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td
                            rowSpan={order.items.length}
                            className="p-4 text-center text-slate-500 align-middle whitespace-nowrap"
                          >
                            {order.status === "delivered" && order.deliveryDate}
                            {order.status === "cancelled" && order.cancelDate}
                            {order.status === "rejected" && order.rejectDate}
                          </td>

                          <td
                            rowSpan={order.items.length}
                            className="p-2 text-center text-slate-500 align-center  whitespace-nowrap"
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
                : order.status === "processing"
                  ? "bg-blue-200 text-blue-700 border-gray-300"
                  : order.status === "shipped"
                    ? "bg-purple-200 text-purple-600 border-gray-300"
                    : "bg-slate-100 text-slate-700 border-slate-300"
      }
    `}
                            >
                              <option value="pending">Pending</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                              <option value="rejected">Rejected</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
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
        </div>
        {/* Pagination */}
        <div className="flex justify-between items-center px-6 py-4 bg-white border-t">
          {/* Left Side */}
          <div className="text-sm text-slate-600">
            {`${(currentPage - 1) * itemsPerPage + 1} to ${Math.min(
              currentPage * itemsPerPage,
              totalItems,
            )} Items of ${totalItems}`}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-md 
                 hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 rounded-md text-sm font-medium transition
          ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
              >
                {page}
              </button>
            ))}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-md 
                   hover:bg-slate-100 disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
