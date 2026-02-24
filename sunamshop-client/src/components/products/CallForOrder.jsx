import { Phone } from "lucide-react";

export default function CallForOrder({ number = "09613-800800" }) {
  return (
    <div className="mt-8 border-t border-b border-gray-300 dark:border-gray-700 py-5">
      <a
        href={`tel:${number}`}
        className="flex items-center gap-3 group"
      >
        {/* Icon */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition">
          <Phone className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-900 dark:text-white tracking-wide">
          Call For Order:
          <span className="ml-2 text-black dark:text-white group-hover:underline">
            {number}
          </span>
        </p>
      </a>
    </div>
  );
}
