"use client";
import React from "react";

const Star = ({ fillPercent = 0 }) => {
  return (
    <div className="relative w-5 h-5">
      {/* empty star */}
      <svg viewBox="0 0 24 24" className="absolute w-5 h-5 text-gray-300">
        <path
          fill="currentColor"
          d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.848 1.512 8.258L12 18.896l-7.448 4.516 1.512-8.258L0 9.306l8.332-1.151z"
        />
      </svg>

      {/* filled part */}
      <div
        className="absolute overflow-hidden"
        style={{ width: `${fillPercent}%` }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-400">
          <path
            fill="currentColor"
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.848 1.512 8.258L12 18.896l-7.448 4.516 1.512-8.258L0 9.306l8.332-1.151z"
          />
        </svg>
      </div>
    </div>
  );
};

export default function StarRating({ rating = 0 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const percent = Math.min(Math.max((rating - star + 1) * 100, 0), 100);
        return <Star key={star} fillPercent={percent} />;
      })}
    </div>
  );
}
