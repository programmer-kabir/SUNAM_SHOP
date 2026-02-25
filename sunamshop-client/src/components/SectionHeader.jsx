import { ChevronLeft, ChevronRight } from "lucide-react";
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
    <>
      <div className="flex justify-between md:mb-8 gap-4 w-full">
        <div className="flex items-center justify-between lg:gap-24">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
              <span className="w-3 h-6 bg-red-500 rounded-sm"></span>
              {subtitle}
            </div>
            <h2 className="lg:text-3xl font-bold mt-2 dark:text-white">
              {title}
            </h2>
          </div>
          <div className="hidden md:inline">
            {hasTimer && endDate && (
              <div className="mt-12">
                <Timer endDate={endDate} />
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:inline">
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
        </div>
        <div className="hidden md:inline">
          {hasButton && (
            <Link
              href={link}
              className="bg-red-500 text-white px-4 h-fit py-2 rounded"
            >
              View All
            </Link>
          )}
        </div>
      </div>
      <div className="md:hidden flex gap-7 justify-between md:mb-0 mb-5 pt-5 md:pt-0">
        <div className="">
          {hasTimer && endDate && (
            <div className="">
              <Timer endDate={endDate} />
            </div>
          )}
        </div>
        <div className="">
          {hasNavigation && (
            <div className="flex gap-3 ">
              <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <ChevronLeft />
              </button>

              <button className="custom-next w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <ChevronRight />
              </button>
            </div>
          )}
        </div>
        <div className="">
          {hasButton && (
            <Link
              href={link}
              className="bg-red-500 text-white px-4 h-fit py-2 rounded"
            >
              View All
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default SectionHeader;
