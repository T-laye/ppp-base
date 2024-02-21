import React from "react";

export default function QuantityCards({ title, available, total }) {
  const percentage = (available / total) * 100;

  const barProgress = () => {
    const result = (available / total) * 100;
    return `w-[${Math.round(result)}%]`;
  };

  const barColor = () => {
    if (percentage < 40) {
      return "bg-error";
    } else if (percentage >= 40 && percentage < 65) {
      return "bg-yellow-400";
    } else return "bg-primary";
  };

  //   console.log(available);
  //   console.log(percentage);
//   console.log(barProgress());

  return (
    <div className="rounded-xl border px-4 pt-1 pb-4 border-customGra  mt-4">
      <div className="flex justify-between items-end">
        <h4 className="text-lg font-medium">{title}</h4>
        <div className="text-base">
          {available}/{total}
        </div>
      </div>
      <div className="h-2 bg-gray-300 rounded-xl mt-4 overflow-hidden">
        <div
          className={`h-full rounded-xl ${barProgress()}   ${barColor()} `}
        ></div>
      </div>
    </div>
  );
}