import React from "react";

const SummaryHeader = ({ user, totalOrders, totalSpend }) => {
  // ===== Greeting Logic =====
  const hour = new Date().getHours();
  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning ☀️";
  else if (hour < 18) greeting = "Good Afternoon 🌤️";
  else greeting = "Good Evening 🌙";

  // ===== Loyalty Level Logic =====
  let level = "Silver 🥈";
  if (totalSpend > 50000) level = "Platinum 👑";
  else if (totalSpend > 10000) level = "Gold 🥇";
  const name = user?.firstName + " " + user?.lastName;
  console.log(name);
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800">
        {greeting}, {user?.firstName} {user?.lastName}👋
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Here's a quick summary of your shopping activity
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {/* Total Orders */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm text-gray-500">Total Orders</h4>
          <p className="text-xl font-bold mt-1 text-gray-800">{totalOrders}</p>
        </div>

        {/* Total Spend */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm text-gray-500">Total Spend</h4>
          <p className="text-xl font-bold mt-1 text-gray-800">
            ৳ {totalSpend?.toLocaleString()}
          </p>
        </div>

        {/* Loyalty Level */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm text-gray-500">Membership Level</h4>
          <p className="text-xl font-bold mt-1 text-indigo-600">{level}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryHeader;
