// components/DashboardStatCard.jsx

import { MoreVertical } from "lucide-react";

export default function DashboardStatCard({
  title,
  subtitle,
  value,
  growth,
  previous,
  children,
  color = "indigo", // default color
}) {
  const colorStyles = {
    indigo: "text-indigo-600 border-indigo-500 hover:bg-indigo-50",
    green: "text-green-600 border-green-500 hover:bg-green-50",
    blue: "text-blue-600 border-blue-500 hover:bg-blue-50",
    yellow: "text-yellow-600 border-yellow-500 hover:bg-yellow-50",
    red: "text-red-600 border-red-500 hover:bg-red-50",
    gray: "text-gray-600 border-gray-500 hover:bg-gray-50",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5 relative hover:shadow-md transition">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-slate-700 font-semibold text-lg">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>

      {/* Main Value */}
      <div className="mt-6 flex items-center gap-3">
        <h2 className="text-3xl font-bold text-slate-800">{value}</h2>

        {growth && (
          <p
            className={`text-sm font-medium ${
              growth.includes("↑") ? "text-green-600" : "text-red-500"
            }`}
          >
            {growth}
          </p>
        )}
      </div>

    </div>
  );
}
