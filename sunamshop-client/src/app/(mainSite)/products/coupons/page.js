import React from "react";
import { TicketPercent } from "lucide-react";
import Link from "next/link";

const CouponsPages = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="bg-blue-50 p-6 rounded-full mb-6">
        <TicketPercent className="h-12 w-12 text-blue-600" />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        No Coupons Available
      </h1>

      {/* Description */}
      <p className="mt-3 text-gray-500 max-w-md">
        We don't have any coupons right now. New discounts and special offers
        will be added soon. Stay tuned!
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default CouponsPages;
