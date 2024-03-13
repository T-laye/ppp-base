import Link from "next/link";
import React from "react";

export default function QuantityCards({ title, available, total }) {
  const percentage = (available / total) * 100;

  const barProgress = () => {
    const result = (available / total) * 100;
    return `${Math.round(result)}%`;
  };

  //   console.log(barProgress());

  const barColor = () => {
    if (percentage < 40) {
      return "bg-error";
    } else if (percentage >= 40 && percentage < 65) {
      return "bg-yellow-500";
    } else return "bg-primary";
  };

  //   console.log(available);
  //   console.log(percentage);
  //   console.log(barProgress());

  return (
    <Link href="/admin/stats/productId">
      <div className="rounded-xl border px-4 pt-1 pb-4 active:bg-primaryActive cursor-pointer active:border-primaryActive hover:bg-primaryActive duration-200 mt-4">
        <div className="flex justify-between items-end">
          <h4 className="text-lg font-medium">{title}</h4>
          <div className="text-base">
            {available}/{total}
          </div>
        </div>
        <div className="h-2 bg-gray-300 rounded-xl mt-4 overflow-hidden">
          <div
            style={{ width: barProgress() }}
            className={`h-full rounded-xl w-[${barProgress()}%]   ${barColor()} `}
          ></div>
        </div>

        <div className="mt-2">
          {/* <div className="flex justify-between">
          <div>Product Name</div>
          <div>Fuel</div>
        </div> */}
          {/* <div className="flex justify-between items-center mt-2">
          <div>Customers In Queue</div>
          <div>30</div>
        </div>
        <div className="flex justify-between items-center mt-2">
        <div>Customers Approved</div>
          <div>30</div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div>Quantity Allocation</div>
          <div>30</div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div>Number of POC</div>
          <div>30</div>
        </div> */}
        </div>
      </div>
    </Link>
  );
}
