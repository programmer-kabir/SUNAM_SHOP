import React from "react";
import { Tag } from "lucide-react";
import Link from "next/link";

const OfferPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Icon */}
      <div className="bg-orange-50 p-6 rounded-full mb-6">
        <Tag className="h-12 w-12 text-orange-600" />
      </div>

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        No Offers Available
      </h1>

      {/* Description */}
      <p className="mt-3 text-gray-500 max-w-md">
        There are no special offers available right now. Exciting deals and
        discounts will be added soon. Please check back later.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OfferPage;
