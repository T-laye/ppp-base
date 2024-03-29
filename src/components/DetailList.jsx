import React from "react";

export default function DetailList({ title, value, icon }) {
  return (
    <div className=" rounded-xl px-2 py-2 flex items-center gap-2">
      {icon}
      <div className="flex flex-col">
        <h4 className="text-xs font-semibold text-customGray">{title}</h4>
        <div className="text-base mt-0 font-mediu leading-5">{value}</div>
      </div>
    </div>
  );
}
