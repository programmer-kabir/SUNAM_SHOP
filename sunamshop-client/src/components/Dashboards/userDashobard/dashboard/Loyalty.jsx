import React from "react";

const Loyalty = ({ totalSpend = 0 }) => {
  let level = "Silver 🥈";
  let nextLevel = "Gold 🥇";
  let min = 0;
  let max = 10000;

  if (totalSpend >= 50000) {
    level = "Platinum 👑";
    nextLevel = null;
    min = 50000;
    max = totalSpend; // no limit
  } else if (totalSpend >= 10000) {
    level = "Gold 🥇";
    nextLevel = "Platinum 👑";
    min = 10000;
    max = 50000;
  }

  const progress =
    nextLevel && max > min
      ? Math.min(100, Math.round(((totalSpend - min) / (max - min)) * 100))
      : 100;

  const remaining = nextLevel && totalSpend < max ? max - totalSpend : 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Loyalty Status
      </h3>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Current Level</p>
        <p className="text-xl font-bold text-indigo-600 mt-1">{level}</p>
      </div>

      {nextLevel && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Progress to {nextLevel}</p>

          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Spend ৳ {remaining.toLocaleString()} more to reach {nextLevel}
          </p>
        </div>
      )}

      {!nextLevel && (
        <p className="text-sm text-green-600 font-medium">
          🎉 You are at the highest membership level!
        </p>
      )}
    </div>
  );
};

export default Loyalty;
