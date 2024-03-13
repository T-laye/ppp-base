import React from "react";

export default function StatsCard({ color, title, number, icon }) {
  return (
    <div
      className={`categoryCard  ${color} flex-col items-center justify-center py-4 px-4`}
    >
      <div className="text-primry place-self-end"> {icon}</div>
      <h3 className="text-4xl bg-green-40 text-primar place-self-start font-semibold">
        {number}
      </h3>
      <p className="text-xs font-semibold place-self-start">{title}</p>
    </div>
  );
}
