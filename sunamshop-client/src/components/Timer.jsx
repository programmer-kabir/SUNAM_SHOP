"use client";

import { useEffect, useState } from "react";

const TimeBox = ({ label, value }) => (
  <div className="flex flex-col items-center">
    <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
    <span className="lg:text-3xl text-base font-bold dark:text-white">
      {String(value).padStart(2, "0")}
    </span>
  </div>
);

export function Timer({ endDate }) {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const end = new Date(endDate).getTime();
    const diff = end - now;

    if (diff <= 0) return 0;

    return Math.floor(diff / 1000);
  };

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const days = Math.floor(time / (3600 * 24));
  const hours = Math.floor((time % (3600 * 24)) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  return (
    <div className="flex items-end md:gap-4 gap-2">
      <TimeBox label="Days" value={days} />
      <span className="lg:text-2xl font-bold text-red-500">:</span>
      <TimeBox label="Hours" value={hours} />
      <span className="lg:text-2xl text-xs font-bold text-red-500">:</span>
      <TimeBox label="Minutes" value={minutes} />
      <span className="lg:text-2xl text-xs font-bold text-red-500">:</span>
      <TimeBox label="Seconds" value={seconds} />
    </div>
  );
}
