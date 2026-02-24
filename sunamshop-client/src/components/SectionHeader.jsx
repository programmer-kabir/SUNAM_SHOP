import { Timer } from "./Timer";
import Link from "next/link";

const SectionHeader = ({
  title,
  subtitle,
  hasTimer,
  hasNavigation,
  hasButton,
  link,
  endDate,
}) => {
  return (
    <div className="flex justify-between mb-8 gap-4 w-full">
      <div className="flex items-center justify-between lg:gap-24">
        <div>
          <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
            <span className="w-3 h-6 bg-red-500 rounded-sm"></span>
            {subtitle}
          </div>
          <h2 className="text-3xl font-bold mt-2 dark:text-white">{title}</h2>
        </div>
        {hasTimer && endDate && (
          <div className="mt-12">
            <Timer endDate={endDate} />
          </div>
        )}
      </div>

      {hasNavigation && (
        <div className="flex gap-3 pt-12">
          <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
            ←
          </button>

          <button className="custom-next w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
            →
          </button>
        </div>
      )}
      {hasButton && (
        <Link
          href={link}
          className="bg-red-500 text-white px-4 h-fit py-2 rounded"
        >
          View All
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
