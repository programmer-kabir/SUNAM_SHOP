import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArrivalCard = ({ image, title, description, height }) => {
  return (
    <div
      className={`group relative block bg-black overflow-hidden rounded-xl ${height}`}
    >
      {/* Image */}
      <div className="absolute inset-0 flex items-center justify-center p-10 transition-opacity duration-300 group-hover:opacity-50">
        <Image
          width={600}
          height={600}
          src={image}
          alt={title}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Content */}
      <div className="relative p-4 sm:p-6 lg:p-8 h-full flex items-end">
        <div className="translate-y-8 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 text-white">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm opacity-80">{description}</p>
          <Link href="/" className="inline-block mt-2 underline">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArrivalCard;
