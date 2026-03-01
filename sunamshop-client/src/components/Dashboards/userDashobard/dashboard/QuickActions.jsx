import React from "react";
import Link from "next/link";

const QuickActions = () => {
  const actions = [
    {
      label: "Shop Now",
      href: "/products",
      icon: "🛒",
    },
    {
      label: "My Orders",
      href: "/userDashboard/orders",
      icon: "📦",
    },
    {
      label: "Wishlist",
      href: "/wishlist",
      icon: "❤️",
    },
    {
      label: "Invoices",
      href: "/userDashboard/invoices",
      icon: "🧾",
    },
    {
      label: "Profile Settings",
      href: "/userDashboard/profileInformation",
      icon: "⚙️",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="flex flex-col items-center justify-center bg-gray-50 hover:bg-indigo-50 transition-all duration-200 p-5 rounded-lg text-center"
          >
            <span className="text-2xl mb-2">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700">
              {action.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
