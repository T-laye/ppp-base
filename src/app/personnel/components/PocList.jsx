import Link from "next/link";
import React from "react";

export default function PocList({ name, available, total }) {
  const percentage = (available / total) * 100;

  const barProgress = () => {
    const result = (available / total) * 100;
    return `${Math.round(result)}%`;
  };

  //   console.log(barProgress());

  const barColor = () => {
    if (percentage < 40) {
      return "bg-error animate-pulse";
    } else if (percentage >= 40 && percentage < 65) {
      return "bg-yellow-400";
    } else return "bg-primary";
  };

  //   console.log(available);
  //   console.log(percentage);
  //   console.log(barProgress());

  return (
    <Link href="/personnel/stats/id">
      <div className="rounded-xl border px-4 pt-1 pb-4 hover:text-white border-gray-200 bg-red-30 min-h-28 active:border-primaryActive hover:bg-primaryActive duration-200 mt-4 flex flex-col justify-evenly">
        <div className="flex justify-between items-end">
          <h4 className="text-lg font-medium">{name}</h4>
          <div className="text-base">
            {available}/{total}
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded-xl mt-4 overflow-hidden">
          <div
            style={{ width: barProgress() }}
            className={`h-full rounded-xl w-[${barProgress()}%]   ${barColor()} `}
          ></div>
        </div>
      </div>
    </Link>
  );
}
