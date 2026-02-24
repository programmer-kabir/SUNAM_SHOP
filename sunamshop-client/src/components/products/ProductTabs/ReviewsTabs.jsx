"use client";

import StarRating from "@/components/ui/StarRating";

const ReviewsTabs = ({ reviews = [] }) => {
  /* ---------------- EMPTY STATE ---------------- */
  if (!reviews.length) {
    return (
      <div className="text-center py-14 border rounded-xl bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          No reviews yet. Be the first to review this product.
        </p>
      </div>
    );
  }

  /* ---------------- REVIEW LIST ---------------- */
  return (
    <div className="space-y-6">
      {reviews.map((review, i) => (
        <div
          key={i}
          className="border-b pb-6 last:border-none dark:border-gray-800"
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-semibold text-gray-600 dark:text-gray-300">
              {review.name?.charAt(0).toUpperCase()}
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-wrap items-center gap-3">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {review?.user?.name}
                </h4>

                <StarRating rating={review.rating} />

                <span className="text-xs text-gray-400">{review.date}</span>
              </div>

              {/* Comment */}
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsTabs;
