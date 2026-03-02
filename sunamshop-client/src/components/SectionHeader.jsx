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
  prevRef,
  nextRef,
}) => {
  return (
    <>
      <div className="flex justify-between items-center md:mb-8 gap-4 w-full">
        {/* Left Side */}
        <div className=" hidden md:flex items-center gap-10">
          <div>
            <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
              <span className="w-3 h-6 bg-red-500 rounded-sm"></span>
              {subtitle}
            </div>
            <h2 className="lg:text-3xl font-bold mt-2 dark:text-white">
              {title}
            </h2>
          </div>

          {hasTimer && endDate && (
            <div className="hidden md:block mt-6">
              <Timer endDate={endDate} />
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-6">
          {hasNavigation && (
            <div className="flex gap-3">
              <button className="custom-prev w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <ChevronLeft />
              </button>

              <button className="custom-next w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <ChevronRight />
              </button>
            </div>
          )}

          {hasButton && (
            <Link
              href={link}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              View All
            </Link>
          )}
        </div>
      </div>
      <div className="md:hidden flex gap-7 justify-between items-center  mb-10 md:mb-0  md:pt-0">
        <div>
          <div className="flex items-center gap-2 text-red-500 font-semibold text-sm">
            <span className="w-3 h-6 bg-red-500 rounded-sm"></span>
            {subtitle}
          </div>
          <h2 className="lg:text-3xl font-bold mt-2 dark:text-white">
            {title}
          </h2>
        </div>

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
