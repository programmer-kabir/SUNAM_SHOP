import { Heart } from "lucide-react";

export default function ProductActions({
  stock = 0,
  handleBuyNow,
  setQty,
  qty,
  liked,
  toggleWishlist,
  isAdmin,
}) {
  const increase = () => {
    if (qty < stock) setQty(qty + 1);
  };

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const outOfStock = stock <= 0;
  const isDisabled = isAdmin === "admin";
  return (
    <div className="flex items-stretch gap-3 mt-6 w-full">
      {/* Quantity */}
      <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
        <button onClick={decrease} className="px-3 py-2">
          −
        </button>

        <span className="w-10 text-center font-medium">{qty}</span>

        <button
          onClick={increase}
          disabled={qty >= stock}
          className="px-3 py-2 bg-red-500 text-white disabled:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Buy Now */}
      <button
        disabled={outOfStock || isDisabled}
        onClick={handleBuyNow}
        className={`flex-1 py-2 rounded-md font-semibold text-white
    ${
      outOfStock || isDisabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600"
    }
  `}
      >
        {outOfStock
          ? "Out of Stock"
          : isDisabled
            ? "Admin Can't Buy"
            : "Buy Now"}
      </button>

      {/* Wishlist */}
      <button
        onClick={!isDisabled ? toggleWishlist : undefined}
        disabled={isDisabled}
        className={`p-2 border border-gray-300 rounded-md 
    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
  `}
      >
        <Heart
          className={`w-5 h-5 transition ${
            liked ? "fill-red-500 text-red-500" : "text-gray-600"
          }`}
        />
      </button>
    </div>
  );
}
