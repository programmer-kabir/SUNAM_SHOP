"use client";

import useOrder from "@/hooks/useOrder";

const CompleteCart = ({ products }) => {
  const { data: orders, isLoading, isError } = useOrder();
  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return <p className="text-center mt-10">Failed to load orders</p>;
  const getProductById = (id) => {
    return products?.find((p) => p._id === id);
  };
  console.log(orders)
  return (
    <div className="mx-auto mt-10">
      <div className="w-full flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">My Orders</h3>
          <p className="text-slate-500 text-sm">
            Overview of your completed orders.
          </p>
        </div>
        <div class="ml-3">
          <div class="w-full max-w-sm min-w-[200px] relative">
            <div class="relative">
              <input
                class="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for invoice..."
              />
              <button
                class="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="3"
                  stroke="currentColor"
                  class="w-8 h-8 text-slate-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col w-full overflow-x-auto text-gray-700 bg-white shadow-md rounded-lg">
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="p-4 border-b bg-slate-50">Order ID</th>
              <th className="p-4 border-b bg-slate-50">Product Name</th>
              <th className="p-4 border-b bg-slate-50">Size</th>
              <th className="p-4 border-b bg-slate-50">Quantity</th>
              <th className="p-4 border-b bg-slate-50">Order Date</th>
              <th className="p-4 border-b bg-slate-50">Delivery Date</th>
              <th className="p-4 border-b bg-slate-50">Amount</th>
              <th className="p-4 border-b bg-slate-50">Delivery Status</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-slate-500">
                  No Orders Found
                </td>
              </tr>
            ) : (
              orders?.map((order) =>
                order.items?.map((item, index) => (
                  <tr
                    key={`${order._id}-${index}`}
                    className="hover:bg-slate-50 border-b"
                  >
                    <td className="p-4 font-medium text-slate-700">
                      #{order?.orderId}
                    </td>

                    <td className="p-4 text-slate-600">
                      {getProductById(item.productId)?.name?.en ||
                        "Product Not Found"}
                    </td>

                    <td className="p-4 text-slate-600">{item.size || "-"}</td>

                    <td className="p-4 text-slate-600">{item.qty}</td>

                    <td className="p-4 text-slate-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-4 text-slate-500 text-sm">Pending</td>

                    <td className="p-4 text-slate-600">৳ {item.subtotal}</td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
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
