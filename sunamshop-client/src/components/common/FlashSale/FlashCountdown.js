"use client";

import { useEffect, useState } from "react";

export default function FlashCountdown({ endDate }) {
  const [time, setTime] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;

      if (distance <= 0) return;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTime({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const Box = ({ label, value }) => (
    <div className="text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <Box label="Days" value={time.days} />
      <span className="text-red-500 text-2xl font-bold">:</span>

      <Box label="Hours" value={time.hours} />
      <span className="text-red-500 text-2xl font-bold">:</span>

      <Box label="Minutes" value={time.minutes} />
      <span className="text-red-500 text-2xl font-bold">:</span>

      <Box label="Seconds" value={time.seconds} />
    </div>
  );
}