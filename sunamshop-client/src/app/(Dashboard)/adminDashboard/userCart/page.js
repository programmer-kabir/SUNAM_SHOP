import { authOptions } from "@/lib/auth";
import { UsersCartItems } from "@/utils/UsersCartItems";
import { getServerSession } from "next-auth";
import { ShoppingCart } from "lucide-react";

const UsersCartMonitor = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const userCart = await UsersCartItems(token);
  console.log(userCart);
  return (
    <div className="">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="w-6 h-6 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-800">Users Cart Monitor</h1>
      </div>

      <div className="bg-white rounded border-gray-100 shadow-md overflow-hidden border">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className=" text-gray-700 sticky top-0">
              <tr>
                <th className="px-6 py-4">User Name</th>
                <th className="px-6 py-4">User Email</th>
                <th className="px-6 py-4">User Number</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Quantity</th>
                <th className="px-6 py-4">Color</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {userCart?.map((user) => (
                <tr
                  key={`${user?._id}}`}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user?.name}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user?.userEmail}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user?.number ? (
                      <a
                        href={`tel:${user.number}`}
                        className="text-blue-600 hover:underline cursor-pointer"
                      >
                        {user.number}
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-6 py-4">{user.productName || "N/A"}</td>
                  <td className="px-6 py-4">{user.quantity || 1}</td>
                  <td className="px-6 py-4">৳{user.price}</td>

                  <td className="px-6 py-4">
                    {" "}
                    {user?.color ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        {user.color}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    {user?.size ? (
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        {user.size}
                      </span>
                    ) : (
                      <span className="text-slate-400 text-sm">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    ৳{Number(user.price) * Number(user.quantity || 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersCartMonitor;
