const NoDataFound = ({
  title = "Your cart is empty",
  description = "Looks like you haven't added anything yet. Start shopping to fill your cart.",
  buttonText = "Browse Products",
  onClick = () => {},
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-12 text-center">
      {/* Icon */}
      <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="w-8 h-8 text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2m0 0L7 13h10l2-8H5.4m0 0L5 5m2 13a2 2 0 11-4 0 2 2 0 014 0zm12 0a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="mt-6 text-xl font-semibold text-gray-800">{title}</h2>

      {/* Description */}
      <p className="mt-2 text-gray-500 text-sm max-w-md mx-auto">
        {description}
      </p>

      {/* Button */}
      <button
        onClick={onClick}
        className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default NoDataFound;
