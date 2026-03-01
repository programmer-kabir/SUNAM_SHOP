"use client";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-slate-600 font-medium tracking-wide animate-pulse">
          Loading, please wait...
        </p>

      </div>
    </div>
  );
}