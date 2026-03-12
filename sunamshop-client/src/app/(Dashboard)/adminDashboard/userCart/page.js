import { authOptions } from "@/lib/auth";
import { UsersCartItems } from "@/utils/UsersCartItems";
import { getServerSession } from "next-auth";
import { ShoppingCart } from "lucide-react";

const UsersCartMonitor = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;
  const userCart = await UsersCartItems(token);
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
                <th className="px-6 py-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {userCart?.map((user,index) => (
                <tr
                  key={index}
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
