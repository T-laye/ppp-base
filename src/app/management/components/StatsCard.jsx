"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function StatsCard({ link, color, title, number, icon }) {
  const router = useRouter();

  const handleRoute = () => {
    router.push(link);
  };
  return (
    <div
      onClick={handleRoute}
      className={`categoryCard  ${color} flex-col items-center justify-center py-4 px-4 active:scale-[0.99] hover:scale-[1.03] duration-200 cursor-pointer`}
    >
      <div className="text-primry place-self-end"> {icon}</div>
      <h3 className="text-4xl bg-green-40 text-primar place-self-start font-semibold">
        {number}
      </h3>
      <p className="text-xs font-semibold place-self-start">{title}</p>
    </div>
  );
}
