import React from "react";

export default function CustomerList({ pending, name }) {
  return (
    <li className="flex mb-4 shadow bg-red-30 active:bg-primaryActive rounded-xl py-3 px-3 items-center justify-between">
      <div>{name}</div>
      <button className={`btn ${pending ? "bg-primary" : "bg-customGray"} `}>
        {pending ? "Approve" : "Enlist"}
      </button>
    </li>
  );
}
