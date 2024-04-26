"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function PocList({ name, available, total, id }) {
  const router = useRouter();
  const percentage = (available / total) * 100;

  const barProgress = () => {
    const result = (available / total) * 100;
    return `${Math.round(result)}%`;
  };

  const goToPoc = () => {
    router.push(`/management/stats/${id}`);
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
    // <Link href="/management/stats/id">
    <div
      onClick={goToPoc}
      className="cursor-pointer rounded-xl border px-4 pt-1 pb-4 border-gray-200 hover:text-white active:border-primaryActive hover:bg-primaryActive duration-200 mt-4 "
    >
      <div className="flex justify-between items-end">
        <h4 className="text-lg font-medium">{name}</h4>
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
    </div>
    // </Link>
  );
}
