import Image from "next/image";
import Link from "next/link";
import React from "react";

const ArrivalCard = ({ image, title, description, height }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl ${height}`}
    >
      {/* Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Content */}
      <div className="absolute bottom-0 p-4 sm:p-6 lg:p-8 text-white">
        <div className="transform transition-all duration-300 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-lg font-semibold">{title}</p>
          <p className="text-sm opacity-90">{description}</p>
          <Link href="/" className="inline-block mt-2 underline">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArrivalCard;